# Feature: Microsoft Entra ID — SSO and directory integration

## Overview

Integrate **Microsoft Entra ID** (Azure AD) so that:

1. **Users sign in with SSO** — Work accounts authenticate through Entra; the platform issues a normal Supabase session. This is the primary experience for Entra-backed organisations.
2. **Directory data stays aligned with Entra** — **Provision and update** users and groups from Entra into the platform, primarily via **SCIM 2.0** (Entra automatic provisioning), to populate profiles, departments, managers, and to support **deprovisioning**. Optionally **supplement** with Microsoft Graph where useful. This is **not optional** for Entra-backed customers: **Learn** depends on organisation structure, **manager** relationships, and related data for user management, reporting, and **performance reviews** — SSO alone without authoritative directory sync would leave those features incomplete or wrong.

**Explicitly out of scope for the Entra path:** Browsing Entra in the admin UI, selecting users, and pushing them through **`create-user` + email/password activation** as if they were CSV imports. That duplicates identity, confuses users (“activate your account” when they should use Microsoft login), and weakens the enterprise story.

**Relationship to other onboarding:** CSV import and password-based activation remain valid for customers **without** Entra. For a given organisation (or user), the product should treat **either** Entra SSO **or** legacy invite/activate — not both as mandatory steps for the same person.

### Target customers (ICP)

Customers requesting this capability are **large IT** organisations: centralized identity/IAM ownership (Entra admins), standard patterns for **enterprise applications**, conditional access and MFA, onboarding/offboarding tied to IT processes, and **automatic user provisioning (SCIM)** as the normal way SaaS apps receive directory updates. They are not the “single admin + CSV” profile.

**Product implication:** **SCIM 2.0** should be treated as the **default directory path** for Entra go-live with this ICP. **Microsoft Graph** (polling) remains valuable as a **complement or fallback** (reconciliation, diagnostics, backfill, or rare cases where provisioning is blocked), not as the only planned integration.

---

## Goals

| Goal | Description |
|------|-------------|
| **SSO as the spine** | “Sign in with Microsoft” (or tenant-specific branding) using OpenID Connect via Supabase Auth’s **Azure** provider (or equivalent). |
| **Just-in-time (JIT) provisioning** | On first successful OIDC sign-in, create or link the app user (`auth.users`) and organisation profile (`profiles`, assignments) without a separate password-enrollment email for that user. |
| **Directory-backed profile data** | **Required** for Entra-backed orgs: sync display name, department, job title, **manager**, groups, and other mapped fields from Entra so the org module and **Learn** (assignments, escalations, **performance reviews**, department-scoped analytics) match IdP reality. |
| **Lifecycle** | When a user is removed or disabled in Entra (or unassigned from the enterprise application), they cannot sign in; **mirror** disabled state and strip or freeze app roles consistent with product policy. |

---

## Non-goals (Entra track)

- **Bulk “Import from Azure AD”** into `create-user` + activation email as the default Entra onboarding path.
- **Replacing** Supabase Auth entirely; Entra is an **identity provider** feeding Supabase sessions unless the product later chooses a different auth architecture.

---

## Learn org model (must preserve under Entra)

Provisioning from Entra must map into the **existing** data model used by Learn and the organisation module — not a simplified “one department, one role” picture.

### Departments and roles (many per user)

- Users can have **multiple** department assignments (`user_departments`) and **multiple** role assignments (`user_profile_roles`).
- Each stream has an **`is_primary`** flag. Exactly **one** department assignment and **one** role assignment should be primary when those streams exist (admins can repoint primary via the org UI — see `UserDepartmentsRolesTable`).
- **Pairing:** When both a department and a role apply to the same “row” in the admin UI, imports use a shared **`pairing_id`** so the relationship is explicit.

**Supported shapes (already in product):**

| Shape | Meaning |
|-------|---------|
| **Department only** | User has one or more `user_departments` rows; roles optional or empty. |
| **Role only** | User has one or more `user_profile_roles` rows; departments optional or empty. |
| **Department + role** | Both exist; **`is_primary`** can mark the primary department row and/or the primary role row independently (either stream can carry “primary” for the user’s main context). |

Entra integration must support **adding/updating/removing** assignments over time (not only stamping a single `department` string on `profiles` if the product’s source of truth is `user_departments` / `user_profile_roles`).

### How Microsoft Entra lines up with this (HR vs IT)

Microsoft does **not** natively expose “multiple departments” as a multi-valued user field. In practice:

| Source in Entra | Typical meaning | How we use it |
|-----------------|-----------------|---------------|
| **User `department`** (and related HR-style attributes) | One **primary** org unit from HR / directory hygiene | Map to the user’s **primary** StaySecure department (`user_departments.is_primary`, matched to our `departments` table by name or external id). |
| **Group membership** | Access, licensing, and — in many tenants — **IT-defined org structure** (e.g. “Engineering-APAC”, cost centers) | **Not** the same object type as “department” in Microsoft’s model, but a practical **department proxy**: configurable **group → department** rules (by group `id` / display name) create **additional** `user_departments` rows when the user is in those groups. |

