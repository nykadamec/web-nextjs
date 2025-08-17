# TypeScript Types Documentation

Kompletní dokumentace typových definic pro Image Description Analyzer aplikaci.

## Přehled

Všechny typy jsou centralizovány v `src/types/index.ts` pro lepší maintainability a konzistenci napříč aplikací.

## Základní typy

### Theme Types
```typescript
type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';
```

### AI Provider Types
```typescript
type AIProvider = 'openai' | 'gemini' | 'zai';
type GeminiModel = 'gemini-2.5-flash' | 'gemini-2.5-pro';
type OpenAIModel = 'gpt-4o-mini' | 'gpt-4o' | 'gpt-4-turbo';
```

### Language & Detail Types
```typescript
type Language = 'english' | 'czech' | 'polish' | 'german';
type DetailLevel = 'brief' | 'detailed' | 'comprehensive';
```

## Interface Definice

### Settings
```typescript
interface APIKeys {
  openai: string;
  zai: string;
  gemini: string;
}

interface Settings {
  language: Language;
  detailLevel: DetailLevel;
  model: AIProvider;
  geminiModel: GeminiModel;
  apiKeys: APIKeys;
}
```

### Upload & Image Types
```typescript
interface UploadState {
  loading: boolean;
  error: string | null;
  progress: number;
}

interface ImageMetadata {
  filename: string;
  size: number;
  type: string;
  dimensions: {
    width: number;
    height: number;
  };
  uploadedAt: string;
}
```

### API Response Types
```typescript
interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface AnalyzeImageResponse {
  description: string;
  model: AIProvider;
  language: Language;
  detailLevel: DetailLevel;
  processingTime: number;
  tokenUsage?: {
    prompt: number;
    completion: number;
    total: number;
  };
}
```

## Component Props Types

### Base Component Props
```typescript
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-name'?: string;
}
```

### Button Props
```typescript
interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'full';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
```

### Loading Indicator Props
```typescript
interface LoadingIndicatorProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  text?: string;
  fullScreen?: boolean;
}
```

### Theme Toggle Props
```typescript
interface ThemeToggleProps extends BaseComponentProps {
  showLabel?: boolean;
}
```

### Settings Modal Props
```typescript
interface SettingsModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (settings: Partial<Settings> | ((prev: Settings) => Settings)) => void;
  onSaveSettings: () => Promise<boolean>;
  saving: boolean;
  error: string | null;
}
```

## Hook Return Types

### useTheme Hook
```typescript
interface UseThemeReturn {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  changeTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}
```

### useSettings Hook
```typescript
interface UseSettingsReturn {
  settings: Settings;
  updateSettings: (settings: Partial<Settings> | ((prev: Settings) => Settings)) => void;
  saveSettings: () => Promise<boolean>;
  loadSettings: () => Promise<void>;
  loading: boolean;
  saving: boolean;
  error: string | null;
  deviceId: string | null;
}
```

### useUpload Hook
```typescript
interface UseUploadReturn {
  uploadImage: (file: File) => Promise<UploadResult>;
  analyzeImage: (file: File, settings: Settings) => Promise<UploadResult>;
  state: UploadState;
  reset: () => void;
}
```

## Error Types

### Base Error
```typescript
interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}
```

### Validation Error
```typescript
interface ValidationError extends AppError {
  field: string;
  value: any;
}
```

## Utility Types

### Optional Fields
```typescript
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
```

### Required Fields
```typescript
type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
```

## Event Types

### Image Upload Event
```typescript
interface ImageUploadEvent {
  file: ImageFile;
  preview: string;
  metadata: ImageMetadata;
}
```

### Analysis Complete Event
```typescript
interface AnalysisCompleteEvent {
  description: string;
  metadata: ImageMetadata;
  settings: Settings;
  processingTime: number;
}
```

## Configuration Types

### App Config
```typescript
interface AppConfig {
  app: {
    name: string;
    version: string;
    author: string;
    github: string;
    description: string;
    port: number;
  };
  components: {
    [key: string]: any;
  };
  dependencies: {
    [category: string]: string[];
  };
  development: {
    packageManager: string;
    nodeVersion: string;
    typescript: boolean;
    eslint: boolean;
  };
}
```

## Database Types (Future Use)

### Base Record
```typescript
interface DatabaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}
```

### User Session
```typescript
interface UserSession extends DatabaseRecord {
  deviceId: string;
  settings: Settings;
  lastActivity: string;
}
```

## Namespace Export

Pro snadnější organizaci jsou typy také exportovány jako namespace:

```typescript
export namespace Types {
  export type Theme = Theme;
  export type Settings = Settings;
  export type UploadResult = UploadResult;
  export type APIResponse<T> = APIResponse<T>;
  export type LoadingIndicatorProps = LoadingIndicatorProps;
}
```

## Použití

### Import jednotlivých typů
```typescript
import type { Settings, Theme, LoadingIndicatorProps } from '@/types';
```

### Import namespace
```typescript
import type { Types } from '@/types';

const settings: Types.Settings = { /* ... */ };
```

### V komponentách
```typescript
import type { ButtonProps } from '@/types';

export default function Button(props: ButtonProps) {
  // ...
}
```

### V hooks
```typescript
import type { UseThemeReturn } from '@/types';

function useTheme(): UseThemeReturn {
  // ...
}
```

## Best Practices

### 1. Vždy používejte typy
```typescript
// Good
const settings: Settings = { /* ... */ };

// Bad
const settings = { /* ... */ };
```

### 2. Rozšiřujte base typy
```typescript
interface MyComponentProps extends BaseComponentProps {
  customProp: string;
}
```

### 3. Používejte utility typy
```typescript
// Partial update
type PartialSettings = Partial<Settings>;

// Optional fields
type OptionalAPIKeys = Optional<Settings, 'apiKeys'>;
```

### 4. Typujte return hodnoty hooks
```typescript
function useCustomHook(): CustomHookReturn {
  // ...
}
```

### 5. Používejte generics pro API responses
```typescript
const response: APIResponse<Settings> = await fetchSettings();
```
