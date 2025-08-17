/**
 * Global type definitions for the Image Description Analyzer application
 */

// Theme types
export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

// API Provider types
export type AIProvider = 'openai' | 'gemini' | 'zai';
export type GeminiModel = 'gemini-2.5-flash' | 'gemini-2.5-pro';
export type OpenAIModel = 'gpt-4o-mini' | 'gpt-4o' | 'gpt-4-turbo';

// Language types
export type Language = 'english' | 'czech' | 'polish' | 'german';

// Detail level types
export type DetailLevel = 'brief' | 'detailed' | 'comprehensive';

// Output length types
export type OutputLength = 'short' | 'normal' | 'long';

// Output style types
export type OutputStyle = 'flux1' | 'midjourney' | 'gpt-image' | 'imagen4' | 'basic-ai-image-generator';

// Settings types
export interface APIKeys {
  openai: string;
  zai: string;
  gemini: string;
}

export interface Settings {
  language: Language;
  detailLevel: DetailLevel;
  outputLength: OutputLength;
  outputStyle: OutputStyle;
  model: AIProvider;
  geminiModel: GeminiModel;
  apiKeys: APIKeys;
}

// Upload types
export interface UploadState {
  loading: boolean;
  error: string | null;
  progress: number;
}

export interface UploadResult {
  success: boolean;
  description?: string;
  error?: string;
  metadata?: ImageMetadata;
}

// Image types
export interface ImageMetadata {
  filename: string;
  size: number;
  type: string;
  dimensions: {
    width: number;
    height: number;
  };
  uploadedAt: string;
}

export interface ImageFile extends File {
  preview?: string;
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AnalyzeImageResponse {
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

export interface SettingsResponse {
  settings: Settings | null;
  deviceId: string;
}

// Device types
export interface DeviceInfo {
  id: string;
  platform: string;
  browser: string;
  resolution: string;
  language: string;
  userAgent: string;
  createdAt: string;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-name'?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'full';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface LoadingIndicatorProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  text?: string;
  fullScreen?: boolean;
}

export interface SettingsLoadingIndicatorProps extends BaseComponentProps {
  operation?: 'loading' | 'saving' | 'testing' | 'validating' | 'syncing';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  text?: string;
  overlay?: boolean;
}

export interface SettingsLoaderProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  text?: string;
  overlay?: boolean;
}

export interface ThemeToggleProps extends BaseComponentProps {
  showLabel?: boolean;
}

export interface SettingsModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (settings: Partial<Settings> | ((prev: Settings) => Settings)) => void;
  onSaveSettings: () => Promise<boolean>;
  saving: boolean;
  error: string | null;
}

// Hook return types
export interface UseThemeReturn {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  changeTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export interface UseSettingsReturn {
  settings: Settings;
  updateSettings: (settings: Partial<Settings> | ((prev: Settings) => Settings)) => void;
  saveSettings: () => Promise<boolean>;
  loadSettings: () => Promise<void>;
  loading: boolean;
  saving: boolean;
  error: string | null;
  deviceId: string | null;
}

export interface UseUploadReturn {
  uploadImage: (file: File) => Promise<UploadResult>;
  analyzeImage: (file: File, settings: Settings) => Promise<UploadResult>;
  state: UploadState;
  reset: () => void;
}

export interface UseDeviceIdReturn {
  deviceId: string | null;
  loading: boolean;
  error: string | null;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

export interface ValidationError extends AppError {
  field: string;
  value: any;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Event types
export interface ImageUploadEvent {
  file: ImageFile;
  preview: string;
  metadata: ImageMetadata;
}

export interface AnalysisCompleteEvent {
  description: string;
  metadata: ImageMetadata;
  settings: Settings;
  processingTime: number;
}

// Configuration types
export interface AppConfig {
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

// Database types (for future use)
export interface DatabaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession extends DatabaseRecord {
  deviceId: string;
  settings: Settings;
  lastActivity: string;
}

export interface AnalysisHistory extends DatabaseRecord {
  deviceId: string;
  imageHash: string;
  description: string;
  settings: Settings;
  processingTime: number;
  model: AIProvider;
}

// Export all types as a namespace for easier imports
export namespace Types {
  // Types are already exported above, no need to re-export here
}
