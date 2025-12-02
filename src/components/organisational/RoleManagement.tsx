import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { UserCheck, Plus, Edit, Trash2, X, Save, ArrowUp, ArrowDown } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { useOrganisationContext } from '../../context/OrganisationContext';
import type { Role, Department } from '../../types';
import ImportRolesDialog from './ImportRolesDialog';
import { ImportErrorReport, ImportError } from '@/components/import/ImportErrorReport';

export const RoleManagement: React.FC = () => {
  const { supabaseClient, hasPermission } = useOrganisationContext();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [showImportErrorReport, setShowImportErrorReport] = useState(false);
  const [importErrors, setImportErrors] = useState<ImportError[]>([]);
  const [importWarnings, setImportWarnings] = useState<ImportError[]>([]);
  const [importStats, setImportStats] = useState({ success: 0, total: 0 });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department_id: 'none',
    is_active: true,
  });
  const [sortField, setSortField] = useState<'name' | 'department' | 'status' | 'created_at'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const { data: rolesData, isLoading: rolesLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('roles')
        .select('*');
      
      if (error) throw error;
      return data as Role[];
    },
  });

  const { data: departments } = useQuery({
    queryKey: ['departments-for-roles'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('departments')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data as Department[];
    },
  });

  // Sort roles based on current sort configuration
  const roles = useMemo(() => {
    if (!rolesData) return [];
    
    return [...rolesData].sort((a, b) => {
      let aValue: string | Date | number;
      let bValue: string | Date | number;
      
      if (sortField === 'name') {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      } else if (sortField === 'department') {
        const aDept = departments?.find(d => d.id === a.department_id);
        const bDept = departments?.find(d => d.id === b.department_id);
        aValue = (aDept?.name || 'No department').toLowerCase();
        bValue = (bDept?.name || 'No department').toLowerCase();
      } else if (sortField === 'status') {
        aValue = a.is_active ? 1 : 0; // Active = 1, Inactive = 0
        bValue = b.is_active ? 1 : 0;
      } else {
        aValue = new Date(a.created_at);
        bValue = new Date(b.created_at);
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rolesData, sortField, sortDirection, departments]);

  const handleSort = (field: 'name' | 'department' | 'status' | 'created_at') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const createRoleMutation = useMutation({
    mutationFn: async (roleData: typeof formData) => {
      const { error } = await supabaseClient
        .from('roles')
        .insert([{
          name: roleData.name,
          description: roleData.description || null,
          department_id: roleData.department_id === 'none' ? null : roleData.department_id || null,
          is_active: roleData.is_active,
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast({
        title: "Success",
        description: "Role created successfully",
      });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ role_id, ...roleData }: Role & typeof formData) => {
      const { error } = await supabaseClient
        .from('roles')
        .update({
          name: roleData.name,
          description: roleData.description || null,
          department_id: roleData.department_id === 'none' ? null : roleData.department_id || null,
          is_active: roleData.is_active,
        })
        .eq('role_id', role_id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast({
        title: "Success",
        description: "Role updated successfully",
      });
      setEditingRole(null);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteRoleMutation = useMutation({
    mutationFn: async (roleId: string) => {
      const { error } = await supabaseClient
        .from('roles')
        .delete()
        .eq('role_id', roleId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast({
        title: "Success",
        description: "Role deleted successfully",
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

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      department_id: 'none',
      is_active: true,
    });
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description || '',
      department_id: role.department_id || 'none',
      is_active: role.is_active,
    });
  };

  const handleSubmit = () => {
    if (editingRole) {
      updateRoleMutation.mutate({ 
        ...editingRole,
        ...formData 
      });
    } else {
      createRoleMutation.mutate(formData);
    }
  };

  const getDepartmentName = (departmentId?: string) => {
    if (!departmentId || departmentId === 'none') return 'No department';
    const department = departments?.find(d => d.id === departmentId);
    return department?.name || 'Unknown department';
  };

  if (rolesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ImportErrorReport
        errors={importErrors}
        warnings={importWarnings}
        successCount={importStats.success}
        totalCount={importStats.total}
        isOpen={showImportErrorReport}
        onClose={() => setShowImportErrorReport(false)}
        importType="Roles"
      />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Roles
              </CardTitle>
              <CardDescription>
                Manage organizational roles and their department associations
              </CardDescription>
            </div>
            {hasPermission('canManageRoles') && (
              <div className="flex items-center gap-2">
                <ImportRolesDialog
                  onImportComplete={async () => {
                    await queryClient.invalidateQueries({ queryKey: ['roles'] });
                  }}
                  onImportError={(errors, warnings, stats) => {
                    setImportErrors(errors);
                    setImportWarnings(warnings);
                    setImportStats(stats);
                    setShowImportErrorReport(true);
                  }}
                />
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Role</DialogTitle>
                    <DialogDescription>
                      Add a new role to your organization
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Role Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter role name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter role description (optional)"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={formData.department_id}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, department_id: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No department</SelectItem>
                          {departments?.map((department) => (
                            <SelectItem key={department.id} value={department.id}>
                              {department.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is_active"
                        checked={formData.is_active}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                      />
                      <Label htmlFor="is_active">Active Role</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleSubmit} disabled={!formData.name.trim()} size="icon">
                      <Save className="h-4 w-4" />
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead 
                  className="cursor-pointer hover:bg-muted/70 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Name
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )
                    )}
                  </div>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/70 transition-colors"
                  onClick={() => handleSort('department')}
                >
                  <div className="flex items-center gap-2">
                    Department
                    {sortField === 'department' && (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/70 transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/70 transition-colors"
                  onClick={() => handleSort('created_at')}
                >
                  <div className="flex items-center gap-2">
                    Created
                    {sortField === 'created_at' && (
                      sortDirection === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )
                    )}
                  </div>
                </TableHead>
                {hasPermission('canManageRoles') && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles?.map((role) => (
                <TableRow key={role.role_id}>
                  <TableCell className="font-medium">
                    {role.name}
                  </TableCell>
                  <TableCell>
                    {role.description || <span className="text-muted-foreground">No description</span>}
                  </TableCell>
                  <TableCell>
                    {getDepartmentName(role.department_id)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={role.is_active ? "default" : "secondary"}>
                      {role.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(role.created_at).toLocaleDateString()}
                  </TableCell>
                  {hasPermission('canManageRoles') && (
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(role)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteRoleMutation.mutate(role.role_id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {roles?.length === 0 && (
            <div className="text-center py-8">
              <UserCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No roles found</p>
              <p className="text-sm text-muted-foreground">Create your first role to get started</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {hasPermission('canManageRoles') && (
        <Dialog open={!!editingRole} onOpenChange={(open) => !open && setEditingRole(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Role</DialogTitle>
              <DialogDescription>
                Update role information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Role Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter role name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter role description (optional)"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-department">Department</Label>
                <Select
                  value={formData.department_id}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, department_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No department</SelectItem>
                    {departments?.map((department) => (
                      <SelectItem key={department.id} value={department.id}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="edit-is_active">Active Role</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingRole(null)} size="icon">
                <X className="h-4 w-4" />
              </Button>
              <Button onClick={handleSubmit} disabled={!formData.name.trim()} size="icon">
                <Save className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};