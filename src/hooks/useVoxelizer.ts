import { useState, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import { voxelizeImage } from '@/lib/voxelize';

export function useVoxelizer() {
  const { setVoxels, setIsLoading } = useStore();
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }

    setError(null);
    setIsLoading(true);

    const reader = new FileReader();
    
    return new Promise<void>((resolve, reject) => {
      reader.onload = async () => {
        try {
          const src = reader.result as string;
          // 64 resolution, 12 maxHeight matches previous successful builds
          const { voxels, maxLayer } = await voxelizeImage(src, 64, 12);
          setVoxels(voxels, maxLayer);
          resolve();
        } catch (err: any) {
          const errMsg = err.message || 'Failed to process image';
          setError(errMsg);
          setIsLoading(false);
          reject(new Error(errMsg));
        }
      };

      reader.onerror = () => {
        const errMsg = 'Failed to read file';
        setError(errMsg);
        setIsLoading(false);
        reject(new Error(errMsg));
      };

      reader.readAsDataURL(file);
    });
  }, [setVoxels, setIsLoading]);

  return {
    processFile,
    error,
    setError
  };
}
