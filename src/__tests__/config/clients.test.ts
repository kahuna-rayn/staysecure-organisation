/**
 * Tests for clients configuration
 */

import { CLIENT_CONFIGS } from '@/config/clients';

describe('CLIENT_CONFIGS', () => {
  it('should have a default configuration', () => {
    expect(CLIENT_CONFIGS).toBeDefined();
    expect(CLIENT_CONFIGS.default).toBeDefined();
    expect(typeof CLIENT_CONFIGS.default).toBe('object');
  });

  it('should allow access to default config', () => {
    const defaultConfig = CLIENT_CONFIGS.default;
    expect(defaultConfig).toEqual({});
  });

  it('should be a record type that can accept string keys', () => {
    // Type check: should accept any string key
    const testKey = 'test-client';
    expect(CLIENT_CONFIGS[testKey]).toBeUndefined();
    
    // Should be able to access with bracket notation
    expect(CLIENT_CONFIGS['default']).toBeDefined();
  });
});

