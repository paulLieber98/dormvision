"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { db } from "@/lib/firebase/firebase";
import { collection, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";
import LoadingBar from "@/components/LoadingBar";
import RouteGuard from '@/components/RouteGuard';

interface FavoriteImage {
  id: string;
  imageUrl: string;
  prompt?: string;
  createdAt: string;
  width: number;
  height: number;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const favoritesRef = collection(db, 'users', user.uid, 'favorites');
    const q = query(favoritesRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const favoritesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as FavoriteImage));
      
      setFavorites(favoritesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleToggleFavorite = async (imageId: string, isFavorited: boolean) => {
    if (!user || isFavorited) return;
    
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'favorites', imageId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) return <LoadingBar />;

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950">
        <p className="text-gray-200">Please log in to view your favorites</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Your Favorite Transformations</h1>
        {favorites.length === 0 ? (
          <p className="text-center text-gray-400">No favorites yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="relative">
                <Image
                  src={favorite.imageUrl}
                  alt="Favorited transformation"
                  width={favorite.width || 512}
                  height={favorite.height || 512}
                  className="rounded-lg"
                />
                <FavoriteButton
                  imageId={favorite.id}
                  initialFavorited={true}
                  onToggleFavorite={handleToggleFavorite}
                />
                {favorite.prompt && (
                  <p className="mt-2 text-sm text-gray-400">{favorite.prompt}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
