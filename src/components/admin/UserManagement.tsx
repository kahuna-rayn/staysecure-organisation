import React, { useState } from 'react';
import { useUserProfiles } from '@/hooks/useUserProfiles';
import { useUserManagement } from '@/hooks/useUserManagement';
import { useUserRole } from '@/hooks/useUserRole';
import { useViewPreference } from '@/hooks/useViewPreference';
import { handleCreateUser, handleDeleteUser } from '../../utils/userManagementActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, List, Users, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useOrganisationContext } from '../../context/OrganisationContext';
import { DeleteUserDialog } from '@/components/ui/delete-user-dialog';
import { useToast } from '@/hooks/use-toast';
import UserList from './UserList';
import UserTable from './UserTable';
import CreateUserDialog from './CreateUserDialog';
import ImportUsersDialog from './ImportUsersDialog';
import { ImportErrorReport, ImportError } from '@/components/import/ImportErrorReport';


/**
 * User Management Component
 * 
 * Pattern: Gets supabaseClient from OrganisationContext and passes it to handleCreateUser/handleDeleteUser
 * This follows the same pattern as the auth module - client is provided via context, not imported from stub
 */
const UserManagement: React.FC = () => {
  // Get supabaseClient from context (provided by consuming app via OrganisationProvider)
  // DO NOT import supabase from '@/integrations/supabase/client' - it's a stub
  const { supabaseClient } = useOrganisationContext();
  const { profiles, loading, updateProfile, refetch } = useUserProfiles();
  const { isSuperAdmin } = useUserRole();
  const { toast } = useToast();
  
  // Filter out super_admin users unless current user is also super_admin
  // super_admin is an internal role, not client-facing
  const visibleProfiles = isSuperAdmin 
    ? profiles 
    : profiles.filter(p => p.access_level !== 'super_admin');
  
  const [viewMode, setViewMode] = useViewPreference('userManagement', 'cards');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter by search term
  const filteredProfiles = visibleProfiles.filter(p => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      p.full_name?.toLowerCase().includes(search) ||
      p.username?.toLowerCase().includes(search) ||
      p.location?.toLowerCase().includes(search) ||
      p.status?.toLowerCase().includes(search)
    );
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showImportErrorReport, setShowImportErrorReport] = useState(false);
  const [importErrors, setImportErrors] = useState<ImportError[]>([]);
  const [importWarnings, setImportWarnings] = useState<ImportError[]>([]);
  const [importStats, setImportStats] = useState({ success: 0, total: 0 });
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  
  const {
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    newUser,
    setNewUser,
    resetNewUser
  } = useUserManagement();

  const onCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsCreatingUser(true);
    
    try {
      await handleCreateUser(supabaseClient, newUser, async (id, updates) => {
        await updateProfile(id, updates);
      }, async () => {
        // Refresh the user list after successful creation
        await refetch();
      });
      
      // Close dialog and reset form only after successful creation
      setIsCreateDialogOpen(false);
      resetNewUser();
    } catch (error) {
      // Keep dialog open on error so user can see the error and retry
      console.error('Error creating user:', error);
    } finally {
      setIsCreatingUser(false);
    }
  };

  const onDeleteUser = (userId: string) => {
    const user = visibleProfiles.find(p => p.id === userId);
    setUserToDelete({ id: userId, name: user?.full_name || 'Unknown User' });
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async (reason: string) => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      const result = await handleDeleteUser(supabaseClient, userToDelete.id, userToDelete.name, reason);
      if (result.success) {
        // Close dialog first
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);
        
        // Show success toast after dialog is closed
        toast({
          title: "Success",
          description: `User ${result.deletedUser?.name || userToDelete.name} has been successfully deleted`,
        });
        
        // Refresh the user list after successful deletion
        await refetch();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const onUpdateProfile = async (id: string, updates: Record<string, unknown>) => {
    const result = await updateProfile(id, updates);
    return { success: result.success, error: result.error };
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <>
      <ImportErrorReport
        errors={importErrors}
        warnings={importWarnings}
        successCount={importStats.success}
        totalCount={importStats.total}
        isOpen={showImportErrorReport}
        onClose={() => setShowImportErrorReport(false)}
        importType="Users"
      />
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>
                <CardDescription>
                  Manage user accounts, roles, and permissions
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <ToggleGroup 
                  type="single" 
                  value={viewMode} 
                  onValueChange={(value) => value && setViewMode(value as 'cards' | 'list')}
                >
                  <ToggleGroupItem value="cards" aria-label="Card view">
                    <LayoutGrid className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="List view">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <ImportUsersDialog 
                  onImportComplete={refetch}
                  onImportError={(errors, warnings, stats) => {
                    setImportErrors(errors);
                    setImportWarnings(warnings);
                    setImportStats(stats);
                    setShowImportErrorReport(true);
                  }}
                />
                <CreateUserDialog
                  isOpen={isCreateDialogOpen}
                  onOpenChange={setIsCreateDialogOpen}
                  newUser={newUser}
                  onUserChange={setNewUser}
                  onSubmit={onCreateUser}
                  loading={isCreatingUser}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {viewMode === 'cards' ? (
              <UserList
                profiles={filteredProfiles}
                onDelete={onDeleteUser}
              />
            ) : (
              <UserTable
                profiles={filteredProfiles}
                onDelete={onDeleteUser}
                onUpdate={onUpdateProfile}
              />
            )}
          </CardContent>
        </Card>

        <DeleteUserDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          userName={userToDelete?.name || ''}
          onConfirm={handleDeleteConfirm}
          loading={isDeleting}
        />
      </div>
    </>
  );
};
export default UserManagement;