const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
    try {
        const genAI = new GoogleGenerativeAI("AIzaSyC_R-l7AWT6zGsVe9mie4iHpWO2DzK_vtk");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("hello");
        console.log("SUCCESS length:", result.response.text().length);
    } catch(e) {
        console.error("1.5-flash error:", e.message);
        
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyC_R-l7AWT6zGsVe9mie4iHpWO2DzK_vtk");
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent("hello");
            console.log("SUCCESS pro length:", result.response.text().length);
        } catch(e2) {
             console.error("pro error:", e2.message);
        }
    }
}
test();
