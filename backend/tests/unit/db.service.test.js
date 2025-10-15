// backend/tests/unit/db.service.test.js - VERSIÓN FINAL-FINAL

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// El mock sigue siendo el mismo. Intercepta la llamada al archivo de configuración.
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
    // Simulamos las variables de entorno que nuestro mock necesita.
    vi.stubEnv('SUPABASE_URL', 'https://fake-url.supabase.co');
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'fake-service-role-key');

    // ¡LA CLAVE ESTÁ AQUÍ!
    // Forzamos a Vitest a borrar su caché de módulos. Esto garantiza que
    // la siguiente vez que se importe 'db.service.js', se volverá a leer
    // desde cero y nuestro mock de 'config.js' será aplicado.
    vi.resetModules();
  });

  afterEach(() => {
    // Limpiamos todo al final de cada test.
    vi.unstubAllEnvs();
  });

  it('debe inicializar el cliente de Supabase cuando la configuración es correcta', async () => {
    // Importamos el módulo AQUÍ, dentro del test, después de resetModules.
    // Esto asegura que estamos obteniendo una versión "fresca" del servicio.
    const { default: db } = await import('../../src/services/db.service.js');

    expect(db).toBeTypeOf('object');
    expect(db).toHaveProperty('from');
    expect(db).toHaveProperty('rpc');
  });
});