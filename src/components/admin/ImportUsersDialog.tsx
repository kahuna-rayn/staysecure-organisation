import React, { useCallback, useState } from 'react';
import debug from '../../utils/debug';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Download, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getCurrentClientId } from '@/integrations/supabase/client';
import { useOrganisationContext } from '@/context/OrganisationContext';
import { persistImportJob, type PersistedImportJob } from '../../utils/userImportProgress';

interface ImportUsersDialogProps {
  onImportStart?: (job: PersistedImportJob) => void;
}

const ImportUsersDialog: React.FC<ImportUsersDialogProps> = ({ onImportStart }) => {
  const { supabaseClient: supabase } = useOrganisationContext();
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendActivationEmails, setSendActivationEmails] = useState(false);
  const [importMode, setImportMode] = useState<'create' | 'update'>('create');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a CSV file (.csv)',
          variant: 'destructive',
        });
        return;
      }
      setUploadedFile(file);
      toast({ title: 'File uploaded', description: `${file.name} is ready for import` });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
  });

  const generateSampleCSV = () => {
    const csvContent = `"Email","Full Name","First Name","Last Name","Business Phone","Employee ID","Access Level","Location","Department","Role","Manager"
"john.doe@company.com","John Doe","John","Doe","+65-555-0123","EMP-2024-001","User","Main Office","Engineering","Software Engineer","jane.smith@company.com"
"jane.smith@company.com","Jane Smith","Jane","Smith","+65-555-0124","EMP-2024-002","Admin","Branch Office","Human Resources","HR Manager",""`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'user_import_template.csv';
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = async () => {
    if (!uploadedFile) {
      toast({ title: 'No file selected', description: 'Please upload a file first', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const csvText = await uploadedFile.text();
      const clientId = getCurrentClientId();
      const clientPath = clientId ? `/${clientId}` : '';
      const activationEmailsRequested = sendActivationEmails;
      const mode = importMode;

      const { data, error } = await supabase.functions.invoke<{
        ok?: boolean;
        job_id?: string;
        total_rows?: number;
        error?: string;
      }>('user-import-submit', {
        body: {
          csv_text: csvText,
          original_filename: uploadedFile.name,
          options: {
            import_mode: mode,
            send_activation_email: activationEmailsRequested,
            client_path: clientPath,
          },
        },
      });

      if (error) throw new Error(error.message || 'Failed to start background import');
      if (!data?.ok || !data.job_id) throw new Error(data?.error || 'Failed to start background import');

      const job: PersistedImportJob = {
        jobId: data.job_id,
        totalRows: data.total_rows ?? 0,
        importMode: mode,
        activationEmailsRequested,
      };

      persistImportJob(job);

      debug.log('[ImportUsersDialog] job started', job);

      // Notify parent and close immediately — progress tracked by UserImportProgressBanner
      onImportStart?.(job);
      setUploadedFile(null);
      setSendActivationEmails(false);
      setImportMode('create');
      setIsOpen(false);

      toast({
        title: 'Import started',
        description: `Processing ${job.totalRows} rows in the background. Progress is shown below the page header.`,
      });
    } catch (err: any) {
      debug.error('[ImportUsersDialog] submit failed:', err);
      toast({
        title: 'Import failed to start',
        description: err?.message || 'Try again or use a smaller file.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setUploadedFile(null);
      setSendActivationEmails(false);
      setImportMode('create');
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
              ? 'Server-side background import (safe for large CSVs). Rows match users by email and update profile, locations, departments, and roles. Emails with no existing user create a new account; "Send activation emails" applies to those new users. A progress bar appears on the page once the job starts.'
              : 'CSV import for new users runs on the server in the background (safe for large files). A progress bar appears on the page once the job starts. Locations, departments, and roles are created automatically if missing.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Mode toggle */}
          <div className="flex rounded-lg border overflow-hidden">
            <button
              type="button"
              onClick={() => { setImportMode('create'); setUploadedFile(null); }}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
                  <p className="text-xs text-gray-500 mt-2">Click to select a different file or drop a new one here</p>
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
                    disabled={isSubmitting}
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
                <div className="flex justify-end gap-3">
                  <Button onClick={handleImport} disabled={isSubmitting} size="icon" aria-label="Start import">
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setUploadedFile(null)} disabled={isSubmitting} aria-label="Clear file">
                    <X className="h-4 w-4" />
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
                ? ['Email', 'Full Name', 'First Name', 'Last Name', 'Business Phone', 'Employee ID', 'Location', 'Department', 'Role', 'Manager']
                : ['Email', 'Full Name', 'First Name', 'Last Name', 'Business Phone', 'Employee ID', 'Access Level', 'Location', 'Department', 'Role', 'Manager']
              ).map((column) => (
                <Badge key={column} variant="outline" className="text-xs">{column}</Badge>
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
                <p>• All other fields (Business Phone, Employee ID, etc.) are optional and will use default values if not provided</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportUsersDialog;
