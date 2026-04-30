export interface ProductLicense {
    licenseId: string;
    productId: string;
    productName: string;
    seats: number;
    usedSeats: number;
    availableSeats: number;
    pctUsed: number;
    isNearCapacity: boolean;
    isAtCapacity: boolean;
    /** Author seat quota (0 = no author seats licensed) */
    seatsAuthor: number;
    /** How many author assignments currently exist */
    usedAuthorSeats: number;
    availableAuthorSeats: number;
    startDate: string | null;
    endDate: string | null;
    daysUntilExpiry: number | null;
}
export interface LicenseAssignment {
    userId: string;
    userName: string | null;
    userEmail: string | null;
    licenseId: string;
    productId: string;
    productName: string;
    accessLevel: string;
}
export interface LicenseData {
    products: ProductLicense[];
    assignments: LicenseAssignment[];
}
export declare function useLicenseData(): any;
//# sourceMappingURL=useLicenseData.d.ts.map