So: **HR-style field → primary department; Entra groups → extra department assignments (and optionally roles)** where the customer’s mapping says so. Exact rules are **per-tenant configuration** (and must be documented in the customer runbook).

### Two manager concepts (both matter)

| Concept | Storage | Typical meaning |
|---------|---------|-----------------|
| **Direct / line manager** | `profiles.manager` (→ `auth.users`) | HR-style reporting manager from the directory (e.g. Microsoft Graph `manager`). |
| **Department manager** | `departments.manager_id` (→ `profiles`) | Person responsible for the **department**; may differ from an individual’s line manager. |

A user’s **line manager** and their **department’s manager** can be **different people**. Learn’s access patterns treat **both** as manager-style principals for scoped visibility (e.g. RLS and manager workflows combine **direct report** and **managed department** checks). **Performance and reporting features should stay consistent** with those rules: if both relationships grant manager visibility today, Entra-fed data should continue to populate **both** fields correctly when the IdP supplies them — not collapse them into one.

**Provisioning implication:** Map Entra’s **manager** reference to `profiles.manager` where possible; **department manager** may come from directory structure, separate attributes, or admin-maintained `departments` rows depending on tenant — design attribute mapping and optional Graph reconciliation accordingly.

**Code reference (current behaviour):** `organisation/src/components/organisational/UserDepartmentsRolesTable.tsx` (primary assignment updates); `organisation/src/components/admin/ImportUsersDialog.tsx` (department/role insert + `pairing_id`). RLS combines direct manager and department-manager paths (e.g. `learn/supabase/migrations/20260203100000_fix_manager_rls_permission_based.sql`).

---

## Architecture

### 1. Single sign-on (login)

```mermaid
sequenceDiagram
  participant User
  participant App as learn / govern
  participant SB as Supabase Auth
  participant Entra as Microsoft Entra ID

  User->>App: Sign in with Microsoft
  App->>SB: signInWithOAuth (azure)
  SB->>Entra: OIDC authorization
  Entra->>User: Consent / MFA (tenant policy)
  Entra->>SB: Tokens + claims
  SB->>App: Session (JWT)
  App->>App: Load profile; JIT profile row if needed
```

- **Configure** the Azure provider in the Supabase project (client ID, client secret, tenant — single-tenant or multi-tenant as required).
- **Frontend:** `staysecure-auth` (or consuming apps) adds an OAuth entry point (e.g. “Sign in with Microsoft”) that calls `signInWithOAuth({ provider: 'azure', options: { scopes: '...', queryParams: { prompt: 'select_account' } } })` per Supabase docs; redirect URLs must match Supabase and Vercel deployment URLs (including client path prefixes if applicable).
- **JIT:** After `onAuthStateChange` / session established, ensure a `profiles` row exists and is tied to the org (by email claim, `oid` / `sub`, or a mapping table — see **Identity linking** below).

### 2. Directory sync (attributes and lifecycle) — required with Entra

For any organisation using Entra SSO, **directory sync is part of the same deliverable**, not a follow-on nice-to-have. For our **large-IT ICP**, **SCIM** is the primary mechanism; Graph is secondary.

| Approach | Use case |
|----------|----------|
| **SCIM 2.0** (default for ICP) | Entra **automatic provisioning** pushes user/group lifecycle to our endpoint (bearer token). Matches how enterprise IT expects to operate; avoids requiring broad **application** Graph permissions where customers prefer provisioning-only access. |
| **Graph + client credentials** (optional) | Scheduled job or Edge Function: reconcile or backfill, list group members for complex mappings, or operational tooling when SCIM is insufficient or temporarily unavailable. Typical permissions: `User.Read.All`, optionally `GroupMember.Read.All` (application). Secrets only on the server. |

**Single upsert pipeline:** Whether events arrive via **SCIM** or **Graph**, normalize into one internal path that updates **`profiles`**, **`profiles.manager`**, **`user_departments` / `user_profile_roles`** (including **primary** and **pairing** semantics where applicable), and related org data — **not** `create-user` + activation. See **Learn org model** above: avoid flattening to a single department/role if the product expects multiple assignments.

### 3. Identity linking

- **Preferred:** Store Entra **`oid` (object id)** or stable **`sub`** in `profiles` or an `idp_identities` table keyed by `(provider, subject)` to avoid collisions when email changes.
- **Fallback:** Match on normalized email on first login if no `oid` stored yet, then persist `oid` for future logins.
- **Conflict policy:** If an email already exists as a password user and the same person signs in with Microsoft, define merge vs block (product decision); document in RLS and admin tooling.

### 4. Where things live

