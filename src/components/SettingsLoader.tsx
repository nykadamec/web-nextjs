import { Settings, Loader2, Cog } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SettingsLoaderProps {
  /** Size of the loading indicator */
  size?: 'sm' | 'md' | 'lg';
  /** Show text description */
  showText?: boolean;
  /** Custom text to display */
  text?: string;
  /** Show as overlay over content */
  overlay?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Data name for testing */
  'data-name'?: string;
}

/**
 * Loading indicator specifically for "Načítám nastavení" operations
 * Optimized for settings loading with Czech localization
 */
export default function SettingsLoader({
  size = 'md',
  showText = true,
  text = 'Načítám nastavení...',
  overlay = false,
  className,
  'data-name': dataName = 'settings-loader',
}: SettingsLoaderProps) {
  
  // Size configurations
  const sizeConfig = {
    sm: {
      icon: 'w-4 h-4',
      text: 'text-xs',
      gap: 'gap-2',
      padding: 'p-3',
      container: 'w-8 h-8'
    },
    md: {
      icon: 'w-6 h-6',
      text: 'text-sm',
      gap: 'gap-3',
      padding: 'p-4',
      container: 'w-12 h-12'
    },
    lg: {
      icon: 'w-8 h-8',
      text: 'text-base',
      gap: 'gap-4',
      padding: 'p-6',
      container: 'w-16 h-16'
    }
  };

  const currentSize = sizeConfig[size];

  // Main container classes
  const containerClasses = cn(
    'flex items-center justify-center',
    currentSize.gap,
    overlay && [
      'absolute inset-0 z-50',
      'bg-white/90 dark:bg-gray-900/90',
      'backdrop-blur-sm'
    ],
    !overlay && [
      'rounded-lg border border-blue-200 dark:border-blue-800',
      'bg-blue-50 dark:bg-blue-900/20',
      currentSize.padding
    ],
    className
  );

  // Icon container with animated background
  const iconContainerClasses = cn(
    'relative flex items-center justify-center',
    'rounded-full',
    currentSize.container,
    'bg-blue-100 dark:bg-blue-900/40',
    'animate-pulse'
  );

  return (
    <div 
      className={containerClasses}
      data-name={dataName}
      role="status"
      aria-live="polite"
      aria-label={text}
    >
      <div className="flex flex-col items-center gap-3">
        {/* Animated icon container */}
        <div className={iconContainerClasses}>
          {/* Spinning outer ring */}
          <Loader2 
            className={cn(
              'absolute inset-0 m-auto',
              currentSize.icon,
              'text-blue-600 dark:text-blue-400',
              'animate-spin'
            )}
            data-name={`${dataName}-spinner`}
          />
          
          {/* Settings icon with subtle rotation */}
          <Settings 
            className={cn(
              size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6',
              'text-blue-700 dark:text-blue-300',
              'animate-pulse'
            )}
            data-name={`${dataName}-settings-icon`}
          />
        </div>

        {/* Loading text */}
        {showText && (
          <div className="text-center">
            <p 
              className={cn(
                currentSize.text,
                'font-medium',
                'text-blue-700 dark:text-blue-300',
                'select-none'
              )}
              data-name={`${dataName}-text`}
            >
              {text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Export specialized variants

/**
 * Full overlay settings loader for modal dialogs
 */
export function SettingsModalOverlay({ 
  text = 'Načítám nastavení...', 
  ...props 
}: Omit<SettingsLoaderProps, 'overlay'>) {
  return (
    <SettingsLoader 
      overlay
      size="lg"
      text={text}
      data-name="settings-modal-overlay"
      {...props} 
    />
  );
}

/**
 * Inline settings loader for smaller spaces
 */
export function InlineSettingsLoader({ 
  size = 'sm',
  showText = false,
  ...props 
}: SettingsLoaderProps) {
  return (
    <SettingsLoader 
      size={size}
      showText={showText}
      data-name="inline-settings-loader"
      {...props} 
    />
  );
}

/**
 * Card-style settings loader with border
 */
export function SettingsCard({ 
  text = 'Načítám nastavení...', 
  ...props 
}: SettingsLoaderProps) {
  return (
    <div className="min-h-[200px] flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
      <SettingsLoader 
        text={text}
        overlay={false}
        className="border-0 bg-transparent p-0"
        data-name="settings-card-loader"
        {...props} 
      />
    </div>
  );
}

/**
 * Compact button loader for settings actions
 */
export function SettingsButtonLoader({ 
  size = 'sm',
  showText = false,
  ...props 
}: SettingsLoaderProps) {
  return (
    <SettingsLoader 
      size={size}
      showText={showText}
      overlay={false}
      className="border-0 bg-transparent p-0"
      data-name="settings-button-loader"
      {...props} 
    />
  );
}
