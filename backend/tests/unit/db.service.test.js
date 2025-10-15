// backend/tests/unit/db.service.test.js - VERSIÓN FINAL CON MOCK

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ¡ESTE ES EL ARREGLO!
// Le decimos a Vitest que intercepte cualquier importación de '../config/config.js'.
// En lugar de cargar el archivo real (que no existe en el CI),
// proporcionará este objeto falso con los datos mínimos que el servicio necesita.
vi.mock('../../src/config/config.js', () => ({
  default: {
    supabase: {
      url: process.env.SUPABASE_URL,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
  },
}));

describe('Database Service', () => {
  beforeEach(() => {
    // Ahora, en lugar de simular las variables de entorno para config.js,
    // las simulamos para que nuestro mock las pueda leer.
    vi.stubEnv('SUPABASE_URL', 'https://fake-url.supabase.co');
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'fake-service-role-key');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('debe inicializar el cliente de Supabase cuando la configuración es correcta', async () => {
    // Usamos import() dinámico para que el mock se aplique antes de la importación.
    const dbModule = await import('../../src/services/db.service.js');
    const db = dbModule.default;

    expect(db).toBeTypeOf('object');
    expect(db).toHaveProperty('from');
  });
});