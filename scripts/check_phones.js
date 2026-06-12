const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});
mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const p = await Phone.find({slug: {$in: ['samsung-galaxy-note-10-lite', 'samsung-galaxy-c9-pro', 'samsung-galaxy-s4', 'samsung-galaxy-a80']}});
    console.log(JSON.stringify(p, null, 2));
    mongoose.disconnect();
});
