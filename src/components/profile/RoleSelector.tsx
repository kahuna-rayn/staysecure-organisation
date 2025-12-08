import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppRole } from '@/hooks/useUserRoleById';

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
export const RoleSelector: React.FC<RoleSelectorProps> = ({
  value,
  onValueChange,
  isSuperAdmin = false,
  placeholder = "Select access level",
  disabled = false,
  className,
  triggerClassName
}) => {
  // Define all possible app roles (manager is not an app role - it's a reporting relationship)
  const allRoles: { value: AppRole; label: string }[] = [
    { value: 'user', label: 'User' },
    { value: 'client_admin', label: 'Admin' },
    { value: 'author', label: 'Author' },
    { value: 'super_admin', label: 'Super Admin' },
  ];

  // Filter roles based on context
  const availableRoles = allRoles.filter(role => {
    // Super admin only roles
    if (role.value === 'author' || role.value === 'super_admin') {
      return isSuperAdmin;
    }

    // All other roles are available
    return true;
  });

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      className={className}
    >
      <SelectTrigger className={triggerClassName}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {availableRoles.map((role) => (
          <SelectItem key={role.value} value={role.value}>
            {role.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
