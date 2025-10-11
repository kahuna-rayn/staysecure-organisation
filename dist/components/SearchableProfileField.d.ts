import { default as React } from 'react';

interface Profile {
    id: string;
    full_name: string;
    username: string;
    email?: string;
}
interface SearchableProfileFieldProps {
    value?: string;
    onSelect: (profile: Profile | null) => void;
    placeholder?: string;
    disabled?: boolean;
}
declare const SearchableProfileField: React.FC<SearchableProfileFieldProps>;
export default SearchableProfileField;
//# sourceMappingURL=SearchableProfileField.d.ts.map