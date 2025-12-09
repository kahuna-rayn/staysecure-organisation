import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { RoleSelector } from './RoleSelector';
import { useUserRoleById, AppRole } from '@/hooks/useUserRoleById';
import { useUserRole } from '@/hooks/useUserRole';
import { useQuery } from '@tanstack/react-query';
import { useOrganisationContextSafe } from '@/context/OrganisationContext';
import { useAuth } from 'staysecure-auth';
import { Loader2, Key } from 'lucide-react';

interface UserRoleFieldProps {
  userId: string;
}

export const UserRoleField: React.FC<UserRoleFieldProps> = ({ userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { role, isLoading, updateRole, isUpdating, getRoleDisplayName, getRoleBadgeVariant } = useUserRoleById(userId);
  const { hasAdminAccess } = useUserRole();
  const organisationContext = useOrganisationContextSafe();
  const { user } = useAuth();
  
  // Check if current user is super_admin (only if context is available)
  const { data: currentUserRole } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user?.id || !organisationContext?.supabaseClient) return null;
      const { data } = await organisationContext.supabaseClient
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();
      return data?.role;
    },
    enabled: !!user?.id && !!organisationContext?.supabaseClient
  });
  
  const isSuperAdmin = currentUserRole === 'super_admin';

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
      <RoleSelector
        value={role || 'user'}
        onValueChange={(value) => handleRoleChange(value as AppRole)}
        isSuperAdmin={isSuperAdmin}
        disabled={isUpdating}
        triggerClassName="w-48 h-8 text-sm"
      />
      {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
    </div>
  );
};
