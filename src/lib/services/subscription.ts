import { db } from '../firebase/firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { SubscriptionTier, UserSubscription, UsageStats } from '../types/subscription';

export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    description: 'Perfect for trying out DormVision',
    price: 0,
    features: ['2 transformations per day', 'Basic support'],
    transformationsPerDay: 2,
    stripePriceId: '', // No price ID for free tier
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    description: 'For power users who need more transformations',
    price: 9.99,
    features: [
      '50 transformations per day',
      'Priority support',
      'Advanced customization options',
    ],
    transformationsPerDay: 50,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || '',
  },
} as const;

export class SubscriptionService {
  static async getUserSubscription(userId: string): Promise<UserSubscription> {
    const docRef = doc(db, 'subscriptions', userId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      // Create default free subscription
      const defaultSubscription: UserSubscription = {
        tier: 'free',
        status: 'active',
        currentPeriodStart: Date.now(),
        currentPeriodEnd: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
      };
      await setDoc(docRef, defaultSubscription);
      return defaultSubscription;
    }
    
    return docSnap.data() as UserSubscription;
  }

  static async getUserUsage(userId: string): Promise<UsageStats> {
    const docRef = doc(db, 'usage', userId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      const defaultUsage: UsageStats = {
        transformationsToday: 0,
        lastResetDate: new Date().toISOString().split('T')[0],
      };
      await setDoc(docRef, defaultUsage);
      return defaultUsage;
    }
    
    return docSnap.data() as UsageStats;
  }

  static async checkAndResetDailyUsage(userId: string): Promise<UsageStats> {
    const usage = await this.getUserUsage(userId);
    const today = new Date().toISOString().split('T')[0];
    
    if (usage.lastResetDate !== today) {
      const resetUsage: UsageStats = {
        transformationsToday: 0,
        lastResetDate: today,
      };
      await setDoc(doc(db, 'usage', userId), resetUsage);
      return resetUsage;
    }
    
    return usage;
  }

  static async incrementUsage(userId: string): Promise<boolean> {
    const [subscription, usage] = await Promise.all([
      this.getUserSubscription(userId),
      this.checkAndResetDailyUsage(userId),
    ]);

    const plan = SUBSCRIPTION_PLANS[subscription.tier];
    
    if (usage.transformationsToday >= plan.transformationsPerDay) {
      return false; // Limit reached
    }

    await updateDoc(doc(db, 'usage', userId), {
      transformationsToday: increment(1),
    });

    return true; // Successfully incremented
  }
}
