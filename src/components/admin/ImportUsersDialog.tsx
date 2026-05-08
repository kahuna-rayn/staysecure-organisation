import React, { useState, useCallback } from 'react';
import debug from '../../utils/debug';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getCurrentClientId } from '@/integrations/supabase/client';
import { ImportError } from '../import/ImportErrorReport';
import { useOrganisationContext } from '@/context/OrganisationContext';

interface ImportUsersDialogProps {
  onImportComplete?: () => Promise<void>;
  onImportError?: (errors: ImportError[], warnings: ImportError[], stats: { success: number; total: number }) => void;
}


const ImportUsersDialog: React.FC<ImportUsersDialogProps> = ({ onImportComplete, onImportError }) => {
  // Get supabaseClient from context (provided by consuming app via OrganisationProvider)
  // DO NOT import supabase from '@/integrations/supabase/client' - it's a stub
  const { supabaseClient: supabase } = useOrganisationContext();
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sendActivationEmails, setSendActivationEmails] = useState(false);
  const [importMode, setImportMode] = useState<'create' | 'update'>('create');
  const [bulkProgress, setBulkProgress] = useState<{ processed: number; total: number; status: string } | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file (.csv)",
          variant: "destructive",
        });
        return;
      }
      
      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} is ready for import`,
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

    const generateSampleCSV = () => {
    const csvContent = `"Email","Full Name","First Name","Last Name","Phone","Employee ID","Access Level","Location","Department","Role","Manager"
