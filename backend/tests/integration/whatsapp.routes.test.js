// tests/integration/whatsapp.routes.test.js
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';

// Mock all services before importing routes
vi.mock('../../src/services/ai.service.js', () => ({
  default: {
    classifyLead: vi.fn().mockResolvedValue('WARM'),
    generateResponse: vi.fn().mockResolvedValue('Hola, ¿en qué puedo ayudarte?')
  }
}));

vi.mock('../../src/services/db.service.js', () => ({
  default: {
    getClientConfig: vi.fn().mockResolvedValue({ id: 'test', nombre: 'Test' }),
    guardarConversacion: vi.fn().mockResolvedValue({ id: 1 })
  }
}));

vi.mock('../../src/services/whatsapp.service.js', () => ({
  default: {
    processWebhook: vi.fn().mockResolvedValue([
      { from: '+56912345678', text: '¿Horario?', timestamp: '123', type: 'text' }
    ]),
    enviarMensaje: vi.fn().mockResolvedValue({ success: true })
  }
}));

vi.mock('../../src/utils/security.js', () => ({
  default: {
    validateVerifyToken: vi.fn().mockImplementation((token) => token === 'test_token'),
    validateWhatsAppSignature: vi.fn().mockReturnValue(true)
  }
}));

vi.mock('../../src/utils/logger.js', () => ({
  default: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}));

import whatsappRoutes from '../../src/routes/whatsapp.routes.js';

describe('WhatsApp Routes Integration', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/webhook/whatsapp', whatsappRoutes);
  });

  beforeEach(() => {
    // Configurar variables de entorno para tests
    process.env.WEBHOOK_VERIFY_TOKEN = 'test_token';
  });

  describe('GET /webhook/whatsapp (verification)', () => {
    it('debe verificar webhook con token correcto', async () => {
      const response = await request(app)
        .get('/webhook/whatsapp')
        .query({
          'hub.mode': 'subscribe',
          'hub.verify_token': 'test_token',
          'hub.challenge': 'challenge_123'
        });

      expect(response.status).toBe(200);
      expect(response.text).toBe('challenge_123');
    });

    it('debe rechazar token incorrecto', async () => {
      const response = await request(app)
        .get('/webhook/whatsapp')
        .query({
          'hub.mode': 'subscribe',
          'hub.verify_token': 'wrong_token',
          'hub.challenge': 'challenge_123'
        });

      expect(response.status).toBe(403);
    });

    it('debe retornar 400 para parámetros faltantes', async () => {
      const response = await request(app)
        .get('/webhook/whatsapp')
        .query({
          'hub.mode': 'subscribe'
          // Falta verify_token y challenge
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /webhook/whatsapp (mensajes)', () => {
    it('debe procesar mensaje válido', async () => {
      const webhookData = {
        entry: [{
          changes: [{
            value: {
              messages: [{
                from: '+56912345678',
                text: { body: '¿Horario?' },
                timestamp: '1234567890',
                type: 'text'
              }],
              metadata: { phone_number_id: '123456' }
            }
          }]
        }]
      };

      const response = await request(app)
        .post('/webhook/whatsapp')
        .send(webhookData);

      expect(response.status).toBe(200);
      expect(response.text).toBe('EVENT_RECEIVED');
    });

    it('debe ignorar webhooks sin mensajes', async () => {
      const webhookData = { 
        entry: [{ 
          changes: [{ 
            value: {} 
          }] 
        }] 
      };

      const response = await request(app)
        .post('/webhook/whatsapp')
        .send(webhookData);

      expect(response.status).toBe(200);
      expect(response.text).toBe('EVENT_RECEIVED');
    });

    it('debe manejar webhook vacío', async () => {
      const response = await request(app)
        .post('/webhook/whatsapp')
        .send({});

      expect(response.status).toBe(200);
      expect(response.text).toBe('EVENT_RECEIVED');
    });
  });
});