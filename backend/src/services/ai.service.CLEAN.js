import OpenAI from 'openai';

class AIService {
  constructor() {
    // En desarrollo, usar mock si no hay API key real
    const apiKey = process.env.OPENAI_API_KEY || 'sk-test-development-key';
    
    this.openai = new OpenAI({
      apiKey: apiKey
    });
  }

  async classifyLead(message, clientId) {
    try {
      // En desarrollo, retornar mock si la API key es de test
      if (process.env.OPENAI_API_KEY === 'sk-test-key-for-development' || !process.env.OPENAI_API_KEY) {
        console.log(`[DEV] Mock lead classification for ${clientId}: ${message}`);
        return {
          classification: 'potencial',
          priority: 'media',
          reasoning: 'Mock response for development',
          confidence: 0.8
        };
      }

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Eres un clasificador de leads de WhatsApp para ${clientId}. Clasifica el mensaje como: 'interesado', 'potencial', 'no_interesado', 'spam'.
            
            Responde en formato JSON con:
            - classification: una de las categorías mencionadas
            - priority: 'alta', 'media', 'baja'
            - reasoning: breve explicación
            - confidence: número entre 0 y 1`
          },
          {
            role: 'user', 
            content: message
          }
        ],
        max_tokens: 200,
        temperature: 0.3
      });

      const result = JSON.parse(response.choices[0].message.content);
      console.log(`Lead classified for ${clientId}:`, result);
      return result;
    } catch (error) {
      console.error('Error classifying lead:', error);
      return {
        classification: 'potencial',
        priority: 'media', 
        reasoning: 'Error in classification, defaulting to potential',
        confidence: 0.5
      };
    }
  }

  async generateResponse(message, context, clientId) {
    try {
      // En desarrollo, retornar mock si la API key es de test
      if (process.env.OPENAI_API_KEY === 'sk-test-key-for-development' || !process.env.OPENAI_API_KEY) {
        console.log(`[DEV] Mock response for ${clientId}: ${message}`);
        return `Hola! Gracias por tu mensaje: "${message}". Te contactaremos pronto. (Respuesta de desarrollo)`;
      }

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Eres un asistente de WhatsApp para ${clientId}. Responde de manera profesional y útil.`
          },
          {
            role: 'user',
            content: `Contexto: ${context}\n\nMensaje: ${message}`
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error generating AI response:', error);
      return 'Gracias por tu mensaje. Te contactaremos pronto.';
    }
  }
}

export default new AIService();