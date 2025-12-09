import { default as React } from 'react';

interface RoleSelectorProps {
    value: string;
    onValueChange: (value: string) => void;
    isSuperAdmin?: boolean;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    triggerClassName?: string;
}
/**
 * Shared role selector component that can be used for both creating and editing users.
 *
 * App roles (manager is NOT an app role - it's a reporting relationship in profiles):
 * - user: Always available
 * - client_admin: Always available (displayed as "Admin")
 * - author: Only if isSuperAdmin is true
 * - super_admin: Only if isSuperAdmin is true
 */
export declare const RoleSelector: React.FC<RoleSelectorProps>;
export {};
//# sourceMappingURL=RoleSelector.d.ts.map