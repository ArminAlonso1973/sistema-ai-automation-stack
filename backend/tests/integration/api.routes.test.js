// tests/integration/api.routes.test.js
import { describe, it, expect, beforeAll, vi } from 'vitest';
import request from 'supertest';
import express from 'express';

// Mock services before importing routes
vi.mock('../../src/services/db.service.js', () => ({
  default: {
    getConversations: vi.fn().mockResolvedValue([
      { id: 1, from: '+56912345678', message: 'Test', timestamp: '2024-01-01' }
    ]),
    getLeads: vi.fn().mockResolvedValue([
      { id: 1, email: 'test@example.com', estado: 'nuevo', urgencia: 'alta' }
    ])
  }
}));

vi.mock('../../src/services/ai.service.js', () => ({
  default: {
    generateResponse: vi.fn().mockResolvedValue('Respuesta de prueba del bot')
  }
}));

vi.mock('../../src/utils/logger.js', () => ({
  default: {
    error: vi.fn()
  }
}));

import apiRoutes from '../../src/routes/api.routes.js';

describe('API Routes Integration', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api', apiRoutes);
  });

  describe('GET /api/stats', () => {
    it('debe retornar estadísticas del cliente', async () => {
      const response = await request(app)
        .get('/api/stats')
        .query({ cliente_id: 'test_123' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('mensajes_hoy');
      expect(response.body).toHaveProperty('leads_nuevos');
      expect(response.body).toHaveProperty('propuestas_mes');
      expect(response.body).toHaveProperty('tasa_respuesta');
      
      // Verificar que son números
      expect(typeof response.body.mensajes_hoy).toBe('number');
      expect(typeof response.body.leads_nuevos).toBe('number');
      expect(typeof response.body.tasa_respuesta).toBe('number');
    });

    it('debe requerir cliente_id', async () => {
      const response = await request(app).get('/api/stats');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'cliente_id requerido');
    });
  });

  describe('GET /api/conversations/recent', () => {
    it('debe retornar conversaciones con límite', async () => {
      const response = await request(app)
        .get('/api/conversations/recent')
        .query({ cliente_id: 'test_123', limit: 5 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('debe usar límite por defecto', async () => {
      const response = await request(app)
        .get('/api/conversations/recent')
        .query({ cliente_id: 'test_123' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/leads', () => {
    it('debe retornar todos los leads sin filtros', async () => {
      const response = await request(app)
        .get('/api/leads')
        .query({ cliente_id: 'test_123' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('debe filtrar por estado', async () => {
      const response = await request(app)
        .get('/api/leads')
        .query({ cliente_id: 'test_123', estado: 'nuevo' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
    });

    it('debe filtrar por urgencia', async () => {
      const response = await request(app)
        .get('/api/leads')
        .query({ cliente_id: 'test_123', urgencia: 'alta' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
    });
  });

  describe('GET /api/whatsapp/stats', () => {
    it('debe retornar estadísticas de WhatsApp', async () => {
      const response = await request(app)
        .get('/api/whatsapp/stats')
        .query({ cliente_id: 'test_123' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('conversaciones_hoy');
      expect(response.body).toHaveProperty('tiempo_promedio');
      expect(response.body).toHaveProperty('satisfaccion');
      
      // Verificar tipos de datos
      expect(typeof response.body.conversaciones_hoy).toBe('number');
      expect(typeof response.body.tiempo_promedio).toBe('number');
      expect(typeof response.body.satisfaccion).toBe('number');
    });
  });

  describe('POST /api/whatsapp/test', () => {
    it('debe generar respuesta de prueba', async () => {
      const response = await request(app)
        .post('/api/whatsapp/test')
        .query({ cliente_id: 'test_123' })
        .send({ mensaje: '¿Horario?' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('respuesta');
      expect(typeof response.body.respuesta).toBe('string');
      expect(response.body.respuesta.length).toBeGreaterThan(0);
    });

    it('debe usar cliente_id por defecto', async () => {
      const response = await request(app)
        .post('/api/whatsapp/test')
        .send({ mensaje: 'Hola' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('respuesta');
    });

    it('debe requerir mensaje', async () => {
      const response = await request(app)
        .post('/api/whatsapp/test')
        .query({ cliente_id: 'test_123' })
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Mensaje requerido');
    });
  });
});