| Piece | Location (conventional) |
|-------|-------------------------|
| OAuth UI | `auth` module (`LoginForm` / `AuthProvider` config) + app env for redirect URLs |
| Supabase Auth | Dashboard: Azure provider; optional `auth.hook` or trigger for JIT profile creation |
| SCIM | Dedicated HTTPS endpoint (Edge Function or service) + **long-lived provisioning token**; Entra enterprise app provisioning tab points here |
| Graph sync (optional) | Edge Function or cron (e.g. `sync-entra-directory`) + secrets; or external worker |
| Org UI | Admin: provisioning **status** (Entra logs / last SCIM activity), optional manual “sync now” for Graph path; display **SCIM base URL + secret rotation** docs |

---

## Prerequisites (customer / ops)

### SSO (Entra enterprise application)

| Item | Description |
|------|-------------|
| **App registration** | Web / SPA as required by Supabase OAuth flow. |
| **Redirect URIs** | Supabase callback URLs for each environment (dev / staging / prod). |
| **Client secret** (or cert) | For Supabase Azure provider configuration. |
| **Supported account types** | Single tenant vs multi-tenant per product decision. |
| **Token claims** | Ensure `email`, `name`, and optionally `oid` are available in ID / access token for JIT and linking. |

### Directory sync — SCIM (default for large-IT customers)

| Item | Description |
|------|-------------|
| **Entra enterprise app** | Enable **automatic provisioning**; set SCIM **tenant URL** and **secret token** (per environment / per org as designed). |
| **Our endpoint** | HTTPS, validates bearer token; implements Users (required) and Groups as needed for role/department mapping. |
| **Runbook** | Document attribute mapping (Entra → our fields), troubleshooting provisioning logs, token rotation. |

### Directory sync — Graph (optional)

Use when supplementing SCIM or for internal reconciliation tools.

| Item | Description |
|------|-------------|
| **Separate app registration** (recommended) | Confidential client with **application** permissions to Graph; not the same secret as the OAuth client if avoidable. |
| **Permissions** | e.g. `User.Read.All`; `GroupMember.Read.All` if syncing by group. Admin consent in customer tenant. |
| **Secrets** | Stored in Supabase secrets or secure env; never in frontend. |

Skipping **both** SCIM and Graph is only valid for **non-Entra** (e.g. CSV/password) customers.

---

## Security

| Concern | Approach |
|--------|-----------|
| **SSO** | Rely on Supabase session; enforce RLS as today. Optional: require SSO for certain orgs (feature flag / org setting). |
| **Graph / SCIM credentials** | Server-only; rotate secrets; least-privilege API permissions. |
| **Tenant isolation** | Single-tenant Entra app per customer vs multi-tenant app — map Supabase `redirect` and Azure `tenant` config per deployment or per org. |
| **Deprovisioning** | Prefer IdP removing access + app marking user inactive; do not rely solely on local “delete user” without IdP alignment. |

---

## Implementation checklist

### Phase A — SSO ✅ completed (Apr 2026)

- [x] Register Azure provider in Supabase (all relevant projects / tenants). *(dev: `cleqfnrbiqpxpzxkatda`; staging/prod: follow onboarding runbook)*
- [x] Add “Sign in with Microsoft” (or equivalent) to auth UI; handle OAuth callback and errors.
- [x] Document redirect URL setup for each Vercel deployment and path-prefixed clients.
- [x] JIT: create or link `profiles` (and org membership) on first Azure login; **no** password activation email for that path.
- [x] Store Entra `oid` / `sub` for stable identity linking.
- [x] Decide and implement password-user vs Microsoft-user **merge / conflict** policy. *(decision: merge by email on first OAuth login; `entra_oid` backfilled on subsequent logins — see implementation log below)*

### Phase B — SCIM 2.0 provisioning — **required** for Entra go-live (ICP)

Without authoritative provisioning, Learn cannot rely on correct **department**, **manager**, and org graph for reviews and operations.

- [ ] SCIM **Users** endpoint (create/update/deactivate/delete semantics aligned with Entra expectations).
- [ ] SCIM **Groups** (if group-based role or department mapping is in scope for v1).
- [ ] Shared **profile upsert** path: map SCIM attributes → `profiles` (including **`profiles.manager`**), **`user_departments` / `user_profile_roles`** with **`is_primary`** / **`pairing_id`** as needed; respect **Learn org model** (multiple depts/roles; two manager concepts); align with org module patterns and RLS.
- [ ] Customer runbook: Entra provisioning configuration, attribute mapping, token rotation, troubleshooting.
- [ ] Admin UX: surface provisioning health (e.g. link to guidance / last-error summary if feasible).

### Phase C — Microsoft Graph (optional)

**What you get:** A **pull** from Microsoft’s API that SCIM does not replace by itself. Use it when you need one or more of:

| Need | What Graph gives you |
|------|----------------------|
| **Reconciliation** | Compare Entra’s current user/group state to your DB and **fix drift** (missed SCIM events, transient provisioning errors, manual Entra changes that didn’t replay). |
| **Backfill** | Fill attributes Entra sends to Graph but **not** on the default SCIM user schema (e.g. some extensions, or resolving **manager** via Graph if SCIM mapping is awkward). |
| **Group expansion** | Full membership lists or nested group logic that are **easier or more reliable** via Graph than via SCIM group payloads alone. |

