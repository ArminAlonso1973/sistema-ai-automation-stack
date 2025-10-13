// whatsapp.routes.js - Rutas para WhatsApp
// routes/whatsapp.routes.js
import express from 'express';
import securityService from '../utils/security.js';
import whatsappService from '../services/whatsapp.service.js';
import aiService from '../services/ai.service.js';
import dbService from '../services/db.service.js';
import logger from '../utils/logger.js';

const router = express.Router();

// GET /webhook/whatsapp (verificación)
router.get('/', (req, res) => {
  try {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && securityService.validateVerifyToken(token)) {
        logger.info('Webhook verificado correctamente');
        return res.status(200).send(challenge);
      } else {
        logger.warn('Token de verificación incorrecto');
        return res.status(403).send('Forbidden');
      }
    }

    res.status(400).send('Bad Request');
  } catch (error) {
    logger.error('Error en verificación webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST /webhook/whatsapp (recibir mensajes)
router.post('/', async (req, res) => {
  try {
    const body = req.body;

    // Verificar firma de WhatsApp
    const signature = req.headers['x-hub-signature-256'];
    if (!securityService.validateWhatsAppSignature(JSON.stringify(body), signature)) {
      logger.warn('Firma de webhook inválida');
      return res.status(403).send('Forbidden');
    }

    // Procesar webhook
    const messages = await whatsappService.processWebhook(body);
    
    for (const message of messages) {
      try {
        // Clasificar el lead
        const urgencia = await aiService.classifyLead(message.text);
        
        // Generar respuesta automática
        const contexto = await dbService.getClientConfig(message.from);
        const respuesta = await aiService.generateResponse(message.text, contexto);
        
        // Enviar respuesta
        await whatsappService.enviarMensaje(message.from, respuesta);
        
        // Guardar conversación
        await dbService.guardarConversacion(message.from, message.text, respuesta, urgencia);
        
        logger.info(`Mensaje procesado para ${message.from}`);
      } catch (error) {
        logger.error('Error procesando mensaje individual:', error);
      }
    }

    res.status(200).send('EVENT_RECEIVED');
  } catch (error) {
    logger.error('Error procesando webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;