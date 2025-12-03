# Solutions for `import.meta.env` in Jest Tests

## Problem
Your code uses Vite's `import.meta.env` which Jest doesn't understand in CommonJS mode.

## Solution Options

### Option 1: Mock `import.meta` (Current Approach - Partial)
✅ Already implemented in test files
❌ Doesn't work because Jest transforms code before mocks run

### Option 2: Use `babel-plugin-transform-import-meta` (Recommended)
Transform `import.meta.env` to `process.env` during tests.

**Steps:**
1. Install babel plugin:
```bash
npm install --save-dev babel-plugin-transform-import-meta
```

2. Create `babel.config.js`:
```js
module.exports = {
  plugins: [
    ['babel-plugin-transform-import-meta', {
      module: 'process',
    }],
  ],
};
```

3. Update `jest.config.js` to use babel:
```js
transform: {
  '^.+\\.(t|j)sx?$': ['babel-jest'],
}
```

### Option 3: Use Vitest Instead of Jest (Best for Vite Projects)
Vitest is built for Vite and handles `import.meta` natively.

**Steps:**
1. Install vitest:
```bash
npm install --save-dev vitest @vitest/ui
```

2. Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
  },
});
```

3. Update `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch"
  }
}
```

### Option 4: Refactor Code to Use Environment Variables Helper
Create a utility that works in both Vite and Jest:

**Create `src/utils/env.ts`:**
```ts
export const getEnvVar = (key: string): string | undefined => {
  // In Vite/build time
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key];
  }
  // In Jest/test time
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return undefined;
};
```

Then use `getEnvVar('VITE_SUPABASE_URL')` instead of `import.meta.env.VITE_SUPABASE_URL`.

## Recommendation
For a Vite-based project, **Option 3 (Vitest)** is the best choice as it:
- ✅ Handles `import.meta` natively
- ✅ Uses same config as Vite
- ✅ Faster than Jest
- ✅ Better TypeScript support
- ✅ Built for modern ESM projects

