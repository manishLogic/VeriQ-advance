import { NextResponse } from 'next/server';

export async function POST() {
    return NextResponse.json({
        status: "mock",
        message: "Stripe Webhook handler configured. Implement raw body parsing for true webhook verification."
    });
}
