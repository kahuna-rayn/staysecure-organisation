// Main exports for the organisation module
export { OrganisationPanel } from './components/OrganisationPanel';
export { OrganisationProvider, useOrganisationContext } from './context/OrganisationContext';

// Core component exports
export { OrganisationWrapper } from './components/OrganisationWrapper';
export { default as OrganisationProfile } from './components/OrganisationProfile';
export { default as OrganisationCertificates } from './components/OrganisationCertificates';
export { default as PersonaDetailsTabs } from './components/PersonaDetailsTabs';
export { default as EditableProfileHeader } from './components/EditableProfileHeader';
export { default as PersonaProfile } from './components/PersonaProfile';
export { default as UserDetailView } from './components/UserDetailView';
export { default as SearchableProfileField } from './components/SearchableProfileField';

// Admin component exports
export { default as UserManagement } from './components/admin/UserManagement';
export { default as UserList } from './components/admin/UserList';
export { default as UserCard } from './components/admin/UserCard';
export { default as UserTable } from './components/admin/UserTable';
export { default as CreateUserDialog } from './components/admin/CreateUserDialog';
export { default as EditUserDialog } from './components/admin/EditUserDialog';
export { default as AddOrganisationCertificateDialog } from './components/admin/AddOrganisationCertificateDialog';
export { default as ImportUsersDialog } from './components/admin/ImportUsersDialog';

// Organisational structure exports (Roles, Departments, Locations, Profile)
export { RoleManagement } from './components/organisational/RoleManagement';
export { DepartmentManagement } from './components/organisational/DepartmentManagement';
export { LocationManagement } from './components/organisational/LocationManagement';

// Profile component exports
export { default as ProfileBasicInfo } from './components/organisational/ProfileBasicInfo';
export { default as ProfileAvatar } from './components/organisational/ProfileAvatar';
export { default as ProfileContactInfo } from './components/organisational/ProfileContactInfo';
export { default as EditableField } from './components/organisational/EditableField';
export { default as MultipleRolesField } from './components/organisational/MultipleRolesField';
export { UserRoleField } from './components/organisational/UserRoleField';

// Certificate management exports
export { default as CertificateManagement } from './components/CertificateManagement';
export { default as Certificates } from './components/Certificates';
export { default as EditableCertificates } from './components/EditableCertificates';

// Assignment dialog exports (organisation-specific only)
export { default as AssignPhysicalLocationDialog } from './components/admin/AssignPhysicalLocationDialog';
export { default as AddPhysicalLocationDialog } from './components/admin/AddPhysicalLocationDialog';
export { default as AddEducationDialog } from './components/admin/AddEducationDialog';

// User management exports
export { UserDepartmentsManager } from './components/UserDepartmentsManager';
export { UserDepartmentsRolesManager } from './components/UserDepartmentsRolesManager';
export { UserDepartmentsRolesTable } from './components/UserDepartmentsRolesTable';
export { DepartmentRolePairsDisplay } from './components/DepartmentRolePairsDisplay';
export { UserReport } from './components/UserReport';

// Profile editing exports
export { default as ProfileEditor } from './components/ProfileEditor';
export { default as ProfileHeader } from './components/ProfileHeader';
// DetailsTabs removed - was GOVERN-specific
export { default as PhysicalLocationTab } from './components/PhysicalLocationTab';
export { RoleDebugPanel } from './components/RoleDebugPanel';

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
