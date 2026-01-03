import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useUserDepartments } from '@/hooks/useUserDepartments';
import { useUserProfileRoles } from '@/hooks/useUserProfileRoles';

interface DepartmentRolePairsDisplayProps {
  userId?: string;
}

export const DepartmentRolePairsDisplay: React.FC<DepartmentRolePairsDisplayProps> = ({ userId }) => {
  // Fetch departments and roles for this user
  const { userDepartments, isLoading: deptLoading } = useUserDepartments(userId);
  const { userRoles, isLoading: rolesLoading } = useUserProfileRoles(userId);
  
  const isLoading = deptLoading || rolesLoading;
  
  // Get primary department and primary role
  const primaryDepartment = (userDepartments || []).find(d => d.is_primary);
  const primaryRole = (userRoles || []).find(r => r.is_primary);
  
  // Build display text
  const displayText = React.useMemo(() => {
    const parts: string[] = [];
    
    if (primaryDepartment?.department_name) {
      parts.push(primaryDepartment.department_name);
    }
    
    if (primaryRole?.role_name) {
      parts.push(primaryRole.role_name);
    }
    
    return parts.join(' - ');
  }, [primaryDepartment, primaryRole]);

  if (isLoading && userId) {
    return <span className="text-muted-foreground">Loading...</span>;
  }

  if (!displayText) {
    return <span className="text-muted-foreground">No assignments</span>;
  }

  return (
    <Badge variant="secondary" className="text-xs">
      {displayText}
    </Badge>
  );
};