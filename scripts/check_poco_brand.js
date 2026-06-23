const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const Brand = mongoose.model('Brand', new mongoose.Schema({},{strict:false}));
    
    const pocoBrand = await Brand.findOne({ slug: 'poco' });
    const xiaomiBrand = await Brand.findOne({ slug: 'xiaomi' });
    
    if (pocoBrand) {
        const pocoCount = await Phone.countDocuments({ brand_id: pocoBrand._id });
        console.log(`Phones under POCO brand: ${pocoCount}`);
        
        const samplePoco = await Phone.findOne({ brand_id: pocoBrand._id }).select('name');
        if (samplePoco) console.log("Sample: " + samplePoco.name);
    } else {
        console.log("POCO brand not found.");
    }

    if (xiaomiBrand) {
        const xiaomiCount = await Phone.countDocuments({ brand_id: xiaomiBrand._id, slug: { $regex: /poco/i } });
        console.log(`POCO Phones under Xiaomi brand: ${xiaomiCount}`);
    }

    mongoose.disconnect();
});
