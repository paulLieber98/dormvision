'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { deleteUser, updateProfile } from 'firebase/auth';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase/firebase';
import RouteGuard from '@/components/RouteGuard';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { resizeImage } from '@/lib/firebase/firebaseUtils';

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      await updateProfile(user, {
        displayName: displayName,
      });

      await updateDoc(doc(db, 'users', user.uid), {
        displayName: displayName,
      });

      setIsEditing(false);
    } catch (error) {
      setError('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.[0]) return;

    setLoading(true);
    setError('');

    try {
      const file = e.target.files[0];
      const resizedImage = await resizeImage(file, 200, 200);
      const storageRef = ref(storage, `profile-photos/${user.uid}`);
      
      await uploadBytes(storageRef, resizedImage);
      const photoURL = await getDownloadURL(storageRef);
      
      await updateProfile(user, { photoURL });
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL: photoURL,
      });
    } catch (error) {
      setError('Failed to update profile photo');
      console.error('Error updating profile photo:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'users', user.uid));
      await deleteUser(user);
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
        
        {/* Profile card */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="relative">
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
              <label className="absolute bottom-0 right-6 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={loading}
                />
              </label>
            </div>
            <div>
              {isEditing ? (
                <form onSubmit={handleProfileUpdate} className="space-y-2">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-2 rounded-md"
                    placeholder="Display Name"
                  />
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold">{user.displayName || 'User'}</h2>
                  <p className="text-gray-400">{user.email}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-semibold mb-4">Account Information</h3>
            <p className="mb-2"><span className="font-medium">Email:</span> {user.email}</p>
            <p className="mb-2"><span className="font-medium">Account created:</span> {user.metadata.creationTime}</p>
          </div>
        </div>

        {/* Danger Zone card */}
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
