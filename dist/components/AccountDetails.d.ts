import { default as React } from 'react';
import { Profile } from '../hooks/useProfile';

interface AccountDetailsProps {
    profile: Profile & {
        account?: {
            username?: string;
            employeeId?: string;
        };
        email: string;
        phone?: string;
        department?: string;
        role?: string;
        startDate: string;
    };
}
declare const AccountDetails: React.FC<AccountDetailsProps>;
export default AccountDetails;
//# sourceMappingURL=AccountDetails.d.ts.map