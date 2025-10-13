// logger.js - Utilidades de logging
class Logger {
  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  info(message, meta = {}) {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`, meta);
  }

  error(message, error = {}) {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error);
  }

  warn(message, meta = {}) {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`, meta);
  }

  debug(message, meta = {}) {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${new Date().toISOString()}: ${message}`, meta);
    }
  }
}

export default new Logger();
// utils/logger.js
class Logger {
  
  info(mensaje, data = {}) {
    console.log(`ℹ️ ${new Date().toISOString()} - ${mensaje}`, data)
  }

  error(mensaje, error = {}) {
    console.error(`❌ ${new Date().toISOString()} - ${mensaje}`, error)
  }

  success(mensaje, data = {}) {
    console.log(`✅ ${new Date().toISOString()} - ${mensaje}`, data)
  }

  warn(mensaje, data = {}) {
    console.warn(`⚠️ ${new Date().toISOString()} - ${mensaje}`, data)
  }
}

module.exports = new Logger()