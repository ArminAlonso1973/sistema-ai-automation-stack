// api.routes.js - Rutas principales de API
import express from 'express';
import dbService from '../services/db.service.js';
import aiService from '../services/ai.service.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Stats generales
router.get('/stats', async (req, res) => {
  try {
    const clienteId = req.query.cliente_id;
    
    if (!clienteId) {
      return res.status(400).json({ error: 'cliente_id requerido' });
    }

    // Obtener estadísticas del cliente
    const stats = {
      mensajes_hoy: Math.floor(Math.random() * 50) + 10, // Mock data
      leads_nuevos: Math.floor(Math.random() * 20) + 5,
      propuestas_mes: Math.floor(Math.random() * 15) + 3,
      tasa_respuesta: Math.floor(Math.random() * 30) + 70
    };

    res.json(stats);
  } catch (error) {
    logger.error('Error obteniendo stats:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Conversaciones recientes
router.get('/conversations/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const conversaciones = await dbService.getConversations();
    const limitedConversations = conversaciones.slice(0, limit);

    res.json({ data: limitedConversations });
  } catch (error) {
    logger.error('Error obteniendo conversaciones:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Leads con filtros
router.get('/leads', async (req, res) => {
  try {
    const { estado, urgencia } = req.query;

    const leads = await dbService.getLeads();
    
    // Aplicar filtros si se proporcionan
    let filteredLeads = leads;
    if (estado && estado !== 'todos') {
      filteredLeads = filteredLeads.filter(lead => lead.estado === estado);
    }
    if (urgencia && urgencia !== 'todos') {
      filteredLeads = filteredLeads.filter(lead => lead.urgencia === urgencia);
    }

    res.json({ data: filteredLeads });
  } catch (error) {
    logger.error('Error obteniendo leads:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Stats de WhatsApp
router.get('/whatsapp/stats', async (req, res) => {
  try {

    const stats = {
      conversaciones_hoy: Math.floor(Math.random() * 30) + 5,
      tiempo_promedio: Math.floor(Math.random() * 60) + 30, // minutos
      satisfaccion: Math.floor(Math.random() * 20) + 80 // porcentaje
    };

    res.json(stats);
  } catch (error) {
    logger.error('Error obteniendo stats WhatsApp:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Probar bot (test endpoint)
router.post('/whatsapp/test', async (req, res) => {
  try {
    const { mensaje } = req.body;
    const clienteId = req.query.cliente_id || 'demo_cliente';

    if (!mensaje) {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    const contexto = { 
      id: clienteId, 
      nombre: 'Demo Business',
      horario: '9:00 - 18:00',
      productos: ['Servicio A', 'Servicio B']
    };
    
    const respuesta = await aiService.generateResponse(mensaje, contexto);

    res.json({ respuesta });
  } catch (error) {
    logger.error('Error probando bot:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

export default router;