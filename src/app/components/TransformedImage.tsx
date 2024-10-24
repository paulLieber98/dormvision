import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface TransformedImageProps {
  originalImage: string;
  transformedImage: string;
}

const TransformedImage: React.FC<TransformedImageProps> = ({ originalImage, transformedImage }) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (originalImage) {
      const img = new Image();
      img.src = originalImage;
      img.onload = () => {
        setDimensions({ width: img.width, height: img.height });
      };
    }
  }, [originalImage]);

  useEffect(() => {
    if (containerRef.current && dimensions) {
      const containerWidth = containerRef.current.offsetWidth;
      const aspectRatio = dimensions.height / dimensions.width;
      const height = containerWidth * aspectRatio;
      containerRef.current.style.height = `${height}px`;
    }
  }, [dimensions]);

  if (!dimensions) {
    return <div>Loading...</div>;
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <Image
        src={transformedImage}
        alt="Transformed room"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
};

export default TransformedImage;
