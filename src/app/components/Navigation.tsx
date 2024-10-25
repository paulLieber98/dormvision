'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

export default function Navigation() {
  const { user, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-900 text-gray-200 py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-400">
          DormVision
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/transform" className="hover:text-blue-400 transition-colors">
            Transform Room
          </Link>
          <Link href="/inspiration" className="hover:text-blue-400 transition-colors">
            Inspiration Gallery
          </Link>
          <Link href="/favorites" className="hover:text-blue-400 transition-colors">
            Favorites
          </Link>
          
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-blue-400 transition-colors focus:outline-none"
              >
                Welcome, {user.displayName || 'User'}
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      signOut();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
