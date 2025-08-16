# Button Component Documentation

## Overview

The Button component is a flexible, reusable React component built with TypeScript and Tailwind CSS. It supports multiple variants, sizes, icons, and states to cover various UI needs.

## Features

- **Multiple Variants**: Primary, Secondary, Outline, Ghost
- **Flexible Sizing**: Small, Medium, Large, Full Width
- **Icon Support**: Integration with Lucide React icons
- **Loading States**: Built-in loading spinner
- **Accessibility**: Proper focus management and keyboard navigation
- **TypeScript**: Full type safety with comprehensive prop interfaces

## Installation

The component uses the following dependencies:
- `lucide-react` - For icons
- `clsx` - For conditional class names
- `tailwind-merge` - For Tailwind CSS class merging

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Button size |
| `isWithIcon` | `boolean` | `false` | Whether to display an icon |
| `icon` | `LucideIcon` | `undefined` | Icon component from lucide-react |
| `text` | `string` | `undefined` | Button text content |
| `isLoading` | `boolean` | `false` | Loading state |
| `className` | `string` | `undefined` | Additional CSS classes |

## Usage Examples

### Basic Button
```tsx
import { Button } from '@/components/Button';

<Button text="Click me" />
```

### Button with Icon
```tsx
import { Settings } from 'lucide-react';
import { Button } from '@/components/Button';

<Button
  variant="outline"
  isWithIcon={true}
  icon={Settings}
  text="Settings"
/>
```

### Full Width Button
```tsx
<Button
  variant="outline"
  size="full"
  isWithIcon={true}
  icon={Plus}
  text="Full Size"
/>
```

### Loading Button
```tsx
<Button
  variant="primary"
  isLoading={true}
  text="Processing..."
/>
```

## Design System Examples

Based on the provided design requirements:

### "Full Size" Button
```tsx
<Button
  variant="outline"
  size="full"
  isWithIcon={true}
  icon={Plus}
  text="Full Size"
  className="text-gray-500 border-gray-300"
/>
```

### "Upload New" Button
```tsx
<Button
  variant="ghost"
  text="Upload New"
  className="text-gray-600"
/>
```

### "Settings" Button
```tsx
<Button
  variant="outline"
  size="lg"
  isWithIcon={true}
  icon={Settings}
  text="Settings"
  className="border-gray-300 text-gray-700"
/>
```

## Styling

The component uses Tailwind CSS classes and supports:
- Hover states
- Focus states
- Disabled states
- Loading states
- Custom styling via className prop

## Accessibility

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Disabled state handling
