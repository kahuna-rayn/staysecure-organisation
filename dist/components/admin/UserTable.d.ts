import { default as React } from 'react';
import { UserProfile } from '../../hooks/useUserProfiles';

interface UserTableProps {
    profiles: UserProfile[];
    onEdit: (user: UserProfile) => void;
    onDelete: (userId: string) => void;
    onUpdate: (id: string, updates: Partial<UserProfile>) => Promise<{
        success: boolean;
        error?: string;
    }>;
    onCreate?: (data: Partial<UserProfile>) => Promise<{
        success: boolean;
        error?: string;
    }>;
}
declare const UserTable: React.FC<UserTableProps>;
export default UserTable;
//# sourceMappingURL=UserTable.d.ts.map