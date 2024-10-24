'use client';

import React from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

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
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
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
      </div>
    </div>
  );
};

export default ProfilePage;
