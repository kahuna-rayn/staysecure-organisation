import { default as React } from 'react';

interface PhysicalLocationAccess {
    id: string;
    full_name: string;
    email: string;
    department: string | null;
    role_account_type: string | null;
    location: string;
    location_id?: string;
    access_purpose: string;
    date_access_created: string;
    date_access_revoked: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    locations?: {
        id: string;
        name: string;
    };
}
declare const PhysicalLocationAccess: React.FC;
export default PhysicalLocationAccess;
//# sourceMappingURL=PhysicalLocationAccess.d.ts.map