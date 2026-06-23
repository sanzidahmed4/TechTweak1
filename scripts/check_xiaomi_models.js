const mongoose=require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone=mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const Brand=mongoose.model('Brand', new mongoose.Schema({},{strict:false}));
    
    const brands=await Brand.find({name: {$in: ['Xiaomi', 'Redmi', 'POCO']}});
    const bIds=brands.map(b=>b._id);
    
    const phones=await Phone.find({brand_id: {$in: bIds}}, {slug: 1}).lean();
    console.log(JSON.stringify(phones.map(p=>p.slug)));
    
    mongoose.disconnect();
});
