"use client";

import Link from 'next/link';
import { useAuth } from '../lib/hooks/useAuth';

export default function Navbar() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  if (loading) {
    return <nav className="bg-gray-800 p-4">Loading...</nav>;
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          DormVision
        </Link>
        <div className="flex items-center">
          {user && (
            <Link href="/favorites" className="text-white mr-4 hover:text-gray-300">
              Favorites
            </Link>
          )}
          {user ? (
            <div className="flex items-center">
              <span className="text-white mr-4">Welcome, {user.displayName}</span>
              <button
                onClick={signOut}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
