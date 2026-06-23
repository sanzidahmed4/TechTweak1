const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

const phones = [
  {
    name: "Redmi K50 Pro", slug: "redmi-k50-pro", phone_status: "released", upcoming: false, launch_year: 2022, price_usd: 470,
    weight: "201 g", dimensions: "163.1 x 76.2 x 8.5 mm", build_material: "Glass front (Gorilla Glass Victus), glass back", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Dual SIM", phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB, 12GB/512GB", colors: ["Black", "Gray", "Blue", "Green"],
    display_type: "OLED, 120Hz", screen_size: "6.67 inches", resolution: "1440 x 3200 pixels", refresh_rate: "120Hz", brightness: "1200 nits (peak)", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass Victus", pixel_density: "526 ppi",
    processor: "MediaTek Dimensity 9000", cpu: "Octa-core", gpu: "Mali-G710 MC10", fabrication: "4 nm", ram_variants: "8GB, 12GB", storage_variants: "128GB, 256GB, 512GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 1300, Multi-Core: 4300", cooling_system: "VC Liquid Cooling",
    cam_count: "Triple", cam_main_sensor: "108 MP, f/1.9, OIS", cam_ultrawide: "8 MP, 119˚", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "Yes", cam_flash: "Dual-LED flash", cam_video: "4K@30fps",
    cam_front_resolution: "20 MP", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30/120fps",
    battery_capacity: "5000 mAh", charging_wired: "120W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6", bluetooth_version: "5.3", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 12", ui_version: "MIUI 13", update_policy: "2 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Dimensity 9000", camera_highlight: "108MP OIS", display_highlight: "2K OLED 120Hz", battery_highlight: "5000mAh, 120W"
  },
  {
    name: "Redmi K40 Pro", slug: "redmi-k40-pro", phone_status: "released", upcoming: false, launch_year: 2021, price_usd: 430,
    weight: "196 g", dimensions: "163.7 x 76.4 x 7.8 mm", build_material: "Glass front (Gorilla Glass 5), glass back (Gorilla Glass 5)", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Dual SIM", phone_variants: "6GB/128GB, 8GB/128GB, 8GB/256GB", colors: ["Black", "White", "Aurora"],
    display_type: "Super AMOLED, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1300 nits (peak)", hdr: "HDR10+", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 888 5G", cpu: "Octa-core", gpu: "Adreno 660", fabrication: "5 nm", ram_variants: "6GB, 8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 1100, Multi-Core: 3500", cooling_system: "LiquidCool",
    cam_count: "Triple", cam_main_sensor: "64 MP, f/1.9", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "5 MP, f/2.4 (telemacro)", cam_ois: "No", cam_flash: "LED flash", cam_video: "8K@30fps, 4K@30/60fps",
    cam_front_resolution: "20 MP, f/2.5", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "4520 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6e", bluetooth_version: "5.2", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 11", ui_version: "MIUI 12", update_policy: "2 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Snapdragon 888", camera_highlight: "64MP Triple", display_highlight: "120Hz Super AMOLED", battery_highlight: "4520mAh, 33W"
  },
  {
    name: "Redmi 13C 5G", slug: "redmi-13c-5g", phone_status: "released", upcoming: false, launch_year: 2023, price_usd: 130,
    weight: "192 g", dimensions: "168 x 78 x 8.1 mm", build_material: "Glass front (Gorilla Glass), plastic frame, plastic back", water_resistance: "Splash and dust resistant", ip_rating: "N/A", sim_type: "Dual SIM", phone_variants: "4GB/128GB, 8GB/256GB", colors: ["Starlight Black", "Startrail Green", "Startrail Silver"],
    display_type: "IPS LCD, 90Hz", screen_size: "6.74 inches", resolution: "720 x 1600 pixels", refresh_rate: "90Hz", brightness: "600 nits (peak)", hdr: "N/A", protection: "Corning Gorilla Glass", pixel_density: "260 ppi",
    processor: "MediaTek Dimensity 6100+", cpu: "Octa-core", gpu: "Mali-G57 MC2", fabrication: "6 nm", ram_variants: "4GB, 8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 680, Multi-Core: 1900", cooling_system: "Graphite",
    cam_count: "Dual", cam_main_sensor: "50 MP, f/1.8", cam_ultrawide: "N/A", cam_telephoto: "N/A", cam_macro: "0.08 MP (auxiliary)", cam_ois: "No", cam_flash: "LED flash", cam_video: "1080p@30fps",
    cam_front_resolution: "5 MP", cam_front_hdr: "N/A", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "18W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.3", has_nfc: false, gps_specs: "GPS", has_ir_blaster: false, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: false, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 13", ui_version: "MIUI 14", update_policy: "2 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Dimensity 6100+", camera_highlight: "50MP Dual Cam", display_highlight: "90Hz LCD", battery_highlight: "5000mAh, 18W"
  },
  {
    name: "Redmi 12", slug: "redmi-12", phone_status: "released", upcoming: false, launch_year: 2023, price_usd: 150,
    weight: "198.5 g", dimensions: "168.6 x 76.3 x 8.2 mm", build_material: "Glass front, plastic frame, glass back", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Hybrid Dual SIM", phone_variants: "4GB/128GB, 8GB/128GB, 8GB/256GB", colors: ["Midnight Black", "Sky Blue", "Polar Silver"],
    display_type: "IPS LCD, 90Hz", screen_size: "6.79 inches", resolution: "1080 x 2460 pixels", refresh_rate: "90Hz", brightness: "550 nits (peak)", hdr: "N/A", protection: "N/A", pixel_density: "396 ppi",
    processor: "MediaTek Helio G88", cpu: "Octa-core", gpu: "Mali-G52 MC2", fabrication: "12 nm", ram_variants: "4GB, 8GB", storage_variants: "128GB, 256GB", storage_type: "eMMC 5.1", geekbench_score: "Single-Core: 400", cooling_system: "Standard",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.8", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "LED flash", cam_video: "1080p@30fps",
    cam_front_resolution: "8 MP, f/2.1", cam_front_hdr: "N/A", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "18W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.3", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: false, network: "4G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: false, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 13", ui_version: "MIUI 14", update_policy: "1 Year OS Update", ai_features: ["Standard AI Features"],
    chipset_highlight: "Helio G88", camera_highlight: "50MP Triple", display_highlight: "90Hz FHD+", battery_highlight: "5000mAh, 18W"
  },
  {
    name: "Redmi 9A", slug: "redmi-9a", phone_status: "released", upcoming: false, launch_year: 2020, price_usd: 90,
    weight: "194 g", dimensions: "164.9 x 77 x 9 mm", build_material: "Glass front, plastic back, plastic frame", water_resistance: "N/A", ip_rating: "N/A", sim_type: "Dual SIM", phone_variants: "2GB/32GB, 3GB/32GB", colors: ["Carbon Gray", "Sky Blue", "Ocean Green"],
    display_type: "IPS LCD", screen_size: "6.53 inches", resolution: "720 x 1600 pixels", refresh_rate: "60Hz", brightness: "400 nits (typ)", hdr: "N/A", protection: "N/A", pixel_density: "269 ppi",
    processor: "MediaTek Helio G25", cpu: "Octa-core", gpu: "PowerVR GE8320", fabrication: "12 nm", ram_variants: "2GB, 3GB", storage_variants: "32GB", storage_type: "eMMC 5.1", geekbench_score: "Single-Core: 130", cooling_system: "Standard",
    cam_count: "Single", cam_main_sensor: "13 MP, f/2.2", cam_ultrawide: "N/A", cam_telephoto: "N/A", cam_macro: "N/A", cam_ois: "No", cam_flash: "LED flash", cam_video: "1080p@30fps",
    cam_front_resolution: "5 MP, f/2.2", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "10W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "microUSB 2.0", wifi_version: "Wi-Fi 4", bluetooth_version: "5.0", has_nfc: false, gps_specs: "GPS", has_ir_blaster: false, has_audio_jack: true, usb_version: "2.0", has_5g: false, network: "4G",
    sensor_fingerprint: "No", has_gyroscope: false, has_compass: false, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 10", ui_version: "MIUI 12", update_policy: "1 Year OS Update", ai_features: ["Standard AI Features"],
    chipset_highlight: "Helio G25", camera_highlight: "13MP Single", display_highlight: "6.53\" HD+", battery_highlight: "5000mAh"
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
    
    console.log(`Successfully injected ${count} Redmi Part 4 phones!`);
    mongoose.disconnect();
});
