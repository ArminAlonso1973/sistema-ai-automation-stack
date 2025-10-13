// backend/src/middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

// Rate limiter para APIs generales
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por IP
  message: {
    error: 'Demasiadas peticiones desde esta IP',
    retryAfter: '15 minutos'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      error: 'Rate limit exceeded',
      message: 'Demasiadas peticiones desde esta IP, intenta de nuevo en 15 minutos'
    });
  }
});

// Rate limiter específico para webhooks (más restrictivo)
export const webhookLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 30, // 30 webhooks por minuto máximo
  message: {
    error: 'Webhook rate limit excedido',
    retryAfter: '1 minuto'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Webhook rate limit exceeded',
      message: 'Demasiados webhooks, intenta de nuevo en 1 minuto'
    });
  }
});

// Rate limiter muy permisivo para health checks
export const healthLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 60, // 1 request por segundo máximo
  message: {
    error: 'Health check rate limit excedido'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter estricto para admin endpoints
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // Solo 20 requests admin por 15 minutos
  message: {
    error: 'Admin rate limit excedido',
    retryAfter: '15 minutos'
  },
  standardHeaders: true,
  legacyHeaders: false
});