"john.doe@company.com","John Doe","John","Doe","+65-555-0123","EMP-2024-001","User","Main Office","Engineering","Software Engineer","jane.smith@company.com"
"jane.smith@company.com","Jane Smith","Jane","Smith","+65-555-0124","EMP-2024-002","Admin","Branch Office","Human Resources","HR Manager",""`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'user_import_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const completeImportDialog = async (
    successCount: number,
    total: number,
    errors: ImportError[],
    warnings: ImportError[],
    activationEmailsRequested: boolean,
    mode: 'create' | 'update'
  ) => {
    setUploadedFile(null);
    setSendActivationEmails(false);
    setIsProcessing(false);
    setBulkProgress(null);
    setIsOpen(false);

    debug.log(`[ImportUsersDialog] warnings array (${warnings.length} items):`, warnings.map(w => ({ type: (w as any).type, field: w.field, identifier: w.identifier })));
    const realWarnings = warnings.filter((w: any) => w.type !== 'info');
    const infoItems = warnings.filter((w: any) => w.type === 'info');
    debug.log(`[ImportUsersDialog] split — realWarnings:${realWarnings.length} infoItems:${infoItems.length}`);
    const shouldShowReport = errors.length > 0 || realWarnings.length > 0 || (mode === 'update' && infoItems.length > 0);

    if (shouldShowReport && onImportError) {
      setTimeout(() => {
        onImportError(errors, warnings, { success: successCount, total });
      }, 300);

      if (errors.length > 0 && realWarnings.length > 0) {
        toast({
          title: "Import completed with errors and warnings",
          description: `${successCount} users processed. ${errors.length} failed, ${realWarnings.length} have validation warnings.`,
          variant: "destructive",
        });
      } else if (errors.length > 0) {
        toast({
          title: "Import completed with errors",
          description: `${successCount} users processed. ${errors.length} failed. Opening error report...`,
          variant: "destructive",
        });
      } else if (realWarnings.length > 0) {
        toast({
          title: "Import completed with warnings",
          description: `${successCount} users processed. ${realWarnings.length} have validation warnings. Opening report...`,
          variant: "default",
        });
      } else if (mode === 'update' && infoItems.length > 0) {
        toast({
          title: "Update completed",
          description: `${successCount} users updated. Opening additions report...`,
        });
      }
    } else {
      toast({
        title: "Import completed successfully",
        description: mode === 'update'
          ? `All ${successCount} users updated successfully.`
          : activationEmailsRequested
            ? `All ${successCount} users imported successfully. Activation emails were sent (one per new user).`
            : `All ${successCount} users imported successfully. No activation emails were sent — use "Send Activation Emails" on User Management when you're ready.`,
      });
    }

    if (onImportComplete) {
      await onImportComplete();
    }
  };

  const ADDITIONS_BLOCK = '\n__ADDITIONS__\n';

  function parseImportJobRowMessage(msg: string | null): {
    warningPart: string;
    additions: { field: string; value: string }[];
  } {
    if (!msg) return { warningPart: '', additions: [] };
    const idx = msg.indexOf(ADDITIONS_BLOCK);
    if (idx === -1) return { warningPart: msg, additions: [] };
    const warningPart = msg.slice(0, idx).trim();
    try {
      const parsed = JSON.parse(msg.slice(idx + ADDITIONS_BLOCK.length)) as { field: string; value: string }[];
      return { warningPart, additions: Array.isArray(parsed) ? parsed : [] };
    } catch {
      return { warningPart: msg, additions: [] };
    }
  }

  const runBackgroundImport = async (
    csvText: string,
    activationEmailsRequested: boolean,
    fileName: string,
    mode: 'create' | 'update'
  ): Promise<{ successCount: number; total: number; errors: ImportError[]; warnings: ImportError[] }> => {
    const clientId = getCurrentClientId();
    const clientPath = clientId ? `/${clientId}` : '';

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData?.session?.access_token) {
      throw new Error('Unable to determine current session. Please refresh and try again.');
    }

    const { data, error } = await supabase.functions.invoke<{
      ok?: boolean;
      job_id?: string;
      total_rows?: number;
      error?: string;
    }>('user-import-submit', {
      body: {
        csv_text: csvText,
        original_filename: fileName,
        options: {
          import_mode: mode,
          send_activation_email: activationEmailsRequested,
          client_path: clientPath,
        },
      },
    });

    if (error) {
      throw new Error(error.message || 'Failed to start background import');
    }
    if (!data?.ok || !data.job_id) {
      throw new Error(data?.error || 'Failed to start background import');
    }

    const jobId = data.job_id;
    const totalRows = data.total_rows ?? 0;
    setBulkProgress({ processed: 0, total: totalRows, status: 'pending' });

    const deadline = Date.now() + 2 * 3600 * 1000;

    while (Date.now() < deadline) {
      const { data: job, error: jobErr } = await supabase
        .from('user_import_jobs')
        .select('*')
        .eq('id', jobId)
        .maybeSingle();

      if (jobErr) {
        throw new Error(jobErr.message);
      }
      if (!job) {
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }

      setBulkProgress({
        processed: job.processed_rows ?? 0,
        total: job.total_rows ?? totalRows,
        status: job.status,
      });

      if (job.status === 'completed') {
        const { data: failRows } = await supabase
          .from('user_import_job_rows')
          .select('row_index, row_payload, error_message')
          .eq('job_id', jobId)
          .eq('status', 'failed');

        const { data: warnRows } = await supabase
          .from('user_import_job_rows')
          .select('row_index, row_payload, error_message')
          .eq('job_id', jobId)
          .eq('status', 'succeeded')
          .not('error_message', 'is', null);

        const errors: ImportError[] = (failRows || []).map((fr: any) => {
          const row = fr.row_payload as Record<string, string>;
          const email = row['Email'] || row['email'] || 'Unknown';
          return {
            rowNumber: (fr.row_index as number) + 2,
            identifier: email,
            error: fr.error_message || 'Failed',
            rawData: row,
          };
        });

        const warnings: ImportError[] = [];
        for (const wr of warnRows || []) {
          const row = wr.row_payload as Record<string, string>;
          const email = row['Email'] || row['email'] || 'Unknown';
          const rowNumber = (wr.row_index as number) + 2;
          const { warningPart, additions } = parseImportJobRowMessage(wr.error_message as string | null);
          if (warningPart) {
            warnings.push({
              rowNumber,
              identifier: email,
              field: 'Assignment',
              error: warningPart,
              rawData: row,
            });
          }
          for (const a of additions) {
            warnings.push({
              rowNumber,
              identifier: email,
              field: a.field,
              error: a.value,
              type: 'info',
              rawData: row,
            });
          }
        }

        const successCount = job.succeeded_rows ?? 0;
        return { successCount, total: job.total_rows ?? totalRows, errors, warnings };
      }

      if (job.status === 'failed') {
        throw new Error(job.last_error || 'Import job failed');
      }

      await new Promise((r) => setTimeout(r, 2000));
    }

    throw new Error('Import timed out after 2 hours. Check User Management and the import job table.');
  };

  const handleImport = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a file first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setBulkProgress(null);

    try {
      const text = await uploadedFile.text();
      const activationEmailsRequested = sendActivationEmails;

      const result = await runBackgroundImport(
        text,
        activationEmailsRequested,
        uploadedFile.name,
        importMode
      );
      await completeImportDialog(
        result.successCount,
        result.total,
        result.errors,
        result.warnings,
        activationEmailsRequested,
        importMode
      );
    } catch (bulkErr: any) {
      debug.error('[ImportUsersDialog] Background import failed:', bulkErr);
      toast({
        title: "Background import failed",
        description: bulkErr?.message || 'Try again or use a smaller file.',
        variant: "destructive",
      });
      setIsProcessing(false);
      setBulkProgress(null);
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open && !isProcessing) {
      setUploadedFile(null);
      setSendActivationEmails(false);
      setImportMode('create');
      setBulkProgress(null);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{importMode === 'update' ? 'Update Existing Users' : 'Import Users'}</DialogTitle>
          <DialogDescription>
            {importMode === 'update'
              ? 'Server-side background import (safe for large CSVs). Rows match users by email and update profile, locations, departments, and roles. Emails with no existing user create a new account; "Send activation emails" applies to those new users.'
              : 'CSV import for new users runs on the server in the background (safe for large files). You can leave this page; refresh User Management to watch progress. Locations, departments, and roles are created automatically if missing.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Mode toggle */}
          <div className="flex rounded-lg border overflow-hidden">
            <button
              type="button"
              onClick={() => { setImportMode('create'); setUploadedFile(null); }}
              disabled={isProcessing}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                importMode === 'create'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:bg-muted'
              }`}
            >
              Create new users
            </button>
            <button
              type="button"
              onClick={() => { setImportMode('update'); setUploadedFile(null); setSendActivationEmails(false); }}
              disabled={isProcessing}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                importMode === 'update'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:bg-muted'
              }`}
            >
              Update existing users
            </button>
          </div>

          <div className="space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-blue-400 bg-blue-50'
                  : uploadedFile
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              
              {uploadedFile ? (
                <div>
                  <p className="text-lg font-medium text-green-700">File Ready for Import</p>
                  <p className="text-sm text-green-600 mt-1">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Click to select a different file or drop a new one here
                  </p>
                </div>
              ) : isDragActive ? (
                <p className="text-lg font-medium text-blue-700">Drop your user file here</p>
              ) : (
                <div>
                  <p className="text-lg font-medium">Drag and drop your user file here, or browse</p>
                        <p className="text-sm text-gray-500 mt-1">Supports CSV files (.csv)</p>
                </div>
              )}
            </div>

            {uploadedFile && (
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="send-activation-emails"
                    checked={sendActivationEmails}
                    onCheckedChange={(checked: boolean | 'indeterminate') => setSendActivationEmails(checked === true)}
                    disabled={isProcessing}
                    className="mt-1"
                  />
                  <div>
                    <Label htmlFor="send-activation-emails" className="text-sm font-normal cursor-pointer">
                      Send activation emails to new users
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      When unchecked, accounts are created without sending mail; you can use Send Activation Emails on User Management when ready.
                    </p>
                  </div>
                </div>
                {bulkProgress && (
                  <p className="text-xs text-muted-foreground">
                    Server import: {bulkProgress.processed} / {bulkProgress.total} rows · status: {bulkProgress.status}
                  </p>
                )}
                <div className="flex gap-3">
                <Button
                  onClick={handleImport}
                  disabled={isProcessing}
                  className="flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setUploadedFile(null)}
                  disabled={isProcessing}
                >
                  X
                </Button>
              </div>
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">User Import Template</h4>
            <p className="text-sm text-yellow-700 mb-3">Download a template for importing users with sample data.</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">Users Template (CSV)</span>
                  <Badge variant="secondary" className="text-xs">Ready to use template</Badge>
                </div>
                <Button size="sm" variant="outline" onClick={generateSampleCSV} className="gap-2">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Available Columns</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {(importMode === 'update'
                ? ['Email', 'Full Name', 'First Name', 'Last Name', 'Phone', 'Employee ID', 'Location', 'Department', 'Role', 'Manager']
                : ['Email', 'Full Name', 'First Name', 'Last Name', 'Phone', 'Employee ID', 'Access Level', 'Location', 'Department', 'Role', 'Manager']
              ).map((column) => (
                <Badge key={column} variant="outline" className="text-xs">
                  {column}
                </Badge>
              ))}
            </div>
            {importMode === 'update' ? (
              <div className="text-sm text-blue-800 space-y-1">
                <p>• <strong>Email</strong> is required — used to look up the existing user; if not found, the user will be created</p>
                <p>• All other columns are optional for existing users — only populated fields are updated</p>
                <p>• <strong>Location</strong> - must already exist in the system; updates the user's primary location and adds a physical access entry if not already present</p>
                <p>• <strong>Department</strong> - must already exist; added to the user's departments if not already assigned</p>
                <p>• <strong>Role</strong> - must already exist; added to the user's roles if not already assigned. If Department is also provided, role and department are linked with a pairing ID</p>
                <p>• <strong>Manager</strong> - must be specified by email address; updates the user's manager field</p>
                <p>• Existing assignments are never removed — this is an additive update</p>
              </div>
            ) : (
              <div className="text-sm text-blue-800 space-y-1">
                <p>• <strong>Email</strong> is required for each user</p>
                <p>• <strong>Full Name</strong> is required for each user</p>
                <p>• <strong>First Name</strong> is required for each user</p>
                <p>• <strong>Last Name</strong> is required for each user</p>
                <p>• Users will be created with &apos;Pending&apos; status; use the checkbox above to send (or not send) activation email as each account is created, or use Send Activation Emails in User Management later</p>
                <p>• <strong>Access Level</strong> - must be "User" or "Admin". Other values are not allowed.</p>
                <p>• <strong>Location</strong> (optional) - created automatically if it doesn't exist</p>
                <p>• <strong>Department</strong> (optional) - created automatically if it doesn't exist</p>
                <p>• <strong>Role</strong> (optional) - created automatically if it doesn't exist. If Department is also provided, the role is linked to that department; otherwise it is created as a general role.</p>
                <p>• <strong>Manager</strong> (optional) - must be specified by email address. If manager email doesn't exist, user will be created but a warning will be reported</p>
                <p>• All other fields (Phone, Employee ID, etc.) are optional and will use default values if not provided</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportUsersDialog;