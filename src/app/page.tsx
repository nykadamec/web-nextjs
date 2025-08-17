'use client';

import { useState, useCallback, useRef } from "react";
import {
  Upload,
  Image as ImageIcon,
  Copy,
  CheckCircle,
  Settings,
  Maximize2,
  Minimize2,
  RotateCcw,
} from "lucide-react";
import useUpload from "@/hooks/useUpload";
import useSettings from "@/hooks/useSettings";
import SettingsModal from "@/components/SettingsModal";
import ThemeToggle from "@/components/ThemeToggle";
import LoadingIndicator from "@/components/LoadingIndicator";
import SettingsLoader from "@/components/SettingsLoader";

export default function AIImageDescriber() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullSize, setIsFullSize] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [upload] = useUpload();

  const {
    settings,
    updateSettings,
    saveSettings,
    loading: settingsLoading,
    saving: settingsSaving,
    error: settingsError,
  } = useSettings();

  const handleFileSelect = useCallback((file: File | null) => {
    if (!file) return;

    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/gif",
    ];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PNG, JPEG, WEBP, or GIF image");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setSelectedImage(file);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
  }, [handleFileSelect]);

  const analyzeImage = useCallback(async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);
    setDescription("");

    try {
      console.log("Uploading image...");
      const { url: imageUrl, error: uploadError } = await upload({ file: selectedImage });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        setError(`Failed to upload image: ${uploadError}`);
        setLoading(false);
        return;
      }

      console.log("Image uploaded successfully:", imageUrl);

      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, settings }),
      });

      console.log("Analysis response status:", response.status);

      if (!response.ok) {
        let errorData: any;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        console.error("Analysis API Error:", errorData);
        if (errorData.debug) {
          console.error("Debug info:", errorData.debug);
          console.log("Response structure analysis:", {
            hasError: errorData.debug.hasError,
            hasCandidates: errorData.debug.hasCandidates,
            candidatesLength: errorData.debug.candidatesLength,
            firstCandidateKeys: errorData.debug.firstCandidateKeys,
            responseKeys: errorData.debug.responseKeys
          });
        }
        throw new Error(errorData.error || `Analysis failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Analysis Response:", data);

      if (data.success && data.description) {
        setDescription(data.description);
      } else {
        if (data.debug) console.error("Response debug info:", data.debug);
        setError(data.error || "Failed to get image description");
      }
    } catch (err: any) {
      console.error("Error analyzing image:", err);
      let userMessage = err?.message || "An error occurred while analyzing the image";
      if (userMessage.includes('Network error')) {
        userMessage = "Síťová chyba: Nelze se připojit k AI službě. Zkuste to prosím znovu.";
      } else if (userMessage.includes('API key')) {
        userMessage = "Chyba API klíče: Zkontrolujte prosím nastavení API klíčů.";
      } else if (userMessage.includes('quota') || userMessage.includes('limit')) {
        userMessage = "API limit překročen: Zkuste to prosím později.";
      } else if (userMessage.includes('safety filters')) {
        userMessage = "Obsah byl zablokován bezpečnostními filtry. Zkuste jiný obrázek.";
      } else if (userMessage.includes('unexpected response format')) {
        userMessage = "Neočekávaný formát odpovědi z AI služby. Zkuste to prosím znovu.";
      }
      setError(userMessage);
    } finally {
      setLoading(false);
    }
  }, [selectedImage, upload, settings]);

  if (settingsLoading) {
    return (
      <div data-name="loading-container" className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <SettingsLoader
          size="lg"
          text="Načítám nastavení..."
          data-name="page-settings-loader"
        />
      </div>
    );
  }

  return (
    <div data-name="main-container" className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header data-name="main-header" className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div data-name="header-content" className="max-w-7xl mx-auto flex items-center justify-between">
          <div data-name="header-brand" className="flex items-center gap-3">
            <div data-name="brand-icon" className="w-8 h-8 bg-black dark:bg-blue-600 rounded-md flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <h1 data-name="brand-title" className="text-xl font-bold text-gray-900 dark:text-white">AI Image Describer</h1>
          </div>
          <div data-name="header-actions" className="flex items-center gap-3">
            <ThemeToggle />
            <button
              data-name="settings-button"
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-900 dark:text-white" />
              Settings
            </button>
          </div>
        </div>
      </header>

      <div data-name="main-content" className="max-w-7xl mx-auto px-6 py-8">
        {/* Settings Modal */}
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          settings={settings}
          onSettingsChange={updateSettings}
          onSaveSettings={saveSettings}
          saving={settingsSaving}
          error={settingsError}
        />

        {/* Hero Section */}
        <div data-name="hero-section" className="text-center mb-8">
          <h2 data-name="hero-title" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Describe Any Image with AI</h2>
          <p data-name="hero-description" className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload an image and get a detailed, intelligent description powered by advanced AI vision technology.
          </p>
        </div>

        {!imagePreview ? (
          /* Upload Area */
          <div data-name="upload-container" className="max-w-2xl mx-auto">
            <div
              data-name="upload-area"
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p data-name="upload-title" className="text-lg font-medium text-gray-900 dark:text-white mb-2">Drop your image here, or click to browse</p>
              <p data-name="upload-subtitle" className="text-sm text-gray-500 dark:text-gray-400 mb-4">Supports PNG, JPEG, WEBP, and GIF files up to 10MB</p>
              <button data-name="choose-file-button" className="bg-gray-900 dark:bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors">Choose File</button>
            </div>
            <input
              data-name="file-input"
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        ) : (
          /* Main Content Area */
          <div data-name="content-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Preview */}
            <div data-name="image-preview-section" className="space-y-4">
              <div data-name="image-preview-header" className="flex items-center justify-between">
                <h3 data-name="image-preview-title" className="text-lg font-semibold text-gray-900 dark:text-white">Uploaded Image</h3>
                <div data-name="image-preview-actions" className="flex items-center gap-3">
                  <button
                    data-name="image-size-toggle-button"
                    onClick={() => setIsFullSize(!isFullSize)}
                    className="flex items-center text-gray-900 dark:text-white gap-2 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    title={isFullSize ? "Fit to container" : "View full size"}
                  >
                    {isFullSize ? (
                      <>
                        <Minimize2 className="w-4 h-4" />
                        Fit Size
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-4 h-4" />
                        Full Size
                      </>
                    )}
                  </button>
                  <button
                    data-name="upload-new-button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                      setDescription("");
                      setError(null);
                      setIsFullSize(false);
                    }}
                    className="flex items-center text-gray-900 dark:text-white gap-2 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Upload New
                  </button>
                </div>
              </div>
              <div data-name="image-preview-container" className={`border border-gray-200 dark:border-gray-700 rounded-lg ${isFullSize ? 'p-2' : 'p-4'} ${isFullSize ? 'overflow-auto max-h-[80vh]' : ''}`}>
                <img
                  data-name="image-preview"
                  src={imagePreview || ""}
                  alt="Preview"
                  className={`rounded-md ${isFullSize ? 'max-w-none h-auto' : 'w-full h-auto'}`}
                />
              </div>
              {!description && !loading && (
                <button data-name="analyze-image-button" onClick={analyzeImage} className="w-full bg-gray-900 dark:bg-blue-600 text-white py-3 rounded-md hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors">
                  Analyze Image
                </button>
              )}
            </div>

            {/* Description Area */}
            <div data-name="description-section" className="space-y-4">
              <div data-name="description-header" className="flex items-center justify-between">
                <h3 data-name="description-title" className="text-lg font-semibold text-gray-900 dark:text-white">AI Description</h3>
                {description && (
                  <div className="flex items-center gap-2">
                    <button
                      data-name="redescribe-button"
                      onClick={analyzeImage}
                      disabled={loading}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Regenerate description"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Redescribe
                    </button>
                    <button
                      data-name="copy-description-button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(description);
                          setCopySuccess(true);
                          setTimeout(() => setCopySuccess(false), 2000);
                        } catch (err) {
                          console.error("Failed to copy:", err);
                        }
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white"
                    >
                      {copySuccess ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div data-name="description-content" className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 min-h-[300px] bg-white dark:bg-gray-800">
                {loading ? (
                  <div data-name="loading-state" className="flex items-center justify-center h-full">
                    <LoadingIndicator
                      size="lg"
                      text="Analyzing your image..."
                      variant="spinner"
                      color="secondary"
                      data-name="image-analysis-loader"
                    />
                  </div>
                ) : error ? (
                  <div data-name="error-state" className="flex items-center justify-center h-full">
                    <div data-name="error-content" className="text-center">
                      <p data-name="error-message" className="text-red-600 dark:text-red-400 mb-3">{error}</p>
                      <button data-name="try-again-button" onClick={analyzeImage} className="bg-gray-900 dark:bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors">
                        Try Again
                      </button>
                    </div>
                  </div>
                ) : description ? (
                  <div data-name="description-prose" className="prose prose-gray dark:prose-invert max-w-none">
                    <p data-name="description-text" className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{description}</p>
                  </div>
                ) : (
                  <div data-name="empty-state" className="flex items-center justify-center h-full">
                    <p data-name="empty-message" className="text-gray-500 dark:text-gray-400">Click "Analyze Image" to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && !loading && (
          <div data-name="error-banner" className="max-w-2xl mx-auto mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p data-name="error-banner-text" className="text-red-800 text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
