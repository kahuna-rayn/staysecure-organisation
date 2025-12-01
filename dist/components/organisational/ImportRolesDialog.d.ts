import { default as React } from 'react';

interface ImportError {
    rowNumber: number;
    identifier: string;
    field?: string;
    error: string;
    rawData: any;
}
interface ImportRolesDialogProps {
    onImportComplete?: () => Promise<void>;
    onImportError?: (errors: ImportError[], warnings: ImportError[], stats: {
        success: number;
        total: number;
    }) => void;
}
declare const ImportRolesDialog: React.FC<ImportRolesDialogProps>;
export default ImportRolesDialog;
//# sourceMappingURL=ImportRolesDialog.d.ts.map