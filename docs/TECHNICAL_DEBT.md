# Technical Debt & Future Refactoring

## User Deletion: Hard Delete vs Soft Delete

### Current Implementation

The `delete-user` Edge Function currently performs a **hard delete**:
1. Deletes records from `profiles`, `user_roles`, and related tables
2. Attempts to delete from `auth.users`
3. If `auth.users` deletion fails (due to FK constraints), falls back to banning the user for ~100 years

**Location:** `supabase/functions/delete-user/index.ts`

### Problem

Hard deletion causes several issues:
- **No way to restore deleted users** - Once `profiles` and `user_roles` are deleted, they're gone
- **Inaccurate counts** - Staff counts, dashboard metrics, analytics exclude deleted users entirely
- **Lost audit trail** - Historical data is removed, making it hard to track past activity
- **Referential integrity** - Some records may still reference deleted users, causing inconsistencies

### Proposed Solution: Soft Delete Pattern

Implement a **soft delete** pattern across the application:

1. **Add `deleted_at` timestamp column** to:
   - `profiles`
   - `user_roles`
   - `user_departments`
   - `user_profile_roles`
   - Other user-related tables as needed

2. **Update delete-user Edge Function** to:
   - Set `deleted_at = NOW()` instead of deleting records
   - Keep auth ban as secondary measure
   - Preserve all related records

3. **Update all queries** across the application to filter deleted records:
   ```sql
   WHERE deleted_at IS NULL
   ```

4. **Areas requiring updates:**
   - Staff/user counts
   - Dashboards
   - Analytics queries
   - Reports
   - User management UI (show/hide deleted users)
   - All user profile queries
   - All role/department queries

5. **Create undelete functionality:**
   - Edge Function to restore users: `undelete-user`
   - Sets `deleted_at = NULL`
   - Unbans user in auth
   - Restores access

### Scope of Changes

**High Impact Areas:**
- `src/hooks/useUserProfiles.ts` - Filter deleted users
- `src/components/admin/UserManagement.tsx` - Show/hide deleted users
- `src/components/dashboard/UserDashboard.tsx` - Exclude deleted users
- All analytics/reporting components
- All count/statistics queries

**Medium Impact Areas:**
- Edge Functions that query user data
- Database views that aggregate user data
- Export/import functionality

**Low Impact Areas:**
- Historical data queries (may want to include deleted users)
- Audit logs (should always include deleted users)

### Implementation Notes

- This is a **breaking change** - requires careful migration
- Consider adding a feature flag to toggle between hard/soft delete during transition
- May need to backfill `deleted_at` for users already deleted (if audit records exist)
- Update API documentation
- Update user-facing documentation

### Priority

**Low-Medium** - Not blocking current functionality, but will become more important as:
- More users are deleted
- Analytics become more critical
- Compliance/audit requirements increase

### Related Files

- `supabase/functions/delete-user/index.ts` - Current implementation
- `src/utils/userManagementActions.ts` - Organisation module delete handler
- `src/components/admin/UserManagement.tsx` - User management UI

---

## Build & Release Automation

### Current State

The module requires **manual building** before committing:
1. Make code changes
2. Run `npm run build` to generate `dist/` files
3. Commit both source and `dist/` files
4. Push to repository

**Problem:** Easy to forget building, leading to outdated `dist/` files in the repository. Consuming apps (like `learn`) install from git and rely on the built files in `dist/`.

### Proposed Solution: CI/CD Pipeline

**Option 1: GitHub Actions (Recommended)**

Create `.github/workflows/build.yml` to:
- Trigger on push to `main` (or PRs)
- Install dependencies (`npm install`)
- Run tests (`npm test`)
- Build the module (`npm run build`)
- Commit `dist/` back to the repo automatically

**Benefits:**
- Ensures `dist/` is always up to date
- No manual build step required
- Tests run automatically
- Consistent builds across environments

**Workflow structure:**
```yaml
name: Build and Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run build
      - name: Commit dist files
        run: |
          git config user.name "github-actions"
          git config user.email "github-actions@github.com"
          git add dist/
          git commit -m "Build: Update dist files" || exit 0
          git push
```

