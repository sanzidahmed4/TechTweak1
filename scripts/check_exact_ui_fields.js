const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    
    // Check phones added today or specific ones
    const phones = await Phone.find({slug: /xiaomi|redmi|poco/}).limit(20);
    let totalEmpty = 0;
    
    for (const rawPhone of phones) {
        const uiFields = [
            { label: "Phone Weight", value: rawPhone.weight },
            { label: "Physical Dimensions", value: rawPhone.dimensions },
            { label: "Build Material", value: rawPhone.build_material },
            { label: "SIM Layout", value: rawPhone.sim_type },
            { label: "Water & Dust Rating", value: rawPhone.water_resistance || rawPhone.ip_rating },
            { label: "Manufactured In", value: rawPhone.made_in },
            { label: "Phone Variants", value: rawPhone.phone_variants },
            { label: "Display Architecture", value: rawPhone.display_type || rawPhone.display },
            { label: "Screen Estate", value: rawPhone.screen_size },
            { label: "Resolution Metric", value: rawPhone.resolution },
            { label: "Screen Refresh Rate", value: rawPhone.refresh_rate },
            { label: "Peak Brightness", value: rawPhone.brightness },
            { label: "HDR Protocol", value: rawPhone.hdr },
            { label: "Scratch Protection", value: rawPhone.protection },
            { label: "Pixel Density", value: rawPhone.pixel_density },
            { label: "System on Chip (SoC)", value: rawPhone.processor },
            { label: "Central Processing Unit (CPU)", value: rawPhone.cpu },
            { label: "Graphics Processing Unit (GPU)", value: rawPhone.gpu },
            { label: "Silicon Fabrication", value: rawPhone.fabrication },
            { label: "System Memory (RAM)", value: rawPhone.ram_variants || rawPhone.ram },
            { label: "Internal Storage", value: rawPhone.storage_variants || rawPhone.storage },
            { label: "Flash Storage Standard", value: rawPhone.storage_type },
            { label: "Geekbench Benchmark", value: rawPhone.geekbench_score },
            { label: "Vapor Cooling System", value: rawPhone.cooling_system },
            { label: "Total Cameras", value: rawPhone.cam_count },
            { label: "Main Sensor", value: rawPhone.cam_main_sensor || rawPhone.camera_main },
            { label: "Ultrawide Lens", value: rawPhone.cam_ultrawide },
            { label: "Telephoto Zoom", value: rawPhone.cam_telephoto },
            { label: "Macro Capture", value: rawPhone.cam_macro },
            { label: "Image Stabilization", value: rawPhone.cam_ois },
            { label: "Camera Flash", value: rawPhone.cam_flash },
            { label: "Video Recording", value: rawPhone.cam_video || rawPhone.camera_video },
            { label: "Front Resolution", value: rawPhone.cam_front_resolution || rawPhone.camera_front },
            { label: "Selfie HDR Mode", value: rawPhone.cam_front_hdr },
            { label: "Portrait Features", value: rawPhone.cam_front_portrait },
            { label: "Video Capabilities", value: rawPhone.cam_front_video },
            { label: "Cell Battery Capacity", value: rawPhone.battery_capacity || rawPhone.battery },
            { label: "Wired Charging Speed", value: rawPhone.charging_wired || rawPhone.charging },
            { label: "Wireless Charging", value: rawPhone.charging_wireless },
            { label: "Reverse Wireless", value: rawPhone.charging_reverse },
            { label: "Port Type & USB Version", value: rawPhone.usb_type },
            { label: "Wireless LAN (WiFi)", value: rawPhone.wifi_version },
            { label: "Bluetooth Protocol", value: rawPhone.bluetooth_version },
            { label: "Satelite Navigation (GPS)", value: rawPhone.gps_specs },
            { label: "USB Protocol Version", value: rawPhone.usb_version },
            { label: "Fingerprint Scanner", value: rawPhone.sensor_fingerprint },
            { label: "Operating System (OS)", value: rawPhone.android_version || rawPhone.os },
            { label: "Long Term Update Promise", value: rawPhone.update_policy }
        ];

        let missing = [];
        uiFields.forEach(f => {
            if (!f.value || f.value.toString().trim() === "") {
                missing.push(f.label);
            }
        });
        
        if (missing.length > 0) {
            console.log(`Phone: ${rawPhone.name}`);
            console.log(`Missing fields: ${missing.join(', ')}`);
            totalEmpty += missing.length;
        }
    }
    
    console.log(`Total empty UI fields found in sample: ${totalEmpty}`);
    mongoose.disconnect();
});
