import { default as React } from 'react';

interface HardwareItem {
    id: string;
    type: string;
    model: string;
    serialNumber: string;
    status: string;
    assignedDate: string;
    manufacturer?: string;
    osEdition?: string;
    osVersion?: string;
}
interface HardwareInventoryProps {
    profile: {
        hardware: HardwareItem[];
    };
    onUpdate?: () => void;
}
declare const HardwareInventory: React.FC<HardwareInventoryProps>;
export default HardwareInventory;
//# sourceMappingURL=HardwareInventory.d.ts.map