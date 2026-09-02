/**
 * Utility for handling manual photo uploads, resizing, compression,
 * and preset tanker galleries.
 */

export interface PresetPhoto {
  id: string;
  title: string;
  category: string;
  url: string;
}

export const PRESET_TANKER_PHOTOS: PresetPhoto[] = [
  {
    id: 'preset-driver-budi',
    title: 'Driver Tangki Glukosa BUDI (Kabin & Spion)',
    category: 'Driver & Kabin',
    url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'preset-driver-uniform',
    title: 'Driver Tangki Food Grade (Siap Muat Pabrik)',
    category: 'Driver & Kabin',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'preset-tanker-glucose-1',
    title: 'Tangki Glukosa Stainless Steel SUS 304 Food Grade',
    category: 'Tangki Glukosa BUDI',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'preset-tanker-glucose-2',
    title: 'Trailer Tangki Glukosa 32.000L Lintas Sumatra-Jawa',
    category: 'Tangki Glukosa BUDI',
    url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'preset-tanker-glucose-3',
    title: 'Tronton Tangki Glukosa & Sirup Fruktosa Pasuruan',
    category: 'Tangki Glukosa BUDI',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'preset-tanker-glucose-highway',
    title: 'Armada Tangki Glukosa di Tol Trans-Jawa Sunset',
    category: 'Long-Haul Highway',
    url: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80'
  }
];

/**
 * Resizes and compresses an uploaded image file to a base64 Data URL
 * suitable for localStorage without exceeding browser quota.
 */
export async function resizeAndCompressImage(
  file: File,
  maxWidth = 1000,
  maxHeight = 1200,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File yang dipilih harus berupa gambar (JPG, PNG, WebP, dll).'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Gagal memproses gambar.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Draw image with smooth scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to webp or jpeg data URL
        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, quality);
        resolve(dataUrl);
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
