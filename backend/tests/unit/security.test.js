// tests/unit/security.test.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import securityService from '../../src/utils/security.js';
import crypto from 'crypto';

describe('Security Service', () => {
  let originalEnv;

  beforeEach(() => {
    originalEnv = process.env.WHATSAPP_APP_SECRET;
    process.env.WHATSAPP_APP_SECRET = 'test_secret_key';
    process.env.WEBHOOK_VERIFY_TOKEN = 'test_verify_token';
  });

  afterEach(() => {
    process.env.WHATSAPP_APP_SECRET = originalEnv;
  });

  describe('validateWhatsAppSignature', () => {
    it('debe validar firma correcta', () => {
      const payload = 'test payload data';
      const expectedSignature = crypto
        .createHmac('sha256', 'test_secret_key')
        .update(payload)
        .digest('hex');
      
      const signature = `sha256=${expectedSignature}`;
      
      const result = securityService.validateWhatsAppSignature(payload, signature);
      expect(result).toBe(true);
    });

    it('debe rechazar firma incorrecta', () => {
      const payload = 'test payload data';
      const wrongSignature = 'sha256=wrong_signature';
      
      const result = securityService.validateWhatsAppSignature(payload, wrongSignature);
      expect(result).toBe(false);
    });

    it('debe rechazar firma sin prefijo sha256', () => {
      const payload = 'test payload';
      const signature = 'incorrect_format';
      
      const result = securityService.validateWhatsAppSignature(payload, signature);
      expect(result).toBe(false);
    });

    it('debe manejar payload vacío', () => {
      const payload = '';
      const expectedSignature = crypto
        .createHmac('sha256', 'test_secret_key')
        .update('')
        .digest('hex');
      
      const signature = `sha256=${expectedSignature}`;
      
      const result = securityService.validateWhatsAppSignature(payload, signature);
      expect(result).toBe(true);
    });
  });

  describe('generateHash', () => {
    it('debe generar hash SHA256 correctamente', () => {
      const data = 'test data';
      const expectedHash = crypto.createHash('sha256').update(data).digest('hex');
      
      const result = securityService.generateHash(data);
      expect(result).toBe(expectedHash);
    });

    it('debe generar hashes diferentes para datos diferentes', () => {
      const data1 = 'test data 1';
      const data2 = 'test data 2';
      
      const hash1 = securityService.generateHash(data1);
      const hash2 = securityService.generateHash(data2);
      
      expect(hash1).not.toBe(hash2);
    });

    it('debe generar mismo hash para mismos datos', () => {
      const data = 'consistent data';
      
      const hash1 = securityService.generateHash(data);
      const hash2 = securityService.generateHash(data);
      
      expect(hash1).toBe(hash2);
    });
  });

  describe('validateVerifyToken', () => {
    it('debe validar token correcto', () => {
      const result = securityService.validateVerifyToken('test_verify_token');
      expect(result).toBe(true);
    });

    it('debe rechazar token incorrecto', () => {
      const result = securityService.validateVerifyToken('wrong_token');
      expect(result).toBe(false);
    });

    it('debe rechazar token vacío', () => {
      const result = securityService.validateVerifyToken('');
      expect(result).toBe(false);
    });

    it('debe rechazar token undefined', () => {
      const result = securityService.validateVerifyToken(undefined);
      expect(result).toBe(false);
    });
  });
});