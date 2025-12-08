// Main exports for the organisation module
export { OrganisationPanel } from './components/OrganisationPanel';
export { OrganisationProvider, useOrganisationContext } from './context/OrganisationContext';

// Core component exports
export { OrganisationWrapper } from './components/OrganisationWrapper';
export { default as PersonaDetailsTabs } from './components/profile/PersonaDetailsTabs';
export { default as EditableProfileHeader } from './components/profile/EditableProfileHeader';
export { default as PersonaProfile, type PersonProfile } from './components/profile/PersonaProfile';
export { default as UserDetailView } from './components/admin/UserDetailView';
export { default as Certificates } from './components/certificates/Certificates';
export { default as PhysicalLocationTab } from './components/profile/PhysicalLocationTab';

// Admin component exports
export { default as UserManagement } from './components/admin/UserManagement';
export { default as UserList } from './components/admin/UserList';
export { default as UserCard } from './components/admin/UserCard';
export { default as UserTable } from './components/admin/UserTable';
export { default as CreateUserDialog } from './components/admin/CreateUserDialog';
export { default as EditUserDialog } from './components/admin/EditUserDialog';
export { default as AddOrganisationCertificateDialog } from './components/certificates/AddOrganisationCertificateDialog';
export { default as AssignHardwareDialog } from './components/admin/AssignHardwareDialog';
export { default as AssignSoftwareDialog } from './components/admin/AssignSoftwareDialog';
export { default as AddCertificatesDialog } from './components/certificates/AddCertificatesDialog';
export { default as AddPhysicalLocationDialog } from './components/admin/AddPhysicalLocationDialog';
export { default as AssignPhysicalLocationDialog } from './components/admin/AssignPhysicalLocationDialog';
export { default as ImportUsersDialog } from './components/admin/ImportUsersDialog';

// Profile component exports
export { default as ProfileAvatar } from './components/profile/ProfileAvatar';
export { default as EditableField } from './components/profile/EditableField';
export { RoleSelector } from './components/profile/RoleSelector';
export { default as MultipleRolesField } from './components/profile/MultipleRolesField';

// Organisational component exports
export { DepartmentRolePairsDisplay } from './components/organisational/DepartmentRolePairsDisplay';
export { DepartmentManagement } from './components/organisational/DepartmentManagement';
export { LocationManagement } from './components/organisational/LocationManagement';
export { RoleManagement } from './components/organisational/RoleManagement';

// Import component exports
export { ImportErrorReport, type ImportError } from './components/import/ImportErrorReport';

// Hook exports (re-exported from main hooks directory)
export { useUserManagement } from '@/hooks/useUserManagement';
export { useUserProfiles } from '@/hooks/useUserProfiles';
export { useUserRole } from '@/hooks/useUserRole';
export { useUserAssets } from '@/hooks/useUserAssets';
export { useUserDepartments } from '@/hooks/useUserDepartments';
export { useUserProfileRoles } from '@/hooks/useUserProfileRoles';
export { useViewPreference } from '@/hooks/useViewPreference';

// Type exports
export type {
  OrganisationConfig,
  ThemeConfig,
  PermissionConfig,
  UserProfile,
  NewUser,
  Role,
  Department,
  Location,
  OrgCertificate,
} from './types';

// Utility exports
export { handleSaveUser, handleCreateUser, handleDeleteUser } from './utils/userManagementActions';