const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
    const genAI = new GoogleGenerativeAI("AIzaSyC_R-l7AWT6zGsVe9mie4iHpWO2DzK_vtk");
    const m = "gemma-3-4b-it";
    
    try {
        console.log(`Testing ${m} for JSON generation...`);
        const model = genAI.getGenerativeModel({ 
            model: m,
            generationConfig: { responseMimeType: "application/json" }
        });
        
        const prompt = `
Generate exactly 2 multiple-choice questions (MCQs) EXCLUSIVELY about React.
CRITICAL INSTRUCTION: Return ONLY a valid JSON array. The JSON array MUST exactly follow this schema:
[
  {
    "question": "The question text here...",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctIndex": 0
  }
]
`;
        const result = await model.generateContent(prompt);
        console.log(`SUCCESS [${m}]:\n`, result.response.text());
    } catch(e) {
        console.error(`FAILED [${m}]:`, e.message);
    }
}
test();
