# Permissions Architecture

## Overview

The `staysecure-organisation` module uses a **dependency injection pattern** for permissions. Consuming applications (like `learn` and `govern`) **must** provide permission configuration via the `OrganisationProvider` component.

⚠️ **CRITICAL**: The organisation module contains a **stub** `useUserRole` hook that always returns `hasAdminAccess: false`. This means components that rely on permissions **will not work correctly** unless the consuming app provides permissions via `OrganisationProvider`.

## Why This Pattern?

1. **Module Independence**: The organisation module doesn't know how each consuming app determines user roles/permissions
2. **Flexibility**: Different apps may have different permission models (e.g., `learn` vs `govern`)
3. **Consistency**: Matches the same pattern used for `supabaseClient` injection
4. **Testability**: Easy to mock permissions in tests

## Architecture

### Current State

The organisation module has **two permission mechanisms**:

1. **`hasPermission()` from context** ✅ **Works correctly**
   - Used by: `EditableProfileHeader`, `DepartmentManagement`, `RoleManagement`, `LocationManagement`
   - Gets permissions from `OrganisationProvider` config
   - This is the **preferred** method

2. **`useUserRole()` hook** ⚠️ **Stub implementation**
   - Used by: `PersonaProfile`, `PersonaDetailsTabs`, `UserRoleField`, `UserManagement`
   - Returns `hasAdminAccess: false` (stub)
   - Components using this **will not work** unless permissions are provided via context

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│ Consuming App (learn/govern)                                │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ useUserRole() hook (app-specific implementation)     │  │
│  │ Returns: hasAdminAccess, isSuperAdmin, etc.          │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│                          ▼                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ PersonaProfileWrapper                                │  │
│  │ - Gets hasAdminAccess from useUserRole()            │  │
│  │ - Maps to OrganisationConfig.permissions            │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│                          ▼                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ OrganisationProvider                                  │  │
│  │ config.permissions = {                                │  │
│  │   canEditUsers: hasAdminAccess,                      │  │
│  │   canManageRoles: hasAdminAccess,                    │  │
│  │   ...                                                 │  │
│  │ }                                                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ Organisation Module                                           │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ OrganisationContext                                   │  │
│  │ - hasPermission('canEditUsers') → true/false        │  │
│  │ - Components use this for permission checks         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ⚠️ Stub useUserRole() hook:                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ export const useUserRole = () => ({                   │  │
│  │   hasAdminAccess: false  // Always false!            │  │
│  │ });                                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Required Setup

### Step 1: Create a Wrapper Component

**Every consuming app must create a wrapper component** that:
1. Gets permissions from the app's own `useUserRole` hook
2. Maps those permissions to `OrganisationConfig.permissions`
3. Wraps `PersonaProfile` (or other components) with `OrganisationProvider`

### Step 2: Example Implementation

Both `learn` and `govern` use this pattern:

```tsx
// PersonaProfileWrapper.tsx
import React from 'react';
import { OrganisationProvider, PersonaProfile } from 'staysecure-organisation';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useUserRole'; // App-specific hook

export const PersonaProfileWrapper: React.FC = () => {
  const { hasAdminAccess, loading: roleLoading } = useUserRole();

  if (roleLoading) {
    return <LoadingSpinner />;
  }

  const organisationConfig = {
    supabaseClient: supabase,
    enabledTabs: ['users', 'roles', 'departments', 'locations', 'certificates', 'profile'],
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
    <OrganisationProvider config={organisationConfig}>
      <PersonaProfile />
    </OrganisationProvider>
  );
};
```

### Step 3: Use the Wrapper in Your App

```tsx
// App.tsx or wherever you render PersonaProfile
import { PersonaProfileWrapper } from '@/components/PersonaProfileWrapper';

function App() {
  return (
    <div>
      <PersonaProfileWrapper /> {/* Use wrapper, not PersonaProfile directly */}
    </div>
  );
}
```

## Permission Mapping

The consuming app's `hasAdminAccess` (or equivalent) should map to all permission flags:

| App Permission | Organisation Permissions |
|----------------|-------------------------|
| `hasAdminAccess: true` | All `can*` flags = `true` |
| `hasAdminAccess: false` | All `can*` flags = `false` |

### Available Permissions

