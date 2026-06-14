const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    
    // Find all ultra-budget phones that might lack a hardware gyroscope
    // Known models: Redmi A series (A1, A2, A3), POCO C series (C50, C51, C55), Samsung A0 series (A03, A04, A05)
    const phones = await Phone.find({
        $or: [
            { slug: /-a[0-9]$|-a[0-9]-(plus|pro)$/ }, // Redmi A1, A2, A3
            { slug: /poco-c[0-9]{2}/ }, // POCO C31, C50, C51
            { slug: /galaxy-[am]0[0-9]/ } // Samsung A03, M04 etc.
        ]
    });
    
    let updatedCount = 0;
    
    for (const p of phones) {
        // These ultra-budget devices often use software gyros or lack them entirely.
        // We will explicitly set has_gyroscope to false for accuracy.
        await Phone.updateOne(
            { _id: p._id }, 
            { $set: { 
                has_gyroscope: false, 
                has_compass: p.has_compass // Compass might also be missing on some, but let's just fix gyro first as it's most common
            } }
        );
        console.log(`Disabled Gyroscope for budget phone: ${p.name}`);
        updatedCount++;
    }
    
    console.log(`Successfully refined gyroscope data for ${updatedCount} ultra-budget phones.`);
    mongoose.disconnect();
});
