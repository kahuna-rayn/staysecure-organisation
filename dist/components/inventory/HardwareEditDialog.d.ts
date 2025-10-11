import { default as React } from 'react';
import { HardwareInventoryItem } from '../../hooks/useInventory';
import { UserProfile } from '../../hooks/useUserProfiles';

interface HardwareEditDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    editingItem: HardwareInventoryItem | null;
    profiles: UserProfile[];
    onItemChange: (item: HardwareInventoryItem) => void;
    onSave: () => void;
}
declare const HardwareEditDialog: React.FC<HardwareEditDialogProps>;
export default HardwareEditDialog;
//# sourceMappingURL=HardwareEditDialog.d.ts.map