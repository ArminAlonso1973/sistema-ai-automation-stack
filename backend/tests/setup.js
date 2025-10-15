// backend/tests/setup.js - VERSIÓN EVOLUCIONADA

import { vi } from 'vitest';

// Le decimos a Vitest que, desde el inicio y para TODOS los tests,
// cualquier intento de importar el módulo '../src/config/config.js'
// debe ser interceptado. En lugar del archivo real, se devolverá este objeto.
// Esto resuelve el error "File not found" en el CI de forma definitiva.
vi.mock('../src/config/config.js', () => ({
  default: {
    supabase: {
      // Usamos valores falsos pero válidos para que el servicio no falle.
      url: 'https://mock-url.supabase.co',
      serviceRoleKey: 'mock-secret-key-for-tests',
    },
    // Podemos añadir otras configuraciones que otros servicios puedan necesitar
    whatsapp: {},
    env: 'test',
    port: 3001,
  },
}));