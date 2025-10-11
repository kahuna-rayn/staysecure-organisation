import { default as React } from 'react';

interface AssignPhysicalLocationDialogProps {
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
declare const AssignPhysicalLocationDialog: React.FC<AssignPhysicalLocationDialogProps>;
export default AssignPhysicalLocationDialog;
//# sourceMappingURL=AssignPhysicalLocationDialog.d.ts.map