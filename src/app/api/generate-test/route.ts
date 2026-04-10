import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { skill } = body;

        if (!skill) {
            return NextResponse.json({ error: "Skill is required" }, { status: 400 });
        }

        // Always fallback to the provided process env, but inject the user key as fallback for immediate action
        const apiKey = process.env.GEMINI_API_KEY || "AIzaSyC_R-l7AWT6zGsVe9mie4iHpWO2DzK_vtk";
        
        if (!process.env.GEMINI_API_KEY && !apiKey) {
             return NextResponse.json({ error: "Gemini API Key not configured" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        

        
        const prompt = `
You are an expert technical interviewer and software engineering examiner.
I need to test a candidate on their knowledge of this specific skill: "${skill}".

CRITICAL INSTRUCTION 1: Generate exactly 10 multiple-choice questions (MCQs) EXCLUSIVELY about ${skill}. Do not ask general programming or logic questions unless they are specifically tailored to ${skill}.
CRITICAL INSTRUCTION 2: Make the questions range from intermediate to advanced difficulty.
Each question should be practical and anti-cheat (hard to just drop into a search engine).

CRITICAL INSTRUCTION: You MUST return the output ONLY as a raw, valid JSON array. 
Do NOT wrap it in markdown block quotes (e.g. \`\`\`json). Just the raw JSON array string.
The JSON array MUST exactly follow this schema:
[
  {
    "question": "The question text here...",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctIndex": 0
  }
]
        `;

        // Retry logic with fallback models for 503 Overloaded errors
        let result = null;
        let lastError = null;
        const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemma-2-27b-it", "gemma-3-4b-it"];
        
        for (const modelName of modelsToTry) {
            try {
                const config: any = {};
                if (!modelName.startsWith("gemma")) {
                    config.responseMimeType = "application/json";
                }

                const currentModel = genAI.getGenerativeModel({ 
                    model: modelName,
                    generationConfig: config
                });
                
                // Try up to 2 times per model
                for (let attempt = 1; attempt <= 2; attempt++) {
                    try {
                        result = await currentModel.generateContent(prompt);
                        if (result) break;
                    } catch (e: any) {
                        lastError = e;
                        if (e.message?.includes("503") || e.status === 503) {
                            console.log(`[Attempt ${attempt}] ${modelName} heavily loaded (503). Retrying in 2 seconds...`);
                            await new Promise(r => setTimeout(r, 2000));
                        } else {
                            throw e; // Break inner loop if it's not a 503
                        }
                    }
                }
                
                if (result) break; // Break outer loop if we got a valid result
            } catch (fallbackError) {
                // If the model fails completely (e.g. 404), move to the next fallback model
                console.warn(`Model ${modelName} failed, falling back to next available model...`);
                lastError = fallbackError;
            }
        }
        
        if (!result) {
            console.error("All Gemini models and retries failed:", lastError);
            return NextResponse.json({ error: "Google AI Servers are currently experiencing extreme demand. Please try again in a few seconds." }, { status: 503 });
        }

        const responseText = result.response.text().trim();
        
        let questions = [];
        try {
            // Locate JSON array boundaries to ignore any conversational pre-text from LLM
            const firstBracket = responseText.indexOf('[');
            const lastBracket = responseText.lastIndexOf(']');
            
            if (firstBracket === -1 || lastBracket === -1) {
                throw new Error("Could not locate JSON array brackets in response");
            }
            
            const cleanJson = responseText.substring(firstBracket, lastBracket + 1);
            questions = JSON.parse(cleanJson);
            
            // Validate schema rigorously
            if (!Array.isArray(questions) || questions.length === 0 || !questions[0].question || !Array.isArray(questions[0].options)) {
                throw new Error("Invalid output payload from AI");
            }
        } catch (e) {
            console.error("Failed to parse Gemini generated test. Raw Text:", responseText);
            console.error("Parsing error details:", e);
            return NextResponse.json({ error: "Unable to build questions (JSON Schema Error). Try again." }, { status: 500 });
        }

        return NextResponse.json({ questions });
    } catch (error: any) {
        console.error("Error generating test:", error);
        return NextResponse.json({ error: error.message || "An error occurred while generating the test" }, { status: 500 });
    }
}
