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
export declare const validateManager: (managerIdentifier: string, existingProfiles: Profile[] | undefined) => {
    isValid: boolean;
    managerId?: string;
};
//# sourceMappingURL=managerValidation.d.ts.map