# Feature: Import Users from Azure AD (Microsoft Graph)

## Overview

Enable organisation admins to **import users directly from Azure Active Directory** (Microsoft 365 / Entra ID) into the organisation module, instead of (or in addition to) CSV upload. Users are browsed from Azure AD, selected, then created in the platform using the existing `create-user` flow and assignment logic.

**Goal:** "Import from Azure AD" as a first-class source alongside CSV in User Management, with minimal duplication and clear security boundaries.

---

## Prerequisites (Customer / Ops)

Before implementation or rollout, the following must be in place:

| Item | Description |
|------|-------------|
| **Azure AD app registration** | Application registered in Azure Portal (Entra ID). |
| **Client ID** | Application (client) ID from the app registration. |
| **Client secret** (or certificate) | Used for server-side auth. Store in Supabase secrets (or equivalent); never in frontend. |
| **Tenant ID** | Azure AD tenant (directory) ID. For multi-tenant SaaS, may be configurable per customer. |
| **API permissions** | Application permissions (not delegated): `User.Read.All` (minimum). For manager resolution: ensure the app can read manager (e.g. `User.Read.All` covers `/users/{id}/manager` in same tenant). If filtering by group: `GroupMember.Read.All` (optional). |

**Optional (future):** Multi-tenant: each customer has their own Azure AD tenant → store tenant ID (and optionally separate app registration) per client/org.

---

## Architecture

### High-level flow

1. **Admin** opens User Management → chooses "Import from Azure AD" (new entry alongside "Import from CSV").
2. **Frontend** calls a new Edge Function `list-azure-ad-users` (or similar name) with optional filters (e.g. search, group).
3. **Edge Function** uses Azure AD app credentials (from secrets) to obtain an OAuth2 token (client credentials flow), then calls Microsoft Graph `GET /users` (and optionally manager for each user). Returns a **normalised list** of user objects.
4. **Frontend** displays the list in a table with checkboxes; admin selects users and optionally maps default department/role/location/access level.
5. **Import selected:** For each selected Azure AD user, the frontend builds one **user row** in the same shape as the existing CSV import (see "User row shape" below) and reuses the existing **create-user + assignment** pipeline (same as `ImportUsersDialog` CSV path). No new creation logic—only a new *source* of rows.

### Components

| Component | Responsibility |
|-----------|----------------|
| **Edge Function: `list-azure-ad-users`** | Authenticate to Azure AD, call Graph API, map Graph users to normalised list. No Supabase user creation. |
| **Organisation UI** | New "Import from Azure AD" entry; call Edge Function; show AD user list; "Import selected" → build rows and call existing import pipeline. |
| **Existing `create-user`** | Unchanged. Invoked per user as today (from learn or shared location). |
| **Existing assignment logic** | Unchanged. Department, role, location, manager assignment in pass 2 (as in `ImportUsersDialog`). |

### Where things live

- **Edge Function:** TBD by project convention—either `learn/supabase/functions/list-azure-ad-users` or a shared `supabase/functions/` at repo root. Must be deployed where the consuming app's Supabase client points.
- **UI:** Organisation module: e.g. new component `ImportFromAzureAdDialog` (or extended `ImportUsersDialog` with a "Source" step: CSV vs Azure AD). User Management presents both options.

---

## API contract: `list-azure-ad-users`

### Request (from frontend)

```json
{
  "search": "optional search string (e.g. displayName or mail)",
  "groupId": "optional Microsoft Graph group object ID to filter members",
  "top": 100,
  "skipToken": "optional paging token from previous response"
}
```

All fields optional. If none provided, returns first page of users (e.g. default `top: 100`).

### Response (success)

```json
{
  "users": [
    {
      "id": "azure-ad-object-id",
      "email": "user@company.com",
      "userPrincipalName": "user@company.com",
      "displayName": "Jane Doe",
      "givenName": "Jane",
      "surname": "Doe",
      "department": "Engineering",
      "jobTitle": "Software Engineer",
      "managerEmail": "manager@company.com",
      "mobilePhone": "+1-555-0123"
    }
  ],
  "nextSkipToken": "optional token for next page",
  "hasMore": true
}
```

