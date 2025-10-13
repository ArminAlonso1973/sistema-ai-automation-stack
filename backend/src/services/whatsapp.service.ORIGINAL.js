import fetch from 'node-fetch';

class WhatsAppService {
  constructor() {
    this.token = process.env.WHATSAPP_TOKEN || 'mock-whatsapp-token';
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || 'mock-phone-id';
    this.verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'mock-verify-token';
    
    if (this.token === 'test-whatsapp-token' || this.token === 'mock-whatsapp-token') {
      console.log('[DEV] WhatsApp Service initialized with mocks');
      this.mockMode = true;
    } else {
      this.mockMode = false;
    }
  }

  async sendMessage(to, message) {
    if (this.mockMode) {
      console.log(`[DEV] Mock WhatsApp message to ${to}: ${message}`);
      return {
        success: true,
        messageId: `mock_msg_${Date.now()}`,
        data: {
          messaging_product: 'whatsapp',
          contacts: [{ input: to, wa_id: to }],
          messages: [{ id: `mock_msg_${Date.now()}` }]
        }
      };
    }

    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          type: 'text',
          text: { body: message }
        })
      });

      const data = await response.json();
      return { success: true, messageId: data.messages?.[0]?.id, data };
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      return { success: false, error: error.message };
    }
  }

  verifyWebhook(mode, token, challenge) {
    console.log('[DEV] WhatsApp webhook verification:', { mode, token });
    
    if (mode === 'subscribe' && token === this.verifyToken) {
      console.log('Webhook verified successfully');
      return challenge;
    } else {
      console.log('Webhook verification failed');
      return null;
    }
  }

  parseIncomingMessage(body) {
    try {
      if (this.mockMode) {
        console.log('[DEV] Mock parseIncomingMessage');
        return {
          from: '+1234567890',
          message: 'Mensaje de prueba',
          timestamp: Date.now(),
          messageId: `mock_${Date.now()}`
        };
      }

      const entry = body.entry?.[0];
      const change = entry?.changes?.[0];
      const value = change?.value;
      const message = value?.messages?.[0];

      if (!message) return null;

      return {
        from: message.from,
        message: message.text?.body || message.type,
        timestamp: parseInt(message.timestamp),
        messageId: message.id
      };
    } catch (error) {
      console.error('Error parsing WhatsApp message:', error);
      return null;
    }
  }

  async markAsRead(messageId) {
    if (this.mockMode) {
      console.log(`[DEV] Mock mark as read: ${messageId}`);
      return { success: true };
    }

    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId
        })
      });

      return { success: response.ok };
    } catch (error) {
      console.error('Error marking message as read:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new WhatsAppService();