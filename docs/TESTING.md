# Testing Documentation

## Quick Reference

### Run Tests
```bash
npm test              # Run once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
npm run test:ui       # Interactive UI
```

### Test Statistics
- **Framework:** Vitest
- **Test Files:** 7
- **Passing Tests:** 42+
- **Coverage:** Core utilities and context

## Test Files Overview

| File | Purpose | Tests |
|------|---------|-------|
| `context/OrganisationContext.test.tsx` | Context provider & permissions | ~15 |
| `utils/managerValidation.test.ts` | Manager lookup logic | ~12 |
| `utils/userManagementActions.test.ts` | User CRUD operations | ~15 |
| `hibDataUtils.test.ts` | HIB checklist utilities | ~12 |
| `config/clients.test.ts` | Client configuration | 3 |
| `components/OrganisationWrapper.test.tsx` | Wrapper component | 2 |
| `components/organisational/DepartmentManagement.test.tsx` | Department component | 4 |

## What's Tested

### ✅ Core Functionality
- Context management and permissions
- User management operations
- Data validation and transformation
- Configuration management

### ✅ Edge Cases
- Empty/null/undefined handling
- Error scenarios
- Missing data cases
- Permission checks

### ⚠️ External Dependencies
Some component tests require external UI libraries. These are mocked in tests.

## Detailed Documentation

See [`src/__tests__/README.md`](./src/__tests__/README.md) for comprehensive documentation including:
- Detailed test descriptions
- Writing new tests guide
- Best practices
- Troubleshooting
- Migration notes

