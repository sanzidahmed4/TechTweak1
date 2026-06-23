const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

const phones = [
  // 2025/2026
  {
    name: "Xiaomi 16 Ultra", slug: "xiaomi-16-ultra", phone_status: "upcoming", upcoming: true, launch_year: 2025, price_usd: 1200,
    weight: "225 g", dimensions: "161.4 x 75.3 x 9.2 mm", build_material: "Glass front, eco leather back, titanium frame", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "12GB/256GB, 16GB/512GB, 16GB/1TB", colors: ["Black", "White", "Titanium"],
    display_type: "LTPO AMOLED, 68B colors, 120Hz, Dolby Vision, HDR10+, 4000 nits", screen_size: "6.73 inches", resolution: "1440 x 3200 pixels", refresh_rate: "120Hz", brightness: "4000 nits (peak)", hdr: "HDR10+, Dolby Vision", protection: "Xiaomi Shield Glass", pixel_density: "522 ppi",
    processor: "Qualcomm Snapdragon 8 Elite 2", cpu: "Octa-core", gpu: "Adreno 840", fabrication: "3 nm", ram_variants: "12GB, 16GB", storage_variants: "256GB, 512GB, 1TB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 3100, Multi-Core: 10200", cooling_system: "Dual-Channel IceLoop",
    cam_count: "Quad", cam_main_sensor: "50 MP, f/1.6, 1-inch type, OIS", cam_ultrawide: "50 MP, f/1.8, 122˚", cam_telephoto: "50 MP, f/1.8 (3.2x), 50 MP, f/3.0 (5x periscope)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "Leica optics, Dual-LED flash", cam_video: "8K@24/30fps, 4K@24/30/60/120fps",
    cam_front_resolution: "32 MP, f/2.0", cam_front_hdr: "HDR, panorama", cam_front_portrait: "Yes", cam_front_video: "4K@30/60fps",
    battery_capacity: "5500 mAh", charging_wired: "120W wired", charging_wireless: "80W wireless", charging_reverse: "10W reverse wireless", charger_included: true,
    usb_type: "USB Type-C 3.2, Gen 2", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e/7", bluetooth_version: "5.4, A2DP, LE, aptX Adaptive", has_nfc: true, gps_specs: "GPS, GLONASS, BDS, GALILEO, QZSS, NavIC", has_ir_blaster: true, has_audio_jack: false, usb_version: "3.2", has_5g: true, network: "GSM / CDMA / HSPA / EVDO / LTE / 5G",
    sensor_fingerprint: "Under display, ultrasonic", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 15", ui_version: "HyperOS", update_policy: "4 Years OS Updates", ai_features: ["AI Magic Erase Pro", "AI Portrait"],
    chipset_highlight: "Snapdragon 8 Elite 2", camera_highlight: "Leica Quad 50MP", display_highlight: "6.73\" 2K LTPO", battery_highlight: "5500mAh, 120W",
    meta_title: "Xiaomi 16 Ultra Specifications", meta_description: "Xiaomi 16 Ultra specs, price, and features."
  },
  {
    name: "Xiaomi 16 Pro", slug: "xiaomi-16-pro", phone_status: "upcoming", upcoming: true, launch_year: 2025, price_usd: 950,
    weight: "215 g", dimensions: "161.4 x 75.3 x 8.5 mm", build_material: "Glass front, ceramic back, aluminum frame", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM", phone_variants: "12GB/256GB, 16GB/512GB", colors: ["Black", "White", "Green"],
    display_type: "LTPO AMOLED, 68B colors, 120Hz", screen_size: "6.73 inches", resolution: "1440 x 3200 pixels", refresh_rate: "120Hz", brightness: "4000 nits (peak)", hdr: "HDR10+", protection: "Xiaomi Shield Glass", pixel_density: "522 ppi",
    processor: "Qualcomm Snapdragon 8 Elite 2", cpu: "Octa-core", gpu: "Adreno 840", fabrication: "3 nm", ram_variants: "12GB, 16GB", storage_variants: "256GB, 512GB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 3100, Multi-Core: 10100", cooling_system: "IceLoop System",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.6, OIS", cam_ultrawide: "50 MP, f/2.2", cam_telephoto: "50 MP, f/2.0 (3.2x optical)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "Leica lenses", cam_video: "8K@24fps, 4K@60fps",
    cam_front_resolution: "32 MP, f/2.0", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "4K@60fps",
    battery_capacity: "5300 mAh", charging_wired: "90W wired", charging_wireless: "50W wireless", charging_reverse: "10W reverse wireless", charger_included: true,
    usb_type: "USB Type-C 3.2", wifi_version: "Wi-Fi 7", bluetooth_version: "5.4", has_nfc: true, gps_specs: "GPS, GLONASS, BDS", has_ir_blaster: true, has_audio_jack: false, usb_version: "3.2", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Under display, ultrasonic", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 15", ui_version: "HyperOS", update_policy: "4 Years OS Updates", ai_features: ["AI Magic"],
    chipset_highlight: "Snapdragon 8 Elite 2", camera_highlight: "Leica Triple 50MP", display_highlight: "2K LTPO AMOLED", battery_highlight: "5300mAh, 90W",
    meta_title: "Xiaomi 16 Pro Specifications", meta_description: "Xiaomi 16 Pro specs."
  },
  {
    name: "Xiaomi 16", slug: "xiaomi-16", phone_status: "upcoming", upcoming: true, launch_year: 2025, price_usd: 800,
    weight: "185 g", dimensions: "152.8 x 71.5 x 8.0 mm", build_material: "Glass front, glass back, aluminum frame", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM", phone_variants: "8GB/256GB, 12GB/512GB", colors: ["Black", "White", "Pink"],
    display_type: "LTPO OLED, 68B colors, 120Hz", screen_size: "6.36 inches", resolution: "1200 x 2670 pixels", refresh_rate: "120Hz", brightness: "4000 nits", hdr: "HDR10+", protection: "Xiaomi Shield Glass", pixel_density: "460 ppi",
    processor: "Qualcomm Snapdragon 8 Elite 2", cpu: "Octa-core", gpu: "Adreno 840", fabrication: "3 nm", ram_variants: "8GB, 12GB", storage_variants: "256GB, 512GB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 3100", cooling_system: "VC Cooling",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.6, OIS", cam_ultrawide: "50 MP, f/2.2", cam_telephoto: "50 MP, f/2.0 (3.2x)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "Leica", cam_video: "8K@24fps, 4K@60fps",
    cam_front_resolution: "32 MP", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "4K@60fps",
    battery_capacity: "5000 mAh", charging_wired: "90W wired", charging_wireless: "50W wireless", charging_reverse: "10W reverse wireless", charger_included: true,
    usb_type: "USB Type-C 3.2", wifi_version: "Wi-Fi 7", bluetooth_version: "5.4", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "3.2", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 15", ui_version: "HyperOS", update_policy: "4 Years OS Updates", ai_features: [],
    chipset_highlight: "Snapdragon 8 Elite 2", camera_highlight: "Leica Triple", display_highlight: "6.36\" Compact", battery_highlight: "5000mAh, 90W",
    meta_title: "Xiaomi 16 Specs", meta_description: "Xiaomi 16 features."
  },
  
  // 2024
  {
    name: "Xiaomi 14T Pro", slug: "xiaomi-14t-pro", phone_status: "released", upcoming: false, launch_year: 2024, price_usd: 650,
    weight: "209 g", dimensions: "160.4 x 75.1 x 8.4 mm", build_material: "Glass front, aluminum alloy frame", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM", phone_variants: "12GB/256GB, 12GB/512GB, 12GB/1TB", colors: ["Titan Black", "Titan Gray", "Titan Blue"],
    display_type: "AMOLED, 68B colors, 144Hz, HDR10+, Dolby Vision", screen_size: "6.67 inches", resolution: "1220 x 2712 pixels", refresh_rate: "144Hz", brightness: "4000 nits (peak)", hdr: "HDR10+", protection: "Xiaomi Shield Glass", pixel_density: "446 ppi",
    processor: "MediaTek Dimensity 9300+", cpu: "Octa-core", gpu: "Immortalis-G720 MC12", fabrication: "4 nm", ram_variants: "12GB", storage_variants: "256GB, 512GB, 1TB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 2200, Multi-Core: 7300", cooling_system: "3D Ice Cooling",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.6, OIS", cam_ultrawide: "12 MP, f/2.2", cam_telephoto: "50 MP, f/2.0 (2.6x optical zoom)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "Leica lens, LED flash", cam_video: "8K@24fps, 4K@30/60fps",
    cam_front_resolution: "32 MP, f/2.0", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "4K@30fps",
    battery_capacity: "5000 mAh", charging_wired: "120W wired", charging_wireless: "50W wireless", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 7", bluetooth_version: "5.4", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 14", ui_version: "HyperOS", update_policy: "4 Years OS Updates", ai_features: ["Circle to Search", "AI Translator"],
    chipset_highlight: "Dimensity 9300+", camera_highlight: "Leica Optics", display_highlight: "144Hz AMOLED", battery_highlight: "5000mAh, 120W",
    meta_title: "Xiaomi 14T Pro Specs", meta_description: "Xiaomi 14T Pro full phone specs."
  },
  {
    name: "Xiaomi 14T", slug: "xiaomi-14t", phone_status: "released", upcoming: false, launch_year: 2024, price_usd: 500,
    weight: "195 g", dimensions: "160.5 x 75.1 x 7.8 mm", build_material: "Glass front, plastic frame, glass back", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM", phone_variants: "12GB/256GB, 12GB/512GB", colors: ["Titan Black", "Titan Gray", "Titan Blue", "Lemon Green"],
    display_type: "AMOLED, 68B colors, 144Hz", screen_size: "6.67 inches", resolution: "1220 x 2712 pixels", refresh_rate: "144Hz", brightness: "4000 nits (peak)", hdr: "HDR10+", protection: "Corning Gorilla Glass 5", pixel_density: "446 ppi",
    processor: "MediaTek Dimensity 8300 Ultra", cpu: "Octa-core", gpu: "Mali-G615 MC6", fabrication: "4 nm", ram_variants: "12GB", storage_variants: "256GB, 512GB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 1500, Multi-Core: 4800", cooling_system: "Graphite",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.7, OIS", cam_ultrawide: "12 MP, f/2.2", cam_telephoto: "50 MP, f/1.9 (2x optical zoom)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "Leica lens, LED flash", cam_video: "4K@30/60fps",
    cam_front_resolution: "32 MP, f/2.0", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "4K@30fps",
    battery_capacity: "5000 mAh", charging_wired: "67W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6E", bluetooth_version: "5.4", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 14", ui_version: "HyperOS", update_policy: "4 Years OS Updates", ai_features: ["Circle to Search"],
    chipset_highlight: "Dimensity 8300 Ultra", camera_highlight: "Leica 50MP Triple", display_highlight: "144Hz AMOLED", battery_highlight: "5000mAh, 67W",
    meta_title: "Xiaomi 14T Specs", meta_description: "Xiaomi 14T features."
  },
  {
    name: "Xiaomi Mix Fold 4", slug: "xiaomi-mix-fold-4", phone_status: "released", upcoming: false, launch_year: 2024, price_usd: 1300,
    weight: "226 g", dimensions: "Unfolded: 159.4 x 143.3 x 4.6 mm, Folded: 159.4 x 73.1 x 9.5 mm", build_material: "Glass front, carbon fiber back, aluminum frame", water_resistance: "IPX8 water resistant", ip_rating: "IPX8", sim_type: "Dual SIM", phone_variants: "12GB/256GB, 16GB/512GB, 16GB/1TB", colors: ["Black", "White", "Blue"],
    display_type: "Foldable LTPO AMOLED, 1B colors, 120Hz", screen_size: "7.98 inches (inner), 6.56 inches (cover)", resolution: "2224 x 2488 pixels", refresh_rate: "120Hz", brightness: "3000 nits (peak)", hdr: "HDR10+, Dolby Vision", protection: "Xiaomi Shield Glass", pixel_density: "418 ppi",
    processor: "Qualcomm Snapdragon 8 Gen 3", cpu: "Octa-core", gpu: "Adreno 750", fabrication: "4 nm", ram_variants: "12GB, 16GB", storage_variants: "256GB, 512GB, 1TB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 2200, Multi-Core: 7000", cooling_system: "Advanced VC",
    cam_count: "Quad", cam_main_sensor: "50 MP, f/1.7, OIS", cam_ultrawide: "12 MP, f/2.2", cam_telephoto: "50 MP (2x optical), 10 MP (5x optical periscope)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "Leica optics", cam_video: "8K@24fps, 4K@60fps",
    cam_front_resolution: "16 MP, f/2.2 (inner), 16 MP, f/2.2 (cover)", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30/60fps",
    battery_capacity: "5100 mAh", charging_wired: "67W wired", charging_wireless: "50W wireless", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 3.2", wifi_version: "Wi-Fi 7", bluetooth_version: "5.4", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "3.2", has_5g: true, network: "5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 14", ui_version: "HyperOS", update_policy: "4 Years OS Updates", ai_features: ["Foldable optimizations"],
    chipset_highlight: "Snapdragon 8 Gen 3", camera_highlight: "Leica Quad Cam", display_highlight: "7.98\" Foldable AMOLED", battery_highlight: "5100mAh, 67W",
    meta_title: "Xiaomi Mix Fold 4 Specs", meta_description: "Xiaomi Mix Fold 4 foldable phone specs."
  },
  
  // 2023
  {
    name: "Xiaomi 13 Pro", slug: "xiaomi-13-pro", phone_status: "released", upcoming: false, launch_year: 2023, price_usd: 1299,
    weight: "229 g", dimensions: "162.9 x 74.6 x 8.4 mm", build_material: "Glass front (Gorilla Glass Victus), ceramic back, aluminum frame", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM", phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB, 12GB/512GB", colors: ["Ceramic White", "Ceramic Black"],
    display_type: "LTPO AMOLED, 1B colors, 120Hz", screen_size: "6.73 inches", resolution: "1440 x 3200 pixels", refresh_rate: "120Hz", brightness: "1900 nits (peak)", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass Victus", pixel_density: "522 ppi",
    processor: "Qualcomm Snapdragon 8 Gen 2", cpu: "Octa-core", gpu: "Adreno 740", fabrication: "4 nm", ram_variants: "8GB, 12GB", storage_variants: "128GB, 256GB, 512GB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 1500, Multi-Core: 5100", cooling_system: "VC Liquid Cooling",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.9, 1.0-inch type, OIS", cam_ultrawide: "50 MP, f/2.2", cam_telephoto: "50 MP, f/2.0 (3.2x optical zoom)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "Leica lens", cam_video: "8K@24fps, 4K@30/60fps",
    cam_front_resolution: "32 MP, f/2.0", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "4820 mAh", charging_wired: "120W wired", charging_wireless: "50W wireless", charging_reverse: "10W reverse wireless", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6E", bluetooth_version: "5.3", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 13", ui_version: "MIUI 14", update_policy: "4 Years OS Updates", ai_features: [],
    chipset_highlight: "Snapdragon 8 Gen 2", camera_highlight: "1-inch 50MP Leica", display_highlight: "WQHD+ LTPO AMOLED", battery_highlight: "4820mAh, 120W",
    meta_title: "Xiaomi 13 Pro Specs", meta_description: "Xiaomi 13 Pro specs."
  },
  {
    name: "Xiaomi 13", slug: "xiaomi-13", phone_status: "released", upcoming: false, launch_year: 2023, price_usd: 999,
    weight: "185 g", dimensions: "152.8 x 71.5 x 8.0 mm", build_material: "Glass front, glass/silicone polymer back, aluminum frame", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM", phone_variants: "8GB/256GB, 12GB/256GB", colors: ["White", "Black", "Flora Green"],
    display_type: "AMOLED, 120Hz", screen_size: "6.36 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1900 nits (peak)", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass 5", pixel_density: "414 ppi",
    processor: "Qualcomm Snapdragon 8 Gen 2", cpu: "Octa-core", gpu: "Adreno 740", fabrication: "4 nm", ram_variants: "8GB, 12GB", storage_variants: "256GB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 1450, Multi-Core: 5000", cooling_system: "VC Cooling",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.8, OIS", cam_ultrawide: "12 MP, f/2.2", cam_telephoto: "10 MP, f/2.0 (3.2x optical)", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "Leica lens", cam_video: "8K@24fps, 4K@60fps",
    cam_front_resolution: "32 MP, f/2.0", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "4500 mAh", charging_wired: "67W wired", charging_wireless: "50W wireless", charging_reverse: "10W reverse wireless", charger_included: true,
    usb_type: "USB Type-C 2.0", wifi_version: "Wi-Fi 6E", bluetooth_version: "5.3", has_nfc: true, gps_specs: "GPS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "5G",
    sensor_fingerprint: "Under display", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 13", ui_version: "MIUI 14", update_policy: "4 Years OS Updates", ai_features: [],
    chipset_highlight: "Snapdragon 8 Gen 2", camera_highlight: "Leica Triple", display_highlight: "6.36\" Compact AMOLED", battery_highlight: "4500mAh, 67W",
    meta_title: "Xiaomi 13 Specs", meta_description: "Xiaomi 13 specs."
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
    
    console.log(`Successfully injected ${count} Xiaomi Part 1 phones!`);
    mongoose.disconnect();
});
