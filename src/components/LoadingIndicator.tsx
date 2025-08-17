import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LoadingIndicatorProps } from '@/types';

/**
 * Loading indicator component with multiple variants and sizes
 * Supports different animations and can be used as overlay or inline
 */
export default function LoadingIndicator({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  text,
  fullScreen = false,
  className,
  'data-name': dataName = 'loading-indicator',
  ...props
}: LoadingIndicatorProps) {
  
  // Size configurations
  const sizeClasses = {
    sm: {
      spinner: 'w-4 h-4',
      dots: 'w-1 h-1',
      text: 'text-xs',
      container: 'gap-2'
    },
    md: {
      spinner: 'w-6 h-6',
      dots: 'w-1.5 h-1.5',
      text: 'text-sm',
      container: 'gap-3'
    },
    lg: {
      spinner: 'w-8 h-8',
      dots: 'w-2 h-2',
      text: 'text-base',
      container: 'gap-4'
    },
    xl: {
      spinner: 'w-12 h-12',
      dots: 'w-3 h-3',
      text: 'text-lg',
      container: 'gap-5'
    }
  };

  // Color configurations
  const colorClasses = {
    primary: 'text-blue-600 dark:text-blue-400',
    secondary: 'text-gray-600 dark:text-gray-400',
    white: 'text-white',
    gray: 'text-gray-500 dark:text-gray-400'
  };

  const currentSize = sizeClasses[size];
  const currentColor = colorClasses[color];

  // Spinner variant
  const SpinnerVariant = () => (
    <Loader2 
      className={cn(currentSize.spinner, currentColor, 'animate-spin')}
      data-name={`${dataName}-spinner`}
    />
  );

  // Dots variant
  const DotsVariant = () => (
    <div 
      className={cn('flex items-center gap-1', currentSize.container)}
      data-name={`${dataName}-dots`}
    >
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            currentSize.dots,
            'rounded-full animate-pulse',
            currentColor.replace('text-', 'bg-')
          )}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1s'
          }}
          data-name={`${dataName}-dot-${index}`}
        />
      ))}
    </div>
  );

  // Pulse variant
  const PulseVariant = () => (
    <div 
      className={cn(
        currentSize.spinner,
        'rounded-full animate-pulse',
        currentColor.replace('text-', 'bg-')
      )}
      data-name={`${dataName}-pulse`}
    />
  );

  // Bars variant
  const BarsVariant = () => (
    <div 
      className={cn('flex items-end gap-1', currentSize.container)}
      data-name={`${dataName}-bars`}
    >
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={cn(
            'w-1 animate-pulse',
            currentColor.replace('text-', 'bg-'),
            size === 'sm' ? 'h-3' : size === 'md' ? 'h-4' : size === 'lg' ? 'h-6' : 'h-8'
          )}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: '0.8s'
          }}
          data-name={`${dataName}-bar-${index}`}
        />
      ))}
    </div>
  );

  // Select variant component
  const VariantComponent = () => {
    switch (variant) {
      case 'dots':
        return <DotsVariant />;
      case 'pulse':
        return <PulseVariant />;
      case 'bars':
        return <BarsVariant />;
      case 'spinner':
      default:
        return <SpinnerVariant />;
    }
  };

  // Container classes
  const containerClasses = cn(
    'flex items-center justify-center',
    currentSize.container,
    fullScreen && [
      'fixed inset-0 z-50',
      'bg-white/80 dark:bg-gray-900/80',
      'backdrop-blur-sm'
    ],
    !fullScreen && 'inline-flex',
    className
  );

  // Text classes
  const textClasses = cn(
    currentSize.text,
    'font-medium',
    currentColor,
    'select-none'
  );

  return (
    <div 
      className={containerClasses}
      data-name={dataName}
      role="status"
      aria-live="polite"
      aria-label={text || 'Loading'}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <VariantComponent />
        {text && (
          <span 
            className={textClasses}
            data-name={`${dataName}-text`}
          >
            {text}
          </span>
        )}
      </div>
    </div>
  );
}

// Export additional loading components for specific use cases

/**
 * Full screen loading overlay
 */
export function FullScreenLoader({ 
  text = 'Loading...', 
  ...props 
}: Omit<LoadingIndicatorProps, 'fullScreen'>) {
  return (
    <LoadingIndicator 
      fullScreen 
      text={text} 
      size="lg"
      data-name="fullscreen-loader"
      {...props} 
    />
  );
}

/**
 * Inline loading spinner for buttons
 */
export function ButtonLoader({ 
  size = 'sm', 
  color = 'white',
  ...props 
}: LoadingIndicatorProps) {
  return (
    <LoadingIndicator 
      size={size} 
      color={color}
      variant="spinner"
      data-name="button-loader"
      {...props} 
    />
  );
}

/**
 * Card loading placeholder
 */
export function CardLoader({ 
  text = 'Loading content...', 
  ...props 
}: LoadingIndicatorProps) {
  return (
    <div className="flex items-center justify-center p-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
      <LoadingIndicator 
        text={text} 
        variant="dots"
        data-name="card-loader"
        {...props} 
      />
    </div>
  );
}

/**
 * Page loading skeleton
 */
export function PageLoader({ 
  text = 'Loading page...', 
  ...props 
}: LoadingIndicatorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <LoadingIndicator 
        text={text} 
        size="xl"
        variant="spinner"
        data-name="page-loader"
        {...props} 
      />
    </div>
  );
}
