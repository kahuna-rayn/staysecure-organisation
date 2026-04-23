import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Printer, Users, FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useOrganisationContext } from '../../context/OrganisationContext';
import debug from '../../utils/debug';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useReactToPrint } from 'react-to-print';

interface LocationMembersDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  locationId?: string;
  locationName?: string;
}

interface MemberData {
  locationName: string;
  userName: string;
  roleName: string;
  departmentName: string;
  email: string;
  status: string;
}

export const LocationMembersDialog: React.FC<LocationMembersDialogProps> = ({
  isOpen,
  onOpenChange,
  locationId,
  locationName,
}) => {
  const { supabaseClient } = useOrganisationContext();
  const printRef = useRef<HTMLDivElement>(null);

  const { data: members = [], isLoading } = useQuery({
    queryKey: ['location-members', locationId],
    queryFn: async () => {
      debug.log('[LocationMembersDialog] Fetching members, locationId:', locationId);

      // Fetch profiles filtered by location_id
      let profileQuery = supabaseClient
        .from('profiles')
        .select('id, full_name, email, status, location_id');

      if (locationId) {
        profileQuery = profileQuery.eq('location_id', locationId);
      } else {
        profileQuery = profileQuery.not('location_id', 'is', null);
      }

      const { data: profiles, error: profilesError } = await profileQuery;

      debug.log('[LocationMembersDialog] profiles result:', { count: profiles?.length, error: profilesError?.message });

      if (profilesError) throw profilesError;

      if (!profiles || profiles.length === 0) {
        debug.log('[LocationMembersDialog] No users found for location(s)');
        return [];
      }

      const userIds = profiles.map((p: any) => p.id);

      // Fetch location names for the "all locations" case
      const locationIds = [...new Set(profiles.map((p: any) => p.location_id).filter(Boolean))];
      const locationNameMap = new Map<string, string>();

      if (locationIds.length > 0) {
        const { data: locationsData, error: locationsError } = await supabaseClient
          .from('locations')
          .select('id, name')
          .in('id', locationIds);

        debug.log('[LocationMembersDialog] locations result:', { count: locationsData?.length, error: locationsError?.message });

        if (locationsError) throw locationsError;
        (locationsData || []).forEach((l: any) => locationNameMap.set(l.id, l.name));
      }

      // Fetch roles for these users
      const { data: userProfileRoles, error: uprError } = await supabaseClient
        .from('user_profile_roles')
        .select('user_id, role_id, is_primary')
        .in('user_id', userIds);

      debug.log('[LocationMembersDialog] user_profile_roles result:', { count: userProfileRoles?.length, error: uprError?.message });

      if (uprError) throw uprError;

      const roleIds = [...new Set((userProfileRoles || []).map((upr: any) => upr.role_id).filter(Boolean))];
      let rolesData: any[] = [];

      if (roleIds.length > 0) {
        const { data: roles, error: rolesError } = await supabaseClient
          .from('roles')
          .select('role_id, name')
          .in('role_id', roleIds);

        debug.log('[LocationMembersDialog] roles result:', { count: roles?.length, error: rolesError?.message });

        if (rolesError) throw rolesError;
        rolesData = roles || [];
      }

      // Fetch departments for these users
      const { data: userDepts, error: userDeptsError } = await supabaseClient
        .from('user_departments')
        .select('user_id, department_id, is_primary, departments(name)')
        .in('user_id', userIds);

      debug.log('[LocationMembersDialog] user_departments result:', { count: userDepts?.length, error: userDeptsError?.message });

      if (userDeptsError) throw userDeptsError;

      // Build lookup maps
      const roleNameMap = new Map<string, string>();
      rolesData.forEach((r: any) => roleNameMap.set(r.role_id, r.name));

      const userRoleMap = new Map<string, string>();
      (userProfileRoles || []).forEach((upr: any) => {
        const roleName = roleNameMap.get(upr.role_id) || 'No Role';
        if (upr.is_primary || !userRoleMap.has(upr.user_id)) {
          userRoleMap.set(upr.user_id, roleName);
        }
      });

      const userDeptMap = new Map<string, string>();
      (userDepts || []).forEach((ud: any) => {
        if (ud.is_primary || !userDeptMap.has(ud.user_id)) {
          userDeptMap.set(ud.user_id, ud.departments?.name || 'No Department');
        }
      });

      const memberData: MemberData[] = profiles.map((p: any) => ({
        locationName: locationNameMap.get(p.location_id) || locationName || 'Unknown',
        userName: p.full_name || 'Unknown User',
        roleName: userRoleMap.get(p.id) || 'No Role',
        departmentName: userDeptMap.get(p.id) || 'No Department',
        email: p.email || '',
        status: p.status || 'Unknown',
      }));

      memberData.sort((a, b) => {
        const locCompare = a.locationName.localeCompare(b.locationName);
        if (locCompare !== 0) return locCompare;
        return a.userName.localeCompare(b.userName);
      });

      debug.log('[LocationMembersDialog] Final member data:', memberData.length, 'members');
      return memberData;
    },
    enabled: isOpen,
  });

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: locationName ? `${locationName} Members Report` : 'All Location Members Report',
  });

  const handleExportExcel = () => {
    if (members.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(members.map(m => ({
      Location: m.locationName,
      User: m.userName,
      Role: m.roleName,
      Department: m.departmentName,
      Email: m.email,
      Status: m.status,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Location Members');

    const fileName = locationName
      ? `${locationName.replace(/\s+/g, '_')}_members.xlsx`
      : 'all_location_members.xlsx';

    XLSX.writeFile(workbook, fileName);
  };

  const handleExportPDF = () => {
    if (members.length === 0) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(locationName ? `${locationName} Members` : 'Location Members Report', 14, 20);

    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    doc.text(`Total Members: ${members.length}`, 14, 34);

    autoTable(doc, {
      head: [['Location', 'User', 'Role', 'Department', 'Email', 'Status']],
      body: members.map(m => [
        m.locationName,
        m.userName,
        m.roleName,
        m.departmentName,
        m.email,
        m.status,
      ]),
      startY: 40,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    const fileName = locationName
      ? `${locationName.replace(/\s+/g, '_')}_members.pdf`
      : 'all_location_members.pdf';

    doc.save(fileName);
  };

  const title = locationName ? `${locationName} Members` : 'All Location Members';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>
            {locationName
              ? `Users assigned to ${locationName}`
              : 'All users grouped by location'
            }
          </DialogDescription>
        </DialogHeader>

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
                  {!locationId && <TableHead>Location</TableHead>}
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member, index) => (
                  <TableRow key={index}>
                    {!locationId && <TableCell>{member.locationName}</TableCell>}
                    <TableCell className="font-medium">{member.userName}</TableCell>
                    <TableCell>{member.roleName}</TableCell>
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
          )}
        </div>

        <div className="pt-2 border-t text-sm text-muted-foreground">
          Total: {members.length} member{members.length !== 1 ? 's' : ''}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationMembersDialog;
