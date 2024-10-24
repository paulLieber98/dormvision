import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import { useAuth } from "@/lib/hooks/useAuth";
import { db } from "@/lib/firebase/firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { useState } from "react";

interface TransformedImageProps {
  imageUrl: string;
  width: number;
  height: number;
  prompt?: string;
}

export default function TransformedImage({ imageUrl, width, height, prompt }: TransformedImageProps) {
  const { user } = useAuth();
  const [uniqueId] = useState(`${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  const handleToggleFavorite = async (imageId: string, isFavorited: boolean) => {
    if (!user) return;
    
    try {
      const favoriteRef = doc(db, 'users', user.uid, 'favorites', uniqueId);
      
      if (isFavorited) {
        // Only include prompt if it exists
        const docData = {
          id: uniqueId,
          imageUrl,
          createdAt: new Date().toISOString(),
          width,
          height,
          ...(prompt && { prompt }) // Only add prompt if it exists
        };
        
        await setDoc(favoriteRef, docData);
      } else {
        await deleteDoc(favoriteRef);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Transformed Dorm Room</h2>
      <div className="relative">
        <Image 
          src={imageUrl}
          alt="Transformed Dorm Room" 
          width={width}
          height={height}
          style={{
            width: '100%',
            height: 'auto',
          }}
          className="rounded-lg"
        />
        <FavoriteButton
          imageId={uniqueId}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
}
