import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, AlertCircle, FileText, Calendar, TrendingUp, Download, ArrowLeft, ChevronRight, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useOrganisationContext } from '../../context/OrganisationContext';
import { toast } from 'sonner';
import ComplianceUserDetail from './ComplianceUserDetail';
import ComplianceDocumentDetail from './ComplianceDocumentDetail';
import ComplianceDepartmentDetail from './ComplianceDepartmentDetail';
import ComplianceRoleDetail from './ComplianceRoleDetail';

interface ComplianceStats {
  totalAssignments: number;
  completedAssignments: number;
  overdueAssignments: number;
  complianceRate: number;
}

interface DocumentStats {
  document_id: string;
  document_title: string;
  total_assignments: number;
  completed_assignments: number;
  overdue_assignments: number;
  compliance_rate: number;
}

interface UserStats {
  user_id: string;
  user_name: string;
  department: string;
  location_id?: string;
  total_assignments: number;
  completed_assignments: number;
  overdue_assignments: number;
  compliance_rate: number;
}

interface DepartmentStats {
  department: string;
  total_assignments: number;
  completed_assignments: number;
  overdue_assignments: number;
  compliance_rate: number;
}

interface RoleStats {
  role: string;
  total_assignments: number;
  completed_assignments: number;
  overdue_assignments: number;
  compliance_rate: number;
}

