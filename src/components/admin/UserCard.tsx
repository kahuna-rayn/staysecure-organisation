
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Trash2, Phone, MapPin, IdCard, Mail } from 'lucide-react';
import { DepartmentRolePairsDisplay } from '../organisational/DepartmentRolePairsDisplay';
import type { UserProfile } from '@/hooks/useUserProfiles';

interface UserCardProps {
  user: UserProfile;
  onDelete: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const navigate = useNavigate();

  const initials = user.full_name 
    ? user.full_name.split(' ').map((n: string) => n.charAt(0)).join('').slice(0, 2)
    : user.username?.slice(0, 2) || 'U';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Inactive': return 'bg-red-500';
      case 'OnLeave': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };


  const handleViewDetails = () => {
    navigate(`/admin/users/${user.id}`);
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleViewDetails}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.full_name || 'No name'}</h3>
              <div className="text-sm text-muted-foreground">
                <DepartmentRolePairsDisplay userId={user.id} />
              </div>
            </div>
          </div>
          <Badge className={`${getStatusColor(user.status || 'Active')} text-white`}>
            {user.status || 'Active'}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{user.email || 'No email'}</span>
          </div>
          <div className="flex items-center gap-2">
            <IdCard className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">ID: {user.employee_id || 'Not set'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{user.phone || 'No phone'}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{user.location || 'No location'}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
          <Button size="sm" variant="outline" onClick={handleViewDetails}>
            <Edit className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDelete(user.id)}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
