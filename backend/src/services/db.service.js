// db.service.js - Servicio para base de datos
// services/cache.service.js
const { Redis } = require('@upstash/redis')

class CacheService {
  
  constructor() {
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_URL,
      token: process.env.UPSTASH_REDIS_TOKEN
    })
  }

  // Obtener valor
  async get(key) {
    try {
      return await this.redis.get(key)
    } catch (error) {
      console.error('Error en caché GET:', error)
      return null
    }
  }

  // Guardar valor con expiración
  async set(key, value, expirationSeconds = 3600) {
    try {
      await this.redis.setex(key, expirationSeconds, value)
    } catch (error) {
      console.error('Error en caché SET:', error)
    }
  }

  // Eliminar valor
  async delete(key) {
    try {
      await this.redis.del(key)
    } catch (error) {
      console.error('Error en caché DELETE:', error)
    }q
  }
}

module.exports = new CacheService()