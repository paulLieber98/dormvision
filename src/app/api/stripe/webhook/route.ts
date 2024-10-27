import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error('Webhook signature verification failed');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    switch (event.type) {
      case 'checkout.session.completed':
        // Update user's subscription status
        if (session.metadata?.userId) {
          await updateDoc(doc(db, 'subscriptions', session.metadata.userId), {
            tier: 'pro',
            status: 'active',
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            currentPeriodStart: Date.now(),
            currentPeriodEnd: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
          });
        }
        break;

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        // Find user by stripeCustomerId and update their subscription status
        const querySnapshot = await db
          .collection('subscriptions')
          .where('stripeCustomerId', '==', subscription.customer)
          .get();

        if (!querySnapshot.empty) {
          const userId = querySnapshot.docs[0].id;
          await updateDoc(doc(db, 'subscriptions', userId), {
            status: subscription.status,
            currentPeriodEnd: subscription.current_period_end * 1000,
          });
        }
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
