import { default as React } from 'react';

interface ImportError {
    rowNumber: number;
    identifier: string;
    field?: string;
    error: string;
    rawData: any;
}
interface ImportDepartmentsDialogProps {
    onImportComplete?: () => Promise<void>;
    onImportError?: (errors: ImportError[], warnings: ImportError[], stats: {
        success: number;
        total: number;
    }) => void;
}
declare const ImportDepartmentsDialog: React.FC<ImportDepartmentsDialogProps>;
export default ImportDepartmentsDialog;
//# sourceMappingURL=ImportDepartmentsDialog.d.ts.map