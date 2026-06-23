const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const Brand = mongoose.model('Brand', new mongoose.Schema({},{strict:false}));
    
    const samsungBrand = await Brand.findOne({ slug: 'samsung' });
    if (!samsungBrand) {
        console.log("Samsung brand not found");
        return mongoose.disconnect();
    }
    
    const phones = await Phone.find({ brand_id: samsungBrand._id }).select('name slug -_id').sort({ name: 1 });
    console.log(`Found ${phones.length} Samsung phones:`);
    const slugs = phones.map(p => p.slug);
    console.log(JSON.stringify(slugs));
    
    mongoose.disconnect();
});
