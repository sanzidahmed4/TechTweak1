const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const count = await Phone.countDocuments();
    console.log(`Total phones in database: ${count}`);
    mongoose.disconnect();
});
