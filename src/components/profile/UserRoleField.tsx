import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserRoleById, AppRole } from '@/hooks/useUserRoleById';
import { useUserRole } from '@/hooks/useUserRole';
import { useOrganisationContext } from '@/context/OrganisationContext';
import { useAuth } from 'staysecure-auth';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Key } from 'lucide-react';

interface UserRoleFieldProps {
  userId: string;
}

export const UserRoleField: React.FC<UserRoleFieldProps> = ({ userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { role, isLoading, updateRole, isUpdating, getRoleDisplayName, getRoleBadgeVariant } = useUserRoleById(userId);
  const { hasAdminAccess } = useUserRole();
  const { supabaseClient } = useOrganisationContext();
  const { user } = useAuth();

  // Check if current user is super_admin
  const { data: currentUserRole } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabaseClient
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();
      return data?.role;
    },
    enabled: !!user?.id
  });

  const isSuperAdmin = currentUserRole === 'super_admin';

  // Define available roles - filter based on current user's permissions
  const allRoleOptions: { value: AppRole; label: string }[] = [
    { value: 'user', label: 'User' },
    { value: 'author', label: 'Author' },
    { value: 'client_admin', label: 'Admin' },
    { value: 'super_admin', label: 'Super Admin' },
  ];

  // Filter roles based on current user's permissions:
  // - super_admin can assign all roles
  // - client_admin can assign only: user, client_admin (NOT super_admin or author)
  const roleOptions = allRoleOptions.filter(option => {
    if (option.value === 'super_admin' || option.value === 'author') {
      return isSuperAdmin; // Only super_admin can assign super_admin and author
    }
    // All other roles (user, client_admin) are available to both super_admin and client_admin
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm text-muted-foreground">Loading role...</span>
      </div>
    );
  }

  const handleRoleChange = async (newRole: AppRole) => {
    await updateRole(newRole);
    setIsEditing(false);
  };

  // Display mode - show as text with icon
  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Key className="h-4 w-4 text-muted-foreground" />
        <Badge 
          variant={getRoleBadgeVariant(role)}
          className={`text-sm ${hasAdminAccess ? 'cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors' : ''}`}
          onClick={() => hasAdminAccess && setIsEditing(true)}
        >
          {getRoleDisplayName(role)}
        </Badge>
      </div>
    );
  }

  // Edit mode - show dropdown
  return (
    <div className="flex items-center gap-2">
      <Key className="h-4 w-4 text-muted-foreground" />
      <Select
        value={role || 'user'}
        onValueChange={(value) => handleRoleChange(value as AppRole)}
        disabled={isUpdating}
        open={isEditing}
        onOpenChange={setIsEditing}
      >
        <SelectTrigger className="w-48 h-8 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="z-50">
          {roleOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
    </div>
  );
};
