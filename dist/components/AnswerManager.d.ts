import { LessonNode, LessonAnswer } from '../types/flowchart';

interface AnswerManagerProps {
    selectedNode: LessonNode;
    nodes: LessonNode[];
    nodeAnswers: LessonAnswer[];
    onAddAnswer: () => void;
    onUpdateAnswer: (answerId: string, updates: Partial<LessonAnswer>) => void;
    onDeleteAnswer: (answerId: string) => void;
    onUpdateNode: (updates: Partial<LessonNode>) => void;
}
export declare const AnswerManager: ({ selectedNode, nodes, nodeAnswers, onAddAnswer, onUpdateAnswer, onDeleteAnswer, onUpdateNode }: AnswerManagerProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=AnswerManager.d.ts.map