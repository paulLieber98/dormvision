"use client";

import { useContext } from "react";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const auth = getAuth();

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
