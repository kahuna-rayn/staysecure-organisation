import { default as React } from 'react';

interface CreateCertificateDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    isOrganisationCertificate?: boolean;
    onSuccess?: () => void;
}
export declare const CreateCertificateDialog: React.FC<CreateCertificateDialogProps>;
declare const CertificateManagement: React.FC;
export default CertificateManagement;
//# sourceMappingURL=CertificateManagement.d.ts.map