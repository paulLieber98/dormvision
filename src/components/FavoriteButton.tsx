import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

interface FavoriteButtonProps {
  imageId: string;
  initialFavorited?: boolean;
  onToggleFavorite: (imageId: string, isFavorited: boolean) => void;
}

export default function FavoriteButton({ imageId, initialFavorited = false, onToggleFavorite }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const { user } = useAuth();

  useEffect(() => {
    // Check if the image is already favorited when the component mounts
    const checkFavoriteStatus = async () => {
      if (!user) return;
      
      try {
        const favoriteRef = doc(db, 'users', user.uid, 'favorites', imageId);
        const docSnap = await getDoc(favoriteRef);
        setIsFavorited(docSnap.exists());
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [imageId, user]);

  const handleClick = () => {
    const newFavoritedState = !isFavorited;
    setIsFavorited(newFavoritedState);
    onToggleFavorite(imageId, newFavoritedState);
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/80 hover:bg-gray-800/80 transition-colors"
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`w-6 h-6 ${
          isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-200'
        }`}
      />
    </button>
  );
}
