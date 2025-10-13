import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock OpenAI BEFORE importing AIService
vi.mock('openai', () => {
  const mockOpenAI = {
    chat: {
      completions: {
        create: vi.fn()
      }
    }
  };
  
  return {
    default: class OpenAI {
      constructor() {
        Object.assign(this, mockOpenAI);
      }
    }
  };
});

// IMPORT DEFAULT (not named export)
import aiService from '../../src/services/ai.service.js';

describe('AIService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('classifyLead', () => {
    it('debe clasificar lead correctamente', async () => {
      // Mock OpenAI response directly on the service instance
      aiService.openai = {
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
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
            })
          }
        }
      };

      const result = await aiService.classifyLead('Quiero comprar ahora');
      
      expect(result).toMatchObject({
        classification: expect.any(String),
        priority: expect.any(String),
        reasoning: expect.any(String),
        confidence: expect.any(Number)
      });
    });

    it('debe manejar errores correctamente', async () => {
      // Mock error response
      aiService.openai = {
        chat: {
          completions: {
            create: vi.fn().mockRejectedValue(new Error('API Error'))
          }
        }
      };

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
      aiService.openai = {
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: 'Respuesta generada'
                }
              }]
            })
          }
        }
      };

      const result = await aiService.generateResponse('Hola');
      
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('debe manejar errores en respuesta', async () => {
      aiService.openai = {
        chat: {
          completions: {
            create: vi.fn().mockRejectedValue(new Error('API Error'))
          }
        }
      };

      const result = await aiService.generateResponse('Test');
      
      expect(result).toBe('Gracias por tu mensaje. Te contactaremos pronto.');
    });
  });
});
