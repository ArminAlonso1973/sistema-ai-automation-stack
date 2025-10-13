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