interface LearningTrackBuilderProps {
    track?: {
        id: string;
        title: string;
        description: string;
        status: string;
        schedule_type: string;
        start_date: string;
        end_date: string;
        duration_weeks: number;
        lessons_per_week: number;
        allow_all_lessons_immediately: boolean;
        schedule_days?: number[];
        max_lessons_per_week?: number | null;
    } | null;
    onClose: () => void;
}
export declare const LearningTrackBuilder: ({ track, onClose }: LearningTrackBuilderProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=LearningTrackBuilder.d.ts.map