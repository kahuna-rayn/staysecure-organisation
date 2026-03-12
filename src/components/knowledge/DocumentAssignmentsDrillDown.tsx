import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, MapPin, Building, Users, ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useOrganisationContext } from '../../context/OrganisationContext';

interface DrillDownLevel {
  level: number;
  title: string;
  data: any[];
  type: 'org' | 'location' | 'department' | 'staff';
  value?: number;
}

interface DocumentAssignmentsDrillDownProps {
  documentId: string;
  documentTitle: string;
  onBack: () => void;
}

const DocumentAssignmentsDrillDown: React.FC<DocumentAssignmentsDrillDownProps> = ({
  documentId,
  documentTitle,
  onBack
}) => {
  const { supabaseClient: supabase } = useOrganisationContext();
  const [drillDownPath, setDrillDownPath] = useState<DrillDownLevel[]>([]);

  const { data: profiles = [] } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  const { data: documentAssignments = [], isLoading: assignmentsLoading } = useQuery({
    queryKey: ['document-assignments', documentId],
    queryFn: async () => {
      if (!documentId) return [];
      const { data, error } = await supabase
        .from('document_assignments')
        .select('*')
        .eq('document_id', documentId);
      if (error) throw error;
      return data || [];
    },
    enabled: !!documentId,
  });

  const { data: userDepartments = [] } = useQuery({
    queryKey: ['user-departments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_departments')
        .select('*')
        .eq('is_primary', true);
      if (error) throw error;
      return data || [];
    },
  });

  const { data: departmentsList = [] } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const { data, error } = await supabase.from('departments').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  const departmentMap = new Map<string, string>();
  departmentsList.forEach((dept: Record<string, string>) => {
    departmentMap.set(dept.id, dept.name);
  });

  const userDeptMap = new Map<string, any[]>();
  userDepartments.forEach((ud: Record<string, string>) => {
    if (!userDeptMap.has(ud.user_id)) {
      userDeptMap.set(ud.user_id, []);
    }
    userDeptMap.get(ud.user_id)!.push(ud);
  });

  useEffect(() => {
    if (profiles.length > 0 && documentAssignments.length > 0 && !assignmentsLoading) {
      const assignedUserIds = new Set(documentAssignments.map((a: Record<string, string>) => a.user_id));
      const assignedProfiles = profiles.filter((p: Record<string, string>) => assignedUserIds.has(p.id));

      setDrillDownPath([{
        level: 0,
        title: 'Organization Level',
        data: assignedProfiles,
        type: 'org',
        value: assignedProfiles.length
      }]);
    }
  }, [profiles, documentAssignments, assignmentsLoading]);

  const onDrillDown = (
    data: any[],
    title: string,
    type: 'org' | 'location' | 'department' | 'staff',
    value?: number
  ) => {
    setDrillDownPath(prev => [...prev, { level: prev.length, title, data, type, value }]);
  };

  const onBreadcrumbClick = (index: number) => {
    setDrillDownPath(prev => prev.slice(0, index + 1));
  };

  const getAssignmentStatus = (userId: string): string => {
    const assignment = documentAssignments.find((a: Record<string, string>) => a.user_id === userId);
    if (!assignment) return 'Not Assigned';
    return assignment.status || 'Not Started';
  };

  const getStatusBadgeProps = (status: string) => {
    let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'secondary';
    let className = '';

    switch (status.toLowerCase()) {
      case 'completed':
        variant = 'default';
        className = 'bg-green-600 text-white border-green-600 hover:bg-green-700';
        break;
      case 'in progress':
        variant = 'secondary';
        className = 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700';
        break;
      case 'not started':
      case 'not assigned':
        variant = 'destructive';
        break;
    }

    return { variant, className };
  };

  const renderBreadcrumb = () => (
    <div className="flex items-center gap-2 mb-6">
      {drillDownPath.map((level, index) => (
        <div key={index} className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBreadcrumbClick(index)}
            className={
              index === drillDownPath.length - 1
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }
          >
            {level.title}
          </Button>
          {index < drillDownPath.length - 1 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      ))}
    </div>
  );

  const renderOrganizationLevel = () => {
    const currentLevel = drillDownPath[drillDownPath.length - 1];
    const assignedProfiles = currentLevel.data;

    // Group by location
    const locationGroups = new Map<string, any[]>();
    assignedProfiles.forEach(p => {
      const loc = (p.location as string) || null;
      if (loc) {
        if (!locationGroups.has(loc)) locationGroups.set(loc, []);
        locationGroups.get(loc)!.push(p);
      }
    });

    // Group by primary department
    const deptGroups = new Map<string, any[]>();
    assignedProfiles.forEach(p => {
      const userDepts = userDeptMap.get(p.id) || [];
      const primaryDept = userDepts.find((ud: any) => ud.is_primary);
      const deptName = primaryDept ? departmentMap.get(primaryDept.department_id) : null;
      const key = deptName || '__no_dept__';
      if (!deptGroups.has(key)) deptGroups.set(key, []);
      deptGroups.get(key)!.push(p);
    });

    const locationCards = [...locationGroups.entries()].map(([locName, profs]) => (
      <Card
        key={locName}
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onDrillDown(profs, locName, 'location', profs.length)}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{locName}</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-blue-600">{profs.length}</div>
            <div className="text-xs text-muted-foreground">assigned staff</div>
          </div>
        </CardContent>
      </Card>
    ));

    const noDeptProfiles = deptGroups.get('__no_dept__') || [];
    const departmentCards = [
      ...[...deptGroups.entries()]
        .filter(([key]) => key !== '__no_dept__')
        .map(([deptName, profs]) => (
          <Card
            key={deptName}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onDrillDown(profs, deptName, 'department', profs.length)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{deptName}</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-blue-600">{profs.length}</div>
                <div className="text-xs text-muted-foreground">assigned staff</div>
              </div>
            </CardContent>
          </Card>
        )),
      noDeptProfiles.length > 0 && (
        <Card
          key="no-department"
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onDrillDown(noDeptProfiles, 'No Department', 'department', noDeptProfiles.length)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">No Department</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-blue-600">{noDeptProfiles.length}</div>
              <div className="text-xs text-muted-foreground">assigned staff</div>
            </div>
          </CardContent>
        </Card>
      ),
    ].filter(Boolean);

    return (
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Building className="h-4 w-4" />
              Organization Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-600">
              {currentLevel.value ?? currentLevel.data.length}
            </div>
            <p className="text-xs text-muted-foreground">Total assigned staff</p>
          </CardContent>
        </Card>

        {locationCards.length > 0 && (
          <>
            <h3 className="text-lg font-semibold">Locations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locationCards}
            </div>
          </>
        )}

        <h3 className="text-lg font-semibold">Departments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departmentCards}
        </div>
      </div>
    );
  };

  const renderLocationLevel = () => {
    const currentLevel = drillDownPath[drillDownPath.length - 1];

    const locationDepartments = [...new Set(
      currentLevel.data
        .map(p => {
          const userDepts = userDeptMap.get(p.id) || [];
          const primaryDept = userDepts.find((ud: any) => ud.is_primary);
          return primaryDept ? departmentMap.get(primaryDept.department_id) : null;
        })
        .filter(Boolean)
    )];

    const noDeptProfiles = currentLevel.data.filter(p => {
      const userDepts = userDeptMap.get(p.id) || [];
      return userDepts.length === 0;
    });

    const departmentCards = [
      ...locationDepartments.map(departmentName => {
        const departmentProfiles = currentLevel.data.filter(p => {
          const userDepts = userDeptMap.get(p.id) || [];
          return userDepts.some((ud: any) => departmentMap.get(ud.department_id) === departmentName);
        });

        if (departmentProfiles.length === 0) return null;

        return (
          <Card
            key={departmentName as string}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onDrillDown(departmentProfiles, departmentName as string, 'department', departmentProfiles.length)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{departmentName as string}</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-blue-600">{departmentProfiles.length}</div>
                <div className="text-xs text-muted-foreground">assigned staff</div>
              </div>
            </CardContent>
          </Card>
        );
      }).filter(Boolean),
      noDeptProfiles.length > 0 && (
        <Card
          key="no-department"
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onDrillDown(noDeptProfiles, 'No Department', 'department', noDeptProfiles.length)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">No Department</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-blue-600">{noDeptProfiles.length}</div>
              <div className="text-xs text-muted-foreground">assigned staff</div>
            </div>
          </CardContent>
        </Card>
      ),
    ].filter(Boolean);

    return (
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {currentLevel.title} Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-600">
              {currentLevel.value ?? currentLevel.data.length}
            </div>
            <p className="text-xs text-muted-foreground">Total assigned staff</p>
          </CardContent>
        </Card>

        <h3 className="text-lg font-semibold">Departments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departmentCards}
        </div>
      </div>
    );
  };

  const renderDepartmentLevel = () => {
    const currentLevel = drillDownPath[drillDownPath.length - 1];

    return (
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Building className="h-4 w-4" />
              {currentLevel.title} Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-600">
              {currentLevel.value ?? currentLevel.data.length}
            </div>
            <p className="text-xs text-muted-foreground">Total assigned staff</p>
          </CardContent>
        </Card>

        <h3 className="text-lg font-semibold">Staff</h3>
        {renderStaffList()}
      </div>
    );
  };

  const renderStaffList = () => {
    const currentLevel = drillDownPath[drillDownPath.length - 1];
    const allProfilesInLevel = currentLevel.data;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {allProfilesInLevel.map((profile: any) => {
            const status = getAssignmentStatus(profile.id);
            const badgeProps = getStatusBadgeProps(status);
            const userDepts = userDeptMap.get(profile.id) || [];
            const primaryDept = userDepts.find((ud: any) => ud.is_primary);
            const deptName = primaryDept ? departmentMap.get(primaryDept.department_id) : 'No Department';

            return (
              <Card key={profile.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{profile.full_name || 'Unknown Name'}</div>
                        <div className="text-sm text-muted-foreground">
                          {profile.location} • {deptName} • {profile.primary_role || 'No Role'}
                        </div>
                      </div>
                    </div>
                    <Badge variant={badgeProps.variant} className={badgeProps.className}>
                      {status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    const currentLevel = drillDownPath[drillDownPath.length - 1];
    if (currentLevel.type === 'org') return renderOrganizationLevel();
    if (currentLevel.type === 'location') return renderLocationLevel();
    if (currentLevel.type === 'department') return renderDepartmentLevel();
    return renderStaffList();
  };

  if (assignmentsLoading || drillDownPath.length === 0) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{documentTitle}</h1>
            <p className="text-muted-foreground">Document assignment breakdown</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Loading assignment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{documentTitle}</h1>
          <p className="text-muted-foreground">Document assignment breakdown</p>
        </div>
      </div>

      {renderBreadcrumb()}
      {renderContent()}
    </div>
  );
};

export default DocumentAssignmentsDrillDown;
