// backend/tests/unit/db.service.test.js - VERSIÓN FINAL CON MOCK GLOBAL

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// Importamos el servicio directamente. Vitest redirigirá automáticamente
// la importación de 'config.js' a nuestro archivo en '__mocks__'.
import db from '../../src/services/db.service.js';

describe('Database Service', () => {
  beforeEach(() => {
    // Todavía necesitamos proporcionar las variables de entorno falsas
    // para que nuestro mock global las pueda usar.
    vi.stubEnv('SUPABASE_URL', 'https://fake-url.supabase.co');
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'fake-service-role-key');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('debe inicializar el cliente de Supabase usando el mock global', () => {
    // La prueba es ahora mucho más simple.
    expect(db).toBeTypeOf('object');
    expect(db).toHaveProperty('from');
    expect(db).toHaveProperty('rpc');
  });
});