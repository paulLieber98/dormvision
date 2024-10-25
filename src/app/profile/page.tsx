'use client';

import React from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import RouteGuard from '@/components/RouteGuard';

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const deleteAccount = async () => {
    if (!user) return;

    try {
      // Delete user data from Firestore
      await deleteDoc(doc(db, 'users', user.uid));
      
      // Delete the user's authentication account
      await deleteUser(user);
      
      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p className="text-xl">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        
        {/* Existing profile card */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-24 h-24 rounded-full mr-6"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold mr-6">
                {user.displayName ? user.displayName[0].toUpperCase() : user.email[0].toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold">{user.displayName || 'User'}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-semibold mb-4">Account Information</h3>
            <p className="mb-2"><span className="font-medium">Email:</span> {user.email}</p>
            {user.displayName && (
              <p className="mb-2"><span className="font-medium">Name:</span> {user.displayName}</p>
            )}
            <p className="mb-2"><span className="font-medium">Account created:</span> {user.metadata.creationTime}</p>
          </div>
        </div>

        {/* New Danger Zone card */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-red-800">
          <h2 className="text-xl font-semibold mb-4 text-red-500">Danger Zone</h2>
          <p className="text-gray-400 mb-6">These actions are permanent and cannot be undone.</p>
          
          <div className="space-y-4">
            <button
              onClick={signOut}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Sign Out
            </button>
            
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
                  // Call the delete account function
                  deleteAccount();
                }
              }}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Permanently Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
