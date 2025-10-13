// security.js - Utilidades de seguridad
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