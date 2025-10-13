// tests/unit/db.service.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock de @supabase/supabase-js
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis()
    }))
  }))
}));

describe('DatabaseService', () => {
  let dbService;
  let mockSupabase;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Importar dinámicamente el servicio
    const DBServiceModule = await import('../../src/services/db.service.js');
    dbService = DBServiceModule.default;
    mockSupabase = dbService.supabase;
  });

  describe('getLeads', () => {
    it('debe obtener leads exitosamente', async () => {
      const mockLeads = [
        { id: 1, name: 'Lead 1', created_at: '2024-01-01' },
        { id: 2, name: 'Lead 2', created_at: '2024-01-02' }
      ];

      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockLeads, error: null })
      });

      const result = await dbService.getLeads();
      
      expect(result).toEqual(mockLeads);
      expect(mockSupabase.from).toHaveBeenCalledWith('leads');
    });

    it('debe retornar array vacío cuando hay error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ 
          data: null, 
          error: { message: 'Database error' } 
        })
      });

      const result = await dbService.getLeads();
      
      expect(result).toEqual([]);
    });

    it('debe manejar excepción y retornar array vacío', async () => {
      mockSupabase.from.mockImplementation(() => {
        throw new Error('Connection error');
      });

      const result = await dbService.getLeads();
      
      expect(result).toEqual([]);
    });
  });

  describe('createLead', () => {
    it('debe crear lead exitosamente', async () => {
      const leadData = { name: 'New Lead', email: 'test@test.com' };
      const createdLead = { id: 1, ...leadData };

      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockResolvedValue({ data: [createdLead], error: null })
      });

      const result = await dbService.createLead(leadData);
      
      expect(result).toEqual(createdLead);
      expect(mockSupabase.from).toHaveBeenCalledWith('leads');
    });

    it('debe lanzar error cuando falla la creación', async () => {
      const leadData = { name: 'New Lead' };

      mockSupabase.from.mockReturnValue({
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockResolvedValue({ 
          data: null, 
          error: { message: 'Insert failed' } 
        })
      });

      await expect(dbService.createLead(leadData)).rejects.toThrow();
    });
  });

  describe('updateLead', () => {
    it('debe actualizar lead exitosamente', async () => {
      const leadId = 1;
      const updates = { name: 'Updated Lead' };
      const updatedLead = { id: leadId, ...updates };

      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        select: vi.fn().mockResolvedValue({ data: [updatedLead], error: null })
      });

      const result = await dbService.updateLead(leadId, updates);
      
      expect(result).toEqual(updatedLead);
      expect(mockSupabase.from).toHaveBeenCalledWith('leads');
    });

    it('debe lanzar error cuando falla la actualización', async () => {
      const leadId = 1;
      const updates = { name: 'Updated Lead' };

      mockSupabase.from.mockReturnValue({
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        select: vi.fn().mockResolvedValue({ 
          data: null, 
          error: { message: 'Update failed' } 
        })
      });

      await expect(dbService.updateLead(leadId, updates)).rejects.toThrow();
    });
  });

  describe('getConversations', () => {
    it('debe obtener conversaciones exitosamente', async () => {
      const mockConversations = [
        { id: 1, message: 'Hello', updated_at: '2024-01-02' },
        { id: 2, message: 'Hi there', updated_at: '2024-01-01' }
      ];

      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockConversations, error: null })
      });

      const result = await dbService.getConversations();
      
      expect(result).toEqual(mockConversations);
      expect(mockSupabase.from).toHaveBeenCalledWith('conversations');
    });

    it('debe retornar array vacío cuando hay error', async () => {
      mockSupabase.from.mockReturnValue({
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ 
          data: null, 
          error: { message: 'Query failed' } 
        })
      });

      const result = await dbService.getConversations();
      
      expect(result).toEqual([]);
    });
  });
});