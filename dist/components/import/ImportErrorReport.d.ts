import { default as React } from 'react';

export interface ImportError {
    rowNumber: number;
    identifier: string;
    field?: string;
    error: string;
    rawData?: Record<string, string>;
    type?: 'error' | 'warning' | 'info';
}
export interface ImportJobMeta {
    filename?: string | null;
    importMode?: string | null;
    status?: string | null;
    createdByName?: string | null;
    createdAt?: string | null;
}
interface ImportErrorReportProps {
    errors: ImportError[];
    warnings?: ImportError[];
    successCount: number;
    totalCount: number;
    isOpen: boolean;
    onClose: () => void;
    importType: string;
    jobMeta?: ImportJobMeta;
}
export declare const ImportErrorReport: React.FC<ImportErrorReportProps>;
export {};
//# sourceMappingURL=ImportErrorReport.d.ts.map