**What you do *not* need Phase C for:** Day-one login + SCIM provisioning + correct profiles for most customers — that is **A + B**. Phase C is **insurance and depth**, not core go-live.

- [ ] Scheduled or on-demand job: client credentials → Graph for reconciliation, backfill, or group expansion as needed.
- [ ] Optional admin “Sync now” for Graph-backed reconciliation.

### Phase D — Enterprise refinements (optional)

**What you get:** **Smarter IdP-driven access rules** beyond “sync attributes and manager.” Specifically:

| Need | What Phase D gives you |
|------|------------------------|
| **Group → platform role** | Rules like “members of Entra group `SG-Learn-Admins` → `admin` role in StaySecure,” **multiple groups**, **precedence** (deny wins, or first match), or **exceptions**. |
| **Finer entitlements** | Map groups to **learning tracks**, **content bundles**, or **govern** capabilities without hand-maintaining every user in the admin UI. |

**Overlap with Phase B:** Phase B may ship a **simple** mapping (e.g. one group → one role, or groups only for department). Phase D is when customers need a **policy layer** (many rules, priorities, per-tenant config UI).

- [ ] Richer **group → platform role** (and optional entitlements) mapping: claim, group object ID, or SCIM group membership → roles / assignments.
- [ ] Optional **admin UI** to configure mappings per org (if not config-as-code only).

---

## Effort summary (indicative)

| Phase | Estimate |
|-------|----------|
| A — SSO + JIT profiles + linking | **3–6 days** (varies with multi-tenant routing and conflict rules) |
| B — SCIM Users (+ Groups if in v1) + shared upsert + deprovision | **1–2+ weeks** (default path for large-IT ICP; not deferrable) |
| C — Graph reconciliation / backfill (optional) | **4–8 days** |
| D — Advanced group → role rules (optional) | **variable** |

**Typical Entra go-live for this ICP (A + B):** roughly **2–3+ weeks** of focused engineering, before optional Graph work.

---

## Architecture decisions

### ADR-1: SSO on shared (nexus) instances — deferred until there is real demand

**Context:** The nexus Supabase project hosts multiple small-to-mid organisations in a single database. A question arose about whether those clients could use Microsoft Entra SSO without migrating to a dedicated instance.

**Decision:** Do not implement multi-org SSO on nexus for now.

**Reasons:**

1. **One Azure provider per Supabase project.** Supabase only supports a single Azure App Registration (Client ID + Secret) per project. All nexus orgs would share one Azure app, which must be registered as *multi-tenant* in Azure (supporting any Azure AD org). This removes the natural per-tenant isolation you get on dedicated instances.

2. **Cross-tenant pollution requires extra code.** Without additional guards, a user from Org A's Azure AD could potentially sign in at Org B's URL. Preventing this requires reading `azure_tenant_id` from `org_profile` *before* the OAuth exchange completes and then verifying the `tid` JWT claim in `AuthProvider` after login — a non-trivial security-critical path.

3. **The `get_org_sso_config` RPC must become org-aware.** Currently it does `SELECT … LIMIT 1`, which only works for single-org databases. On nexus it would need a `WHERE short_name = $1` (or equivalent) keyed on the URL slug — requiring changes to the RPC, `LoginForm`, and `AuthCallbackPage` to thread the org identifier through the OAuth state.

4. **Small shops on nexus rarely have Entra.** The target audience for Entra SSO is large-IT organisations with centralised IAM (see *Target customers* above). Small shops on nexus are more likely to use Google Workspace or email/password. SSO demand from a nexus client is a signal they've outgrown the shared tier.

**If a nexus client requests SSO:** Migrate them to a dedicated Supabase project first. That removes all the shared-instance complexity and is consistent with the pattern used for all large-IT ICP customers.

**Revisit trigger:** If ≥ 3 nexus clients need SSO simultaneously and migration is impractical, implement the nexus-aware path (org-keyed RPC + `tid` verification).

---

### ADR-2: TOTP skip uses `identities` array, not `app_metadata.provider`

**Context:** `AuthProvider.getInitialSession` skips the in-app TOTP challenge for OAuth sessions because the IdP (Entra) has already enforced MFA at the Azure policy level. The initial implementation checked `session.user.app_metadata.provider !== 'email'`.

**Problem:** When a user originally created their account with email/password and later signs in via Azure OAuth, Supabase keeps `app_metadata.provider = 'email'` (the original/primary provider). The check always evaluated to `false`, causing the TOTP challenge to fire even for successful Azure logins.

**Decision:** Check `session.user.identities` (all linked identity providers) and `session.user.app_metadata.providers` (array) instead of the single `provider` field. If *any* identity is not `email`, the session is considered OAuth and TOTP is skipped.

```typescript
const identities: any[] = session.user.identities ?? [];
const providers: string[] = session.user.app_metadata?.providers ?? [];
const hasOAuthIdentity =
  identities.some((i) => i.provider !== 'email') ||
  providers.some((p) => p !== 'email');
```

