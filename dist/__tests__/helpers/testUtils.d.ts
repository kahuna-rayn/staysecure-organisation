import { default as React } from 'react';
import { RenderOptions } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { OrganisationConfig } from '../../types';

export declare const createTestSupabaseClient: () => import('@supabase/supabase-js').SupabaseClient<any, "public", "public", any, any>;
export declare const createTestQueryClient: () => QueryClient;
export declare const createTestConfig: (overrides?: Partial<OrganisationConfig>) => OrganisationConfig;
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    config?: Partial<OrganisationConfig>;
    queryClient?: QueryClient;
}
export declare const renderWithProviders: (ui: React.ReactElement, { config, queryClient, ...renderOptions }?: CustomRenderOptions) => any;
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
//# sourceMappingURL=testUtils.d.ts.map