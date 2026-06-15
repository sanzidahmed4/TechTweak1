const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    
    const phones = await Phone.find({}).lean();
    console.log(`Auditing ${phones.length} phones in the database...`);
    
    let issues = [];
    
    phones.forEach(phone => {
        let phoneIssues = [];
        
        // 1. Check for generic "Yes" in sensors (instead of actual sensor names)
        if (phone.sensors_other === "Yes" || phone.sensors_other === "No") {
            phoneIssues.push(`sensors_other is generic "${phone.sensors_other}"`);
        }
        
        // 2. Check for missing crucial fields
        if (!phone.camera_main || phone.camera_main.trim() === "") phoneIssues.push("Missing camera_main");
        if (!phone.battery_capacity || phone.battery_capacity.trim() === "") phoneIssues.push("Missing battery_capacity");
        if (!phone.display_resolution || phone.display_resolution.trim() === "") phoneIssues.push("Missing display_resolution");
        
        // 3. Check for placeholder strings in camera
        if (phone.camera_main && phone.camera_main.match(/^Dual$|^Single$|^Triple$|^Quad$/i)) {
            phoneIssues.push(`camera_main is generic "${phone.camera_main}"`);
        }
        
        // 4. Check for undefined strings
        if (phone.physical_weight === "undefined" || phone.physical_weight === "undefined g") phoneIssues.push("physical_weight is undefined");
        
        // 5. Check missing charging info
        if (!phone.charging_wired && !phone.battery_charging) phoneIssues.push("Missing charging details");

        // 6. Check generic dimensions
        if (phone.body_dimensions && phone.body_dimensions.includes("x undefined")) {
            phoneIssues.push(`body_dimensions is malformed "${phone.body_dimensions}"`);
        }

        if (phoneIssues.length > 0) {
            issues.push({ name: phone.name, slug: phone.slug, problems: phoneIssues });
        }
    });
    
    console.log(`Audit complete. Found issues in ${issues.length} phones.`);
    fs.writeFileSync('audit_results.json', JSON.stringify(issues, null, 2));
    
    mongoose.disconnect();
});
