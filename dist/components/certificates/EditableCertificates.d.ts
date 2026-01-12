import { default as React } from 'react';
import { Profile } from '../../hooks/useProfile';

interface Certificate {
    name: string;
    issuedBy: string;
    dateAcquired: string;
    expiryDate: string | null;
    credentialId?: string;
}
interface EditableCertificatesProps {
    profile: Profile & {
        certificates: Certificate[];
    };
    onUpdate?: (certificateId: string, updates: any) => void;
    onDataChange?: () => void;
}
declare const EditableCertificates: React.FC<EditableCertificatesProps>;
export default EditableCertificates;
//# sourceMappingURL=EditableCertificates.d.ts.map