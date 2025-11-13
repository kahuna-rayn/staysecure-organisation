import { UserProfile } from '../hooks/useUserProfiles';

interface NewUser {
    full_name: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    email: string;
    phone?: string;
    location?: string;
    location_id?: string;
    status?: string;
    access_level?: string;
    bio?: string;
    employee_id?: string;
    role?: string;
    department?: string;
}
export declare const handleSaveUser: (editingUser: any, // Use any to work around type conflicts
updateProfile: (id: string, updates: Partial<UserProfile>) => Promise<void>, onSuccess: () => void) => Promise<void>;
export declare const handleCreateUser: (newUser: NewUser, updateProfile: (id: string, updates: Partial<UserProfile>) => Promise<void>, onSuccess: () => void) => Promise<void>;
export declare const handleDeleteUser: (userId: string, userName: string, reason?: string) => Promise<{
    success: boolean;
    deletedUser?: any;
    error?: string;
}>;
export {};
//# sourceMappingURL=userManagementActions.d.ts.map