import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdfParseModule from "pdf-parse";
const pdfParse = (pdfParseModule as any).default || pdfParseModule;

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "Gemini API Key not configured" }, { status: 500 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Extract text from PDF
        const pdfData = await pdfParse(buffer);
        const text = pdfData.text;

        if (!text || text.trim().length === 0) {
            return NextResponse.json({ error: "Could not extract text from the provided PDF." }, { status: 400 });
        }

        const prompt = `
You are an expert technical recruiter and resume parser.
I will provide you with the raw text extracted from a candidate's resume. 
Your task is to identify and extract the core software development, technical, and engineering skills mentioned in the resume.

CRITICAL INSTRUCTION: You must extract technical skills that the candidate has genuinely written anywhere in the resume. Do NOT invent, guess, or infer skills (e.g. if they say they built a web app, do not invent "HTML" unless they literally wrote it). If zero technical skills are written in the text, return an empty array [].

Return ONLY a valid JSON array of strings, where each string is a distinct technical skill. 
Do not include soft skills. Limit to the top 12 most relevant skills found exactly in the text. Do not include markdown formatting like \`\`\`json. Just the raw JSON array.

Resume Text:
${text.substring(0, 10000)}
        `;

        // Retry logic with fallback models for 503 Overloaded errors
        let result: any = null;
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
                            throw e; 
                        }
                    }
                }
                
                if (result) break; 
            } catch (fallbackError) {
                console.warn(`Model ${modelName} failed, falling back to next available model...`);
                lastError = fallbackError;
            }
        }
        
        if (!result) {
            console.error("All Gemini models and retries failed:", lastError);
            return NextResponse.json({ error: "Google AI Servers are currently experiencing extreme demand. Please try again in a few seconds." }, { status: 503 });
        }

        const responseText = result.response.text().trim();
        
        let skills: string[] = [];
        try {
            // strip backticks and json identifier if Gemini included them (fallback just in case)
            const cleanJson = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
            // find the array part in case there's extra text
            const match = cleanJson.match(/\[[\s\S]*\]/);
            if (match) {
                skills = JSON.parse(match[0]);
            } else {
                skills = JSON.parse(cleanJson);
            }
        } catch (e) {
            console.error("Failed to parse Gemini response:", responseText);
            return NextResponse.json({ error: "Failed to parse skills from resume." }, { status: 500 });
        }

        return NextResponse.json({ skills });

    } catch (error) {
        console.error("Error parsing resume:", error);
        return NextResponse.json({ error: "An error occurred while processing the resume." }, { status: 500 });
    }
}
