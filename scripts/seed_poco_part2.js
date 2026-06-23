const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

const phones = [
  // 2022/2021/2020
  {
    name: "POCO X4 GT", slug: "poco-x4-gt", phone_status: "released", upcoming: false, launch_year: 2022, price_usd: 350,
    weight: "200 g", dimensions: "163.6 x 74.3 x 8.9 mm", build_material: "Glass front (Gorilla Glass 5), plastic frame, plastic back", water_resistance: "N/A", ip_rating: "N/A", sim_type: "Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "8GB/128GB, 8GB/256GB", colors: ["Blue", "Black", "Silver"],
    display_type: "IPS LCD, 144Hz, HDR10, Dolby Vision", screen_size: "6.6 inches", resolution: "1080 x 2460 pixels", refresh_rate: "144Hz", brightness: "650 nits (typ)", hdr: "HDR10, Dolby Vision", protection: "Corning Gorilla Glass 5", pixel_density: "407 ppi",
    processor: "MediaTek Dimensity 8100", cpu: "Octa-core", gpu: "Mali-G610 MC6", fabrication: "5 nm", ram_variants: "8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 900, Multi-Core: 3800", cooling_system: "LiquidCool Technology 2.0",
    cam_count: "Triple", cam_main_sensor: "64 MP, f/1.9", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "LED flash, HDR, panorama", cam_video: "4K@30fps, 1080p@30/60fps",
    cam_front_resolution: "16 MP, f/2.5", cam_front_hdr: "N/A", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5080 mAh", charging_wired: "67W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6", bluetooth_version: "5.3, A2DP, LE", has_nfc: true, gps_specs: "GPS, GLONASS, GALILEO, BDS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 12", ui_version: "MIUI 13 for POCO", update_policy: "2 Years OS Updates", ai_features: [],
    chipset_highlight: "Dimensity 8100", camera_highlight: "64MP Triple Cam", display_highlight: "144Hz DynamicSwitch LCD", battery_highlight: "5080mAh, 67W Charge",
    meta_title: "POCO X4 GT Specs & Features", meta_description: "POCO X4 GT with MediaTek Dimensity 8100 and 144Hz display."
  },
  {
    name: "POCO M4 Pro 5G", slug: "poco-m4-pro-5g", phone_status: "released", upcoming: false, launch_year: 2021, price_usd: 200,
    weight: "195 g", dimensions: "163.6 x 75.8 x 8.8 mm", build_material: "Glass front (Gorilla Glass 3), plastic back, plastic frame", water_resistance: "IP53, dust and splash resistant", ip_rating: "IP53", sim_type: "Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "4GB/64GB, 6GB/128GB, 8GB/128GB", colors: ["Poco Yellow", "Power Black", "Cool Blue"],
    display_type: "IPS LCD, 90Hz", screen_size: "6.6 inches", resolution: "1080 x 2400 pixels", refresh_rate: "90Hz", brightness: "450 nits (typ)", hdr: "N/A", protection: "Corning Gorilla Glass 3", pixel_density: "399 ppi",
    processor: "MediaTek Dimensity 810 5G", cpu: "Octa-core", gpu: "Mali-G57 MC2", fabrication: "6 nm", ram_variants: "4GB, 6GB, 8GB", storage_variants: "64GB, 128GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 590, Multi-Core: 1750", cooling_system: "Graphite",
    cam_count: "Dual", cam_main_sensor: "50 MP, f/1.8", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "N/A", cam_ois: "No", cam_flash: "LED flash, HDR, panorama", cam_video: "1080p@30/60fps",
    cam_front_resolution: "16 MP, f/2.5", cam_front_hdr: "Panorama", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac", bluetooth_version: "5.1, A2DP, LE", has_nfc: true, gps_specs: "GPS, GLONASS, GALILEO, BDS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 11", ui_version: "MIUI 12.5 for POCO", update_policy: "1 Year OS Update", ai_features: [],
    chipset_highlight: "Dimensity 810 5G", camera_highlight: "50MP Dual Cam", display_highlight: "90Hz FHD+ DotDisplay", battery_highlight: "5000mAh, 33W Pro Fast Charge",
    meta_title: "POCO M4 Pro 5G Specifications", meta_description: "Check the full specifications of POCO M4 Pro 5G."
  },
  {
    name: "POCO F2 Pro", slug: "poco-f2-pro", phone_status: "released", upcoming: false, launch_year: 2020, price_usd: 400,
    weight: "219 g", dimensions: "163.3 x 75.4 x 8.9 mm", build_material: "Glass front (Gorilla Glass 5), glass back (Gorilla Glass 5), aluminum frame", water_resistance: "N/A", ip_rating: "N/A", sim_type: "Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "6GB/128GB, 8GB/256GB", colors: ["Neon Blue", "Phantom White", "Electric Purple", "Cyber Gray"],
    display_type: "Super AMOLED, HDR10+", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "60Hz", brightness: "500 nits (typ)", hdr: "HDR10+", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 865 5G", cpu: "Octa-core", gpu: "Adreno 650", fabrication: "7 nm", ram_variants: "6GB, 8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 900, Multi-Core: 3300", cooling_system: "LiquidCool Technology 2.0",
    cam_count: "Quad", cam_main_sensor: "64 MP, f/1.9", cam_ultrawide: "13 MP, f/2.4", cam_telephoto: "N/A", cam_macro: "5 MP, f/2.2 (telemacro)", cam_ois: "No", cam_flash: "Dual-LED dual-tone flash, HDR, panorama", cam_video: "8K@24/30fps, 4K@30/60fps, 1080p@30/60/120/240fps",
    cam_front_resolution: "Motorized pop-up 20 MP, f/2.2", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "4700 mAh", charging_wired: "30W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6", bluetooth_version: "5.1, A2DP, LE, aptX HD, aptX Adaptive", has_nfc: true, gps_specs: "GPS, GLONASS, GALILEO, BDS, QZSS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Under display, optical", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 10", ui_version: "MIUI 11", update_policy: "2 Years OS Updates", ai_features: [],
    chipset_highlight: "Snapdragon 865", camera_highlight: "64MP Quad Cam", display_highlight: "6.67\" Uninterrupted AMOLED", battery_highlight: "4700mAh, 30W Fast Charge",
    meta_title: "POCO F2 Pro Specifications", meta_description: "POCO F2 Pro full phone specifications including motorized pop-up camera."
  },
  {
    name: "POCO X3 NFC", slug: "poco-x3-nfc", phone_status: "released", upcoming: false, launch_year: 2020, price_usd: 230,
    weight: "215 g", dimensions: "165.3 x 76.8 x 9.4 mm", build_material: "Glass front (Gorilla Glass 5), plastic back, aluminum frame", water_resistance: "IP53, dust and splash protection", ip_rating: "IP53", sim_type: "Hybrid Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "6GB/64GB, 6GB/128GB, 8GB/128GB", colors: ["Cobalt Blue", "Shadow Gray"],
    display_type: "IPS LCD, 120Hz, HDR10", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "450 nits (typ)", hdr: "HDR10", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 732G", cpu: "Octa-core", gpu: "Adreno 618", fabrication: "8 nm", ram_variants: "6GB, 8GB", storage_variants: "64GB, 128GB", storage_type: "UFS 2.1", geekbench_score: "Single-Core: 570, Multi-Core: 1750", cooling_system: "LiquidCool Technology 1.0 Plus",
    cam_count: "Quad", cam_main_sensor: "64 MP, f/1.9", cam_ultrawide: "13 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "Dual-LED flash, HDR, panorama", cam_video: "4K@30fps, 1080p@30/120fps",
    cam_front_resolution: "20 MP, f/2.2", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5160 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac", bluetooth_version: "5.1, A2DP, LE", has_nfc: true, gps_specs: "GPS, GLONASS, GALILEO, BDS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: false, network: "GSM / HSPA / LTE",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 10", ui_version: "MIUI 12", update_policy: "1 to 2 Years OS Updates", ai_features: [],
    chipset_highlight: "Snapdragon 732G", camera_highlight: "64MP Quad Cam", display_highlight: "120Hz FHD+ DotDisplay", battery_highlight: "5160mAh, 33W Fast Charge",
    meta_title: "POCO X3 NFC Specs & Features", meta_description: "Full specifications of POCO X3 NFC."
  }
];

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const Brand = mongoose.model('Brand', new mongoose.Schema({},{strict:false}));
    const b = await Brand.findOne({name: 'Xiaomi'});
    
    if (!b) {
        console.log("Xiaomi brand not found!");
        process.exit(1);
    }

    let count = 0;
    for (const p of phones) {
        p.brand_id = b._id;
        p.is_published = true;
        p.is_featured = false;
        await Phone.updateOne({slug: p.slug}, {$set: p}, {upsert: true});
        count++;
    }
    
    console.log(`Successfully injected ${count} POCO legacy phones!`);
    mongoose.disconnect();
});
