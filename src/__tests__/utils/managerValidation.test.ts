/**
 * Tests for manager validation logic in ImportUsersDialog
 * Manager validation now only accepts email addresses (not full names)
 */

import { validateManager, Profile } from '@/utils/managerValidation';

describe('validateManager', () => {
  const mockProfiles: Profile[] = [
    { id: 'user-1', email: 'john.doe@example.com', full_name: 'John Doe' },
    { id: 'user-2', email: 'jane.smith@example.com', full_name: 'Jane Smith' },
    { id: 'user-3', email: 'bob.wilson@example.com', full_name: 'Bob Wilson' },
  ];

  describe('when manager email exists', () => {
    it('should find manager by email (case-insensitive)', () => {
      const result = validateManager('JOHN.DOE@EXAMPLE.COM', mockProfiles);
      expect(result.isValid).toBe(true);
      expect(result.managerId).toBe('user-1');
    });

    it('should find manager by email field', () => {
      const profiles: Profile[] = [
        { id: 'user-1', email: 'test@example.com', full_name: 'Test User' }
      ];
      const result = validateManager('test@example.com', profiles);
      expect(result.isValid).toBe(true);
      expect(result.managerId).toBe('user-1');
    });

    it('should handle whitespace in email', () => {
      const result = validateManager('  john.doe@example.com  ', mockProfiles);
      expect(result.isValid).toBe(true);
      expect(result.managerId).toBe('user-1');
    });
  });

  describe('when manager does not exist', () => {
    it('should return invalid for non-existent email', () => {
      const result = validateManager('nonexistent@example.com', mockProfiles);
      expect(result.isValid).toBe(false);
      expect(result.managerId).toBeUndefined();
    });

    it('should return invalid for full name (no longer supported)', () => {
      // Full names are no longer supported - only email addresses
      const result = validateManager('John Doe', mockProfiles);
      expect(result.isValid).toBe(false);
      expect(result.managerId).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('should return invalid when managerEmail is empty', () => {
      const result = validateManager('', mockProfiles);
      expect(result.isValid).toBe(false);
      expect(result.managerId).toBeUndefined();
    });

    it('should return invalid when managerEmail is whitespace only', () => {
      const result = validateManager('   ', mockProfiles);
      expect(result.isValid).toBe(false);
      expect(result.managerId).toBeUndefined();
    });

    it('should return invalid when existingProfiles is undefined', () => {
      const result = validateManager('john.doe@example.com', undefined);
      expect(result.isValid).toBe(false);
      expect(result.managerId).toBeUndefined();
    });

    it('should return invalid when existingProfiles is empty array', () => {
      const result = validateManager('john.doe@example.com', []);
      expect(result.isValid).toBe(false);
      expect(result.managerId).toBeUndefined();
    });

    it('should handle profiles with missing email field gracefully', () => {
      const profiles: Profile[] = [
        { id: 'user-1', email: 'test@example.com' },
        { id: 'user-2' } // no email field
      ];

      const result1 = validateManager('test@example.com', profiles);
      expect(result1.isValid).toBe(true);
      expect(result1.managerId).toBe('user-1');

      const result2 = validateManager('other@example.com', profiles);
      expect(result2.isValid).toBe(false);
    });

    it('should handle profiles with null/undefined email gracefully', () => {
      const profiles: Profile[] = [
        { id: 'user-1', email: null as any, full_name: undefined as any }
      ];
      const result = validateManager('test@example.com', profiles);
      expect(result.isValid).toBe(false);
    });
  });
});

