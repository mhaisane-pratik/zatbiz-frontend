import { useState, useEffect } from 'react';

export function useMediaLibrary(projectId: number) {
  const [mediaAssets, setMediaAssets] = useState<{ name: string; url: string; type: string }[]>([]);

  useEffect(() => {
    if (!isNaN(projectId)) {
      const savedMedia = localStorage.getItem('zatbiz_media_library_' + projectId);
      if (savedMedia) {
        try {
          setMediaAssets(JSON.parse(savedMedia));
        } catch (e) {
          console.error('Failed to parse media library assets:', e);
        }
      }
    }
  }, [projectId]);

  const updateMediaAssets = (newAssets: { name: string; url: string; type: string }[]) => {
    setMediaAssets(newAssets);
    if (!isNaN(projectId)) {
      localStorage.setItem('zatbiz_media_library_' + projectId, JSON.stringify(newAssets));
    }
  };

  return {
    mediaAssets,
    setMediaAssets: updateMediaAssets
  };
}
