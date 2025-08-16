import { useState, useEffect, useCallback } from 'react';
import useDeviceId from './useDeviceId';

interface Settings {
  language: string;
  detailLevel: string;
  model: string;
  geminiModel: string;
  apiKeys: {
    openai: string;
    zai: string;
    gemini: string;
  };
}

/**
 * Hook pro správu nastavení s automatickým ukládáním/načítáním podle device-id
 */
function useSettings() {
  const deviceId = useDeviceId();
  
  // Výchozí nastavení
  const defaultSettings: Settings = {
    language: "english",
    detailLevel: "detailed",
    model: "openai",
    geminiModel: "gemini-2.5-flash",
    apiKeys: {
      openai: "",
      zai: "",
      gemini: "",
    },
  };

  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Načtení nastavení ze serveru
  const loadSettings = useCallback(async () => {
    if (!deviceId) return;

    try {
      setLoading(true);
      setError(null);

      const url = `/api/settings?deviceId=${encodeURIComponent(deviceId)}`;
      console.log('[useSettings] GET', url);
      const response = await fetch(url);
      const contentType = response.headers.get('content-type') || '';
      if (!response.ok) {
        const preview = await response.text().then(t => t.slice(0, 200)).catch(() => '');
        console.error('[useSettings] GET non-OK', { status: response.status, contentType, preview });
        throw new Error(`Settings API error ${response.status}`);
      }
      if (!contentType.includes('application/json')) {
        const preview = await response.text().then(t => t.slice(0, 200)).catch(() => '');
        console.error('[useSettings] GET non-JSON', { status: response.status, contentType, preview });
        throw new Error('Non-JSON response from /api/settings');
      }
      const data = await response.json();

      if (data.success) {
        if (data.settings) {
          // Sloučíme načtená nastavení s výchozími (pro případ nových polí)
          setSettings(prevSettings => ({
            ...defaultSettings,
            ...data.settings,
            apiKeys: {
              ...defaultSettings.apiKeys,
              ...(data.settings.apiKeys || {})
            }
          }));
        }
        // Pokud data.settings je null, zůstaneme u výchozích nastavení
      } else {
        console.error('Chyba při načítání nastavení:', data.error);
        setError(data.error);
      }
    } catch (err) {
      console.error('Chyba při načítání nastavení:', err);
      setError('Nepodařilo se načíst nastavení');
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  // Uložení nastavení na server
  const saveSettings = useCallback(async (): Promise<boolean> => {
    if (!deviceId) return false;

    try {
      setSaving(true);
      setError(null);

      const url = '/api/settings';
      console.log('[useSettings] POST', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceId,
          settings,
        }),
      });
      
      const contentType = response.headers.get('content-type') || '';
      if (!response.ok) {
        const preview = await response.text().then(t => t.slice(0, 200)).catch(() => '');
        console.error('[useSettings] POST non-OK', { status: response.status, contentType, preview });
        return false;
      }
      if (!contentType.includes('application/json')) {
        const preview = await response.text().then(t => t.slice(0, 200)).catch(() => '');
        console.error('[useSettings] POST non-JSON', { status: response.status, contentType, preview });
        setError('Nepodařilo se uložit nastavení');
        return false;
      }
      const data = await response.json();

      if (data.success) {
        return true;
      } else {
        console.error('Chyba při ukládání nastavení:', data.error);
        setError(data.error);
        return false;
      }
    } catch (err) {
      console.error('Chyba při ukládání nastavení:', err);
      setError('Nepodařilo se uložit nastavení');
      return false;
    } finally {
      setSaving(false);
    }
  }, [deviceId, settings]);

  // Aktualizace nastavení
  const updateSettings = useCallback((newSettings: Partial<Settings> | ((prev: Settings) => Settings)) => {
    setSettings(prevSettings => {
      if (typeof newSettings === 'function') {
        return newSettings(prevSettings);
      }
      return { ...prevSettings, ...newSettings };
    });
  }, []);

  // Načtení nastavení při změně device-id
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return {
    settings,
    updateSettings,
    saveSettings,
    loadSettings,
    loading,
    saving,
    error,
    deviceId,
  };
}

export default useSettings;
