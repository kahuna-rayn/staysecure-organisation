/**
 * Toast utility
 * This is a stub file for the organisation module.
 * The actual implementation should be provided by the consuming application.
 */

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export const toast = (options: ToastOptions) => {
  // Stub implementation - should be provided by consuming application
  console.log('Toast:', options);
};

