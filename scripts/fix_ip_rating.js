const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});
mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const phones = await Phone.find({slug: /^samsung-/i});
    let count = 0;
    for (const p of phones) {
        if (!p.get('ip_rating') && p.get('water_resistance')) {
            await Phone.updateOne({_id: p._id}, {$set: {ip_rating: p.get('water_resistance')}});
            count++;
        }
    }
    console.log('Fixed ip_rating for ' + count + ' phones');
    mongoose.disconnect();
});
