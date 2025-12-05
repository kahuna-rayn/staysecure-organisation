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

**Created:** 2025-12-05  
**Status:** Future Work / Technical Debt
