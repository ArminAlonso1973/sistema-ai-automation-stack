// ai.service.js - Servicio para integraciones con IA
import OpenAI from 'openai';

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  // Clasificar lead usando GPT
  async classifyLead(message, userProfile = {}) {
    try {
      const prompt = `
        Analiza el siguiente mensaje de WhatsApp y clasifica al lead:
        
        Mensaje: "${message}"
        Perfil: ${JSON.stringify(userProfile)}
        
        Clasifica como:
        1. HOT: Interés inmediato, listo para comprar
        2. WARM: Interesado pero necesita más información  
        3. COLD: Poco interés o solo pregunta general
        4. SPAM: Mensaje irrelevante o spam
        
        Responde solo con: HOT, WARM, COLD o SPAM
      `;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 10,
        temperature: 0.1
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error clasificando lead:', error);
      return 'WARM'; // Default fallback
    }
  }

  // Generar respuesta automática
  async generateResponse(message, context = {}) {
    try {
      const prompt = `
        Eres un asistente de ventas profesional. Responde al siguiente mensaje:
        
        Mensaje del cliente: "${message}"
        Contexto: ${JSON.stringify(context)}
        
        Genera una respuesta cordial, profesional y que invite a continuar la conversación.
        Máximo 100 palabras.
      `;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error generando respuesta:', error);
      return 'Gracias por tu mensaje. Un agente se pondrá en contacto contigo pronto.';
    }
  }
}

export default new AIService();