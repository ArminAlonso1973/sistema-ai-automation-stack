// backend/src/services/db.service.js - NUEVA VERSIÓN

import { createClient } from '@supabase/supabase-js';
import config from '../config/config.js';
import logger from '../utils/logger.js';

// Validamos que las credenciales de Supabase existan en la configuración.
// Esto es crucial para evitar errores difíciles de depurar más adelante.
if (!config.supabase.url || !config.supabase.serviceRoleKey) {
  logger.error('Supabase URL or Service Role Key is missing. Check your .env file.');
  // Si las claves no existen, detenemos la aplicación de forma controlada.
  // Es mejor fallar rápido y con un mensaje claro.
  process.exit(1);
}

// Creamos la instancia del cliente de Supabase.
const db = createClient(config.supabase.url, config.supabase.serviceRoleKey);

logger.info('Supabase client initialized successfully.');

// Exportamos la instancia del cliente. Ahora, cuando importemos 'db'
// desde este archivo en cualquier otra parte de la app, obtendremos
// directamente el cliente de Supabase listo para usar.
export default db;