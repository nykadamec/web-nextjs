import { useState, useEffect } from 'react';

/**
 * Hook pro generování a správu device ID
 */
export default function useDeviceId(): string | null {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let storedDeviceId = localStorage.getItem('deviceId');
    
    if (!storedDeviceId) {
      // Generujeme nové device ID
      storedDeviceId = 'device_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      localStorage.setItem('deviceId', storedDeviceId);
    }
    
    setDeviceId(storedDeviceId);
  }, []);

  return deviceId;
}
