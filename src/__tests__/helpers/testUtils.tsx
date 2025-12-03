/**
 * Test utilities for organisation module tests
 */

import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OrganisationProvider } from '@/context/OrganisationContext';
import type { OrganisationConfig } from '@/types';
import { createClient } from '@supabase/supabase-js';

// Create a test Supabase client
export const createTestSupabaseClient = () => {
  return createClient('https://test.supabase.co', 'test-anon-key');
};

// Create a test query client
export const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

// Create default test config
export const createTestConfig = (overrides?: Partial<OrganisationConfig>): OrganisationConfig => {
  return {
    supabaseClient: createTestSupabaseClient(),
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
    ...overrides,
  };
};

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  config?: Partial<OrganisationConfig>;
  queryClient?: QueryClient;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    config,
    queryClient = createTestQueryClient(),
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const testConfig = createTestConfig(config);

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <OrganisationProvider config={testConfig}>
          {children}
        </OrganisationProvider>
      </QueryClientProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

