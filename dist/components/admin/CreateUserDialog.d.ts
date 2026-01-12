import { default as React } from 'react';
import { NewUser } from '../../types';

interface CreateUserDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    newUser: NewUser;
    onUserChange: (user: NewUser) => void;
    onSubmit: (e: React.FormEvent) => void;
    loading?: boolean;
}
declare const CreateUserDialog: React.FC<CreateUserDialogProps>;
export default CreateUserDialog;
//# sourceMappingURL=CreateUserDialog.d.ts.map