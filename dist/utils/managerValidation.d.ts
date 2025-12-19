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
 * @param managerIdentifier - Email or full name to search for (username removed since username = email)
 * @param existingProfiles - Array of existing profiles to search
 * @returns Object with isValid flag, managerId if found, and isAmbiguous flag if multiple matches by full name
 */
export declare const validateManager: (managerIdentifier: string, existingProfiles: Profile[] | undefined) => {
    isValid: boolean;
    managerId?: string;
    isAmbiguous?: boolean;
    ambiguityDetails?: string;
};
//# sourceMappingURL=managerValidation.d.ts.map