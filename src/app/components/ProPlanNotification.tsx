'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { SubscriptionService, SUBSCRIPTION_PLANS } from '@/lib/services/subscription';

export default function ProPlanNotification() {
  const [isVisible, setIsVisible] = useState(() => {
    // Check if notification was recently dismissed
    const lastDismissed = localStorage.getItem('proPlanNotificationDismissed');
    if (lastDismissed) {
      const dismissedTime = parseInt(lastDismissed);
      const sixHoursAgo = Date.now() - (6 * 60 * 60 * 1000);
      return dismissedTime < sixHoursAgo;
    }
    return true;
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Awaited<ReturnType<typeof SubscriptionService.getUserSubscription>> | null>(null);

  // Fetch subscription status when component mounts
  useState(() => {
    if (user) {
      SubscriptionService.getUserSubscription(user.uid)
        .then(setSubscription)
        .catch(console.error);
    }
  });

  // Don't show if user is not logged in or already has pro plan
  if (!user || subscription?.tier === 'pro' || !isVisible) {
    return null;
  }

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({
          priceId: SUBSCRIPTION_PLANS.pro.stripePriceId,
        }),
      });

      const { sessionId } = await response.json();
      router.push(`/checkout?session_id=${sessionId}`);
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Remember dismissal time
    localStorage.setItem('proPlanNotificationDismissed', Date.now().toString());
  };

  return (
    <div className="fixed bottom-20 right-4 max-w-sm bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
      <button 
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-white hover:text-gray-200"
      >
        ×
      </button>
      <h3 className="font-semibold mb-2">Upgrade to Pro!</h3>
      <p className="text-sm mb-3">
        Get {SUBSCRIPTION_PLANS.pro.transformationsPerDay} transformations per day and unlock all premium features.
      </p>
      <button
        onClick={handleUpgrade}
        disabled={isLoading}
        className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
      >
        {isLoading ? 'Loading...' : `Upgrade for $${SUBSCRIPTION_PLANS.pro.price}/month`}
      </button>
    </div>
  );
}
