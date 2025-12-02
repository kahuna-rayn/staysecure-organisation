/**
 * Utility functions for validating manager assignments in user imports
 */

export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  username?: string;
}

/**
 * Validates if a manager identifier matches an existing profile
 * @param managerIdentifier - Email, full name, or username to search for
 * @param existingProfiles - Array of existing profiles to search
 * @returns Object with isValid flag and managerId if found
 */
export const validateManager = (
  managerIdentifier: string,
  existingProfiles: Profile[] | undefined
): { isValid: boolean; managerId?: string } => {
  if (!managerIdentifier || !existingProfiles) {
    return { isValid: false };
  }

  const trimmedIdentifier = managerIdentifier.trim().toLowerCase();
  
  // Try to find manager by email, full_name, or username (case-insensitive)
  const manager = existingProfiles.find((profile: Profile) => {
    const email = (profile.email || '').toLowerCase();
    const fullName = (profile.full_name || '').toLowerCase();
    const username = (profile.username || '').toLowerCase();
    
    return email === trimmedIdentifier || 
           fullName === trimmedIdentifier || 
           username === trimmedIdentifier;
  });

  return {
    isValid: !!manager,
    managerId: manager?.id
  };
};

