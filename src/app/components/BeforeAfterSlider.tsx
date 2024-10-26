'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt?: string;
}

export default function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  alt = "Image comparison" 
}: BeforeAfterSliderProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMove = (clientX: number) => {
    if (!isResizing || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const containerWidth = rect.width;
    const position = Math.max(0, Math.min(clientX - rect.left, containerWidth));
    const percentage = (position / containerWidth) * 100;
    
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
      
      // Prevent text selection while dragging
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video select-none overflow-hidden rounded-lg"
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={`After ${alt}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        {/* After Label */}
        <div className="absolute bottom-4 right-4">
          <span className="bg-gray-900/80 text-blue-400 px-4 py-1 rounded-full text-sm font-semibold">
            After
          </span>
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
        }}
      >
        <Image
          src={beforeImage}
          alt={`Before ${alt}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        {/* Before Label */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-gray-900/80 text-blue-400 px-4 py-1 rounded-full text-sm font-semibold">
            Before
          </span>
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0"
        style={{ left: `${sliderPosition}%` }}
      >
        <div 
          className="absolute inset-y-0 w-1 bg-white cursor-ew-resize touch-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg 
              className="w-4 h-4 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 9l4-4 4 4m0 6l-4 4-4-4" 
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
