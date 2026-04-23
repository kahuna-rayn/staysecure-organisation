import React, { useState } from 'react';
import { useUserProfiles } from '@/hooks/useUserProfiles';
import { useUserManagement } from '@/hooks/useUserManagement';
import { useUserRole } from '@/hooks/useUserRole';
import { useViewPreference } from '@/hooks/useViewPreference';
import { handleCreateUser, handleDeleteUser } from '../../utils/userManagementActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, List, Users, Search, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useOrganisationContext } from '../../context/OrganisationContext';
import { DeleteUserDialog } from '@/components/ui/delete-user-dialog';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import UserList from './UserList';
import UserTable from './UserTable';
import CreateUserDialog from './CreateUserDialog';
import ImportUsersDialog from './ImportUsersDialog';
import { ImportErrorReport, ImportError } from '@/components/import/ImportErrorReport';
import debug from '../../utils/debug';


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
      p.email?.toLowerCase().includes(search) ||
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
  const [isSendingActivations, setIsSendingActivations] = useState(false);
  const [showActivationConfirm, setShowActivationConfirm] = useState(false);

  const pendingProfiles = visibleProfiles.filter(p => p.status === 'Pending');

  const handleSendActivationEmails = async () => {
    if (pendingProfiles.length === 0) return;

    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const reserved = ['admin', 'activate-account', 'reset-password', 'forgot-password', 'email-notifications'];
    const clientSegment = pathParts[0] && !reserved.includes(pathParts[0]) ? pathParts[0] : '';
    const redirectUrl = clientSegment
      ? `${window.location.origin}/${clientSegment}/activate-account`
      : `${window.location.origin}/activate-account`;

    debug.log('[UserManagement.sendActivationEmails] sending to', pendingProfiles.length, 'pending users, redirectUrl:', redirectUrl);

    setIsSendingActivations(true);
    let sent = 0;
    let failed = 0;
    const BATCH_SIZE = 5;
    const BATCH_DELAY_MS = 1000;

    for (let i = 0; i < pendingProfiles.length; i += BATCH_SIZE) {
      const batch = pendingProfiles.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(async (profile) => {
        try {
          const { error } = await supabaseClient.functions.invoke('request-activation-link', {
            body: { email: profile.email, redirectUrl },
          });
          if (error) throw error;
          debug.log('[UserManagement.sendActivationEmails] sent to', profile.email);
          sent++;
        } catch (err) {
          debug.error('[UserManagement.sendActivationEmails] failed for', profile.email, err);
          failed++;
        }
      }));
      if (i + BATCH_SIZE < pendingProfiles.length) {
        await new Promise(resolve => setTimeout(resolve, BATCH_DELAY_MS));
      }
    }

    setIsSendingActivations(false);
    toast({
      title: failed === 0 ? 'Activation emails sent' : 'Activation emails sent with errors',
      description: `${sent} sent${failed > 0 ? `, ${failed} failed` : ''} out of ${pendingProfiles.length} pending user${pendingProfiles.length !== 1 ? 's' : ''}`,
      variant: failed > 0 ? 'destructive' : 'default',
    });
  };

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
                {pendingProfiles.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowActivationConfirm(true)}
                    disabled={isSendingActivations}
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    {isSendingActivations
                      ? 'Sending…'
                      : `Send Activation Emails (${pendingProfiles.length})`}
                  </Button>
                )}
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

      <AlertDialog open={showActivationConfirm} onOpenChange={setShowActivationConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send Activation Emails</AlertDialogTitle>
            <AlertDialogDescription>
              This will send an activation email to <strong>{pendingProfiles.length}</strong> pending user{pendingProfiles.length !== 1 ? 's' : ''}.
              They will receive a link to set their password and activate their account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSendActivationEmails}>
              Send Emails
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default UserManagement;