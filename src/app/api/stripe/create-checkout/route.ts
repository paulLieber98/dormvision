import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase/firebase';
import { StripeService } from '@/lib/services/stripe';
import { SUBSCRIPTION_PLANS } from '@/lib/services/subscription';

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json();
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    
    if (!decodedToken.uid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate priceId matches our plans
    const validPriceIds = Object.values(SUBSCRIPTION_PLANS)
      .map(plan => plan.stripePriceId)
      .filter(Boolean);
      
    if (!validPriceIds.includes(priceId)) {
      return NextResponse.json({ error: 'Invalid price ID' }, { status: 400 });
    }

    const session = await StripeService.createCheckoutSession(
      decodedToken.uid,
      priceId
    );

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
