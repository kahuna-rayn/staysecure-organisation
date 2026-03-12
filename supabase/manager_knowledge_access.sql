-- =============================================================================
-- Knowledge Module: Manager access policies
-- =============================================================================
-- Allows department managers and user managers to create document assignments
-- for the users and departments they manage.
-- Run this on each client instance, then move to _archive/.
-- =============================================================================

-- document_users: managers can assign documents to their team members
-- (users in managed departments OR direct reports)
CREATE POLICY "Managers can assign documents to their team"
  ON document_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- admin fast-path
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
        AND role IN ('super_admin', 'client_admin')
    )
    OR
    -- department manager: target user is in a department this user manages
    user_id IN (
      SELECT ud.user_id
      FROM user_departments ud
      JOIN departments d ON d.id = ud.department_id
      WHERE d.manager_id = auth.uid()
    )
    OR
    -- user manager: target user has profiles.manager = current user
    user_id IN (
      SELECT id FROM profiles WHERE manager = auth.uid()
    )
  );

-- document_departments: managers can only assign to their own departments
CREATE POLICY "Managers can assign documents to their departments"
  ON document_departments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- admin fast-path
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
        AND role IN ('super_admin', 'client_admin')
    )
    OR
    -- department manager: this user is the manager of the target department
    department_id IN (
      SELECT id FROM departments WHERE manager_id = auth.uid()
    )
  );

-- document_assignments SELECT: managers can view assignments for their team
CREATE POLICY "Managers can view their team document assignments"
  ON document_assignments
  FOR SELECT
  TO authenticated
  USING (
    -- admin fast-path
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
        AND role IN ('super_admin', 'client_admin')
    )
    OR
    -- own assignments
    user_id = auth.uid()
    OR
    -- managed department member
    user_id IN (
      SELECT ud.user_id
      FROM user_departments ud
      JOIN departments d ON d.id = ud.department_id
      WHERE d.manager_id = auth.uid()
    )
    OR
    -- direct report
    user_id IN (
      SELECT id FROM profiles WHERE manager = auth.uid()
    )
  );
