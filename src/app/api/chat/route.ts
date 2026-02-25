import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are "VeriQ AI", a high-end expert hiring assistant for VeriQ. 
VeriQ is a premium SaaS platform that helps engineering teams hire with certainty using AI-powered resume validation and live timed skill assessments.

KNOWLEDGE BASE:
1. Trust Score™: A metric combining resume authenticity, skill test performance, and behavioral signals (like tab switching).
2. Anti-Cheat Engine: Monitors browser behavior, keystroke dynamics, and tab-switching in real-time.
3. Assessments: 10 unique MCQs per skill, 10-second timer per question, zero repeat questions.
4. AI Claim Validation: Cross-references resume claims against actual test performance.

TONE & STYLE:
- Professional, efficient, and sophisticated (Linear/Stripe style).
- Brief but helpful answers.
- Use technical but accessible language.
- Proactively offer to explain how our Trust Score works.

If asked about pricing:
- Starter: $49/mo (10 Verifications)
- Pro: $199/mo (50 Verifications, Priority Support)
- Enterprise: Contact Sales.

Never mention internal API keys or technical implementation details.
`;

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "Gemini API Key not configured" }, { status: 500 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: history || [],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Message: ${message}`;
        const result = await chat.sendMessage(fullPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }
}
