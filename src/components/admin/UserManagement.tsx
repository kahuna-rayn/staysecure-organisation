import React, { useEffect, useState } from 'react';
import { useUserProfiles } from '@/hooks/useUserProfiles';
import { useUserManagement } from '@/hooks/useUserManagement';
import { useUserRole } from '@/hooks/useUserRole';
import { useViewPreference } from '@/hooks/useViewPreference';
import { handleCreateUser, handleDeleteUser } from '../../utils/userManagementActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, List, Users, Search, Mail, ChevronLeft, ChevronRight, History } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import UserImportProgressBanner from './UserImportProgressBanner';
import { ImportErrorReport, ImportError } from '../import/ImportErrorReport';
import { readPersistedImportJob, clearPersistedImportJob, type PersistedImportJob } from '../../utils/userImportProgress';
import debug from '../../utils/debug';

const PAGE_SIZE_STORAGE_KEY = 'staysecure:user-management-page-size';
const VALID_PAGE_SIZES = [50, 100, 200] as const;
type PageSize = (typeof VALID_PAGE_SIZES)[number];

function readStoredPageSize(): PageSize {
  try {
    const raw = localStorage.getItem(PAGE_SIZE_STORAGE_KEY);
    const n = Number(raw);
    return (VALID_PAGE_SIZES as readonly number[]).includes(n) ? (n as PageSize) : 50;
  } catch {
    return 50;
  }
}

/**
 * User Management Component
 *
 * Pattern: Gets supabaseClient from OrganisationContext and passes it to handleCreateUser/handleDeleteUser
 * This follows the same pattern as the auth module - client is provided via context, not imported from stub
 */
