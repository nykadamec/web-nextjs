import { useState, useEffect } from 'react';
import { Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isValidAPIKey, isMaskedAPIKey, validateAPIKeyWithMessage } from '@/lib/api-keys';

interface APIKeyInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  provider: 'openai' | 'gemini' | 'zai';
  className?: string;
  'data-name'?: string;
}

/**
 * API Key input component with validation and show/hide functionality
 */
export default function APIKeyInput({
  label,
  placeholder,
  value,
  onChange,
  provider,
  className,
  'data-name': dataName,
}: APIKeyInputProps) {
  const [showKey, setShowKey] = useState(false);
  const [validation, setValidation] = useState<{ valid: boolean; message?: string }>({ valid: true });

  // Validate API key when value changes
  useEffect(() => {
    if (value.trim()) {
      const result = validateAPIKeyWithMessage(value, provider);
      setValidation(result);
    } else {
      setValidation({ valid: true }); // Empty is valid (optional)
    }
  }, [value, provider]);

  const handleToggleVisibility = () => {
    setShowKey(!showKey);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const inputType = showKey ? 'text' : 'password';
  const hasValue = value.trim().length > 0;
  const isMasked = isMaskedAPIKey(value);
  const isValid = validation.valid && !isMasked;

  return (
    <div className={cn('space-y-2', className)}>
      <label 
        className="block text-sm font-medium text-black dark:text-white"
        data-name={`${dataName}-label`}
      >
        {label}
      </label>
      
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={cn(
            'w-full px-3 py-2 pr-20 border rounded-md text-black dark:text-white bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors',
            isValid 
              ? 'border-gray-300 dark:border-gray-600 focus:ring-blue-500' 
              : 'border-red-300 dark:border-red-600 focus:ring-red-500'
          )}
          data-name={`${dataName}-input`}
        />
        
        {/* Toggle visibility button */}
        {hasValue && (
          <button
            type="button"
            onClick={handleToggleVisibility}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            title={showKey ? 'Hide API key' : 'Show API key'}
            data-name={`${dataName}-toggle`}
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
        
        {/* Validation indicator */}
        {hasValue && (
          <div 
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            data-name={`${dataName}-validation`}
          >
            {isValid ? (
              <CheckCircle className="w-4 h-4 text-green-500" title="Valid API key" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500" title={validation.message} />
            )}
          </div>
        )}
      </div>
      
      {/* Validation message */}
      {hasValue && !validation.valid && (
        <p 
          className="text-sm text-red-600 dark:text-red-400"
          data-name={`${dataName}-error`}
        >
          {validation.message}
        </p>
      )}
      
      {/* Masked key warning */}
      {isMasked && (
        <p 
          className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1"
          data-name={`${dataName}-masked-warning`}
        >
          <AlertCircle className="w-3 h-3" />
          This appears to be a masked API key. Please enter the actual key.
        </p>
      )}
      
      {/* Help text */}
      {!hasValue && (
        <p 
          className="text-xs text-gray-500 dark:text-gray-400"
          data-name={`${dataName}-help`}
        >
          {provider === 'openai' && 'Starts with "sk-" (e.g., sk-proj-...)'}
          {provider === 'gemini' && 'Starts with "AIza" (e.g., AIzaSy...)'}
          {provider === 'zai' && 'Enter your Z.AI API key'}
        </p>
      )}
    </div>
  );
}
