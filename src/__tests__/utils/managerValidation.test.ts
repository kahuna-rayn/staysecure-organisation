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

  describe('when manager exists', () => {
    it('should find manager by email (case-insensitive)', () => {
      const result = validateManager('JOHN.DOE@EXAMPLE.COM', mockProfiles);
      expect(result.isValid).toBe(true);
      expect(result.managerId).toBe('user-1');
      expect(result.isAmbiguous).toBeUndefined();
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

    it('should find manager by full name (case-insensitive)', () => {
      const result = validateManager('jane smith', mockProfiles);
      expect(result.isValid).toBe(true);
      expect(result.managerId).toBe('user-2');
      expect(result.isAmbiguous).toBeUndefined();
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
  });

  describe('when multiple users share the same full name', () => {
    it('should return ambiguous when multiple users have same full name', () => {
      const profilesWithDuplicateNames: Profile[] = [
        {
          id: 'user-1',
          email: 'john.doe1@example.com',
          full_name: 'John Doe',
          username: 'john.doe1@example.com'
        },
        {
          id: 'user-2',
          email: 'john.doe2@example.com',
          full_name: 'John Doe',
          username: 'john.doe2@example.com'
        }
      ];
      
      const result = validateManager('John Doe', profilesWithDuplicateNames);
      expect(result.isValid).toBe(true);
      expect(result.isAmbiguous).toBe(true);
      expect(result.managerId).toBe('user-1'); // Returns first match
      expect(result.ambiguityDetails).toContain('Multiple users found with name');
    });

    it('should prefer email match over name match (no ambiguity)', () => {
      const profilesWithDuplicateNames: Profile[] = [
        {
          id: 'user-1',
          email: 'john.doe1@example.com',
          full_name: 'John Doe',
          username: 'john.doe1@example.com'
        },
        {
          id: 'user-2',
          email: 'john.doe2@example.com',
          full_name: 'John Doe',
          username: 'john.doe2@example.com'
        }
      ];
      
      // When matching by email, should not be ambiguous
      const result = validateManager('john.doe1@example.com', profilesWithDuplicateNames);
      expect(result.isValid).toBe(true);
      expect(result.isAmbiguous).toBeUndefined();
      expect(result.managerId).toBe('user-1');
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
        { id: 'user-3', username: 'test@example.com' } // username stores email, no email field or full_name
      ];

      const result1 = validateManager('test@example.com', profilesWithMissingFields);
      expect(result1.isValid).toBe(true);
      expect(result1.managerId).toBe('user-1');

      const result2 = validateManager('Test User', profilesWithMissingFields);
      expect(result2.isValid).toBe(true);
      expect(result2.managerId).toBe('user-2');

      // username stores email, so should match by email
      const result3 = validateManager('test@example.com', profilesWithMissingFields);
      expect(result3.isValid).toBe(true);
      // Should match user-1 (email field) or user-3 (username field) - currently returns first match
      expect(['user-1', 'user-3']).toContain(result3.managerId);
    });

    it('should handle profiles with null/undefined fields gracefully', () => {
      const profilesWithNulls: Profile[] = [
        { id: 'user-1', email: null as any, full_name: undefined as any, username: 'test@example.com' }
      ];

      // username stores email, so should match by email
      const result = validateManager('test@example.com', profilesWithNulls);
      expect(result.isValid).toBe(true);
      expect(result.managerId).toBe('user-1');
    });
  });
});

