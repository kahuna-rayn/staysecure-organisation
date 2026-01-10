import { debugLog } from '../utils/debugLog';

/**
 * User Management Actions
 * 
 * ARCHITECTURE PATTERN (CRITICAL - DO NOT CHANGE):
 * ================================================
 * This module follows the SAME pattern as the auth module:
 * - Functions receive `supabaseClient` as a parameter (passed from context)
 * - DO NOT import `supabase` from '@/integrations/supabase/client' (it's a stub)
 * - DO NOT use environment variables directly for Supabase URL
 * - Uses `supabaseClient.functions.invoke()` (no URL extraction needed - client handles it)
 * 
 * Why this pattern?
 * - Consistency: Matches auth module pattern (supabaseClient via config)
 * - Module independence: Consuming app provides the client, module doesn't depend on env vars
 * - Testability: Easy to mock the client in tests
 * 
 * IMPORTANT: If you need to call these functions, you MUST:
 * 1. Get `supabaseClient` from `useOrganisationContext()` hook
 * 2. Pass it as the first parameter to `handleCreateUser` and `handleDeleteUser`
 * 
 * Example:
 * ```tsx
 * const { supabaseClient } = useOrganisationContext();
 * await handleCreateUser(supabaseClient, newUser, updateProfile, onSuccess);
 * ```
 * 
 * DO NOT:
 * - Import `supabase` from '@/integrations/supabase/client'
 * - Use environment variables directly (consuming app handles config)
 * - Use `import.meta.env.VITE_SUPABASE_URL` directly
 * - Change the function signatures to remove supabaseClient parameter
 */

import { getCurrentClientId } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import type { UserProfile } from '@/hooks/useUserProfiles';
import type { SupabaseClient } from '@supabase/supabase-js';

// Define NewUser type locally since it's not exported from useUserManagement
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

export const handleSaveUser = async (
  editingUser: any, // Use any to work around type conflicts
  updateProfile: (id: string, updates: Partial<UserProfile>) => Promise<void>,
  onSuccess: () => void
) => {
  try {
    await updateProfile(editingUser.id, editingUser);
    toast({
      title: "Success",
      description: "User updated successfully",
    });
    onSuccess();
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
  }
};

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
export const handleCreateUser = async (
  supabaseClient: SupabaseClient,
  newUser: NewUser,
  updateProfile: (id: string, updates: Partial<UserProfile>) => Promise<void>,
  onSuccess: () => void
) => {
  try {
    // Extract client path using the same logic as client.ts
    const clientId = getCurrentClientId();
    const clientPath = clientId ? `/${clientId}` : '';
    
    const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
    if (sessionError || !sessionData?.session?.access_token) {
      throw new Error('Unable to determine current session. Please refresh and try again.');
    }

    // Call the create-user Edge Function using supabaseClient.functions.invoke()
    // This is consistent with handleDeleteUser and ImportUsersDialog
    // No need to extract URL - the client handles it automatically
    debugLog('[handleCreateUser] Invoking create-user Edge Function', {
      clientId,
      hasAccessToken: !!sessionData.session.access_token,
    });

    const { data, error } = await supabaseClient.functions.invoke('create-user', {
      body: {
        email: newUser.email,
        full_name: newUser.full_name,
        first_name: newUser.first_name || '',
        last_name: newUser.last_name || '',
        username: '',
        phone: newUser.phone || '',
        location: newUser.location || '',
        location_id: newUser.location_id || null,
        status: 'Pending',
        access_level: newUser.access_level || 'User',
        bio: newUser.bio || '',
        employee_id: newUser.employee_id || '',
        clientPath // Pass client path explicitly
      }
    });

    if (error) {
      console.error('[handleCreateUser] Edge Function error:', error);
      throw new Error(error.message || 'Failed to create user');
    }

    // Check if the function returned an error (since Edge Functions return 200 even for errors)
    if (data?.error) {
      console.error('[handleCreateUser] Edge Function returned error:', data.error);
      console.error('[handleCreateUser] Full Edge Function response:', data);
      throw new Error(data.error);
    }

    if (!data || !data.user) {
      throw new Error('No user data returned from create-user function');
    }

    const { user } = data;

    // Update profile with additional data (except status - let Edge Function handle it)
    if (user?.id) {
      await updateProfile(user.id, {
        full_name: newUser.full_name,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        username: newUser.email, 
        phone: newUser.phone,
        location: newUser.location,
        location_id: newUser.location_id || null,
        // Don't update status - Edge Function sets it to 'Pending' for activation
        language: newUser.language,
        bio: newUser.bio,
        employee_id: newUser.employee_id,
        manager: newUser.manager || null,
      });

            // Assign physical location access if location is selected
      if (newUser.location_id) {
        try {
          const locationData = {
            user_id: user.id,
            location_id: newUser.location_id,
            full_name: newUser.full_name,
            access_purpose: 'General Access',
            status: 'Active',
            date_access_created: new Date().toISOString()
          };

          const { error: locationError } = await supabaseClient
            .from('physical_location_access')
            .insert(locationData)
            .select();

          if (locationError) {
            console.error('❌ Error assigning physical location access:', locationError);
          }
        } catch (locationError) {
          console.error('❌ Exception assigning physical location access:', locationError);
        }
      }
    }

    toast({
      title: "Success",
      description: "User created successfully",
    });
    
    onSuccess();
  } catch (error: any) {
    console.error('Error creating user:', error);
    toast({
      title: "Error",
      description: error.message || "Failed to create user",
      variant: "destructive",
    });
  }
};

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
export const handleDeleteUser = async (supabaseClient: SupabaseClient, userId: string, userName: string, reason?: string): Promise<{ success: boolean; deletedUser?: any; error?: string }> => {
  try {
    // Call the delete-user Edge Function
    const { data, error } = await supabaseClient.functions.invoke('delete-user', {
      body: {
        userId,
        reason: reason || undefined
      }
    });

    if (error) {
      console.error('[handleDeleteUser] Edge Function invocation error:', error);
      const errorMessage = error.message || 'Failed to delete user';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return { success: false, error: errorMessage };
    }

    if (!data || !data.success) {
      const errorMessage = data?.error || 'Failed to delete user';
      console.error('[handleDeleteUser] Edge Function returned error:', errorMessage);
      console.error('[handleDeleteUser] Full Edge Function response:', data);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return { success: false, error: errorMessage };
    }

    return { success: true, deletedUser: data.deletedUser };
  } catch (error: any) {
    console.error('[handleDeleteUser] Exception:', error);
    const errorMessage = error?.message || 'Failed to delete user';
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
    return { success: false, error: errorMessage };
  }
};