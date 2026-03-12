import React from 'react';
import { OrganisationPanel } from './OrganisationPanel';
import { OrganisationProvider } from '../context/OrganisationContext';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useUserRole';

interface OrganisationWrapperProps {
  basePath?: string;
}

export const OrganisationWrapper: React.FC<OrganisationWrapperProps> = ({ basePath }) => {
  const { hasAdminAccess } = useUserRole();
  
  const organisationConfig = {
    supabaseClient: supabase,
    basePath,
    enabledTabs: ['users', 'roles', 'departments', 'locations', 'certificates', 'profile'],
    permissions: {
      canCreateUsers: hasAdminAccess,
      canEditUsers: hasAdminAccess,
      canDeleteUsers: hasAdminAccess,
      canManageRoles: hasAdminAccess,
      canManageDepartments: hasAdminAccess,
      canManageLocations: hasAdminAccess,
      canManageCertificates: hasAdminAccess,
      canManageProfile: hasAdminAccess,
    },
  };

  return (
    <OrganisationProvider config={organisationConfig}>
      <OrganisationPanel 
        title="Organisation"
        description="Manage users, roles, departments, and locations"
        showAdminBadge={false}
      />
    </OrganisationProvider>
  );
};
