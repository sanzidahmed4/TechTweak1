const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const Brand = mongoose.model('Brand', new mongoose.Schema({},{strict:false}));
    
    // Get all brands
    const brands = await Brand.find({ slug: { $nin: ['samsung', 'motorola', 'poco', 'xiaomi', 'redmi'] } });
    
    for (const b of brands) {
        const phones = await Phone.find({ brand_id: b._id }).select('slug -_id');
        if (phones.length > 0) {
            console.log(`\n--- ${b.name} (${phones.length} phones) ---`);
            console.log(JSON.stringify(phones.map(p => p.slug)));
        }
    }
    
    mongoose.disconnect();
});
