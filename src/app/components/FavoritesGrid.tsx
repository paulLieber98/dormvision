import Image from 'next/image';
import { useState } from 'react';

interface FavoriteItem {
  id: string;
  imageUrl: string;
}

interface FavoritesGridProps {
  favorites: FavoriteItem[];
}

const FavoritesGrid: React.FC<FavoritesGridProps> = ({ favorites }) => {
  const [errorImages, setErrorImages] = useState<Set<string>>(new Set());

  const handleImageError = (id: string) => {
    setErrorImages(prev => new Set(prev).add(id));
  };

  if (favorites.length === 0) {
    return <p className="text-gray-400">You don't have any favorites yet.</p>;
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-blue-300 mb-4">Your Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((item) => (
          <div key={item.id} className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden">
            {errorImages.has(item.id) ? (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Image failed to load
              </div>
            ) : (
              <Image
                src={item.imageUrl}
                alt="Favorite dorm design"
                layout="fill"
                objectFit="cover"
                onError={() => handleImageError(item.id)}
              />
            )}
            <button className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesGrid;
