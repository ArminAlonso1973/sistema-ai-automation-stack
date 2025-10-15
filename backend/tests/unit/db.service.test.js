// backend/tests/unit/db.service.test.js - VERSIÓN FINAL Y LIMPIA

import { describe, it, expect } from 'vitest';
import db from '../../src/services/db.service.js';

describe('Database Service', () => {
  it('debe inicializar el cliente de Supabase usando el mock global de setup.js', () => {
    expect(db).toBeTypeOf('object');
    expect(db).toHaveProperty('from');
    expect(db).toHaveProperty('rpc');
  });
});