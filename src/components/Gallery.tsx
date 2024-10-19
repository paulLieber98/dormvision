import Image from "next/image";
import { X } from "lucide-react";

interface TransformedImage {
  id: string;
  originalUrl: string;
  transformedUrl: string;
}

interface GalleryProps {
  images: TransformedImage[];
  onDelete: (id: string) => void;
}

export default function Gallery({ images, onDelete }: GalleryProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inspiration Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative h-48">
            <Image
              src={image.transformedUrl}
              alt="Transformed Dorm Room"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <button
              onClick={() => onDelete(image.id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
