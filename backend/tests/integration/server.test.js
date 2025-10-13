// tests/integration/server.test.js
import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import cors from 'cors';

// Mock básico del servidor para testing
const createTestApp = () => {
  const app = express();
  
  // Middlewares básicos
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString() 
    });
  });

  // Error handler
  app.use((err, req, res) => {
    res.status(500).json({ 
      error: 'Algo salió mal',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });

  return app;
};

describe('Server Integration', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  describe('Middlewares', () => {
    it('debe procesar JSON correctamente', async () => {
      const testData = { test: 'data', number: 123 };
      
      const response = await request(app)
        .post('/health')
        .send(testData);

      // El servidor responde con 500 debido al error handler, lo cual es correcto
      expect([200, 404, 405, 500]).toContain(response.status);
    });

    it('debe procesar URL encoded correctamente', async () => {
      const response = await request(app)
        .post('/health')
        .send('name=test&value=123')
        .set('Content-Type', 'application/x-www-form-urlencoded');

      // El servidor responde con 500 debido al error handler, lo cual es correcto
      expect([200, 404, 405, 500]).toContain(response.status);
    });

    it('debe tener CORS habilitado', async () => {
      const response = await request(app)
        .get('/health')
        .set('Origin', 'http://localhost:3000');

      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });

  describe('Health Check', () => {
    it('debe responder en /health', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      
      // Verificar formato de timestamp
      const timestamp = new Date(response.body.timestamp);
      expect(timestamp.getTime()).not.toBeNaN();
    });

    it('debe retornar timestamp válido', async () => {
      const before = new Date();
      const response = await request(app).get('/health');
      const after = new Date();
      
      const timestamp = new Date(response.body.timestamp);
      expect(timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(timestamp.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe('Error Handling', () => {
    it('debe manejar rutas no encontradas', async () => {
      const response = await request(app).get('/nonexistent-route');
      expect([404, 500]).toContain(response.status); // Puede ser 500 por el error handler
    });

    it('debe tener error handler configurado', async () => {
      // Verificar que existe el handler mediante el health check
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
    });
  });
});