import { Settings, Loader2, Cog, Database, Key, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SettingsLoadingIndicatorProps {
  /** Type of settings operation being performed */
  operation?: 'loading' | 'saving' | 'testing' | 'validating' | 'syncing';
  /** Size of the loading indicator */
  size?: 'sm' | 'md' | 'lg';
  /** Show text description */
  showText?: boolean;
  /** Custom text to display */
  text?: string;
  /** Show as overlay over settings content */
  overlay?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Data name for testing */
  'data-name'?: string;
}

/**
 * Specialized loading indicator for settings operations
 * Provides contextual animations and messages for different settings actions
 */
export default function SettingsLoadingIndicator({
  operation = 'loading',
  size = 'md',
  showText = true,
  text,
  overlay = false,
  className,
  'data-name': dataName = 'settings-loading-indicator',
}: SettingsLoadingIndicatorProps) {
  
  // Size configurations
  const sizeConfig = {
    sm: {
      icon: 'w-4 h-4',
      text: 'text-xs',
      gap: 'gap-2',
      padding: 'p-3'
    },
    md: {
      icon: 'w-6 h-6',
      text: 'text-sm',
      gap: 'gap-3',
      padding: 'p-4'
    },
    lg: {
      icon: 'w-8 h-8',
      text: 'text-base',
      gap: 'gap-4',
      padding: 'p-6'
    }
  };

  // Operation configurations
  const operationConfig = {
    loading: {
      icon: Settings,
      defaultText: 'Načítám nastavení...',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    saving: {
      icon: Database,
      defaultText: 'Ukládám nastavení...',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    testing: {
      icon: Cog,
      defaultText: 'Testuji připojení...',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    },
    validating: {
      icon: Key,
      defaultText: 'Ověřuji API klíče...',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    syncing: {
      icon: Monitor,
      defaultText: 'Synchronizuji nastavení...',
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800'
    }
  };

  const currentSize = sizeConfig[size];
  const currentOperation = operationConfig[operation];
  const displayText = text || currentOperation.defaultText;

  // Main icon with rotation animation
  const MainIcon = currentOperation.icon;

  // Container classes
  const containerClasses = cn(
    'flex items-center justify-center',
    currentSize.gap,
    overlay && [
      'absolute inset-0 z-10',
      'bg-white/90 dark:bg-gray-900/90',
      'backdrop-blur-sm'
    ],
    !overlay && [
      'rounded-lg border',
      currentOperation.bgColor,
      currentOperation.borderColor,
      currentSize.padding
    ],
    className
  );

  // Icon container with pulsing background
  const iconContainerClasses = cn(
    'relative flex items-center justify-center',
    'rounded-full',
    currentSize.icon === 'w-4 h-4' ? 'w-8 h-8' : 
    currentSize.icon === 'w-6 h-6' ? 'w-12 h-12' : 'w-16 h-16',
    currentOperation.bgColor,
    'animate-pulse'
  );

  return (
    <div 
      className={containerClasses}
      data-name={dataName}
      role="status"
      aria-live="polite"
      aria-label={displayText}
    >
      <div className="flex flex-col items-center gap-3">
        {/* Icon with animated background */}
        <div className={iconContainerClasses}>
          {/* Spinning loader ring */}
          <Loader2 
            className={cn(
              'absolute inset-0 m-auto',
              currentSize.icon,
              currentOperation.color,
              'animate-spin'
            )}
            data-name={`${dataName}-spinner`}
          />
          
          {/* Main operation icon */}
          <MainIcon 
            className={cn(
              currentSize.icon === 'w-4 h-4' ? 'w-3 h-3' :
              currentSize.icon === 'w-6 h-6' ? 'w-4 h-4' : 'w-6 h-6',
              currentOperation.color,
              'animate-pulse'
            )}
            data-name={`${dataName}-icon`}
          />
        </div>

        {/* Text */}
        {showText && (
          <div className="text-center">
            <p 
              className={cn(
                currentSize.text,
                'font-medium',
                currentOperation.color,
                'select-none'
              )}
              data-name={`${dataName}-text`}
            >
              {displayText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Export specialized variants for common settings operations

/**
 * Loading indicator for settings modal initialization
 */
export function SettingsModalLoader({ 
  text = 'Načítám nastavení...', 
  ...props 
}: Omit<SettingsLoadingIndicatorProps, 'operation'>) {
  return (
    <SettingsLoadingIndicator 
      operation="loading"
      overlay
      text={text}
      data-name="settings-modal-loader"
      {...props} 
    />
  );
}

/**
 * Loading indicator for saving settings
 */
export function SettingsSaveLoader({ 
  text = 'Ukládám nastavení...', 
  ...props 
}: Omit<SettingsLoadingIndicatorProps, 'operation'>) {
  return (
    <SettingsLoadingIndicator 
      operation="saving"
      size="sm"
      text={text}
      data-name="settings-save-loader"
      {...props} 
    />
  );
}

/**
 * Loading indicator for API key validation
 */
export function APIKeyValidationLoader({ 
  text = 'Ověřuji API klíč...', 
  ...props 
}: Omit<SettingsLoadingIndicatorProps, 'operation'>) {
  return (
    <SettingsLoadingIndicator 
      operation="validating"
      size="sm"
      text={text}
      data-name="api-key-validation-loader"
      {...props} 
    />
  );
}

/**
 * Loading indicator for connection testing
 */
export function ConnectionTestLoader({ 
  text = 'Testuji připojení...', 
  ...props 
}: Omit<SettingsLoadingIndicatorProps, 'operation'>) {
  return (
    <SettingsLoadingIndicator 
      operation="testing"
      size="sm"
      text={text}
      data-name="connection-test-loader"
      {...props} 
    />
  );
}
