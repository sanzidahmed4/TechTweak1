const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});
mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    await Phone.updateOne({slug: 'samsung-galaxy-a80'}, {$set: {
        cam_front_resolution: 'Motorized pop-up rotating main camera',
        cam_front_video: '4K@30fps, 1080p@30/60fps',
        cam_flash: 'LED flash, panorama, HDR',
        has_gyroscope: true,
        has_compass: true,
        has_accelerometer: true,
        has_face_unlock: false,
        sensor_fingerprint: 'Under display, optical',
        gps_specs: 'GPS, GLONASS, GALILEO, BDS',
        usb_version: '2.0',
        charger_included: true,
        android_version: 'Android 9.0 (Pie), upgradable to Android 11'
    }});
    console.log('A80 updated');
    mongoose.disconnect();
});
