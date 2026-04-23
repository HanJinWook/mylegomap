import { getNearestLegoColor, LegoColor } from './colors';

export type Voxel = {
  x: number;
  y: number; // calculated height
  z: number;
  color: LegoColor;
};

// Calculate relative luminance from RGB (0 to 1)
const getLuminance = (r: number, g: number, b: number) => {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

export const voxelizeImage = (
  imageSrc: string,
  maxSize: number = 64,
  maxHeight: number = 8
): Promise<{ voxels: Voxel[]; width: number; height: number; maxLayer: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;

    img.onload = () => {
      // Calculate scaled dimensions
      let width = img.width;
      let height = img.height;

      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
      }

      // Draw to offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Canvas 2D context not available'));
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      const voxels: Voxel[] = [];
      let maxLayerFound = 0;

      for (let z = 0; z < height; z++) {
        for (let x = 0; x < width; x++) {
          const idx = (z * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Skip completely transparent or very transparent pixels
          if (a < 128) continue;
          
          // Skip pure white/near-white pixels to remove common JPEG backgrounds
          // Increased threshold to be more lenient
          if (r > 250 && g > 250 && b > 250) continue;

          const legoColor = getNearestLegoColor(r, g, b);
          const luminance = getLuminance(r, g, b);
          
          // Map height. Darker = taller, Lighter = shorter.
          // This prevents bright backgrounds from becoming a "ceiling" covering the model.
          const y = Math.max(1, Math.ceil((1 - luminance) * maxHeight));
          
          if (y > maxLayerFound) {
             maxLayerFound = y;
          }

          // Offset coordinates so the model is centered around origin
          const offsetX = x - Math.floor(width / 2);
          const offsetZ = z - Math.floor(height / 2);

          voxels.push({
            x: offsetX,
            y,
            z: offsetZ,
            color: legoColor,
          });
        }
      }

      resolve({ voxels, width, height, maxLayer: maxLayerFound });
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
};
