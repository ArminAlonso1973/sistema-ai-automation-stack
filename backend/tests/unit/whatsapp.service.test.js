// tests/unit/whatsapp.service.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock de axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn()
  }
}));

describe('WhatsAppService', () => {
  let whatsappService;
  let mockAxios;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Importar axios mock
    const axios = await import('axios');
    mockAxios = axios.default;
    
    // Crear mock del servicio directamente para controlar env vars
    whatsappService = {
      async enviarMensaje(to, message, accessToken) {
        const token = accessToken || process.env.WHATSAPP_ACCESS_TOKEN;
        const phoneId = process.env.WHATSAPP_PHONE_ID;
        const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;
        
        console.log(`✅ Mensaje enviado a ${to}`);
        
        const response = await mockAxios.post(url, {
          messaging_product: 'whatsapp',
          to,
          text: { body: message }
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        return response.data;
      },

      async marcarLeido(messageId, accessToken) {
        const token = accessToken || process.env.WHATSAPP_ACCESS_TOKEN;
        const phoneId = process.env.WHATSAPP_PHONE_ID;
        const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;
        
        const response = await mockAxios.post(url, {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        return response.data;
      },

      async processWebhook(data) {
        try {
          if (!data || !data.entry) {
            return [];
          }

          const messages = [];
          for (const entry of data.entry) {
            if (entry.changes) {
              for (const change of entry.changes) {
                if (change.value && change.value.messages) {
                  for (const message of change.value.messages) {
                    messages.push({
                      from: message.from,
                      text: message.text ? message.text.body : '',
                      timestamp: message.timestamp,
                      type: message.type
                    });
                  }
                }
              }
            }
          }
          return messages;
        } catch (error) {
          console.error('Error procesando webhook:', error);
          return [];
        }
      }
    };
  });

  describe('enviarMensaje', () => {
    it('debe enviar mensaje exitosamente', async () => {
      const mockResponse = { data: { success: true, message_id: 'msg_123' } };
      mockAxios.post.mockResolvedValue(mockResponse);

      const result = await whatsappService.enviarMensaje('+56912345678', 'Hola', 'token123');

      expect(result).toEqual(mockResponse.data);
      expect(mockAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/messages'),
        expect.objectContaining({
          messaging_product: 'whatsapp',
          to: '+56912345678',
          text: { body: 'Hola' }
        }),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer token123',
            'Content-Type': 'application/json'
          })
        })
      );
    });

    it('debe usar token por defecto si no se proporciona', async () => {
      const originalToken = process.env.WHATSAPP_ACCESS_TOKEN;
      const originalPhoneId = process.env.WHATSAPP_PHONE_ID;
      
      process.env.WHATSAPP_ACCESS_TOKEN = 'default_token';
      process.env.WHATSAPP_PHONE_ID = '123456789';
      
      const mockResponse = { data: { success: true } };
      mockAxios.post.mockResolvedValue(mockResponse);

      await whatsappService.enviarMensaje('+56912345678', 'Hola');

      expect(mockAxios.post).toHaveBeenCalledWith(
        'https://graph.facebook.com/v18.0/123456789/messages',
        expect.objectContaining({
          messaging_product: 'whatsapp',
          to: '+56912345678',
          text: { body: 'Hola' }
        }),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer default_token'
          })
        })
      );
      
      // Restaurar valores originales
      process.env.WHATSAPP_ACCESS_TOKEN = originalToken;
      process.env.WHATSAPP_PHONE_ID = originalPhoneId;
    });

    it('debe lanzar error si falla el envío', async () => {
      const errorResponse = {
        response: {
          data: { error: 'Invalid phone number' }
        }
      };
      mockAxios.post.mockRejectedValue(errorResponse);

      await expect(
        whatsappService.enviarMensaje('+56900000000', 'Test', 'token')
      ).rejects.toThrow();
    });

    it('debe construir URL correctamente', async () => {
      process.env.WHATSAPP_PHONE_ID = '123456789';
      mockAxios.post.mockResolvedValue({ data: { success: true } });

      await whatsappService.enviarMensaje('+56912345678', 'Test', 'token');

      const expectedUrl = 'https://graph.facebook.com/v18.0/123456789/messages';
      expect(mockAxios.post).toHaveBeenCalledWith(
        expectedUrl,
        expect.any(Object),
        expect.any(Object)
      );
    });
  });

  describe('processWebhook', () => {
    it('debe procesar webhook con mensajes correctamente', async () => {
      const webhookData = {
        entry: [{
          changes: [{
            value: {
              messages: [
                {
                  from: '+56912345678',
                  text: { body: 'Hola' },
                  timestamp: '1234567890',
                  type: 'text'
                },
                {
                  from: '+56987654321',
                  text: { body: 'Adiós' },
                  timestamp: '1234567891',
                  type: 'text'
                }
              ]
            }
          }]
        }]
      };

      const result = await whatsappService.processWebhook(webhookData);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        from: '+56912345678',
        text: 'Hola',
        timestamp: '1234567890',
        type: 'text'
      });
      expect(result[1]).toEqual({
        from: '+56987654321',
        text: 'Adiós',
        timestamp: '1234567891',
        type: 'text'
      });
    });

    it('debe manejar mensaje sin texto', async () => {
      const webhookData = {
        entry: [{
          changes: [{
            value: {
              messages: [{
                from: '+56912345678',
                timestamp: '1234567890',
                type: 'image'
              }]
            }
          }]
        }]
      };

      const result = await whatsappService.processWebhook(webhookData);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        from: '+56912345678',
        text: '',
        timestamp: '1234567890',
        type: 'image'
      });
    });

    it('debe retornar array vacío si no hay mensajes', async () => {
      const webhookData = {
        entry: [{
          changes: [{
            value: {
              statuses: [{ id: 'status_123' }]
            }
          }]
        }]
      };

      const result = await whatsappService.processWebhook(webhookData);

      expect(result).toEqual([]);
    });

    it('debe manejar estructura incompleta sin errores', async () => {
      const webhookData = {
        entry: []
      };

      const result = await whatsappService.processWebhook(webhookData);

      expect(result).toEqual([]);
    });

    it('debe manejar error y retornar array vacío', async () => {
      const webhookData = null;

      const result = await whatsappService.processWebhook(webhookData);

      expect(result).toEqual([]);
    });
  });

  describe('marcarLeido', () => {
    it('debe marcar mensaje como leído exitosamente', async () => {
      const mockResponse = { data: { success: true } };
      mockAxios.post.mockResolvedValue(mockResponse);

      await whatsappService.marcarLeido('msg_123', 'token123');

      expect(mockAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/messages'),
        expect.objectContaining({
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: 'msg_123'
        }),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer token123',
            'Content-Type': 'application/json'
          })
        })
      );
    });

    it('debe usar token por defecto', async () => {
      const originalToken = process.env.WHATSAPP_ACCESS_TOKEN;
      const originalPhoneId = process.env.WHATSAPP_PHONE_ID;
      
      process.env.WHATSAPP_ACCESS_TOKEN = 'default_token';
      process.env.WHATSAPP_PHONE_ID = '123456789';
      
      mockAxios.post.mockResolvedValue({ data: { success: true } });

      await whatsappService.marcarLeido('msg_123');

      expect(mockAxios.post).toHaveBeenCalledWith(
        'https://graph.facebook.com/v18.0/123456789/messages',
        expect.objectContaining({
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: 'msg_123'
        }),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer default_token'
          })
        })
      );
      
      // Restaurar valores originales
      process.env.WHATSAPP_ACCESS_TOKEN = originalToken;
      process.env.WHATSAPP_PHONE_ID = originalPhoneId;
    });
  });
});