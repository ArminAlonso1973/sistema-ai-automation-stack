import db from '../services/db.service.js';
import logger from '../utils/logger.js';

/**
 * @description Obtiene todas las tareas de la base de datos
 * @param {object} req - El objeto de solicitud de Express
 * @param {object} res - El objeto de respuesta de Express
 */
export const getTasks = async (req, res) => {
  try {
    // Hacemos la consulta a la tabla 'tasks' para seleccionar todas las columnas (*)
    const { data: tasks, error } = await db.from('tasks').select('*');

    // Si Supabase devuelve un error, lo registramos y enviamos una respuesta de error
    if (error) {
      logger.error('Error fetching tasks:', error);
      return res.status(500).json({ message: 'Error en el servidor al obtener las tareas.' });
    }

    // Si todo va bien, enviamos los datos de las tareas con un estado 200 (OK)
    res.status(200).json(tasks);
  } catch (err) {
    // Capturamos cualquier otro error inesperado
    logger.error('Unexpected error in getTasks:', err);
    res.status(500).json({ message: 'Error inesperado en el servidor.' });
  }
};