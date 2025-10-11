import { default as React } from 'react';
import { Profile } from '../hooks/useProfile';

interface SoftwareItem {
    id: string;
    name: string;
    role_account_type: string;
    expiryDate: string | null;
    lastUsed: string | null;
}
interface SoftwareAccountsProps {
    profile: Profile & {
        software: SoftwareItem[];
    };
}
declare const SoftwareAccounts: React.FC<SoftwareAccountsProps>;
export default SoftwareAccounts;
//# sourceMappingURL=SoftwareAccounts.d.ts.map