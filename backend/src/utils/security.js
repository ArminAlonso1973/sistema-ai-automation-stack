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