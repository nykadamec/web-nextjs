/**
 * Tests for API key validation and utility functions
 */

import {
  isValidAPIKey,
  sanitizeAPIKey,
  maskAPIKey,
  isMaskedAPIKey,
  getAPIKey,
  validateAPIKeyWithMessage,
  debugAPIKey,
} from '../api-keys';

describe('API Key Utilities', () => {
  describe('isValidAPIKey', () => {
    describe('OpenAI keys', () => {
      it('should validate correct OpenAI keys', () => {
        expect(isValidAPIKey('sk-proj-abcd1234efgh5678ijkl', 'openai')).toBe(true);
        expect(isValidAPIKey('sk-1234567890abcdef', 'openai')).toBe(true);
      });

      it('should reject invalid OpenAI keys', () => {
        expect(isValidAPIKey('invalid-key', 'openai')).toBe(false);
        expect(isValidAPIKey('sk-', 'openai')).toBe(false);
        expect(isValidAPIKey('sk-short', 'openai')).toBe(false);
        expect(isValidAPIKey('sk-proj-****1234', 'openai')).toBe(false);
      });
    });

    describe('Gemini keys', () => {
      it('should validate correct Gemini keys', () => {
        expect(isValidAPIKey('AIzaSyAbc123def456ghi789', 'gemini')).toBe(true);
        expect(isValidAPIKey('AIzaSy1234567890abcdef', 'gemini')).toBe(true);
      });

      it('should reject invalid Gemini keys', () => {
        expect(isValidAPIKey('invalid-key', 'gemini')).toBe(false);
        expect(isValidAPIKey('AIza', 'gemini')).toBe(false);
        expect(isValidAPIKey('AIzaShort', 'gemini')).toBe(false);
        expect(isValidAPIKey('AIzaSy****123', 'gemini')).toBe(false);
      });
    });

    describe('Z.AI keys', () => {
      it('should validate correct Z.AI keys', () => {
        expect(isValidAPIKey('zai-1234567890', 'zai')).toBe(true);
        expect(isValidAPIKey('any-valid-key-format', 'zai')).toBe(true);
      });

      it('should reject invalid Z.AI keys', () => {
        expect(isValidAPIKey('short', 'zai')).toBe(false);
        expect(isValidAPIKey('key****123', 'zai')).toBe(false);
      });
    });
  });

  describe('sanitizeAPIKey', () => {
    it('should remove whitespace', () => {
      expect(sanitizeAPIKey('  sk-proj-123  ')).toBe('sk-proj-123');
      expect(sanitizeAPIKey('\tAIzaSy123\n')).toBe('AIzaSy123');
    });

    it('should handle empty/invalid input', () => {
      expect(sanitizeAPIKey('')).toBe('');
      expect(sanitizeAPIKey(null as any)).toBe('');
      expect(sanitizeAPIKey(undefined as any)).toBe('');
    });
  });

  describe('maskAPIKey', () => {
    it('should mask long keys correctly', () => {
      const key = 'sk-proj-abcd1234efgh5678ijkl';
      const masked = maskAPIKey(key);
      expect(masked).toBe('sk-proj-****ijkl');
      expect(masked.length).toBeLessThan(key.length);
    });

    it('should handle short keys', () => {
      expect(maskAPIKey('short')).toBe('');
      expect(maskAPIKey('sk-proj-123')).toBe('sk-proj-****');
    });

    it('should handle empty input', () => {
      expect(maskAPIKey('')).toBe('');
      expect(maskAPIKey(null as any)).toBe('');
    });
  });

  describe('isMaskedAPIKey', () => {
    it('should detect masked keys', () => {
      expect(isMaskedAPIKey('sk-proj-****1234')).toBe(true);
      expect(isMaskedAPIKey('AIzaSy****abc')).toBe(true);
      expect(isMaskedAPIKey('key*with*asterisks')).toBe(true);
    });

    it('should not detect valid keys as masked', () => {
      expect(isMaskedAPIKey('sk-proj-abcd1234')).toBe(false);
      expect(isMaskedAPIKey('AIzaSyAbc123')).toBe(false);
      expect(isMaskedAPIKey('valid-key-123')).toBe(false);
    });
  });

  describe('getAPIKey', () => {
    it('should prefer user key over env key', () => {
      const userKey = 'sk-proj-user123456789';
      const envKey = 'sk-proj-env123456789';
      
      const result = getAPIKey(userKey, envKey, 'openai');
      expect(result).toBe(userKey);
    });

    it('should fall back to env key if user key is invalid', () => {
      const userKey = 'invalid-key';
      const envKey = 'sk-proj-env123456789';
      
      const result = getAPIKey(userKey, envKey, 'openai');
      expect(result).toBe(envKey);
    });

    it('should return null if both keys are invalid', () => {
      const userKey = 'invalid-user';
      const envKey = 'invalid-env';
      
      const result = getAPIKey(userKey, envKey, 'openai');
      expect(result).toBeNull();
    });

    it('should handle masked keys', () => {
      const userKey = 'sk-proj-****1234';
      const envKey = 'sk-proj-env123456789';
      
      const result = getAPIKey(userKey, envKey, 'openai');
      expect(result).toBe(envKey);
    });
  });

  describe('validateAPIKeyWithMessage', () => {
    it('should return valid for correct keys', () => {
      const result = validateAPIKeyWithMessage('sk-proj-abc123def456', 'openai');
      expect(result.valid).toBe(true);
      expect(result.message).toBeUndefined();
    });

    it('should return error for masked keys', () => {
      const result = validateAPIKeyWithMessage('sk-proj-****1234', 'openai');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('masked');
    });

    it('should return error for wrong format', () => {
      const result = validateAPIKeyWithMessage('invalid-key', 'openai');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('sk-');
    });

    it('should return error for empty key', () => {
      const result = validateAPIKeyWithMessage('', 'openai');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('required');
    });
  });

  describe('debugAPIKey', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should log masked key info safely', () => {
      debugAPIKey('sk-proj-abcd1234efgh5678', 'OpenAI', 'user');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[API-KEY-DEBUG] OpenAI (user):')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('sk-proj-****5678')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Valid: true')
      );
    });

    it('should handle empty keys', () => {
      debugAPIKey('', 'OpenAI', 'user');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[API-KEY-DEBUG] OpenAI (user): EMPTY'
      );
    });
  });
});

// Integration tests
describe('API Key Integration', () => {
  it('should handle complete workflow', () => {
    const rawKey = '  sk-proj-abcd1234efgh5678ijkl  ';
    
    // Sanitize
    const sanitized = sanitizeAPIKey(rawKey);
    expect(sanitized).toBe('sk-proj-abcd1234efgh5678ijkl');
    
    // Validate
    const isValid = isValidAPIKey(sanitized, 'openai');
    expect(isValid).toBe(true);
    
    // Mask for display
    const masked = maskAPIKey(sanitized);
    expect(masked).toBe('sk-proj-****ijkl');
    
    // Check if masked
    const isMasked = isMaskedAPIKey(masked);
    expect(isMasked).toBe(true);
  });

  it('should reject problematic keys', () => {
    const problematicKeys = [
      'sk-proj-************************************************pYEA',
      'sk-****',
      'invalid-key',
      '',
      '   ',
    ];

    problematicKeys.forEach(key => {
      const validation = validateAPIKeyWithMessage(key, 'openai');
      expect(validation.valid).toBe(false);
      expect(validation.message).toBeDefined();
    });
  });
});
