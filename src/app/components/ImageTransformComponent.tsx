import React, { useState } from 'react';

function ImageTransformComponent() {
  const [image, setImage] = useState<File | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isPromptConfirmed, setIsPromptConfirmed] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle image selection
    const selectedImage = event.target.files?.[0] || null;
    setImage(selectedImage);
    // Reset prompt and confirmation when a new image is uploaded
    setCustomPrompt('');
    setIsPromptConfirmed(false);
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomPrompt(event.target.value);
  };

  const handlePromptConfirm = () => {
    setIsPromptConfirmed(true);
  };

  const handleTransform = () => {
    // Combine the pre-existing prompt with the user's custom prompt
    const combinedPrompt = `${PRE_EXISTING_PROMPT} ${customPrompt}`;
    // Proceed with the transformation using the combined prompt
    // Call the API to transform the image here
    // ... existing transformation code ...
  };

  return (
    <div>
      {/* Image Upload */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {/* Custom Prompt Input (visible after image upload) */}
      {image && (
        <div>
          <textarea
            placeholder="Enter your custom prompt"
            value={customPrompt}
            onChange={handlePromptChange}
          />
          <button onClick={handlePromptConfirm}>Confirm Prompt</button>
        </div>
      )}

      {/* Transform Button (visible after prompt confirmation) */}
      {isPromptConfirmed && (
        <button onClick={handleTransform}>Transform</button>
      )}
    </div>
  );
}

export default ImageTransformComponent;
