import { useCallback } from 'react';

interface UploadOptions {
  file: File;
}

interface UploadResult {
  url?: string;
  error?: string;
}

export default function useUpload(): [(options: UploadOptions) => Promise<UploadResult>] {
  const upload = useCallback(async ({ file }: UploadOptions): Promise<UploadResult> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.error || 'Upload failed' };
      }

      const data = await response.json();
      
      if (data.success && data.url) {
        return { url: data.url };
      } else {
        return { error: data.error || 'Upload failed' };
      }
    } catch (error) {
      console.error('Upload error:', error);
      return { error: 'Network error during upload' };
    }
  }, []);

  return [upload];
}
