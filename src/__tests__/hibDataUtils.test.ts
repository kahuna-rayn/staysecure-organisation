/**
 * Tests for hibDataUtils
 */

import { vi } from 'vitest';
import {
  getInitialClauses,
  loadHIBData,
  saveHIBData,
  updateHIBClause,
  createHIBClause,
  deleteHIBClause,
  type HIBClause,
} from '@/hibDataUtils';

// Mock Supabase
const mockSelect = vi.fn();
const mockOrder = vi.fn();
const mockDelete = vi.fn();
const mockInsert = vi.fn();
const mockUpdate = vi.fn();
const mockEq = vi.fn();
const mockSingle = vi.fn();

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: mockSelect,
      delete: mockDelete,
      insert: mockInsert,
      update: mockUpdate,
    })),
  },
}));

describe('hibDataUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getInitialClauses', () => {
    it('should return initial HIB clauses', () => {
      const clauses = getInitialClauses();

      expect(clauses).toBeDefined();
      expect(Array.isArray(clauses)).toBe(true);
      expect(clauses.length).toBeGreaterThan(0);

      // Check first clause structure
      const firstClause = clauses[0];
      expect(firstClause).toHaveProperty('id');
      expect(firstClause).toHaveProperty('hibSection');
      expect(firstClause).toHaveProperty('hibClause');
      expect(firstClause).toHaveProperty('hibClauseDescription');
      expect(firstClause).toHaveProperty('suggestedArtefacts');
      expect(firstClause).toHaveProperty('implementationStatus');
      expect(firstClause).toHaveProperty('remarks');
    });

    it('should return clauses with correct data types', () => {
      const clauses = getInitialClauses();

      clauses.forEach((clause) => {
        expect(typeof clause.id).toBe('string');
        expect(typeof clause.hibSection).toBe('string');
        expect(typeof clause.hibClause).toBe('number');
        expect(typeof clause.hibClauseDescription).toBe('string');
        expect(['No', 'Yes', 'Partially', '']).toContain(clause.implementationStatus);
      });
    });
  });

  describe('loadHIBData', () => {
    it('should load HIB data from Supabase', async () => {
      const mockData = [
        {
          id: '1',
          hib_section: 'Section 4.1',
          hib_clause: 1,
          hib_clause_description: 'Test description',
          suggested_artefacts: 'Test artefacts',
          implementation_status: 'Yes',
          remarks: 'Test remarks',
          additional_information_i: 'Info I',
          additional_information_ii: 'Info II',
          additional_information_iii: 'Info III',
          section_number: 1,
        },
      ];

      mockSelect.mockReturnValue({
        order: vi.fn(() => ({
          order: vi.fn(() => Promise.resolve({ data: mockData, error: null })),
        })),
      });

      const result = await loadHIBData('user-1');

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      expect(result[0].hibSection).toBe('Section 4.1');
      expect(result[0].hibClause).toBe(1);
    });

    it('should return empty array when no data exists', async () => {
      mockSelect.mockReturnValue({
        order: vi.fn(() => ({
          order: vi.fn(() => Promise.resolve({ data: [], error: null })),
        })),
      });

      const result = await loadHIBData('user-1');

      expect(result).toEqual([]);
    });

    it('should throw error when Supabase query fails', async () => {
      const error = new Error('Database error');
      mockSelect.mockReturnValue({
        order: vi.fn(() => ({
          order: vi.fn(() => Promise.resolve({ data: null, error })),
        })),
      });

      await expect(loadHIBData('user-1')).rejects.toThrow('Database error');
    });

    it('should map database fields to HIBClause format', async () => {
      const mockData = [
        {
          id: '1',
          hib_section: 'Section 4.1',
          hib_clause: 1,
          hib_clause_description: 'Description',
          suggested_artefacts: 'Artefacts',
          implementation_status: 'Partially',
          remarks: 'Remarks',
          additional_information_i: 'Info I',
          additional_information_ii: 'Info II',
          additional_information_iii: 'Info III',
          section_number: 1,
        },
      ];

      mockSelect.mockReturnValue({
        order: vi.fn(() => ({
          order: vi.fn(() => Promise.resolve({ data: mockData, error: null })),
        })),
      });

      const result = await loadHIBData('user-1');

      expect(result[0]).toMatchObject({
        id: '1',
        hibSection: 'Section 4.1',
        hibClause: 1,
        hibClauseDescription: 'Description',
        suggestedArtefacts: 'Artefacts',
        implementationStatus: 'Partially',
        remarks: 'Remarks',
        additionalInformationI: 'Info I',
        additionalInformationII: 'Info II',
        additionalInformationIII: 'Info III',
        sectionNumber: 1,
      });
    });
  });

  describe('saveHIBData', () => {
    it('should save HIB data to Supabase', async () => {
      const clauses: HIBClause[] = [
        {
          id: '1',
          hibSection: 'Section 4.1',
          hibClause: 1,
          hibClauseDescription: 'Description',
          suggestedArtefacts: 'Artefacts',
          implementationStatus: 'Yes',
          remarks: 'Remarks',
          additionalInformationI: 'Info I',
          additionalInformationII: 'Info II',
          additionalInformationIII: 'Info III',
          sectionNumber: 1,
        },
      ];

      mockDelete.mockReturnValue({
        eq: vi.fn(() => Promise.resolve({ error: null })),
      });

      mockInsert.mockReturnValue(Promise.resolve({ error: null }));

      await saveHIBData('user-1', clauses);

      expect(mockDelete).toHaveBeenCalled();
      expect(mockInsert).toHaveBeenCalled();
    });

    it('should throw error when insert fails', async () => {
      const clauses: HIBClause[] = [
        {
          id: '1',
          hibSection: 'Section 4.1',
          hibClause: 1,
          hibClauseDescription: 'Description',
          suggestedArtefacts: 'Artefacts',
          implementationStatus: 'No',
          remarks: '',
          additionalInformationI: '',
          additionalInformationII: '',
          additionalInformationIII: '',
        },
      ];

      const error = new Error('Insert failed');
      mockDelete.mockReturnValue({
        eq: vi.fn(() => Promise.resolve({ error: null })),
      });

      mockInsert.mockReturnValue(Promise.resolve({ error }));

      await expect(saveHIBData('user-1', clauses)).rejects.toThrow('Insert failed');
    });
  });

  describe('updateHIBClause', () => {
    it('should update HIB clause successfully', async () => {
      const updates: Partial<HIBClause> = {
        implementationStatus: 'Yes',
        remarks: 'Updated remarks',
      };

      mockUpdate.mockReturnValue({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            select: vi.fn(() => Promise.resolve({ data: [{}], error: null })),
          })),
        })),
      });

      const result = await updateHIBClause('user-1', 'clause-1', updates);

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should handle update errors', async () => {
      const updates: Partial<HIBClause> = {
        implementationStatus: 'Yes',
      };

      const error = new Error('Update failed');
      mockUpdate.mockReturnValue({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            select: vi.fn(() => Promise.resolve({ data: null, error })),
          })),
        })),
      });

      const result = await updateHIBClause('user-1', 'clause-1', updates);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Update failed');
    });
  });

  describe('createHIBClause', () => {
    it('should create HIB clause successfully', async () => {
      const newClause: Partial<HIBClause> = {
        hibSection: 'Section 4.1',
        hibClause: 1,
        hibClauseDescription: 'New description',
        suggestedArtefacts: 'New artefacts',
        implementationStatus: 'No',
        remarks: '',
        additionalInformationI: '',
        additionalInformationII: '',
        additionalInformationIII: '',
      };

      const mockInsertedData = {
        id: 'new-id',
        hib_section: 'Section 4.1',
        hib_clause: 1,
        hib_clause_description: 'New description',
        suggested_artefacts: 'New artefacts',
        implementation_status: 'No',
        remarks: '',
        additional_information_i: '',
        additional_information_ii: '',
        additional_information_iii: '',
        section_number: null,
      };

      mockInsert.mockReturnValue({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: mockInsertedData, error: null })),
        })),
      });

      const result = await createHIBClause('user-1', newClause);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.hibSection).toBe('Section 4.1');
    });

    it('should handle creation errors', async () => {
      const newClause: Partial<HIBClause> = {
        hibSection: 'Section 4.1',
        hibClause: 1,
      };

      const error = new Error('Creation failed');
      mockInsert.mockReturnValue({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: null, error })),
        })),
      });

      const result = await createHIBClause('user-1', newClause);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Creation failed');
    });
  });

  describe('deleteHIBClause', () => {
    it('should delete HIB clause successfully', async () => {
      mockDelete.mockReturnValue({
        eq: vi.fn(() => ({
          eq: vi.fn(() => Promise.resolve({ error: null })),
        })),
      });

      const result = await deleteHIBClause('user-1', 'clause-1');

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should handle deletion errors', async () => {
      const error = new Error('Deletion failed');
      mockDelete.mockReturnValue({
        eq: vi.fn(() => ({
          eq: vi.fn(() => Promise.resolve({ error })),
        })),
      });

      const result = await deleteHIBClause('user-1', 'clause-1');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Deletion failed');
    });
  });
});

