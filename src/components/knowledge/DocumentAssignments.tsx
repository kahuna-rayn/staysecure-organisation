import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Plus, Search, Building2, Shield, Calendar, BarChart3 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useOrganisationContext } from '../../context/OrganisationContext';
import { useAuth } from 'staysecure-auth';
import { toast } from '@/components/ui/use-toast';
import { sendNotificationByEvent } from 'staysecure-notifications';
import DocumentAssignmentsDrillDown from './DocumentAssignmentsDrillDown';

interface Document {
  document_id: string;
  title: string;
  description?: string;
  category?: string;
  required: boolean;
  version: number;
  due_days: number;
}

interface Department {
  id: string;
  name: string;
  description?: string;
}

interface Role {
  role_id: string;
  name: string;
  description?: string;
  department_id?: string;
}

interface UserProfile {
  id: string;
  full_name: string;
}

const DocumentAssignments: React.FC = () => {
  const { supabaseClient: supabase, basePath } = useOrganisationContext();
  const clientId = basePath ? basePath.replace(/^\//, '') : 'default';
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [assignmentType, setAssignmentType] = useState<'roles' | 'departments' | 'users'>('departments');
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [selectedDocumentForDrillDown, setSelectedDocumentForDrillDown] = useState<{id: string, title: string} | null>(null);

  // Determine if the current user has admin access (super_admin or client_admin)
  const { data: currentUserRoles } = useQuery({
    queryKey: ['current-user-roles-doc', user?.id],
    queryFn: async () => {
      const { data } = await supabase.from('user_roles').select('role').eq('user_id', user!.id);
      return data?.map((r: { role: string }) => r.role) || [];
    },
    enabled: !!user?.id,
  });
  const hasAdminAccess = currentUserRoles
    ? currentUserRoles.some((r: string) => ['super_admin', 'client_admin'].includes(r))
    : true; // default to admin access until roles are loaded

  // Manager scoping: departments this user manages
  const { data: managedDepartmentIds } = useQuery({
    queryKey: ['manager-dept-ids', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('departments')
        .select('id')
        .eq('manager_id', user!.id);
      return data?.map((d: { id: string }) => d.id) || [];
    },
    enabled: !!user?.id,
  });

  // Manager scoping: users in managed departments + direct reports
  const { data: managedUserIds } = useQuery({
    queryKey: ['manager-user-ids', user?.id, managedDepartmentIds],
    queryFn: async () => {
      const ids = new Set<string>();
      if (user?.id) ids.add(user.id);

      if (managedDepartmentIds && managedDepartmentIds.length > 0) {
        const { data: udData } = await supabase
          .from('user_departments')
          .select('user_id')
          .in('department_id', managedDepartmentIds);
        (udData || []).forEach((r: { user_id: string }) => ids.add(r.user_id));
      }

      const { data: directReports } = await supabase
        .from('profiles')
        .select('id')
        .eq('manager', user!.id);
      (directReports || []).forEach((r: { id: string }) => ids.add(r.id));

      return [...ids];
    },
    enabled: !!user?.id,
  });

  // Manager scoping: roles in managed departments
  const { data: managedRoleIds } = useQuery({
    queryKey: ['manager-role-ids', user?.id, managedDepartmentIds],
    queryFn: async () => {
      if (!managedDepartmentIds || managedDepartmentIds.length === 0) return [];
      const { data } = await supabase
        .from('roles')
        .select('role_id')
        .in('department_id', managedDepartmentIds);
      return data?.map((r: { role_id: string }) => r.role_id) || [];
    },
    enabled: !!user?.id,
  });

  // Manager-only: non-admin user who manages departments OR has direct reports
  const isManagerOnly = !hasAdminAccess && (
    (managedDepartmentIds?.length ?? 0) > 0 ||
    (managedUserIds?.length ?? 0) > 1   // > 1 because current user's own id is always added
  );

  const { data: documents } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('title');

      if (error) throw error;
      return data as Document[];
    },
  });

  const { data: departments } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Department[];
    },
  });

  const { data: roles } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Role[];
    },
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name')
        .order('full_name');

      if (error) throw error;
      return data as UserProfile[];
    },
  });

  const { data: assignments } = useQuery({
    queryKey: ['document-assignments-overview'],
    queryFn: async () => {
      // Fetch assignments
      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from('document_assignments')
        .select('*')
        .order('assigned_at', { ascending: false });

      if (assignmentsError) {
        console.error('Error fetching assignments:', assignmentsError);
        throw assignmentsError;
      }

      if (!assignmentsData || assignmentsData.length === 0) {
        return [];
      }

      // Get unique document IDs and user IDs
      const documentIds = [...new Set(assignmentsData.map(a => a.document_id))];
      const userIds = [...new Set(assignmentsData.map(a => a.user_id))];

      // Fetch documents
      const { data: documentsData, error: documentsError } = await supabase
        .from('documents')
        .select('document_id, title')
        .in('document_id', documentIds);

      if (documentsError) {
        console.error('Error fetching documents:', documentsError);
        throw documentsError;
      }

      // Fetch user profiles  
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }

      // Create lookup maps
      const documentMap = new Map(documentsData?.map(d => [d.document_id, d]) || []);
      const profileMap = new Map(profilesData?.map(p => [p.id, p]) || []);

      // Join the data
      return assignmentsData.map(assignment => ({
        ...assignment,
        document: documentMap.get(assignment.document_id),
        user: profileMap.get(assignment.user_id)
      }));
    },
  });

  const createAssignmentMutation = useMutation({
    mutationFn: async () => {
      if (!selectedDocument) return;

      console.log('Creating assignment for document:', selectedDocument.document_id);
      console.log('Assignment type:', assignmentType);
      console.log('Selected targets:', selectedTargets);

      // Create assignments based on type
      if (assignmentType === 'roles') {
        const promises = selectedTargets.map(async roleId => {
          console.log('Inserting document_roles:', {
            document_id: selectedDocument.document_id,
            role_id: roleId
          });
          
          const result = await supabase.from('document_roles').upsert({
            document_id: selectedDocument.document_id,
            role_id: roleId
          }, { ignoreDuplicates: true });
          
          console.log('Insert result:', result);
          
          if (result.error) {
            console.error('Error inserting document_roles:', result.error);
            throw result.error;
          }
          
          return result;
        });
        await Promise.all(promises);
      } else if (assignmentType === 'departments') {
        const promises = selectedTargets.map(async departmentId => {
          console.log('Inserting document_departments:', {
            document_id: selectedDocument.document_id,
            department_id: departmentId
          });
          
          const result = await supabase.from('document_departments').upsert({
            document_id: selectedDocument.document_id,
            department_id: departmentId
          }, { ignoreDuplicates: true });
          
          console.log('Insert result:', result);
          
          if (result.error) {
            console.error('Error inserting document_departments:', result.error);
            throw result.error;
          }
          
          return result;
        });
        await Promise.all(promises);
      } else if (assignmentType === 'users') {
        const promises = selectedTargets.map(async userId => {
          console.log('Inserting document_users:', {
            document_id: selectedDocument.document_id,
            user_id: userId
          });
          
          const result = await supabase.from('document_users').upsert({
            document_id: selectedDocument.document_id,
            user_id: userId
          }, { ignoreDuplicates: true });
          
          console.log('Insert result:', result);
          
          if (result.error) {
            console.error('Error inserting document_users:', result.error);
            throw result.error;
          }
          
          return result;
        });
        await Promise.all(promises);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-assignments-overview'] });

      // Resolve user IDs and fire a notification per user (fire-and-forget)
      if (selectedDocument && selectedTargets.length > 0) {
        const docTitle = selectedDocument.title;
        const dueDays = selectedDocument.due_days;
        const targets = [...selectedTargets];
        const type = assignmentType;

        const fireNotifications = async () => {
          let userIds: string[] = [];
          if (type === 'users') {
            userIds = targets;
          } else if (type === 'departments') {
            const { data } = await supabase
              .from('user_departments').select('user_id').in('department_id', targets);
            userIds = (data || []).map((r: { user_id: string }) => r.user_id);
          } else if (type === 'roles') {
            const { data } = await supabase
              .from('user_departments').select('user_id').in('role_id', targets);
            userIds = (data || []).map((r: { user_id: string }) => r.user_id);
          }
          await Promise.all(
            [...new Set(userIds)].map(userId =>
              sendNotificationByEvent(supabase, 'document_assigned', {
                user_id: userId,
                document_title: docTitle,
                due_days: dueDays,
                clientId,
              })
            )
          );
        };

        fireNotifications().catch(err =>
          console.error('[DocumentAssignments] notification error:', err)
        );
      }

      setIsAssignDialogOpen(false);
      setSelectedDocument(null);
      setSelectedTargets([]);
      toast({
        title: "Success",
        description: "Document assignments created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAssign = () => {
    if (!selectedDocument || selectedTargets.length === 0) return;
    createAssignmentMutation.mutate();
  };

  const handleTargetToggle = (targetId: string) => {
    setSelectedTargets(prev => 
      prev.includes(targetId) 
        ? prev.filter(id => id !== targetId)
        : [...prev, targetId]
    );
  };

  // Scope lists to manager's team when user is manager-only
  const visibleDepartments = useMemo(() => {
    if (isManagerOnly && managedDepartmentIds) {
      return (departments || []).filter(d => managedDepartmentIds.includes(d.id));
    }
    return departments || [];
  }, [departments, isManagerOnly, managedDepartmentIds]);

  // Roles in managed departments only
  const visibleRoles = useMemo(() => {
    if (isManagerOnly && managedRoleIds) {
      return (roles || []).filter(r => managedRoleIds.includes(r.role_id));
    }
    return roles || [];
  }, [roles, isManagerOnly, managedRoleIds]);

  // All users in managed departments + users with managed roles + direct reports
  const visibleUsers = useMemo(() => {
    if (isManagerOnly && managedUserIds) {
      return (users || []).filter(u => managedUserIds.includes(u.id));
    }
    return users || [];
  }, [users, isManagerOnly, managedUserIds]);

  const getAssignmentTargets = () => {
    switch (assignmentType) {
      case 'roles':
        return visibleRoles;
      case 'departments':
        return visibleDepartments;
      case 'users':
        return visibleUsers;
      default:
        return [];
    }
  };

  const getTargetLabel = (target: any) => {
    if (assignmentType === 'roles') return target.name;
    if (assignmentType === 'departments') return target.name;
    if (assignmentType === 'users') return target.full_name;
    return '';
  };

  const getTargetId = (target: any) => {
    if (assignmentType === 'roles') return target.role_id;
    if (assignmentType === 'departments') return target.id;
    if (assignmentType === 'users') return target.id;
    return '';
  };

  // If drill-down is selected, show the drill-down component
  if (selectedDocumentForDrillDown) {
    return (
      <DocumentAssignmentsDrillDown
        documentId={selectedDocumentForDrillDown.id}
        documentTitle={selectedDocumentForDrillDown.title}
        onBack={() => setSelectedDocumentForDrillDown(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Document Assignments</h2>
          <p className="text-muted-foreground">
            Assign documents to roles, departments, or specific users
          </p>
        </div>
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Document Assignment</DialogTitle>
              <DialogDescription>
                Assign a document to roles, departments, or specific users
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {/* Document Selection */}
              <div>
                <Label htmlFor="document">Select Document</Label>
                <Select onValueChange={(value) => {
                  const doc = documents?.find(d => d.document_id === value);
                  setSelectedDocument(doc || null);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a document" />
                  </SelectTrigger>
                  <SelectContent>
                    {documents?.map(doc => (
                      <SelectItem key={doc.document_id} value={doc.document_id}>
                        {doc.title} (v{doc.version})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Assignment Type */}
              <div>
                <Label>Assignment Type</Label>
                <Tabs value={assignmentType} onValueChange={(value) => {
                  setAssignmentType(value as 'roles' | 'departments' | 'users');
                  setSelectedTargets([]);
                }}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="departments">
                      <Building2 className="h-4 w-4 mr-1" />
                      Departments
                    </TabsTrigger>
                    <TabsTrigger value="roles">
                      <Shield className="h-4 w-4 mr-1" />
                      Roles
                    </TabsTrigger>
                    <TabsTrigger value="users">
                      <Users className="h-4 w-4 mr-1" />
                      Users
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Target Selection */}
              <div>
                <Label>Select Targets</Label>
                <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
                  {getAssignmentTargets().map(target => (
                    <div key={getTargetId(target)} className="flex items-center space-x-2">
                      <Checkbox
                        id={getTargetId(target)}
                        checked={selectedTargets.includes(getTargetId(target))}
                        onCheckedChange={() => handleTargetToggle(getTargetId(target))}
                      />
                      <Label htmlFor={getTargetId(target)} className="text-sm">
                        {getTargetLabel(target)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleAssign} 
                  disabled={!selectedDocument || selectedTargets.length === 0}
                >
                  Create Assignment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Assignment Overview */}
      <div className="grid gap-4">
        {/* Group assignments by document */}
        {(() => {
          const groupedAssignments = assignments?.reduce((acc, assignment) => {
            const docId = assignment.document_id;
            if (!acc[docId]) {
              acc[docId] = {
                document: assignment.document,
                assignments: []
              };
            }
            acc[docId].assignments.push(assignment);
            return acc;
          }, {} as Record<string, {document: any, assignments: any[]}>);

          return Object.values(groupedAssignments || {}).map((group) => (
            <Card key={group.document.document_id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{group.document.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Users className="h-4 w-4" />
                      {group.assignments.length} staff assigned
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDocumentForDrillDown({
                        id: group.document.document_id,
                        title: group.document.title
                      })}
                      className="flex items-center gap-2"
                    >
                      <BarChart3 className="h-4 w-4" />
                      View Breakdown
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {/* Status summary */}
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>{group.assignments.filter(a => a.status === 'Completed').length} Completed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>{group.assignments.filter(a => a.status === 'In progress').length} In Progress</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <span>{group.assignments.filter(a => a.status === 'Not started').length} Not Started</span>
                    </div>
                  </div>
                  
                  {/* Recent assignments preview */}
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Due: {new Date(group.assignments[0]?.due_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ));
        })()}
      </div>
    </div>
  );
};

export default DocumentAssignments;