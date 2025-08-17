/**
 * Utility functions for API key validation and sanitization
 */

/**
 * Validates if an API key is properly formatted and not masked
 */
export function isValidAPIKey(apiKey: string, provider: 'openai' | 'gemini' | 'zai'): boolean {
  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }

  // Remove whitespace
  const trimmedKey = apiKey.trim();
  
  // Check if key contains asterisks (masked key)
  if (trimmedKey.includes('*')) {
    return false;
  }

  // Provider-specific validation
  switch (provider) {
    case 'openai':
      // OpenAI keys start with 'sk-' and are typically 51+ characters
      return trimmedKey.startsWith('sk-') && trimmedKey.length >= 20;
    
    case 'gemini':
      // Google API keys typically start with 'AIza' and are 39 characters
      return trimmedKey.startsWith('AIza') && trimmedKey.length >= 20;
    
    case 'zai':
      // Z.AI key format (adjust based on actual format)
      return trimmedKey.length >= 10;
    
    default:
      return false;
  }
}

/**
 * Sanitizes API key by removing invalid characters and whitespace
 */
export function sanitizeAPIKey(apiKey: string): string {
  if (!apiKey || typeof apiKey !== 'string') {
    return '';
  }

  return apiKey.trim();
}

/**
 * Masks API key for display purposes (shows first 8 and last 4 characters)
 */
export function maskAPIKey(apiKey: string): string {
  if (!apiKey || typeof apiKey !== 'string' || apiKey.length < 12) {
    return '';
  }

  const start = apiKey.substring(0, 8);
  const end = apiKey.substring(apiKey.length - 4);
  const middle = '*'.repeat(Math.max(4, apiKey.length - 12));
  
  return `${start}${middle}${end}`;
}

/**
 * Checks if API key appears to be masked (contains asterisks)
 */
export function isMaskedAPIKey(apiKey: string): boolean {
  return typeof apiKey === 'string' && apiKey.includes('*');
}

/**
 * Gets the appropriate API key for a provider, preferring user-provided over environment
 */
export function getAPIKey(userKey: string | undefined, envKey: string | undefined, provider: 'openai' | 'gemini' | 'zai'): string | null {
  // First try user-provided key
  if (userKey && isValidAPIKey(userKey, provider)) {
    return sanitizeAPIKey(userKey);
  }

  // Fall back to environment key
  if (envKey && isValidAPIKey(envKey, provider)) {
    return sanitizeAPIKey(envKey);
  }

  return null;
}

/**
 * Validates API key and returns error message if invalid
 */
export function validateAPIKeyWithMessage(apiKey: string, provider: 'openai' | 'gemini' | 'zai'): { valid: boolean; message?: string } {
  if (!apiKey || typeof apiKey !== 'string') {
    return { valid: false, message: `${provider.toUpperCase()} API key is required` };
  }

  const trimmedKey = apiKey.trim();

  if (trimmedKey.includes('*')) {
    return { valid: false, message: `${provider.toUpperCase()} API key appears to be masked. Please provide the actual key.` };
  }

  if (!isValidAPIKey(trimmedKey, provider)) {
    switch (provider) {
      case 'openai':
        return { valid: false, message: 'OpenAI API key must start with "sk-" and be at least 20 characters long' };
      case 'gemini':
        return { valid: false, message: 'Google Gemini API key must start with "AIza" and be at least 20 characters long' };
      case 'zai':
        return { valid: false, message: 'Z.AI API key must be at least 10 characters long' };
      default:
        return { valid: false, message: 'Invalid API key format' };
    }
  }

  return { valid: true };
}

/**
 * Safely logs API key information for debugging (without exposing the actual key)
 */
export function debugAPIKey(apiKey: string, provider: string, source: 'user' | 'env'): void {
  if (!apiKey) {
    console.log(`[API-KEY-DEBUG] ${provider} (${source}): EMPTY`);
    return;
  }

  const masked = maskAPIKey(apiKey);
  const isValid = isValidAPIKey(apiKey, provider as any);
  const isMaskedKey = isMaskedAPIKey(apiKey);

  console.log(`[API-KEY-DEBUG] ${provider} (${source}): ${masked} | Valid: ${isValid} | Masked: ${isMaskedKey} | Length: ${apiKey.length}`);
}

/**
 * Error messages for API key issues
 */
export const API_KEY_ERRORS = {
  MISSING: 'API key is required',
  MASKED: 'API key appears to be masked with asterisks. Please provide the actual key.',
  INVALID_FORMAT: 'API key format is invalid',
  OPENAI_FORMAT: 'OpenAI API key must start with "sk-"',
  GEMINI_FORMAT: 'Google Gemini API key must start with "AIza"',
  TOO_SHORT: 'API key is too short',
} as const;
