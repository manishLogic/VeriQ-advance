import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdfParseModule from "pdf-parse";
const pdfParse = (pdfParseModule as any).default || pdfParseModule;

// Local parsing logic doesn't require Gemini API here

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
            return NextResponse.json({ error: "Invalid file type. Only PDF resumes are supported." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Extract text from PDF
        let pdfData;
        try {
            pdfData = await pdfParse(buffer);
        } catch (pdfError) {
            console.error("PDF Parsing error:", pdfError);
            return NextResponse.json({ error: "Could not read this PDF. It may be corrupted or encrypted. Please try a different PDF." }, { status: 400 });
        }
        const text = pdfData.text;

        if (!text || text.trim().length === 0) {
            return NextResponse.json({ error: "Could not extract text from the provided PDF." }, { status: 400 });
        }

        const KNOWN_SKILLS = [
            "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Ruby", "PHP", "Go", "Rust", "Swift", "Kotlin",
            "React", "Angular", "Vue.js", "Next.js", "Node.js", "Express", "Django", "Flask", "Spring Boot", ".NET",
            "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase", "Supabase", "GraphQL", "REST API",
            "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Git", "GitHub", "GitLab",
            "HTML", "CSS", "Tailwind CSS", "SASS", "Bootstrap", "Figma", "UI/UX",
            "Machine Learning", "Data Science", "Pandas", "NumPy", "TensorFlow", "PyTorch",
            "Linux", "Unix", "Bash", "Shell Scripting", "Agile", "Scrum", "Jira",
            "Blockchain", "Web3", "Smart Contracts", "Solidity",
            "Cypress", "Jest", "Mocha", "Selenium", "Playwright",
            "Cloud Computing", "Artificial Intelligence", "DevOps", "Microservices"
        ];

        let extractedSkills: string[] = [];
        const cleanText = " " + text.toLowerCase().replace(/[^a-z0-9+#.\-]/g, ' ') + " ";

        extractedSkills = KNOWN_SKILLS.filter(skill => {
            const cleanSkill = skill.toLowerCase();
            return cleanText.includes(" " + cleanSkill + " ");
        });

        // Limit to top 12 skills
        extractedSkills = extractedSkills.slice(0, 12);

        return NextResponse.json({ skills: extractedSkills });

    } catch (error) {
        console.error("Error parsing resume:", error);
        return NextResponse.json({ error: "An error occurred while processing the resume." }, { status: 500 });
    }
}
