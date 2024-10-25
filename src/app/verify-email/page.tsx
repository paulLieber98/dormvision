'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { auth } from '@/lib/firebase/firebase';
import { sendEmailVerification } from 'firebase/auth';

export default function VerifyEmailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    // If user is verified or no user, redirect to appropriate page
    if (!user) {
      router.push('/login');
    } else if (user.emailVerified) {
      router.push('/transform');
    }
  }, [user, router]);

  useEffect(() => {
    // Check email verification status every 5 seconds
    const interval = setInterval(async () => {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          router.push('/transform');
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [user, router]);

  useEffect(() => {
    if (resendDisabled && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(60);
    }
  }, [countdown, resendDisabled]);

  const handleResendEmail = async () => {
    if (user && !resendDisabled) {
      try {
        await sendEmailVerification(user);
        setResendDisabled(true);
      } catch (error) {
        console.error('Error sending verification email:', error);
      }
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-400">Verify Your Email</h2>
          <p className="mt-2 text-gray-400">
            We've sent a verification email to:
            <br />
            <span className="font-medium text-gray-300">{user.email}</span>
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-400 text-center">
            Please check your inbox and click the verification link to activate your account.
          </p>
          
          <button
            onClick={handleResendEmail}
            disabled={resendDisabled}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendDisabled 
              ? `Resend available in ${countdown}s` 
              : 'Resend verification email'}
          </button>
        </div>
      </div>
    </div>
  );
}
