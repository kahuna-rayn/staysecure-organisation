/**
 * Tests for OrganisationContext
 */

import React from 'react';
import { renderHook } from '@testing-library/react';
import { OrganisationProvider, useOrganisationContext } from '@/context/OrganisationContext';
import type { OrganisationConfig } from '@/types';
import { createClient } from '@supabase/supabase-js';

// Mock Supabase client
const mockSupabaseClient = createClient('https://test.supabase.co', 'test-anon-key');

describe('OrganisationProvider', () => {
  const defaultConfig: OrganisationConfig = {
    supabaseClient: mockSupabaseClient,
  };

  it('should provide context value to children', () => {
    const { result } = renderHook(() => useOrganisationContext(), {
      wrapper: ({ children }) => (
        <OrganisationProvider config={defaultConfig}>
          {children}
        </OrganisationProvider>
      ),
    });

    expect(result.current).toBeDefined();
    expect(result.current.supabaseClient).toBe(mockSupabaseClient);
  });

  describe('isTabEnabled', () => {
    it('should return true for enabled tabs', () => {
      const config: OrganisationConfig = {
        supabaseClient: mockSupabaseClient,
        enabledTabs: ['users', 'roles', 'departments'],
      };

      const { result } = renderHook(() => useOrganisationContext(), {
        wrapper: ({ children }) => (
          <OrganisationProvider config={config}>
            {children}
          </OrganisationProvider>
        ),
      });

      expect(result.current.isTabEnabled('users')).toBe(true);
      expect(result.current.isTabEnabled('roles')).toBe(true);
      expect(result.current.isTabEnabled('departments')).toBe(true);
    });

    it('should return false for disabled tabs', () => {
      const config: OrganisationConfig = {
        supabaseClient: mockSupabaseClient,
        enabledTabs: ['users', 'roles'],
      };

      const { result } = renderHook(() => useOrganisationContext(), {
        wrapper: ({ children }) => (
          <OrganisationProvider config={config}>
            {children}
          </OrganisationProvider>
        ),
      });

      expect(result.current.isTabEnabled('departments')).toBe(false);
      expect(result.current.isTabEnabled('locations')).toBe(false);
    });

    it('should use default enabled tabs when not provided', () => {
      const { result } = renderHook(() => useOrganisationContext(), {
        wrapper: ({ children }) => (
          <OrganisationProvider config={defaultConfig}>
            {children}
          </OrganisationProvider>
        ),
      });

      expect(result.current.isTabEnabled('users')).toBe(true);
      expect(result.current.isTabEnabled('roles')).toBe(true);
      expect(result.current.isTabEnabled('departments')).toBe(true);
      expect(result.current.isTabEnabled('locations')).toBe(true);
      expect(result.current.isTabEnabled('certificates')).toBe(true);
      expect(result.current.isTabEnabled('profile')).toBe(true);
    });

    it('should handle empty enabledTabs array', () => {
      const config: OrganisationConfig = {
        supabaseClient: mockSupabaseClient,
        enabledTabs: [],
      };

      const { result } = renderHook(() => useOrganisationContext(), {
        wrapper: ({ children }) => (
          <OrganisationProvider config={config}>
            {children}
          </OrganisationProvider>
        ),
      });

      expect(result.current.isTabEnabled('users')).toBe(false);
      expect(result.current.isTabEnabled('roles')).toBe(false);
    });
  });

  describe('hasPermission', () => {
    it('should return true for allowed permissions', () => {
      const config: OrganisationConfig = {
        supabaseClient: mockSupabaseClient,
        permissions: {
          canCreateUsers: true,
          canEditUsers: true,
          canDeleteUsers: true,
        },
      };

      const { result } = renderHook(() => useOrganisationContext(), {
        wrapper: ({ children }) => (
          <OrganisationProvider config={config}>
            {children}
          </OrganisationProvider>
        ),
      });

      expect(result.current.hasPermission('canCreateUsers')).toBe(true);
      expect(result.current.hasPermission('canEditUsers')).toBe(true);
      expect(result.current.hasPermission('canDeleteUsers')).toBe(true);
    });

    it('should return false for denied permissions', () => {
      const config: OrganisationConfig = {
        supabaseClient: mockSupabaseClient,
        permissions: {
          canCreateUsers: false,
          canEditUsers: false,
          canDeleteUsers: false,
        },
      };

      const { result } = renderHook(() => useOrganisationContext(), {
        wrapper: ({ children }) => (
          <OrganisationProvider config={config}>
            {children}
          </OrganisationProvider>
        ),
      });

      expect(result.current.hasPermission('canCreateUsers')).toBe(false);
      expect(result.current.hasPermission('canEditUsers')).toBe(false);
      expect(result.current.hasPermission('canDeleteUsers')).toBe(false);
    });

    it('should use default permissions when not provided', () => {
      const { result } = renderHook(() => useOrganisationContext(), {
        wrapper: ({ children }) => (
          <OrganisationProvider config={defaultConfig}>
            {children}
          </OrganisationProvider>
        ),
      });

      expect(result.current.hasPermission('canCreateUsers')).toBe(true);
      expect(result.current.hasPermission('canEditUsers')).toBe(true);
      expect(result.current.hasPermission('canDeleteUsers')).toBe(true);
      expect(result.current.hasPermission('canManageRoles')).toBe(true);
      expect(result.current.hasPermission('canManageDepartments')).toBe(true);
      expect(result.current.hasPermission('canManageLocations')).toBe(true);
      expect(result.current.hasPermission('canManageCertificates')).toBe(true);
      expect(result.current.hasPermission('canManageProfile')).toBe(true);
    });

    it('should merge provided permissions with defaults', () => {
      const config: OrganisationConfig = {
        supabaseClient: mockSupabaseClient,
        permissions: {
          canCreateUsers: false,
          // Other permissions should use defaults
        },
      };

      const { result } = renderHook(() => useOrganisationContext(), {
        wrapper: ({ children }) => (
          <OrganisationProvider config={config}>
            {children}
          </OrganisationProvider>
        ),
      });

      expect(result.current.hasPermission('canCreateUsers')).toBe(false);
      expect(result.current.hasPermission('canEditUsers')).toBe(true); // default
      expect(result.current.hasPermission('canManageRoles')).toBe(true); // default
    });

    it('should handle all permission types', () => {
      const config: OrganisationConfig = {
        supabaseClient: mockSupabaseClient,
        permissions: {
          canCreateUsers: true,
          canEditUsers: true,
          canDeleteUsers: true,
          canManageRoles: true,
          canManageDepartments: true,
          canManageLocations: true,
          canManageCertificates: true,
          canManageProfile: true,
        },
      };

      const { result } = renderHook(() => useOrganisationContext(), {
        wrapper: ({ children }) => (
          <OrganisationProvider config={config}>
            {children}
          </OrganisationProvider>
        ),
      });

      expect(result.current.hasPermission('canCreateUsers')).toBe(true);
      expect(result.current.hasPermission('canEditUsers')).toBe(true);
      expect(result.current.hasPermission('canDeleteUsers')).toBe(true);
      expect(result.current.hasPermission('canManageRoles')).toBe(true);
      expect(result.current.hasPermission('canManageDepartments')).toBe(true);
      expect(result.current.hasPermission('canManageLocations')).toBe(true);
      expect(result.current.hasPermission('canManageCertificates')).toBe(true);
      expect(result.current.hasPermission('canManageProfile')).toBe(true);
    });
  });

  describe('useOrganisationContext', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useOrganisationContext());
      }).toThrow('useOrganisationContext must be used within OrganisationProvider');

      consoleSpy.mockRestore();
    });

    it('should provide config properties in context', () => {
      const onNavigate = vi.fn();
      const onUserAction = vi.fn();
      const config: OrganisationConfig = {
        supabaseClient: mockSupabaseClient,
        enabledTabs: ['users'],
        theme: { primaryColor: '#000000' },
        permissions: { canCreateUsers: true },
        onNavigate,
        onUserAction,
      };

      const { result } = renderHook(() => useOrganisationContext(), {
        wrapper: ({ children }) => (
          <OrganisationProvider config={config}>
            {children}
          </OrganisationProvider>
        ),
      });

      expect(result.current.enabledTabs).toEqual(['users']);
      expect(result.current.theme).toEqual({ primaryColor: '#000000' });
      expect(result.current.permissions).toEqual({ canCreateUsers: true });
      expect(result.current.onNavigate).toBe(onNavigate);
      expect(result.current.onUserAction).toBe(onUserAction);
    });
  });
});

