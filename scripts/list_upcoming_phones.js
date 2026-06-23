const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    
    // Check for phones marked as upcoming/rumored or with future launch years
    const phones = await Phone.find({
        $or: [
            { launch_status: { $regex: /Upcoming|Rumored|Coming soon|Expected/i } },
            { launch_date: { $regex: /2025|2026/i } },
            { release_date: { $regex: /2025|2026/i } }
        ]
    }).select('name slug brand_id launch_status launch_date release_date -_id');
    
    console.log(`Found ${phones.length} upcoming/future phones:`);
    phones.forEach(p => console.log(`- ${p.name} (Slug: ${p.slug}, Status: ${p.launch_status || p.launch_date || p.release_date})`));
    
    mongoose.disconnect();
});
