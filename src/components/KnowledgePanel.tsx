import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Users, CheckCircle } from 'lucide-react';
import { OrganisationProvider } from '../context/OrganisationContext';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useUserRole';
import DocumentManagement from './knowledge/DocumentManagement';
import DocumentAssignments from './knowledge/DocumentAssignments';
import ComplianceTracking from './knowledge/ComplianceTracking';

const KnowledgePanelInner: React.FC = () => {
  const [activeTab, setActiveTab] = useState('documents');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Management</h1>
        <p className="text-muted-foreground">
          Manage organizational documents, policies, and compliance tracking
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Document Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <DocumentManagement onNavigateToAssignments={() => setActiveTab('assignments')} />
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <DocumentAssignments />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <ComplianceTracking />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface KnowledgePanelProps {
  basePath?: string;
}

const KnowledgePanel: React.FC<KnowledgePanelProps> = ({ basePath }) => {
  const { hasAdminAccess } = useUserRole();

  const config = {
    supabaseClient: supabase,
    basePath,
    permissions: {
      canCreateUsers: hasAdminAccess,
      canEditUsers: hasAdminAccess,
      canDeleteUsers: hasAdminAccess,
      canManageRoles: hasAdminAccess,
      canManageDepartments: hasAdminAccess,
      canManageLocations: hasAdminAccess,
      canManageCertificates: hasAdminAccess,
      canManageProfile: hasAdminAccess,
    },
  };

  return (
    <OrganisationProvider config={config}>
      <KnowledgePanelInner />
    </OrganisationProvider>
  );
};

export default KnowledgePanel;
