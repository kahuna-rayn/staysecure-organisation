import { default as React, ReactNode } from 'react';
import { OrganisationConfig } from '../types';

interface OrganisationContextValue extends OrganisationConfig {
    isTabEnabled: (tab: string) => boolean;
    hasPermission: (permission: keyof NonNullable<OrganisationConfig['permissions']>) => boolean;
}
interface OrganisationProviderProps {
    config: OrganisationConfig;
    children: ReactNode;
}
export declare const OrganisationProvider: React.FC<OrganisationProviderProps>;
export declare const useOrganisationContext: () => OrganisationContextValue;
export {};
//# sourceMappingURL=OrganisationContext.d.ts.map