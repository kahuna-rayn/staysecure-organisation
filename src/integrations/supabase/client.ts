/**
 * Supabase client integration
 * 
 * ⚠️ IMPORTANT: This is a STUB file for the organisation module.
 * 
 * ARCHITECTURE PATTERN (CRITICAL - DO NOT CHANGE):
 * ================================================
 * This module follows the SAME pattern as the auth module:
 * - The consuming application provides `supabaseClient` via OrganisationProvider config
 * - DO NOT import `supabase` from this file in user management functions
 * - Functions like `handleCreateUser` and `handleDeleteUser` receive `supabaseClient` as a parameter
 * - Get the client from `useOrganisationContext()` hook, not from this stub
 * 
 * Why this pattern?
 * - Consistency: Matches auth module pattern (supabaseClient via config)
 * - Module independence: Consuming app provides the client, module doesn't depend on env vars
 * - Testability: Easy to mock the client in tests
 * 
 * The actual Supabase client should be provided by the consuming application
 * via OrganisationProvider config prop.
 * 
 * This stub exists only for:
 * - Type definitions
 * - getCurrentClientId() utility (which should be overridden by consuming app)
 * 
 * DO NOT:
 * - Use `supabase` from this file in user management actions
 * - Import this in components that need to call handleCreateUser/handleDeleteUser
 * - Rely on process.env here (it won't work in Vite)
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * STUB: This should NOT be used in user management functions.
 * Get supabaseClient from useOrganisationContext() instead.
 * 
 * @deprecated Use supabaseClient from OrganisationContext
 */
export const supabase: SupabaseClient = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

/**
 * Get current client ID for multi-client support
 * This should be implemented by the consuming application
 */
export const getCurrentClientId = (): string | null => {
  // This should be implemented by the consuming application
  return null;
};

