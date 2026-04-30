import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppRole } from '@/hooks/useUserRoleById';

interface RoleSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  isSuperAdmin?: boolean;
  /** Org admins (client_admin) can assign the author role when author seats are available */
  isAdmin?: boolean;
  /** Whether author seats are available on the license (controls author option visibility for admins) */
  hasAuthorSeats?: boolean;
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
 * - author: Available to super_admins always; available to org admins when hasAuthorSeats is true
 * - super_admin: Only if isSuperAdmin is true
 */
export const RoleSelector: React.FC<RoleSelectorProps> = ({
  value,
  onValueChange,
  isSuperAdmin = false,
  isAdmin = false,
  hasAuthorSeats = false,
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
    if (role.value === 'super_admin') return isSuperAdmin;
    // Author: super_admins always; org admins only when author seats are licensed
    if (role.value === 'author') return isSuperAdmin || (isAdmin && hasAuthorSeats);
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
