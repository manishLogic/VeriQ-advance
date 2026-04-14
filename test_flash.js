const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
    const genAI = new GoogleGenerativeAI("AIzaSyC_R-l7AWT6zGsVe9mie4iHpWO2DzK_vtk");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent("hello");
        console.log("SUCCESS [gemini-flash-latest]:", result.response.text());
    } catch(e) {
        console.error("FAILED:", e.message);
    }
}
test();
