import { default as React } from 'react';

export interface PersonProfile {
    id: string;
    full_name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
    role: string;
    department: string;
    manager: string;
    startDate: string;
    language?: string;
    account: {
        username: string;
        employeeId: string;
        status: string;
        accessLevel: string;
        lastLogin: string;
        passwordLastChanged: string;
        twoFactorEnabled: boolean;
    };
    hardware: Array<{
        id: string;
        type: string;
        model: string;
        serialNumber: string;
        status: string;
        assignedDate: string;
        manufacturer: string;
        osEdition: string;
        osVersion: string;
    }>;
    software: Array<{
        id: string;
        name: string;
        role_account_type: string;
        expiryDate: string | null;
        lastUsed: string | null;
    }>;
    certificates: Array<{
        name: string;
        issuedBy: string;
        dateAcquired: string;
        expiryDate: string;
        credentialId: string;
        status: string;
        org_cert?: boolean;
        type?: string;
    }>;
}
declare const PersonaProfile: React.FC;
export default PersonaProfile;
//# sourceMappingURL=PersonaProfile.d.ts.map