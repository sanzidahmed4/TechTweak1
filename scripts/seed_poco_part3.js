const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

const phones = [
  // Remaining POCO Phones
  {
    name: "POCO X5 5G", slug: "poco-x5-5g", phone_status: "released", upcoming: false, launch_year: 2023, price_usd: 250,
    weight: "189 g", dimensions: "165.9 x 76.2 x 8 mm", build_material: "Glass front (Gorilla Glass 3), plastic back, plastic frame", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Hybrid Dual SIM", phone_variants: "6GB/128GB, 8GB/256GB", colors: ["Green", "Blue", "Black"],
    display_type: "AMOLED, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1200 nits (peak)", hdr: "N/A", protection: "Corning Gorilla Glass 3", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 695 5G", cpu: "Octa-core", gpu: "Adreno 619", fabrication: "6 nm", ram_variants: "6GB, 8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 680, Multi-Core: 2000", cooling_system: "Graphite",
    cam_count: "Triple", cam_main_sensor: "48 MP, f/1.8", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "Dual-LED dual-tone flash", cam_video: "1080p@30fps",
    cam_front_resolution: "13 MP, f/2.5", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.1", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 12", ui_version: "MIUI 13 for POCO", update_policy: "2 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Snapdragon 695", camera_highlight: "48MP Triple Cam", display_highlight: "120Hz AMOLED", battery_highlight: "5000mAh, 33W"
  },
  {
    name: "POCO F4", slug: "poco-f4", phone_status: "released", upcoming: false, launch_year: 2022, price_usd: 350,
    weight: "195 g", dimensions: "163.2 x 76 x 7.7 mm", build_material: "Glass front (Gorilla Glass 5), glass back, plastic frame", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Dual SIM", phone_variants: "6GB/128GB, 8GB/256GB, 12GB/256GB", colors: ["Moonlight Silver", "Night Black", "Nebula Green"],
    display_type: "AMOLED, 120Hz, Dolby Vision", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1300 nits (peak)", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 870 5G", cpu: "Octa-core", gpu: "Adreno 650", fabrication: "7 nm", ram_variants: "6GB, 8GB, 12GB", storage_variants: "128GB, 256GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 980, Multi-Core: 3300", cooling_system: "LiquidCool 2.0",
    cam_count: "Triple", cam_main_sensor: "64 MP, f/1.8, OIS", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "Yes", cam_flash: "LED flash", cam_video: "4K@30/60fps",
    cam_front_resolution: "20 MP, f/2.5", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "4500 mAh", charging_wired: "67W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6", bluetooth_version: "5.2", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 12", ui_version: "MIUI 13 for POCO", update_policy: "2 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Snapdragon 870", camera_highlight: "64MP OIS", display_highlight: "120Hz AMOLED", battery_highlight: "4500mAh, 67W"
  },
  {
    name: "POCO M5", slug: "poco-m5", phone_status: "released", upcoming: false, launch_year: 2022, price_usd: 150,
    weight: "201 g", dimensions: "164 x 76.1 x 8.9 mm", build_material: "Glass front (Gorilla Glass 3), plastic frame, plastic back (leather-like)", water_resistance: "N/A", ip_rating: "N/A", sim_type: "Dual SIM", phone_variants: "4GB/64GB, 6GB/128GB", colors: ["Black", "Green", "Yellow"],
    display_type: "IPS LCD, 90Hz", screen_size: "6.58 inches", resolution: "1080 x 2408 pixels", refresh_rate: "90Hz", brightness: "500 nits", hdr: "N/A", protection: "Corning Gorilla Glass 3", pixel_density: "401 ppi",
    processor: "MediaTek Helio G99", cpu: "Octa-core", gpu: "Mali-G57 MC2", fabrication: "6 nm", ram_variants: "4GB, 6GB", storage_variants: "64GB, 128GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 550, Multi-Core: 1800", cooling_system: "Graphite",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.8", cam_ultrawide: "N/A", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "LED flash", cam_video: "1080p@30fps",
    cam_front_resolution: "5 MP, f/2.2", cam_front_hdr: "N/A", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "18W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.3", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: false, network: "4G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: false, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 12", ui_version: "MIUI 13", update_policy: "1 Year OS Update", ai_features: ["Standard AI Features"],
    chipset_highlight: "Helio G99", camera_highlight: "50MP AI Triple", display_highlight: "90Hz LCD", battery_highlight: "5000mAh, 18W"
  },
  {
    name: "POCO X3 GT", slug: "poco-x3-gt", phone_status: "released", upcoming: false, launch_year: 2021, price_usd: 300,
    weight: "193 g", dimensions: "163.3 x 75.9 x 8.9 mm", build_material: "Glass front (Gorilla Glass Victus), plastic back, plastic frame", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Dual SIM", phone_variants: "8GB/128GB, 8GB/256GB", colors: ["Stargaze Black", "Wave Blue", "Cloud White"],
    display_type: "IPS LCD, 120Hz", screen_size: "6.6 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "450 nits (typ)", hdr: "HDR10", protection: "Corning Gorilla Glass Victus", pixel_density: "399 ppi",
    processor: "MediaTek Dimensity 1100 5G", cpu: "Octa-core", gpu: "Mali-G77 MC9", fabrication: "6 nm", ram_variants: "8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 750, Multi-Core: 2800", cooling_system: "LiquidCool 2.0",
    cam_count: "Triple", cam_main_sensor: "64 MP, f/1.8", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "LED flash", cam_video: "4K@30fps",
    cam_front_resolution: "16 MP, f/2.5", cam_front_hdr: "N/A", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "67W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6", bluetooth_version: "5.2", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 11", ui_version: "MIUI 12.5", update_policy: "2 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Dimensity 1100", camera_highlight: "64MP Triple Cam", display_highlight: "120Hz DotDisplay", battery_highlight: "5000mAh, 67W"
  },
  {
    name: "POCO M3 Pro 5G", slug: "poco-m3-pro-5g", phone_status: "released", upcoming: false, launch_year: 2021, price_usd: 180,
    weight: "190 g", dimensions: "161.8 x 75.3 x 8.9 mm", build_material: "Glass front (Gorilla Glass 3), plastic frame, plastic back", water_resistance: "N/A", ip_rating: "N/A", sim_type: "Hybrid Dual SIM", phone_variants: "4GB/64GB, 6GB/128GB", colors: ["Poco Yellow", "Power Black", "Cool Blue"],
    display_type: "IPS LCD, 90Hz", screen_size: "6.5 inches", resolution: "1080 x 2400 pixels", refresh_rate: "90Hz", brightness: "400 nits", hdr: "N/A", protection: "Corning Gorilla Glass 3", pixel_density: "405 ppi",
    processor: "MediaTek Dimensity 700 5G", cpu: "Octa-core", gpu: "Mali-G57 MC2", fabrication: "7 nm", ram_variants: "4GB, 6GB", storage_variants: "64GB, 128GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 550, Multi-Core: 1700", cooling_system: "Graphite",
    cam_count: "Triple", cam_main_sensor: "48 MP, f/1.8", cam_ultrawide: "N/A", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "Dual-LED dual-tone flash", cam_video: "1080p@30fps",
    cam_front_resolution: "8 MP, f/2.0", cam_front_hdr: "N/A", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "18W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.1", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 11", ui_version: "MIUI 12", update_policy: "1 Year OS Update", ai_features: ["Standard AI Features"],
    chipset_highlight: "Dimensity 700", camera_highlight: "48MP Triple Cam", display_highlight: "90Hz FHD+", battery_highlight: "5000mAh, 18W"
  },
  {
    name: "POCO M3", slug: "poco-m3", phone_status: "released", upcoming: false, launch_year: 2020, price_usd: 150,
    weight: "198 g", dimensions: "162.3 x 77.3 x 9.6 mm", build_material: "Glass front (Gorilla Glass 3), plastic back, plastic frame", water_resistance: "N/A", ip_rating: "N/A", sim_type: "Dual SIM", phone_variants: "4GB/64GB, 4GB/128GB, 6GB/128GB", colors: ["Cool Blue", "Poco Yellow", "Power Black"],
    display_type: "IPS LCD", screen_size: "6.53 inches", resolution: "1080 x 2340 pixels", refresh_rate: "60Hz", brightness: "400 nits (typ)", hdr: "N/A", protection: "Corning Gorilla Glass 3", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 662", cpu: "Octa-core", gpu: "Adreno 610", fabrication: "11 nm", ram_variants: "4GB, 6GB", storage_variants: "64GB, 128GB", storage_type: "UFS 2.1", geekbench_score: "Single-Core: 310, Multi-Core: 1350", cooling_system: "Graphite",
    cam_count: "Triple", cam_main_sensor: "48 MP, f/1.8", cam_ultrawide: "N/A", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "LED flash", cam_video: "1080p@30fps",
    cam_front_resolution: "8 MP, f/2.1", cam_front_hdr: "Panorama", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "6000 mAh", charging_wired: "18W wired", charging_wireless: "N/A", charging_reverse: "Yes", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.0", has_nfc: false, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: false, network: "4G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: false, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 10", ui_version: "MIUI 12", update_policy: "1 Year OS Update", ai_features: ["Standard AI Features"],
    chipset_highlight: "Snapdragon 662", camera_highlight: "48MP Triple Cam", display_highlight: "6.53\" FHD+", battery_highlight: "6000mAh, 18W"
  },
  {
    name: "POCO X2", slug: "poco-x2", phone_status: "released", upcoming: false, launch_year: 2020, price_usd: 230,
    weight: "208 g", dimensions: "165.3 x 76.6 x 8.8 mm", build_material: "Glass front (Gorilla Glass 5), glass back (Gorilla Glass 5), aluminum frame", water_resistance: "Water-repellent coating", ip_rating: "N/A", sim_type: "Hybrid Dual SIM", phone_variants: "6GB/64GB, 6GB/128GB, 8GB/256GB", colors: ["Atlantis Blue", "Matrix Purple", "Phoenix Red"],
    display_type: "IPS LCD, 120Hz, HDR10", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "500 nits (typ)", hdr: "HDR10", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 730G", cpu: "Octa-core", gpu: "Adreno 618", fabrication: "8 nm", ram_variants: "6GB, 8GB", storage_variants: "64GB, 128GB, 256GB", storage_type: "UFS 2.1", geekbench_score: "Single-Core: 540, Multi-Core: 1700", cooling_system: "LiquidCool Technology",
    cam_count: "Quad", cam_main_sensor: "64 MP, f/1.9", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "Dual-LED flash", cam_video: "4K@30fps",
    cam_front_resolution: "20 MP, f/2.2 + 2 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "4500 mAh", charging_wired: "27W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.0", has_nfc: false, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: false, network: "4G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 10", ui_version: "MIUI 11", update_policy: "1 to 2 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Snapdragon 730G", camera_highlight: "64MP Quad Cam", display_highlight: "120Hz Display", battery_highlight: "4500mAh, 27W"
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
        p.made_in = 'China';
        if (!p.ai_features) p.ai_features = ['Standard AI Features'];
        await Phone.updateOne({slug: p.slug}, {$set: p}, {upsert: true});
        count++;
    }
    
    console.log(`Successfully injected ${count} POCO Part 3 phones!`);
    mongoose.disconnect();
});
