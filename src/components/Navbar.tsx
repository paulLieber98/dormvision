"use client";

import Link from 'next/link';
import { useAuth } from '../lib/hooks/useAuth';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link className="flex items-center space-x-2" href="/">
          <span className="font-bold text-blue-400 text-lg">DormVision</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link 
            href="/transform" 
            className="text-xs font-medium text-gray-400 border border-gray-700 rounded-full px-3 py-1 hover:border-blue-400 hover:text-blue-400 transition-colors"
          >
            Transform Room
          </Link>
          <Link 
            href="/inspiration" 
            className="text-xs font-medium text-gray-400 border border-gray-700 rounded-full px-3 py-1 hover:border-blue-400 hover:text-blue-400 transition-colors"
          >
            Inspiration Gallery
          </Link>
          <Link 
            href="/favorites" 
            className="text-xs font-medium text-gray-400 border border-gray-700 rounded-full px-3 py-1 hover:border-blue-400 hover:text-blue-400 transition-colors"
          >
            Favorites
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <Link 
                href="/profile" 
                className="text-xs font-medium text-gray-400 border border-gray-700 rounded-full px-3 py-1 hover:border-blue-400 hover:text-blue-400 transition-colors"
              >
                Welcome, {user.displayName || user.email}
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
