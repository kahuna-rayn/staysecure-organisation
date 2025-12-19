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
 * Validates if a manager identifier matches an existing profile
 * @param managerIdentifier - Email or full name to search for (username removed since username = email)
 * @param existingProfiles - Array of existing profiles to search
 * @returns Object with isValid flag, managerId if found, and isAmbiguous flag if multiple matches by full name
 */
export const validateManager = (
  managerIdentifier: string,
  existingProfiles: Profile[] | undefined
): { isValid: boolean; managerId?: string; isAmbiguous?: boolean; ambiguityDetails?: string } => {
  if (!managerIdentifier || !existingProfiles) {
    return { isValid: false };
  }

  const trimmedIdentifier = managerIdentifier.trim().toLowerCase();
  
  // Try to find by email first (username stores email, so check both email and username fields)
  const emailMatches = existingProfiles.filter((profile: Profile) => {
    const email = (profile.email || profile.username || '').toLowerCase();
    return email === trimmedIdentifier;
  });
  
  // If found by email, return immediately (email is unique)
  if (emailMatches.length === 1) {
    return {
      isValid: true,
      managerId: emailMatches[0].id
    };
  }
  
  // If multiple email matches (shouldn't happen, but handle it)
  if (emailMatches.length > 1) {
    return {
      isValid: true,
      managerId: emailMatches[0].id,
      isAmbiguous: true,
      ambiguityDetails: `Multiple users found with email "${managerIdentifier}"`
    };
  }
  
  // Try to find by full name
  const nameMatches = existingProfiles.filter((profile: Profile) => {
    const fullName = (profile.full_name || '').toLowerCase();
    return fullName === trimmedIdentifier;
  });
  
  // If no matches by name
  if (nameMatches.length === 0) {
    return { isValid: false };
  }
  
  // If single match by name, return it
  if (nameMatches.length === 1) {
    return {
      isValid: true,
      managerId: nameMatches[0].id
    };
  }
  
  // Multiple matches by full name - ambiguous!
  const matchDetails = nameMatches.map(m => {
    const email = m.email || m.username || 'no email';
    return `${m.full_name} (${email})`;
  }).join(', ');
  
  return {
    isValid: true,
    managerId: nameMatches[0].id, // Return first match but flag as ambiguous
    isAmbiguous: true,
    ambiguityDetails: `Multiple users found with name "${managerIdentifier}": ${matchDetails}. Using first match. Please use email to specify the exact manager.`
  };
};

