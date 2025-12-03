/**
 * Example Jest config with ESM support
 * This is EXPERIMENTAL and may have issues
 * 
 * To use this:
 * 1. Rename to jest.config.js
 * 2. Update package.json test script to:
 *    "test": "NODE_OPTIONS=--experimental-vm-modules jest"
 */

/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      { 
        tsconfig: '<rootDir>/tsconfig.json',
        isolatedModules: false,
        useESM: true, // Enable ESM support
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  // ... rest of config
};

