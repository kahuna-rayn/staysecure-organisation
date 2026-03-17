import { default as React } from 'react';
import { Profile } from '../../hooks/useProfile';

interface Certificate {
    id?: string;
    name: string;
    issuedBy: string;
    dateAcquired: string;
    expiryDate: string | null;
    credentialId?: string;
    org_cert?: boolean;
    type?: string;
    status?: string;
    certificate_url?: string | null;
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