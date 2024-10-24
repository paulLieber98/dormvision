'use client';

import { useState } from 'react';
import { JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import { useAuth } from '../../lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log('Login attempted with:', email, password);
    // For now, we'll just use Google Sign-In
    await signInWithGoogle();
    router.push('/');
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
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-sm">
            <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-500">
              Don't have an account? Sign up
            </Link>
          </div>
          <button
            onClick={signInWithGoogle}
            className="w-full px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-100 transition duration-300 flex items-center justify-center"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-6 h-6 mr-2" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
