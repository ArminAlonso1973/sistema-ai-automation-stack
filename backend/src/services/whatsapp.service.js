// whatsapp.service.js - Servicio para WhatsApp
import axios from 'axios';

class WhatsAppService {
  constructor() {
    this.apiUrl = 'https://graph.facebook.com/v18.0';
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  }

  // Enviar mensaje de texto
  async enviarMensaje(telefono, mensaje, token = this.accessToken) {
    const url = `${this.apiUrl}/${process.env.WHATSAPP_PHONE_ID}/messages`;
    
    try {
      const response = await axios.post(
        url,
        {
          messaging_product: 'whatsapp',
          to: telefono,
          text: { body: mensaje }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log(`✅ Mensaje enviado a ${telefono}`);
      return response.data;
      
    } catch (error) {
      console.error('❌ Error enviando mensaje:', error.response?.data);
      throw error;
    }
  }

  // Procesar webhook entrante
  async processWebhook(webhookData) {
    try {
      const entry = webhookData.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      
      if (value?.messages) {
        return value.messages.map(message => ({
          from: message.from,
          text: message.text?.body || '',
          timestamp: message.timestamp,
          type: message.type
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error procesando webhook:', error);
      return [];
    }
  }

  // Marcar mensaje como leído
  async marcarLeido(messageId, token = this.accessToken) {
    const url = `${this.apiUrl}/${process.env.WHATSAPP_PHONE_ID}/messages`;
    
    await axios.post(
      url,
      {
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

export default new WhatsAppService();