```typescript
interface PermissionConfig {
  canCreateUsers?: boolean;        // Create new users
  canEditUsers?: boolean;           // Edit user profiles (including manager/location)
  canDeleteUsers?: boolean;        // Delete users
  canManageRoles?: boolean;        // Manage roles
  canManageDepartments?: boolean;   // Manage departments
  canManageLocations?: boolean;    // Manage physical locations
  canManageCertificates?: boolean; // Manage certificates
  canManageProfile?: boolean;      // Manage organisation profile
}
```

## What Each Permission Controls

### `canEditUsers`
- **Controls**: Ability to edit manager and location fields in `EditableProfileHeader`
- **Used by**: `EditableProfileHeader`, `UserManagement`
- **Default**: `true` (if not provided)

### `canManageRoles`
- **Controls**: Add/edit/delete buttons in `RoleManagement`
- **Used by**: `RoleManagement`
- **Default**: `true` (if not provided)

### `canManageDepartments`
- **Controls**: Add/edit/delete buttons in `DepartmentManagement`
- **Used by**: `DepartmentManagement`
- **Default**: `true` (if not provided)

### `canManageLocations`
- **Controls**: Add/edit/delete buttons in `LocationManagement` and `PhysicalLocationTab`
- **Used by**: `LocationManagement`, `PhysicalLocationTab`
- **Default**: `true` (if not provided)

### Other Permissions
- `canCreateUsers`: Create user dialogs
- `canDeleteUsers`: Delete user buttons
- `canManageCertificates`: Certificate management features
- `canManageProfile`: Organisation profile editing

## Common Issues & Troubleshooting

### Issue 1: Users can edit manager/location when they shouldn't

**Symptom**: Regular users can change their manager or location in the profile header.

**Cause**: `OrganisationProvider` is not wrapping `PersonaProfile`, or permissions are not set correctly.

**Solution**:
1. Ensure `PersonaProfile` is wrapped with `OrganisationProvider`
2. Verify `canEditUsers: false` for non-admin users
3. Check that your wrapper component is being used (not `PersonaProfile` directly)

### Issue 2: Add buttons don't appear for admins

**Symptom**: Admin users don't see "Add" buttons in Accounts, Hardware, Departments tabs.

**Cause**: `hasAdminAccess` is not being passed correctly to `OrganisationProvider`.

**Solution**:
1. Verify `useUserRole()` returns correct `hasAdminAccess` value
2. Check that all permission flags are set to `hasAdminAccess` in the config
3. Ensure `PersonaProfileWrapper` is being used

### Issue 3: Components using `useUserRole()` don't work

**Symptom**: Components like `PersonaDetailsTabs` don't show admin features even for admins.

**Cause**: These components use the stub `useUserRole()` hook from the organisation module, which always returns `false`.

**Solution**: This is expected behavior. These components should be refactored to use `hasPermission()` from context instead. For now, ensure permissions are passed via `OrganisationProvider` and components that use `hasPermission()` will work correctly.

## Best Practices

1. **Always use a wrapper component**: Never use `PersonaProfile` directly. Always wrap it with `OrganisationProvider`.

2. **Handle loading states**: Check `roleLoading` from `useUserRole()` before rendering `OrganisationProvider`.

3. **Map all permissions**: Even if you don't use all features, set all permission flags for consistency.

4. **Use `hasPermission()` in new code**: When adding new components, use `hasPermission()` from `useOrganisationContext()` instead of `useUserRole()`.

5. **Test both permission states**: Test your app with both admin and non-admin users to ensure permissions work correctly.

## Future Improvements

The current architecture has some inconsistencies:
- Some components use `useUserRole()` (stub) while others use `hasPermission()` (context)
- This requires consuming apps to provide permissions via wrapper components

**Proposed refactor** (not implemented):
- Accept `useUserRole` hook as dependency injection (similar to `supabaseClient`)
- Remove stub hook
- Make all components use injected hook from context
- This would eliminate the need for wrapper components

**Estimated testing effort for refactor**: 2-3 hours of manual testing across both apps and all permission scenarios.

## Examples

### Learn App
- **File**: `learn/src/components/dashboard/PersonaProfileWrapper.tsx`
- **Pattern**: Uses `useUserRole()` from `@/hooks/useUserRole`
- **Usage**: Wraps `PersonaProfile` in profile view

### Govern App
- **File**: `govern/src/components/PersonaProfileWrapper.tsx`
- **Pattern**: Uses `useUserRole()` from `@/hooks/useUserRole`
- **Usage**: Wraps `PersonaProfile` for both admin and non-admin users

Both apps follow the **exact same pattern**, ensuring consistency across consuming applications.
