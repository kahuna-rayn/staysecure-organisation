import React, { useState, useMemo } from "react";
import { debugLog } from '../../utils/debugLog';
import { useAuth } from 'staysecure-auth';
import { useProfile } from "@/hooks/useProfile";
import { useUserAssets } from "@/hooks/useUserAssets";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader2 } from "lucide-react";
import EditableProfileHeader from "./EditableProfileHeader";
import PersonaDetailsTabs from "./PersonaDetailsTabs";

// Define PersonProfile interface to replace the one from deleted mockData.ts
export interface PersonProfile {
  id: string;
  full_name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  role: string;
  department: string;
  manager: string;
  startDate: string;
  language?: string;
  account: {
    username: string;
    employeeId: string;
    status: string;
    accessLevel: string;
    lastLogin: string;
    passwordLastChanged: string;
    twoFactorEnabled: boolean;
  };
  hardware: Array<{
    id: string;
    type: string;
    model: string;
    serialNumber: string;
    status: string;
    assignedDate: string;
    manufacturer: string;
    osEdition: string;
    osVersion: string;
  }>;
  software: Array<{
    id: string;
    name: string;
    role_account_type: string;
    expiryDate: string | null;
    lastUsed: string | null;
  }>;
  certificates: Array<{
    name: string;
    issuedBy: string;
    dateAcquired: string;
    expiryDate: string;
    credentialId: string;
    status: string;
    org_cert?: boolean;
    type?: string;
  }>;
}

const PersonaProfile: React.FC = () => {
  const { user } = useAuth();
  const { hasAdminAccess } = useUserRole();
  const { profile, loading: profileLoading, refetch: refetchProfile } = useProfile();
  const { hardware, software, certificates, loading: assetsLoading, refetch: refetchAssets } = useUserAssets(user?.id);
  
  // Extract user email to prevent infinite re-renders
  const userEmail = user?.email;
  
  // ALL HOOKS MUST BE CALLED BEFORE ANY EARLY RETURNS
  const [optimisticData, setOptimisticData] = useState<PersonProfile | null>(null);

  // Memoize personaData to prevent infinite re-renders - MUST be called before any early returns
  const personaData = useMemo(() => ({
    id: profile?.id || '',
    full_name: profile?.full_name || '',
    firstName: profile?.first_name || '',  // Use actual first_name from DB
    lastName: profile?.last_name || '',    // Use actual last_name from DB
    email: userEmail || '',
    phone: profile?.phone || 'Not provided',
    location: profile?.location || 'Not specified',
    avatar: profile?.avatar_url || '',
    role: profile?.role || 'Employee',
    department: profile?.department || 'General',
    manager: profile?.manager || 'Not assigned',
    startDate: profile?.start_date || profile?.created_at || '',
    language: profile?.language || 'English',
    account: {
      username: profile?.username || 'Not set',
      employeeId: profile?.employee_id || 'Not assigned',
      status: profile?.status || 'Active',
      accessLevel: profile?.access_level || 'User',
      lastLogin: (user?.last_sign_in_at as string | undefined) || '',
      passwordLastChanged: profile?.password_last_changed || profile?.created_at || '',
      twoFactorEnabled: profile?.two_factor_enabled || false,
    },
    hardware: (hardware || []).map(h => ({
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
    software: (software || []).map(s => ({
      id: s.id,
      name: s.name,
      role_account_type: s.role_account_type,
      expiryDate: s.expiryDate,
      lastUsed: s.lastUsed,
    })),
    certificates: (certificates || []).map(c => {
      const mapped = {
        name: c.name,
        issuedBy: c.issued_by,
        dateAcquired: c.date_acquired,
        expiryDate: c.expiry_date,
        credentialId: c.credential_id,
        status: c.status,
        org_cert: c.org_cert !== undefined ? c.org_cert : false, // Preserve false, default to false if undefined
        type: c.type, // Include type for display
      };
      return mapped;
    }),
  }), [profile, hardware, software, certificates, userEmail, user]);

  const handleProfileUpdate = async () => {
    // Clear optimistic data first so fresh data will be used
    setOptimisticData(null);
    // Refetch both profile and assets data to ensure everything is fresh
    await refetchProfile();
    refetchAssets();
  };

  if (profileLoading || assetsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No profile found. Please update your profile information.</p>
      </div>
    );
  }

  // Handler for optimistic update
  const handleOptimisticUpdate = (field: string, value: string) => {
    debugLog('PersonaProfile handleOptimisticUpdate - field:', field, 'value:', value);
    setOptimisticData(prev => {
      const baseData = prev || personaData;
      const updated = { ...baseData };
      // Map avatar_url to avatar field
      if (field === 'avatar_url') {
        updated.avatar = value;
      } else if (field === 'language') {
        debugLog('PersonaProfile - setting language to:', value);
        updated.language = value;
      } else if (field in updated) {
        updated[field] = value;
      } else if (updated.account && field in updated.account) {
        updated.account = { ...updated.account, [field]: value };
      }
      debugLog('PersonaProfile - updated optimisticData language:', updated.language);
      return updated;
    });
  };


  const displayData = optimisticData || personaData;
  debugLog('PersonaProfile render - displayData.language:', displayData.language);
  debugLog('PersonaProfile render - personaData.language:', personaData.language);
  debugLog('PersonaProfile render - optimisticData?.language:', optimisticData?.language);

  return (
    <div className="space-y-6">
      {!hasAdminAccess && (
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Profile</h1>
        </div>
      )}
      <EditableProfileHeader profile={displayData} onProfileUpdate={refetchProfile} onOptimisticUpdate={handleOptimisticUpdate} />
      <PersonaDetailsTabs profile={displayData} userId={user?.id || ''} onUpdate={handleProfileUpdate} />
    </div>
  );
};

export default PersonaProfile;
