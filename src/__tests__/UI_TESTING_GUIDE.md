# UI Testing Guide with Vitest

> **Note:** This guide is for **consuming applications** (e.g., the "learn" app) that use this organisation module. UI interaction tests should be written in the consuming apps, not in this library module.

## Overview

Vitest fully supports UI testing using the same tools as Jest:
- ✅ `@testing-library/react` - Component rendering and queries
- ✅ `@testing-library/user-event` - User interaction simulation
- ✅ `@testing-library/jest-dom` - DOM matchers

## Why Test UI in Consuming Apps?

This is a **library module** that provides reusable components. UI interaction tests are better suited for:
- **Integration testing** - Testing how components work together in the actual app
- **User flows** - Testing complete workflows in the app context
- **Real dependencies** - Testing with actual UI component libraries
- **End-to-end scenarios** - Testing full user journeys

## What This Library Tests

### ✅ What We Test
- **Rendering** - Components render without errors
- **Permissions** - UI shows/hides based on permissions
- **Data Display** - Data is displayed correctly

### ❌ What We're NOT Testing (Yet)
- **User Interactions** - Clicking, typing, submitting
- **Form Validation** - Error messages, required fields
- **User Flows** - Complete workflows (create → edit → delete)
- **Accessibility** - Keyboard navigation, ARIA attributes
- **Visual States** - Loading, error, success states

## How to Test UI Interactions

### 1. Install Dependencies (Already Installed)

```bash
npm install --save-dev @testing-library/react @testing-library/user-event
```

