# Dark Mode Implementation

This document describes the dark mode implementation in the Image Description Analyzer application.

## Overview

The application supports three theme modes:
- **Light**: Traditional light theme
- **Dark**: Dark theme for low-light environments
- **System**: Automatically follows system preference

## Architecture

### Theme Hook (`useTheme`)

The `useTheme` hook manages theme state and provides the following functionality:

```typescript
const { theme, resolvedTheme, changeTheme, toggleTheme } = useTheme();
```

#### Features:
- **Persistence**: Theme preference is saved to localStorage
- **System Detection**: Automatically detects system color scheme preference
- **Real-time Updates**: Listens for system theme changes
- **Document Class Management**: Applies theme classes to document root

#### API:
- `theme`: Current theme setting ('light' | 'dark' | 'system')
- `resolvedTheme`: Actual theme being used ('light' | 'dark')
- `changeTheme(newTheme)`: Change to specific theme
- `toggleTheme()`: Toggle between light and dark (skips system)

### Theme Toggle Component

The `ThemeToggle` component provides a user interface for switching themes:

```typescript
<ThemeToggle className="optional-classes" showLabel={false} />
```

#### Features:
- **Cycling**: Cycles through light → dark → system → light
- **Icons**: Visual indicators for each theme mode
- **Tooltip**: Shows current theme and action
- **Accessibility**: Proper ARIA labels and keyboard support

## Implementation Details

### Tailwind Configuration

Dark mode is configured using Tailwind's class-based strategy:

```javascript
module.exports = {
  darkMode: 'class',
  // ... rest of config
}
```

### CSS Variables

Global CSS variables are defined for consistent theming:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}
```

### Component Styling

All components use Tailwind's dark mode utilities:

```typescript
className="bg-white dark:bg-gray-900 text-black dark:text-white"
```

## Usage Examples

### Basic Theme Toggle

```typescript
import ThemeToggle from '@/components/ThemeToggle';

function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

### Custom Theme Control

```typescript
import useTheme from '@/hooks/useTheme';

function CustomThemeControl() {
  const { theme, changeTheme } = useTheme();
  
  return (
    <select value={theme} onChange={(e) => changeTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
```

### Conditional Rendering

```typescript
import useTheme from '@/hooks/useTheme';

function ConditionalComponent() {
  const { resolvedTheme } = useTheme();
  
  return (
    <div>
      {resolvedTheme === 'dark' ? (
        <DarkModeSpecificComponent />
      ) : (
        <LightModeSpecificComponent />
      )}
    </div>
  );
}
```

## Color Palette

### Light Theme
- Background: `#ffffff`
- Foreground: `#171717`
- Primary: `#000000`
- Secondary: `#6b7280`
- Border: `#d1d5db`

### Dark Theme
- Background: `#0a0a0a`
- Foreground: `#ededed`
- Primary: `#3b82f6`
- Secondary: `#9ca3af`
- Border: `#374151`

## Best Practices

### 1. Always Use Dark Mode Classes
```typescript
// Good
className="bg-white dark:bg-gray-900"

// Bad
className="bg-white"
```

### 2. Test Both Themes
Always test components in both light and dark modes to ensure proper contrast and readability.

### 3. Use Semantic Colors
Prefer semantic color names over specific values:
```typescript
// Good
className="text-gray-900 dark:text-white"

// Better
className="text-foreground"
```

### 4. Handle System Preference
Always provide a system option for users who prefer automatic theme switching.

## Browser Support

- **Modern Browsers**: Full support for all features
- **Legacy Browsers**: Graceful fallback to light theme
- **Mobile**: Proper theme-color meta tag support

## Accessibility

- **High Contrast**: Both themes meet WCAG contrast requirements
- **Reduced Motion**: Respects user's motion preferences
- **Keyboard Navigation**: Full keyboard support for theme toggle
- **Screen Readers**: Proper ARIA labels and announcements

## Troubleshooting

### Theme Not Persisting
Check localStorage permissions and ensure the hook is properly initialized.

### Flashing on Load
Ensure the theme class is applied before React hydration. Consider adding a script tag in the HTML head.

### System Theme Not Detected
Verify that the browser supports `prefers-color-scheme` media query.

## Future Enhancements

- **Custom Themes**: Support for user-defined color schemes
- **Automatic Switching**: Time-based theme switching
- **High Contrast Mode**: Additional accessibility theme
- **Theme Animations**: Smooth transitions between themes
