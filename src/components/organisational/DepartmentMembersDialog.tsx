import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Printer, Download, FileText, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useOrganisationContext } from '../../context/OrganisationContext';
import XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface DepartmentMembersDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId?: string; // If provided, show only this department's members
  departmentName?: string; // For display purposes
}

interface MemberData {
  departmentName: string;
  userName: string;
  roleName: string;
  email: string;
  status: string;
}

export const DepartmentMembersDialog: React.FC<DepartmentMembersDialogProps> = ({
  isOpen,
  onOpenChange,
  departmentId,
  departmentName,
}) => {
  const { supabaseClient } = useOrganisationContext();
  const printRef = useRef<HTMLDivElement>(null);

  // Fetch members data
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['department-members', departmentId],
    queryFn: async () => {
      // Query user_departments with joins to get all the data
      let query = supabaseClient
        .from('user_departments')
        .select(`
          user_id,
          is_primary,
          departments!inner(id, name),
          profiles!inner(id, full_name, email, status)
        `);

      if (departmentId) {
        query = query.eq('department_id', departmentId);
      }

      const { data: userDepts, error: userDeptsError } = await query;

      if (userDeptsError) throw userDeptsError;

      // Get user roles for each user
      const userIds = [...new Set((userDepts || []).map((ud: any) => ud.user_id))];
      
      const { data: userRoles, error: rolesError } = await supabaseClient
        .from('user_profile_roles')
        .select(`
          user_id,
          is_primary,
          roles!inner(id, name)
        `)
        .in('user_id', userIds);

      if (rolesError) throw rolesError;

      // Create a map of user_id to primary role
      const roleMap = new Map<string, string>();
      (userRoles || []).forEach((ur: any) => {
        if (ur.is_primary || !roleMap.has(ur.user_id)) {
          roleMap.set(ur.user_id, ur.roles?.name || 'No Role');
        }
      });

      // Transform to MemberData format
      const memberData: MemberData[] = (userDepts || []).map((ud: any) => ({
        departmentName: ud.departments?.name || 'Unknown',
        userName: ud.profiles?.full_name || 'Unknown User',
        roleName: roleMap.get(ud.user_id) || 'No Role',
        email: ud.profiles?.email || '',
        status: ud.profiles?.status || 'Unknown',
      }));

      // Sort by department, then by user name
      memberData.sort((a, b) => {
        const deptCompare = a.departmentName.localeCompare(b.departmentName);
        if (deptCompare !== 0) return deptCompare;
        return a.userName.localeCompare(b.userName);
      });

      return memberData;
    },
    enabled: isOpen,
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportExcel = () => {
    if (members.length === 0) return;

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(members.map(m => ({
      'Department': m.departmentName,
      'User': m.userName,
      'Role': m.roleName,
      'Email': m.email,
      'Status': m.status,
    })));

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Department Members');
    
    const fileName = departmentName 
      ? `${departmentName.replace(/\s+/g, '_')}_members.xlsx`
      : 'all_department_members.xlsx';
    
    XLSX.writeFile(workbook, fileName);
  };

  const handleExportPDF = () => {
    if (members.length === 0) return;

    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(departmentName ? `${departmentName} Members` : 'Department Members Report', 14, 20);
    
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    doc.text(`Total Members: ${members.length}`, 14, 34);

    autoTable(doc, {
      head: [['Department', 'User', 'Role', 'Email', 'Status']],
      body: members.map(m => [
        m.departmentName,
        m.userName,
        m.roleName,
        m.email,
        m.status,
      ]),
      startY: 40,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    const fileName = departmentName 
      ? `${departmentName.replace(/\s+/g, '_')}_members.pdf`
      : 'all_department_members.pdf';
    
    doc.save(fileName);
  };

  const title = departmentName 
    ? `${departmentName} Members`
    : 'All Department Members';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>
            {departmentName 
              ? `Users assigned to ${departmentName}`
              : 'All users grouped by department'
            }
          </DialogDescription>
        </DialogHeader>

        {/* Export Actions */}
        <div className="flex gap-2 py-2">
          <Button onClick={handlePrint} variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button onClick={handleExportExcel} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button onClick={handleExportPDF} variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>

        {/* Members Table */}
        <div ref={printRef} className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <span className="text-muted-foreground">Loading members...</span>
            </div>
          ) : members.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <span className="text-muted-foreground">No members found</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {!departmentId && <TableHead>Department</TableHead>}
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member, index) => (
                  <TableRow key={index}>
                    {!departmentId && <TableCell>{member.departmentName}</TableCell>}
                    <TableCell className="font-medium">{member.userName}</TableCell>
                    <TableCell>{member.roleName}</TableCell>
                    <TableCell className="text-muted-foreground">{member.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={member.status === 'Active' ? 'default' : 'secondary'}
                        className={member.status === 'Active' ? 'bg-green-500' : ''}
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Footer with count */}
        <div className="pt-2 border-t text-sm text-muted-foreground">
          Total: {members.length} member{members.length !== 1 ? 's' : ''}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentMembersDialog;
