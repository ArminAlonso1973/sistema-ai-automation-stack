// ai.service.js - Servicio para integraciones con IA
import OpenAI from 'openai';

class AIService {
  constructor() {
    // En desarrollo, usar mock si no hay API key real
    const apiKey = process.env.OPENAI_API_KEY || 'sk-test-development-key'
    
    this.openai = new OpenAI({
      apiKey: apiKey
    });
  }

  // Clasificar lead usando GPT
  async classifyLead(message, clientId) {
    try {
      // En desarrollo, retornar mock si la API key es de test
      if (process.env.OPENAI_API_KEY === 'sk-test-key-for-development' || !process.env.OPENAI_API_KEY) {
        return {
          classification: 'potencial',
          priority: 'media',
          reasoning: 'Mock response for development',
          confidence: 0.8
        };
      }

      const response = await this.openai.chat.completions.create({
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
  async generateResponse(message, context, clientId) {
    try {
      // En desarrollo, retornar mock si la API key es de test
      if (process.env.OPENAI_API_KEY === 'sk-test-key-for-development' || !process.env.OPENAI_API_KEY) {
        return `Hola! Gracias por tu mensaje: "${message}". Te contactaremos pronto. (Respuesta de desarrollo)`;
      }

      const response = await this.openai.chat.completions.create({
}

export default new AIService();