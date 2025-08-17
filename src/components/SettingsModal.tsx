import { useState, useEffect } from "react";
import {
  X,
  Settings,
  ChevronDown,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import type { SettingsModalProps } from '@/types';
import APIKeyInput from './APIKeyInput';

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  onSaveSettings,
  saving,
  error,
}: SettingsModalProps) {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deviceId, setDeviceId] = useState('Generuje se...');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDeviceId = localStorage.getItem('deviceId');
      if (storedDeviceId) {
        setDeviceId(storedDeviceId);
      }
    }
  }, [isOpen]);

  const languages = [
    { value: "english", label: "English" },
    { value: "czech", label: "Czech" },
    { value: "polish", label: "Polish" },
    { value: "german", label: "German" },
  ];

  const detailLevels = [
    {
      value: "brief",
      label: "Brief",
      description: "Short, concise description",
    },
    {
      value: "detailed",
      label: "Detailed",
      description: "Comprehensive description with context",
    },
    {
      value: "extensive",
      label: "Extensive",
      description: "Very detailed analysis with all visible elements",
    },
  ];

  const outputLengths = [
    {
      value: "short",
      label: "Short",
      description: "Concise response (50-150 words)",
    },
    {
      value: "normal",
      label: "Normal",
      description: "Balanced description (150-400 words)",
    },
    {
      value: "long",
      label: "Long",
      description: "Comprehensive text (400+ words)",
    },
  ];

  const models = [
    {
      value: "openai",
      label: "OpenAI GPT-4.1-mini",
      description: "Advanced vision model from OpenAI",
    },
    {
      value: "zai",
      label: "Z.AI GLM-4.5V",
      description: "High-performance vision model from Z.AI",
    },
    {
      value: "gemini",
      label: "Google Gemini",
      description: "Google's advanced multimodal AI models",
    },
  ];

  const geminiModels = [
    {
      value: "gemini-2.5-flash",
      label: "Gemini 2.5 Flash",
      description: "Fast and efficient model",
    },
    {
      value: "gemini-2.5-pro",
      label: "Gemini 2.5 Pro",
      description: "Most capable model with advanced reasoning",
    },
  ];

  const outputStyles = [
    {
      value: "basic-ai-image-generator",
      label: "Basic AI Image Generator",
      description: "Simple, clear descriptions without technical jargon",
    },
    {
      value: "midjourney",
      label: "Midjourney Style",
      description: "Structured prompts optimized for Midjourney (≤40 words)",
    },
    {
      value: "flux1",
      label: "Flux1 Style",
      description: "Detailed natural language for Flux AI model",
    },
    {
      value: "gpt-image",
      label: "GPT Image Style",
      description: "Technical, systematic analysis with precise details",
    },
    {
      value: "imagen4",
      label: "Imagen4 Style",
      description: "Poetic, flowing language for Google's Imagen model",
    },
  ];

  const handleSave = async () => {
    const success = await onSaveSettings();
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div data-name="settings-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        data-name="modal-backdrop"
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div data-name="modal-container" className="flex min-h-full items-center justify-center p-4">
        <div data-name="settings-modal" className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-xl">
          {/* Header */}
          <div data-name="modal-header" className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div data-name="modal-title-section" className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-black dark:text-white" />
              <h2 data-name="modal-title" className="text-xl font-semibold text-black dark:text-white">Nastavení</h2>
            </div>
            <button
              data-name="modal-close-button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div data-name="modal-content" className="p-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
            {/* Error Message */}
            {error && (
              <div data-name="settings-error-message" className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p data-name="error-text" className="text-red-800 dark:text-red-300">{error}</p>
              </div>
            )}

            <div data-name="settings-grid" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Model Selection */}
              <div data-name="model-selection-section">
                <label data-name="model-label" className="block text-sm font-medium text-black dark:text-white mb-2">
                  AI Model
                </label>
                <div data-name="model-select-wrapper" className="relative">
                  <select
                    data-name="model-select"
                    value={settings.model}
                    onChange={(e) =>
                      onSettingsChange((prev: any) => ({
                        ...prev,
                        model: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md appearance-none bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-blue-500 focus:border-transparent"
                  >
                    {models.map((model) => (
                      <option key={model.value} value={model.value}>
                        {model.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black dark:text-white pointer-events-none" />
                </div>
                <p data-name="model-description" className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  {models.find((m) => m.value === settings.model)?.description}
                </p>

                {/* Gemini Model Selection */}
                {settings.model === "gemini" && (
                  <div data-name="gemini-model-section" className="mt-3">
                    <label data-name="gemini-model-label" className="block text-sm font-medium text-black dark:text-white mb-2">
                      Gemini Model
                    </label>
                    <div data-name="gemini-select-wrapper" className="relative">
                      <select
                        data-name="gemini-model-select"
                        value={settings.geminiModel}
                        onChange={(e) =>
                          onSettingsChange((prev: any) => ({
                            ...prev,
                            geminiModel: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md appearance-none bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-blue-500 focus:border-transparent"
                      >
                        {geminiModels.map((model) => (
                          <option key={model.value} value={model.value}>
                            {model.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black dark:text-white pointer-events-none" />
                    </div>
                    <p data-name="gemini-model-description" className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      {
                        geminiModels.find(
                          (m) => m.value === settings.geminiModel,
                        )?.description
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Language Selection */}
              <div data-name="language-selection-section">
                <label data-name="language-label" className="block text-sm font-medium text-black dark:text-white mb-2">
                  Description Language
                </label>
                <div data-name="language-select-wrapper" className="relative">
                  <select
                    data-name="language-select"
                    value={settings.language}
                    onChange={(e) =>
                      onSettingsChange((prev: any) => ({
                        ...prev,
                        language: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md appearance-none bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-blue-500 focus:border-transparent"
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black dark:text-white pointer-events-none" />
                </div>
              </div>

              {/* Output Style Selection */}
              <div data-name="output-style-section">
                <label data-name="output-style-label" className="block text-sm font-medium text-black dark:text-white mb-2">
                  Output Style
                </label>
                <div data-name="output-style-select-wrapper" className="relative">
                  <select
                    data-name="output-style-select"
                    value={settings.outputStyle}
                    onChange={(e) =>
                      onSettingsChange((prev: any) => ({
                        ...prev,
                        outputStyle: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md appearance-none bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-blue-500 focus:border-transparent"
                  >
                    {outputStyles.map((style) => (
                      <option key={style.value} value={style.value}>
                        {style.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black dark:text-white pointer-events-none" />
                </div>
                <p data-name="output-style-description" className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  {outputStyles.find((s) => s.value === settings.outputStyle)?.description}
                </p>
              </div>

              {/* Detail Level Selection */}
              <div data-name="detail-level-section">
                <label data-name="detail-level-label" className="block text-sm font-medium text-black dark:text-white mb-2">
                  Detail Level
                </label>
                <div data-name="detail-level-options" className="space-y-2">
                  {detailLevels.map((level) => (
                    <label
                      key={level.value}
                      data-name={`detail-level-option-${level.value}`}
                      className="flex items-start gap-3 cursor-pointer"
                    >
                      <input
                        data-name={`detail-level-radio-${level.value}`}
                        type="radio"
                        name="detailLevel"
                        value={level.value}
                        checked={settings.detailLevel === level.value}
                        onChange={(e) =>
                          onSettingsChange((prev: any) => ({
                            ...prev,
                            detailLevel: e.target.value,
                          }))
                        }
                        className="mt-1 w-4 h-4 text-black dark:text-blue-500 border-gray-300 dark:border-gray-600 focus:ring-black dark:focus:ring-blue-500"
                      />
                      <div data-name={`detail-level-content-${level.value}`}>
                        <div data-name={`detail-level-title-${level.value}`} className="text-sm font-medium text-black dark:text-white">
                          {level.label}
                        </div>
                        <div data-name={`detail-level-desc-${level.value}`} className="text-xs text-gray-600 dark:text-gray-300">
                          {level.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Second row for Output Length */}
            <div data-name="output-length-section" className="mt-6">
              <label data-name="output-length-label" className="block text-sm font-medium text-black dark:text-white mb-4">
                Output Length
              </label>
              <div data-name="output-length-grid" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {outputLengths.map((length) => (
                  <label
                    key={length.value}
                    data-name={`output-length-option-${length.value}`}
                    className="flex items-start gap-3 cursor-pointer p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <input
                      data-name={`output-length-radio-${length.value}`}
                      type="radio"
                      name="outputLength"
                      value={length.value}
                      checked={settings.outputLength === length.value}
                      onChange={(e) =>
                        onSettingsChange((prev: any) => ({
                          ...prev,
                          outputLength: e.target.value,
                        }))
                      }
                      className="mt-1 w-4 h-4 text-black dark:text-blue-500 border-gray-300 dark:border-gray-600 focus:ring-black dark:focus:ring-blue-500"
                    />
                    <div data-name={`output-length-content-${length.value}`}>
                      <div data-name={`output-length-title-${length.value}`} className="text-sm font-medium text-black dark:text-white">
                        {length.label}
                      </div>
                      <div data-name={`output-length-desc-${length.value}`} className="text-xs text-gray-600 dark:text-gray-300">
                        {length.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* API Keys Section */}
            <div data-name="api-keys-section" className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 data-name="api-keys-title" className="text-md font-semibold text-black dark:text-white mb-4">
                API Keys (Optional)
              </h4>
              <p data-name="api-keys-description" className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Provide your own API keys to use your personal accounts. Leave
                empty to use default keys.
              </p>

              <div data-name="api-keys-grid" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* OpenAI API Key */}
                <APIKeyInput
                  label="OpenAI API Key"
                  placeholder="sk-..."
                  value={settings.apiKeys?.openai || ""}
                  onChange={(value) =>
                    onSettingsChange((prev: any) => ({
                      ...prev,
                      apiKeys: {
                        ...prev.apiKeys,
                        openai: value,
                      },
                    }))
                  }
                  provider="openai"
                  data-name="openai-api-key"
                />

                {/* Z.AI API Key */}
                <APIKeyInput
                  label="Z.AI API Key"
                  placeholder="Enter Z.AI API key..."
                  value={settings.apiKeys?.zai || ""}
                  onChange={(value) =>
                    onSettingsChange((prev: any) => ({
                      ...prev,
                      apiKeys: {
                        ...prev.apiKeys,
                        zai: value,
                      },
                    }))
                  }
                  provider="zai"
                  data-name="zai-api-key"
                />

                {/* Gemini API Key */}
                <APIKeyInput
                  label="Google Gemini API Key"
                  placeholder="AIza..."
                  value={settings.apiKeys?.gemini || ""}
                  onChange={(value) =>
                    onSettingsChange((prev: any) => ({
                      ...prev,
                      apiKeys: {
                        ...prev.apiKeys,
                        gemini: value,
                      },
                    }))
                  }
                  provider="gemini"
                  data-name="gemini-api-key"
                />
              </div>
            </div>

            {/* Device Info Section */}
            <div data-name="device-info-section" className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 data-name="device-info-title" className="text-md font-semibold text-black dark:text-white mb-4">
                Informace o zařízení
              </h4>
              <div data-name="device-info-container" className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                <div data-name="device-id-row" className="flex justify-between items-center">
                  <span data-name="device-id-label" className="text-sm font-medium text-black dark:text-white">Device ID:</span>
                  <span data-name="device-id-value" className="text-sm text-black dark:text-gray-300 font-mono">
                    {deviceId}
                  </span>
                </div>
                <div data-name="platform-row" className="flex justify-between items-center">
                  <span data-name="platform-label" className="text-sm font-medium text-black dark:text-white">Platforma:</span>
                  <span data-name="platform-value" className="text-sm text-black dark:text-gray-300">
                    {typeof window !== 'undefined' ? ((navigator as any).userAgentData?.platform || navigator.platform || 'Unknown') : 'N/A'}
                  </span>
                </div>
                <div data-name="browser-row" className="flex justify-between items-center">
                  <span data-name="browser-label" className="text-sm font-medium text-black dark:text-white">Prohlížeč:</span>
                  <span data-name="browser-value" className="text-sm text-black dark:text-gray-300">
                    {typeof window !== 'undefined' ? navigator.userAgent.split(' ').slice(-2).join(' ') : 'N/A'}
                  </span>
                </div>
                <div data-name="resolution-row" className="flex justify-between items-center">
                  <span data-name="resolution-label" className="text-sm font-medium text-black dark:text-white">Rozlišení:</span>
                  <span data-name="resolution-value" className="text-sm text-black dark:text-gray-300">
                    {typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'N/A'}
                  </span>
                </div>
                <div data-name="language-row" className="flex justify-between items-center">
                  <span data-name="language-label" className="text-sm font-medium text-black dark:text-white">Jazyk:</span>
                  <span data-name="language-value" className="text-sm text-gray-600 dark:text-gray-300">
                    {typeof window !== 'undefined' ? navigator.language : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div data-name="modal-footer" className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              data-name="modal-cancel-button"
              onClick={onClose}
              className="px-4 py-2 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Zrušit
            </button>

            <button
              data-name="modal-save-button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-black dark:bg-blue-600 text-white rounded-md hover:bg-gray-800 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Ukládám...
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Uloženo!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Uložit nastavení
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
