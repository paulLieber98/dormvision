import React from 'react';
import styles from './InspirationGallery.module.css';

interface InspirationGalleryProps {
  images: string[];
  onRemove?: (index: number) => void;
}

const InspirationGallery: React.FC<InspirationGalleryProps> = ({ images, onRemove }) => {
  return (
    <div className={styles.inspirationGallery}>
      <h2>Inspiration Gallery</h2>
      {images.length > 0 ? (
        <div className={styles.galleryGrid}>
          {images.map((imageUrl, index) => (
            <div key={index} className={styles.galleryItem}>
              <img 
                src={imageUrl} 
                alt={`Transformed Dorm Room ${index + 1}`} 
                className={styles.galleryImage} 
                onError={(e) => console.error("Image failed to load:", e)}
              />
              {onRemove && (
                <button 
                  className={styles.removeButton} 
                  onClick={() => onRemove(index)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No images in the gallery yet</p>
      )}
    </div>
  );
};

export default InspirationGallery;
