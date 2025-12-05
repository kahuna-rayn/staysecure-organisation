# Organisation Module Architecture

## Supabase Client Pattern (CRITICAL - DO NOT CHANGE)

This module follows the **SAME pattern as the auth module** for consistency across all modules.

### Pattern Overview

1. **Consuming app provides the client**: The consuming application (hub/learn) creates the Supabase client and passes it via `OrganisationProvider` config prop
2. **Functions receive client as parameter**: Functions like `handleCreateUser` and `handleDeleteUser` receive `supabaseClient` as the first parameter
3. **Components get client from context**: Components use `useOrganisationContext()` to get `supabaseClient`
4. **URL extracted from client**: The Supabase URL is extracted from `supabaseClient.supabaseUrl` property

### Why This Pattern?

- **Consistency**: Matches auth module pattern exactly
- **Module independence**: Module doesn't depend on environment variables or config files
- **Testability**: Easy to mock the client in tests
- **Flexibility**: Consuming app controls how the client is created (from VITE_CLIENT_CONFIGS, env vars, etc.)

### Implementation Details

#### In User Management Functions

```typescript
// ✅ CORRECT: Receive supabaseClient as parameter
export const handleCreateUser = async (
  supabaseClient: SupabaseClient,  // From context, not stub
  newUser: NewUser,
  updateProfile: ...,
  onSuccess: ...
) => {
  // Extract URL from client
  const baseUrl = (supabaseClient as any).supabaseUrl?.replace(/\/$/, '');
  // Use supabaseClient for all operations
  const { data } = await supabaseClient.auth.getSession();
  // ...
}
```

#### In Components

```typescript
// ✅ CORRECT: Get client from context
const { supabaseClient } = useOrganisationContext();
await handleCreateUser(supabaseClient, newUser, updateProfile, onSuccess);
```

### What NOT to Do

❌ **DO NOT** import `supabase` from `@/integrations/supabase/client` (it's a stub)
```typescript
// ❌ WRONG
import { supabase } from '@/integrations/supabase/client';
await supabase.auth.getSession();
```

❌ **DO NOT** use environment variables directly (consuming app handles this)
```typescript
// ❌ WRONG
const baseUrl = import.meta.env.VITE_SUPABASE_URL;
```

❌ **DO NOT** remove `supabaseClient` parameter from functions
```typescript
// ❌ WRONG - breaks the pattern
export const handleCreateUser = async (
  newUser: NewUser,  // Missing supabaseClient parameter
  ...
) => { ... }
```

### Files to Check When Making Changes

If you're modifying user management functionality, check these files:

1. **`src/utils/userManagementActions.ts`** - Contains the pattern documentation
2. **`src/integrations/supabase/client.ts`** - Stub file, should NOT be used
3. **`src/context/OrganisationContext.tsx`** - Provides client via context
4. **`src/components/admin/UserManagement.tsx`** - Example of correct usage

### History

- **Dec 3, 2024**: Vitest migration accidentally changed from `import.meta.env.VITE_SUPABASE_URL` to `getSupabaseUrl()`, breaking the pattern
- **Dec 5, 2024**: Fixed to follow auth module pattern - functions receive `supabaseClient` from context
- **Dec 5, 2024**: Removed `CLIENT_CONFIGS` stub from organisation module (not needed - consuming app handles config)
- **Dec 5, 2024**: Updated hub to use `VITE_CLIENT_CONFIGS` pattern (same as learn) for consistency
- **Pattern established**: Same as auth module for consistency

### Related Modules

- **auth module**: Uses same pattern - `AuthProvider` receives `supabaseClient` via config
- **notifications module**: Uses different pattern - `configureSupabase()` helper function
