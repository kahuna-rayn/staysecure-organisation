import { default as React } from 'react';
import { UserProfile } from '../../hooks/useUserProfiles';

interface UserCardProps {
    user: UserProfile;
    onDelete: (userId: string) => void;
}
declare const UserCard: React.FC<UserCardProps>;
export default UserCard;
//# sourceMappingURL=UserCard.d.ts.map