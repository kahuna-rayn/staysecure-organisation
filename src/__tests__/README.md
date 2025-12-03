# Testing Guide

This directory contains comprehensive tests for the organisation module using **Vitest**.

## Overview

The test suite covers:
- ✅ **42+ tests passing**
- ✅ **7 test suites** covering utilities, context, components, and data management
- ✅ **Native `import.meta.env` support** (Vitest handles Vite syntax natively)
- ✅ **Full TypeScript support**

## Quick Start

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (recommended during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests with UI (interactive)
npm run test:ui
```

### Pre-commit Hook

Tests are automatically run before each commit via husky and lint-staged. Only tests related to changed files will run to keep commits fast.

## Test Structure

```
src/__tests__/
├── README.md                          # This file
├── setup.ts                           # Global test setup and mocks
├── helpers/
│   └── testUtils.tsx                  # Test utilities and helpers
├── config/
│   └── clients.test.ts               # Client configuration tests
├── context/
│   └── OrganisationContext.test.tsx  # Context provider and hooks tests
├── utils/
│   ├── managerValidation.test.ts     # Manager validation logic tests
│   └── userManagementActions.test.ts # User CRUD operations tests
├── components/
│   ├── OrganisationWrapper.test.tsx  # Wrapper component tests
│   └── organisational/
│       └── DepartmentManagement.test.tsx # Department management tests
└── hibDataUtils.test.ts              # HIB checklist data utilities tests
```

## Test Files Documentation

### 1. `context/OrganisationContext.test.tsx`

**Purpose:** Tests the React context that manages organisation configuration and permissions.

**What it tests:**
- ✅ Context provider setup and value passing
- ✅ `isTabEnabled()` function:
  - Returns true/false based on enabled tabs configuration
  - Uses default tabs when not specified
  - Handles empty arrays correctly
- ✅ `hasPermission()` function:
  - Checks all 8 permission types (create/edit/delete users, manage roles/departments/locations/certificates/profile)
  - Merges custom permissions with defaults
  - Returns false for denied permissions
- ✅ Error handling when hook is used outside provider
- ✅ Config properties are passed through correctly (theme, callbacks, etc.)

**Test Count:** ~15 tests

---

### 2. `utils/managerValidation.test.ts`

**Purpose:** Tests manager lookup logic used during user imports.

**What it tests:**
- ✅ Finding managers by:
  - Email (case-insensitive matching)
  - Full name (case-insensitive matching)
  - Username (case-insensitive matching)
  - Handles whitespace trimming
- ✅ Not found cases:
  - Returns invalid for non-existent identifiers
- ✅ Edge cases:
  - Empty/whitespace-only identifiers
  - Undefined/empty profile arrays
  - Profiles with missing fields
  - Null/undefined field handling

**Test Count:** ~12 tests

---

### 3. `utils/userManagementActions.test.ts`

**Purpose:** Tests user management utility functions (create, update, delete users).

**What it tests:**

#### `handleSaveUser`
- ✅ Successfully updates user profile
- ✅ Shows success toast notification
- ✅ Calls onSuccess callback
- ✅ Handles errors gracefully
- ✅ Shows error toast on failure

#### `handleCreateUser`
- ✅ Creates users via Edge Function
- ✅ Handles session/authentication
- ✅ Handles missing Supabase URL configuration
- ✅ Handles Edge Function error responses
- ✅ Assigns physical location access when provided
- ✅ Handles fetch failures
- ✅ Handles missing user data in response

#### `handleDeleteUser`
- ✅ Deletes users via Edge Function
- ✅ Handles function invocation errors
- ✅ Handles function returning success: false
- ✅ Handles exceptions during deletion
- ✅ Supports optional deletion reason

**Test Count:** ~15 tests

**Note:** This test file uses `import.meta.env` which works natively with Vitest (no workarounds needed).

---

### 4. `hibDataUtils.test.ts`

**Purpose:** Tests HIB (Health Information Bill) checklist data utilities.

**What it tests:**

#### `getInitialClauses`
- ✅ Returns initial checklist data
- ✅ Data has correct structure and types
- ✅ Implementation status values are valid

#### `loadHIBData`
- ✅ Loads data from Supabase
- ✅ Maps database fields to HIBClause format correctly
- ✅ Returns empty array when no data exists
- ✅ Throws error when Supabase query fails

#### `saveHIBData`
- ✅ Saves data to Supabase
- ✅ Deletes old entries before inserting new ones
- ✅ Handles insert errors

#### `updateHIBClause`
- ✅ Updates individual clauses successfully
- ✅ Handles update errors

#### `createHIBClause`
- ✅ Creates new clauses successfully
- ✅ Formats response correctly
- ✅ Handles creation errors

#### `deleteHIBClause`
- ✅ Deletes clauses successfully
- ✅ Handles deletion errors

**Test Count:** ~12 tests

---

### 5. `config/clients.test.ts`

**Purpose:** Tests client configuration structure.

**What it tests:**
- ✅ Default configuration exists
- ✅ Configuration is accessible
- ✅ Type safety for string keys

**Test Count:** 3 tests

---

### 6. `components/OrganisationWrapper.test.tsx`

**Purpose:** Tests the top-level wrapper component.

**What it tests:**
- ✅ Renders OrganisationPanel with correct props
- ✅ Provides OrganisationProvider with correct config
- ✅ Context values are accessible

**Test Count:** 2 tests

---

### 7. `components/organisational/DepartmentManagement.test.tsx`

**Purpose:** Tests the Department Management component.

**What it tests:**
- ✅ Renders loading state
- ✅ Renders departments list when data loads
- ✅ Respects permissions (shows/hides create button)
- ✅ Basic component structure

**Test Count:** 4 tests

**Note:** This test requires UI component mocks (external dependencies).

---

## Test Utilities

### `helpers/testUtils.tsx`

Provides helper functions for testing:

- `createTestSupabaseClient()` - Creates a test Supabase client
- `createTestQueryClient()` - Creates a test React Query client
- `createTestConfig()` - Creates default test configuration
- `renderWithProviders()` - Renders components with all necessary providers

**Usage:**
```tsx
import { renderWithProviders } from '../helpers/testUtils';

test('my component', () => {
  renderWithProviders(<MyComponent />, {
    config: { /* custom config */ },
    queryClient: myQueryClient,
  });
});
```

---

## Test Setup (`setup.ts`)

The setup file configures:
- ✅ `@testing-library/jest-dom` matchers
- ✅ `window.matchMedia` mock
- ✅ `ResizeObserver` mock
- ✅ Vitest globals (`vi`)

---

## Writing New Tests

### Basic Test Structure

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Mocking Modules

```typescript
import { vi } from 'vitest';

// Mock a module
vi.mock('@/utils/myUtil', () => ({
  myFunction: vi.fn(() => 'mocked value'),
}));
```

### Testing Async Functions

```typescript
it('should handle async operations', async () => {
  const result = await myAsyncFunction();
  expect(result).toBeDefined();
});
```

### Testing with Context

```typescript
import { renderWithProviders } from '../helpers/testUtils';

it('should use context', () => {
  renderWithProviders(<MyComponent />, {
    config: {
      supabaseClient: mockClient,
      permissions: { canCreateUsers: true },
    },
  });
});
```

---

## Coverage

Run coverage reports:

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory with:
- Text summary in terminal
- HTML report (open `coverage/index.html`)
- JSON report for CI/CD

**Current Coverage:**
- Focuses on core business logic
- Utilities and context: High coverage
- Components: Basic rendering tests (integration tests may require external dependencies)

---

## Common Issues & Solutions

### Issue: `import.meta.env` not working

**Solution:** This is handled natively by Vitest. No workarounds needed! If you see errors, ensure you're using Vitest (not Jest).

### Issue: UI components not found

**Solution:** These are external dependencies. Either:
1. Mock them in your test file (see `DepartmentManagement.test.tsx` for examples)
2. Skip component tests that require external UI libraries
3. Add stub files for testing

### Issue: Tests timing out

**Solution:** Increase timeout in test:
```typescript
it('slow test', async () => {
  // test code
}, { timeout: 10000 }); // 10 seconds
```

Or in `vitest.config.ts`:
```typescript
test: {
  testTimeout: 10000,
}
```

---

## Best Practices

1. ✅ **Test behavior, not implementation** - Test what the code does, not how it does it
2. ✅ **Use descriptive test names** - Test names should explain what is being tested
3. ✅ **Group related tests** - Use `describe` blocks to organize tests
4. ✅ **Test edge cases** - Don't just test the happy path
5. ✅ **Mock external dependencies** - Isolate the code under test
6. ✅ **Clean up after tests** - Use `beforeEach`/`afterEach` to reset state
7. ✅ **Keep tests fast** - Unit tests should run quickly
8. ✅ **Test one thing at a time** - Each test should verify one behavior

---

## CI/CD Integration

Tests run automatically:
- ✅ **Pre-commit** (via husky + lint-staged)
- ✅ **CI/CD pipelines** (use `npm test`)

Example GitHub Actions:

```yaml
- name: Run tests
  run: npm test

- name: Generate coverage
  run: npm run test:coverage
```

---

## Migration from Jest

This project was migrated from Jest to Vitest. Key differences:

| Jest | Vitest |
|------|--------|
| `jest.fn()` | `vi.fn()` |
| `jest.mock()` | `vi.mock()` |
| `jest.clearAllMocks()` | `vi.clearAllMocks()` |
| `jest.spyOn()` | `vi.spyOn()` |
| No `import.meta` support | Native `import.meta` support ✅ |

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## Test Statistics

- **Total Test Files:** 7
- **Total Tests:** 42+
- **Passing Tests:** 42+
- **Test Framework:** Vitest
- **Test Environment:** jsdom
- **Coverage Tool:** v8

---

Last updated: 2024
