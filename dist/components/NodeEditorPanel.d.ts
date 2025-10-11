import { LessonNode, LessonAnswer } from '../types/flowchart';

interface NodeEditorPanelProps {
    selectedNode: LessonNode;
    lessonNodes: LessonNode[];
    nodeAnswers: LessonAnswer[];
    lessonId: string;
    onUpdateNode: (updates: Partial<LessonNode>) => void;
    onDeleteNode: () => void;
    onClose: () => void;
    onAddAnswer: () => void;
    onUpdateAnswer: (answerId: string, updates: Partial<LessonAnswer>) => void;
    onDeleteAnswer: (answerId: string) => void;
    onMediaChange: (media: {
        type: string;
        url: string;
        alt: string;
    } | null) => void;
}
export declare const NodeEditorPanel: ({ selectedNode, lessonNodes, nodeAnswers, lessonId, onUpdateNode, onDeleteNode, onClose, onAddAnswer, onUpdateAnswer, onDeleteAnswer, onMediaChange, }: NodeEditorPanelProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=NodeEditorPanel.d.ts.map