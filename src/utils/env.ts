/**
 * Environment variable utility
 * Works in both Vite (import.meta.env) and Jest (process.env) contexts
 */

// Check if we're in a test environment (Jest sets NODE_ENV to 'test')
const isTestEnvironment = typeof process !== 'undefined' && 
  (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined);

/**
 * Get an environment variable value
 * @param key - The environment variable key (e.g., 'VITE_SUPABASE_URL')
 * @returns The environment variable value or undefined
 */
export const getEnvVar = (key: string): string | undefined => {
  // In Jest/test time - use process.env
  if (isTestEnvironment && typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  
  // In Vite/build time - use import.meta.env
  // We use a dynamic check to avoid parsing import.meta in Jest
  // @ts-expect-error - import.meta is available in Vite but not in Jest/Node
  const metaEnv = typeof globalThis !== 'undefined' && (globalThis as any).__VITE_META_ENV__;
  if (metaEnv) {
    return metaEnv[key];
  }
  
  // Direct access to import.meta.env (only works in Vite, will fail in Jest but that's ok)
  // We wrap it in a way that Jest's transformer can handle
  try {
    // @ts-expect-error - import.meta is not available in Jest
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return import.meta.env[key];
  } catch {
    // import.meta not available (e.g., in Jest) - fallback to process.env
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key];
    }
  }
  
  return undefined;
};

/**
 * Get Supabase URL from environment
 */
export const getSupabaseUrl = (): string | undefined => {
  return getEnvVar('VITE_SUPABASE_URL');
};

/**
 * Get Supabase anon key from environment
 * Tries multiple possible keys
 */
export const getSupabaseAnonKey = (): string | undefined => {
  return (
    getEnvVar('VITE_SUPABASE_ANON_KEY') ||
    getEnvVar('VITE_SUPABASE_PUB_KEY') ||
    getEnvVar('VITE_SB_PUB_KEY')
  );
};

