import { useState } from 'react';
import { 
  SettingsLoader, 
  SettingsModalOverlay, 
  InlineSettingsLoader, 
  SettingsCard, 
  SettingsButtonLoader 
} from './SettingsLoader';
import { Button } from './Button';

/**
 * Example component demonstrating SettingsLoader usage
 * Shows different variants and use cases
 */
export default function SettingsLoaderExample() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);

  const handleLoadSettings = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const handleShowOverlay = () => {
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 3000);
  };

  const handleCardLoad = () => {
    setCardLoading(true);
    setTimeout(() => setCardLoading(false), 2000);
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Settings Loader Examples
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Demonstrace různých variant SettingsLoader komponenty
        </p>
      </div>

      {/* Basic Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Základní varianty
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Small */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Malá (sm)
            </h3>
            <SettingsLoader size="sm" />
          </div>

          {/* Medium */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Střední (md)
            </h3>
            <SettingsLoader size="md" />
          </div>

          {/* Large */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Velká (lg)
            </h3>
            <SettingsLoader size="lg" />
          </div>
        </div>
      </section>

      {/* Specialized Components */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Specializované komponenty
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inline Loader */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Inline Loader
            </h3>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <InlineSettingsLoader />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Načítám nastavení...
              </span>
            </div>
          </div>

          {/* Button Loader */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Button Loader
            </h3>
            <Button
              onClick={handleLoadSettings}
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                <>
                  <SettingsButtonLoader />
                  Načítám...
                </>
              ) : (
                'Načíst nastavení'
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Card Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Card Loader
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Button onClick={handleCardLoad} className="mb-4">
              Načíst kartu nastavení
            </Button>
            {cardLoading ? (
              <SettingsCard text="Načítám sekci nastavení..." />
            ) : (
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Nastavení aplikace
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Zde by byl obsah nastavení po načtení.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Overlay Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Modal Overlay
        </h2>
        
        <div className="relative">
          <Button onClick={handleShowOverlay}>
            Zobrazit overlay
          </Button>
          
          <div className="mt-4 relative h-64 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Simulace modálního okna
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Obsah modálního okna s nastavením...
            </p>
            
            {showOverlay && (
              <SettingsModalOverlay text="Načítám nastavení..." />
            )}
          </div>
        </div>
      </section>

      {/* Custom Text Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Vlastní texty
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SettingsLoader 
            text="Synchronizuji s cloudem..." 
            size="md"
          />
          <SettingsLoader 
            text="Ověřuji oprávnění..." 
            size="md"
          />
        </div>
      </section>

      {/* Without Text */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Bez textu
        </h2>
        
        <div className="flex items-center gap-6">
          <SettingsLoader size="sm" showText={false} />
          <SettingsLoader size="md" showText={false} />
          <SettingsLoader size="lg" showText={false} />
        </div>
      </section>
    </div>
  );
}
