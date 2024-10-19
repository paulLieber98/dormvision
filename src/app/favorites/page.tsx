"use client";

import { useAuth } from "../../lib/hooks/useAuth";
import Image from "next/image";

export default function FavoritesPage() {
  const { user, loading, favorites, removeFavorite } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your favorites.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>You haven't favorited any images yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((imageUrl, index) => (
            <div key={index} className="relative">
              <Image src={imageUrl} alt={`Favorite ${index + 1}`} width={300} height={300} className="rounded-lg" />
              <button
                onClick={() => removeFavorite(imageUrl)}
                className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
