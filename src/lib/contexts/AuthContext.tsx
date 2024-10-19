"use client";

import React, { createContext, useEffect, useState, useCallback } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut, User } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  favorites: string[];
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  addFavorite: (imageUrl: string) => Promise<void>;
  removeFavorite: (imageUrl: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setFavorites(userDoc.data().favorites || []);
        } else {
          await setDoc(doc(db, "users", user.uid), { favorites: [] });
        }
      } else {
        setFavorites([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  }, []);

  const addFavorite = useCallback(async (imageUrl: string) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        favorites: arrayUnion(imageUrl)
      });
      setFavorites(prev => [...prev, imageUrl]);
    }
  }, [user]);

  const removeFavorite = useCallback(async (imageUrl: string) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        favorites: arrayRemove(imageUrl)
      });
      setFavorites(prev => prev.filter(url => url !== imageUrl));
    }
  }, [user]);

  const value = {
    user,
    loading,
    favorites,
    signInWithGoogle,
    signOut,
    addFavorite,
    removeFavorite,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
