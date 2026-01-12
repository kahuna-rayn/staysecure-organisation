import { default as React } from 'react';
import { UserProfile } from '../../hooks/useUserProfiles';

interface UserListProps {
    profiles: UserProfile[];
    onDelete: (userId: string) => void;
}
declare const UserList: React.FC<UserListProps>;
export default UserList;
//# sourceMappingURL=UserList.d.ts.map