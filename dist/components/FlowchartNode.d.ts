interface FlowchartNodeProps {
    data: {
        id: string;
        type: 'prompt' | 'question' | 'lesson';
        content: string;
        media_type?: string;
        media_url?: string;
        media_alt?: string;
        embedded_lesson_id?: string;
        nodeNumber?: number;
        isSelected: boolean;
        onClick: () => void;
    };
}
export declare const FlowchartNode: ({ data }: FlowchartNodeProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FlowchartNode.d.ts.map