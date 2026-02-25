import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        status: "mock",
        message: "NextAuth is mocked for this UI build. To implement real Auth, install next-auth."
    });
}

export async function POST() {
    return NextResponse.json({
        status: "mock",
        message: "NextAuth is mocked for this UI build. To implement real Auth, install next-auth."
    });
}
