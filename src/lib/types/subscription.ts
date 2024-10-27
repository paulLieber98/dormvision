export type SubscriptionTier = 'free' | 'pro';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  transformationsPerDay: number;
  stripePriceId: string;
}

export interface UserSubscription {
  tier: SubscriptionTier;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodStart: number;
  currentPeriodEnd: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface UsageStats {
  transformationsToday: number;
  lastResetDate: string; // ISO string
}
