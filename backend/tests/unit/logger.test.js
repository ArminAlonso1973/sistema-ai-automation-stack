// tests/unit/logger.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import logger from '../../src/utils/logger.js';

describe('Logger Utility', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debe registrar mensajes info con timestamp', () => {
    logger.info('Test message', { test: true });
    
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('[INFO]'),
      { test: true }
    );
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/),
      expect.any(Object)
    );
  });

  it('debe registrar errores con timestamp', () => {
    const errorObj = { code: 500 };
    logger.error('Error message', errorObj);
    
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('[ERROR]'),
      errorObj
    );
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/),
      expect.any(Object)
    );
  });

  it('debe registrar warnings', () => {
    logger.warn('Warning message', { level: 'warn' });
    
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('[WARN]'),
      { level: 'warn' }
    );
  });

  it('debe registrar debug en development', () => {
    // Simular entorno de desarrollo
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    
    // Recrear logger para que tome el nuevo env
    logger.isDevelopment = true;
    
    logger.debug('Debug message', { debug: true });
    
    expect(console.debug).toHaveBeenCalledWith(
      expect.stringContaining('[DEBUG]'),
      { debug: true }
    );
    
    // Restaurar
    process.env.NODE_ENV = originalEnv;
  });

  it('no debe registrar debug en production', () => {
    // Simular entorno de producción
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    
    // Recrear logger
    logger.isDevelopment = false;
    
    logger.debug('Debug message', { debug: true });
    
    expect(console.debug).not.toHaveBeenCalled();
    
    // Restaurar
    process.env.NODE_ENV = originalEnv;
  });

  it('debe incluir timestamp ISO en formato correcto', () => {
    logger.info('Test timestamp');
    
    const callArgs = console.log.mock.calls[0][0];
    const isoRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
    expect(callArgs).toMatch(isoRegex);
  });
});