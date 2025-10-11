import { LessonNode, LessonAnswer } from '../types/flowchart';

interface FlowchartCanvasProps {
    nodes: LessonNode[];
    answers: LessonAnswer[];
    onNodeSelect: (node: LessonNode) => void;
    onNodePositionChange: (nodeId: string, position: {
        x: number;
        y: number;
    }) => void;
    selectedNodeId?: string;
}
export declare const FlowchartCanvas: ({ nodes: lessonNodes, answers, onNodeSelect, onNodePositionChange, selectedNodeId, }: FlowchartCanvasProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FlowchartCanvas.d.ts.map