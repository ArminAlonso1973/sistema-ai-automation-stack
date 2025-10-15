// backend/tests/unit/db.service.test.js - VERSIÓN FINAL Y LIMPIA

import { describe, it, expect } from 'vitest';
import db from '../../src/services/db.service.js';

describe('Database Service', () => {
  it('debe inicializar el cliente de Supabase usando el mock global de setup.js', () => {
    // La prueba es ahora súper directa: gracias a setup.js,
    // la importación de 'db' ya funciona sin problemas.
    expect(db).toBeTypeOf('object');
    expect(db).toHaveProperty('from');
    expect(db).toHaveProperty('rpc');
  });
});