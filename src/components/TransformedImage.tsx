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
        const docData = {
          id: uniqueId,
          imageUrl,
          createdAt: new Date().toISOString(),
          width,
          height,
          ...(prompt && { prompt })
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
      <div className="relative max-w-md mx-auto">
        <Image 
          src={imageUrl}
          alt="Transformed Dorm Room" 
          width={512}
          height={512}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '512px',
            objectFit: 'contain',
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
