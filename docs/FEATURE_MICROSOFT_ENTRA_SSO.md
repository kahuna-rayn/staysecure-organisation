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

### Phase A — SSO

- [ ] Register Azure provider in Supabase (all relevant projects / tenants).
- [ ] Add “Sign in with Microsoft” (or equivalent) to auth UI; handle OAuth callback and errors.
- [ ] Document redirect URL setup for each Vercel deployment and path-prefixed clients.
- [ ] JIT: create or link `profiles` (and org membership) on first Azure login; **no** password activation email for that path.
- [ ] Store Entra `oid` / `sub` for stable identity linking.
- [ ] Decide and implement password-user vs Microsoft-user **merge / conflict** policy.

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

## References

- **Supabase:** [Login with Azure](https://supabase.com/docs/guides/auth/social-login/auth-azure) (Azure provider setup).
- **Microsoft Graph:** [List users](https://learn.microsoft.com/en-us/graph/api/user-list), [user resource](https://learn.microsoft.com/en-us/graph/api/resources/user).
- **SCIM:** [Microsoft Entra provisioning](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/use-scim-to-provision-users-and-groups).
- **Organisation module:** `organisation/docs/ARCHITECTURE.md` (Supabase client pattern).
- **Legacy CSV / create-user path:** `organisation/src/components/admin/ImportUsersDialog.tsx`, `learn/supabase/functions/create-user` — remain for non-Entra customers; **not** the Entra default path.

---

## History

This specification **supersedes** the previous design documented at `FEATURE_AZURE_AD_IMPORT.md` (bulk admin import from Graph into `create-user` + activation). That path is now a short redirect to this document.
