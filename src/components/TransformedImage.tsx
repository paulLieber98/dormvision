import Image from "next/image";
import { useState } from "react";
import { useAuth } from "../lib/hooks/useAuth";

interface TransformedImageProps {
  imageUrl: string;
}

export default function TransformedImage({ imageUrl }: TransformedImageProps) {
  const { user, addFavorite, removeFavorite, favorites } = useAuth();
  const [isFavorite, setIsFavorite] = useState(favorites.includes(imageUrl));

  const handleFavoriteToggle = async () => {
    if (isFavorite) {
      await removeFavorite(imageUrl);
    } else {
      await addFavorite(imageUrl);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="mt-8 relative">
      <h2 className="text-2xl font-bold mb-4">Transformed Dorm Room</h2>
      <Image src={imageUrl} alt="Transformed Dorm Room" width={500} height={500} className="rounded-lg" />
      {user && (
        <button
          onClick={handleFavoriteToggle}
          className={`mt-2 px-4 py-2 rounded ${
            isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      )}
    </div>
  );
}
