'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import LoadingBar from '@/components/LoadingBar';
import InspirationCard from '@/app/components/InspirationCard';
import { db } from '@/lib/firebase/firebase';
import { collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';

interface InspirationImage {
  id: string;
  url: string;
  prompt: string;
  likes: number;
  likedBy: string[];
  savedBy: string[];
}

export default function InspirationGallery() {
  const [images, setImages] = useState<InspirationImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const imagesCollection = collection(db, 'inspirationImages');
      const snapshot = await getDocs(imagesCollection);
      const imageData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as InspirationImage[];
      
      setImages(imageData);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (imageId: string) => {
    if (!user) return;

    try {
      const imageRef = doc(db, 'inspirationImages', imageId);
      const image = images.find(img => img.id === imageId);
      
      if (!image) return;

      const isLiked = image.likedBy.includes(user.uid);
      
      await updateDoc(imageRef, {
        likes: isLiked ? image.likes - 1 : image.likes + 1,
        likedBy: isLiked 
          ? arrayRemove(user.uid)
          : arrayUnion(user.uid)
      });

      // Update local state
      setImages(prevImages => 
        prevImages.map(img => 
          img.id === imageId 
            ? {
                ...img,
                likes: isLiked ? img.likes - 1 : img.likes + 1,
                likedBy: isLiked 
                  ? img.likedBy.filter(id => id !== user.uid)
                  : [...img.likedBy, user.uid]
              }
            : img
        )
      );
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleSave = async (imageId: string) => {
    if (!user) return;

    try {
      const imageRef = doc(db, 'inspirationImages', imageId);
      const image = images.find(img => img.id === imageId);
      
      if (!image) return;

      const isSaved = image.savedBy.includes(user.uid);
      
      await updateDoc(imageRef, {
        savedBy: isSaved 
          ? arrayRemove(user.uid)
          : arrayUnion(user.uid)
      });

      // Update local state
      setImages(prevImages => 
        prevImages.map(img => 
          img.id === imageId 
            ? {
                ...img,
                savedBy: isSaved
                  ? img.savedBy.filter(id => id !== user.uid)
                  : [...img.savedBy, user.uid]
              }
            : img
        )
      );
    } catch (error) {
      console.error('Error updating save:', error);
    }
  };

  const handleSeedData = async () => {
    setLoading(true);
    await seedInspirationImages();
    await fetchImages();
  };

  if (loading) return <LoadingBar />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Inspiration Gallery</h1>
        {images.length === 0 && (
          <button
            onClick={handleSeedData}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Load Sample Images
          </button>
        )}
      </div>
      
      {images.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No inspiration images found. Click the button above to load sample images.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <InspirationCard
              key={image.id}
              id={image.id}
              url={image.url}
              prompt={image.prompt}
              likes={image.likes}
              onLike={handleLike}
              onSave={handleSave}
              isLiked={user ? image.likedBy.includes(user.uid) : false}
              isSaved={user ? image.savedBy.includes(user.uid) : false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
