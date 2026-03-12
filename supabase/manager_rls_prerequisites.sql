-- =============================================================================
-- Manager RLS prerequisites for Knowledge module
-- =============================================================================
-- Defines is_direct_manager_of() and can_manage_user() helper functions
-- needed by manager_knowledge_access.sql on instances that were created
-- before 20260203100000_fix_manager_rls_permission_based.sql was applied.
--
-- is_user_in_managed_department() is assumed to already exist
-- (defined in 20251001080508_*.sql which is in all instance dumps).
--
-- Run this BEFORE manager_knowledge_access.sql on non-dev instances.
-- Once applied everywhere, move to _archive/.
-- =============================================================================

CREATE OR REPLACE FUNCTION public.is_direct_manager_of(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = _user_id AND p.manager = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.can_manage_user(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT is_user_in_managed_department(auth.uid(), _user_id)
      OR is_direct_manager_of(_user_id);
$$;
