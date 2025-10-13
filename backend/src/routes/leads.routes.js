// leads.routes.js - Rutas para leads
// routes/leads.routes.js
import express from 'express';
import aiService from '../services/ai.service.js';
import dbService from '../services/db.service.js';
import logger from '../utils/logger.js';

const router = express.Router();

// POST /webhook/leads
router.post('/', async (req, res) => {
  try {
    const { email, mensaje, cliente_id, telefono } = req.body;

    // Validar datos requeridos
    if (!email || !mensaje) {
      return res.status(400).json({ 
        error: 'Email y mensaje son requeridos',
        received: { email: !!email, mensaje: !!mensaje }
      });
    }

    // Clasificar urgencia del lead
    const urgencia = await aiService.classifyLead(mensaje, { email, telefono });
    
    // Crear lead en base de datos
    const leadData = {
      email,
      mensaje,
      cliente_id: cliente_id || 'default',
      telefono,
      urgencia,
      estado: 'nuevo',
      created_at: new Date().toISOString()
    };

    const lead = await dbService.createLead(leadData);
    
    logger.info(`Lead creado: ${lead.id} - Urgencia: ${urgencia}`);

    res.status(200).json({
      success: true,
      lead_id: lead.id,
      urgencia,
      mensaje: 'Lead procesado correctamente'
    });

  } catch (error) {
    logger.error('Error procesando lead:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /webhook/leads (para testing)
router.get('/', (req, res) => {
  res.json({ 
    status: 'active',
    message: 'Webhook de leads funcionando',
    endpoints: {
      'POST /': 'Crear nuevo lead'
    }
  });
});

export default router;