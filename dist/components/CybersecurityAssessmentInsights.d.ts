interface CybersecurityAssessmentInsightsProps {
    cybersecurityAssessmentData: Array<{
        domain: string;
        score: number;
        color: string;
    }>;
    priorityData: Array<{
        domain: string;
        priority: number;
    }>;
    keyInsightsData: Array<{
        n: number;
        insight: string;
        domain: string;
    }>;
    detailedInsightsData: Array<{
        domain_short: string;
        domain: string;
        question: string;
        avg_score: number;
        recommendation: string;
    }>;
    isLoading?: boolean;
}
export declare const CybersecurityAssessmentInsights: ({ cybersecurityAssessmentData, priorityData, keyInsightsData, detailedInsightsData, isLoading }: CybersecurityAssessmentInsightsProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CybersecurityAssessmentInsights.d.ts.map