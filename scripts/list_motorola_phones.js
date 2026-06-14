const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const Brand = mongoose.model('Brand', new mongoose.Schema({},{strict:false}));
    
    const motoBrand = await Brand.findOne({ slug: 'motorola' });
    if (!motoBrand) {
        console.log("Motorola brand not found");
        return mongoose.disconnect();
    }
    
    const phones = await Phone.find({ brand_id: motoBrand._id }).select('name slug -_id').sort({ name: 1 });
    console.log(`Found ${phones.length} Motorola phones:`);
    const slugs = phones.map(p => p.slug);
    console.log(JSON.stringify(slugs));
    
    mongoose.disconnect();
});
