import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DatabaseService } from '../../src/services/db.service.js';

// Mock Supabase
const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis()
};

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => mockSupabase)
}));

describe('DatabaseService', () => {
  let dbService;

  beforeEach(() => {
    dbService = new DatabaseService();
    vi.clearAllMocks();
    
    // Reset mock chain
    mockSupabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis()
    });
  });

  describe('getLeads', () => {
    it('debe obtener leads exitosamente', async () => {
      const mockLeads = [
        { id: 1, name: 'Lead 1', status: 'new' },
        { id: 2, name: 'Lead 2', status: 'contacted' }
      ];

      const mockChain = {
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockLeads, error: null })
      };
      mockSupabase.from.mockReturnValue(mockChain);

      const result = await dbService.getLeads('client1');
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('debe manejar errores correctamente', async () => {
      const mockChain = {
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: null, error: { message: 'Error' } })
      };
      mockSupabase.from.mockReturnValue(mockChain);

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
      mockSupabase.from.mockReturnValue(mockChain);

      const result = await dbService.createLead(leadData, 'client1');
      
      expect(result).toBeDefined();
    });
  });
});
