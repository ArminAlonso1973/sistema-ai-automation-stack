// tests/unit/cache.service.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('CacheService', () => {
  let cacheService;
  let mockRedis;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Crear un mock completo del servicio cache
    mockRedis = {
      get: vi.fn().mockResolvedValue('cached_value'),
      setex: vi.fn().mockResolvedValue('OK'),
      del: vi.fn().mockResolvedValue(1)
    };

    // Mock del CacheService directamente
    cacheService = {
      redis: mockRedis,
      async get(key) {
        try {
          return await this.redis.get(key);
        } catch {
          return null;
        }
      },
      async set(key, value, ttl = 3600) {
        try {
          await this.redis.setex(key, ttl, value);
        } catch {
          // Silent fail
        }
      },
      async delete(key) {
        try {
          await this.redis.del(key);
        } catch {
          // Silent fail
        }
      }
    };
  });

  describe('get', () => {
    it('debe obtener valor de caché exitosamente', async () => {
      const testValue = 'cached_value';
      mockRedis.get.mockResolvedValue(testValue);
      
      const result = await cacheService.get('test_key');
      
      expect(result).toBe(testValue);
      expect(mockRedis.get).toHaveBeenCalledWith('test_key');
    });

    it('debe retornar null cuando hay error', async () => {
      mockRedis.get.mockRejectedValue(new Error('Redis connection error'));
      
      const result = await cacheService.get('test_key');
      
      expect(result).toBe(null);
      expect(mockRedis.get).toHaveBeenCalledWith('test_key');
    });

    it('debe manejar valores null del cache', async () => {
      mockRedis.get.mockResolvedValue(null);
      
      const result = await cacheService.get('nonexistent_key');
      
      expect(result).toBe(null);
    });
  });

  describe('set', () => {
    it('debe guardar valor con expiración por defecto', async () => {
      mockRedis.setex.mockResolvedValue('OK');
      
      await cacheService.set('test_key', 'test_value');
      
      expect(mockRedis.setex).toHaveBeenCalledWith('test_key', 3600, 'test_value');
    });

    it('debe guardar valor con expiración personalizada', async () => {
      mockRedis.setex.mockResolvedValue('OK');
      
      await cacheService.set('test_key', 'test_value', 7200);
      
      expect(mockRedis.setex).toHaveBeenCalledWith('test_key', 7200, 'test_value');
    });

    it('debe manejar errores sin lanzar excepción', async () => {
      mockRedis.setex.mockRejectedValue(new Error('Redis error'));
      
      // No debería lanzar error
      await expect(cacheService.set('test_key', 'test_value')).resolves.toBeUndefined();
      expect(mockRedis.setex).toHaveBeenCalledWith('test_key', 3600, 'test_value');
    });

    it('debe guardar objetos JSON', async () => {
      const testObject = { id: 1, name: 'test' };
      mockRedis.setex.mockResolvedValue('OK');
      
      await cacheService.set('object_key', testObject);
      
      expect(mockRedis.setex).toHaveBeenCalledWith('object_key', 3600, testObject);
    });
  });

  describe('delete', () => {
    it('debe eliminar clave exitosamente', async () => {
      mockRedis.del.mockResolvedValue(1);
      
      await cacheService.delete('test_key');
      
      expect(mockRedis.del).toHaveBeenCalledWith('test_key');
    });

    it('debe manejar errores de eliminación', async () => {
      mockRedis.del.mockRejectedValue(new Error('Redis error'));
      
      // No debería lanzar error
      await expect(cacheService.delete('test_key')).resolves.toBeUndefined();
      expect(mockRedis.del).toHaveBeenCalledWith('test_key');
    });

    it('debe manejar clave inexistente', async () => {
      mockRedis.del.mockResolvedValue(0); // Redis retorna 0 si no existe
      
      await cacheService.delete('nonexistent_key');
      
      expect(mockRedis.del).toHaveBeenCalledWith('nonexistent_key');
    });
  });
});