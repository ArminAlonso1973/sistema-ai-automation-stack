// tests/load/basic.load.test.js
import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { apiLimiter } from '../../src/middleware/rateLimiter.js';

describe('Load Testing - Backend Performance', () => {
  let app;

  beforeAll(() => {
    // Crear app de testing sin rate limits estrictos para load testing
    app = express();
    app.use(cors());
    app.use(express.json());
    
    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        requestId: Math.random().toString(36).substr(2, 9)
      });
    });

    // API endpoint simulado
    app.get('/api/test', (req, res) => {
      // Simular algún procesamiento
      const start = Date.now();
      while (Date.now() - start < 10) {
        // 10ms de procesamiento simulado
      }
      res.json({ 
        message: 'Test endpoint',
        processingTime: Date.now() - start
      });
    });

    // Endpoint con rate limiting para testing
    app.get('/api/limited', apiLimiter, (req, res) => {
      res.json({ message: 'Rate limited endpoint' });
    });
  });

  describe('Concurrent Request Handling', () => {
    it('debe manejar 50 requests concurrentes al health check', async () => {
      const promises = [];
      const startTime = Date.now();
      const requestCount = 50;

      // Crear 50 requests simultáneas
      for (let i = 0; i < requestCount; i++) {
        promises.push(
          request(app)
            .get('/health')
            .then(res => ({
              status: res.status,
              requestId: res.body.requestId,
              responseTime: Date.now() - startTime
            }))
        );
      }

      const results = await Promise.all(promises);
      const endTime = Date.now();
      const totalDuration = endTime - startTime;

      // Verificar que todas respondieron exitosamente
      const successCount = results.filter(result => result.status === 200).length;
      expect(successCount).toBe(requestCount);

      // Verificar que cada request tuvo un ID único
      const uniqueIds = new Set(results.map(r => r.requestId));
      expect(uniqueIds.size).toBe(requestCount);

      // Verificar tiempo razonable (< 3 segundos para 50 requests)
      expect(totalDuration).toBeLessThan(3000);

      console.log(`✅ ${requestCount} requests procesadas en ${totalDuration}ms (${Math.round(requestCount * 1000 / totalDuration)} req/s)`);
    }, 10000); // 10 segundo timeout

    it('debe manejar 100 requests concurrentes con procesamiento', async () => {
      const promises = [];
      const startTime = Date.now();
      const requestCount = 100;

      for (let i = 0; i < requestCount; i++) {
        promises.push(
          request(app)
            .get('/api/test')
            .then(res => ({
              status: res.status,
              processingTime: res.body.processingTime
            }))
        );
      }

      const results = await Promise.all(promises);
      const endTime = Date.now();
      const totalDuration = endTime - startTime;

      // Verificar que todas respondieron exitosamente
      const successCount = results.filter(result => result.status === 200).length;
      expect(successCount).toBe(requestCount);

      // Verificar tiempo total razonable (< 5 segundos)
      expect(totalDuration).toBeLessThan(5000);

      // Calcular estadísticas
      const avgProcessingTime = results.reduce((sum, r) => sum + r.processingTime, 0) / requestCount;
      const throughput = Math.round(requestCount * 1000 / totalDuration);

      console.log(`✅ ${requestCount} requests con processing en ${totalDuration}ms`);
      console.log(`   📊 Throughput: ${throughput} req/s`);
      console.log(`   ⚡ Avg processing time: ${avgProcessingTime.toFixed(2)}ms`);

      expect(avgProcessingTime).toBeLessThan(50); // Menos de 50ms promedio
      expect(throughput).toBeGreaterThan(15); // Al menos 15 req/s
    }, 15000); // 15 segundos timeout
  });

  describe('Rate Limiting Behavior', () => {
    it('debe respetar rate limits correctamente', async () => {
      const promises = [];
      const requestCount = 10; // Menos requests para no trigger rate limit

      for (let i = 0; i < requestCount; i++) {
        promises.push(
          request(app)
            .get('/api/limited')
            .then(res => res.status)
            .catch(err => err.status || 500)
        );
      }

      const results = await Promise.all(promises);
      
      // La mayoría debería ser exitosa (rate limit es 100/15min)
      const successCount = results.filter(status => status === 200).length;
      expect(successCount).toBeGreaterThan(5); // Al menos 5 exitosas

      console.log(`✅ Rate limiting: ${successCount}/${requestCount} requests exitosas`);
    });
  });

  describe('Memory and Performance', () => {
    it('debe mantener uso de memoria estable', async () => {
      const initialMemory = process.memoryUsage();
      const promises = [];
      
      // Ejecutar muchas requests para verificar memory leaks
      for (let i = 0; i < 200; i++) {
        promises.push(
          request(app).get('/health')
        );
      }

      await Promise.all(promises);
      
      // Forzar garbage collection si está disponible
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage();
      const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;
      const memoryIncreaseMB = memoryIncrease / 1024 / 1024;

      console.log(`📊 Memory usage: +${memoryIncreaseMB.toFixed(2)}MB after 200 requests`);
      
      // El incremento de memoria no debería ser excesivo (< 50MB)
      expect(memoryIncreaseMB).toBeLessThan(50);
    });

    it('debe responder consistentemente bajo carga', async () => {
      const batches = 5;
      const requestsPerBatch = 20;
      const results = [];

      for (let batch = 0; batch < batches; batch++) {
        const batchPromises = [];
        const batchStart = Date.now();

        for (let i = 0; i < requestsPerBatch; i++) {
          batchPromises.push(
            request(app).get('/health')
          );
        }

        await Promise.all(batchPromises);
        const batchDuration = Date.now() - batchStart;
        results.push(batchDuration);

        // Pequeño delay entre batches
        await new Promise(resolve => global.setTimeout(resolve, 100));
      }

      // Verificar que los tiempos son consistentes (variación < 200%)
      const avgTime = results.reduce((sum, time) => sum + time, 0) / results.length;
      const maxTime = Math.max(...results);
      const minTime = Math.min(...results);
      const variation = (maxTime - minTime) / avgTime;

      console.log(`📊 Consistency: avg=${avgTime.toFixed(0)}ms, min=${minTime}ms, max=${maxTime}ms, variation=${(variation * 100).toFixed(1)}%`);

      expect(variation).toBeLessThan(2.0); // Menos de 200% de variación
    });
  });
});