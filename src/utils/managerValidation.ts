/**
 * Utility functions for validating manager assignments in user imports
 */

export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  username?: string; // username stores the email address in this system
}

/**
 * Validates if a manager email matches an existing profile
 * @param managerEmail - Email address to search for (must be a valid email)
 * @param existingProfiles - Array of existing profiles to search
 * @returns Object with isValid flag and managerId if found
 */
export const validateManager = (
  managerEmail: string,
  existingProfiles: Profile[] | undefined
): { isValid: boolean; managerId?: string } => {
  if (!managerEmail || !existingProfiles) {
    return { isValid: false };
  }

  const trimmedEmail = managerEmail.trim().toLowerCase();
  
  // Find by email (username stores email, so check both email and username fields)
  const matchingProfile = existingProfiles.find((profile: Profile) => {
    const email = (profile.email || profile.username || '').toLowerCase();
    return email === trimmedEmail;
  });
  
  if (matchingProfile) {
    return {
      isValid: true,
      managerId: matchingProfile.id
    };
  }
  
  // No match found
  return { isValid: false };
};

