import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { planName } = await req.json();
        return NextResponse.json({
            status: "mock",
            message: `Mock Stripe Checkout Session created for ${planName} plan. Install stripe package to implement fully.`
        });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
