"use client";

import Link from 'next/link';
import { useAuth } from '../lib/hooks/useAuth';

export default function Navbar() {
  const { user, signOut } = useAuth();

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
          {user ? (
            <>
              <Link 
                href="/profile" 
                className="text-xs font-medium text-gray-400 border border-gray-700 rounded-full px-3 py-1 hover:border-blue-400 hover:text-blue-400 transition-colors"
              >
                Welcome, {user.displayName || user.email}
              </Link>
              <button
                onClick={signOut}
                className="text-xs font-medium text-white bg-red-600 rounded-full px-3 py-1 hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              className="text-xs font-medium text-white bg-blue-600 rounded-full px-3 py-1 hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
