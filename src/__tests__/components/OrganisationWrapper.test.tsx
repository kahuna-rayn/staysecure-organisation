/**
 * Tests for OrganisationWrapper component
 */

import React from 'react';
import { screen, renderHook } from '@testing-library/react';
import { OrganisationWrapper } from '@/components/OrganisationWrapper';
import { renderWithProviders } from '../helpers/testUtils';
import { useOrganisationContext, OrganisationProvider } from '@/context/OrganisationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { vi } from 'vitest';

// Mock dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

// Create stub for useUserRole hook
vi.mock('@/hooks/useUserRole', () => ({
  useUserRole: vi.fn(() => ({
    hasAdminAccess: true,
  })),
}), { virtual: true });

vi.mock('@/components/OrganisationPanel', () => ({
  OrganisationPanel: ({ title, description }: { title: string; description: string }) => (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  ),
}));

describe('OrganisationWrapper', () => {
  it('should render OrganisationPanel with correct props', () => {
    renderWithProviders(<OrganisationWrapper />);

    expect(screen.getByText('Organisation')).toBeInTheDocument();
    expect(screen.getByText('Manage users, roles, departments, and locations')).toBeInTheDocument();
  });

  it('should provide OrganisationProvider with correct config', () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const supabaseClient = createClient('https://test.supabase.co', 'test-key');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <OrganisationProvider
          config={{
            supabaseClient,
            enabledTabs: ['users', 'roles', 'departments', 'locations', 'certificates', 'profile'],
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
          }}
        >
          {children}
        </OrganisationProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useOrganisationContext(), { wrapper });

    expect(result.current.enabledTabs).toContain('users');
    expect(result.current.hasPermission('canCreateUsers')).toBe(true);
  });
});

