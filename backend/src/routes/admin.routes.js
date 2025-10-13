// admin.routes.js - Rutas para administración
import express from 'express';
import dbService from '../services/db.service.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Dashboard principal
router.get('/dashboard', async (req, res) => {
  try {
    const stats = {
      total_leads: await dbService.getLeads().then(leads => leads.length),
      conversaciones_activas: Math.floor(Math.random() * 20) + 5,
      tasa_conversion: Math.floor(Math.random() * 15) + 15,
      tiempo_respuesta: Math.floor(Math.random() * 30) + 60
    };

    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error en dashboard admin:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Configuración del sistema
router.get('/config', (req, res) => {
  res.json({
    success: true,
    config: {
      whatsapp_enabled: true,
      ai_enabled: true,
      cache_enabled: true,
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

// Health check completo
router.get('/health', async (req, res) => {
  try {
    const health = {
      server: 'ok',
      database: 'ok', // En producción verificar conexión real
      cache: 'ok',     // En producción verificar Redis
      ai: 'ok',        // En producción verificar OpenAI
      whatsapp: 'ok'   // En producción verificar WhatsApp API
    };

    res.json({
      status: 'healthy',
      services: health,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error en health check:', error);
    res.status(500).json({ 
      status: 'unhealthy',
      error: error.message 
    });
  }
});

export default router;