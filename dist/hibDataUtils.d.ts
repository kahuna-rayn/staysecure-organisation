export interface HIBClause {
    id: string;
    hibSection: string;
    hibClause: number;
    hibClauseDescription: string;
    suggestedArtefacts: string;
    implementationStatus: 'No' | 'Yes' | 'Partially' | '';
    remarks: string;
    additionalInformationI: string;
    additionalInformationII: string;
    additionalInformationIII: string;
    sectionNumber?: number;
}
export declare const getInitialClauses: () => HIBClause[];
export declare const loadHIBData: (userId: string) => Promise<HIBClause[]>;
export declare const saveHIBData: (userId: string, clausesToSave: HIBClause[]) => Promise<void>;
export declare const updateHIBClause: (userId: string, id: string, updates: Partial<HIBClause>) => Promise<{
    success: boolean;
    error?: string;
}>;
export declare const createHIBClause: (userId: string, data: Partial<HIBClause>) => Promise<{
    success: boolean;
    error?: string;
    data?: HIBClause;
}>;
export declare const deleteHIBClause: (userId: string, id: string) => Promise<{
    success: boolean;
    error?: string;
}>;
//# sourceMappingURL=hibDataUtils.d.ts.map