import { default as React } from 'react';
import { ImportError } from '../import/ImportErrorReport';

interface ImportUsersDialogProps {
    onImportComplete?: () => Promise<void>;
    onImportError?: (errors: ImportError[], warnings: ImportError[], stats: {
        success: number;
        total: number;
    }) => void;
}
declare const ImportUsersDialog: React.FC<ImportUsersDialogProps>;
export default ImportUsersDialog;
//# sourceMappingURL=ImportUsersDialog.d.ts.map