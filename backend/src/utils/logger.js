// logger.js - Utilidades de logging
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