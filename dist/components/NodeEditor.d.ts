import { LessonNode, LessonAnswer } from '../types/flowchart';

interface NodeEditorProps {
    selectedNode: LessonNode | null;
    nodes: LessonNode[];
    nodeAnswers: LessonAnswer[];
    onUpdateNode: (updatedNode: LessonNode) => void;
    onMediaChange: (media: {
        type: string;
        url: string;
        alt: string;
    } | null) => void;
    onAddAnswer: () => void;
    onUpdateAnswer: (answerId: string, updates: Partial<LessonAnswer>) => void;
    onDeleteAnswer: (answerId: string) => void;
}
export declare const NodeEditor: ({ selectedNode, nodes, nodeAnswers, onUpdateNode, onMediaChange, onAddAnswer, onUpdateAnswer, onDeleteAnswer }: NodeEditorProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=NodeEditor.d.ts.map