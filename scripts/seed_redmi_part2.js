const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

const phones = [
  // 2023
  {
    name: "Redmi Note 13 Pro 4G", slug: "redmi-note-13-pro-4g", phone_status: "released", upcoming: false, launch_year: 2023, price_usd: 250,
    weight: "188 g", dimensions: "161.1 x 75 x 8 mm", build_material: "Glass front (Gorilla Glass 5), plastic frame, plastic back", water_resistance: "IP54, dust and splash resistant", ip_rating: "IP54", sim_type: "Dual SIM", phone_variants: "8GB/256GB, 12GB/512GB", colors: ["Midnight Black", "Lavender Purple", "Forest Green"],
    display_type: "AMOLED, 1B colors, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1300 nits (peak)", hdr: "N/A", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "Mediatek Helio G99 Ultra", cpu: "Octa-core", gpu: "Mali-G57 MC2", fabrication: "6 nm", ram_variants: "8GB, 12GB", storage_variants: "256GB, 512GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 730", cooling_system: "Graphite",
    cam_count: "Triple", cam_main_sensor: "200 MP, f/1.7, OIS", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "Yes", cam_flash: "LED flash", cam_video: "1080p@30/60fps",
    cam_front_resolution: "16 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30/60fps",
    battery_capacity: "5000 mAh", charging_wired: "67W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.2", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: false, network: "4G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 13", ui_version: "MIUI 14", update_policy: "2 Years OS Updates", ai_features: [],
    chipset_highlight: "Helio G99 Ultra", camera_highlight: "200MP OIS", display_highlight: "120Hz AMOLED", battery_highlight: "5000mAh, 67W",
    meta_title: "Redmi Note 13 Pro 4G Specs", meta_description: "Redmi Note 13 Pro 4G specs."
  },
  {
    name: "Redmi K60 Ultra", slug: "redmi-k60-ultra", phone_status: "released", upcoming: false, launch_year: 2023, price_usd: 360,
    weight: "204 g", dimensions: "162.2 x 75.7 x 8.5 mm", build_material: "Glass front, plastic frame, glass back", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM", phone_variants: "12GB/256GB, 16GB/512GB, 24GB/1TB", colors: ["Black", "White", "Green"],
    display_type: "OLED, 68B colors, 144Hz", screen_size: "6.67 inches", resolution: "1220 x 2712 pixels", refresh_rate: "144Hz", brightness: "2600 nits (peak)", hdr: "HDR10+", protection: "Corning Gorilla Glass", pixel_density: "446 ppi",
    processor: "MediaTek Dimensity 9200+", cpu: "Octa-core", gpu: "Immortalis-G715 MC11", fabrication: "4 nm", ram_variants: "12GB, 16GB, 24GB", storage_variants: "256GB, 512GB, 1TB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 2100", cooling_system: "LiquidCool",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.7, OIS", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "Yes", cam_flash: "Dual-LED flash", cam_video: "8K@24fps, 4K@30/60fps",
    cam_front_resolution: "20 MP", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30/120fps",
    battery_capacity: "5000 mAh", charging_wired: "120W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6e", bluetooth_version: "5.4", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 13", ui_version: "MIUI 14", update_policy: "3 Years OS Updates", ai_features: [],
    chipset_highlight: "Dimensity 9200+", camera_highlight: "50MP OIS", display_highlight: "144Hz 1.5K OLED", battery_highlight: "5000mAh, 120W",
    meta_title: "Redmi K60 Ultra Specs", meta_description: "Redmi K60 Ultra specs."
  },
  
  // 2022
  {
    name: "Redmi Note 12 Pro+ 5G", slug: "redmi-note-12-pro-plus-5g", phone_status: "released", upcoming: false, launch_year: 2022, price_usd: 350,
    weight: "208.4 g", dimensions: "162.9 x 76 x 8.9 mm", build_material: "Glass front, glass back, aluminum frame", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Dual SIM", phone_variants: "8GB/256GB, 12GB/256GB", colors: ["Arctic White", "Iceberg Blue", "Obsidian Black"],
    display_type: "OLED, 1B colors, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "900 nits", hdr: "HDR10+", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "MediaTek Dimensity 1080", cpu: "Octa-core", gpu: "Mali-G68 MC4", fabrication: "6 nm", ram_variants: "8GB, 12GB", storage_variants: "256GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 760", cooling_system: "VC Cooling",
    cam_count: "Triple", cam_main_sensor: "200 MP, f/1.7, OIS", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "Yes", cam_flash: "Dual-LED flash", cam_video: "4K@30fps",
    cam_front_resolution: "16 MP", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@60fps",
    battery_capacity: "5000 mAh", charging_wired: "120W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6", bluetooth_version: "5.2", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 12", ui_version: "MIUI 13", update_policy: "2 Years OS Updates", ai_features: [],
    chipset_highlight: "Dimensity 1080", camera_highlight: "200MP OIS", display_highlight: "120Hz OLED", battery_highlight: "5000mAh, 120W",
    meta_title: "Redmi Note 12 Pro+ 5G Specs", meta_description: "Redmi Note 12 Pro+ 5G specs."
  },
  
  // 2021
  {
    name: "Redmi Note 11 Pro+ 5G", slug: "redmi-note-11-pro-plus-5g", phone_status: "released", upcoming: false, launch_year: 2021, price_usd: 300,
    weight: "204 g", dimensions: "163.7 x 76.2 x 8.3 mm", build_material: "Glass front, glass back, plastic frame", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Dual SIM", phone_variants: "6GB/128GB, 8GB/128GB, 8GB/256GB", colors: ["Mysterious Black", "Forest Green", "Timeless Purple"],
    display_type: "Super AMOLED, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1200 nits (peak)", hdr: "HDR10", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "MediaTek Dimensity 920", cpu: "Octa-core", gpu: "Mali-G68 MC4", fabrication: "6 nm", ram_variants: "6GB, 8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 730", cooling_system: "LiquidCool 2.0",
    cam_count: "Triple", cam_main_sensor: "108 MP, f/1.9", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "LED flash", cam_video: "4K@30fps",
    cam_front_resolution: "16 MP", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@60fps",
    battery_capacity: "4500 mAh", charging_wired: "120W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6", bluetooth_version: "5.2", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 11", ui_version: "MIUI 12.5", update_policy: "1 to 2 Years OS Updates", ai_features: [],
    chipset_highlight: "Dimensity 920", camera_highlight: "108MP Pro-grade", display_highlight: "120Hz AMOLED", battery_highlight: "4500mAh, 120W HyperCharge",
    meta_title: "Redmi Note 11 Pro+ 5G Specs", meta_description: "Redmi Note 11 Pro+ 5G specs."
  },
  
  // 2020
  {
    name: "Redmi Note 9 Pro", slug: "redmi-note-9-pro", phone_status: "released", upcoming: false, launch_year: 2020, price_usd: 200,
    weight: "209 g", dimensions: "165.8 x 76.7 x 8.8 mm", build_material: "Glass front (Gorilla Glass 5), glass back (Gorilla Glass 5), plastic frame", water_resistance: "Water-repellent coating", ip_rating: "N/A", sim_type: "Dual SIM", phone_variants: "6GB/64GB, 6GB/128GB", colors: ["Tropical Green", "Glacier White", "Interstellar Gray"],
    display_type: "IPS LCD", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "60Hz", brightness: "450 nits", hdr: "N/A", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 720G", cpu: "Octa-core", gpu: "Adreno 618", fabrication: "8 nm", ram_variants: "6GB", storage_variants: "64GB, 128GB", storage_type: "UFS 2.1", geekbench_score: "Single-Core: 560", cooling_system: "Graphite",
    cam_count: "Quad", cam_main_sensor: "64 MP, f/1.9", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "5 MP, f/2.4", cam_ois: "No", cam_flash: "LED flash", cam_video: "4K@30fps",
    cam_front_resolution: "16 MP", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5020 mAh", charging_wired: "30W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.0", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: false, network: "4G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 10", ui_version: "MIUI 11", update_policy: "1 Year OS Update", ai_features: [],
    chipset_highlight: "Snapdragon 720G", camera_highlight: "64MP Quad Cam", display_highlight: "6.67\" FHD+ DotDisplay", battery_highlight: "5020mAh, 30W Fast Charge",
    meta_title: "Redmi Note 9 Pro Specs", meta_description: "Redmi Note 9 Pro specs."
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
    
    console.log(`Successfully injected ${count} Redmi Part 2 phones!`);
    mongoose.disconnect();
});
