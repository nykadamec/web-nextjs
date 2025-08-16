# Data-Name Attributes Documentation

This document provides a comprehensive mapping of all `data-name` attributes used throughout the application. These attributes enable easy element identification for testing, analytics, and debugging purposes.

## Naming Convention

The `data-name` attributes follow a descriptive naming pattern based on element function:
- Format: `element-function-type` (e.g., `settings-button`, `upload-area`)
- Use kebab-case for multi-word names
- Be descriptive and specific to the element's purpose

## Layout Components

### Root Layout (`src/app/layout.tsx`)
- `root-html` - The main HTML element
- `root-body` - The main body element

## Main Page (`src/app/page.tsx`)

### Loading State
- `loading-container` - Main loading container
- `loading-content` - Loading content wrapper
- `loading-text` - Loading message text

### Main Structure
- `main-container` - Root container for the page
- `main-header` - Main page header
- `header-content` - Header content wrapper
- `header-brand` - Brand section in header
- `brand-icon` - Brand icon container
- `brand-title` - Main title
- `settings-button` - Settings toggle button
- `main-content` - Main content area

### Hero Section
- `hero-section` - Hero section container
- `hero-title` - Main hero title
- `hero-description` - Hero description text

### Upload Area
- `upload-container` - Upload section container
- `upload-area` - Drop zone area
- `upload-title` - Upload area title
- `upload-subtitle` - Upload area subtitle
- `choose-file-button` - File selection button
- `file-input` - Hidden file input

### Content Grid
- `content-grid` - Main content grid layout

### Image Preview Section
- `image-preview-section` - Image preview container
- `image-preview-header` - Image preview header
- `image-preview-title` - Image preview title
- `image-preview-actions` - Action buttons container
- `image-size-toggle-button` - Size toggle button
- `upload-new-button` - Upload new image button
- `image-preview-container` - Image container
- `image-preview` - The actual image element
- `analyze-image-button` - Analyze button

### Description Section
- `description-section` - AI description container
- `description-header` - Description header
- `description-title` - Description title
- `copy-description-button` - Copy to clipboard button
- `description-content` - Description content area

### State-Specific Elements
- `loading-state` - Loading state container
- `loading-spinner` - Loading spinner container
- `loading-message` - Loading message
- `error-state` - Error state container
- `error-content` - Error content wrapper
- `error-message` - Error message text
- `try-again-button` - Try again button
- `description-prose` - Description prose container
- `description-text` - Actual description text
- `empty-state` - Empty state container
- `empty-message` - Empty state message

### Error Banner
- `error-banner` - Error banner container
- `error-banner-text` - Error banner text

## Settings Modal (`src/components/SettingsModal.tsx`)

### Modal Structure
- `settings-modal-overlay` - Modal overlay container
- `modal-backdrop` - Modal backdrop
- `modal-container` - Modal positioning container
- `settings-modal` - Main modal element
- `modal-header` - Modal header
- `modal-title-section` - Title section
- `modal-title` - Modal title
- `modal-close-button` - Close button
- `modal-content` - Modal content area

### Error Handling
- `settings-error-message` - Settings error message
- `error-text` - Error text content

### Settings Grid
- `settings-grid` - Main settings grid layout

### Model Selection
- `model-selection-section` - Model selection container
- `model-label` - Model selection label
- `model-select-wrapper` - Select wrapper
- `model-select` - Model dropdown
- `model-description` - Model description text

### Gemini Model Section
- `gemini-model-section` - Gemini model container
- `gemini-model-label` - Gemini model label
- `gemini-select-wrapper` - Gemini select wrapper
- `gemini-model-select` - Gemini model dropdown
- `gemini-model-description` - Gemini model description

### Language Selection
- `language-selection-section` - Language section container
- `language-label` - Language selection label
- `language-select-wrapper` - Language select wrapper
- `language-select` - Language dropdown

### Detail Level Selection
- `detail-level-section` - Detail level container
- `detail-level-label` - Detail level label
- `detail-level-options` - Options container
- `detail-level-option-{value}` - Individual option (brief/detailed/extensive)
- `detail-level-radio-{value}` - Radio input for option
- `detail-level-content-{value}` - Option content wrapper
- `detail-level-title-{value}` - Option title
- `detail-level-desc-{value}` - Option description

### API Keys Section
- `api-keys-section` - API keys container
- `api-keys-title` - API keys title
- `api-keys-description` - API keys description
- `api-keys-grid` - API keys grid layout

### API Key Fields
- `openai-api-key-field` - OpenAI field container
- `openai-api-key-label` - OpenAI field label
- `openai-api-key-input` - OpenAI input field
- `zai-api-key-field` - Z.AI field container
- `zai-api-key-label` - Z.AI field label
- `zai-api-key-input` - Z.AI input field
- `gemini-api-key-field` - Gemini field container
- `gemini-api-key-label` - Gemini field label
- `gemini-api-key-input` - Gemini input field

### Device Info Section
- `device-info-section` - Device info container
- `device-info-title` - Device info title
- `device-info-container` - Device info content container
- `device-id-row` - Device ID row
- `device-id-label` - Device ID label
- `device-id-value` - Device ID value
- `platform-row` - Platform row
- `platform-label` - Platform label
- `platform-value` - Platform value
- `browser-row` - Browser row
- `browser-label` - Browser label
- `browser-value` - Browser value
- `resolution-row` - Resolution row
- `resolution-label` - Resolution label
- `resolution-value` - Resolution value
- `language-row` - Language row
- `language-label` - Language label (device info)
- `language-value` - Language value

### Modal Footer
- `modal-footer` - Modal footer container
- `modal-cancel-button` - Cancel button
- `modal-save-button` - Save button

## Button Component (`src/components/Button.tsx`)

The Button component supports a `data-name` prop that can be passed through its interface:

```tsx
interface ButtonProps {
  // ... other props
  'data-name'?: string;
}
```

Usage example:
```tsx
<Button data-name="custom-button" variant="primary">
  Click me
</Button>
```

## Usage Guidelines

### For Testing
```javascript
// Selecting elements in tests
const settingsButton = document.querySelector('[data-name="settings-button"]');
const uploadArea = document.querySelector('[data-name="upload-area"]');
```

### For Analytics
```javascript
// Tracking user interactions
document.querySelector('[data-name="analyze-image-button"]').addEventListener('click', () => {
  analytics.track('analyze_image_clicked');
});
```

### For Debugging
```javascript
// Finding elements during debugging
console.log(document.querySelector('[data-name="error-message"]').textContent);
```

## Best Practices

1. **Consistency**: Always use kebab-case for attribute values
2. **Descriptiveness**: Make names self-explanatory
3. **Specificity**: Be specific enough to avoid conflicts
4. **Maintainability**: Update documentation when adding new attributes
5. **Testing**: Use these attributes instead of CSS classes for test selectors

## Statistics

- **Total data-name attributes**: 39
- **Components covered**: 4 (layout.tsx, page.tsx, SettingsModal.tsx, Button.tsx)
- **Categories**: Layout, Navigation, Forms, Content, States, Actions