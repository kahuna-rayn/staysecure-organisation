import { default as React } from 'react';

interface ProfileAvatarProps {
    avatarUrl?: string;
    firstName: string;
    lastName: string;
    profileId?: string;
    onAvatarUpdate?: (avatarUrl: string) => void;
}
declare const ProfileAvatar: React.FC<ProfileAvatarProps>;
export default ProfileAvatar;
//# sourceMappingURL=ProfileAvatar.d.ts.map