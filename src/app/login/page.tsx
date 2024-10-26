'use client';

import { useState } from 'react';
import { JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import { useAuth } from '../../lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { db } from '@/lib/firebase/firebase';
import { query, collection, getDocs, doc, updateDoc, where } from 'firebase/firestore';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Move userDoc query outside try-catch
    const userDocQuery = await getDocs(query(collection(db, 'users'), where('email', '==', email)));

    try {
      if (!userDocQuery.empty) {
        const userData = userDocQuery.docs[0].data();
        
        // Check if account is locked
        if (userData.accountLocked) {
          const lockTime = new Date(userData.lockTime);
          const now = new Date();
          const lockDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
        
          if (now.getTime() - lockTime.getTime() < lockDuration) {
            setError('Account is temporarily locked. Please try again later or reset your password');
            setLoading(false);
            return;
          } else {
            // Reset lock if duration has passed
            await updateDoc(doc(db, 'users', userDocQuery.docs[0].id), {
              accountLocked: false,
              failedLoginAttempts: 0
            });
          }
        }
      }

      await signInWithEmailAndPassword(auth, email, password);
      
      // Reset failed attempts on successful login
      if (!userDocQuery.empty) {
        await updateDoc(doc(db, 'users', userDocQuery.docs[0].id), {
          failedLoginAttempts: 0
        });
      }
      
      router.push('/transform');
    } catch (err: any) {
      let errorMessage = 'Failed to sign in';
      if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password';
        
        // Increment failed attempts and potentially lock account
        if (!userDocQuery.empty) {
          const userData = userDocQuery.docs[0].data();
          const newAttempts = (userData.failedLoginAttempts || 0) + 1;
          
          await updateDoc(doc(db, 'users', userDocQuery.docs[0].id), {
            failedLoginAttempts: newAttempts,
            accountLocked: newAttempts >= 5,
            lockTime: newAttempts >= 5 ? new Date().toISOString() : null
          });
          
          if (newAttempts >= 5) {
            errorMessage = 'Too many failed attempts. Account temporarily locked for 30 minutes';
          }
        }
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/transform');
    } catch (err) {
      setError('Failed to sign in with Google');
    }
  };

  return (
    <div className={`flex min-h-screen bg-gray-950 ${jetbrainsMono.className}`}>
      <div className="m-auto w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-blue-400">
            Welcome to DormVision
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleEmailSignIn}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Add the forgot password link here */}
            <div className="flex justify-end">
              <Link
                href="/reset-password"
                className="text-sm text-blue-400 hover:text-blue-500 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          {/* Add the new note here */}
          <p className="text-sm text-gray-400 text-center mt-2">
            If you signed up with Google, please click the &apos;Sign in with Google&apos; button. 
            If you registered using an email and password, use the traditional sign-in method above.
          </p>

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-sm">
              <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-500">
                Don't have an account? Sign up
              </Link>
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="border-t border-gray-700 w-full"></div>
              <span className="px-4 text-gray-400">or</span>
              <div className="border-t border-gray-700 w-full"></div>
            </div>
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-100 transition duration-300 flex items-center justify-center"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-6 h-6 mr-2" />
              Sign in / Sign up with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
