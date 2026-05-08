import type { SupabaseClient } from '@supabase/supabase-js';
import type { ImportError } from '../components/import/ImportErrorReport';

export const USER_IMPORT_JOB_STORAGE_KEY = 'staysecure:user-import-active-job';
export const IMPORT_POLL_CANCELLED = 'IMPORT_POLL_CANCELLED';

export type PersistedImportJob = {
  jobId: string;
  totalRows: number;
  importMode: 'create' | 'update';
  activationEmailsRequested: boolean;
};

export type ImportProgress = {
  processed: number;
  total: number;
  status: string;
};

export type ImportResult = {
  successCount: number;
  total: number;
  errors: ImportError[];
  warnings: ImportError[];
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

export async function pollUserImportJob(
  supabase: SupabaseClient,
  jobId: string,
  totalRows: number,
  onProgress: (p: ImportProgress) => void,
  cancelled: () => boolean,
): Promise<ImportResult> {
  const deadline = Date.now() + 2 * 3600 * 1000;

  while (Date.now() < deadline) {
    if (cancelled()) throw new Error(IMPORT_POLL_CANCELLED);

    const { data: job, error: jobErr } = await supabase
      .from('user_import_jobs')
      .select('*')
      .eq('id', jobId)
      .maybeSingle();

    if (jobErr) throw new Error(jobErr.message);
    if (!job) {
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }

    onProgress({
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
        return {
          rowNumber: (fr.row_index as number) + 2,
          identifier: row['Email'] || row['email'] || 'Unknown',
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
          warnings.push({ rowNumber, identifier: email, field: 'Assignment', error: warningPart, rawData: row });
        }
        for (const a of additions) {
          warnings.push({ rowNumber, identifier: email, field: a.field, error: a.value, type: 'info', rawData: row });
        }
      }

      return { successCount: job.succeeded_rows ?? 0, total: job.total_rows ?? totalRows, errors, warnings };
    }

    if (job.status === 'failed') throw new Error(job.last_error || 'Import job failed');

    await new Promise((r) => setTimeout(r, 2000));
  }

  throw new Error('Import timed out after 2 hours.');
}

export function readPersistedImportJob(): PersistedImportJob | null {
  try {
    const raw = sessionStorage.getItem(USER_IMPORT_JOB_STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as PersistedImportJob;
    if (!p.jobId || typeof p.totalRows !== 'number') {
      sessionStorage.removeItem(USER_IMPORT_JOB_STORAGE_KEY);
      return null;
    }
    return p;
  } catch {
    sessionStorage.removeItem(USER_IMPORT_JOB_STORAGE_KEY);
    return null;
  }
}

export function persistImportJob(p: PersistedImportJob): void {
  try {
    sessionStorage.setItem(USER_IMPORT_JOB_STORAGE_KEY, JSON.stringify(p));
  } catch { /* storage unavailable */ }
}

export function clearPersistedImportJob(): void {
  try {
    sessionStorage.removeItem(USER_IMPORT_JOB_STORAGE_KEY);
  } catch { /* storage unavailable */ }
}
