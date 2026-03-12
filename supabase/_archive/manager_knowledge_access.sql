-- =============================================================================
-- Knowledge Module: Manager access policies
-- =============================================================================
-- Allows department managers and user managers to create document assignments
-- for the users and departments they manage.
--
-- Depends on can_manage_user() defined in:
--   20260203100000_fix_manager_rls_permission_based.sql
--
-- Run this on each client instance, then move to _archive/.
-- =============================================================================

-- document_users: managers can assign documents to their team members
CREATE POLICY "Managers can assign documents to their team"
  ON document_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    can_manage_user(user_id)
  );

-- document_departments: managers can only assign to their own departments
CREATE POLICY "Managers can assign documents to their departments"
  ON document_departments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    department_id IN (
      SELECT id FROM departments WHERE manager_id = auth.uid()
    )
  );

-- document_assignments SELECT: managers can view assignments for their team
-- (mirrors the learning_track_assignments SELECT policy)
CREATE POLICY "Managers can view their team document assignments"
  ON document_assignments
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR can_manage_user(user_id)
  );
