import { default as React } from 'react';
import { SoftwareInventoryItem } from '../../hooks/useInventory';

interface SoftwareTableProps {
    softwareInventory: SoftwareInventoryItem[];
    onUpdate: (id: string, updates: Partial<SoftwareInventoryItem>) => Promise<{
        success: boolean;
        error?: string;
    }>;
    onDelete: (id: string) => Promise<{
        success: boolean;
        error?: string;
    }>;
    onCreate?: (data: Partial<SoftwareInventoryItem>) => Promise<{
        success: boolean;
        error?: string;
    }>;
}
declare const SoftwareTable: React.FC<SoftwareTableProps>;
export default SoftwareTable;
//# sourceMappingURL=SoftwareTable.d.ts.map