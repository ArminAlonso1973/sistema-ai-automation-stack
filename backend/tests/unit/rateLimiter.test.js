// tests/unit/rateLimiter.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { apiLimiter, webhookLimiter, adminLimiter } from '../../src/middleware/rateLimiter.js';

describe('Rate Limiter Middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  describe('API Rate Limiter', () => {
    beforeEach(() => {
      app.use('/api', apiLimiter);
      app.get('/api/test', (req, res) => {
        res.json({ message: 'API endpoint' });
      });
    });

    it('debe permitir requests dentro del límite', async () => {
      const responses = [];
      
      // Hacer 5 requests (bien dentro del límite de 100/15min)
      for (let i = 0; i < 5; i++) {
        const response = await request(app).get('/api/test');
        responses.push(response);
      }

      // Todas deberían ser exitosas
      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('API endpoint');
      });

      // Verificar headers de rate limiting
      const lastResponse = responses[responses.length - 1];
      expect(lastResponse.headers['ratelimit-limit']).toBeDefined();
      expect(lastResponse.headers['ratelimit-remaining']).toBeDefined();
    });

    it('debe incluir headers informativos de rate limiting', async () => {
      const response = await request(app).get('/api/test');
      
      expect(response.status).toBe(200);
      expect(response.headers['ratelimit-limit']).toBe('100');
      expect(response.headers['ratelimit-policy']).toBeDefined();
      expect(parseInt(response.headers['ratelimit-remaining'])).toBeLessThanOrEqual(100);
    });
  });

  describe('Webhook Rate Limiter', () => {
    beforeEach(() => {
      app.use('/webhook', webhookLimiter);
      app.post('/webhook/test', (req, res) => {
        res.json({ message: 'Webhook processed' });
      });
    });

    it('debe permitir webhooks dentro del límite', async () => {
      const responses = [];
      
      // Hacer 5 webhooks (dentro del límite de 30/min)
      for (let i = 0; i < 5; i++) {
        const response = await request(app)
          .post('/webhook/test')
          .send({ data: `test_${i}` });
        responses.push(response);
      }

      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Webhook processed');
      });
    });

    it('debe tener límite más restrictivo que API general', async () => {
      const response = await request(app)
        .post('/webhook/test')
        .send({ data: 'test' });
      
      expect(response.status).toBe(200);
      expect(response.headers['ratelimit-limit']).toBe('30');
      
      const remaining = parseInt(response.headers['ratelimit-remaining']);
      expect(remaining).toBeLessThanOrEqual(30);
    });
  });

  describe('Admin Rate Limiter', () => {
    beforeEach(() => {
      app.use('/admin', adminLimiter);
      app.get('/admin/dashboard', (req, res) => {
        res.json({ message: 'Admin dashboard' });
      });
    });

    it('debe permitir acceso admin dentro del límite', async () => {
      const response = await request(app).get('/admin/dashboard');
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Admin dashboard');
      expect(response.headers['ratelimit-limit']).toBe('20');
    });

    it('debe tener el límite más restrictivo', async () => {
      const response = await request(app).get('/admin/dashboard');
      
      expect(response.headers['ratelimit-limit']).toBe('20'); // Más restrictivo que API (100)
      expect(parseInt(response.headers['ratelimit-remaining'])).toBeLessThanOrEqual(20);
    });
  });

  describe('Rate Limiter Error Handling', () => {
    it('debe retornar error 429 con mensaje apropiado', async () => {
      // Crear un rate limiter muy restrictivo para testing
      const restrictiveLimiter = (await import('express-rate-limit')).default({
        windowMs: 1000, // 1 segundo
        max: 1, // Solo 1 request
        message: { error: 'Test rate limit' }
      });

      app.use('/restricted', restrictiveLimiter);
      app.get('/restricted/test', (req, res) => {
        res.json({ message: 'Success' });
      });

      // Primera request debería ser exitosa
      const firstResponse = await request(app).get('/restricted/test');
      expect(firstResponse.status).toBe(200);

      // Segunda request inmediata debería ser rechazada
      const secondResponse = await request(app).get('/restricted/test');
      expect(secondResponse.status).toBe(429);
      expect(secondResponse.body.error).toBe('Test rate limit');
    });
  });

  describe('Rate Limiter Performance', () => {
    beforeEach(() => {
      app.use('/perf', apiLimiter);
      app.get('/perf/test', (req, res) => {
        res.json({ timestamp: Date.now() });
      });
    });

    it('no debe agregar latencia significativa', async () => {
      const measurements = [];
      
      for (let i = 0; i < 10; i++) {
        const start = Date.now();
        await request(app).get('/perf/test');
        const duration = Date.now() - start;
        measurements.push(duration);
      }

      const avgLatency = measurements.reduce((sum, m) => sum + m, 0) / measurements.length;
      
      // Rate limiting no debería agregar más de 50ms en promedio
      expect(avgLatency).toBeLessThan(50);
      
      console.log(`📊 Rate limiter avg latency: ${avgLatency.toFixed(1)}ms`);
    });
  });
});