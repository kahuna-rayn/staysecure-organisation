import React, { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import debug from '../../utils/debug';
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

type BannerState = 'running' | 'done' | 'failed';

const UserImportProgressBanner: React.FC<UserImportProgressBannerProps> = ({
  job,
  onImportComplete,
  onImportError,
  onDismiss,
}) => {
  const [progress, setProgress] = useState<ImportProgress>({ processed: 0, total: job.totalRows, status: 'pending' });
  const [bannerState, setBannerState] = useState<BannerState>('running');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const cancelledRef = useRef(false);
  // Store callbacks in refs so the polling effect never re-runs due to parent re-renders
  // creating new inline function references.
  const onImportCompleteRef = useRef(onImportComplete);
  const onImportErrorRef = useRef(onImportError);
  const importModeRef = useRef(job.importMode);
  useEffect(() => { onImportCompleteRef.current = onImportComplete; }, [onImportComplete]);
  useEffect(() => { onImportErrorRef.current = onImportError; }, [onImportError]);
  useEffect(() => { importModeRef.current = job.importMode; }, [job.importMode]);

  const { supabaseClient: supabase } = useOrganisationContext();

  useEffect(() => {
    cancelledRef.current = false;

    void (async () => {
      try {
        const result = await pollUserImportJob(
          supabase,
          job.jobId,
          job.totalRows,
          (p) => {
            if (!cancelledRef.current) setProgress(p);
          },
          () => cancelledRef.current,
        );
        if (cancelledRef.current) return;

        clearPersistedImportJob();

        debug.log('[UserImportProgressBanner] job done', { successCount: result.successCount, errors: result.errors.length, failed: !!result.failureMessage });

        if (result.failureMessage) {
          // Job ended in a failed/halted state — show banner as failed and open report if there are row errors.
          setErrorMessage(result.failureMessage);
          setBannerState('failed');
          if (result.errors.length > 0) {
            onImportErrorRef.current(result.errors, result.warnings, { success: result.successCount, total: result.total });
          }
          await onImportCompleteRef.current();
          return;
        }

        setBannerState('done');

        const realWarnings = result.warnings.filter((w) => w.type !== 'info');
        const infoItems = result.warnings.filter((w) => w.type === 'info');
        const shouldShowReport =
          result.errors.length > 0 ||
          realWarnings.length > 0 ||
          (importModeRef.current === 'update' && infoItems.length > 0);

        if (shouldShowReport) {
          onImportErrorRef.current(result.errors, result.warnings, { success: result.successCount, total: result.total });
        }

        await onImportCompleteRef.current();
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        if (errMsg === IMPORT_POLL_CANCELLED || cancelledRef.current) return;
        debug.error('[UserImportProgressBanner] poll failed:', err);
        clearPersistedImportJob();
        if (!cancelledRef.current) {
          setErrorMessage(errMsg || 'Import job failed unexpectedly.');
          setBannerState('failed');
        }
      }
    })();

    return () => {
      cancelledRef.current = true;
    };
  }, [job.jobId, job.totalRows, supabase]); // callbacks are intentionally read via refs

  const pct = progress.total > 0 ? Math.round((progress.processed / progress.total) * 100) : 0;
  const isDone = bannerState === 'done';
  const isFailed = bannerState === 'failed';
  const isRunning = bannerState === 'running';

  return (
    <div
      className={`mx-0 mb-3 rounded-lg border px-4 py-2.5 flex items-center gap-3 text-sm ${
        isFailed
          ? 'border-destructive/40 bg-destructive/5'
          : isDone
          ? 'border-green-300 bg-green-50'
          : 'border-primary/30 bg-primary/5'
      }`}
    >
      {/* Status icon */}
      {isDone && <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />}
      {isFailed && <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />}
      {isRunning && (
        <div className="h-4 w-4 shrink-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      )}

      {/* Text + progress bar */}
      <div className="flex-1 min-w-0">
        {isRunning && (
          <>
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
          </>
        )}
        {isDone && (
          <span className="font-medium text-green-800">
            Import complete — {progress.processed} / {progress.total} rows processed
          </span>
        )}
        {isFailed && (
          <span className="font-medium text-destructive">
            Import failed{errorMessage ? `: ${errorMessage}` : ''}
          </span>
        )}
      </div>

      {/* Dismiss (only when finished) */}
      {(isDone || isFailed) && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
};

export default UserImportProgressBanner;
