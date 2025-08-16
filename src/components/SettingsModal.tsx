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

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: any;
  onSettingsChange: (settings: any) => void;
  onSaveSettings: () => Promise<boolean>;
  saving: boolean;
  error: string | null;
}

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

  const models = [
    {
      value: "openai",
      label: "OpenAI GPT-4 Vision",
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
        <div data-name="settings-modal" className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div data-name="modal-header" className="flex items-center justify-between p-6 border-b border-gray-200">
            <div data-name="modal-title-section" className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-black" />
              <h2 data-name="modal-title" className="text-xl font-semibold text-black">Nastavení</h2>
            </div>
            <button
              data-name="modal-close-button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div data-name="modal-content" className="p-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
            {/* Error Message */}
            {error && (
              <div data-name="settings-error-message" className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p data-name="error-text" className="text-red-800">{error}</p>
              </div>
            )}

            <div data-name="settings-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Model Selection */}
              <div data-name="model-selection-section">
                <label data-name="model-label" className="block text-sm font-medium text-black mb-2">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {models.map((model) => (
                      <option key={model.value} value={model.value}>
                        {model.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black pointer-events-none" />
                </div>
                <p data-name="model-description" className="text-xs text-black mt-1">
                  {models.find((m) => m.value === settings.model)?.description}
                </p>

                {/* Gemini Model Selection */}
                {settings.model === "gemini" && (
                  <div data-name="gemini-model-section" className="mt-3">
                    <label data-name="gemini-model-label" className="block text-sm font-medium text-black mb-2">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        {geminiModels.map((model) => (
                          <option key={model.value} value={model.value}>
                            {model.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black pointer-events-none" />
                    </div>
                    <p data-name="gemini-model-description" className="text-xs text-black mt-1">
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
                <label data-name="language-label" className="block text-sm font-medium text-black mb-2">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black pointer-events-none" />
                </div>
              </div>

              {/* Detail Level Selection */}
              <div data-name="detail-level-section">
                <label data-name="detail-level-label" className="block text-sm font-medium text-black mb-2">
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
                        className="mt-1 w-4 h-4 text-black border-gray-300 focus:ring-black"
                      />
                      <div data-name={`detail-level-content-${level.value}`}>
                        <div data-name={`detail-level-title-${level.value}`} className="text-sm font-medium text-black">
                          {level.label}
                        </div>
                        <div data-name={`detail-level-desc-${level.value}`} className="text-xs text-black">
                          {level.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* API Keys Section */}
            <div data-name="api-keys-section" className="mt-8 pt-6 border-t border-gray-200">
              <h4 data-name="api-keys-title" className="text-md font-semibold text-black mb-4">
                API Keys (Optional)
              </h4>
              <p data-name="api-keys-description" className="text-sm text-black mb-6">
                Provide your own API keys to use your personal accounts. Leave
                empty to use default keys.
              </p>

              <div data-name="api-keys-grid" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* OpenAI API Key */}
                <div data-name="openai-api-key-field">
                  <label data-name="openai-api-key-label" className="block text-sm font-medium text-black mb-2">
                    OpenAI API Key
                  </label>
                  <input
                    data-name="openai-api-key-input"
                    type="password"
                    placeholder="sk-..."
                    value={settings.apiKeys?.openai || ""}
                    onChange={(e) =>
                      onSettingsChange((prev: any) => ({
                        ...prev,
                        apiKeys: {
                          ...prev.apiKeys,
                          openai: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                {/* Z.AI API Key */}
                <div data-name="zai-api-key-field">
                  <label data-name="zai-api-key-label" className="block text-sm font-medium text-black mb-2">
                    Z.AI API Key
                  </label>
                  <input
                    data-name="zai-api-key-input"
                    type="password"
                    placeholder="Enter Z.AI API key..."
                    value={settings.apiKeys?.zai || ""}
                    onChange={(e) =>
                      onSettingsChange((prev: any) => ({
                        ...prev,
                        apiKeys: {
                          ...prev.apiKeys,
                          zai: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                {/* Gemini API Key */}
                <div data-name="gemini-api-key-field">
                  <label data-name="gemini-api-key-label" className="block text-sm font-medium text-black mb-2">
                    Google Gemini API Key
                  </label>
                  <input
                    data-name="gemini-api-key-input"
                    type="password"
                    placeholder="AIza..."
                    value={settings.apiKeys?.gemini || ""}
                    onChange={(e) =>
                      onSettingsChange((prev: any) => ({
                        ...prev,
                        apiKeys: {
                          ...prev.apiKeys,
                          gemini: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Device Info Section */}
            <div data-name="device-info-section" className="mt-8 pt-6 border-t border-gray-200">
              <h4 data-name="device-info-title" className="text-md font-semibold text-black mb-4">
                Informace o zařízení
              </h4>
              <div data-name="device-info-container" className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div data-name="device-id-row" className="flex justify-between items-center">
                  <span data-name="device-id-label" className="text-sm font-medium text-black">Device ID:</span>
                  <span data-name="device-id-value" className="text-sm text-black font-mono">
                    {deviceId}
                  </span>
                </div>
                <div data-name="platform-row" className="flex justify-between items-center">
                  <span data-name="platform-label" className="text-sm font-medium text-black">Platforma:</span>
                  <span data-name="platform-value" className="text-sm text-black">
                    {typeof window !== 'undefined' ? navigator.platform : 'N/A'}
                  </span>
                </div>
                <div data-name="browser-row" className="flex justify-between items-center">
                  <span data-name="browser-label" className="text-sm font-medium text-black">Prohlížeč:</span>
                  <span data-name="browser-value" className="text-sm text-black">
                    {typeof window !== 'undefined' ? navigator.userAgent.split(' ').slice(-2).join(' ') : 'N/A'}
                  </span>
                </div>
                <div data-name="resolution-row" className="flex justify-between items-center">
                  <span data-name="resolution-label" className="text-sm font-medium text-black">Rozlišení:</span>
                  <span data-name="resolution-value" className="text-sm text-black">
                    {typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'N/A'}
                  </span>
                </div>
                <div data-name="language-row" className="flex justify-between items-center">
                  <span data-name="language-label" className="text-sm font-medium text-black">Jazyk:</span>
                  <span data-name="language-value" className="text-sm text-black">
                    {typeof window !== 'undefined' ? navigator.language : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div data-name="modal-footer" className="flex items-center justify-between p-6 border-t border-gray-200">
            <button
              data-name="modal-cancel-button"
              onClick={onClose}
              className="px-4 py-2 text-black border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Zrušit
            </button>

            <button
              data-name="modal-save-button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
