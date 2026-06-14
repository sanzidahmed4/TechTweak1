const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const Brand = mongoose.model('Brand', new mongoose.Schema({},{strict:false}));
    
    // Get one sample Samsung phone to see full structure
    const brand = await Brand.findOne({name: 'Samsung'});
    const phone = await Phone.findOne({brand_id: brand._id}).lean();
    console.log(JSON.stringify(phone, null, 2));
    
    // Get Brand IDs for Xiaomi, Redmi, POCO
    const xBrands = await Brand.find({name: {$in: ['Xiaomi', 'Redmi', 'POCO']}});
    console.log("\n--- Brand IDs ---");
    xBrands.forEach(b => console.log(`${b.name}: ${b._id}`));
    
    // Get existing slugs
    const bIds = xBrands.map(b => b._id);
    const existing = await Phone.find({brand_id: {$in: bIds}}, {slug: 1, name: 1}).lean();
    console.log("\n--- Existing Xiaomi/Redmi/POCO slugs ---");
    existing.forEach(p => console.log(p.slug));
    
    mongoose.disconnect();
});
