import { LessonNode } from '../types/flowchart';

interface NodeListProps {
    nodes: LessonNode[];
    selectedNode: LessonNode | null;
    onNodeSelect: (node: LessonNode) => void;
    onCreateNode: () => void;
    onDeleteNode: (nodeId: string) => void;
}
export declare const NodeList: ({ nodes, selectedNode, onNodeSelect, onCreateNode, onDeleteNode }: NodeListProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=NodeList.d.ts.map