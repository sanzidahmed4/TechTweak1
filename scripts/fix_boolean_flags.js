const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    
    // Find all phones
    const phones = await Phone.find({});
    let updatedCount = 0;
    
    for (const p of phones) {
        const isFlagship = p.price_usd && p.price_usd >= 800;
        const isXiaomiFamily = p.name.toLowerCase().includes('xiaomi') || p.name.toLowerCase().includes('redmi') || p.name.toLowerCase().includes('poco');
        
        const updates = {
            // Basic sensors almost all modern phones have
            has_gyroscope: p.has_gyroscope !== undefined ? p.has_gyroscope : true,
            has_compass: p.has_compass !== undefined ? p.has_compass : true,
            has_accelerometer: p.has_accelerometer !== undefined ? p.has_accelerometer : true,
            has_face_unlock: p.has_face_unlock !== undefined ? p.has_face_unlock : true,
            
            // Specific hardware features
            has_ir_blaster: p.has_ir_blaster !== undefined ? p.has_ir_blaster : (isXiaomiFamily ? true : false),
            has_nfc: p.has_nfc !== undefined ? p.has_nfc : (isFlagship || (p.price_usd && p.price_usd > 200) ? true : false),
            has_5g: p.has_5g !== undefined ? p.has_5g : (p.processor && p.processor.toLowerCase().includes('5g') ? true : (isFlagship ? true : false)),
            has_audio_jack: p.has_audio_jack !== undefined ? p.has_audio_jack : (isFlagship ? false : true),
            
            // AI features (Default to true for recent flagships)
            has_circle_to_search: p.has_circle_to_search !== undefined ? p.has_circle_to_search : (isFlagship ? true : false),
            has_ai_editing: p.has_ai_editing !== undefined ? p.has_ai_editing : (isFlagship ? true : false),
            has_live_translation: p.has_live_translation !== undefined ? p.has_live_translation : (isFlagship ? true : false),
            has_ai_assistant: p.has_ai_assistant !== undefined ? p.has_ai_assistant : (isFlagship ? true : false),
        };
        
        await Phone.updateOne({ _id: p._id }, { $set: updates });
        updatedCount++;
    }
    
    console.log(`Successfully fixed boolean hardware flags for ${updatedCount} phones.`);
    mongoose.disconnect();
});
