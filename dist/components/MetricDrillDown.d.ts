import { default as React } from 'react';
import { DrillDownLevel } from './EnhancedMetrics';

interface MetricDefinition {
    id: string;
    title: string;
    icon: React.ReactNode;
    getValue: (profiles: any[]) => number | string;
    drillDownLevels: string[];
    type: 'count' | 'percentage' | 'score';
}
interface MetricDrillDownProps {
    metric: MetricDefinition;
    profiles: any[];
    drillDownPath: DrillDownLevel[];
    onDrillDown: (level: number, data: any[], title: string, type: 'org' | 'location' | 'department' | 'staff', value?: number) => void;
    locations: string[];
    departments: string[];
    userDeptMap: Map<string, any[]>;
    hardwareInventory: any[];
    softwareInventory: any[];
    softwareAssignments: any[];
    physicalLocationAccess: any[];
}
declare const MetricDrillDown: React.FC<MetricDrillDownProps>;
export default MetricDrillDown;
//# sourceMappingURL=MetricDrillDown.d.ts.map