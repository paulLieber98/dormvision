import { useState, useEffect } from 'react';
import InspirationGallery from './InspirationGallery';

const ImageTransformer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transformedImageUrl, setTransformedImageUrl] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Load gallery images from local storage on component mount
    const storedImages = localStorage.getItem('galleryImages');
    if (storedImages) {
      setGalleryImages(JSON.parse(storedImages));
    }
  }, []);

  const transformImage = async () => {
    setIsLoading(true);
    try {
      const preservationPrompt = "Maintain the exact same room, layout, and style as the original image.";
      const transformationPrompt = `${preservationPrompt} Add to the existing scene: ${userPrompt}. Ensure the additions blend seamlessly with the original image style and composition.`;

      const response = await fetch('/api/replicate/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: transformationPrompt,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const result = await response.json();
      setTransformedImageUrl(result.output[0]);
      console.log("Transformed Image URL:", result.output[0]);
    } catch (error) {
      console.error('Error transforming image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublishToGallery = () => {
    if (transformedImageUrl) {
      const updatedGallery = [...galleryImages, transformedImageUrl];
      setGalleryImages(updatedGallery);
      // Save to local storage
      localStorage.setItem('galleryImages', JSON.stringify(updatedGallery));
      console.log("Publishing to gallery with URL:", transformedImageUrl);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Enter original image URL"
      />
      <input
        type="text"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        placeholder="Enter transformation prompt"
      />
      <button onClick={transformImage} disabled={isLoading}>
        {isLoading ? 'Transforming...' : 'Transform Image'}
      </button>
      {transformedImageUrl && (
        <>
          <img src={transformedImageUrl} alt="Transformed Image" />
          <button onClick={handlePublishToGallery}>Publish to Inspiration Gallery</button>
        </>
      )}
      <InspirationGallery images={galleryImages} />
    </div>
  );
};

export default ImageTransformer;
