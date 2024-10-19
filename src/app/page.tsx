"use client";

import { useState } from "react";
import { useAuth } from "../lib/hooks/useAuth";
import ImageUpload from "../components/ImageUpload";
import UserPromptInput from "../components/UserPromptInput";
import TransformedImage from "../components/TransformedImage";
import LoadingBar from "../components/LoadingBar";

export default function Home() {
  const { user, loading } = useAuth();
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isPromptConfirmed, setIsPromptConfirmed] = useState(false);
  const [transformedImageUrl, setTransformedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (file: File | null) => {
    setOriginalImage(file);
    setCustomPrompt("");
    setIsPromptConfirmed(false);
    setTransformedImageUrl(null);
  };

  const handlePromptConfirm = (prompt: string) => {
    setCustomPrompt(prompt);
    setIsPromptConfirmed(true);
  };

  const handleTransform = async () => {
    if (!originalImage || !customPrompt) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", originalImage);
    formData.append("prompt", customPrompt);

    try {
      const response = await fetch("/api/transform-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to transform image");
      }

      const data = await response.json();
      setTransformedImageUrl(data.transformedImageUrl);
    } catch (error) {
      console.error("Error transforming image:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">DormVision</h1>
      {user ? (
        <>
          <ImageUpload onImageChange={handleImageUpload} />
          {originalImage && (
            <UserPromptInput onPromptConfirm={handlePromptConfirm} />
          )}
          {isPromptConfirmed && (
            <button
              onClick={handleTransform}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Transforming..." : "Transform"}
            </button>
          )}
          {isLoading && <LoadingBar />}
          {transformedImageUrl && (
            <TransformedImage imageUrl={transformedImageUrl} />
          )}
        </>
      ) : (
        <p>Please log in to use DormVision</p>
      )}
    </div>
  );
}
