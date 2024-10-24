import Image from 'next/image';
import { useAuth } from '@/lib/hooks/useAuth';

interface InspirationCardProps {
  id: string;
  url: string;
  prompt: string;
  likes: number;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  isLiked: boolean;
  isSaved: boolean;
}

export default function InspirationCard({ 
  id, 
  url, 
  prompt, 
  likes, 
  onLike, 
  onSave,
  isLiked,
  isSaved
}: InspirationCardProps) {
  const { user } = useAuth();

  const handleAction = (action: () => void) => {
    if (!user) {
      alert('Please sign in to perform this action');
      return;
    }
    action();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative h-64 group">
        <Image
          src={url}
          alt={prompt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <p className="text-gray-700 text-sm mb-2">{prompt}</p>
        <div className="flex items-center justify-between">
          <button 
            className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
            onClick={() => handleAction(() => onLike(id))}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill={isLiked ? "currentColor" : "none"} 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <span>{likes}</span>
          </button>
          <button 
            className={`px-3 py-1 text-sm font-medium ${
              isSaved 
                ? 'text-green-500 hover:text-green-700' 
                : 'text-blue-500 hover:text-blue-700'
            }`}
            onClick={() => handleAction(() => onSave(id))}
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
