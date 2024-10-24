import { useState } from 'react';
import Image from 'next/image';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const generateImage = async () => {
    setError('');
    setImageUrl('');

    try {
      const response = await fetch('/api/replicate/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.output);
      } else {
        setError(data.error || 'Failed to generate image');
      }
    } catch (err) {
      setError('An error occurred while generating the image');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={generateImage}>Generate Image</button>

      {error && <p className="text-red-500">{error}</p>}

      {imageUrl && (
        <div className="mt-4">
          <Image src={imageUrl} alt="Generated image" width={512} height={512} />
        </div>
      )}
    </div>
  );
}
