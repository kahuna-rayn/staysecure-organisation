import React, { useEffect, useRef, useState } from 'react';
import { useOrganisationContext } from '../../context/OrganisationContext';
import {
  clearPersistedImportJob,
  IMPORT_POLL_CANCELLED,
  pollUserImportJob,
  type ImportProgress,
  type PersistedImportJob,
} from '../../utils/userImportProgress';
import type { ImportError } from '../import/ImportErrorReport';

interface UserImportProgressBannerProps {
  job: PersistedImportJob;
  onImportComplete: () => Promise<void>;
  onImportError: (errors: ImportError[], warnings: ImportError[], stats: { success: number; total: number }) => void;
  onDismiss: () => void;
}

/**
 * Module-level set of job IDs whose completion callbacks have already fired.
 * Persists across remounts so the banner can't double-fire even if the parent
 * re-renders and remounts the component with the same job.
 */
const firedJobIds = new Set<string>();

const UserImportProgressBanner: React.FC<UserImportProgressBannerProps> = ({
  job,
  onImportComplete,
  onImportError,
  onDismiss,
}) => {
  const [progress, setProgress] = useState<ImportProgress>({ processed: 0, total: job.totalRows, status: 'pending' });
  const cancelledRef = useRef(false);

  // Keep all unstable callback references in refs — never in effect deps.
  const onImportCompleteRef = useRef(onImportComplete);
  const onImportErrorRef = useRef(onImportError);
  const onDismissRef = useRef(onDismiss);
  const importModeRef = useRef(job.importMode);
  useEffect(() => { onImportCompleteRef.current = onImportComplete; }, [onImportComplete]);
  useEffect(() => { onImportErrorRef.current = onImportError; }, [onImportError]);
  useEffect(() => { onDismissRef.current = onDismiss; }, [onDismiss]);
  useEffect(() => { importModeRef.current = job.importMode; }, [job.importMode]);

  const { supabaseClient: supabase } = useOrganisationContext();
  const supabaseRef = useRef(supabase);
  useEffect(() => { supabaseRef.current = supabase; }, [supabase]);

  useEffect(() => {
    cancelledRef.current = false;

    void (async () => {
      try {
        const result = await pollUserImportJob(
          supabaseRef.current,
          job.jobId,
          job.totalRows,
          (p) => { if (!cancelledRef.current) setProgress(p); },
          () => cancelledRef.current,
        );

        if (cancelledRef.current) return;
        if (firedJobIds.has(job.jobId)) return;
        firedJobIds.add(job.jobId);

        clearPersistedImportJob();

        const realWarnings = result.warnings.filter((w) => w.type !== 'info');
        const infoItems = result.warnings.filter((w) => w.type === 'info');
        const hasIssues =
          result.errors.length > 0 ||
          realWarnings.length > 0 ||
          result.failureMessage ||
          (importModeRef.current === 'update' && infoItems.length > 0);

        // Always open the report popup — even on full success — then dismiss the banner.
        onImportErrorRef.current(
          result.errors,
          result.warnings,
          { success: result.successCount, total: result.total },
        );

        // Refetch the user list in the background; don't block popup or dismiss.
        void onImportCompleteRef.current();

        // Remove the banner — the popup is the post-completion UI.
        onDismissRef.current();

        // Suppress unused variable lint warning — hasIssues could drive future toast logic.
        void hasIssues;
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        if (errMsg === IMPORT_POLL_CANCELLED || cancelledRef.current) return;
        if (firedJobIds.has(job.jobId)) return;
        firedJobIds.add(job.jobId);

        clearPersistedImportJob();

        // Unexpected poll failure — open report with just the error message, then dismiss.
        onImportErrorRef.current(
          [{ rowNumber: 0, identifier: 'Import', error: errMsg }],
          [],
          { success: 0, total: job.totalRows },
        );
        void onImportCompleteRef.current();
        onDismissRef.current();
      }
    })();

    return () => { cancelledRef.current = true; };
  }, [job.jobId, job.totalRows]); // all other values read via stable refs

  const pct = progress.total > 0 ? Math.round((progress.processed / progress.total) * 100) : 0;

  return (
    <div className="mx-0 mb-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 flex items-center gap-3 text-sm">
      <div className="h-4 w-4 shrink-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-foreground tabular-nums">
            Importing users — {progress.processed} / {progress.total} rows
          </span>
          <span className="text-primary tabular-nums ml-4">{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-primary/15 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserImportProgressBanner;
