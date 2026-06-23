const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const Brand = mongoose.model('Brand', new mongoose.Schema({},{strict:false}));
    
    const brands = await Brand.find({name: {$in: ['Xiaomi', 'Redmi', 'POCO']}});
    const brandIds = brands.map(b => b._id);
    
    const phones = await Phone.find({brand_id: {$in: brandIds}}, {model: 1, phone_status: 1, brand_id: 1}).lean();
    console.log(JSON.stringify(phones.map(p => ({brandId: p.brand_id, model: p.model, status: p.phone_status})), null, 2));
    
    mongoose.disconnect();
});
