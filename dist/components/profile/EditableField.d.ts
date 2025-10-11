import { default as React } from 'react';

interface EditableFieldProps {
    value: string;
    fieldKey?: string;
    label?: string;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    locationId?: string;
    isEditing: boolean;
    onEdit: (field: string) => void;
    onSave: (field: string, value: string) => Promise<void>;
    onCancel: () => void;
    saving: boolean;
    type?: 'text' | 'select' | 'date';
    options?: string[];
    asyncOptions?: {
        value: string;
        label: string;
        id?: string;
    }[];
    isLoading?: boolean;
    onSelectChange?: (value: string, selectedOption?: {
        value: string;
        label: string;
        id?: string;
    }) => void;
}
declare const EditableField: React.FC<EditableFieldProps>;
export default EditableField;
//# sourceMappingURL=EditableField.d.ts.map