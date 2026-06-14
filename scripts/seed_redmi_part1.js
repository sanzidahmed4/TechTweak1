const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

const phones = [
  // 2025/2026
  {
    name: "Redmi Note 15 Pro+ 5G", slug: "redmi-note-15-pro-plus-5g", phone_status: "upcoming", upcoming: true, launch_year: 2025, price_usd: 350,
    weight: "205 g", dimensions: "161.4 x 74.2 x 8.9 mm", build_material: "Glass front, glass or vegan leather back", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM", phone_variants: "12GB/256GB, 16GB/512GB", colors: ["Black", "White", "Purple"],
    display_type: "AMOLED, 68B colors, 120Hz, Dolby Vision, HDR10+", screen_size: "6.67 inches", resolution: "1220 x 2712 pixels", refresh_rate: "120Hz", brightness: "2000 nits (peak)", hdr: "HDR10+", protection: "Corning Gorilla Glass Victus", pixel_density: "446 ppi",
    processor: "MediaTek Dimensity 9300", cpu: "Octa-core", gpu: "Immortalis-G720 MC12", fabrication: "4 nm", ram_variants: "12GB, 16GB", storage_variants: "256GB, 512GB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 2000, Multi-Core: 6800", cooling_system: "VC Cooling System",
    cam_count: "Triple", cam_main_sensor: "200 MP, f/1.65, OIS", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "Yes", cam_flash: "Dual-LED dual-tone flash", cam_video: "4K@30/60fps",
    cam_front_resolution: "16 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@60fps",
    battery_capacity: "5100 mAh", charging_wired: "120W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 7", bluetooth_version: "5.4", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 15", ui_version: "HyperOS", update_policy: "3 Years OS Updates", ai_features: ["AI Magic Eraser"],
    chipset_highlight: "Dimensity 9300", camera_highlight: "200MP OIS", display_highlight: "1.5K AMOLED", battery_highlight: "5100mAh, 120W",
    meta_title: "Redmi Note 15 Pro+ 5G Specs", meta_description: "Redmi Note 15 Pro+ 5G specifications."
  },
  {
    name: "Redmi K80 Pro", slug: "redmi-k80-pro", phone_status: "upcoming", upcoming: true, launch_year: 2025, price_usd: 550,
    weight: "215 g", dimensions: "160.9 x 75 x 8.2 mm", build_material: "Glass front, aluminum frame, glass back", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM", phone_variants: "12GB/256GB, 16GB/512GB, 24GB/1TB", colors: ["Black", "White", "Silver"],
    display_type: "OLED, 68B colors, 120Hz", screen_size: "6.67 inches", resolution: "1440 x 3200 pixels", refresh_rate: "120Hz", brightness: "4000 nits (peak)", hdr: "HDR10+", protection: "Xiaomi Shield Glass", pixel_density: "526 ppi",
    processor: "Qualcomm Snapdragon 8 Elite", cpu: "Octa-core", gpu: "Adreno 830", fabrication: "3 nm", ram_variants: "12GB, 16GB, 24GB", storage_variants: "256GB, 512GB, 1TB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 2900, Multi-Core: 9500", cooling_system: "Advanced VC Cooling",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.6, OIS", cam_ultrawide: "50 MP, f/2.2", cam_telephoto: "50 MP, f/2.0 (3x optical)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "LED flash", cam_video: "8K@24fps",
    cam_front_resolution: "20 MP, f/2.2", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@60fps",
    battery_capacity: "6000 mAh", charging_wired: "120W wired", charging_wireless: "50W wireless", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 7", bluetooth_version: "5.4", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 15", ui_version: "HyperOS", update_policy: "3 Years OS Updates", ai_features: ["AI Gaming Boost"],
    chipset_highlight: "Snapdragon 8 Elite", camera_highlight: "50MP Triple Cam", display_highlight: "2K OLED 120Hz", battery_highlight: "6000mAh, 120W",
    meta_title: "Redmi K80 Pro Specifications", meta_description: "Redmi K80 Pro specs."
  },
  
  // 2024
  {
    name: "Redmi Note 14 Pro 5G", slug: "redmi-note-14-pro-5g", phone_status: "released", upcoming: false, launch_year: 2024, price_usd: 280,
    weight: "187 g", dimensions: "161.2 x 74.3 x 8.0 mm", build_material: "Glass front (Gorilla Glass Victus), glass back", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM", phone_variants: "8GB/128GB, 8GB/256GB, 12GB/512GB", colors: ["Midnight Dark", "Mirror Porcelain White", "Phantom Blue"],
    display_type: "AMOLED, 68B colors, 120Hz, Dolby Vision", screen_size: "6.67 inches", resolution: "1220 x 2712 pixels", refresh_rate: "120Hz", brightness: "1800 nits (peak)", hdr: "HDR10+", protection: "Corning Gorilla Glass Victus", pixel_density: "446 ppi",
    processor: "Qualcomm Snapdragon 7s Gen 2", cpu: "Octa-core", gpu: "Adreno 710", fabrication: "4 nm", ram_variants: "8GB, 12GB", storage_variants: "128GB, 256GB, 512GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 1000, Multi-Core: 2900", cooling_system: "Graphite",
    cam_count: "Triple", cam_main_sensor: "200 MP, f/1.7, OIS", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "Yes", cam_flash: "LED flash", cam_video: "4K@30fps",
    cam_front_resolution: "16 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@60fps",
    battery_capacity: "5500 mAh", charging_wired: "45W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6", bluetooth_version: "5.2", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 14", ui_version: "HyperOS", update_policy: "3 Years OS Updates", ai_features: [],
    chipset_highlight: "Snapdragon 7s Gen 2", camera_highlight: "200MP OIS", display_highlight: "1.5K AMOLED 120Hz", battery_highlight: "5500mAh, 45W",
    meta_title: "Redmi Note 14 Pro 5G Specs", meta_description: "Redmi Note 14 Pro 5G specs."
  },
  {
    name: "Redmi K70 Ultra", slug: "redmi-k70-ultra", phone_status: "released", upcoming: false, launch_year: 2024, price_usd: 360,
    weight: "211 g", dimensions: "160.4 x 75.1 x 8.4 mm", build_material: "Glass front, aluminum frame, glass back", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM", phone_variants: "12GB/256GB, 16GB/512GB, 24GB/1TB", colors: ["Black", "White", "Purple"],
    display_type: "OLED, 68B colors, 144Hz", screen_size: "6.67 inches", resolution: "1220 x 2712 pixels", refresh_rate: "144Hz", brightness: "4000 nits (peak)", hdr: "HDR10+", protection: "Xiaomi Shield Glass", pixel_density: "446 ppi",
    processor: "MediaTek Dimensity 9300+", cpu: "Octa-core", gpu: "Immortalis-G720 MC12", fabrication: "4 nm", ram_variants: "12GB, 16GB, 24GB", storage_variants: "256GB, 512GB, 1TB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 2200", cooling_system: "3D Ice Cooling",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.7, OIS", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "Yes", cam_flash: "Dual-LED flash", cam_video: "8K@24/30fps, 4K@60fps",
    cam_front_resolution: "20 MP, f/2.0", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5500 mAh", charging_wired: "120W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 7", bluetooth_version: "5.4", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 14", ui_version: "HyperOS", update_policy: "3 Years OS Updates", ai_features: [],
    chipset_highlight: "Dimensity 9300+", camera_highlight: "50MP OIS", display_highlight: "144Hz 1.5K OLED", battery_highlight: "5500mAh, 120W",
    meta_title: "Redmi K70 Ultra Specs", meta_description: "Redmi K70 Ultra specs."
  },
  {
    name: "Redmi K70 Pro", slug: "redmi-k70-pro", phone_status: "released", upcoming: false, launch_year: 2023, price_usd: 465,
    weight: "209 g", dimensions: "160.9 x 75.0 x 8.2 mm", build_material: "Glass front, aluminum frame, glass back", water_resistance: "N/A", ip_rating: "N/A", sim_type: "Dual SIM", phone_variants: "12GB/256GB, 16GB/512GB", colors: ["Black", "Silver", "Blue"],
    display_type: "OLED, 68B colors, 120Hz", screen_size: "6.67 inches", resolution: "1440 x 3200 pixels", refresh_rate: "120Hz", brightness: "4000 nits (peak)", hdr: "HDR10+", protection: "Corning Gorilla Glass", pixel_density: "526 ppi",
    processor: "Qualcomm Snapdragon 8 Gen 3", cpu: "Octa-core", gpu: "Adreno 750", fabrication: "4 nm", ram_variants: "12GB, 16GB", storage_variants: "256GB, 512GB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 2200", cooling_system: "VC Cooling",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.6, OIS", cam_ultrawide: "12 MP, f/2.2", cam_telephoto: "50 MP, f/2.0 (2x optical)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "LED flash", cam_video: "8K@24fps, 4K@60fps",
    cam_front_resolution: "16 MP", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@60fps",
    battery_capacity: "5000 mAh", charging_wired: "120W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 7", bluetooth_version: "5.4", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 14", ui_version: "HyperOS", update_policy: "3 Years OS Updates", ai_features: [],
    chipset_highlight: "Snapdragon 8 Gen 3", camera_highlight: "50MP Triple", display_highlight: "2K OLED 120Hz", battery_highlight: "5000mAh, 120W",
    meta_title: "Redmi K70 Pro Specs", meta_description: "Redmi K70 Pro specs."
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
    
    console.log(`Successfully injected ${count} Redmi Part 1 phones!`);
    mongoose.disconnect();
});
