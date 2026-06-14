const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

const phones = [
  // 2022
  {
    name: "Xiaomi 12S Ultra", slug: "xiaomi-12s-ultra", phone_status: "released", upcoming: false, launch_year: 2022, price_usd: 899,
    weight: "225 g", dimensions: "163.2 x 75.0 x 9.1 mm", build_material: "Glass front (Gorilla Glass Victus), eco leather back, aluminum frame", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM", phone_variants: "8GB/256GB, 12GB/256GB, 12GB/512GB", colors: ["Classic Black", "Verdant Green"],
    display_type: "LTPO2 AMOLED, 1B colors, 120Hz", screen_size: "6.73 inches", resolution: "1440 x 3200 pixels", refresh_rate: "120Hz", brightness: "1500 nits (peak)", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass Victus", pixel_density: "522 ppi",
    processor: "Qualcomm Snapdragon 8+ Gen 1", cpu: "Octa-core", gpu: "Adreno 730", fabrication: "4 nm", ram_variants: "8GB, 12GB", storage_variants: "256GB, 512GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 1300, Multi-Core: 4200", cooling_system: "3D Liquid Cooling",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.9, 1-inch type, OIS", cam_ultrawide: "48 MP, f/2.2", cam_telephoto: "48 MP, f/4.1 (periscope 5x optical)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "Leica lenses", cam_video: "8K@24fps, 4K@30/60fps",
    cam_front_resolution: "32 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30/60fps",
    battery_capacity: "4860 mAh", charging_wired: "67W wired", charging_wireless: "50W wireless", charging_reverse: "10W reverse wireless", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6e", bluetooth_version: "5.2", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 12", ui_version: "MIUI 13", update_policy: "2 Years OS Updates", ai_features: [],
    chipset_highlight: "Snapdragon 8+ Gen 1", camera_highlight: "1-inch 50MP Leica", display_highlight: "2K LTPO2 AMOLED", battery_highlight: "4860mAh, 67W",
    meta_title: "Xiaomi 12S Ultra Specs", meta_description: "Xiaomi 12S Ultra specs."
  },
  {
    name: "Xiaomi 12 Pro", slug: "xiaomi-12-pro", phone_status: "released", upcoming: false, launch_year: 2021, price_usd: 999,
    weight: "204 g", dimensions: "163.6 x 74.6 x 8.2 mm", build_material: "Glass front, glass back, aluminum frame", water_resistance: "N/A", ip_rating: "N/A", sim_type: "Dual SIM", phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB", colors: ["Gray", "Blue", "Purple", "Green"],
    display_type: "LTPO AMOLED, 1B colors, 120Hz", screen_size: "6.73 inches", resolution: "1440 x 3200 pixels", refresh_rate: "120Hz", brightness: "1500 nits (peak)", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass Victus", pixel_density: "521 ppi",
    processor: "Qualcomm Snapdragon 8 Gen 1", cpu: "Octa-core", gpu: "Adreno 730", fabrication: "4 nm", ram_variants: "8GB, 12GB", storage_variants: "128GB, 256GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 1200", cooling_system: "VC Cooling",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.9, OIS", cam_ultrawide: "50 MP, f/2.2", cam_telephoto: "50 MP, f/1.9 (2x optical)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "LED flash", cam_video: "8K@24fps, 4K@60fps",
    cam_front_resolution: "32 MP", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@60fps",
    battery_capacity: "4600 mAh", charging_wired: "120W wired", charging_wireless: "50W wireless", charging_reverse: "10W reverse wireless", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6/6e", bluetooth_version: "5.2", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 12", ui_version: "MIUI 13", update_policy: "2 Years OS Updates", ai_features: [],
    chipset_highlight: "Snapdragon 8 Gen 1", camera_highlight: "Triple 50MP Cameras", display_highlight: "2K LTPO AMOLED", battery_highlight: "4600mAh, 120W HyperCharge",
    meta_title: "Xiaomi 12 Pro Specs", meta_description: "Xiaomi 12 Pro specs."
  },
  
  // 2021
  {
    name: "Xiaomi Mi 11 Ultra", slug: "xiaomi-mi-11-ultra", phone_status: "released", upcoming: false, launch_year: 2021, price_usd: 1199,
    weight: "234 g", dimensions: "164.3 x 74.6 x 8.4 mm", build_material: "Glass front (Gorilla Glass Victus), ceramic back, aluminum frame", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM", phone_variants: "8GB/256GB, 12GB/256GB, 12GB/512GB", colors: ["Ceramic White", "Ceramic Black"],
    display_type: "AMOLED, 1B colors, 120Hz", screen_size: "6.81 inches", resolution: "1440 x 3200 pixels", refresh_rate: "120Hz", brightness: "1700 nits (peak)", hdr: "HDR10+", protection: "Corning Gorilla Glass Victus", pixel_density: "515 ppi",
    processor: "Qualcomm Snapdragon 888 5G", cpu: "Octa-core", gpu: "Adreno 660", fabrication: "5 nm", ram_variants: "8GB, 12GB", storage_variants: "256GB, 512GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 1100", cooling_system: "LiquidCool Technology",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/2.0, 1/1.12\", OIS", cam_ultrawide: "48 MP, f/2.2", cam_telephoto: "48 MP, f/4.1 (5x optical periscope)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "Dual-LED flash", cam_video: "8K@24fps, 4K@60fps",
    cam_front_resolution: "20 MP", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@60fps",
    battery_capacity: "5000 mAh", charging_wired: "67W wired", charging_wireless: "67W wireless", charging_reverse: "10W reverse wireless", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6e", bluetooth_version: "5.2", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 11", ui_version: "MIUI 12.5", update_policy: "2 Years OS Updates", ai_features: [],
    chipset_highlight: "Snapdragon 888", camera_highlight: "50MP 1/1.12\" Sensor", display_highlight: "6.81\" WQHD+ AMOLED", battery_highlight: "5000mAh, 67W Wired/Wireless",
    meta_title: "Xiaomi Mi 11 Ultra Specs", meta_description: "Xiaomi Mi 11 Ultra specs."
  },
  
  // 2020
  {
    name: "Xiaomi Mi 10 Ultra", slug: "xiaomi-mi-10-ultra", phone_status: "released", upcoming: false, launch_year: 2020, price_usd: 850,
    weight: "221.8 g", dimensions: "162.4 x 75.1 x 9.5 mm", build_material: "Glass front, glass back, aluminum frame", water_resistance: "N/A", ip_rating: "N/A", sim_type: "Dual SIM", phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB, 16GB/512GB", colors: ["Obsidian Black", "Mercury Silver", "Transparent Edition"],
    display_type: "OLED, 1B colors, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2340 pixels", refresh_rate: "120Hz", brightness: "800 nits", hdr: "HDR10+", protection: "Corning Gorilla Glass 5", pixel_density: "386 ppi",
    processor: "Qualcomm Snapdragon 865 5G", cpu: "Octa-core", gpu: "Adreno 650", fabrication: "7 nm", ram_variants: "8GB, 12GB, 16GB", storage_variants: "128GB, 256GB, 512GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 900", cooling_system: "LiquidCool 2.0",
    cam_count: "Quad", cam_main_sensor: "48 MP, f/1.9, OIS", cam_ultrawide: "20 MP, f/2.2", cam_telephoto: "48 MP, f/4.1 (5x optical periscope), 12 MP (2x optical)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "Dual-LED flash", cam_video: "8K@24fps, 4K@60fps",
    cam_front_resolution: "20 MP", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "4500 mAh", charging_wired: "120W wired", charging_wireless: "50W wireless", charging_reverse: "10W reverse wireless", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6", bluetooth_version: "5.1", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 10", ui_version: "MIUI 12", update_policy: "1 to 2 Years OS Updates", ai_features: [],
    chipset_highlight: "Snapdragon 865", camera_highlight: "48MP Quad Cam", display_highlight: "120Hz OLED", battery_highlight: "4500mAh, 120W",
    meta_title: "Xiaomi Mi 10 Ultra Specs", meta_description: "Xiaomi Mi 10 Ultra specs."
  }
];

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const Brand = mongoose.model('Brand', new mongoose.Schema({},{strict:false}));
    const b = await Brand.findOne({name: 'Xiaomi'});

    let count = 0;
    for (const p of phones) {
        p.brand_id = b._id;
        p.is_published = true;
        p.is_featured = false;
        await Phone.updateOne({slug: p.slug}, {$set: p}, {upsert: true});
        count++;
    }
    
    console.log(`Successfully injected ${count} Xiaomi Part 2 phones!`);
    mongoose.disconnect();
});
