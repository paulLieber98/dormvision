import Stripe from 'stripe';
import { SUBSCRIPTION_PLANS } from './subscription';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Your Stripe account ID should be in your environment variables
const STRIPE_ACCOUNT_ID = process.env.STRIPE_ACCOUNT_ID;

export class StripeService {
  static async createCheckoutSession(userId: string, priceId: string) {
    const session = await stripe.checkout.sessions.create({
      customer_email: undefined, // Will be set in the API route
      billing_address_collection: 'auto',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings?canceled=true`,
      metadata: {
        userId,
      },
      // Direct payments to your Stripe account
      payment_intent_data: {
        transfer_data: {
          destination: STRIPE_ACCOUNT_ID,
        },
      },
      // Ensure the payment method is automatically attached to the subscription
      payment_method_types: ['card'],
      // Set your account as the merchant
      stripe_account: STRIPE_ACCOUNT_ID,
    });

    return session;
  }

  static async createPortalSession(customerId: string) {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings`,
      // Set your account as the merchant
      stripe_account: STRIPE_ACCOUNT_ID,
    });

    return session;
  }
}
