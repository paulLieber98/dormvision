"use client";

import React, { createContext, useEffect, useState } from "react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut, 
  User,
  getAuth 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  favorites: string[];
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  addFavorite: (imageUrl: string) => Promise<void>;
  removeFavorite: (imageId: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      
      // Google accounts are pre-verified
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        createdAt: new Date().toISOString(),
        favorites: [],
        emailVerified: true
      }, { merge: true });
      
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const addFavorite = async (imageUrl: string) => {
    if (!user) return;
    const newFavorites = [...favorites, imageUrl];
    setFavorites(newFavorites);
    // Add Firestore update logic here if needed
  };

  const removeFavorite = async (imageId: string) => {
    if (!user) return;
    const newFavorites = favorites.filter(id => id !== imageId);
    setFavorites(newFavorites);
    // Add Firestore update logic here if needed
  };

  const value = {
    user,
    loading,
    favorites,
    signInWithGoogle,
    signOut,
    addFavorite,
    removeFavorite,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
