
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfiles } from '@/hooks/useUserProfiles';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Loader2, X, Plus } from 'lucide-react';

interface AssignPhysicalLocationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  prefilledUser?: {
    user_id?: string;
    full_name: string;
    email: string;
    department: string;
    role: string;
  };
  onSuccess?: () => void;
}

const AssignPhysicalLocationDialog: React.FC<AssignPhysicalLocationDialogProps> = ({
  isOpen,
  onOpenChange,
  prefilledUser,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const { profiles } = useUserProfiles();
  
  // Fetch locations for dropdown
  const { data: locations } = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data } = await supabase
        .from('locations')
        .select('id, name')
        .eq('status', 'Active')
        .order('name');
      return data || [];
    },
  });
  
  const [formData, setFormData] = useState({
    full_name: prefilledUser?.full_name || '',
    email: prefilledUser?.email || '',
    department: prefilledUser?.department || '',
    role_account_type: prefilledUser?.role || '',
    location: '',
    access_purpose: '',
    status: 'Active',
  });

  const handleUserSelection = (userId: string) => {
    setSelectedUserId(userId);
    if (userId === 'none') {
      // Clear user data when "Create without user" is selected
      setFormData(prev => ({
        ...prev,
        full_name: '',
        email: '',
        department: '',
        role_account_type: '',
      }));
    } else {
      const selectedUser = profiles.find(profile => profile.id === userId);
      if (selectedUser) {
        setFormData(prev => ({
          ...prev,
          full_name: selectedUser.full_name || '',
          email: selectedUser.email || '',
          department: selectedUser.department || '',
          role_account_type: selectedUser.role || '',
        }));
      }
    }
  };

  const resetForm = () => {
    setSelectedUserId('');
    setFormData({
      full_name: prefilledUser?.full_name || '',
      email: prefilledUser?.email || '',
      department: prefilledUser?.department || '',
      role_account_type: prefilledUser?.role || '',
      location: '',
      access_purpose: '',
      status: 'Active',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Only insert if we have at least a location and access purpose
      if (!formData.location || !formData.access_purpose) {
        throw new Error('Location and Access Purpose are required');
      }

      // Determine the user_id to use
      const userId = prefilledUser?.user_id || selectedUserId;
      
      // If we have a user_id, update the profiles table with location and location_id
      if (userId && userId !== 'none') {
        // Get the location name from the location_id
        const { data: locationData, error: locationError } = await supabase
          .from('locations')
          .select('id, name')
          .eq('id', formData.location)
          .single();

        if (locationError) {
          throw new Error(`Failed to fetch location: ${locationError.message}`);
        }

        if (locationData) {
          // Update the profiles table with location name and location_id
          const { error: profileUpdateError } = await supabase
            .from('profiles')
            .update({ 
              location: locationData.name, 
              location_id: formData.location 
            })
            .eq('id', userId);

          if (profileUpdateError) {
            throw new Error(`Failed to update profile: ${profileUpdateError.message}`);
          }
        }
      }

      const insertData = {
        full_name: formData.full_name || 'Unassigned',
        user_id: userId, // Use userId
        location_id: formData.location, // Assuming this is already a UUID
        access_purpose: formData.access_purpose,
        date_access_created: new Date().toISOString().split('T')[0],
        date_access_revoked: null,
        status: formData.status,
      };

      const { error } = await supabase
        .from('physical_location_access')
        .insert([insertData]);

      if (error) throw error;

      toast({
        title: "Physical location access added",
        description: formData.full_name === 'Unassigned' 
          ? "Location access record created without user assignment."
          : "Physical location access has been successfully added.",
      });
      
      onOpenChange(false);
      resetForm();
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Physical Location Access</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {!prefilledUser && (
              <div className="col-span-2">
                <Label htmlFor="user_select">Assign to User (Optional)</Label>
                <Select value={selectedUserId} onValueChange={handleUserSelection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user or create without assignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Create without user assignment</SelectItem>
                    {profiles.map((profile) => (
                      <SelectItem key={profile.id} value={profile.id}>
                        {profile.full_name || 'No name'} ({profile.email || profile.username || 'No email'})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {(selectedUserId && selectedUserId !== 'none') && (
              <div className="col-span-2 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Selected User Details:</h4>
                <p><strong>Name:</strong> {formData.full_name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
              </div>
            )}

            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Leave empty for unassigned"
                disabled={!!prefilledUser || (selectedUserId && selectedUserId !== 'none')}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Leave empty for unassigned"
                disabled={!!prefilledUser || (selectedUserId && selectedUserId !== 'none')}
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Select 
                value={formData.location} 
                onValueChange={(value) => setFormData({ ...formData, location: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {locations?.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="access_purpose">Access Purpose *</Label>
              <Input
                id="access_purpose"
                value={formData.access_purpose}
                onChange={(e) => setFormData({ ...formData, access_purpose: e.target.value })}
                placeholder="e.g., Maintenance, Security, Operations"
                required
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Revoked">Revoked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} size="icon">
              <X className="h-4 w-4" />
            </Button>
            <Button type="submit" disabled={loading} size="icon">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignPhysicalLocationDialog;
