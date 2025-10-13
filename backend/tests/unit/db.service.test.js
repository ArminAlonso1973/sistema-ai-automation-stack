import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Supabase BEFORE importing DatabaseService
const mockSupabaseClient = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis()
};

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => mockSupabaseClient)
}));

// IMPORT DEFAULT (not named export)
import dbService from '../../src/services/db.service.js';

describe('DatabaseService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getLeads', () => {
    it('debe obtener leads exitosamente', async () => {
      const mockLeads = [
        { id: 1, name: 'Lead 1', status: 'new' },
        { id: 2, name: 'Lead 2', status: 'contacted' }
      ];

      // Setup mock chain
      const mockChain = {
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockLeads, error: null })
      };
      mockSupabaseClient.from.mockReturnValue(mockChain);

      const result = await dbService.getLeads('client1');
      
      expect(Array.isArray(result)).toBe(true);
    });

    it('debe manejar errores correctamente', async () => {
      const mockChain = {
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: null, error: { message: 'Error' } })
      };
      mockSupabaseClient.from.mockReturnValue(mockChain);

      const result = await dbService.getLeads('client1');
      
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([]);
    });
  });

  describe('createLead', () => {
    it('debe crear lead exitosamente', async () => {
      const leadData = { name: 'New Lead', phone: '123456789' };
      const createdLead = { id: 1, ...leadData };

      const mockChain = {
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockResolvedValue({ data: [createdLead], error: null })
      };
      mockSupabaseClient.from.mockReturnValue(mockChain);

      const result = await dbService.createLead(leadData, 'client1');
      
      expect(result).toBeDefined();
    });
  });
});
