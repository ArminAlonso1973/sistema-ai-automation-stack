import fetch from 'node-fetch';

class CacheService {
  constructor() {
    this.restUrl = process.env.UPSTASH_REDIS_REST_URL || 'https://mock-redis.upstash.io';
    this.restToken = process.env.UPSTASH_REDIS_REST_TOKEN || 'mock-redis-token';
    
    if (this.restToken === 'test-redis-token' || this.restToken === 'mock-redis-token') {
      console.log('[DEV] Cache Service initialized with mocks');
      this.mockMode = true;
      this.mockCache = new Map();
    } else {
      this.mockMode = false;
    }
  }

  async set(key, value, ttl = 3600) {
    if (this.mockMode) {
      console.log(`[DEV] Mock cache SET: ${key} = ${JSON.stringify(value)}`);
      this.mockCache.set(key, { value, expiry: Date.now() + (ttl * 1000) });
      return { success: true };
    }

    try {
      const response = await fetch(`${this.restUrl}/set/${key}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.restToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: JSON.stringify(value), ex: ttl })
      });

      return { success: response.ok };
    } catch (error) {
      console.error('Error setting cache:', error);
      return { success: false, error: error.message };
    }
  }

  async get(key) {
    if (this.mockMode) {
      const cached = this.mockCache.get(key);
      if (!cached) {
        console.log(`[DEV] Mock cache MISS: ${key}`);
        return { success: true, data: null };
      }
      
      if (cached.expiry < Date.now()) {
        this.mockCache.delete(key);
        console.log(`[DEV] Mock cache EXPIRED: ${key}`);
        return { success: true, data: null };
      }
      
      console.log(`[DEV] Mock cache HIT: ${key}`);
      return { success: true, data: cached.value };
    }

    try {
      const response = await fetch(`${this.restUrl}/get/${key}`, {
        headers: {
          'Authorization': `Bearer ${this.restToken}`
        }
      });

      if (!response.ok) {
        return { success: true, data: null };
      }

      const data = await response.json();
      return { 
        success: true, 
        data: data.result ? JSON.parse(data.result) : null 
      };
    } catch (error) {
      console.error('Error getting cache:', error);
      return { success: false, error: error.message };
    }
  }

  async del(key) {
    if (this.mockMode) {
      console.log(`[DEV] Mock cache DEL: ${key}`);
      this.mockCache.delete(key);
      return { success: true };
    }

    try {
      const response = await fetch(`${this.restUrl}/del/${key}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.restToken}`
        }
      });

      return { success: response.ok };
    } catch (error) {
      console.error('Error deleting cache:', error);
      return { success: false, error: error.message };
    }
  }

  async exists(key) {
    if (this.mockMode) {
      const exists = this.mockCache.has(key);
      console.log(`[DEV] Mock cache EXISTS: ${key} = ${exists}`);
      return { success: true, exists };
    }

    try {
      const response = await fetch(`${this.restUrl}/exists/${key}`, {
        headers: {
          'Authorization': `Bearer ${this.restToken}`
        }
      });

      const data = await response.json();
      return { success: true, exists: data.result === 1 };
    } catch (error) {
      console.error('Error checking cache existence:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new CacheService();