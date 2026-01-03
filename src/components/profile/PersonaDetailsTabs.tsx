
import React, { useState, useRef } from "react";
import { useUserRole } from '@/hooks/useUserRole';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HardwareInventory from "@/components/HardwareInventory";
import SoftwareAccounts from "@/components/SoftwareAccounts";
import EditableCertificates from "../certificates/EditableCertificates";
import PhysicalLocationTab from "./PhysicalLocationTab";
import AssignHardwareDialog from "../admin/AssignHardwareDialog";
import AssignSoftwareDialog from "../admin/AssignSoftwareDialog";
import AddCertificatesDialog from "../certificates/AddCertificatesDialog";
import { Laptop, MonitorSmartphone, GraduationCap, MapPin, Plus, BookOpen, Users, Play } from "lucide-react";
import MyDocuments from "@/components/knowledge/MyDocuments";
import { UserDepartmentsRolesManager, UserDepartmentsRolesManagerRef } from "../organisational/UserDepartmentsRolesManager";
import LearningTracksTab from "@/components/LearningTracksTab";

interface PersonaDetailsTabsProps {
  profile: Record<string, unknown>; // Using Record<string, unknown> for now since we're adapting the data structure
  userId: string;
  onUpdate?: () => void;
}

const PersonaDetailsTabs: React.FC<PersonaDetailsTabsProps> = ({ profile, userId, onUpdate }) => {
  const [isAssignHardwareOpen, setIsAssignHardwareOpen] = useState(false);
  const [isAssignSoftwareOpen, setIsAssignSoftwareOpen] = useState(false);
  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);
  const departmentRolesRef = useRef<UserDepartmentsRolesManagerRef>(null);

  // Detect if we're in Learn app or Govern app
  // - Production: hostname includes 'learn' (e.g., staysecure-learn.raynsecure.com)
  // - Local dev: learn runs on port 80xx, govern runs on port 51xx
  const isLearnMode = typeof window !== 'undefined' && 
    (window.location.hostname.includes('learn') || 
     window.location.port.startsWith('80'));
  const { hasAdminAccess } = useUserRole();

  const handleCertificateUpdate = (_certificateId: string, _updates: Record<string, unknown>) => {
    // This would typically update the certificate in the database
  };

  const handleDataChange = () => {
    // Trigger data refresh
    onUpdate?.();
  };

  // ... existing code ...

  // Get the appropriate grid class based on mode
  const getGridClass = () => {
    if (isLearnMode) {
      return "grid-cols-3"; // Certificates, Departments & Roles, and Physical Location in Learn mode
    }
    
    if (profile?.enrolled_in_learn) {
      return "grid-cols-7"; // All tabs including Learn
    }
    
    return "grid-cols-6"; // Certificates, Departments & Roles, Knowledge, Accounts, Hardware, Location
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Tabs defaultValue="certification" className="w-full">
          <TabsList className={`grid w-full ${getGridClass()} mb-6`}>
            {/* Always visible tabs */}
            <TabsTrigger value="certification" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Certificates</span>
            </TabsTrigger>
            
            <TabsTrigger value="departments" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Departments & Roles</span>
            </TabsTrigger>
            
            {/* Show Location tab in Learn mode */}
            {isLearnMode && (
              <TabsTrigger value="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Physical Location</span>
              </TabsTrigger>
            )}
            
            {/* Only show these tabs when NOT in Learn mode */}
            {!isLearnMode && (
              <>
                <TabsTrigger value="knowledge" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Knowledge</span>
                </TabsTrigger>
                <TabsTrigger value="accounts" className="flex items-center gap-2">
                  <MonitorSmartphone className="h-4 w-4" />
                  <span className="hidden sm:inline">Accounts</span>
                </TabsTrigger>
                <TabsTrigger value="hardware" className="flex items-center gap-2">
                  <Laptop className="h-4 w-4" />
                  <span className="hidden sm:inline">Hardware</span>
                </TabsTrigger>
                <TabsTrigger value="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">Location</span>
                </TabsTrigger>
              </>
            )}
            
            {/* Only show Learn tab when NOT in Learn mode and user is enrolled */}
            {!isLearnMode && profile?.enrolled_in_learn && (
              <TabsTrigger value="learn" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                <span className="hidden sm:inline">StaySecure LEARN</span>
              </TabsTrigger>
            )}
          </TabsList>

          {/* Always visible tab contents */}
          <TabsContent value="certification" className="space-y-4 animate-fade-in">
            <div className="flex justify-end">
              <Button 
                onClick={() => setIsAddEducationOpen(true)}
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <EditableCertificates 
              profile={profile} 
              onUpdate={handleCertificateUpdate}
              onDataChange={handleDataChange}
            />
          </TabsContent>

          <TabsContent value="departments" className="space-y-4 animate-fade-in">
            {hasAdminAccess && (
              <div className="flex justify-end">
                <Button 
                  onClick={() => departmentRolesRef.current?.handleAddNewRow?.()}
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            <UserDepartmentsRolesManager userId={userId} ref={departmentRolesRef} />
          </TabsContent>

          {/* Show Location tab content in Learn mode */}
          {isLearnMode && (
            <TabsContent value="location" className="space-y-4 animate-fade-in">
              <PhysicalLocationTab profile={profile} />
            </TabsContent>
          )}
          
          {/* Only show these tab contents when NOT in Learn mode */}
          {!isLearnMode && (
            <>
              <TabsContent value="knowledge" className="space-y-4 animate-fade-in">
                <MyDocuments userId={typeof profile.id === 'string' ? profile.id : userId} />
              </TabsContent>
              
              <TabsContent value="accounts" className="space-y-4 animate-fade-in">
                <div className="flex justify-end">
                  <Button 
                    onClick={() => setIsAssignSoftwareOpen(true)}
                    size="icon"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <SoftwareAccounts profile={profile} />
              </TabsContent>

              <TabsContent value="hardware" className="space-y-4 animate-fade-in">
                <div className="flex justify-end">
                  <Button 
                    onClick={() => setIsAssignHardwareOpen(true)}
                    size="icon"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <HardwareInventory profile={profile} onUpdate={handleDataChange} />
              </TabsContent>

              <TabsContent value="location" className="space-y-4 animate-fade-in">
                <PhysicalLocationTab profile={profile} />
              </TabsContent>
            </>
          )}

          {/* Only show Learn tab content when NOT in Learn mode and user is enrolled */}
          {!isLearnMode && profile?.enrolled_in_learn && (
            <TabsContent value="learn" className="space-y-4 animate-fade-in">
              <LearningTracksTab userId={typeof profile.id === 'string' ? profile.id : userId} />
            </TabsContent>
          )}
        </Tabs>

        {/* Dialogs - only show when NOT in Learn mode */}
        {!isLearnMode && (
          <>
            <AssignHardwareDialog
              isOpen={isAssignHardwareOpen}
              onOpenChange={setIsAssignHardwareOpen}
              userId={typeof profile.id === 'string' ? profile.id : userId}
              onSuccess={() => {
                setIsAssignHardwareOpen(false);
                handleDataChange();
              }}
            />

            <AssignSoftwareDialog
              isOpen={isAssignSoftwareOpen}
              onOpenChange={setIsAssignSoftwareOpen}
              userId={typeof profile.id === 'string' ? profile.id : userId}
              onSuccess={() => {
                setIsAssignSoftwareOpen(false);
                handleDataChange();
              }}
            />
          </>
        )}

        <AddCertificatesDialog
          isOpen={isAddEducationOpen}
          onOpenChange={setIsAddEducationOpen}
          userId={typeof profile.id === 'string' ? profile.id : userId}
          onSuccess={() => {
            setIsAddEducationOpen(false);
            handleDataChange();
          }}
        />
      </CardContent>
    </Card>
  );
};

export default PersonaDetailsTabs;