# Settings Loading Indicator

Specialized loading indicator component designed specifically for settings operations in the application.

## Overview

The `SettingsLoadingIndicator` component provides contextual loading animations and messages for different settings-related operations. It extends the basic loading functionality with operation-specific icons, colors, and messages.

## Features

- **Operation-specific styling**: Different colors and icons for each operation type
- **Contextual messages**: Automatic Czech text for different operations
- **Flexible sizing**: Small, medium, and large sizes
- **Overlay support**: Can be displayed as an overlay over settings content
- **Accessibility**: Proper ARIA labels and live regions
- **Data attributes**: Comprehensive data-name attributes for testing

## Basic Usage

```tsx
import { SettingsLoadingIndicator } from '@/components';

// Basic loading indicator
<SettingsLoadingIndicator operation="loading" />

// Saving operation with custom text
<SettingsLoadingIndicator 
  operation="saving" 
  text="Ukládám vaše nastavení..." 
/>

// As overlay
<SettingsLoadingIndicator 
  operation="validating" 
  overlay 
/>
```

## Props

### SettingsLoadingIndicatorProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `operation` | `'loading' \| 'saving' \| 'testing' \| 'validating' \| 'syncing'` | `'loading'` | Type of settings operation |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the indicator |
| `showText` | `boolean` | `true` | Whether to show text description |
| `text` | `string` | - | Custom text (overrides default) |
| `overlay` | `boolean` | `false` | Show as overlay over content |
| `className` | `string` | - | Additional CSS classes |
| `data-name` | `string` | `'settings-loading-indicator'` | Data attribute for testing |

## Operation Types

### Loading (`loading`)
- **Icon**: Settings gear
- **Color**: Blue
- **Default text**: "Načítám nastavení..."
- **Use case**: Initial settings load

### Saving (`saving`)
- **Icon**: Database
- **Color**: Green
- **Default text**: "Ukládám nastavení..."
- **Use case**: Saving settings changes

### Testing (`testing`)
- **Icon**: Cog
- **Color**: Orange
- **Default text**: "Testuji připojení..."
- **Use case**: Testing API connections

### Validating (`validating`)
- **Icon**: Key
- **Color**: Purple
- **Default text**: "Ověřuji API klíče..."
- **Use case**: Validating API keys

### Syncing (`syncing`)
- **Icon**: Monitor
- **Color**: Indigo
- **Default text**: "Synchronizuji nastavení..."
- **Use case**: Syncing settings across devices

## Specialized Components

### SettingsModalLoader

Loading indicator for settings modal initialization with overlay.

```tsx
import { SettingsModalLoader } from '@/components';

<SettingsModalLoader text="Načítám nastavení..." />
```

### SettingsSaveLoader

Compact loading indicator for save operations.

```tsx
import { SettingsSaveLoader } from '@/components';

<SettingsSaveLoader />
```

### APIKeyValidationLoader

Loading indicator for API key validation.

```tsx
import { APIKeyValidationLoader } from '@/components';

<APIKeyValidationLoader text="Ověřuji OpenAI klíč..." />
```

### ConnectionTestLoader

Loading indicator for connection testing.

```tsx
import { ConnectionTestLoader } from '@/components';

<ConnectionTestLoader />
```

## Examples

### In Settings Modal

```tsx
// Loading overlay while settings are being loaded
{isLoading && <SettingsModalLoader />}

// Save button with loading state
<button disabled={saving}>
  {saving ? (
    <SettingsSaveLoader size="sm" showText={false} />
  ) : (
    'Uložit nastavení'
  )}
</button>
```

### API Key Validation

```tsx
// During API key testing
{isValidating && (
  <APIKeyValidationLoader 
    text={`Ověřuji ${provider} klíč...`}
  />
)}
```

### Settings Sync

```tsx
// During settings synchronization
<SettingsLoadingIndicator 
  operation="syncing"
  size="lg"
  text="Synchronizuji nastavení mezi zařízeními..."
/>
```

## Styling

The component uses Tailwind CSS classes and follows the application's design system:

- **Colors**: Operation-specific color schemes
- **Animation**: Spinning loader with pulsing background
- **Typography**: Responsive text sizing
- **Spacing**: Consistent gap and padding

## Accessibility

- **ARIA labels**: Proper labeling for screen readers
- **Live regions**: Updates announced to assistive technology
- **Role attributes**: Semantic role="status"
- **Focus management**: Proper focus handling in overlay mode

## Data Attributes

All components include comprehensive data-name attributes:

- `data-name="settings-loading-indicator"` - Main container
- `data-name="settings-loading-indicator-spinner"` - Spinning loader
- `data-name="settings-loading-indicator-icon"` - Operation icon
- `data-name="settings-loading-indicator-text"` - Text content

Specialized components have their own data-name prefixes:
- `settings-modal-loader`
- `settings-save-loader`
- `api-key-validation-loader`
- `connection-test-loader`

## Integration with Settings

The component is designed to integrate seamlessly with the existing settings system:

1. **SettingsModal**: Use `SettingsModalLoader` for initial loading
2. **Save operations**: Use `SettingsSaveLoader` in buttons
3. **API validation**: Use `APIKeyValidationLoader` for key testing
4. **Connection testing**: Use `ConnectionTestLoader` for connectivity checks

## Best Practices

1. **Choose appropriate operation type** for context
2. **Use overlay sparingly** to avoid blocking user interaction
3. **Provide meaningful text** for better user experience
4. **Consider size** based on available space
5. **Test accessibility** with screen readers
