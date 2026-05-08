import { SupabaseClient } from '@supabase/supabase-js';
import { ImportError } from '../components/import/ImportErrorReport';

export declare const USER_IMPORT_JOB_STORAGE_KEY = "staysecure:user-import-active-job";
export declare const IMPORT_POLL_CANCELLED = "IMPORT_POLL_CANCELLED";
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
export declare function pollUserImportJob(supabase: SupabaseClient, jobId: string, totalRows: number, onProgress: (p: ImportProgress) => void, cancelled: () => boolean): Promise<ImportResult>;
export declare function readPersistedImportJob(): PersistedImportJob | null;
export declare function persistImportJob(p: PersistedImportJob): void;
export declare function clearPersistedImportJob(): void;
//# sourceMappingURL=userImportProgress.d.ts.map