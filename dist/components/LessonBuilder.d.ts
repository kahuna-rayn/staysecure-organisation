interface LessonBuilderProps {
    lesson?: {
        id: string;
        title: string;
        description: string;
        status: string;
        estimated_duration: number;
        is_module?: boolean;
    } | null;
    onClose: () => void;
}
export declare const LessonBuilder: ({ lesson, onClose }: LessonBuilderProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=LessonBuilder.d.ts.map