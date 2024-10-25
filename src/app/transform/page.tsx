"use client";

import { useState, useRef } from 'react';
import { useAuth } from '../../lib/hooks/useAuth';
import ImageUpload from '../../components/ImageUpload';
import UserPromptInput from '../../components/UserPromptInput';
import LoadingBar from '../../components/LoadingBar';
import TransformedImage from '../../components/TransformedImage';
import RouteGuard from '@/components/RouteGuard';
import RequireVerification from '@/components/RequireVerification';

export default function TransformPage() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transformedImageUrl, setTransformedImageUrl] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File | null) => {
    setOriginalImage(file);
    setTransformedImageUrl(null);
    if (file) {
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handlePromptConfirm = (userPrompt: string) => {
    setPrompt(userPrompt);
  };

  const handleTransform = async () => {
    if (!originalImage || !prompt) return;

    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('image', originalImage);
    formData.append('prompt', prompt);
    formData.append('width', originalDimensions.width.toString());
    formData.append('height', originalDimensions.height.toString());

    try {
      const response = await fetch('/api/transform-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to transform image');
      }

      setTransformedImageUrl(data.transformedImageUrl);
    } catch (error) {
      console.error('Error transforming image:', error);
      setError((error as Error).message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RequireVerification>
      <div className="flex flex-col min-h-screen bg-slate-900 text-gray-200 text-sm">
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-blue-400">Transform Your Room</h1>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-800">
            <ImageUpload onImageChange={handleImageUpload} />
            {originalImage && (
              <UserPromptInput onPromptConfirm={handlePromptConfirm} />
            )}
            {prompt && (
              <button
                onClick={handleTransform}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Transforming..." : "Transform"}
              </button>
            )}
            {isLoading && <LoadingBar />}
            {error && (
              <div className="mt-4 text-red-500">
                Error: {error}
              </div>
            )}
            {transformedImageUrl && (
              <TransformedImage 
                imageUrl={transformedImageUrl}
                width={originalDimensions.width || 512}  // Fallback to 512 if width is 0
                height={originalDimensions.height || 512}  // Fallback to 512 if height is 0
              />
            )}
          </div>
        </main>
      </div>
    </RequireVerification>
  );
}