**Trade-off:** A user who has *both* email/password AND Azure linked will always skip TOTP, even if they somehow authenticated via password for this session. This is acceptable today because:
- The UX has a single Microsoft sign-in button; password login is the fallback.
- Entra conditional-access policies enforce MFA server-side before the token reaches us.
- If stricter per-session-method control is ever needed, use AMR claims from the Supabase JWT.

---

### ADR-3: Google SSO — deferred until customer demand

**Context:** Google SSO is common in B2B SaaS. The question arose whether to support it alongside Microsoft Entra SSO.

**Decision:** Deprioritise Google SSO. Do not implement unless a specific customer requests it.

**Reasons:**

1. **Enterprise ICP is Microsoft-dominant.** Our target customers are large IT organisations with centralised IAM — they run Microsoft 365 / Entra. Google Workspace is more prevalent in startups, education, and tech companies. Google SSO adds little value for the current buyer profile.

2. **`hd` domain restriction cannot be used.** The standard way to make Google OAuth safe for B2B is the `hd` (hosted domain) parameter, which restricts login to a specific Google Workspace domain. Our clients use personal Gmail accounts — there is no Workspace domain to restrict to. Without `hd`, there is no tenant-level trust signal equivalent to Entra's `tid` + `oid`.

3. **JIT auto-provisioning would be unsafe without `hd`.** The current Entra implementation auto-provisions a profile on first SSO login (see Phase A implementation log). With Google personal accounts, this would allow anyone with a Gmail to get a provisioned account simply by completing the OAuth flow — there is no organisational gate.

4. **Account linking is more complex.** With Entra, a new user can SSO on first login. With Google personal accounts there is no reliable way to auto-match a Google identity to an existing provisioned user without trusting email, which is spoofable across providers. The safe design requires an explicit linking step: the user first authenticates with their password, then intentionally links their Google identity. This is materially more complex than the Entra flow.

5. **Email-based auto-matching across providers must not be used.** A user could create a Gmail address matching another user's work email and potentially hijack their account via SSO if the system matches on email alone.

**If Google SSO is added later:**
- Estimated effort: **3–5 days** done carefully (more than Entra, due to the account-linking requirement)
- Implementation must include: explicit account-linking flow (not first-login auto-provisioning), `google_sub` stored per user only after intentional linking, no email-based identity matching across providers
- JIT auto-provisioning on first Google login must be disabled or gated behind an allowlist

**Revisit trigger:** First customer request that specifically needs Google SSO.

---

## References

