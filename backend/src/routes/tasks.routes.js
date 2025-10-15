import { Router } from 'express';
import { getTasks } from '../controllers/tasks.controller.js';

// Creamos una nueva instancia del enrutador de Express
const router = Router();

// Definimos la ruta para obtener las tareas.
// Cuando se reciba una solicitud GET a la URL raíz ('/'),
// se ejecutará la función getTasks que importamos del controlador.
router.get('/', getTasks);

// Exportamos el enrutador para que pueda ser utilizado por la aplicación principal
export default router;