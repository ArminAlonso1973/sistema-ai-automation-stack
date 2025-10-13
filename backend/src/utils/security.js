// security.js - Utilidades de seguridad
import crypto from 'crypto';

class SecurityService {
  // Validar signature de WhatsApp
  validateWhatsAppSignature(payload, signature) {
    const expectedSignature = crypto
      .createHmac('sha256', process.env.WHATSAPP_APP_SECRET)
      .update(payload)
      .digest('hex');
    
    return `sha256=${expectedSignature}` === signature;
  }

  // Generar hash seguro
  generateHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  // Validar token de verificación
  validateVerifyToken(token) {
    return token === process.env.WEBHOOK_VERIFY_TOKEN;
  }
}

export default new SecurityService();
// utils/security.js
const crypto = require('crypto')

// Validar firma de webhook de WhatsApp
function validarWebhookWhatsApp(req) {
  const signature = req.headers['x-hub-signature-256']
  
  if (!signature) return false
  
  const signatureHash = signature.split('sha256=')[1]
  const expectedHash = crypto
    .createHmac('sha256', process.env.WHATSAPP_APP_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex')
  
  return signatureHash === expectedHash
}

// Sanitizar texto (prevenir XSS básico)
function sanitizarTexto(texto) {
  return texto
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .substring(0, 1000) // Límite de caracteres
}

module.exports = {
  validarWebhookWhatsApp,
  sanitizarTexto
}