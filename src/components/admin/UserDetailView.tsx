
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useUserProfiles } from '@/hooks/useUserProfiles';
import { useUserAssets } from '@/hooks/useUserAssets';
import { useOrganisationContext } from '../../context/OrganisationContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import EditableProfileHeader from '../profile/EditableProfileHeader';
import PersonaDetailsTabs from '../profile/PersonaDetailsTabs';

const UserDetailView: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { supabaseClient, basePath } = useOrganisationContext();
  const { profiles, loading: profilesLoading } = useUserProfiles();
  const { hardware, software, certificates, loading: assetsLoading } = useUserAssets(userId);

  // Fetch last_sign_in_at directly from auth.users via security-definer RPC
  const { data: lastSignIn } = useQuery({
    queryKey: ['user-last-sign-in', userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabaseClient
        .rpc('get_user_last_sign_in', { target_user_id: userId });
      if (error) return null;
      return data as string | null;
    },
    enabled: !!userId,
  });

  // Build personaData from the latest userProfile
  const buildPersonaData = (profileObj: any) => ({
    id: profileObj.id,
    full_name: profileObj.full_name || '',  // Add this line
    firstName: profileObj.first_name || '',  // Use actual first_name from DB
    lastName: profileObj.last_name || '',    // Use actual last_name from DB
    email: profileObj.email || '',
    phone: profileObj.phone || 'Not provided',
    location: profileObj.location || 'Not specified',
    avatar: profileObj.avatar_url || '',
    role: profileObj.role || 'Employee',
    department: profileObj.department || 'General',
    manager: profileObj.manager || 'Not assigned',
    startDate: profileObj.start_date || profileObj.created_at,
    language: profileObj.language || 'English',
    cyber_learner: profileObj.cyber_learner || false,
    account: {
      username: profileObj.username || 'Not set',
      employeeId: profileObj.employee_id || 'Not assigned',
      status: profileObj.status || 'Active',
      accessLevel: profileObj.access_level || 'User',
      lastLogin: lastSignIn || profileObj.last_login || '',
      passwordLastChanged: profileObj.password_last_changed || profileObj.created_at,
      twoFactorEnabled: profileObj.two_factor_enabled || false,
    },
    hardware: hardware.map((h: any) => ({
      id: h.id,
      type: h.type,
      model: h.model,
      serialNumber: h.serial_number,
      status: h.status,
      assignedDate: h.assigned_date,
      manufacturer: h.manufacturer || '',
      osEdition: h.os_edition || '',
      osVersion: h.os_version || '',
    })),
    software: software.map((s: any) => ({
      name: s.name,
      role_account_type: s.role_account_type,
      expiryDate: s.expiryDate,
      lastUsed: s.lastUsed,
    })),
    certificates: certificates.map((c: any) => ({
      id: c.id,
      type: c.type || 'Certificate',
      name: c.name,
      issuedBy: c.issued_by,
      dateAcquired: c.date_acquired,
      expiryDate: c.expiry_date,
      credentialId: c.credential_id,
      status: c.status,
      org_cert: c.org_cert,
      certificate_url: c.certificate_url,
    })),
  });

  // Hooks at the top
  const [personaData, setPersonaData] = React.useState<any>(null);

  React.useEffect(() => {
    const userProfile = profiles.find((p: any) => p.id === userId);
    if (userProfile) {
      setPersonaData(buildPersonaData(userProfile));
    }
  }, [profiles, userId, hardware, software, certificates, lastSignIn]);

  // Handler for optimistic update
  const handleOptimisticUpdate = (field: string, value: string) => {
    setPersonaData((prev: any) => {
      const updated = { ...prev };
      if (field === 'language') {
        updated.language = value;
      } else if (field in updated) {
        updated[field] = value;
      } else if (updated.account && field in updated.account) {
        updated.account = { ...updated.account, [field]: value };
      }
      return updated;
    });
  };

  const handleProfileUpdate = () => {
    // For admin view, we might want to refresh the data but not allow editing
  };

  const handleBackToUsers = () => {
    // Navigate to admin panel with organisation tab active (preserve client basePath)
    navigate(`${basePath || ''}/admin`, { state: { activeTab: 'organisation' } });
  };

  // Loading and error UI
  if (profilesLoading || assetsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const userProfile = profiles.find((p: any) => p.id === userId);

  if (!userProfile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-muted-foreground">User not found</p>
        <Button onClick={() => navigate(`${basePath || ''}/admin`)} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admin
        </Button>
      </div>
    );
  }

  if (!personaData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button onClick={handleBackToUsers} variant="outline" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">User Profile: {userProfile.full_name || 'Unnamed User'}</h1>
      </div>
      <EditableProfileHeader 
        profile={personaData} 
        onProfileUpdate={handleProfileUpdate}
        onOptimisticUpdate={handleOptimisticUpdate}
      />
      <PersonaDetailsTabs profile={personaData} userId={userId!} />
    </div>
  );
};

export default UserDetailView;
