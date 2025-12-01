import { default as React } from 'react';
import { ImportError } from '../import/ImportErrorReport';

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