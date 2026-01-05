import React, { useState, useEffect } from 'react';
import { debugLog } from '../../utils/debugLog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, User, Hash, Phone, Star, Network, Globe } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useUserProfiles } from '@/hooks/useUserProfiles';
import { useUserDepartments } from '@/hooks/useUserDepartments';
import { useUserProfileRoles } from '@/hooks/useUserProfileRoles';
// useUserPhysicalLocations removed - we fetch all locations directly for admin dropdown
import { useUserRole } from '@/hooks/useUserRole';
import { useOrganisationContext } from '@/context/OrganisationContext';
import { toast } from '@/components/ui/use-toast';
import ProfileAvatar from './ProfileAvatar';
import ProfileContactInfo from './ProfileContactInfo';
import EditableField from './EditableField';

interface EditableProfileHeaderProps {
  profile: Record<string, unknown>;
  onProfileUpdate: () => void;
  isReadOnly?: boolean;
  onOptimisticUpdate?: (field: string, value: string) => void;
}

const EditableProfileHeader: React.FC<EditableProfileHeaderProps> = ({ 
  profile, 
  onProfileUpdate,
  isReadOnly: _isReadOnly = false,
  onOptimisticUpdate
}) => {
  const { profiles, updateProfile } = useUserProfiles();
  const { supabaseClient, hasPermission } = useOrganisationContext();
  const canEditManager = hasPermission('canEditUsers');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savingLanguage, setSavingLanguage] = useState(false);
  const [managerValue, setManagerValue] = useState(profile.manager || '');
  const [isFullNameManuallyEdited, setIsFullNameManuallyEdited] = useState(false);

  // Reset the manual edit flag when profile changes
  useEffect(() => {
    setIsFullNameManuallyEdited(false);
  }, [profile.id]);

  // Fetch languages for dropdown
  const { data: languages } = useQuery({
    queryKey: ['languages'],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('languages')
        .select('code, display_name, native_name, flag_emoji')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      return data || [];
    },
  });

  const handleFieldEdit = (field: string) => {
    setEditingField(field);
  };

  const handleFieldSave = async (field: string, value: string) => {
    try {
      setSaving(true);
      const updateData: Record<string, unknown> = {};
      if (field === 'full_name') {
        updateData.full_name = value;
      } else if (field === 'phone') {
        updateData.phone = value;
      } else if (field === 'location') {
        updateData.location = value;
      } else if (field === 'location_id') {
        updateData.location_id = value;
      } else if (field === 'role') {
        updateData.role = value;
      } else if (field === 'department') {
        updateData.department = value;
      } else if (field === 'manager') {
        updateData.manager = value;
      } else if (field === 'language') {
        updateData.language = value;
      }
      
      if (!profile.id) {
        console.error('Profile ID is undefined. Profile object:', profile);
        toast({
          title: "Error",
          description: "Profile ID is missing. Cannot update profile.",
          variant: "destructive",
        });
        return;
      }
      
      await updateProfile(profile.id, updateData);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      setEditingField(null);
      if (onOptimisticUpdate) {
        onOptimisticUpdate(field, value);
      }
      onProfileUpdate();
    } catch (error: unknown) {
      console.error('Save error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFieldCancel = () => {
    setEditingField(null);
  };

  const handleNameChange = async (field: 'firstName' | 'lastName', value: string) => {
    try {
      setSaving(true);

      // Update the specific name field
      const updateData: Record<string, unknown> = {};
      if (field === 'firstName') {
        updateData.first_name = value;
      } else {
        updateData.last_name = value;
      }
      
      // Only auto-update full_name if it has NOT been manually edited by the user
      if (!isFullNameManuallyEdited) {
        const firstName = field === 'firstName' ? value : (profile.firstName as string || '');
        const lastName = field === 'lastName' ? value : (profile.lastName as string || '');
        updateData.full_name = `${firstName} ${lastName}`.trim();
      }
      
      if (!profile.id) {
        console.error('Profile ID is undefined. Profile object:', profile);
        toast({
          title: "Error",
          description: "Profile ID is missing. Cannot update profile.",
          variant: "destructive",
        });
        return;
      }
      
      await updateProfile(profile.id as string, updateData);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      setEditingField(null);
      if (onOptimisticUpdate) {
        onOptimisticUpdate(field, value);
        if (updateData.full_name) {
          onOptimisticUpdate('full_name', updateData.full_name as string);
        }
      }
      onProfileUpdate();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFullNameChange = async (value: string) => {
    // Mark that user has manually edited the full name
    setIsFullNameManuallyEdited(true);
    await handleFieldSave('full_name', value);
  };

  // Get current user's role to determine if super_admins should be shown
  const { isSuperAdmin } = useUserRole();
  
  // Get manager name and filtered profiles
  // - Always exclude current user (can't be your own manager)
  // - Only show super_admin users if current user is also super_admin
  const filteredProfiles = profiles.filter(user => {
    if (user.id === profile.id) return false; // Exclude self
    if (user.access_level === 'super_admin' && !isSuperAdmin) return false; // Hide super_admins from non-super_admins
    return true;
  });
  
  const managerProfile = profiles.find(u => u.id === profile.manager);
  const managerName = managerProfile ? (managerProfile.full_name || managerProfile.username) : 'Not assigned';

  // Get departments and roles
  const { userDepartments } = useUserDepartments(profile.id);
  const { primaryRole } = useUserProfileRoles(profile.id);
  
  // Fetch ALL active locations for dropdown (not just user's assigned locations)
  const { data: physicalLocations, isLoading: locationsLoading } = useQuery({
    queryKey: ['all-locations'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('locations')
        .select('id, name')
        .eq('status', 'Active')
        .order('name');
      if (error) throw error;
      // Transform to dropdown format
      return (data || []).map(loc => ({
        id: loc.id,
        name: loc.name,
        value: loc.name,
        label: loc.name
      }));
    },
  });
  
  // Get primary department
  const primaryDepartment = userDepartments?.find(dept => dept.is_primary);

  const handleManagerChange = async (userId: string) => {
    setManagerValue(userId);
    await handleFieldSave('manager', userId);
  };

  // Handle location selection with both name and ID
  const handleLocationSelect = async (locationName: string, selectedOption?: { value: string; label: string; id?: string }) => {
    if (selectedOption?.id) {
      // Update both location name and location_id
      await handleFieldSave('location', locationName);
      await handleFieldSave('location_id', selectedOption.id);
    } else {
      await handleFieldSave('location', locationName);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6 lg:p-8">
        {/* 4-column layout: Avatar, Personal, Work, Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
          {/* Column 1 - Avatar section */}
          <div className="flex justify-center md:justify-start">
            <ProfileAvatar 
              avatarUrl={profile.avatar || profile.avatar_url}
              firstName={profile.firstName || profile.first_name || ''}
              lastName={profile.lastName || profile.last_name || ''}
              profileId={profile.id}
              onAvatarUpdate={(newAvatarUrl) => {
                if (onOptimisticUpdate) {
                  onOptimisticUpdate('avatar_url', newAvatarUrl);
                }
                onProfileUpdate();
              }}
            />
          </div>
          
          {/* Column 2 - Personal info */}
          <div className="space-y-2">
              <div className="text-center sm:text-left space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <EditableField
                    value={profile.firstName || ''}
                    fieldKey="firstName"
                    onSave={(field, value) => handleNameChange('firstName', value)}
                    isEditing={editingField === 'firstName'}
                    onEdit={handleFieldEdit}
                    onCancel={handleFieldCancel}
                    saving={saving}
                    placeholder="First Name"
                    inputClassName="text-sm h-8"
                  />
                  <EditableField
                    value={profile.lastName || ''}
                    fieldKey="lastName"
                    onSave={(field, value) => handleNameChange('lastName', value)}
                    isEditing={editingField === 'lastName'}
                    onEdit={handleFieldEdit}
                    onCancel={handleFieldCancel}
                    saving={saving}
                    placeholder="Last Name"
                    inputClassName="text-sm h-8"
                  />
                </div>
                <EditableField
                  value={profile.full_name || `${profile.firstName} ${profile.lastName}`.trim()}
                  fieldKey="full_name"
                  onSave={(field, value) => handleFullNameChange(value)}
                  isEditing={editingField === 'full_name'}
                  onEdit={handleFieldEdit}
                  onCancel={handleFieldCancel}
                  saving={saving}
                  placeholder="Full Name (Auto-generated, editable)"
                  className="flex-1"
                  inputClassName="text-2xl font-bold h-10"
                />
              </div>
              
              {profile.account?.username && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{profile.account.username}</span>
                </div>
              )}
              
              {profile.account?.employeeId && (
                <div className="flex items-center gap-2 text-sm">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{profile.account.employeeId}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <EditableField
                  value={profile.phone || 'Not provided'}
                  fieldKey="phone"
                  placeholder="Phone number"
                  onSave={handleFieldSave}
                  isEditing={editingField === 'phone'}
                  onEdit={handleFieldEdit}
                  onCancel={handleFieldCancel}
                  saving={saving}
                  inputClassName="h-6 text-sm"
                />
              </div>
            </div>

          {/* Column 3 - Work info */}
          <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Network className="h-4 w-4 text-muted-foreground" />
                {canEditManager && editingField === 'manager' ? (
                  <Select
                    value={managerValue}
                    onValueChange={handleManagerChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredProfiles.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.full_name || user.username || 'Unnamed User'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : canEditManager ? (
                  <EditableField
                    value={managerName}
                    fieldKey="manager"
                    onSave={handleFieldSave}
                    isEditing={editingField === 'manager'}
                    onEdit={handleFieldEdit}
                    onCancel={handleFieldCancel}
                    saving={saving}
                    inputClassName="text-sm h-6"
                  />
                ) : (
                  <span className="text-foreground">{managerName}</span>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <EditableField
                  value={profile.location || 'Not specified'}
                  fieldKey="location"
                  placeholder="Select location"
                  onSave={handleFieldSave}
                  onSelectChange={handleLocationSelect}
                  isEditing={editingField === 'location'}
                  onEdit={handleFieldEdit}
                  onCancel={handleFieldCancel}
                  saving={saving}
                  type="select"
                  asyncOptions={physicalLocations}
                  isLoading={locationsLoading}
                  inputClassName="h-6 text-sm w-48"
                  locationId={profile.locationId}
                />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <Select 
                  value={(profile.language as string) || 'English'} 
                  onValueChange={async (value) => {
                    debugLog('Select onValueChange - value:', value);
                    try {
                      setSavingLanguage(true);
                      await handleFieldSave('language', value);
                    } finally {
                      setSavingLanguage(false);
                    }
                  }}
                  disabled={savingLanguage}
                >
                  <SelectTrigger className="w-48 h-6 text-sm">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages?.map((lang) => {
                      // Save display_name (e.g., 'Chinese', 'English') to match what's stored in profiles
                      const langValue = lang.display_name || lang.code;
                      const langLabel = lang.native_name || lang.display_name || lang.code;
                      debugLog('langValue:', langValue, 'langLabel:', langLabel);
                      return (
                        <SelectItem key={langValue} value={langValue}>
                          <div className="flex items-center gap-2">
                            {lang.flag_emoji && <span>{lang.flag_emoji}</span>}
                            <span>{langLabel}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {(() => {
                  debugLog('EditableProfileHeader render - profile.language:', profile.language);
                  debugLog('EditableProfileHeader render - profile object:', profile);
                  return null;
                })()}
              </div>

              {/* Primary Department and Role */}
              <div className="flex items-center gap-4 w-full">
                <div className="flex items-center gap-2">
                  <Star className="h-3 w-3 fill-current text-yellow-500" />
                </div>
                <div className="flex items-center gap-2">
                  {primaryDepartment && (
                    <Badge variant="default">
                      {primaryDepartment.department_name}
                    </Badge>
                  )}
                  {primaryRole && (
                    <Badge variant="default">
                      {primaryRole.role_name}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

          {/* Column 4 - Status info */}
          <div className="space-y-2">
              <ProfileContactInfo
                startDate={profile.startDate}
                userId={profile.id}
                status={profile.account?.status}
                accessLevel={profile.account?.accessLevel}
                lastLogin={profile.account?.lastLogin}
                passwordLastChanged={profile.account?.passwordLastChanged}
                twoFactorEnabled={profile.account?.twoFactorEnabled}
              />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableProfileHeader;
