/**
 * Tests for manager validation logic in ImportUsersDialog
 * Manager validation now only accepts email addresses (not full names)
 */

import { validateManager, Profile } from '@/utils/managerValidation';

describe('validateManager', () => {
  const mockProfiles: Profile[] = [
    {
      id: 'user-1',
      email: 'john.doe@example.com',
      full_name: 'John Doe',
      username: 'john.doe@example.com' // username stores email in this system
    },
    {
      id: 'user-2',
      email: 'jane.smith@example.com',
      full_name: 'Jane Smith',
      username: 'jane.smith@example.com'
    },
    {
      id: 'user-3',
      email: 'bob.wilson@example.com',
      full_name: 'Bob Wilson',
      username: 'bob.wilson@example.com'
    }
  ];

  describe('when manager email exists', () => {
    it('should find manager by email (case-insensitive)', () => {
      const result = validateManager('JOHN.DOE@EXAMPLE.COM', mockProfiles);
      expect(result.isValid).toBe(true);
      expect(result.managerId).toBe('user-1');
    });

    it('should find manager by email when using username field (username = email)', () => {
      // Test with profile that has email in username field
      const profilesWithUsernameAsEmail: Profile[] = [
        {
          id: 'user-1',
          username: 'test@example.com', // username stores email
          full_name: 'Test User'
        }
      ];
      const result = validateManager('test@example.com', profilesWithUsernameAsEmail);
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

    it('should handle profiles with missing email field but username contains email', () => {
      const profilesWithMissingFields: Profile[] = [
        { id: 'user-1', email: 'test@example.com' }, // has email field
        { id: 'user-3', username: 'test2@example.com' } // username stores email, no email field
      ];

      // Should match by email field
      const result1 = validateManager('test@example.com', profilesWithMissingFields);
      expect(result1.isValid).toBe(true);
      expect(result1.managerId).toBe('user-1');

      // Should match by username field (username stores email)
      const result2 = validateManager('test2@example.com', profilesWithMissingFields);
      expect(result2.isValid).toBe(true);
      expect(result2.managerId).toBe('user-3');
    });

    it('should handle profiles with null/undefined fields gracefully', () => {
      const profilesWithNulls: Profile[] = [
        { id: 'user-1', email: null as any, full_name: undefined as any, username: 'test@example.com' }
      ];

      // username stores email, so should match by username field
      const result = validateManager('test@example.com', profilesWithNulls);
      expect(result.isValid).toBe(true);
      expect(result.managerId).toBe('user-1');
    });
  });
});

