// tests/integration/leads.routes.test.js
import { describe, it, expect, beforeAll, vi } from 'vitest';
import request from 'supertest';
import express from 'express';

// Mock services before importing routes
vi.mock('../../src/services/ai.service.js', () => ({
  default: {
    classifyLead: vi.fn().mockResolvedValue('HOT')
  }
}));

vi.mock('../../src/services/db.service.js', () => ({
  default: {
    createLead: vi.fn().mockResolvedValue({ id: 'lead_123' })
  }
}));

vi.mock('../../src/utils/logger.js', () => ({
  default: {
    info: vi.fn(),
    error: vi.fn()
  }
}));

import leadsRoutes from '../../src/routes/leads.routes.js';

describe('Leads Routes Integration', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/webhook/leads', leadsRoutes);
  });

  describe('POST /webhook/leads', () => {
    it('debe procesar lead válido', async () => {
      const leadData = {
        email: 'test@example.com',
        mensaje: 'Quiero más información',
        cliente_id: 'test_123',
        telefono: '+56912345678'
      };

      const response = await request(app)
        .post('/webhook/leads')
        .send(leadData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('lead_id');
      expect(response.body).toHaveProperty('urgencia');
      expect(['HOT', 'WARM', 'COLD']).toContain(response.body.urgencia);
    });

    it('debe rechazar lead sin email', async () => {
      const response = await request(app)
        .post('/webhook/leads')
        .send({ mensaje: 'Test message' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Email y mensaje son requeridos');
    });

    it('debe rechazar lead sin mensaje', async () => {
      const response = await request(app)
        .post('/webhook/leads')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('debe clasificar urgencia correctamente', async () => {
      const leadUrgente = {
        email: 'urgente@example.com',
        mensaje: '¡URGENTE! Necesito cotización hoy',
        cliente_id: 'test_123'
      };

      const response = await request(app)
        .post('/webhook/leads')
        .send(leadUrgente);

      expect(response.status).toBe(200);
      expect(response.body.urgencia).toMatch(/HOT|WARM|COLD/);
    });

    it('debe usar cliente_id por defecto si no se proporciona', async () => {
      const leadData = {
        email: 'test@example.com',
        mensaje: 'Mensaje de prueba'
      };

      const response = await request(app)
        .post('/webhook/leads')
        .send(leadData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
    });
  });

  describe('GET /webhook/leads', () => {
    it('debe retornar información del webhook', async () => {
      const response = await request(app).get('/webhook/leads');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'active');
      expect(response.body).toHaveProperty('endpoints');
    });
  });
});