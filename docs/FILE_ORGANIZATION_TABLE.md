# Organisation Module File Organization Table

| File Name | Purpose | Directory (Should Be In) |
|-----------|---------|--------------------------|
| **ADMIN COMPONENTS** |
| `AddPhysicalLocationDialog.tsx` | Dialog to add physical locations | `admin/` |
| `AssignHardwareDialog.tsx` | Dialog to assign hardware to users | `admin/` |
| `AssignPhysicalLocationDialog.tsx` | Dialog to assign physical locations to users | `admin/` |
| `AssignSoftwareDialog.tsx` | Dialog to assign software to users | `admin/` |
| `CreateUserDialog.tsx` | Dialog to create new users | `admin/` |
| `EditUserDialog.tsx` | Dialog to edit existing users | `admin/` |
| `ImportUsersDialog.tsx` | Dialog to import users from CSV/Excel | `admin/` |
| `UserCard.tsx` | Card component displaying user info | `admin/` |
| `UserDetailView.tsx` | Detailed view of a single user (admin version) | `admin/` |
| `UserList.tsx` | List view of users | `admin/` |
| `UserManagement.tsx` | Main user management panel/container | `admin/` |
| `UserTable.tsx` | Table view of users | `admin/` |
| `UserReport.tsx` | User reporting/analytics component | `admin/` |
| **ORGANISATIONAL COMPONENTS** |
| `DepartmentManagement.tsx` | Manage departments (CRUD operations) | `organisational/` |
| `LocationManagement.tsx` | Manage locations (CRUD operations) | `organisational/` |
| `RoleManagement.tsx` | Manage roles (CRUD operations) | `organisational/` |
| `DepartmentRolePairsDisplay.tsx` | Display department-role pairs as badges | `organisational/` |
| `UserDepartmentsManager.tsx` | Manage user-department assignments | `organisational/` |
| `UserDepartmentsRolesManager.tsx` | Manage user-department-role assignments | `organisational/` |
| `UserDepartmentsRolesTable.tsx` | Table for user-department-role assignments | `organisational/` |
| `RoleDebugPanel.tsx` | Debug panel for role assignments | `organisational/` |
| **PROFILE COMPONENTS** |
| `PersonaProfile.tsx` | Main user profile view component | `profile/` |
| `PersonaDetailsTabs.tsx` | Tabbed interface for profile details | `profile/` |
| `EditableProfileHeader.tsx` | Editable header section of profile | `profile/` |
| `ProfileHeader.tsx` | Profile header component | `profile/` |
| `ProfileEditor.tsx` | Profile editing interface | `profile/` |
| `ProfileAvatar.tsx` | User avatar component | `profile/` |
| `ProfileBasicInfo.tsx` | Basic info section of profile | `profile/` |
| `ProfileContactInfo.tsx` | Contact info section of profile | `profile/` |
| `EditableField.tsx` | Reusable editable field component | `profile/` |
| `MultipleRolesField.tsx` | Field for managing multiple roles | `profile/` |
| `UserRoleField.tsx` | Field for user role selection | `profile/` |
| `SearchableProfileField.tsx` | Searchable field for profile data | `profile/` |
| `PhysicalLocationTab.tsx` | Tab showing physical location access | `profile/` |
| `UserDetailView.tsx` | Detailed user view (non-admin, if different) | `profile/` |
| **CERTIFICATE COMPONENTS** |
| `AddCertificateDialog.tsx` | Dialog to add certificates/documents to user profile (rename from AddEducationDialog) | `certificates/` |
| `AddOrganisationCertificateDialog.tsx` | Dialog to add organisation certificates | `certificates/` |
| `Certificates.tsx` | Certificate display component | `certificates/` |
| `EditableCertificates.tsx` | Editable certificate management | `certificates/` |
| `OrganisationCertificates.tsx` | Organisation-level certificate management | `certificates/` |
| `CertificateManagement.tsx` | Certificate CRUD management | `certificates/` |
| **CORE/ROOT COMPONENTS** |
| `OrganisationPanel.tsx` | Main organisation panel container | root `components/` |
| `OrganisationProfile.tsx` | Organisation-level profile view | root `components/` |
| `OrganisationWrapper.tsx` | Wrapper component for organisation context | root `components/` |

## Notes:
- **admin/**: All user management, user CRUD, and assignment dialogs
- **organisational/**: All organisational structure management (departments, roles, locations, assignments)
- **profile/**: All user-facing profile components and editable fields
- **certificates/**: All certificate and document management components
- **root components/**: Core organisation-level components and containers

## Current Issues:
- `EditableField.tsx` exists in both root and `profile/` - need to consolidate
- `UserDetailView.tsx` exists in both root and `admin/` - need to determine which is correct
- Old `organisational/` directory should be removed - files moved to new `organisational/` (replacing `knowledge/`)
- `AddEducationDialog.tsx` should be renamed to `AddCertificateDialog.tsx` and moved to `certificates/`