- **email:** Prefer `mail` from Graph; fallback `userPrincipalName`.
- **managerEmail:** Resolved from `manager` reference (e.g. `GET /users/{id}/manager`) so the frontend can pass it as the "Manager" column for the existing pipeline.

### Response (error)

- **401:** Invalid or expired Azure AD credentials (e.g. wrong secret, expired). Return clear message: "Azure AD connection failed. Check client ID, secret, and tenant ID."
- **403:** Insufficient Graph permissions. Message: "Azure AD app does not have permission to read users."
- **4xx/5xx from Graph:** Surface reason if safe (e.g. "Azure AD returned: ...").

### Graph API usage (Edge Function)

- **Token:** `POST https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token` with `client_id`, `client_secret`, `scope: https://graph.microsoft.com/.default`, `grant_type: client_credentials`.
- **List users:** `GET https://graph.microsoft.com/v1.0/users?$top=100&$select=id,displayName,givenName,surname,mail,userPrincipalName,department,jobTitle,mobilePhone&$filter=...` (optional filter).
- **Manager (per user or batch):** `GET https://graph.microsoft.com/v1.0/users/{id}/manager` and read `mail` from manager object (or batch with `$expand=manager` if preferred).

---

## User row shape (mapping from Azure AD to existing import)

The existing CSV import and `processUserImport` expect a row with the following. The "Import from Azure AD" flow must produce the same shape so the same pipeline can run.

| Our field (CSV / row key) | Source in Azure AD (Graph) | Notes |
|---------------------------|----------------------------|--------|
| **Email** | `mail` or `userPrincipalName` | Required. |
| **Full Name** | `displayName` | Required. |
| **First Name** | `givenName` | Required. |
| **Last Name** | `surname` | Required. |
| **Username** | `mail` or `userPrincipalName` | Optional; can default to email. |
| **Phone** | `mobilePhone` | Optional. |
| **Employee ID** | (extension attribute or custom) | Optional; Graph may not have it; leave empty or from extension. |
| **Access Level** | (not in AD) | Default to `"user"` (or admin-configurable default for AD import). |
| **Location** | (not in AD) | Optional; admin can set default for AD import or leave blank. |
| **Department** | `department` | Optional; validate against our `departments` table by name (same as CSV). |
| **Role** | `jobTitle` or (not in AD) | Optional; match our `roles` by name if possible; else leave blank or use default. |
| **Manager** | Resolved `managerEmail` from Graph | Optional; assigned in pass 2 (same as CSV). |

**Validation:** Reuse existing validators in `ImportUsersDialog`: `validateLocation`, `validateDepartment`, `validateRole`, `validateDepartmentRolePair`, `validateAccessLevel`. If an AD user has department/role that don’t exist in our DB, either skip those fields (import without dept/role) or show a warning and let admin fix mapping.

---

## Security

| Concern | Approach |
|--------|-----------|
| **Credentials** | Azure AD client ID, client secret, tenant ID stored in **Supabase secrets** (or backend env). Never exposed to frontend. |
| **Who can call the Edge Function** | Protect with Supabase auth: require valid session; optionally restrict to users with admin/role that can create users (same as `create-user`). |
| **Per-tenant Azure AD** | If multiple customers each have their own Azure AD, store tenant ID (and optionally app registration) per client/org; pass `clientId` (our app’s client) in request and look up the right Azure AD config. |
| **Graph permissions** | Use least privilege: `User.Read.All` (application) for read-only user list and manager. |

---

## Implementation task list

Use this as a checklist when implementing.

- [ ] **1. Edge Function: `list-azure-ad-users`**
  - [ ] Read Azure AD config from secrets (client ID, client secret, tenant ID).
  - [ ] Implement client credentials token request.
  - [ ] Call Graph `GET /users` with `$select` and optional `$filter`, `$top`, `skipToken`.
  - [ ] Optionally resolve manager for each user (or batch with `$expand=manager`).
  - [ ] Map Graph response to normalised `users[]` (email, displayName, givenName, surname, department, jobTitle, managerEmail, mobilePhone).
  - [ ] Return `{ users, nextSkipToken, hasMore }` and handle errors (401, 403, 5xx) with clear messages.
