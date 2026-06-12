const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});
mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const phones = await Phone.find({slug: /^samsung-/i});
    
    let totalEmpty = 0;
    for (const rawPhone of phones) {
        const fields = [
            rawPhone.weight, rawPhone.dimensions, rawPhone.build_material, rawPhone.water_resistance, rawPhone.sim_type, rawPhone.made_in, rawPhone.phone_variants,
            rawPhone.display_type || rawPhone.display, rawPhone.screen_size, rawPhone.resolution, rawPhone.refresh_rate, rawPhone.brightness, rawPhone.hdr, rawPhone.protection, rawPhone.pixel_density,
            rawPhone.processor, rawPhone.cpu, rawPhone.gpu, rawPhone.fabrication, rawPhone.ram_variants || rawPhone.ram, rawPhone.storage_variants || rawPhone.storage, rawPhone.storage_type, rawPhone.geekbench_score, rawPhone.cooling_system,
            rawPhone.cam_count, rawPhone.cam_main_sensor || rawPhone.camera_main, rawPhone.cam_ultrawide, rawPhone.cam_telephoto, rawPhone.cam_macro, rawPhone.cam_ois, rawPhone.cam_flash, rawPhone.cam_video || rawPhone.camera_video,
            rawPhone.cam_front_resolution || rawPhone.camera_front, rawPhone.cam_front_hdr, rawPhone.cam_front_portrait, rawPhone.cam_front_video,
            rawPhone.battery_capacity || rawPhone.battery, rawPhone.charging_wired || rawPhone.charging, rawPhone.charging_wireless, rawPhone.charging_reverse, 
            rawPhone.usb_type, rawPhone.wifi_version, rawPhone.bluetooth_version, rawPhone.gps_specs, rawPhone.usb_version, rawPhone.sensor_fingerprint,
            rawPhone.android_version || rawPhone.os, rawPhone.update_policy, rawPhone.ai_features?.join(", ")
        ];

        let missingCount = 0;
        fields.forEach((val, i) => {
            if (!val || val.trim() === "") missingCount++;
        });

        if (missingCount > 0) {
            console.log(`❌ ${rawPhone.slug} has ${missingCount} empty UI fields.`);
            totalEmpty += missingCount;
        }
    }
    console.log(`Total missing fields across UI rendering: ${totalEmpty}`);
    mongoose.disconnect();
});
