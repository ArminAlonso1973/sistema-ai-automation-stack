// tests/unit/ai.service.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock de openai
vi.mock('openai', () => ({
  default: vi.fn(() => ({
    chat: {
      completions: {
        create: vi.fn()
      }
    }
  }))
}));

describe('AIService', () => {
  let aiService;
  let mockOpenAI;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Importar dinámicamente el servicio
    const AIServiceModule = await import('../../src/services/ai.service.js');
    aiService = AIServiceModule.default;
    mockOpenAI = aiService.openai;
  });

  describe('classifyLead', () => {
    it('debe clasificar lead como HOT', async () => {
      mockOpenAI.chat.completions.create.mockResolvedValue({
        choices: [{ message: { content: 'HOT' } }]
      });

      const message = 'Quiero comprar ahora mismo';
      const userProfile = { name: 'Test User' };
      
      const result = await aiService.classifyLead(message, userProfile);
      
      expect(result).toBe('HOT');
      expect(mockOpenAI.chat.completions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'gpt-3.5-turbo',
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              content: expect.stringContaining(message)
            })
          ]),
          max_tokens: 10,
          temperature: 0.1
        })
      );
    });

    it('debe clasificar lead como WARM', async () => {
      mockOpenAI.chat.completions.create.mockResolvedValue({
        choices: [{ message: { content: 'WARM' } }]
      });

      const result = await aiService.classifyLead('Me interesa el producto');
      
      expect(result).toBe('WARM');
    });

    it('debe retornar WARM como fallback en caso de error', async () => {
      mockOpenAI.chat.completions.create.mockRejectedValue(new Error('OpenAI API error'));

      const result = await aiService.classifyLead('Test message');
      
      expect(result).toBe('WARM');
    });

    it('debe incluir userProfile en el prompt', async () => {
      mockOpenAI.chat.completions.create.mockResolvedValue({
        choices: [{ message: { content: 'COLD' } }]
      });

      const userProfile = { name: 'John', company: 'Test Corp' };
      
      await aiService.classifyLead('Hello', userProfile);
      
      const call = mockOpenAI.chat.completions.create.mock.calls[0][0];
      expect(call.messages[0].content).toContain(JSON.stringify(userProfile));
    });
  });

  describe('generateResponse', () => {
    it('debe generar respuesta personalizada', async () => {
      const expectedResponse = 'Gracias por contactarnos. ¿En qué podemos ayudarte?';
      
      mockOpenAI.chat.completions.create.mockResolvedValue({
        choices: [{ message: { content: expectedResponse } }]
      });

      const message = 'Hola, necesito información';
      const context = { company: 'Test Company' };
      
      const result = await aiService.generateResponse(message, context);
      
      expect(result).toBe(expectedResponse);
      expect(mockOpenAI.chat.completions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'gpt-3.5-turbo',
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              content: expect.stringContaining(message)
            })
          ]),
          max_tokens: 150,
          temperature: 0.7
        })
      );
    });

    it('debe incluir contexto en la respuesta', async () => {
      mockOpenAI.chat.completions.create.mockResolvedValue({
        choices: [{ message: { content: 'Respuesta con contexto' } }]
      });

      const context = { businessHours: '9-17', products: ['Product A'] };
      
      await aiService.generateResponse('Test message', context);
      
      const call = mockOpenAI.chat.completions.create.mock.calls[0][0];
      expect(call.messages[0].content).toContain(JSON.stringify(context));
    });

    it('debe retornar respuesta por defecto en caso de error', async () => {
      mockOpenAI.chat.completions.create.mockRejectedValue(new Error('API Error'));

      const result = await aiService.generateResponse('Test message');
      
      expect(result).toBe('Gracias por tu mensaje. Un agente se pondrá en contacto contigo pronto.');
    });

    it('debe manejar contexto vacío', async () => {
      mockOpenAI.chat.completions.create.mockResolvedValue({
        choices: [{ message: { content: 'Respuesta sin contexto' } }]
      });

      const result = await aiService.generateResponse('Test message', {});
      
      expect(result).toBe('Respuesta sin contexto');
    });

    it('debe limpiar respuesta eliminando espacios extra', async () => {
      mockOpenAI.chat.completions.create.mockResolvedValue({
        choices: [{ message: { content: '  Respuesta con espacios  ' } }]
      });

      const result = await aiService.generateResponse('Test');
      
      expect(result).toBe('Respuesta con espacios');
    });
  });
});