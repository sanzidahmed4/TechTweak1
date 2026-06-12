const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});
mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    
    const upcoming = await Phone.find({phone_status: 'upcoming'});
    let count = 0;
    
    for (const p of upcoming) {
        await Phone.updateOne({_id: p._id}, {$set: {phone_status: 'released'}});
        count++;
    }
    
    console.log('Fixed phone_status to released for ' + count + ' phones.');
    mongoose.disconnect();
});
