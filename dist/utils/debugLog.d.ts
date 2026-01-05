/**
 * Debug logging for organisation module
 *
 * Logs only when consuming app enables debug mode via:
 * - window.__DEBUG__ = true (set by consuming app's debug.ts)
 * - ?debug URL param (which sets window.__DEBUG__)
 *
 * This allows organisation debugging without polluting production console.
 */
export declare const debugLog: (...args: unknown[]) => void;
export declare const debugWarn: (...args: unknown[]) => void;
export declare const debugError: (...args: unknown[]) => void;
//# sourceMappingURL=debugLog.d.ts.map