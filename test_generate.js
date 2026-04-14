const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
    console.log("Testing generation with new key...");
    const genAI = new GoogleGenerativeAI("AIzaSyC_R-l7AWT6zGsVe9mie4iHpWO2DzK_vtk");
    const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemma-3-1b-it", "gemma-3-4b-it", "gemini-flash-latest"];
    
    for (const m of models) {
        try {
            console.log(`Testing ${m}...`);
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("Say hello");
            console.log(`SUCCESS [${m}]:`, result.response.text());
        } catch(e) {
            console.error(`FAILED [${m}]:`, e.status, e.message);
        }
    }
}
test();
