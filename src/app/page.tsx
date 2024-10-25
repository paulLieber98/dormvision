"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useAuth } from '../lib/hooks/useAuth';
import { ArrowRight, Upload, Wand2, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const howItWorksRef = useRef<HTMLElement>(null);
  const { user, signOut } = useAuth();

  const showcaseImages = [
    { before: "/images/before1.jpg", after: "/images/after1.jpg" },
    { before: "/images/before2.jpg", after: "/images/after2.jpg" },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % showcaseImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length);

  const scrollToHowItWorks = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-gray-200">
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-400">
            Transform Your Dorm Into Your Dream Space
          </h1>
          <p className="text-xl mb-8 text-gray-400">
            Upload your room photo and let AI redesign it for maximum comfort, style, and productivity.
          </p>
          <Link href="/transform" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 inline-flex items-center">
            Transform Your Dorm Room
            <ArrowRight className="ml-2" />
          </Link>
        </section>

        <section ref={howItWorksRef} className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Upload className="w-8 h-8 text-blue-400" />, title: 'Upload your room photo', description: "Take a photo of your dorm room and upload it to our platform." },
              { icon: <Wand2 className="w-8 h-8 text-blue-400" />, title: 'Transform your dorm room', description: "This AI tool reformats your room to maximize comfort and style." },
              { icon: <ShoppingBag className="w-8 h-8 text-blue-400" />, title: 'Get inspired by the gallery', description: "Customize your design and look at the inspiration gallery for ideas." }
            ].map((step, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-800">
                <div className="text-3xl font-bold text-blue-400 mb-4">{index + 1}</div>
                {step.icon}
                <h3 className="text-xl font-semibold mb-2 text-gray-200">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">See the Difference DormVision Can Make</h2>
          <div className="relative w-full max-w-4xl mx-auto aspect-[3/2] bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <div className="absolute inset-0">
              {/* Before image container with label */}
              <div className="absolute inset-0 w-1/2">
                <Image 
                  src={showcaseImages[currentSlide].before} 
                  alt={`Before ${currentSlide + 1}`} 
                  fill
                  quality={90}
                  priority={currentSlide === 0}
                  className="object-contain"
                  sizes="(max-width: 1024px) 50vw, 512px"
                />
                {/* Before label */}
                <div className="absolute bottom-4 left-0 w-full text-center">
                  <span className="bg-gray-900/80 text-blue-400 px-4 py-1 rounded-full text-sm font-semibold">
                    Before
                  </span>
                </div>
              </div>
              {/* After image container with label */}
              <div className="absolute inset-0 w-1/2 left-1/2">
                <Image 
                  src={showcaseImages[currentSlide].after} 
                  alt={`After ${currentSlide + 1}`} 
                  fill
                  quality={90}
                  priority={currentSlide === 0}
                  className="object-contain"
                  sizes="(max-width: 1024px) 50vw, 512px"
                />
                {/* After label */}
                <div className="absolute bottom-4 left-0 w-full text-center">
                  <span className="bg-gray-900/80 text-blue-400 px-4 py-1 rounded-full text-sm font-semibold">
                    After
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation buttons remain the same */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => setCurrentSlide(0)} 
              className={`mx-2 p-2 rounded-full transition-colors ${
                currentSlide === 0 ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="w-6 h-6 text-blue-400" />
            </button>
            <button 
              onClick={() => setCurrentSlide(1)} 
              className={`mx-2 p-2 rounded-full transition-colors ${
                currentSlide === 1 ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <ChevronRight className="w-6 h-6 text-blue-400" />
            </button>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-400">Ready to Transform Your Space?</h2>
          <Link href="/transform" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 inline-flex items-center">
            Try It Now
            <ArrowRight className="ml-2" />
          </Link>
        </section>
      </main>
    </div>
  );
}
