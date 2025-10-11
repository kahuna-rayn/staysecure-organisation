import { default as React } from 'react';
import { UserProfile } from '../../types';

interface EditUserDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    editingUser: UserProfile | null;
    onUserChange: (user: UserProfile | null) => void;
    onSubmit: (e: React.FormEvent) => void;
}
declare const EditUserDialog: React.FC<EditUserDialogProps>;
export default EditUserDialog;
//# sourceMappingURL=EditUserDialog.d.ts.map