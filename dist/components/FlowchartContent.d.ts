import { LessonNode, LessonAnswer } from '../types/flowchart';

interface FlowchartContentProps {
    lessonNodes: LessonNode[];
    answers: LessonAnswer[];
    lessonId: string;
    selectedNodeId: string | null;
    setSelectedNodeId: (nodeId: string | null) => void;
    onNodeUpdate: (updatedNode: LessonNode) => void;
    onNodePositionChange: (nodeId: string, position: {
        x: number;
        y: number;
    }) => void;
    onCreateNode: (position: {
        x: number;
        y: number;
    }) => void;
    onDeleteNode: (nodeId: string) => void;
    onAddAnswer: (nodeId: string) => void;
    onUpdateAnswer: (answerId: string, updates: Partial<LessonAnswer>) => void;
    onDeleteAnswer: (answerId: string) => void;
    onMediaChange: (nodeId: string, media: {
        type: string;
        url: string;
        alt: string;
    } | null) => void;
}
export declare const FlowchartContent: ({ lessonNodes, answers, lessonId, selectedNodeId, setSelectedNodeId, onNodeUpdate, onNodePositionChange, onCreateNode, onDeleteNode, onAddAnswer, onUpdateAnswer, onDeleteAnswer, onMediaChange, }: FlowchartContentProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FlowchartContent.d.ts.map