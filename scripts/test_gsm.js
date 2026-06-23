const gsmarena = require('gsmarena-api');

async function test() {
    try {
        console.log("Searching for iPhone 14...");
        const res = await gsmarena.search.search('iPhone 14');
        console.log(res);
        if (res && res.length > 0) {
            console.log("Fetching specs for:", res[0].id);
            const specs = await gsmarena.catalog.getDevice(res[0].id);
            console.log(specs.cameras ? specs.cameras[0] : "No cameras found");
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}
test();
