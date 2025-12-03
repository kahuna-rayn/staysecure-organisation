
import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProfileAvatarProps {
  avatarUrl?: string;
  firstName: string;
  lastName: string;
  profileId?: string;
  onAvatarUpdate?: (avatarUrl: string) => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ 
  avatarUrl, 
  firstName, 
  lastName,
  profileId,
  onAvatarUpdate
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const initials = firstName && lastName
    ? (firstName.charAt(0) + lastName.charAt(0))
    : firstName?.slice(0, 2) || 'U';

  const handleAvatarClick = () => {
    console.log('ProfileAvatar: Upload button clicked');
    console.log('ProfileAvatar: fileInputRef.current:', fileInputRef.current);
    console.log('ProfileAvatar: profileId:', profileId);
    console.log('ProfileAvatar: supabase:', supabase);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('ProfileAvatar: File selected:', event.target.files);
    const file = event.target.files?.[0];
    if (!file) {
      console.log('ProfileAvatar: No file selected');
      return;
    }
    console.log('ProfileAvatar: Processing file:', file.name, file.type, file.size);

    // Check file type - only images
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPEG, PNG, GIF, or WebP)",
        variant: "destructive"
      });
      return;
    }

    // Check file size (5MB limit for avatars)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `avatars/${profileId || 'user'}-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      // Delete old avatar if it exists (optional cleanup)
      if (avatarUrl && avatarUrl.includes('/storage/v1/object/public/avatars/')) {
        try {
          // Extract the file path from the Supabase public URL
          // URL format: https://[project].supabase.co/storage/v1/object/public/avatars/path/to/file
          const urlParts = avatarUrl.split('/storage/v1/object/public/avatars/');
          if (urlParts.length > 1) {
            const oldFilePath = urlParts[1];
            await supabase.storage
              .from('avatars')
              .remove([oldFilePath]);
          }
        } catch (error) {
          // Ignore errors when deleting old avatar - not critical
          console.warn('Could not delete old avatar:', error);
        }
      }

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Storage upload error:', error);
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      if (profileId) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ avatar_url: urlData.publicUrl })
          .eq('id', profileId);

        if (updateError) {
          console.error('Profile update error:', updateError);
          throw updateError;
        }
      }

      // Call the callback if provided
      if (onAvatarUpdate) {
        onAvatarUpdate(urlData.publicUrl);
      }

      toast({
        title: "Avatar uploaded",
        description: "Your avatar has been updated successfully"
      });
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      const errorMessage = error?.message || 'Failed to upload avatar. Please try again.';
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="relative">
      <Avatar className="h-24 w-24 border-2 border-primary">
        <AvatarImage src={avatarUrl} alt={`${firstName} ${lastName}`} key={avatarUrl} />
        <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
      </Avatar>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        size="sm"
        variant="outline"
        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
        onClick={handleAvatarClick}
        disabled={uploading || !profileId}
      >
        {uploading ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Upload className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
};

export default ProfileAvatar;
