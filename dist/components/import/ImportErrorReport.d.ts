import { default as React } from 'react';

export interface ImportError {
    rowNumber: number;
    identifier: string;
    field?: string;
    error: string;
    rawData?: any;
    type?: 'error' | 'warning';
}
interface ImportErrorReportProps {
    errors: ImportError[];
    warnings?: ImportError[];
    successCount: number;
    totalCount: number;
    isOpen: boolean;
    onClose: () => void;
    importType: string;
}
export declare const ImportErrorReport: React.FC<ImportErrorReportProps>;
export {};
//# sourceMappingURL=ImportErrorReport.d.ts.map