'use client';

import React from 'react';
import Image from 'next/image';
import styles from './InspirationGallery.module.css';

// Only use the inspo_ prefixed images
const imagePairs = [
  { before: '/images/inspo_before1.jpg', after: '/images/inspo_after1.jpg' },
  { before: '/images/inspo_before2.jpg', after: '/images/inspo_after2.jpg' },
  { before: '/images/inspo_before3.jpg', after: '/images/inspo_after3.jpg' },
  { before: '/images/inspo_before4.jpg', after: '/images/inspo_after4.jpg' },
];

const InspirationGallery: React.FC = () => {
  const [imageLoadError, setImageLoadError] = React.useState<Record<string, boolean>>({});

  const handleImageError = (path: string) => {
    console.error(`Failed to load image: ${path}`);
    setImageLoadError(prev => ({ ...prev, [path]: true }));
  };

  return (
    <div className={styles.inspirationGallery}>
      <h2 className="text-3xl font-bold text-blue-400 mb-6">Inspiration Gallery</h2>
      <div className={styles.galleryGrid}>
        {imagePairs.map((pair, index) => (
          <div key={index} className={styles.galleryItem}>
            <div className="flex flex-col gap-4 p-4">
              <div className="relative h-[200px] w-full bg-gray-800 rounded-lg overflow-hidden">
                {!imageLoadError[pair.before] && (
                  <Image 
                    src={pair.before} 
                    alt={`Before ${index + 1}`} 
                    fill
                    className="object-cover rounded-lg transition-opacity duration-300 hover:opacity-90"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => handleImageError(pair.before)}
                    priority={index === 0}
                  />
                )}
                <span className="absolute bottom-2 left-2 bg-gray-900/80 text-blue-400 px-2 py-1 rounded-full text-sm">
                  Before
                </span>
              </div>
              <div className="relative h-[200px] w-full bg-gray-800 rounded-lg overflow-hidden">
                {!imageLoadError[pair.after] && (
                  <Image 
                    src={pair.after} 
                    alt={`After ${index + 1}`} 
                    fill
                    className="object-cover rounded-lg transition-opacity duration-300 hover:opacity-90"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => handleImageError(pair.after)}
                    priority={index === 0}
                  />
                )}
                <span className="absolute bottom-2 left-2 bg-gray-900/80 text-blue-400 px-2 py-1 rounded-full text-sm">
                  After
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspirationGallery;
