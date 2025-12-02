# Testing Guide

This directory contains tests for the organisation module.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage
```

## Pre-commit Hook

Tests are automatically run before each commit via husky and lint-staged. Only tests related to changed files will run to keep commits fast.

## Test Structure

- `__tests__/` - Test files
  - `utils/` - Utility function tests
  - `setup.ts` - Jest setup file

## Writing Tests

1. Create test files next to the code they test, or in `__tests__/` directory
2. Use descriptive test names
3. Group related tests with `describe` blocks
4. Test both success and failure cases
5. Test edge cases (empty strings, null, undefined, etc.)

## Example Test

```typescript
import { validateManager } from '@/utils/managerValidation';

describe('validateManager', () => {
  it('should find manager by email', () => {
    const profiles = [{ id: '1', email: 'test@example.com' }];
    const result = validateManager('test@example.com', profiles);
    expect(result.isValid).toBe(true);
    expect(result.managerId).toBe('1');
  });
});
```

