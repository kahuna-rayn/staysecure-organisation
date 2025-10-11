import { default as React } from 'react';
import { HardwareInventoryItem } from '../../hooks/useInventory';

interface HardwareTableProps {
    hardwareInventory: HardwareInventoryItem[];
    onEdit: (item: HardwareInventoryItem) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updates: Partial<HardwareInventoryItem>) => Promise<{
        success: boolean;
        error?: string;
    }>;
    onCreate?: (data: Partial<HardwareInventoryItem>) => Promise<{
        success: boolean;
        error?: string;
    }>;
}
declare const HardwareTable: React.FC<HardwareTableProps>;
export default HardwareTable;
//# sourceMappingURL=HardwareTable.d.ts.map