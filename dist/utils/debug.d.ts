/**
 * Debug logging for the organisation module.
 *
 * Activated by the consuming app (learn / govern) via:
 *   - `staysecureDebug.enable()` in the browser console
 *   - `?debug` URL param
 *   - `VITE_DEBUG=true` env var
 *
 * All methods are silent in production unless debug mode is on.
 * Errors always log — they're important regardless of debug state.
 *
 * Usage:
 *   import debug from '../../utils/debug';
 *   debug.log('[MyComponent.myMethod] some value:', value);
 */
declare const debug: {
    /** Log a debug message (only when debug mode is on) */
    log: (...args: unknown[]) => void;
    /** Log a warning (only when debug mode is on) */
    warn: (...args: unknown[]) => void;
    /** Log an error (always logs — errors are always important) */
    error: (...args: unknown[]) => void;
    /** Log a state change (only when debug mode is on) */
    state: (label: string, value: unknown) => void;
};
export default debug;
//# sourceMappingURL=debug.d.ts.map