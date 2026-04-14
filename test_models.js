async function test() {
    try {
        const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyC_R-l7AWT6zGsVe9mie4iHpWO2DzK_vtk");
        const json = await res.json();
        console.log("Models:", json.models ? json.models.map(m=>m.name).join("\n") : json);
    } catch(e) {
        console.error(e);
    }
}
test();
