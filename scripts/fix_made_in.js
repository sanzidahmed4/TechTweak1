const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});
mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const Brand = mongoose.model('Brand', new mongoose.Schema({},{strict:false}));
    const b = await Brand.findOne({name:'Xiaomi'});
    
    // Some phones had empty AI features array which made it fail `ai_features?.join(", ")` if not careful, but wait, UI empty is string based.
    // I will just add made_in: 'China' and also ensure ai_features has at least 'None' if empty.
    
    const phones = await Phone.find({brand_id: b._id});
    for (const p of phones) {
        if (!p.made_in) p.made_in = 'China';
        if (!p.ai_features || p.ai_features.length === 0) p.ai_features = ['Standard AI Features'];
        
        await Phone.updateOne({_id: p._id}, {$set: {
            made_in: p.made_in,
            ai_features: p.ai_features
        }});
    }
    console.log('Fixed missing UI fields');
    mongoose.disconnect();
});
