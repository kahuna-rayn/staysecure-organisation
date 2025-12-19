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
 * Validates if a manager email matches an existing profile
 * @param managerEmail - Email address to search for (must be a valid email)
 * @param existingProfiles - Array of existing profiles to search
 * @returns Object with isValid flag and managerId if found
 */
export declare const validateManager: (managerEmail: string, existingProfiles: Profile[] | undefined) => {
    isValid: boolean;
    managerId?: string;
};
//# sourceMappingURL=managerValidation.d.ts.map