import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AIService } from '../../src/services/ai.service.js';

// Mock OpenAI
const mockOpenAI = {
  chat: {
    completions: {
      create: vi.fn()
    }
  }
};

vi.mock('openai', () => ({
  default: class OpenAI {
    constructor() {
      return mockOpenAI;
    }
  }
}));

describe('AIService', () => {
  let aiService;

  beforeEach(() => {
    aiService = new AIService();
    vi.clearAllMocks();
  });

  describe('classifyLead', () => {
    it('debe clasificar lead correctamente', async () => {
      mockOpenAI.chat.completions.create.mockResolvedValue({
        choices: [{
          message: {
            content: JSON.stringify({
              classification: 'interesado',
              priority: 'alta',
              reasoning: 'Cliente interesado',
              confidence: 0.9
            })
          }
        }]
      });

      const result = await aiService.classifyLead('Quiero comprar ahora');
      
      expect(result).toMatchObject({
        classification: expect.any(String),
        priority: expect.any(String),
        reasoning: expect.any(String),
        confidence: expect.any(Number)
      });
    });

    it('debe manejar errores correctamente', async () => {
      mockOpenAI.chat.completions.create.mockRejectedValue(new Error('API Error'));

      const result = await aiService.classifyLead('Test message');
      
      expect(result).toMatchObject({
        classification: 'potencial',
        priority: 'media',
        reasoning: expect.any(String),
        confidence: expect.any(Number)
      });
    });
  });

  describe('generateResponse', () => {
    it('debe generar respuesta', async () => {
      mockOpenAI.chat.completions.create.mockResolvedValue({
        choices: [{
          message: {
            content: 'Respuesta generada'
          }
        }]
      });

      const result = await aiService.generateResponse('Hola');
      
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('debe manejar errores en respuesta', async () => {
      mockOpenAI.chat.completions.create.mockRejectedValue(new Error('API Error'));

      const result = await aiService.generateResponse('Test');
      
      expect(result).toBe('Gracias por tu mensaje. Te contactaremos pronto.');
    });
  });
});
