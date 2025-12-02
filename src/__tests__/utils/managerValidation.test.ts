/**
 * Tests for manager validation logic in ImportUsersDialog
 */

import { validateManager, Profile } from '@/utils/managerValidation';

describe('validateManager', () => {
  const mockProfiles: Profile[] = [
    {
      id: 'user-1',
      email: 'john.doe@example.com',
      full_name: 'John Doe',
      username: 'johndoe'
    },
    {
      id: 'user-2',
      email: 'jane.smith@example.com',
      full_name: 'Jane Smith',
      username: 'janesmith'
    },
    {
      id: 'user-3',
      email: 'bob.wilson@example.com',
      full_name: 'Bob Wilson',
      username: 'bobwilson'
    }
  ];

  describe('when manager exists', () => {
    it('should find manager by email (case-insensitive)', () => {
      const result = validateManager('JOHN.DOE@EXAMPLE.COM', mockProfiles);
      expect(result.isValid).toBe(true);
      expect(result.managerId).toBe('user-1');
    });

    it('should find manager by full name (case-insensitive)', () => {
      const result = validateManager('jane smith', mockProfiles);
      expect(result.isValid).toBe(true);
      expect(result.managerId).toBe('user-2');
    });

    it('should find manager by username (case-insensitive)', () => {
      const result = validateManager('BOBWILSON', mockProfiles);
      expect(result.isValid).toBe(true);
      expect(result.managerId).toBe('user-3');
    });

    it('should handle whitespace in identifier', () => {
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

    it('should return invalid for non-existent name', () => {
      const result = validateManager('Non Existent User', mockProfiles);
      expect(result.isValid).toBe(false);
      expect(result.managerId).toBeUndefined();
    });

    it('should return invalid for non-existent username', () => {
      const result = validateManager('nonexistent', mockProfiles);
      expect(result.isValid).toBe(false);
      expect(result.managerId).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('should return invalid when managerIdentifier is empty', () => {
      const result = validateManager('', mockProfiles);
      expect(result.isValid).toBe(false);
      expect(result.managerId).toBeUndefined();
    });

    it('should return invalid when managerIdentifier is whitespace only', () => {
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

    it('should handle profiles with missing fields', () => {
      const profilesWithMissingFields: Profile[] = [
        { id: 'user-1', email: 'test@example.com' }, // no full_name or username
        { id: 'user-2', full_name: 'Test User' }, // no email or username
        { id: 'user-3', username: 'testuser' } // no email or full_name
      ];

      const result1 = validateManager('test@example.com', profilesWithMissingFields);
      expect(result1.isValid).toBe(true);
      expect(result1.managerId).toBe('user-1');

      const result2 = validateManager('Test User', profilesWithMissingFields);
      expect(result2.isValid).toBe(true);
      expect(result2.managerId).toBe('user-2');

      const result3 = validateManager('testuser', profilesWithMissingFields);
      expect(result3.isValid).toBe(true);
      expect(result3.managerId).toBe('user-3');
    });

    it('should handle profiles with null/undefined fields gracefully', () => {
      const profilesWithNulls: Profile[] = [
        { id: 'user-1', email: null as any, full_name: undefined as any, username: 'testuser' }
      ];

      const result = validateManager('testuser', profilesWithNulls);
      expect(result.isValid).toBe(true);
      expect(result.managerId).toBe('user-1');
    });
  });
});

