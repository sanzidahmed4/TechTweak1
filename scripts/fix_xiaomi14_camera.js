const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    
    await Phone.updateOne(
        { slug: 'xiaomi-14' },
        { $set: { camera_front: '32 MP, f/2.0' } }
    );
    
    console.log(`Successfully updated Xiaomi 14 front camera to 32 MP, f/2.0`);
    mongoose.disconnect();
});
