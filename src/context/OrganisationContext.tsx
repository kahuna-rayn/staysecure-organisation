/**
 * Organisation Context
 * 
 * ARCHITECTURE PATTERN (CRITICAL - DO NOT CHANGE):
 * ================================================
 * This module follows the SAME pattern as the auth module:
 * - OrganisationProvider receives `supabaseClient` via config prop (from consuming app)
 * - Functions like handleCreateUser/handleDeleteUser receive supabaseClient as parameter
 * - Components get supabaseClient from useOrganisationContext() hook
 * 
 * This ensures:
 * - Consistency with auth module pattern
 * - Module independence (no env var dependencies)
 * - Easy testing (mock the client)
 * 
 * Example usage in components:
 * ```tsx
 * const { supabaseClient } = useOrganisationContext();
 * await handleCreateUser(supabaseClient, newUser, updateProfile, onSuccess);
 * ```
 */

import React, { createContext, useContext, ReactNode } from 'react';
import type { OrganisationConfig } from '../types';

interface OrganisationContextValue extends OrganisationConfig {
  isTabEnabled: (tab: string) => boolean;
  hasPermission: (permission: keyof NonNullable<OrganisationConfig['permissions']>) => boolean;
}

const OrganisationContext = createContext<OrganisationContextValue | null>(null);

interface OrganisationProviderProps {
  config: OrganisationConfig;
  children: ReactNode;
}

const defaultPermissions = {
  canCreateUsers: true,
  canEditUsers: true,
  canDeleteUsers: true,
  canManageRoles: true,
  canManageDepartments: true,
  canManageLocations: true,
  canManageCertificates: true,
  canManageProfile: true,
};

const defaultEnabledTabs = ['users', 'roles', 'departments', 'locations', 'certificates', 'profile'];

export const OrganisationProvider: React.FC<OrganisationProviderProps> = ({ config, children }) => {
  const isTabEnabled = (tab: string): boolean => {
    const enabledTabs = config.enabledTabs || defaultEnabledTabs;
    return enabledTabs.includes(tab);
  };

  const hasPermission = (permission: keyof NonNullable<OrganisationConfig['permissions']>): boolean => {
    const permissions = { ...defaultPermissions, ...config.permissions };
    return permissions[permission] ?? true;
  };

  const contextValue: OrganisationContextValue = {
    ...config,
    isTabEnabled,
    hasPermission,
  };

  return (
    <OrganisationContext.Provider value={contextValue}>
      {children}
    </OrganisationContext.Provider>
  );
};

export const useOrganisationContext = (): OrganisationContextValue => {
  const context = useContext(OrganisationContext);
  if (!context) {
    throw new Error('useOrganisationContext must be used within OrganisationProvider');
  }
  return context;
};