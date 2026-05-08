import { default as React } from 'react';
import { PersistedImportJob } from '../../utils/userImportProgress';
import { ImportError } from '../import/ImportErrorReport';

interface UserImportProgressBannerProps {
    job: PersistedImportJob;
    onImportComplete: () => Promise<void>;
    onImportError: (errors: ImportError[], warnings: ImportError[], stats: {
        success: number;
        total: number;
    }) => void;
    onDismiss: () => void;
}
declare const UserImportProgressBanner: React.FC<UserImportProgressBannerProps>;
export default UserImportProgressBanner;
//# sourceMappingURL=UserImportProgressBanner.d.ts.map