import { default as React } from 'react';

interface ProfileBasicInfoProps {
    firstName: string;
    lastName: string;
    manager: string;
    phone: string;
    location: string;
    locationId?: string;
    username?: string;
    employeeId?: string;
    editingField: string | null;
    onEdit: (field: string) => void;
    onSave: (field: string, value: string) => Promise<void>;
    onCancel: () => void;
    saving: boolean;
    profiles: {
        id: string;
        full_name: string;
        username: string;
    }[];
    currentUserId: string;
    userId: string;
}
declare const ProfileBasicInfo: React.FC<ProfileBasicInfoProps>;
export default ProfileBasicInfo;
//# sourceMappingURL=ProfileBasicInfo.d.ts.map