### Auto Version Bumping

**Current State:** Manual version updates in `package.json`

**Proposed Solution: Use `standard-version`**

A tool that automates versioning and CHANGELOG generation based on conventional commits.

**Setup:**
1. Install: `npm install --save-dev standard-version`
2. Add script to `package.json`: `"release": "standard-version"`
3. Use conventional commit messages:
   - `feat:` → minor version bump (1.0.6 → 1.1.0)
   - `fix:` → patch version bump (1.0.6 → 1.0.7)
   - `BREAKING CHANGE:` → major version bump (1.0.6 → 2.0.0)

**Usage:**
```bash
npm run release
```

**Benefits:**
- Automatic version bumping based on commit history
- Generates/updates CHANGELOG.md automatically
- Creates git tag
- Commits everything in one step
- Can be integrated into CI/CD pipeline

**Alternative Options:**
- `npm version patch/minor/major` - Built-in npm command
- `release-please` (Google) - Automated releases via PR
- GitHub Actions with conventional commits parser

**Recommendation:** Use `standard-version` for simplicity and control over release timing.

---

**Created:** 2025-12-05  
**Status:** Future Work / Technical Debt

## User Management Edge Functions Location

### Current Implementation

User-related Edge Functions (`create-user`, `delete-user`) are currently located in the **`learn` app**:
- `learn/supabase/functions/create-user/index.ts`
- `learn/supabase/functions/delete-user/index.ts`

However, these functions are called from the **`organisation` module**:
- `organisation/src/utils/userManagementActions.ts` - `handleCreateUser()` and `handleDeleteUser()`
- `organisation/src/components/admin/ImportUsersDialog.tsx` - Uses `create-user` function

### Problem

**Architectural inconsistency:**
- User management logic belongs in the `organisation` module (it's the module's core responsibility)
- Edge Functions are in the `learn` app, making them app-specific rather than shared
- Other consuming apps (e.g., `govern`, `hub`) that use the `organisation` module may need to duplicate these functions
- Creates dependency on `learn` app for core user management functionality

### Proposed Solution

**Move Edge Functions to a shared location or the `organisation` module:**

**Option 1: Move to `organisation` module (Recommended)**
- Create `organisation/supabase/functions/` directory
- Move `create-user` and `delete-user` functions there
- Update all consuming apps to reference the new location
- Ensures user management functions are co-located with user management code

**Option 2: Create shared Edge Functions repository**
- Create a separate repository for shared Supabase Edge Functions
- Both `organisation` module and consuming apps reference this shared repo
- More complex but allows true sharing across multiple projects

**Option 3: Keep in root `supabase/functions/`**
- Move functions to `/Users/naresh/staysecure-projects/supabase/functions/`
- All apps can reference them from the shared location
- Requires coordination across all apps

### Scope of Changes

**Files to move:**
- `learn/supabase/functions/create-user/index.ts` → `organisation/supabase/functions/create-user/index.ts`
- `learn/supabase/functions/delete-user/index.ts` → `organisation/supabase/functions/delete-user/index.ts`

**Files to update:**
- All consuming apps (`learn`, `govern`, `hub`) - Update Supabase config to reference new function locations
- Deployment scripts - Update to deploy from new location
- Documentation - Update function locations in docs

**Related Edge Functions to consider:**
- `update-user-password` - May also belong in `organisation` module
- Any other user-related functions

### Implementation Notes

- This is a **breaking change** - requires coordination across all consuming apps
- Need to update Supabase project configuration in all apps
- May need to update deployment pipelines
- Consider backward compatibility during transition period
- Update all references in code comments and documentation

### Priority

**Medium** - Not blocking current functionality, but important for:
- Proper module architecture and separation of concerns
- Reusability across multiple consuming apps
- Maintainability and code organization

### Related Files

- `learn/supabase/functions/create-user/index.ts` - Current location
- `learn/supabase/functions/delete-user/index.ts` - Current location
- `organisation/src/utils/userManagementActions.ts` - Calls these functions
- `organisation/src/components/admin/ImportUsersDialog.tsx` - Uses `create-user`

---