const ComplianceTracking: React.FC = () => {
  const { supabaseClient: supabase } = useOrganisationContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('users');
  const [showCompletedDetails, setShowCompletedDetails] = useState(false);
  const [showOverdueDetails, setShowOverdueDetails] = useState(false);

  // Detail view states
  const [selectedUserDetail, setSelectedUserDetail] = useState<{ userId: string; userName: string; department: string } | null>(null);
  const [selectedDocumentDetail, setSelectedDocumentDetail] = useState<{ documentId: string; documentTitle: string } | null>(null);
  const [selectedDepartmentDetail, setSelectedDepartmentDetail] = useState<string | null>(null);
  const [selectedRoleDetail, setSelectedRoleDetail] = useState<string | null>(null);

  const { data: overallStats } = useQuery<ComplianceStats>({
    queryKey: ['compliance-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('document_assignments')
        .select('status, due_date');

      if (error) throw error;

      const totalAssignments = data.length;
      const completedAssignments = data.filter(a => a.status === 'Completed').length;
      const overdueAssignments = data.filter(a => 
        new Date(a.due_date) < new Date() && a.status !== 'Completed'
      ).length;
      const complianceRate = totalAssignments > 0 ? (completedAssignments / totalAssignments) * 100 : 0;

      return {
        totalAssignments,
        completedAssignments,
        overdueAssignments,
        complianceRate,
      };
    },
  });

  const { data: documentStats } = useQuery<DocumentStats[]>({
    queryKey: ['document-compliance-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('document_assignments')
        .select(`
          document_id,
          status,
          due_date,
          document:documents(title)
        `);

      if (error) throw error;

      const statsMap = new Map<string, {
        title: string;
        total: number;
        completed: number;
        overdue: number;
      }>();

      data.forEach(assignment => {
        const key = assignment.document_id;
        const current = statsMap.get(key) || {
          title: assignment.document.title,
          total: 0,
          completed: 0,
          overdue: 0,
        };

        current.total++;
        if (assignment.status === 'Completed') {
          current.completed++;
        } else if (new Date(assignment.due_date) < new Date()) {
          current.overdue++;
        }

        statsMap.set(key, current);
      });

      return Array.from(statsMap.entries()).map(([document_id, stats]) => ({
        document_id,
        document_title: stats.title,
        total_assignments: stats.total,
        completed_assignments: stats.completed,
        overdue_assignments: stats.overdue,
        compliance_rate: stats.total > 0 ? (stats.completed / stats.total) * 100 : 0,
      }));
    },
  });

  const { data: userStats } = useQuery<UserStats[]>({
    queryKey: ['user-compliance-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('document_assignments')
        .select(`
          user_id,
          status,
          due_date
        `);

      if (error) throw error;

      const statsMap = new Map<string, {
        name: string;
        department: string;
        total: number;
        completed: number;
        overdue: number;
      }>();

      // Get user profiles separately (include location_id for location filter)
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, location_id');

      // Get user departments
      const { data: userDepartments } = await supabase
        .from('user_departments')
        .select(`
          user_id,
          is_primary,
          departments(name)
        `);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
      
      // Create department map, prioritizing primary departments
      const departmentMap = new Map<string, string>();
      userDepartments?.forEach(ud => {
        const deptName = ud.departments?.name || 'Unknown';
        if (ud.is_primary || !departmentMap.has(ud.user_id)) {
          departmentMap.set(ud.user_id, deptName);
        }
      });

      const locationIdMap = new Map<string, string | undefined>(
        profiles?.map(p => [p.id, p.location_id ?? undefined]) || []
      );

      data.forEach(assignment => {
        const key = assignment.user_id;
        const profile = profileMap.get(key);
        const department = departmentMap.get(key) || 'Unknown';
        const current = statsMap.get(key) || {
          name: profile?.full_name || 'Unknown',
          department,
          total: 0,
          completed: 0,
          overdue: 0,
        };

        current.total++;
        if (assignment.status === 'Completed') {
          current.completed++;
        } else if (new Date(assignment.due_date) < new Date()) {
          current.overdue++;
        }

        statsMap.set(key, current);
      });

      return Array.from(statsMap.entries()).map(([user_id, stats]) => ({
        user_id,
        user_name: stats.name,
        department: stats.department,
        location_id: locationIdMap.get(user_id),
        total_assignments: stats.total,
        completed_assignments: stats.completed,
        overdue_assignments: stats.overdue,
        compliance_rate: stats.total > 0 ? (stats.completed / stats.total) * 100 : 0,
      }));
    },
  });

  const { data: departmentStats } = useQuery<DepartmentStats[]>({
    queryKey: ['department-compliance-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('document_assignments')
        .select(`
          user_id,
          status,
          due_date
        `);

      if (error) throw error;

      const statsMap = new Map<string, {
        total: number;
        completed: number;
        overdue: number;
      }>();

      // Get user departments
      const { data: userDepartments } = await supabase
        .from('user_departments')
        .select(`
          user_id,
          is_primary,
          departments(name)
        `);

      // Create department map, prioritizing primary departments
      const departmentMap = new Map<string, string>();
      userDepartments?.forEach(ud => {
        const deptName = ud.departments?.name || 'Unknown';
        if (ud.is_primary || !departmentMap.has(ud.user_id)) {
          departmentMap.set(ud.user_id, deptName);
        }
      });

      data.forEach(assignment => {
        const department = departmentMap.get(assignment.user_id) || 'Unknown';
        const current = statsMap.get(department) || {
          total: 0,
          completed: 0,
          overdue: 0,
        };

        current.total++;
        if (assignment.status === 'Completed') {
          current.completed++;
        } else if (new Date(assignment.due_date) < new Date()) {
          current.overdue++;
        }

        statsMap.set(department, current);
      });

      return Array.from(statsMap.entries()).map(([department, stats]) => ({
        department,
        total_assignments: stats.total,
        completed_assignments: stats.completed,
        overdue_assignments: stats.overdue,
        compliance_rate: stats.total > 0 ? (stats.completed / stats.total) * 100 : 0,
      }));
    },
  });

  const { data: roleStats } = useQuery<RoleStats[]>({
    queryKey: ['role-compliance-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('document_assignments')
        .select(`
          user_id,
          status,
          due_date
        `);

      if (error) throw error;

      const statsMap = new Map<string, {
        total: number;
        completed: number;
        overdue: number;
      }>();

      // Get user roles
      const { data: userRoles } = await supabase
        .from('user_profile_roles')
        .select(`
          user_id,
          is_primary,
          roles(name)
        `);

      // Create role map, prioritizing primary roles
      const roleMap = new Map<string, string>();
      userRoles?.forEach(ur => {
        const roleName = ur.roles?.name || 'Unknown';
        if (ur.is_primary || !roleMap.has(ur.user_id)) {
          roleMap.set(ur.user_id, roleName);
        }
      });

      data.forEach(assignment => {
        const role = roleMap.get(assignment.user_id) || 'Unknown';
        const current = statsMap.get(role) || {
          total: 0,
          completed: 0,
          overdue: 0,
        };

        current.total++;
        if (assignment.status === 'Completed') {
          current.completed++;
        } else if (new Date(assignment.due_date) < new Date()) {
          current.overdue++;
        }

        statsMap.set(role, current);
      });

      return Array.from(statsMap.entries()).map(([role, stats]) => ({
        role,
        total_assignments: stats.total,
        completed_assignments: stats.completed,
        overdue_assignments: stats.overdue,
        compliance_rate: stats.total > 0 ? (stats.completed / stats.total) * 100 : 0,
      }));
    },
  });

  const { data: locations = [] } = useQuery<Array<{ id: string; name: string }>>({
    queryKey: ['compliance-locations'],
    queryFn: async () => {
      const { data } = await supabase.from('locations').select('id, name').order('name');
      return data || [];
    },
  });

  const getComplianceColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplianceBadge = (rate: number) => {
    if (rate >= 90) return 'bg-green-100 text-green-800';
    if (rate >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const departments = Array.from(new Set(userStats?.map(u => u.department).filter(Boolean)));

  const filteredUserStats = userStats?.filter(user => {
    const matchesSearch = user.user_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    const matchesLocation = locationFilter === 'all' || user.location_id === locationFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'Completed' && user.compliance_rate === 100) ||
      (statusFilter === 'overdue' && user.overdue_assignments > 0 && user.compliance_rate < 100);
    return matchesSearch && matchesDepartment && matchesLocation && matchesStatus;
  });

  const filteredDocumentStats = documentStats?.filter(doc => {
    const matchesSearch = doc.document_title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'Completed' && doc.compliance_rate === 100) ||
      (statusFilter === 'overdue' && doc.overdue_assignments > 0 && doc.compliance_rate < 100);
    return matchesSearch && matchesStatus;
  });

  const filteredDepartmentStats = departmentStats?.filter(dept => {
    const matchesSearch = dept.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || dept.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'Completed' && dept.compliance_rate === 100) ||
      (statusFilter === 'overdue' && dept.overdue_assignments > 0 && dept.compliance_rate < 100);
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Query for completed document details
  const { data: completedDetails } = useQuery({
    queryKey: ['completed-document-details'],
    queryFn: async () => {
      const { data: assignments, error } = await supabase
        .from('document_assignments')
        .select(`
          document_id,
          user_id,
          completed_at,
          documents(title)
        `)
        .eq('status', 'Completed');

      if (error) throw error;

      // Get user profiles separately
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name');

      // Get user departments
      const { data: userDepartments } = await supabase
        .from('user_departments')
        .select(`
          user_id,
          is_primary,
          departments(name)
        `);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
      
      // Create department map, prioritizing primary departments
      const departmentMap = new Map<string, string>();
      userDepartments?.forEach(ud => {
        const deptName = ud.departments?.name || 'Unknown';
        if (ud.is_primary || !departmentMap.has(ud.user_id)) {
          departmentMap.set(ud.user_id, deptName);
        }
      });

      return assignments.map(assignment => ({
        document_id: assignment.document_id,
        document_title: assignment.documents?.title || 'Unknown Document',
        user_id: assignment.user_id,
        user_name: profileMap.get(assignment.user_id)?.full_name || 'Unknown User',
        department: departmentMap.get(assignment.user_id) || 'No Department',
        completed_at: assignment.completed_at,
      }));
    },
    enabled: showCompletedDetails,
  });

  // Query for overdue document details
  const { data: overdueDetails } = useQuery({
    queryKey: ['overdue-document-details'],
    queryFn: async () => {
      const { data: assignments, error } = await supabase
        .from('document_assignments')
        .select(`
          assignment_id,
          document_id,
          user_id,
          due_date,
          status,
          documents(title)
        `)
        .neq('status', 'Completed');

      if (error) throw error;

      // Filter overdue assignments
      const overdueAssignments = assignments.filter(assignment => 
        new Date(assignment.due_date) < new Date()
      );

      // Get user profiles separately
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name');

      // Get user departments
      const { data: userDepartments } = await supabase
        .from('user_departments')
        .select(`
          user_id,
          is_primary,
          departments(name)
        `);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
      
      // Create department map, prioritizing primary departments
      const departmentMap = new Map<string, string>();
      userDepartments?.forEach(ud => {
        const deptName = ud.departments?.name || 'Unknown';
        if (ud.is_primary || !departmentMap.has(ud.user_id)) {
          departmentMap.set(ud.user_id, deptName);
        }
      });

      return overdueAssignments.map(assignment => ({
        assignment_id: assignment.assignment_id,
        document_id: assignment.document_id,
        document_title: assignment.documents?.title || 'Unknown Document',
        user_id: assignment.user_id,
        user_name: profileMap.get(assignment.user_id)?.full_name || 'Unknown User',
        department: departmentMap.get(assignment.user_id) || 'No Department',
        due_date: assignment.due_date,
        status: assignment.status,
        days_overdue: Math.ceil((new Date().getTime() - new Date(assignment.due_date).getTime()) / (1000 * 60 * 60 * 24)),
      }));
    },
    enabled: showOverdueDetails,
  });

  // Check if we're in a detail view
  if (selectedUserDetail) {
    return (
      <ComplianceUserDetail
        userId={selectedUserDetail.userId}
        userName={selectedUserDetail.userName}
        department={selectedUserDetail.department}
        onBack={() => setSelectedUserDetail(null)}
      />
    );
  }

  if (selectedDocumentDetail) {
    return (
      <ComplianceDocumentDetail
        documentId={selectedDocumentDetail.documentId}
        documentTitle={selectedDocumentDetail.documentTitle}
        onBack={() => setSelectedDocumentDetail(null)}
      />
    );
  }

  if (selectedDepartmentDetail) {
    return (
      <ComplianceDepartmentDetail
        department={selectedDepartmentDetail}
        onBack={() => setSelectedDepartmentDetail(null)}
      />
    );
  }

  if (selectedRoleDetail) {
    return (
      <ComplianceRoleDetail
        role={selectedRoleDetail}
        onBack={() => setSelectedRoleDetail(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Compliance Tracking</h2>
          <p className="text-muted-foreground">
            Monitor document reading compliance across the organization
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats?.totalAssignments || 0}</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => {
          setShowCompletedDetails(true);
          setActiveTab('completed-details');
        }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {overallStats?.completedAssignments || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => {
          if ((overallStats?.overdueAssignments || 0) > 0) {
            setShowOverdueDetails(true);
            setActiveTab('overdue-details');
          } else {
            setStatusFilter('overdue');
            setDepartmentFilter('all');
            setActiveTab('users');
            toast.info('No overdue assignments found', {
              description: 'All assignments are currently on time or completed.'
            });
          }
        }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {overallStats?.overdueAssignments || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getComplianceColor(overallStats?.complianceRate || 0)}`}>
              {Math.round(overallStats?.complianceRate || 0)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="users" data-value="users">Users</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          {showCompletedDetails && (
            <TabsTrigger value="completed-details">Completed Details</TabsTrigger>
          )}
          {showOverdueDetails && (
            <TabsTrigger value="overdue-details">Overdue Details</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* User Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(loc => (
                  <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept!}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => { setSearchTerm(''); setLocationFilter('all'); setDepartmentFilter('all'); setStatusFilter('all'); }}
            >
              Clear
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Showing {filteredUserStats?.length || 0} of {userStats?.length || 0} users
          </div>

          {/* User Rows */}
          <div className="divide-y rounded-lg border">
            {filteredUserStats?.map((user) => (
              <div
                key={user.user_id}
                className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setSelectedUserDetail({ userId: user.user_id, userName: user.user_name, department: user.department })}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{user.user_name}</div>
                  <div className="text-xs text-muted-foreground truncate">{user.department}</div>
                </div>
                <div className="w-32 hidden sm:block">
                  <Progress value={user.compliance_rate} className="h-1.5" />
                </div>
                <div className="text-sm text-muted-foreground whitespace-nowrap w-16 text-right">
                  {user.completed_assignments}/{user.total_assignments}
                </div>
                <Badge className={`${getComplianceBadge(user.compliance_rate)} whitespace-nowrap`}>
                  {Math.round(user.compliance_rate)}%
                </Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            ))}
            {filteredUserStats?.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">No users match the current filters.</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          {/* Document Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Search by document title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}>
              Clear
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Showing {filteredDocumentStats?.length || 0} of {documentStats?.length || 0} documents
          </div>

          <div className="divide-y rounded-lg border">
            {filteredDocumentStats?.map((doc) => (
              <div
                key={doc.document_id}
                className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setSelectedDocumentDetail({ documentId: doc.document_id, documentTitle: doc.document_title })}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{doc.document_title}</div>
                  <div className="text-xs text-muted-foreground">{doc.total_assignments} assignments</div>
                </div>
                <div className="w-32 hidden sm:block">
                  <Progress value={doc.compliance_rate} className="h-1.5" />
                </div>
                <div className="text-sm text-muted-foreground whitespace-nowrap w-16 text-right">
                  {doc.completed_assignments}/{doc.total_assignments}
                </div>
                <Badge className={`${getComplianceBadge(doc.compliance_rate)} whitespace-nowrap`}>
                  {Math.round(doc.compliance_rate)}%
                </Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            ))}
            {filteredDocumentStats?.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">No documents match the current filters.</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          {/* Department Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Search by department name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => { setSearchTerm(''); setDepartmentFilter('all'); setStatusFilter('all'); }}>
              Clear
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Showing {filteredDepartmentStats?.length || 0} of {departmentStats?.length || 0} departments
          </div>

          <div className="divide-y rounded-lg border">
            {filteredDepartmentStats?.map((dept) => (
              <div
                key={dept.department}
                className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setSelectedDepartmentDetail(dept.department)}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{dept.department}</div>
                  <div className="text-xs text-muted-foreground">{dept.total_assignments} assignments</div>
                </div>
                <div className="w-32 hidden sm:block">
                  <Progress value={dept.compliance_rate} className="h-1.5" />
                </div>
                <div className="text-sm text-muted-foreground whitespace-nowrap w-16 text-right">
                  {dept.completed_assignments}/{dept.total_assignments}
                </div>
                <Badge className={`${getComplianceBadge(dept.compliance_rate)} whitespace-nowrap`}>
                  {Math.round(dept.compliance_rate)}%
                </Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            ))}
            {filteredDepartmentStats?.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">No departments match the current filters.</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          {/* Role Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Search by role name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}>
              Clear
            </Button>
          </div>

          {(() => {
            const filteredRoleStats = roleStats?.filter(role => {
              const matchesSearch = role.role.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesStatus = statusFilter === 'all' ||
                (statusFilter === 'Completed' && role.compliance_rate === 100) ||
                (statusFilter === 'overdue' && role.overdue_assignments > 0 && role.compliance_rate < 100);
              return matchesSearch && matchesStatus;
            });
            return (
              <>
                <div className="text-xs text-muted-foreground">
                  Showing {filteredRoleStats?.length || 0} of {roleStats?.length || 0} roles
                </div>
                <div className="divide-y rounded-lg border">
                  {filteredRoleStats?.map((role) => (
                    <div
                      key={role.role}
                      className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => setSelectedRoleDetail(role.role)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{role.role}</div>
                        <div className="text-xs text-muted-foreground">{role.total_assignments} assignments</div>
                      </div>
                      <div className="w-32 hidden sm:block">
                        <Progress value={role.compliance_rate} className="h-1.5" />
                      </div>
                      <div className="text-sm text-muted-foreground whitespace-nowrap w-16 text-right">
                        {role.completed_assignments}/{role.total_assignments}
                      </div>
                      <Badge className={`${getComplianceBadge(role.compliance_rate)} whitespace-nowrap`}>
                        {Math.round(role.compliance_rate)}%
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  ))}
                  {filteredRoleStats?.length === 0 && (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">No roles match the current filters.</div>
                  )}
                </div>
              </>
            );
          })()}
        </TabsContent>

        <TabsContent value="completed-details" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Completed Document Details</h3>
              <p className="text-sm text-muted-foreground">
                View which documents have been completed by which users
              </p>
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {
                setShowCompletedDetails(false);
                setActiveTab('users');
              }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* Completed Details */}
          <div className="grid gap-4">
            {completedDetails?.map((detail, index) => (
              <Card key={`${detail.user_id}-${detail.document_id}-${index}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{detail.document_title}</CardTitle>
                      <CardDescription>
                        Completed by {detail.user_name} ({detail.department})
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Completed on: {detail.completed_at ? 
                          new Date(detail.completed_at).toLocaleDateString() : 
                          'Date not recorded'
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {completedDetails?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No completed documents found.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="overdue-details" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Overdue Document Details</h3>
              <p className="text-sm text-muted-foreground">
                View which documents are overdue and by which users
              </p>
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {
                setShowOverdueDetails(false);
                setActiveTab('users');
              }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* Overdue Details */}
          <div className="grid gap-4">
            {overdueDetails?.map((detail, index) => (
              <Card key={`${detail.user_id}-${detail.document_id}-${index}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{detail.document_title}</CardTitle>
                      <CardDescription>
                        Assigned to {detail.user_name} ({detail.department})
                      </CardDescription>
                    </div>
                    <Badge className="bg-red-100 text-red-800">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {detail.days_overdue} days overdue
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Due date: {new Date(detail.due_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4" />
                      <span>Status: {detail.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {overdueDetails?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No overdue documents found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceTracking;