import { SupabaseClient } from '@supabase/supabase-js';

/**
 * STUB: This should NOT be used in user management functions.
 * Get supabaseClient from useOrganisationContext() instead.
 *
 * @deprecated Use supabaseClient from OrganisationContext
 */
export declare const supabase: SupabaseClient;
/**
 * Get current client ID for multi-client support
 * This should be implemented by the consuming application
 */
export declare const getCurrentClientId: () => string | null;
//# sourceMappingURL=client.d.ts.map