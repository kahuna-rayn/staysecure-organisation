import { default as React } from 'react';

interface AddPhysicalLocationDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    prefilledUser?: {
        full_name: string;
        email: string;
        department: string;
        role: string;
    };
    onSuccess?: () => void;
}
declare const AddPhysicalLocationDialog: React.FC<AddPhysicalLocationDialogProps>;
export default AddPhysicalLocationDialog;
//# sourceMappingURL=AddPhysicalLocationDialog.d.ts.map