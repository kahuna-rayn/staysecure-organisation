import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, Building2, MapPin, Settings, Award, User } from 'lucide-react';
import { useOrganisationContext } from '../context/OrganisationContext';
import UserManagement from './admin/UserManagement';
import { RoleManagement } from './organisational/RoleManagement';
import { DepartmentManagement } from './organisational/DepartmentManagement';
import { LocationManagement } from './organisational/LocationManagement';
import OrganisationCertificates from './certificates/OrganisationCertificates';
import OrganisationProfile from './OrganisationProfile';

interface OrganisationPanelProps {
  title?: string;
  description?: string;
  showAdminBadge?: boolean;
  className?: string;
}

export const OrganisationPanel: React.FC<OrganisationPanelProps> = ({ 
  title = "Organisation",
  description = "Manage users, roles, departments, and locations",
  showAdminBadge = true,
  className = ""
}) => {
  const { isTabEnabled, onNavigate } = useOrganisationContext();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get default tab (first enabled tab)
  const getDefaultTab = () => {
    const defaultTabs = ['users', 'roles', 'departments', 'locations', 'certificates', 'profile'];
    return defaultTabs.find(tab => isTabEnabled(tab)) || 'users';
  };
  
  // Initialize activeTab from URL or default
  const [activeTab, setActiveTab] = useState(() => {
    // Try to get tab from URL first
    const urlTab = searchParams.get('orgTab');
    if (urlTab && isTabEnabled(urlTab)) {
      return urlTab;
    }
    return getDefaultTab();
  });

  // Sync with URL if it changes externally (e.g., browser back/forward)
  useEffect(() => {
    const urlTab = searchParams.get('orgTab');
    const defaultTabs = ['users', 'roles', 'departments', 'locations', 'certificates', 'profile'];
    const defaultTab = defaultTabs.find(tab => isTabEnabled(tab)) || 'users';
    
    if (urlTab && isTabEnabled(urlTab) && urlTab !== activeTab) {
      setActiveTab(urlTab);
    } else if (!urlTab && activeTab !== defaultTab) {
      // If URL has no tab but we have a non-default tab, update URL
      setSearchParams({ orgTab: activeTab }, { replace: true });
    }
  }, [searchParams, activeTab, isTabEnabled, setSearchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL to persist tab state
    setSearchParams({ orgTab: value }, { replace: true });
    onNavigate?.(value);
  };

  const tabConfig = [
    { id: 'users', label: 'User Management', icon: Users, component: UserManagement },
    { id: 'roles', label: 'Roles', icon: UserCheck, component: RoleManagement },
    { id: 'departments', label: 'Departments', icon: Building2, component: DepartmentManagement },
    { id: 'locations', label: 'Locations', icon: MapPin, component: LocationManagement },
    { id: 'certificates', label: 'Certificates', icon: Award, component: OrganisationCertificates },
    { id: 'profile', label: 'Profile', icon: User, component: OrganisationProfile },
  ];

  const enabledTabs = tabConfig.filter(tab => isTabEnabled(tab.id));

  return (
    <div className={`w-full px-4 space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {showAdminBadge && (
          <Badge variant="secondary" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Administrator
          </Badge>
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${enabledTabs.length}, 1fr)` }}>
              {enabledTabs.map(({ id, label, icon: Icon }) => (
                <TabsTrigger key={id} value={id} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {enabledTabs.map(({ id, component: Component }) => (
              <TabsContent key={id} value={id} className="space-y-4">
                <Component />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};