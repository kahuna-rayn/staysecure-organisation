/**
 * Environment variable utility
 * Works in both Vite (import.meta.env) and Jest (process.env) contexts
 */
/**
 * Get an environment variable value
 * @param key - The environment variable key (e.g., 'VITE_SUPABASE_URL')
 * @returns The environment variable value or undefined
 */
export declare const getEnvVar: (key: string) => string | undefined;
/**
 * Get Supabase URL from environment
 */
export declare const getSupabaseUrl: () => string | undefined;
/**
 * Get Supabase anon key from environment
 * Tries multiple possible keys
 */
export declare const getSupabaseAnonKey: () => string | undefined;
//# sourceMappingURL=env.d.ts.map