import { useState } from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import APIKeyInput from './APIKeyInput';
import { 
  isValidAPIKey, 
  validateAPIKeyWithMessage, 
  maskAPIKey, 
  isMaskedAPIKey,
  debugAPIKey 
} from '@/lib/api-keys';

/**
 * Component for testing and demonstrating API key validation
 * Useful for debugging and understanding API key issues
 */
export default function APIKeyTester() {
  const [openaiKey, setOpenaiKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [zaiKey, setZaiKey] = useState('');

  const testKey = (key: string, provider: 'openai' | 'gemini' | 'zai') => {
    if (!key.trim()) return null;

    const validation = validateAPIKeyWithMessage(key, provider);
    const isValid = isValidAPIKey(key, provider);
    const isMasked = isMaskedAPIKey(key);
    const masked = maskAPIKey(key);

    return {
      validation,
      isValid,
      isMasked,
      masked,
      length: key.length,
    };
  };

  const handleDebugLog = (key: string, provider: string) => {
    if (key.trim()) {
      debugAPIKey(key, provider, 'user');
    }
  };

  const openaiTest = testKey(openaiKey, 'openai');
  const geminiTest = testKey(geminiKey, 'gemini');
  const zaiTest = testKey(zaiKey, 'zai');

  const TestResult = ({ 
    test, 
    provider 
  }: { 
    test: ReturnType<typeof testKey>, 
    provider: string 
  }) => {
    if (!test) return null;

    return (
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
        <h4 className="font-medium text-gray-900 dark:text-white">
          {provider} Test Results
        </h4>
        
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            {test.isValid ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500" />
            )}
            <span className="text-gray-700 dark:text-gray-300">
              Valid: {test.isValid ? 'Yes' : 'No'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {test.isMasked ? (
              <AlertCircle className="w-4 h-4 text-amber-500" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
            <span className="text-gray-700 dark:text-gray-300">
              Masked: {test.isMasked ? 'Yes' : 'No'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">
              Length: {test.length} characters
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">
              Masked: {test.masked || 'N/A'}
            </span>
          </div>
          
          {!test.validation.valid && (
            <div className="flex items-start gap-2 mt-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
              <span className="text-red-600 dark:text-red-400">
                {test.validation.message}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          API Key Tester
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Test and validate API keys for different providers
        </p>
      </div>

      {/* Common problematic examples */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
          Common Issues
        </h3>
        <div className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
          <div>
            <strong>Masked OpenAI key:</strong> 
            <code className="ml-2 bg-amber-100 dark:bg-amber-800 px-1 rounded">
              sk-proj-************************************************pYEA
            </code>
          </div>
          <div>
            <strong>Invalid format:</strong> 
            <code className="ml-2 bg-amber-100 dark:bg-amber-800 px-1 rounded">
              invalid-key-format
            </code>
          </div>
          <div>
            <strong>Too short:</strong> 
            <code className="ml-2 bg-amber-100 dark:bg-amber-800 px-1 rounded">
              sk-123
            </code>
          </div>
        </div>
      </div>

      {/* Test inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* OpenAI */}
        <div className="space-y-4">
          <APIKeyInput
            label="OpenAI API Key"
            placeholder="sk-proj-..."
            value={openaiKey}
            onChange={setOpenaiKey}
            provider="openai"
            data-name="test-openai"
          />
          
          <button
            onClick={() => handleDebugLog(openaiKey, 'OpenAI')}
            disabled={!openaiKey.trim()}
            className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Debug Log
          </button>
          
          <TestResult test={openaiTest} provider="OpenAI" />
        </div>

        {/* Gemini */}
        <div className="space-y-4">
          <APIKeyInput
            label="Google Gemini API Key"
            placeholder="AIzaSy..."
            value={geminiKey}
            onChange={setGeminiKey}
            provider="gemini"
            data-name="test-gemini"
          />
          
          <button
            onClick={() => handleDebugLog(geminiKey, 'Gemini')}
            disabled={!geminiKey.trim()}
            className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Debug Log
          </button>
          
          <TestResult test={geminiTest} provider="Gemini" />
        </div>

        {/* Z.AI */}
        <div className="space-y-4">
          <APIKeyInput
            label="Z.AI API Key"
            placeholder="Enter Z.AI key..."
            value={zaiKey}
            onChange={setZaiKey}
            provider="zai"
            data-name="test-zai"
          />
          
          <button
            onClick={() => handleDebugLog(zaiKey, 'Z.AI')}
            disabled={!zaiKey.trim()}
            className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Debug Log
          </button>
          
          <TestResult test={zaiTest} provider="Z.AI" />
        </div>
      </div>

      {/* Quick test buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Quick Tests
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setOpenaiKey('sk-proj-************************************************pYEA')}
            className="p-3 text-left bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <div className="font-medium text-red-800 dark:text-red-200">
              Test Masked OpenAI Key
            </div>
            <div className="text-sm text-red-600 dark:text-red-300">
              Common issue with asterisks
            </div>
          </button>
          
          <button
            onClick={() => setOpenaiKey('sk-proj-abcd1234efgh5678ijklmnop')}
            className="p-3 text-left bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <div className="font-medium text-green-800 dark:text-green-200">
              Test Valid OpenAI Key
            </div>
            <div className="text-sm text-green-600 dark:text-green-300">
              Proper format example
            </div>
          </button>
          
          <button
            onClick={() => setGeminiKey('AIzaSyAbc123def456ghi789jkl012')}
            className="p-3 text-left bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <div className="font-medium text-green-800 dark:text-green-200">
              Test Valid Gemini Key
            </div>
            <div className="text-sm text-green-600 dark:text-green-300">
              Proper format example
            </div>
          </button>
          
          <button
            onClick={() => {
              setOpenaiKey('');
              setGeminiKey('');
              setZaiKey('');
            }}
            className="p-3 text-left bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="font-medium text-gray-800 dark:text-gray-200">
              Clear All
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Reset all inputs
            </div>
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
          How to Use
        </h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300">
          <li>Enter an API key in any of the input fields</li>
          <li>Watch the real-time validation feedback</li>
          <li>Click "Debug Log" to see safe logging output in console</li>
          <li>Use quick test buttons to try common scenarios</li>
          <li>Check the test results for detailed validation info</li>
        </ol>
      </div>
    </div>
  );
}