### 2. Basic User Interaction Test

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  it('should handle button click', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<MyComponent onClick={handleClick} />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 3. Form Interaction Test

```typescript
it('should handle form submission', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  
  render(<MyForm onSubmit={onSubmit} />);
  
  // Fill in form
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  
  await user.type(nameInput, 'John Doe');
  await user.type(emailInput, 'john@example.com');
  
  // Submit form
  const submitButton = screen.getByRole('button', { name: /submit/i });
  await user.click(submitButton);
  
  expect(onSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
  });
});
```

### 4. Testing User Flows

```typescript
it('should complete create → edit → delete flow', async () => {
  const user = userEvent.setup();
  
  render(<DepartmentManagement />);
  
  // Step 1: Create
  const createButton = screen.getByRole('button', { name: /create/i });
  await user.click(createButton);
  
  const nameInput = screen.getByLabelText(/name/i);
  await user.type(nameInput, 'Engineering');
  
  const saveButton = screen.getByRole('button', { name: /save/i });
  await user.click(saveButton);
  
  // Step 2: Verify created
  await waitFor(() => {
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });
  
  // Step 3: Edit
  const editButton = screen.getByRole('button', { name: /edit/i });
  await user.click(editButton);
  
  await user.clear(nameInput);
  await user.type(nameInput, 'Software Engineering');
  await user.click(saveButton);
  
  // Step 4: Verify updated
  await waitFor(() => {
    expect(screen.getByText('Software Engineering')).toBeInTheDocument();
  });
  
  // Step 5: Delete
  const deleteButton = screen.getByRole('button', { name: /delete/i });
  await user.click(deleteButton);
  
  // Confirm deletion
  const confirmButton = screen.getByRole('button', { name: /confirm/i });
  await user.click(confirmButton);
  
  // Step 6: Verify deleted
  await waitFor(() => {
    expect(screen.queryByText('Software Engineering')).not.toBeInTheDocument();
  });
});
```

## Common User Interactions

### Clicking

```typescript
await user.click(button);
await user.dblClick(button);
await user.rightClick(button);
```

### Typing

```typescript
await user.type(input, 'Hello World');
await user.clear(input);
await user.paste('Pasted text');
```

### Keyboard Navigation

```typescript
await user.keyboard('{Enter}');
await user.keyboard('{Tab}');
await user.keyboard('{Escape}');
await user.keyboard('{ArrowDown}');
```

### Selecting

```typescript
// Select from dropdown
await user.selectOptions(select, 'option-value');

// Check/uncheck checkbox
await user.click(checkbox);

// Select radio button
await user.click(radioButton);
```

### Hovering

```typescript
await user.hover(element);
await user.unhover(element);
```

## Best Practices

### 1. Use `userEvent.setup()`

Always create a user instance:

```typescript
const user = userEvent.setup();
await user.click(button);
```

### 2. Use `waitFor` for Async Updates

```typescript
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

### 3. Query by Role (Preferred)

```typescript
// ✅ Good - queries by accessibility role
screen.getByRole('button', { name: /submit/i });

// ❌ Avoid - queries by implementation
screen.getByTestId('submit-button');
```

### 4. Test User Intent, Not Implementation

```typescript
// ✅ Good - tests what user sees
await user.click(screen.getByRole('button', { name: /save/i }));

// ❌ Avoid - tests implementation details
await user.click(screen.getByTestId('save-btn-123'));
```

### 5. Test Error States

```typescript
it('should show error when form is invalid', async () => {
  const user = userEvent.setup();
  
  render(<MyForm />);
  
  // Try to submit without filling required fields
  const submitButton = screen.getByRole('button', { name: /submit/i });
  await user.click(submitButton);
  
  // Verify error message appears
  await waitFor(() => {
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });
});
```

## Testing Accessibility

### Keyboard Navigation

```typescript
it('should be navigable with keyboard', async () => {
  const user = userEvent.setup();
  
  render(<MyComponent />);
  
  // Tab to first button
  await user.keyboard('{Tab}');
  expect(screen.getByRole('button', { name: /first/i })).toHaveFocus();
  
  // Tab to second button
  await user.keyboard('{Tab}');
  expect(screen.getByRole('button', { name: /second/i })).toHaveFocus();
});
```

### ARIA Attributes

```typescript
it('should have proper ARIA attributes', () => {
  render(<MyComponent />);
  
  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-labelledby');
  expect(dialog).toHaveAttribute('aria-describedby');
});
```

## Example: Complete Component Test

See `DepartmentManagement.interactions.test.tsx` for a complete example of:
- Opening dialogs
- Filling forms
- Submitting data
- Testing permissions
- User flows

## Running UI Tests

```bash
# Run all tests including UI tests
npm test

# Run only UI interaction tests
npm test -- DepartmentManagement.interactions

# Watch mode (recommended for development)
npm run test:watch
```

## Debugging UI Tests

### Screen Debugging

```typescript
// Print current DOM
screen.debug();

// Print specific element
screen.debug(button);

// Print container
screen.debug(container);
```

### Log Roles

```typescript
// See all available roles
screen.logTestingPlaygroundURL();
```

### Pause Test

```typescript
it('debug test', async () => {
  render(<MyComponent />);
  
  // Pause to inspect
  await screen.findByText('Loading...');
  
  // Continue test
  // ...
});
```

## Common Issues

### Issue: "Unable to find role"

**Solution:** Check if element has proper ARIA attributes or use different query:

```typescript
// If button doesn't have accessible name
screen.getByRole('button'); // ❌ Fails

// Use test id as fallback
screen.getByTestId('my-button'); // ✅ Works
```

### Issue: "Element is not visible"

**Solution:** Wait for element to appear or check if it's hidden:

```typescript
await waitFor(() => {
  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

### Issue: "Timing out"

**Solution:** Increase timeout or check if async operation completed:

```typescript
await waitFor(
  () => {
    expect(screen.getByText('Success')).toBeInTheDocument();
  },
  { timeout: 5000 }
);
```

## Resources

- [Testing Library Documentation](https://testing-library.com/)
- [User Event Documentation](https://testing-library.com/docs/user-event/intro)
- [Vitest UI Testing](https://vitest.dev/guide/ui.html)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

