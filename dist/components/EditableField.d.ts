import { default as React } from 'react';

interface EditableFieldProps {
    isEditing: boolean;
    value: string;
    displayValue: string;
    type?: 'text' | 'select' | 'date';
    options?: string[];
    onStartEdit: () => void;
    onValueChange: (value: string) => void;
    onBlur: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onSelectChange?: (value: string) => void;
}
declare const EditableField: React.FC<EditableFieldProps>;
export default EditableField;
//# sourceMappingURL=EditableField.d.ts.map