- **Supabase:** [Login with Azure](https://supabase.com/docs/guides/auth/social-login/auth-azure) (Azure provider setup).
- **Microsoft Graph:** [List users](https://learn.microsoft.com/en-us/graph/api/user-list), [user resource](https://learn.microsoft.com/en-us/graph/api/resources/user).
- **SCIM:** [Microsoft Entra provisioning](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/use-scim-to-provision-users-and-groups).
- **Organisation module:** `organisation/docs/ARCHITECTURE.md` (Supabase client pattern).
- **Legacy CSV / create-user path:** `organisation/src/components/admin/ImportUsersDialog.tsx`, `learn/supabase/functions/create-user` — remain for non-Entra customers; **not** the Entra default path.

---

## History

This specification **supersedes** the previous design documented at `FEATURE_AZURE_AD_IMPORT.md` (bulk admin import from Graph into `create-user` + activation). That path is now a short redirect to this document.

---

## Phase A implementation log (Apr 2026)

### What was built

#### 1. Database migration — `learn/supabase/migrations/20260407000000_entra_sso.sql`

```sql
-- Stable identity link to Entra object ID
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS entra_oid text;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_entra_oid_idx
  ON public.profiles (entra_oid)
  WHERE entra_oid IS NOT NULL;

-- Per-org SSO toggle + tenant hint
ALTER TABLE public.org_profile
  ADD COLUMN IF NOT EXISTS entra_enabled  boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS azure_tenant_id text;

-- Narrow SECURITY DEFINER RPC — safe for anon callers (login page pre-auth)
CREATE OR REPLACE FUNCTION public.get_org_sso_config()
RETURNS TABLE (entra_enabled boolean, azure_tenant_id text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT entra_enabled, azure_tenant_id FROM public.org_profile LIMIT 1; $$;

GRANT EXECUTE ON FUNCTION public.get_org_sso_config() TO anon, authenticated;
```

**To enable SSO for a client:** run this migration on their Supabase project, configure the Azure provider in Supabase Auth, then:
```sql
UPDATE public.org_profile
SET entra_enabled = true, azure_tenant_id = '<their-azure-tenant-id>';
```

#### 2. Auth module — `auth/src/components/LoginForm.tsx`

- On mount, calls `supabaseClient.rpc('get_org_sso_config')` (unauthenticated) to check if SSO is enabled for this org.
- Conditionally renders a **"Sign in with Microsoft"** button (hidden by default; only shown when `entra_enabled = true`).
- `handleMicrosoftSignIn` calls `supabase.auth.signInWithOAuth({ provider: 'azure', options: { redirectTo, scopes: 'openid email profile', queryParams: { prompt: 'select_account' } } })`.
- `redirectTo` is built from `window.location.origin + clientPrefix + '/auth/callback'`, where `clientPrefix` is derived dynamically from `window.location.pathname` (not hardcoded).

#### 3. OAuth callback page — `learn/src/components/auth/AuthCallbackPage.tsx` *(new file)*

Dedicated React component that handles the redirect after Microsoft login. Supports both:
- **PKCE flow** (`?code=…`): calls `supabase.auth.exchangeCodeForSession(window.location.href)` then navigates to dashboard.
- **Implicit flow** (`#access_token=…`): waits for `onAuthStateChange(SIGNED_IN)` then navigates. Also checks `getSession()` in case the event already fired.

Includes error state display, 10-second timeout guard, and correct `clientPrefix` extraction for multi-tenant routing.

Routes added to `learn/src/App.tsx`:
```tsx
<Route path="/auth/callback" element={<AuthCallbackPage />} />
<Route path="/:client/auth/callback" element={<AuthCallbackPage />} />
```
`RecoveryRedirect` was also guarded to skip interception when the path includes `/auth/callback`.

#### 4. Auth module — `auth/src/components/AuthProvider.tsx`

**JIT provisioning + inactive gate (in `onAuthStateChange`):**
- On `SIGNED_IN` from an OAuth provider, checks for an existing `profiles` row by `user.id`.
- If none exists: inserts `{ id, email, full_name, status: 'Active', entra_oid }` — no activation email.
- If row exists but `entra_oid` is missing: backfills it.
- Applies the existing **inactive gate** (`status === 'Inactive'` → sign out + show message) to OAuth users too.

**TOTP skip for OAuth sessions (in `getInitialSession`):**
- When a session is at `aal1` but has an enrolled TOTP factor (`aal2` required), the old code checked `app_metadata.provider !== 'email'`.
- **Bug:** Supabase keeps `provider = 'email'` for accounts originally created via email/password even after Azure is linked. The check always evaluated to `false`, causing the TOTP challenge to fire even for successful Azure logins.
- **Fix (ADR-2):** Check `user.identities` array and `app_metadata.providers` array instead. If any linked identity is not `email`, skip TOTP.

#### 5. Redirect URLs configured

For each Vercel deployment, two redirect URLs must be added to:
- **Supabase Auth → URL Configuration → Redirect URLs**
- **Azure App Registration → Authentication → Redirect URIs**

| Environment | URLs |
|-------------|------|
| Dev (standalone) | `https://dev.staysecure-learn.raynsecure.com/auth/callback` |
| Prod (standalone) | `https://staysecure-learn.raynsecure.com/rayn/auth/callback` |
| Localhost | `http://localhost:8080/auth/callback`, `http://localhost:8080/rayn/auth/callback` |

`deploy/scripts/onboard-client.sh` was updated to print these URLs in the post-onboarding instructions block.

---

### Troubleshooting log (issues hit during implementation)

| Symptom | Root cause | Fix |
|---------|-----------|-----|
| `404 Page not found` on OAuth redirect | `/auth/callback` route did not exist in the React app | Created `AuthCallbackPage.tsx` + added routes to `App.tsx` |
| `Unable to exchange external code: 1.Ab` | Azure **Secret ID** (a GUID) pasted instead of Secret **Value** | Copy the Value column from Azure portal → Certificates & secrets |
| `AuthCallbackPage` showed "No authorisation code found" | Supabase returned tokens in URL hash (implicit flow), not `?code=` | Added implicit-flow branch (`onAuthStateChange` wait) alongside PKCE handler |
| TOTP challenge fired after successful Azure login | `app_metadata.provider` stays `'email'` for email-origin accounts; OAuth identity not detected | Switched to `identities` + `providers` array check (ADR-2) |
| Govern login logo appeared much larger than Learn | `AuthBranding.tsx` uses `text-learning-primary`; this class was defined in Learn's Tailwind config but not Govern's | Added `--learning-primary` CSS variable + `learning-primary` Tailwind color alias to `govern/src/index.css` and `govern/tailwind.config.ts` |

---

### Azure App Registration settings used (dev/staging)

| Setting | Value |
|---------|-------|
| Supported account types | *My organisation only* (single-tenant for dev; switch to multi-tenant for production multi-client rollout) |
| Redirect URIs | See table above |
| Client secret | Configured in Supabase Auth → Azure provider (use the **Value**, not the ID) |
| Token claims | `email`, `name`, `oid` available by default with `openid email profile` scopes |

### Supabase Azure provider settings

Configured per Supabase project under **Authentication → Providers → Azure**:
- **Azure Tenant ID:** the client's Azure tenant GUID (or `common` for multi-tenant)
- **Client ID:** Azure App Registration Application (client) ID
- **Client Secret:** Azure App Registration secret **Value**

---

## Production SSO onboarding runbook

### Overview

| Scope | What |
|-------|------|
| **One-time (StaySecure)** | Create a single production Azure App Registration in StaySecure's Microsoft tenant |
| **Per new Supabase project** | Add that project's Supabase callback URL to the Azure app's Redirect URIs |
| **Per client going live with SSO** | Configure the Azure provider in their Supabase project + enable SSO in the DB |

Production URL pattern: `https://staysecure-learn.raynsecure.com/<short_name>/`

---

### Step 1 — Create the production Azure App Registration (one-time, StaySecure)

Do this once. All clients share this single app registration.

1. Sign in to [portal.azure.com](https://portal.azure.com) with StaySecure's Microsoft account.
2. Go to **Azure Active Directory → App registrations → New registration**.
3. Fill in:
   - **Name:** `StaySecure Suite`
   - **Supported account types:** `Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)` ← required so every client's users can sign in
   - **Redirect URI:** leave blank for now
4. Click **Register**. Note down:
   - **Application (client) ID** — used in every client's Supabase config
   - **Directory (tenant) ID** — StaySecure's own tenant (not the client's); not used in Supabase config but useful to record
5. Go to **Certificates & secrets → New client secret**:
   - Description: `StaySecure Platform (prod)`
   - Expiry: 24 months (set a calendar reminder to rotate before expiry)
   - Click **Add** — copy the **Value** immediately (shown only once). **This is the secret you paste into Supabase, NOT the Secret ID (GUID).**
6. Go to **Token configuration → Add optional claim**:
   - Token type: **ID**
   - Claim: `email`
   - Check **Turn on Microsoft Graph email permission** if prompted
7. Go to **API permissions** — confirm `openid`, `email`, `profile` are listed (they are default). No extra Graph permissions needed for SSO-only.

**Record in your password manager / secrets store:**
```
Azure App: StaySecure (prod)
Client ID:     <Application (client) ID>
Tenant ID:     <StaySecure's Directory (tenant) ID>
Secret Value:  <secret value — not the GUID>
Secret expiry: <date>
```

---

### Step 2 — Add a new client's Supabase callback URL to the Azure app (per Supabase project)

Every client has their own Supabase project. Each project's callback URL must be registered in the Azure app's Redirect URIs before any user in that project can log in with Microsoft.

1. Find the client's **Supabase project reference** (the subdomain of their Supabase URL, e.g. `abcdefghijklmn`).
2. In the Azure portal → **StaySecure** app → **Authentication → Add a platform → Web**.
3. Add the redirect URI:
   ```
   https://<supabase-project-ref>.supabase.co/auth/v1/callback
   ```
4. Click **Save**.

> **Why:** The redirect URI is where Supabase's auth server lives — it receives the OAuth tokens from Microsoft. The app's frontend (`staysecure-learn.raynsecure.com`) is a separate redirect configured inside Supabase (Step 3 below).

**For the production app, the Azure app will accumulate one URI per client Supabase project.** Azure supports up to 256 redirect URIs — plenty for all clients.

---

### Step 3 — Configure Supabase for the client (per client going live with SSO)

Do this in the client's Supabase dashboard.

#### 3a — Enable the Azure provider

1. Go to **Authentication → Providers → Azure**.
2. Toggle **Enable Azure provider** on.
3. Enter:
   - **Application (client) ID:** from Step 1 (same for every client)
   - **Secret:** the secret **Value** from Step 1 (same for every client — NOT the GUID)
   - **Azure Tenant:** `https://login.microsoftonline.com/common` ← leave as `common` for multi-tenant so any client's users can sign in
4. Click **Save**.

#### 3b — Add allowed redirect URLs

1. Still in Supabase → **Authentication → URL Configuration**.
2. Add to **Redirect URLs** (these are where Supabase sends users after login):
   ```
   https://staysecure-learn.raynsecure.com/<short_name>/auth/callback
   https://staysecure-govern.raynsecure.com/<short_name>/auth/callback
   ```
   Replace `<short_name>` with the client's URL slug (e.g. `rayn`, `psybersafe`).
3. If the client uses a **custom domain** (e.g. `learn.acmecorp.com`), add those too:
   ```
   https://learn.acmecorp.com/auth/callback
   ```
4. Click **Save**.

> **Tip:** Supabase supports wildcards — `https://staysecure-learn.raynsecure.com/*` would cover all clients on the shared domain. However, wildcards also permit paths you didn't intend. Prefer explicit per-client URLs for production.

---

### Step 4 — Run the DB migration and enable SSO for the client

#### 4a — Apply the migration (if not already run for this project)

```sql
-- File: learn/supabase/migrations/20260407000000_entra_sso.sql
-- Run once per Supabase project
```

Use the Supabase CLI or the SQL editor in the dashboard:
```bash
supabase db push --project-ref <project-ref>
```

Or paste the migration SQL directly in the Supabase SQL editor.

#### 4b — Enable SSO for the org

```sql
UPDATE public.org_profile
SET
  entra_enabled   = true,
  azure_tenant_id = '<client-azure-tenant-id>'  -- the client's own Azure AD tenant ID, NOT StaySecure's
WHERE id = (SELECT id FROM public.org_profile LIMIT 1);
```

The `azure_tenant_id` here is the client's Microsoft tenant ID (find it in their Azure portal under **Azure Active Directory → Overview → Tenant ID**, or ask their IT admin). It's used for display/record-keeping today; it will be used for tenant-verification enforcement if multi-org support is added later (see ADR-1).

**After this UPDATE, the "Sign in with Microsoft" button will appear on the login page for this client.**

---

### Step 4b — Remove the "unverified" warning from the consent screen (one-time, StaySecure)

When users (or IT admins) are redirected to the Microsoft consent screen, they will see **"StaySecure Suite — unverified"** until publisher verification is complete. The app still works — users can click Accept — but enterprise IT admins will flag this during security review.

There are two levels of fix:

**Level 1 — Publisher domain (quick, ~5 min):** Shows your domain name instead of nothing. The "unverified" badge remains but the screen shows `raynsecure.com`.

1. Azure portal → **App registrations → StaySecure → Branding & properties**
2. Set **Publisher domain** to `raynsecure.com`
3. Verify domain ownership via the DNS TXT record or `/.well-known/microsoft-identity-association.json` file that Microsoft prompts for
4. Save

**Level 2 — Publisher verification (proper fix, removes "unverified" badge entirely):** Requires a Microsoft Partner Network account.

1. Enroll at [partner.microsoft.com](https://partner.microsoft.com) — free, takes 1–2 business days
2. Once you have an MPN ID, go to **App registrations → StaySecure → Branding & properties → Publisher verification**
3. Click **Add MPN ID** and link your verified partner account
4. The consent screen will show a blue verified ✓ badge next to the app name

> **Timeline:** Complete Level 1 before giving the admin consent URL to any client. Complete Level 2 before the first enterprise customer goes live with SSO — they will ask about it.

---

### Step 5 — Ask the client's IT admin to consent (per client)

Because the Azure app is multi-tenant, the client's IT admin must grant it access to their directory once before their users can sign in.

Send the client's IT admin this URL (replace `<your-azure-application-client-id>` with the Application (client) ID from Step 1):

```
https://login.microsoftonline.com/common/adminconsent?client_id=66514ca0-e64c-4405-930d-f12fc54d10ff
```

They will see a Microsoft consent screen asking to grant **StaySecure** access to: sign in and read basic profile (`openid`, `email`, `profile`). Once they click **Accept**, all users in their tenant can sign in.

> **If the client's IT admin can't do this immediately:** individual users can still sign in if the tenant's policy allows user consent. The admin consent is only strictly required if the tenant has disabled user consent (common in security-conscious enterprises).

---

### Per-client checklist (print this when onboarding a new SSO client)

Replace `<short_name>` and `<project-ref>` with the client's actual values.

**One-time StaySecure setup (do before first client goes live):**
- [ ] Publisher domain set to `raynsecure.com` on Azure app (Step 4b — Level 1)
- [ ] Publisher verification completed via MPN (Step 4b — Level 2)

**Per-client:**
- [ ] Add `https://<project-ref>.supabase.co/auth/v1/callback` to the Azure app's Redirect URIs (Step 2)
- [ ] Enable Azure provider in client's Supabase project with shared Client ID + Secret, tenant = `common` (Step 3a)
      1. Go to **Authentication → Providers → Azure**.
      2. Toggle **Enable Azure provider** on.
      3. Enter:
         - **Application (client) ID:** from Step 1 (same for every client) - (look in shared secrets)
         - **Secret:** the secret **Value** from Step 1 (same for every client — NOT the GUID) - (look in )
         - **Azure Tenant:** `https://login.microsoftonline.com/common` ← leave as `common` for multi-tenant so any client's users can sign in
      4. Click **Save**.
- [ ] Add `https://staysecure-learn.raynsecure.com/<short_name>/auth/callback` to Supabase Redirect URLs (Step 3b)
- [ ] Add `https://staysecure-govern.raynsecure.com/<short_name>/auth/callback` to Supabase Redirect URLs (Step 3b)
- [ ] `UPDATE org_profile SET entra_enabled = true, azure_tenant_id = '<azure-tenant-id>'` (Step 4b)

**Client IT admin side:**
- [ ] Admin consent URL sent to client's IT admin (Step 5)
- [ ] IT admin has clicked Accept on the consent screen
- [ ] Smoke test: sign in with a Microsoft account from the client's tenant at `https://staysecure-learn.raynsecure.com/<short_name>/`

---

### Dev/staging differences

| | Dev | Production |
|--|-----|-----------|
| Azure app | `StaySecure (Dev)` — separate app | `StaySecure` — shared with all prod clients |
| Supported account types | Single-tenant (your org only) | Multi-tenant (any org) |
| Supabase tenant field | Your StaySecure tenant ID | `common` |
| Redirect URIs in Azure | Dev Supabase project ref only | All production client project refs |
| Admin consent | Not needed (your own tenant) | Required for each client's IT admin |
