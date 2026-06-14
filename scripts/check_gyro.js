const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    
    const p = await Phone.findOne({ slug: /xiaomi-14$/ });
    if(p) {
        console.log("Found Xiaomi 14!");
        console.log("Sensors mapped:", p.sensors);
        console.log("Gyro field:", p.sensor_gyro);
        console.log("Gyroscope field:", p.sensor_gyroscope);
        console.log("All keys with gyro:", Object.keys(p.toObject()).filter(k => k.toLowerCase().includes('gyro')));
    } else {
        console.log("Xiaomi 14 not found.");
    }
    
    mongoose.disconnect();
});
