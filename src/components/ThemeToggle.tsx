import { Sun, Moon, Monitor } from 'lucide-react';
import useTheme from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import type { Theme, ThemeToggleProps } from '@/types';

/**
 * Theme toggle component with support for light, dark, and system themes
 * Displays appropriate icon and allows cycling through theme options
 */
export default function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, resolvedTheme, changeTheme } = useTheme();

  const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
    { value: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[0];

  const handleThemeChange = () => {
    const currentIndex = themes.findIndex(t => t.value === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    changeTheme(themes[nextIndex].value);
  };

  return (
    <button
      data-name="theme-toggle"
      onClick={handleThemeChange}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
        'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
        'text-gray-700 dark:text-gray-300',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'dark:focus:ring-offset-gray-900',
        className
      )}
      title={`Current theme: ${currentTheme.label}. Click to change.`}
    >
      <span data-name="theme-icon" className="flex-shrink-0">
        {currentTheme.icon}
      </span>
      {showLabel && (
        <span data-name="theme-label" className="text-sm font-medium">
          {currentTheme.label}
        </span>
      )}
    </button>
  );
}