- [ ] **2. Secrets / config**
  - [ ] Document required secrets (e.g. `AZURE_AD_CLIENT_ID`, `AZURE_AD_CLIENT_SECRET`, `AZURE_AD_TENANT_ID`).
  - [ ] If multi-tenant: design store for per-org Azure AD config (e.g. table or secrets keyed by org/client).
- [ ] **3. Organisation UI: "Import from Azure AD"**
  - [ ] Add entry point in User Management (e.g. button or tab "Import from Azure AD" next to "Import from CSV").
  - [ ] New dialog/flow: call `list-azure-ad-users` (with optional search, paging).
  - [ ] Display results in table with checkboxes; show email, display name, department, manager.
  - [ ] Optional: default department/role/location/access level for all selected (e.g. dropdowns above table).
  - [ ] "Import selected" button.
- [ ] **4. Reuse create-user pipeline**
  - [ ] For each selected AD user, build one object in the **exact same shape** as CSV row (Email, Full Name, First Name, Last Name, Username, Phone, Employee ID, Access Level, Location, Department, Role, Manager).
  - [ ] Use existing validation (validateLocation, validateDepartment, validateRole, validateDepartmentRolePair, validateAccessLevel).
  - [ ] Call existing `create-user` Edge Function; then run same pass 2 (department, role, location, manager assignment). Prefer reusing `processUserImport`-style logic or a shared helper that accepts a "row" and runs create + assignments.
- [ ] **5. Mapping and edge cases**
  - [ ] Missing `mail`: use `userPrincipalName` for email/username.
  - [ ] Missing `givenName`/`surname`: derive from `displayName` (e.g. split on first space) or leave last name empty and use displayName for both if necessary.
  - [ ] Department/role from AD don’t exist in our DB: skip or warn; do not block import (import without dept/role or with defaults).
  - [ ] Already-imported user (email exists): same behaviour as CSV—create-user will fail or return "already exists"; show in error report.
- [ ] **6. Testing and docs**
  - [ ] Happy path: connect, list users, select, import.
  - [ ] Invalid/missing secrets → clear error in UI.
  - [ ] Graph permission errors → clear message.
  - [ ] Already-existing email → error report as in CSV import.
  - [ ] Short runbook: "Connect Azure AD" (app registration, permissions, where to set secrets).

---

## Optional future work

| Feature | Description | Est. effort |
|---------|-------------|-------------|
| **Filter by group** | Pass `groupId` to Edge Function; call Graph `GET /groups/{id}/members` and return only those users. | +0.5–1 day |
| **Filter by OU / unit** | If using `department` or extension attributes, add `$filter` in Graph query. | +0.5 day |
| **Scheduled sync** | Nightly job: fetch AD users, diff with our `profiles`, create new users, optionally deactivate removed AD users. | +3–5 days |
| **Multi-tenant Azure AD** | Different Azure AD per customer; tenant ID (and maybe app registration) per org; config UI for admins. | +1–2 days |

---

## Effort summary

| Phase | Estimate |
|-------|----------|
| Core: Edge Function + secrets + UI + reuse create-user + mapping | **5–7 days** |
| Filter by group | +0.5–1 day |
| Scheduled sync | +3–5 days |

---

## References

- **Existing import:** `organisation/src/components/admin/ImportUsersDialog.tsx` (CSV → `processUserImport` → `create-user` + assignments).
- **Create-user:** `learn/supabase/functions/create-user` (or shared location per TECHNICAL_DEBT.md).
- **Architecture:** `organisation/docs/ARCHITECTURE.md` (Supabase client pattern; use `useOrganisationContext()` and pass `supabaseClient`).
- **Microsoft Graph Users:** https://learn.microsoft.com/en-us/graph/api/user-list
- **Manager:** https://learn.microsoft.com/en-us/graph/api/user-list-manager
