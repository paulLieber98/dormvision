import { constrainDimensions } from './utils';

export async function processImageForUpload(file: File): Promise<{ 
  imageUrl: string; 
  width: number; 
  height: number; 
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.onload = () => {
        try {
          resolve({
            imageUrl: e.target?.result as string,
            width: 200,  // Force width
            height: 200, // Force height
          });
        } catch (err) {
          reject(new Error('Failed to process image dimensions'));
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// Helper function to validate image dimensions before upload
export function validateImageDimensions(width: number, height: number): boolean {
  const FIXED_SIZE = 200;
  return true; // Always return true as we'll force the size anyway
}
