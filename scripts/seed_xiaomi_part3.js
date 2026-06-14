const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

const phones = [
  {
    name: "Xiaomi Civi 5 Pro", slug: "xiaomi-civi-5-pro", phone_status: "upcoming", upcoming: true, launch_year: 2025, price_usd: 400,
    weight: "175 g", dimensions: "158.3 x 71.5 x 7.5 mm", build_material: "Glass front, glass back, aluminum frame", water_resistance: "N/A", ip_rating: "N/A", sim_type: "Dual SIM", phone_variants: "12GB/256GB, 12GB/512GB, 16GB/512GB", colors: ["Pink", "Green", "Blue", "Black"],
    display_type: "AMOLED, 68B colors, 120Hz, Dolby Vision", screen_size: "6.55 inches", resolution: "1236 x 2750 pixels", refresh_rate: "120Hz", brightness: "3000 nits (peak)", hdr: "HDR10+", protection: "Corning Gorilla Glass Victus 2", pixel_density: "460 ppi",
    processor: "Qualcomm Snapdragon 8s Gen 3", cpu: "Octa-core", gpu: "Adreno 735", fabrication: "4 nm", ram_variants: "12GB, 16GB", storage_variants: "256GB, 512GB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 1950, Multi-Core: 5100", cooling_system: "LiquidCool",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.6, OIS", cam_ultrawide: "12 MP, f/2.2", cam_telephoto: "50 MP, f/2.0 (2x optical)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "Leica lenses, LED flash", cam_video: "4K@30/60fps",
    cam_front_resolution: "Dual 32 MP, f/2.0 (wide) + 32 MP, f/2.4 (ultrawide)", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "4K@30fps",
    battery_capacity: "4700 mAh", charging_wired: "67W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6", bluetooth_version: "5.4", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 15", ui_version: "HyperOS", update_policy: "3 Years OS Updates", ai_features: ["AI Magic Erase", "AI Portrait"],
    chipset_highlight: "Snapdragon 8s Gen 3", camera_highlight: "Dual 32MP Selfie", display_highlight: "6.55\" AMOLED", battery_highlight: "4700mAh, 67W"
  },
  {
    name: "Xiaomi Mix Fold 3", slug: "xiaomi-mix-fold-3", phone_status: "released", upcoming: false, launch_year: 2023, price_usd: 1250,
    weight: "255 g", dimensions: "Unfolded: 161.2 x 143.3 x 5.3 mm", build_material: "Glass front, glass or aramid fiber back, aluminum frame", water_resistance: "N/A", ip_rating: "N/A", sim_type: "Dual SIM", phone_variants: "12GB/256GB, 16GB/512GB, 16GB/1TB", colors: ["Black", "Gold"],
    display_type: "Foldable LTPO OLED+, 1B colors, 120Hz", screen_size: "8.03 inches", resolution: "1916 x 2160 pixels", refresh_rate: "120Hz", brightness: "1300 nits", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass Victus 2", pixel_density: "360 ppi",
    processor: "Qualcomm Snapdragon 8 Gen 2", cpu: "Octa-core", gpu: "Adreno 740", fabrication: "4 nm", ram_variants: "12GB, 16GB", storage_variants: "256GB, 512GB, 1TB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 1550, Multi-Core: 5100", cooling_system: "VC Cooling",
    cam_count: "Quad", cam_main_sensor: "50 MP, f/1.8, OIS", cam_ultrawide: "12 MP, f/2.2", cam_telephoto: "10 MP (3.2x optical), 10 MP (5x periscope)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "Leica optics", cam_video: "8K@24fps, 4K@60fps",
    cam_front_resolution: "20 MP (inner), 20 MP (cover)", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@60fps",
    battery_capacity: "4800 mAh", charging_wired: "67W wired", charging_wireless: "50W wireless", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 3.2", wifi_version: "Wi-Fi 6e", bluetooth_version: "5.3", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "3.2", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 13", ui_version: "MIUI 14", update_policy: "4 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Snapdragon 8 Gen 2", camera_highlight: "Leica Quad Cam", display_highlight: "8.03\" Foldable OLED+", battery_highlight: "4800mAh, 67W"
  },
  {
    name: "Xiaomi 13 Lite", slug: "xiaomi-13-lite", phone_status: "released", upcoming: false, launch_year: 2023, price_usd: 400,
    weight: "171 g", dimensions: "159.2 x 72.7 x 7.2 mm", build_material: "Glass front (Gorilla Glass 5), glass back, plastic frame", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Dual SIM", phone_variants: "8GB/128GB, 8GB/256GB", colors: ["Black", "Lite Blue", "Lite Pink"],
    display_type: "AMOLED, 68B colors, 120Hz", screen_size: "6.55 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1000 nits (peak)", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass 5", pixel_density: "402 ppi",
    processor: "Qualcomm Snapdragon 7 Gen 1", cpu: "Octa-core", gpu: "Adreno 644", fabrication: "4 nm", ram_variants: "8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 780, Multi-Core: 2900", cooling_system: "Stainless Steel VC",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.8", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "Dual-LED flash", cam_video: "4K@30fps",
    cam_front_resolution: "Dual 32 MP, f/2.4 (ultrawide) + 8 MP (depth)", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@60fps",
    battery_capacity: "4500 mAh", charging_wired: "67W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6", bluetooth_version: "5.2", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 12", ui_version: "MIUI 14", update_policy: "3 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Snapdragon 7 Gen 1", camera_highlight: "Dual Selfie Cam", display_highlight: "6.55\" AMOLED", battery_highlight: "4500mAh, 67W"
  },
  {
    name: "Xiaomi 12T", slug: "xiaomi-12t", phone_status: "released", upcoming: false, launch_year: 2022, price_usd: 500,
    weight: "202 g", dimensions: "163.1 x 75.9 x 8.6 mm", build_material: "Glass front (Gorilla Glass 5), glass back, plastic frame", water_resistance: "N/A", ip_rating: "N/A", sim_type: "Dual SIM", phone_variants: "8GB/128GB, 8GB/256GB", colors: ["Black", "Silver", "Blue"],
    display_type: "AMOLED, 68B colors, 120Hz", screen_size: "6.67 inches", resolution: "1220 x 2712 pixels", refresh_rate: "120Hz", brightness: "900 nits", hdr: "HDR10+", protection: "Corning Gorilla Glass 5", pixel_density: "446 ppi",
    processor: "MediaTek Dimensity 8100-Ultra", cpu: "Octa-core", gpu: "Mali-G610 MC6", fabrication: "5 nm", ram_variants: "8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 920, Multi-Core: 3700", cooling_system: "LiquidCool",
    cam_count: "Triple", cam_main_sensor: "108 MP, f/1.7, OIS", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "Yes", cam_flash: "Dual-LED flash", cam_video: "4K@30fps",
    cam_front_resolution: "20 MP, f/2.2", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@60fps",
    battery_capacity: "5000 mAh", charging_wired: "120W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6", bluetooth_version: "5.3", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 12", ui_version: "MIUI 13", update_policy: "3 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Dimensity 8100-Ultra", camera_highlight: "108MP Pro-grade", display_highlight: "120Hz CrystalRes AMOLED", battery_highlight: "5000mAh, 120W"
  },
  {
    name: "Xiaomi 11T", slug: "xiaomi-11t", phone_status: "released", upcoming: false, launch_year: 2021, price_usd: 400,
    weight: "203 g", dimensions: "164.1 x 76.9 x 8.8 mm", build_material: "Glass front (Gorilla Glass Victus), glass back, aluminum frame", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Dual SIM", phone_variants: "8GB/128GB, 8GB/256GB", colors: ["Meteorite Gray", "Moonlight White", "Celestial Blue"],
    display_type: "AMOLED, 1B colors, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1000 nits (peak)", hdr: "HDR10+", protection: "Corning Gorilla Glass Victus", pixel_density: "395 ppi",
    processor: "MediaTek Dimensity 1200", cpu: "Octa-core", gpu: "Mali-G77 MC9", fabrication: "6 nm", ram_variants: "8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 750, Multi-Core: 2800", cooling_system: "Vapor Chamber",
    cam_count: "Triple", cam_main_sensor: "108 MP, f/1.75", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "5 MP, f/2.4 (telemacro)", cam_ois: "No", cam_flash: "Dual-LED flash", cam_video: "4K@30fps",
    cam_front_resolution: "16 MP, f/2.45", cam_front_hdr: "N/A", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "67W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6", bluetooth_version: "5.2", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 11", ui_version: "MIUI 12.5", update_policy: "3 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Dimensity 1200", camera_highlight: "108MP Pro-grade", display_highlight: "120Hz AMOLED", battery_highlight: "5000mAh, 67W"
  },
  {
    name: "Xiaomi 11 Lite 5G NE", slug: "xiaomi-11-lite-5g-ne", phone_status: "released", upcoming: false, launch_year: 2021, price_usd: 300,
    weight: "158 g", dimensions: "160.5 x 75.7 x 6.8 mm", build_material: "Glass front (Gorilla Glass 5), glass back", water_resistance: "IP53", ip_rating: "IP53", sim_type: "Hybrid Dual SIM", phone_variants: "6GB/128GB, 8GB/128GB, 8GB/256GB", colors: ["Truffle Black", "Bubblegum Blue", "Peach Pink", "Snowflake White"],
    display_type: "AMOLED, 1B colors, 90Hz", screen_size: "6.55 inches", resolution: "1080 x 2400 pixels", refresh_rate: "90Hz", brightness: "800 nits (High Brightness Mode)", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass 5", pixel_density: "402 ppi",
    processor: "Qualcomm Snapdragon 778G 5G", cpu: "Octa-core", gpu: "Adreno 642L", fabrication: "6 nm", ram_variants: "6GB, 8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 780, Multi-Core: 2900", cooling_system: "Graphite",
    cam_count: "Triple", cam_main_sensor: "64 MP, f/1.8", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "5 MP, f/2.4 (telemacro)", cam_ois: "No", cam_flash: "Dual-LED dual-tone flash", cam_video: "4K@30fps",
    cam_front_resolution: "20 MP, f/2.2", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@60fps",
    battery_capacity: "4250 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6", bluetooth_version: "5.2", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 11", ui_version: "MIUI 12.5", update_policy: "3 Years OS Updates", ai_features: ["Standard AI Features"],
    chipset_highlight: "Snapdragon 778G", camera_highlight: "64MP Triple Cam", display_highlight: "90Hz AMOLED", battery_highlight: "4250mAh, 33W"
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
    
    console.log(`Successfully injected ${count} Xiaomi Part 3 phones!`);
    mongoose.disconnect();
});
