const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

const phones = [
  {
    name: "Redmi Note 15 5G", slug: "redmi-note-15-5g", phone_status: "upcoming", upcoming: true, launch_year: 2025, price_usd: 250,
    weight: "185 g", dimensions: "161.1 x 74.9 x 7.6 mm", build_material: "Glass front, plastic frame, plastic back", water_resistance: "IP54", ip_rating: "IP54", sim_type: "Dual SIM", phone_variants: "6GB/128GB, 8GB/256GB", colors: ["Midnight Black", "Glacier White", "Mint Green"],
    display_type: "AMOLED, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1200 nits", hdr: "N/A", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "MediaTek Dimensity 6100+", cpu: "Octa-core", gpu: "Mali-G57 MC2", fabrication: "6 nm", ram_variants: "6GB, 8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 700, Multi-Core: 1950", cooling_system: "Graphite",
    cam_count: "Dual", cam_main_sensor: "108 MP, f/1.7", cam_ultrawide: "N/A", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "LED flash", cam_video: "1080p@30fps",
    cam_front_resolution: "16 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.3", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 15", ui_version: "HyperOS", update_policy: "2 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Dimensity 6100+", camera_highlight: "108MP Dual Cam", display_highlight: "120Hz AMOLED", battery_highlight: "5000mAh, 33W"
  },
  {
    name: "Redmi Note 14 5G", slug: "redmi-note-14-5g", phone_status: "released", upcoming: false, launch_year: 2024, price_usd: 220,
    weight: "188 g", dimensions: "161.1 x 75.0 x 7.6 mm", build_material: "Glass front (Gorilla Glass 5), plastic frame, plastic back", water_resistance: "IP54", ip_rating: "IP54", sim_type: "Dual SIM", phone_variants: "6GB/128GB, 8GB/256GB", colors: ["Midnight Black", "Time Blue", "Twilight Purple"],
    display_type: "AMOLED, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1000 nits (peak)", hdr: "N/A", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "MediaTek Dimensity 6080", cpu: "Octa-core", gpu: "Mali-G57 MC2", fabrication: "6 nm", ram_variants: "6GB, 8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 720, Multi-Core: 1980", cooling_system: "Graphite",
    cam_count: "Dual", cam_main_sensor: "108 MP, f/1.7", cam_ultrawide: "N/A", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "LED flash", cam_video: "1080p@30fps",
    cam_front_resolution: "16 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.3", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 14", ui_version: "HyperOS", update_policy: "2 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Dimensity 6080", camera_highlight: "108MP Clear", display_highlight: "120Hz FHD+ AMOLED", battery_highlight: "5000mAh, 33W"
  },
  {
    name: "Redmi Note 13 5G", slug: "redmi-note-13-5g", phone_status: "released", upcoming: false, launch_year: 2023, price_usd: 200,
    weight: "174.5 g", dimensions: "161.1 x 75 x 7.6 mm", build_material: "Glass front (Gorilla Glass 5), plastic frame, plastic back", water_resistance: "IP54, dust and splash resistant", ip_rating: "IP54", sim_type: "Dual SIM", phone_variants: "6GB/128GB, 8GB/256GB", colors: ["Stealth Black", "Arctic White", "Prism Gold"],
    display_type: "AMOLED, 1B colors, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1000 nits (peak)", hdr: "N/A", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "MediaTek Dimensity 6080", cpu: "Octa-core", gpu: "Mali-G57 MC2", fabrication: "6 nm", ram_variants: "6GB, 8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 700", cooling_system: "Graphite",
    cam_count: "Triple", cam_main_sensor: "108 MP, f/1.7", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "LED flash", cam_video: "1080p@30fps",
    cam_front_resolution: "16 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.3", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 13", ui_version: "MIUI 14", update_policy: "2 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Dimensity 6080", camera_highlight: "108MP Triple", display_highlight: "120Hz AMOLED", battery_highlight: "5000mAh, 33W"
  },
  {
    name: "Redmi Note 12 5G", slug: "redmi-note-12-5g", phone_status: "released", upcoming: false, launch_year: 2022, price_usd: 180,
    weight: "188 g", dimensions: "165.9 x 76.2 x 8 mm", build_material: "Glass front (Gorilla Glass 3), plastic frame, plastic back", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Dual SIM", phone_variants: "4GB/128GB, 6GB/128GB, 8GB/256GB", colors: ["Frosted Green", "Matte Black", "Mystique Blue"],
    display_type: "AMOLED, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1200 nits (peak)", hdr: "N/A", protection: "Corning Gorilla Glass 3", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 4 Gen 1", cpu: "Octa-core", gpu: "Adreno 619", fabrication: "6 nm", ram_variants: "4GB, 6GB, 8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 600, Multi-Core: 1800", cooling_system: "Graphite",
    cam_count: "Triple", cam_main_sensor: "48 MP, f/1.8", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "Dual-LED flash", cam_video: "1080p@30fps",
    cam_front_resolution: "13 MP, f/2.5", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.1", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 12", ui_version: "MIUI 13", update_policy: "2 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Snapdragon 4 Gen 1", camera_highlight: "48MP Triple Cam", display_highlight: "120Hz Super AMOLED", battery_highlight: "5000mAh, 33W"
  },
  {
    name: "Redmi Note 12 4G", slug: "redmi-note-12-4g", phone_status: "released", upcoming: false, launch_year: 2023, price_usd: 150,
    weight: "183.5 g", dimensions: "165.7 x 76 x 7.9 mm", build_material: "Glass front (Gorilla Glass 3), plastic frame, plastic back", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Dual SIM", phone_variants: "4GB/64GB, 4GB/128GB, 6GB/128GB, 8GB/128GB", colors: ["Onyx Gray", "Mint Green", "Ice Blue"],
    display_type: "AMOLED, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1200 nits (peak)", hdr: "N/A", protection: "Corning Gorilla Glass 3", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 685", cpu: "Octa-core", gpu: "Adreno 610", fabrication: "6 nm", ram_variants: "4GB, 6GB, 8GB", storage_variants: "64GB, 128GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 400", cooling_system: "Graphite",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.8", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "LED flash", cam_video: "1080p@30fps",
    cam_front_resolution: "13 MP, f/2.5", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.0", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: false, network: "4G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 13", ui_version: "MIUI 14", update_policy: "1 Year OS Update", ai_features: ["Standard AI Features"],
    chipset_highlight: "Snapdragon 685", camera_highlight: "50MP Triple", display_highlight: "120Hz AMOLED", battery_highlight: "5000mAh, 33W"
  },
  {
    name: "Redmi Note 11", slug: "redmi-note-11", phone_status: "released", upcoming: false, launch_year: 2022, price_usd: 170,
    weight: "179 g", dimensions: "159.9 x 73.9 x 8.1 mm", build_material: "Glass front (Gorilla Glass 3), plastic frame, plastic back", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Dual SIM", phone_variants: "4GB/64GB, 4GB/128GB, 6GB/128GB", colors: ["Graphite Gray", "Twilight Blue", "Star Blue"],
    display_type: "AMOLED, 90Hz", screen_size: "6.43 inches", resolution: "1080 x 2400 pixels", refresh_rate: "90Hz", brightness: "1000 nits (peak)", hdr: "N/A", protection: "Corning Gorilla Glass 3", pixel_density: "409 ppi",
    processor: "Qualcomm Snapdragon 680 4G", cpu: "Octa-core", gpu: "Adreno 610", fabrication: "6 nm", ram_variants: "4GB, 6GB", storage_variants: "64GB, 128GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 380", cooling_system: "Graphite",
    cam_count: "Quad", cam_main_sensor: "50 MP, f/1.8", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "LED flash", cam_video: "1080p@30fps",
    cam_front_resolution: "13 MP, f/2.4", cam_front_hdr: "N/A", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.0", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: false, network: "4G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 11", ui_version: "MIUI 13", update_policy: "1 Year OS Update", ai_features: ["Standard AI Features"],
    chipset_highlight: "Snapdragon 680", camera_highlight: "50MP Quad Cam", display_highlight: "90Hz AMOLED", battery_highlight: "5000mAh, 33W"
  },
  {
    name: "Redmi Note 10 Pro", slug: "redmi-note-10-pro", phone_status: "released", upcoming: false, launch_year: 2021, price_usd: 250,
    weight: "193 g", dimensions: "164 x 76.5 x 8.1 mm", build_material: "Glass front (Gorilla Glass 5), glass back (Gorilla Glass 5), plastic frame", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Dual SIM", phone_variants: "6GB/64GB, 6GB/128GB, 8GB/128GB", colors: ["Onyx Gray", "Glacier Blue", "Gradient Bronze"],
    display_type: "AMOLED, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1200 nits (peak)", hdr: "HDR10", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 732G", cpu: "Octa-core", gpu: "Adreno 618", fabrication: "8 nm", ram_variants: "6GB, 8GB", storage_variants: "64GB, 128GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 560", cooling_system: "Graphite",
    cam_count: "Quad", cam_main_sensor: "108 MP, f/1.9", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "5 MP, f/2.4 (telemacro)", cam_ois: "No", cam_flash: "LED flash", cam_video: "4K@30fps",
    cam_front_resolution: "16 MP, f/2.5", cam_front_hdr: "Panorama", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5020 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 5", bluetooth_version: "5.1", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: false, network: "4G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 11", ui_version: "MIUI 12", update_policy: "1 to 2 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Snapdragon 732G", camera_highlight: "108MP Quad Cam", display_highlight: "120Hz AMOLED", battery_highlight: "5020mAh, 33W"
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
    
    console.log(`Successfully injected ${count} Redmi Part 3 phones!`);
    mongoose.disconnect();
});
