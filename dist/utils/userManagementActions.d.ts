import { UserProfile } from '../hooks/useUserProfiles';
import { SupabaseClient } from '@supabase/supabase-js';

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
    language?: string;
    bio?: string;
    employee_id?: string;
    role?: string;
    department?: string;
}
export declare const handleSaveUser: (editingUser: any, // Use any to work around type conflicts
updateProfile: (id: string, updates: Partial<UserProfile>) => Promise<void>, onSuccess: () => void) => Promise<void>;
/**
 * Create a new user via Edge Function
 *
 * @param supabaseClient - REQUIRED: Supabase client from OrganisationContext (DO NOT use stub from '@/integrations/supabase/client')
 * @param newUser - User data to create
 * @param updateProfile - Callback to update user profile after creation
 * @param onSuccess - Callback on successful creation
 *
 * Pattern: Same as auth module - receives supabaseClient as parameter from consuming app
 */
export declare const handleCreateUser: (supabaseClient: SupabaseClient, newUser: NewUser, updateProfile: (id: string, updates: Partial<UserProfile>) => Promise<void>, onSuccess: () => void) => Promise<void>;
/**
 * Delete a user via Edge Function
 *
 * @param supabaseClient - REQUIRED: Supabase client from OrganisationContext (DO NOT use stub from '@/integrations/supabase/client')
 * @param userId - ID of user to delete
 * @param userName - Name of user (for display)
 * @param reason - Optional reason for deletion
 *
 * Pattern: Same as auth module - receives supabaseClient as parameter from consuming app
 */
export declare const handleDeleteUser: (supabaseClient: SupabaseClient, userId: string, userName: string, reason?: string) => Promise<{
    success: boolean;
    deletedUser?: any;
    error?: string;
}>;
export {};
//# sourceMappingURL=userManagementActions.d.ts.map