import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Printer, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useOrganisationContext } from '../../context/OrganisationContext';
import { debugLog } from '../../utils/debugLog';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useReactToPrint } from 'react-to-print';

interface RoleMembersDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  roleId?: string;
  roleName?: string;
}

interface MemberData {
  roleName: string;
  userName: string;
  departmentName: string;
  email: string;
  status: string;
}

export const RoleMembersDialog: React.FC<RoleMembersDialogProps> = ({
  isOpen,
  onOpenChange,
  roleId,
  roleName,
}) => {
  const { supabaseClient } = useOrganisationContext();
  const printRef = useRef<HTMLDivElement>(null);

  // Fetch members data
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['role-members', roleId],
    queryFn: async () => {
      debugLog('[RoleMembersDialog] Fetching members, roleId:', roleId);
      
      // Get user_profile_roles
      let roleQuery = supabaseClient
        .from('user_profile_roles')
        .select('user_id, role_id, is_primary');

      if (roleId) {
        roleQuery = roleQuery.eq('role_id', roleId);
      }

      const { data: userRoles, error: userRolesError } = await roleQuery;

      debugLog('[RoleMembersDialog] user_profile_roles result:', { count: userRoles?.length, error: userRolesError?.message });

      if (userRolesError) throw userRolesError;

      // Get unique user IDs
      const userIds = [...new Set((userRoles || []).map((ur: any) => ur.user_id))];
      debugLog('[RoleMembersDialog] Unique user IDs:', userIds.length);
      
      if (userIds.length === 0) {
        debugLog('[RoleMembersDialog] No users found with roles');
        return [];
      }

      // Get profiles for these users
      const { data: profiles, error: profilesError } = await supabaseClient
        .from('profiles')
        .select('id, full_name, username, status')
        .in('id', userIds);

      debugLog('[RoleMembersDialog] profiles result:', { count: profiles?.length, error: profilesError?.message });

      if (profilesError) throw profilesError;

      // Get unique role IDs and fetch role names
      const roleIds = [...new Set((userRoles || []).map((ur: any) => ur.role_id).filter(Boolean))];
      
      let rolesData: any[] = [];
      if (roleIds.length > 0) {
        const { data: roles, error: rolesError } = await supabaseClient
          .from('roles')
          .select('role_id, name')
          .in('role_id', roleIds);
        
        debugLog('[RoleMembersDialog] roles result:', { count: roles?.length, error: rolesError?.message });
        
        if (rolesError) throw rolesError;
        rolesData = roles || [];
      }

      // Get user departments for context
      const { data: userDepts, error: userDeptsError } = await supabaseClient
        .from('user_departments')
        .select('user_id, department_id, is_primary, departments(name)')
        .in('user_id', userIds);

      debugLog('[RoleMembersDialog] user_departments result:', { count: userDepts?.length, error: userDeptsError?.message });

      if (userDeptsError) throw userDeptsError;

      // Create maps for quick lookup
      const profileMap = new Map<string, any>();
      (profiles || []).forEach((p: any) => profileMap.set(p.id, p));

      const roleNameMap = new Map<string, string>();
      rolesData.forEach((r: any) => roleNameMap.set(r.role_id, r.name));

      // Map user to primary department
      const userDeptMap = new Map<string, string>();
      (userDepts || []).forEach((ud: any) => {
        if (ud.is_primary || !userDeptMap.has(ud.user_id)) {
          userDeptMap.set(ud.user_id, ud.departments?.name || 'No Department');
        }
      });

      // Transform to MemberData format - one row per user-role assignment
      const memberData: MemberData[] = (userRoles || []).map((ur: any) => {
        const profile = profileMap.get(ur.user_id);
        return {
          roleName: roleNameMap.get(ur.role_id) || 'Unknown',
          userName: profile?.full_name || 'Unknown User',
          departmentName: userDeptMap.get(ur.user_id) || 'No Department',
          email: profile?.username || '',
          status: profile?.status || 'Unknown',
        };
      });

      // Sort by role name, then user name
      memberData.sort((a, b) => {
        const roleCompare = a.roleName.localeCompare(b.roleName);
        if (roleCompare !== 0) return roleCompare;
        return a.userName.localeCompare(b.userName);
      });

      debugLog('[RoleMembersDialog] Processed members:', memberData.length);
      return memberData;
    },
    enabled: isOpen,
  });

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: roleName ? `${roleName} Members Report` : 'All Role Members Report',
  });

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(members.map(m => ({
      Role: m.roleName,
      User: m.userName,
      Department: m.departmentName,
      Email: m.email,
      Status: m.status,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Members');
    XLSX.writeFile(workbook, `${roleName ? roleName.replace(/\s/g, '_') : 'All_Roles'}_Members_Report.xlsx`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(roleName ? `${roleName} Members` : 'All Role Members', 14, 15);
    autoTable(doc, {
      head: [['Role', 'User', 'Department', 'Email', 'Status']],
      body: members.map(m => [m.roleName, m.userName, m.departmentName, m.email, m.status]),
      startY: 20,
    });
    doc.save(`${roleName ? roleName.replace(/\s/g, '_') : 'All_Roles'}_Members_Report.pdf`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {roleName ? `${roleName} Members` : 'All Role Members'}
          </DialogTitle>
          <DialogDescription>
            {roleName ? `Users assigned to the ${roleName} role.` : 'All users and their assigned roles.'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 mb-4">
          <Button onClick={handlePrint} variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
          <Button onClick={handleExportExcel} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export Excel
          </Button>
          <Button onClick={handleExportPDF} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export PDF
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading members...</div>
        ) : members.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No members found {roleName ? `for ${roleName}` : ''}.
          </div>
        ) : (
          <div ref={printRef}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell>{member.roleName}</TableCell>
                    <TableCell>{member.userName}</TableCell>
                    <TableCell>{member.departmentName}</TableCell>
                    <TableCell className="text-muted-foreground">{member.email}</TableCell>
                    <TableCell>
                      <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                        {member.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RoleMembersDialog;
