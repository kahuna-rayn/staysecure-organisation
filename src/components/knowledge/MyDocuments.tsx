import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  FileText, Calendar, Circle, CheckCircle, Clock, ExternalLink,
  Search, Loader2, RotateCcw, EyeOff, PenLine,
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useOrganisationContext } from '../../context/OrganisationContext';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from 'staysecure-auth';
import { sendNotificationByEvent } from 'staysecure-notifications';
import { useUserRole } from '@/hooks/useUserRole';

interface DocumentAssignment {
  assignment_id: string;
  document_id: string;
  document_version: number;
  assigned_at: string;
  due_date: string;
  status: 'Not started' | 'In progress' | 'Completed';
  completed_at?: string;
  first_opened_at?: string | null;
  open_count?: number;
  notes?: string;
  document: {
    title: string;
    description?: string;
    category?: string;
    url?: string;
    file_name?: string;
    required: boolean;
  };
}

interface AcknowledgeTarget {
  assignmentId: string;
  documentId: string;
  documentTitle: string;
  isRequired: boolean;
}

interface MyDocumentsProps {
  userId?: string;
}

const MyDocuments: React.FC<MyDocumentsProps> = ({ userId }) => {
  const { supabaseClient: supabase, basePath } = useOrganisationContext();
  const { user } = useAuth();
  const { hasAdminAccess } = useUserRole();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('assigned');
  const [openingDocId, setOpeningDocId] = useState<string | null>(null);
  const [acknowledgeTarget, setAcknowledgeTarget] = useState<AcknowledgeTarget | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [typedName, setTypedName] = useState('');

  const targetUserId = userId || user?.id;
  const isOwnDocuments = !userId || userId === user?.id;

  const { data: assignments, isLoading } = useQuery({
    queryKey: ['document-assignments', targetUserId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('document_assignments')
        .select(`
          *,
          document:documents(*)
        `)
        .eq('user_id', targetUserId)
        .order('assigned_at', { ascending: false });

      if (error) throw error;
      return data as DocumentAssignment[];
    },
    enabled: !!targetUserId,
  });

  const invalidateComplianceQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['document-assignments'] });
    queryClient.invalidateQueries({ queryKey: ['compliance-stats'] });
    queryClient.invalidateQueries({ queryKey: ['document-compliance-stats'] });
    queryClient.invalidateQueries({ queryKey: ['user-compliance-stats'] });
    queryClient.invalidateQueries({ queryKey: ['department-compliance-stats'] });
    queryClient.invalidateQueries({ queryKey: ['document-assignments-overview'] });
  };

  const notifyManager = (documentTitle: string, completedAt: string | null) => {
    const clientId = basePath ? basePath.replace(/^\//, '') : 'default';
    supabase
      .from('profiles')
      .select('manager')
      .eq('id', targetUserId)
      .maybeSingle()
      .then(({ data: profile }) => {
        if (profile?.manager) {
          sendNotificationByEvent(supabase, 'document_completed_manager', {
            user_id: profile.manager,
            employee_user_id: targetUserId,
            document_title: documentTitle,
            completed_at: completedAt,
            clientId,
          }).catch(err => console.error('[MyDocuments] manager notification error:', err));
        }
      });
  };

  // Update status for non-completion transitions (Not started ↔ In progress)
  const updateStatusMutation = useMutation({
    mutationFn: async ({
      assignmentId,
      status,
    }: {
      assignmentId: string;
      status: 'Not started' | 'In progress';
    }) => {
      const { error } = await supabase
        .from('document_assignments')
        .update({ status, completed_at: null })
        .eq('assignment_id', assignmentId);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidateComplianceQueries();
      toast({ title: 'Status updated', description: 'Document status updated successfully.' });
    },
    onError: (error: unknown) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Could not update status',
        variant: 'destructive',
      });
    },
  });

  // Acknowledge completion for optional documents (Layer 2)
  const acknowledgeMutation = useMutation({
    mutationFn: async ({ assignmentId }: { assignmentId: string; documentTitle: string }) => {
      const completedAt = new Date().toISOString();
      const { error } = await supabase
        .from('document_assignments')
        .update({ status: 'Completed', completed_at: completedAt })
        .eq('assignment_id', assignmentId);
      if (error) throw error;
      return completedAt;
    },
    onSuccess: (completedAt, variables) => {
      invalidateComplianceQueries();
      toast({ title: 'Acknowledged', description: 'Document marked as completed.' });
      notifyManager(variables.documentTitle, completedAt);
    },
    onError: (error: unknown) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Could not acknowledge document',
        variant: 'destructive',
      });
    },
  });

  // Sign completion for required documents (Layer 3) — calls edge function for server-side audit record
  const signDocumentMutation = useMutation({
    mutationFn: async ({
      assignmentId,
      documentId,
    }: {
      assignmentId: string;
      documentId: string;
      documentTitle: string;
      typedName: string;
    }) => {
      const { error } = await supabase.functions.invoke('sign-document', {
        body: { document_id: documentId, assignment_id: assignmentId, typed_name: typedName },
      });
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      invalidateComplianceQueries();
      toast({ title: 'Signed', description: 'Document signed and marked as completed.' });
      notifyManager(variables.documentTitle, new Date().toISOString());
    },
    onError: (error: unknown) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Could not sign document',
        variant: 'destructive',
      });
    },
  });

  const resetCompletionMutation = useMutation({
    mutationFn: async ({ assignmentId }: { assignmentId: string; documentTitle: string }) => {
      const { error } = await supabase
        .from('document_assignments')
        .update({ status: 'Not started', completed_at: null })
        .eq('assignment_id', assignmentId);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidateComplianceQueries();
      toast({
        title: 'Completion reset',
        description: 'Status set to Not started. The user must acknowledge again.',
      });
    },
    onError: (error: unknown) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Could not reset completion',
        variant: 'destructive',
      });
    },
  });

  const handleStatusChange = (assignmentId: string, newStatus: string) => {
    if (newStatus === 'Not started' || newStatus === 'In progress') {
      updateStatusMutation.mutate({ assignmentId, status: newStatus });
    }
  };

  const handleAdminResetCompletion = (assignmentId: string, documentTitle: string) => {
    if (
      !window.confirm(
        `Reset completion for "${documentTitle}"?\n\nThe assignment will return to Not started and the user will need to acknowledge this document again.`,
      )
    ) {
      return;
    }
    resetCompletionMutation.mutate({ assignmentId, documentTitle });
  };

  const handleOpenDocument = async (documentId: string, url?: string, fileName?: string) => {
    // External URL — open directly and record the open client-side via RPC
    if (!fileName && url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      if (isOwnDocuments) {
        supabase
          .rpc('record_document_open_self', { p_document_id: documentId })
          .then(() => queryClient.invalidateQueries({ queryKey: ['document-assignments', targetUserId] }))
          .catch(err => console.error('[MyDocuments] external open tracking error:', err));
      }
      return;
    }

    if (!fileName) return;

    setOpeningDocId(documentId);
    try {
      const { data, error } = await supabase.functions.invoke('get-document-url', {
        body: { document_id: documentId },
      });
      if (error) throw error;
      window.open(data.url, '_blank', 'noopener,noreferrer');
      // Refresh assignments so first_opened_at gates update in the UI
      queryClient.invalidateQueries({ queryKey: ['document-assignments', targetUserId] });
    } catch (err: unknown) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Could not open document',
        variant: 'destructive',
      });
    } finally {
      setOpeningDocId(null);
    }
  };

  const handleAcknowledge = (assignment: DocumentAssignment) => {
    setAcknowledgeTarget({
      assignmentId: assignment.assignment_id,
      documentId: assignment.document_id,
      documentTitle: assignment.document.title,
      isRequired: assignment.document.required,
    });
    setAgreedToTerms(false);
    setTypedName('');
  };

  const handleAcknowledgeConfirm = () => {
    if (!acknowledgeTarget) return;
    if (acknowledgeTarget.isRequired) {
      signDocumentMutation.mutate({
        assignmentId: acknowledgeTarget.assignmentId,
        documentId: acknowledgeTarget.documentId,
        documentTitle: acknowledgeTarget.documentTitle,
        typedName,
      }, {
        onSettled: () => setAcknowledgeTarget(null),
      });
    } else {
      acknowledgeMutation.mutate({
        assignmentId: acknowledgeTarget.assignmentId,
        documentTitle: acknowledgeTarget.documentTitle,
      }, {
        onSettled: () => setAcknowledgeTarget(null),
      });
    }
  };

  const isAcknowledgeConfirmDisabled = acknowledgeTarget?.isRequired
    ? !agreedToTerms || !typedName.trim() || signDocumentMutation.isPending
    : !agreedToTerms || acknowledgeMutation.isPending;

  // Deep-link: if the user arrived via a ?doc= email link, auto-open the document once
  useEffect(() => {
    if (!assignments || assignments.length === 0) return;
    if (typeof sessionStorage === 'undefined') return;
    const docId = sessionStorage.getItem('deep_link_document');
    if (!docId) return;

    const assignment = assignments.find((a: DocumentAssignment) => a.document_id === docId);
    if (assignment) {
      console.log('[MyDocuments] deep-link: opening document', docId, assignment.document.title);
      sessionStorage.removeItem('deep_link_document');
      handleOpenDocument(
        assignment.document_id,
        assignment.document.url,
        assignment.document.file_name,
      );
    } else {
      console.warn('[MyDocuments] deep-link: document not found in assignments, doc_id=', docId);
    }
  }, [assignments]);

  const filteredAssignments = assignments?.filter((assignment: DocumentAssignment) => {
    const matchesSearch =
      assignment.document.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.document.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const requiredAssignments = filteredAssignments?.filter((a: DocumentAssignment) => a.document.required);
  const optionalAssignments = filteredAssignments?.filter((a: DocumentAssignment) => !a.document.required);

  const completedCount = assignments?.filter((a: DocumentAssignment) => a.status === 'Completed').length || 0;
  const totalCount = assignments?.length || 0;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const documentListProps = {
    onStatusChange: handleStatusChange,
    onOpenDocument: handleOpenDocument,
    onAcknowledge: handleAcknowledge,
    openingDocId,
    isReadOnly: !isOwnDocuments,
    canAdminResetCompletion: hasAdminAccess,
    onAdminResetCompletion: handleAdminResetCompletion,
    resetCompletionPending: resetCompletionMutation.isPending,
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Progress
          </CardTitle>
          <CardDescription>Your overall document reading progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedCount} of {totalCount} documents completed
              </span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{progressPercentage}% Complete</span>
              <span>{totalCount - completedCount} remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search">Search Documents</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="w-full sm:w-48">
          <Label>Filter by Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Not started">Not Started</SelectItem>
              <SelectItem value="In progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Document Lists */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="assigned">
            All Assigned ({filteredAssignments?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="required">
            Required ({requiredAssignments?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="optional">
            Optional ({optionalAssignments?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assigned" className="space-y-4">
          <DocumentList assignments={filteredAssignments || []} {...documentListProps} />
        </TabsContent>
        <TabsContent value="required" className="space-y-4">
          <DocumentList assignments={requiredAssignments || []} {...documentListProps} />
        </TabsContent>
        <TabsContent value="optional" className="space-y-4">
          <DocumentList assignments={optionalAssignments || []} {...documentListProps} />
        </TabsContent>
      </Tabs>

      {/* Acknowledgment / Signature modal */}
      <Dialog open={!!acknowledgeTarget} onOpenChange={(open) => { if (!open) setAcknowledgeTarget(null); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {acknowledgeTarget?.isRequired ? (
                <><PenLine className="h-5 w-5" /> Sign: {acknowledgeTarget.documentTitle}</>
              ) : (
                <><CheckCircle className="h-5 w-5" /> Acknowledge: {acknowledgeTarget?.documentTitle}</>
              )}
            </DialogTitle>
            <DialogDescription>
              {acknowledgeTarget?.isRequired
                ? 'Type your full name and confirm to create a signed record that you have read and understood this policy.'
                : 'Confirm that you have read and understood this document.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {acknowledgeTarget?.isRequired && (
              <div className="space-y-2">
                <Label htmlFor="typed-name">Full name</Label>
                <Input
                  id="typed-name"
                  placeholder="Type your full name..."
                  value={typedName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTypedName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            )}

            <div className="flex items-start gap-3">
              <Checkbox
                id="agree-terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
              />
              <Label htmlFor="agree-terms" className="leading-snug cursor-pointer">
                I have read and understood this document and agree to comply with its requirements.
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAcknowledgeTarget(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleAcknowledgeConfirm}
              disabled={isAcknowledgeConfirmDisabled}
            >
              {(acknowledgeMutation.isPending || signDocumentMutation.isPending) && (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              )}
              {acknowledgeTarget?.isRequired ? 'Sign & Submit' : 'Acknowledge'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface DocumentListProps {
  assignments: DocumentAssignment[];
  onStatusChange: (assignmentId: string, status: string) => void;
  onOpenDocument: (documentId: string, url?: string, fileName?: string) => void;
  onAcknowledge: (assignment: DocumentAssignment) => void;
  openingDocId: string | null;
  isReadOnly?: boolean;
  canAdminResetCompletion?: boolean;
  onAdminResetCompletion?: (assignmentId: string, documentTitle: string) => void;
  resetCompletionPending?: boolean;
}

const DocumentList: React.FC<DocumentListProps> = ({
  assignments,
  onStatusChange,
  onOpenDocument,
  onAcknowledge,
  openingDocId,
  isReadOnly = false,
  canAdminResetCompletion = false,
  onAdminResetCompletion,
  resetCompletionPending = false,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'In progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status !== 'Completed';
  };

  if (assignments.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No documents found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => {
        const hasBeenOpened = !!assignment.first_opened_at;
        const openCount = assignment.open_count ?? 0;

        return (
          <Card
            key={assignment.assignment_id}
            className={isOverdue(assignment.due_date, assignment.status) ? 'border-red-200' : ''}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{assignment.document.title}</CardTitle>
                    {assignment.document.required && (
                      <Badge variant="destructive" className="text-xs">Required</Badge>
                    )}
                    {isOverdue(assignment.due_date, assignment.status) && (
                      <Badge variant="destructive" className="text-xs">Overdue</Badge>
                    )}
                  </div>
                  {assignment.document.description && (
                    <CardDescription className="mt-2">
                      {assignment.document.description}
                    </CardDescription>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(assignment.status)}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 shrink-0" />
                    Due: {new Date(assignment.due_date).toLocaleDateString()}
                  </div>
                  {assignment.status === 'Completed' && (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="text-foreground">
                        Completed:{' '}
                        {assignment.completed_at
                          ? new Date(assignment.completed_at).toLocaleDateString()
                          : '—'}
                      </span>
                    </div>
                  )}
                  {/* Open tracking indicator */}
                  {assignment.status !== 'Completed' && !isReadOnly && (
                    hasBeenOpened ? (
                      <span className="text-xs text-muted-foreground">
                        Opened {openCount > 1 ? `${openCount} times` : 'once'}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-amber-600">
                        <EyeOff className="h-3.5 w-3.5" />
                        Not yet opened
                      </span>
                    )
                  )}
                  {assignment.document.category && (
                    <Badge variant="outline" className="text-xs">
                      {assignment.document.category}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* View button */}
                  {(assignment.document.url || assignment.document.file_name) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenDocument(
                        assignment.document_id,
                        assignment.document.url,
                        assignment.document.file_name,
                      )}
                      disabled={openingDocId === assignment.document_id}
                    >
                      {openingDocId === assignment.document_id ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <ExternalLink className="h-4 w-4 mr-1" />
                      )}
                      View
                    </Button>
                  )}

                  {/* Status controls */}
                  {isReadOnly ? (
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                      {canAdminResetCompletion &&
                        assignment.status === 'Completed' &&
                        onAdminResetCompletion && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-muted-foreground"
                            onClick={() =>
                              onAdminResetCompletion(assignment.assignment_id, assignment.document.title)
                            }
                            disabled={resetCompletionPending}
                          >
                            <RotateCcw className="h-3.5 w-3.5 mr-1" />
                            Reset completion
                          </Button>
                        )}
                    </div>
                  ) : assignment.status === 'Completed' ? (
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <Badge className={getStatusColor('Completed')}>Completed</Badge>
                      {canAdminResetCompletion && onAdminResetCompletion && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-muted-foreground"
                          onClick={() =>
                            onAdminResetCompletion(assignment.assignment_id, assignment.document.title)
                          }
                          disabled={resetCompletionPending}
                        >
                          <RotateCcw className="h-3.5 w-3.5 mr-1" />
                          Reset completion
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {/* Not started ↔ In progress dropdown (completion removed from here) */}
                      <Select
                        value={assignment.status}
                        onValueChange={(value: string) => onStatusChange(assignment.assignment_id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Not started">Not Started</SelectItem>
                          <SelectItem value="In progress">In Progress</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Acknowledge / Sign button — gated on having opened the document */}
                      {hasBeenOpened ? (
                        <Button
                          size="sm"
                          variant={assignment.document.required ? 'default' : 'outline'}
                          onClick={() => onAcknowledge(assignment)}
                        >
                          {assignment.document.required ? (
                            <><PenLine className="h-4 w-4 mr-1" /> Sign</>
                          ) : (
                            <><CheckCircle className="h-4 w-4 mr-1" /> Acknowledge</>
                          )}
                        </Button>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>
                              <Button size="sm" variant="outline" disabled>
                                {assignment.document.required ? (
                                  <><PenLine className="h-4 w-4 mr-1" /> Sign</>
                                ) : (
                                  <><CheckCircle className="h-4 w-4 mr-1" /> Acknowledge</>
                                )}
                              </Button>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            Open the document first to enable acknowledgment
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MyDocuments;
