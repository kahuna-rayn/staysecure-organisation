/**
 * Debug logging for organisation module
 * 
 * Logs only when consuming app enables debug mode via:
 * - window.__DEBUG__ = true (set by consuming app's debug.ts)
 * - ?debug URL param (which sets window.__DEBUG__)
 * 
 * This allows organisation debugging without polluting production console.
 */

export const debugLog = (...args: unknown[]): void => {
  if (typeof window !== 'undefined' && (window as any).__DEBUG__) {
    console.log('[ORG]', ...args);
  }
};

export const debugWarn = (...args: unknown[]): void => {
  if (typeof window !== 'undefined' && (window as any).__DEBUG__) {
    console.warn('[ORG]', ...args);
  }
};

// Errors always log (they're important)
export const debugError = (...args: unknown[]): void => {
  console.error('[ORG]', ...args);
};
