// backend/tests/unit/db.service.test.js - VERSIÓN FINAL Y LIMPIA

import { describe, it, expect } from 'vitest';
import dbService from '../../src/services/db.service.js';

describe('Database Service', () => {
  it('debe inicializar correctamente el servicio de base de datos', () => {
    // Verifica que el servicio se exporta como objeto
    expect(dbService).toBeTypeOf('object');
    
    // Verifica que tiene el cliente Supabase inicializado
    expect(dbService).toHaveProperty('supabase');
    expect(dbService.supabase).toBeTypeOf('object');
    
    // Verifica que tiene la propiedad mockMode (en tests siempre será true por las env vars)
    expect(dbService).toHaveProperty('mockMode');
    expect(dbService.mockMode).toBe(true);
  });

  it('debe tener métodos principales del servicio', () => {
    expect(dbService.getLeads).toBeTypeOf('function');
    expect(dbService.createLead).toBeTypeOf('function');
    expect(dbService.updateLead).toBeTypeOf('function');
    expect(dbService.getConversations).toBeTypeOf('function');
  });
});