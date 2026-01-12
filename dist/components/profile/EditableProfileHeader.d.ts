import { default as React } from 'react';

interface EditableProfileHeaderProps {
    profile: Record<string, unknown>;
    onProfileUpdate: () => void;
    isReadOnly?: boolean;
    onOptimisticUpdate?: (field: string, value: string) => void;
}
declare const EditableProfileHeader: React.FC<EditableProfileHeaderProps>;
export default EditableProfileHeader;
//# sourceMappingURL=EditableProfileHeader.d.ts.map