const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    
    // Update the specs for Xiaomi 18 Pro Max based on latest 2026 leaks
    const res = await Phone.updateOne(
        { slug: "xiaomi-18-pro-max" },
        { $set: { 
            processor: "Qualcomm Snapdragon 8 Elite Gen 6 Pro (2 nm)",
            camera_main: "200 MP OIS (Main) + 200 MP OIS (Periscope Telephoto) + 50 MP UW, LOFIC HDR 3.0",
            battery_capacity: "8500 mAh (Silicon-Carbon High-Density)",
            display_peak_nits: "4000 nits peak (1-nit ultra-low dimming)",
            display_size: "6.9 inches, flat LTPO AMOLED, ultra-narrow bezels",
            launch_status: "Rumored. Expected release 2026, November",
            launch_date: "2026, November"
        }}
    );
    
    if (res.modifiedCount > 0) {
        console.log("Successfully updated Xiaomi 18 Pro Max with the latest leaked specifications.");
    } else {
        console.log("No changes made or phone not found.");
    }
    
    mongoose.disconnect();
});