const UserManagement: React.FC = () => {
  const { supabaseClient } = useOrganisationContext();
  const { profiles, loading, updateProfile, refetch } = useUserProfiles();
  const { isSuperAdmin } = useUserRole();
  const { toast } = useToast();

  // Filter out super_admin users unless current user is also super_admin
  const visibleProfiles = isSuperAdmin
    ? profiles
    : profiles.filter((p) => p.access_level !== 'super_admin');

  const [viewMode, setViewMode] = useViewPreference('userManagement', 'cards');
  const [searchTerm, setSearchTerm] = useState('');

  // --- Pagination ---
  const [pageSize, setPageSize] = useState<PageSize>(readStoredPageSize);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when search or pageSize changes
  useEffect(() => { setCurrentPage(1); }, [searchTerm, pageSize]);

  const filteredProfiles = visibleProfiles.filter((p) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      p.full_name?.toLowerCase().includes(search) ||
      p.email?.toLowerCase().includes(search) ||
      p.location?.toLowerCase().includes(search) ||
      p.status?.toLowerCase().includes(search)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredProfiles.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProfiles = filteredProfiles.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handlePageSizeChange = (val: string) => {
    const n = Number(val) as PageSize;
    setPageSize(n);
    try { localStorage.setItem(PAGE_SIZE_STORAGE_KEY, String(n)); } catch { /* ignore */ }
  };

  // --- Delete ---
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- Import error report ---
  const [showImportErrorReport, setShowImportErrorReport] = useState(false);
  const [importErrors, setImportErrors] = useState<ImportError[]>([]);
  const [importWarnings, setImportWarnings] = useState<ImportError[]>([]);
  const [importStats, setImportStats] = useState({ success: 0, total: 0 });

  // --- Last import job (for History button) ---
  const [lastJobMeta, setLastJobMeta] = useState<{
    id: string; original_filename: string | null; import_mode: string;
    status: string; succeeded_rows: number; failed_rows: number; total_rows: number; last_error: string | null;
  } | null>(null);
  const [isLoadingLastJob, setIsLoadingLastJob] = useState(false);

  // Fetch the most recent job on mount and after each import completes.
  const fetchLastJob = async () => {
    const { data } = await supabaseClient
      .from('user_import_jobs')
      .select('id, original_filename, import_mode, status, succeeded_rows, failed_rows, total_rows, last_error')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    setLastJobMeta(data ?? null);
  };

  useEffect(() => { void fetchLastJob(); }, []); // mount-only: fetchLastJob is stable (refs supabaseClient from closure)

  const handleShowLastImport = async () => {
    if (!lastJobMeta) return;
    setIsLoadingLastJob(true);
    try {
      const { data: failRows } = await supabaseClient
        .from('user_import_job_rows')
        .select('row_index, row_payload, error_message')
        .eq('job_id', lastJobMeta.id)
        .eq('status', 'failed');

      const { data: warnRows } = await supabaseClient
        .from('user_import_job_rows')
        .select('row_index, row_payload, error_message')
        .eq('job_id', lastJobMeta.id)
        .eq('status', 'succeeded')
        .not('error_message', 'is', null);

      const errors: ImportError[] = (failRows || []).map((fr) => {
        const row = fr.row_payload as Record<string, string>;
        return { rowNumber: (fr.row_index as number) + 2, identifier: row['Email'] || row['email'] || 'Unknown', error: fr.error_message || 'Failed', rawData: row };
      });

      const warnings: ImportError[] = [];
      for (const wr of warnRows || []) {
        const row = wr.row_payload as Record<string, string>;
        const email = row['Email'] || row['email'] || 'Unknown';
        const rowNumber = (wr.row_index as number) + 2;
        if (wr.error_message) warnings.push({ rowNumber, identifier: email, field: 'Note', error: wr.error_message, rawData: row });
      }

      setImportErrors(errors);
      setImportWarnings(warnings);
      setImportStats({ success: lastJobMeta.succeeded_rows, total: lastJobMeta.total_rows });
      setShowImportErrorReport(true);
    } finally {
      setIsLoadingLastJob(false);
    }
  };

  // --- Import progress banner ---
  const [activeImportJob, setActiveImportJob] = useState<PersistedImportJob | null>(() => {
    // Re-attach to any in-progress job from the previous session on this tab
    return readPersistedImportJob();
  });

  // --- Create user ---
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  // --- Activation emails ---
  const [isSendingActivations, setIsSendingActivations] = useState(false);
  const [showActivationConfirm, setShowActivationConfirm] = useState(false);

  const pendingProfiles = visibleProfiles.filter((p) => p.status === 'Pending');

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
      await Promise.all(
        batch.map(async (profile) => {
          try {
            const { error } = await supabaseClient.functions.invoke('request-activation-link', {
              body: { email: profile.email, redirectUrl },
            });
            if (error) throw error;
            sent++;
          } catch (err) {
            debug.error('[UserManagement.sendActivationEmails] failed for', profile.email, err);
            failed++;
          }
        }),
      );
      if (i + BATCH_SIZE < pendingProfiles.length) {
        await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
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
    resetNewUser,
  } = useUserManagement();

  const onCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingUser(true);
    try {
      await handleCreateUser(supabaseClient, newUser, async (id, updates) => {
        await updateProfile(id, updates);
      }, async () => {
        await refetch();
      });
      setIsCreateDialogOpen(false);
      resetNewUser();
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsCreatingUser(false);
    }
  };

  const onDeleteUser = (userId: string) => {
    const user = visibleProfiles.find((p) => p.id === userId);
    setUserToDelete({ id: userId, name: user?.full_name || 'Unknown User' });
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async (reason: string) => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      const result = await handleDeleteUser(supabaseClient, userToDelete.id, userToDelete.name, reason);
      if (result.success) {
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);
        toast({
          title: 'Success',
          description: `User ${result.deletedUser?.name || userToDelete.name} has been successfully deleted`,
        });
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
                <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
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
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShowLastImport}
                  disabled={isLoadingLastJob || !lastJobMeta}
                  aria-label={lastJobMeta ? `Last import: ${lastJobMeta.original_filename ?? 'unknown'} (${lastJobMeta.status})` : 'No import history'}
                  title={lastJobMeta ? `${lastJobMeta.original_filename ?? 'Import'} · ${lastJobMeta.import_mode} · ${lastJobMeta.succeeded_rows}/${lastJobMeta.total_rows} imported · ${lastJobMeta.status}` : 'No import history'}
                >
                  <History className="h-4 w-4" />
                </Button>
                <ImportUsersDialog
                  onImportStart={(job) => {
                    setActiveImportJob(job);
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
            {/* Import progress banner — shown between header and search when a job is active */}
            {activeImportJob && (
              <UserImportProgressBanner
                key={activeImportJob.jobId}
                job={activeImportJob}
                onImportComplete={async () => {
                  await refetch();
                  void fetchLastJob();
                }}
                onImportError={(errors, warnings, stats) => {
                  setImportErrors(errors);
                  setImportWarnings(warnings);
                  setImportStats(stats);
                  setShowImportErrorReport(true);
                }}
                onDismiss={() => {
                  clearPersistedImportJob();
                  setActiveImportJob(null);
                }}
              />
            )}

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
              <UserList profiles={paginatedProfiles} onDelete={onDeleteUser} />
            ) : (
              <UserTable profiles={paginatedProfiles} onDelete={onDeleteUser} onUpdate={onUpdateProfile} />
            )}

            {/* Pagination controls */}
            {filteredProfiles.length > 0 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Rows per page:</span>
                  <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {VALID_PAGE_SIZES.map((s) => (
                        <SelectItem key={s} value={String(s)}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-muted-foreground mr-2">
                    {Math.min((safePage - 1) * pageSize + 1, filteredProfiles.length)}–
                    {Math.min(safePage * pageSize, filteredProfiles.length)} of {filteredProfiles.length}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={safePage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={safePage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
              This will send an activation email to <strong>{pendingProfiles.length}</strong> pending user
              {pendingProfiles.length !== 1 ? 's' : ''}. They will receive a link to set their password and activate
              their account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSendActivationEmails}>Send Emails</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserManagement;
