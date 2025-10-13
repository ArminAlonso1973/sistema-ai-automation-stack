// whatsapp.service.js - Servicio para WhatsApp
// services/whatsapp.service.js
const axios = require('axios')

class WhatsAppService {
  
  constructor() {
    this.apiUrl = 'https://graph.facebook.com/v18.0'
  }

  // Enviar mensaje de texto
  async enviarMensaje(telefono, mensaje, token) {
    const url = `${this.apiUrl}/${process.env.WHATSAPP_PHONE_ID}/messages`
    
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
      )
      
      console.log(`✅ Mensaje enviado a ${telefono}`)
      return response.data
      
    } catch (error) {
      console.error(`❌ Error enviando mensaje:`, error.response?.data)
      throw error
    }
  }

  // Marcar mensaje como leído
  async marcarLeido(messageId, token) {
    const url = `${this.apiUrl}/${process.env.WHATSAPP_PHONE_ID}/messages`
    
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
    )
  }
}

module.exports = new WhatsAppService()