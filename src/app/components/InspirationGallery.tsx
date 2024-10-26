'use client';

import React from 'react';
import styles from './InspirationGallery.module.css';
import BeforeAfterSlider from './BeforeAfterSlider';

// Only use the inspo_ prefixed images
const imagePairs = [
  { before: '/images/inspo_before1.jpg', after: '/images/inspo_after1.jpg' },
  { before: '/images/inspo_before2.jpg', after: '/images/inspo_after2.jpg' },
  { before: '/images/inspo_before3.jpg', after: '/images/inspo_after3.jpg' },
  { before: '/images/inspo_before4.jpg', after: '/images/inspo_after4.jpg' },
];

const InspirationGallery: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-400 mb-12 text-center">
        Inspiration Gallery
      </h2>
      <div className="space-y-24">
        {imagePairs.map((pair, index) => (
          <div key={index} className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h3 className="text-xl text-gray-200 mb-2">
                Transformation {index + 1}
              </h3>
              <p className="text-gray-400">
                Swipe or drag the slider to see the transformation
              </p>
            </div>
            <div className="shadow-2xl rounded-lg overflow-hidden">
              <BeforeAfterSlider
                beforeImage={pair.before}
                afterImage={pair.after}
                alt={`Room transformation ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspirationGallery;
