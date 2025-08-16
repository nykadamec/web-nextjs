import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant style
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg' | 'full';
  
  /**
   * Whether button should display with icon
   */
  isWithIcon?: boolean;
  
  /**
   * Icon component from lucide-react
   */
  icon?: LucideIcon;
  
  /**
   * Button text content
   */
  text?: string;
  
  /**
   * Loading state
   */
  isLoading?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Data attribute for element identification
   */
  'data-name'?: string;
}

/**
 * Reusable Button component with multiple variants and icon support
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isWithIcon = false,
  icon: Icon,
  text,
  isLoading = false,
  className,
  disabled,
  children,
  'data-name': dataName,
  ...props
}) => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'rounded-lg',
    'font-medium',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:pointer-events-none'
  ];

  const variantClasses = {
    primary: [
      'bg-blue-600',
      'text-white',
      'hover:bg-blue-700',
      'focus:ring-blue-500',
      'shadow-sm'
    ],
    secondary: [
      'bg-gray-600',
      'text-white',
      'hover:bg-gray-700',
      'focus:ring-gray-500',
      'shadow-sm'
    ],
    outline: [
      'border',
      'border-gray-300',
      'bg-white',
      'text-gray-700',
      'hover:bg-gray-50',
      'focus:ring-blue-500',
      'shadow-sm'
    ],
    ghost: [
      'bg-transparent',
      'text-gray-600',
      'hover:bg-gray-100',
      'focus:ring-gray-500'
    ]
  };

  const sizeClasses = {
    sm: ['px-3', 'py-1.5', 'text-sm'],
    md: ['px-4', 'py-2', 'text-sm'],
    lg: ['px-6', 'py-3', 'text-base'],
    full: ['w-full', 'px-4', 'py-2', 'text-sm']
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    full: 'w-4 h-4'
  };

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = children || text;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      data-name={dataName}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
          Loading...
        </>
      ) : (
        <>
          {isWithIcon && Icon && (
            <Icon className={iconSizeClasses[size]} />
          )}
          {content}
        </>
      )}
    </button>
  );
};

export default Button;
