const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

const phones = [
  // 2025/2026 (Upcoming)
  {
    name: "POCO F7 Pro", slug: "poco-f7-pro", phone_status: "upcoming", upcoming: true, launch_year: 2025, price_usd: 550,
    weight: "209 g", dimensions: "160.9 x 75 x 8.2 mm", build_material: "Glass front, aluminum frame, glass back", water_resistance: "IP68 dust/water resistant", ip_rating: "IP68", sim_type: "Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "12GB/256GB, 16GB/512GB, 16GB/1TB", colors: ["Black", "White", "Titanium"],
    display_type: "AMOLED, 68B colors, 120Hz, Dolby Vision, HDR10+, 4000 nits (peak)", screen_size: "6.67 inches", resolution: "1440 x 3200 pixels", refresh_rate: "120Hz", brightness: "4000 nits (peak)", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass Victus 2", pixel_density: "526 ppi",
    processor: "Qualcomm Snapdragon 8 Elite", cpu: "Octa-core", gpu: "Adreno 830", fabrication: "3 nm", ram_variants: "12GB, 16GB", storage_variants: "256GB, 512GB, 1TB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 2900, Multi-Core: 9500", cooling_system: "Advanced VC Liquid Cooling 3D",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.6, OIS", cam_ultrawide: "8 MP, f/2.2, 119˚", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "Yes", cam_flash: "LED flash, HDR, panorama", cam_video: "8K@24fps, 4K@30/60fps, 1080p@30/60/120fps",
    cam_front_resolution: "16 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30/60fps",
    battery_capacity: "5500 mAh", charging_wired: "120W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6/7", bluetooth_version: "5.4, A2DP, LE", has_nfc: true, gps_specs: "GPS, GALILEO, GLONASS, BDS, QZSS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Under display, optical", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 15", ui_version: "HyperOS", update_policy: "3 Years OS Updates", ai_features: ["AI Magic Eraser", "AI Portrait Enhancer"],
    chipset_highlight: "Snapdragon 8 Elite", camera_highlight: "50MP OIS Triple Cam", display_highlight: "6.67\" 2K AMOLED 120Hz", battery_highlight: "5500mAh, 120W Charge",
    meta_title: "POCO F7 Pro Specifications & Price", meta_description: "Explore POCO F7 Pro specs, features, and price."
  },
  {
    name: "POCO F7", slug: "poco-f7", phone_status: "upcoming", upcoming: true, launch_year: 2025, price_usd: 400,
    weight: "185 g", dimensions: "160.5 x 74.4 x 7.8 mm", build_material: "Corning Gorilla Glass Victus front, plastic back", water_resistance: "IP64 dust and water resistant", ip_rating: "IP64", sim_type: "Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "8GB/256GB, 12GB/512GB", colors: ["Black", "Green", "Titanium"],
    display_type: "AMOLED, 68B colors, 120Hz, Dolby Vision, HDR10+, 2400 nits (peak)", screen_size: "6.67 inches", resolution: "1220 x 2712 pixels", refresh_rate: "120Hz", brightness: "2400 nits (peak)", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass Victus", pixel_density: "446 ppi",
    processor: "Qualcomm Snapdragon 8s Gen 3", cpu: "Octa-core", gpu: "Adreno 735", fabrication: "4 nm", ram_variants: "8GB, 12GB", storage_variants: "256GB, 512GB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 1950, Multi-Core: 5100", cooling_system: "LiquidCool Technology 4.0",
    cam_count: "Dual", cam_main_sensor: "50 MP, f/1.6, OIS", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "LED flash, HDR, panorama", cam_video: "4K@30/60fps, 1080p@30/60/120fps",
    cam_front_resolution: "20 MP, f/2.2", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30/60fps",
    battery_capacity: "5100 mAh", charging_wired: "90W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e", bluetooth_version: "5.4, A2DP, LE", has_nfc: true, gps_specs: "GPS, GALILEO, GLONASS, BDS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Under display, optical", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 15", ui_version: "HyperOS", update_policy: "3 Years OS Updates", ai_features: ["AI Image Expansion"],
    chipset_highlight: "Snapdragon 8s Gen 3", camera_highlight: "50MP OIS Camera", display_highlight: "1.5K AMOLED 120Hz", battery_highlight: "5100mAh, 90W Fast Charge",
    meta_title: "POCO F7 Specifications & Price", meta_description: "Check POCO F7 features, battery, and camera specs."
  },
  {
    name: "POCO X7", slug: "poco-x7", phone_status: "upcoming", upcoming: true, launch_year: 2025, price_usd: 280,
    weight: "181 g", dimensions: "161.1 x 74.95 x 7.98 mm", build_material: "Glass front, plastic frame, plastic back", water_resistance: "IP54, dust and splash resistant", ip_rating: "IP54", sim_type: "Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "8GB/256GB, 12GB/512GB", colors: ["Black", "Blue", "Yellow"],
    display_type: "AMOLED, 68B colors, 120Hz, Dolby Vision", screen_size: "6.67 inches", resolution: "1220 x 2712 pixels", refresh_rate: "120Hz", brightness: "1800 nits (peak)", hdr: "Dolby Vision", protection: "Corning Gorilla Glass Victus", pixel_density: "446 ppi",
    processor: "MediaTek Dimensity 7300-Ultra", cpu: "Octa-core", gpu: "Mali-G615", fabrication: "4 nm", ram_variants: "8GB, 12GB", storage_variants: "256GB, 512GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 1050, Multi-Core: 3000", cooling_system: "Graphite cooling",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.7, OIS", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "Yes", cam_flash: "LED flash, HDR, panorama", cam_video: "4K@30fps, 1080p@30/60fps",
    cam_front_resolution: "16 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5110 mAh", charging_wired: "67W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6", bluetooth_version: "5.3, A2DP, LE", has_nfc: true, gps_specs: "GPS, GALILEO, GLONASS, BDS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Under display, optical", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 15", ui_version: "HyperOS", update_policy: "3 Years OS Updates", ai_features: ["AI Scene Detection"],
    chipset_highlight: "Dimensity 7300-Ultra", camera_highlight: "50MP OIS", display_highlight: "1.5K 120Hz AMOLED", battery_highlight: "5110mAh, 67W Charge",
    meta_title: "POCO X7 Details, Specs and Price", meta_description: "POCO X7 detailed specifications, camera quality, and price."
  },
  
  // 2024 (Released)
  {
    name: "POCO F6 Pro", slug: "poco-f6-pro", phone_status: "released", upcoming: false, launch_year: 2024, price_usd: 499,
    weight: "209 g", dimensions: "160.9 x 75 x 8.2 mm", build_material: "Glass front, aluminum frame, glass back", water_resistance: "IP54, dust and splash resistant", ip_rating: "IP54", sim_type: "Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "12GB/256GB, 12GB/512GB, 16GB/1TB", colors: ["Black", "White"],
    display_type: "AMOLED, 68B colors, 120Hz, Dolby Vision, HDR10+", screen_size: "6.67 inches", resolution: "1440 x 3200 pixels", refresh_rate: "120Hz", brightness: "4000 nits (peak)", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass 5", pixel_density: "526 ppi",
    processor: "Qualcomm Snapdragon 8 Gen 2", cpu: "Octa-core", gpu: "Adreno 740", fabrication: "4 nm", ram_variants: "12GB, 16GB", storage_variants: "256GB, 512GB, 1TB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 2000, Multi-Core: 5500", cooling_system: "LiquidCool Technology 4.0",
    cam_count: "Triple", cam_main_sensor: "50 MP, f/1.6, OIS", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "Yes", cam_flash: "LED flash, HDR, panorama", cam_video: "8K@24fps, 4K@30/60fps, 1080p@30/60/120/240/960fps",
    cam_front_resolution: "16 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30/60fps",
    battery_capacity: "5000 mAh", charging_wired: "120W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6/7", bluetooth_version: "5.3, A2DP, LE, aptX HD", has_nfc: true, gps_specs: "GPS (L1+L5), GLONASS, BDS, GALILEO, QZSS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Under display, optical", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 14", ui_version: "HyperOS", update_policy: "3 Years OS Updates", ai_features: ["AI Magic Erase", "AI Portrait"],
    chipset_highlight: "Snapdragon 8 Gen 2", camera_highlight: "50MP Light Hunter 800", display_highlight: "WQHD+ Flow AMOLED", battery_highlight: "5000mAh, 120W HyperCharge",
    meta_title: "POCO F6 Pro Review, Specs & Price", meta_description: "POCO F6 Pro full phone specifications and current price."
  },
  {
    name: "POCO F6", slug: "poco-f6", phone_status: "released", upcoming: false, launch_year: 2024, price_usd: 379,
    weight: "179 g", dimensions: "160.5 x 74.5 x 7.8 mm", build_material: "Corning Gorilla Glass Victus front, plastic frame, plastic back", water_resistance: "IP64 dust and water resistant", ip_rating: "IP64", sim_type: "Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "8GB/256GB, 12GB/512GB", colors: ["Black", "Green", "Titanium"],
    display_type: "AMOLED, 68B colors, 120Hz, HDR10+, Dolby Vision", screen_size: "6.67 inches", resolution: "1220 x 2712 pixels", refresh_rate: "120Hz", brightness: "2400 nits (peak)", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass Victus", pixel_density: "446 ppi",
    processor: "Qualcomm Snapdragon 8s Gen 3", cpu: "Octa-core", gpu: "Adreno 735", fabrication: "4 nm", ram_variants: "8GB, 12GB", storage_variants: "256GB, 512GB", storage_type: "UFS 4.0", geekbench_score: "Single-Core: 1950, Multi-Core: 5000", cooling_system: "IceLoop System",
    cam_count: "Dual", cam_main_sensor: "50 MP, f/1.6, OIS", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "N/A", cam_ois: "Yes", cam_flash: "LED flash, HDR, panorama", cam_video: "4K@30/60fps, 1080p@30/60/120/240fps",
    cam_front_resolution: "20 MP, f/2.2", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30/60fps",
    battery_capacity: "5000 mAh", charging_wired: "90W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6", bluetooth_version: "5.4, A2DP, LE", has_nfc: true, gps_specs: "GPS, GALILEO, GLONASS, BDS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Under display, optical", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 14", ui_version: "HyperOS", update_policy: "3 Years OS Updates", ai_features: ["AI Magic Delete"],
    chipset_highlight: "Snapdragon 8s Gen 3", camera_highlight: "50MP IMX882 OIS", display_highlight: "1.5K Flow AMOLED", battery_highlight: "5000mAh, 90W Turbo Charge",
    meta_title: "POCO F6 Specifications & Price", meta_description: "POCO F6 features a Snapdragon 8s Gen 3, AMOLED display, and 90W fast charging."
  },
  {
    name: "POCO M6 Pro", slug: "poco-m6-pro-4g", phone_status: "released", upcoming: false, launch_year: 2024, price_usd: 199,
    weight: "179 g", dimensions: "161.1 x 74.95 x 7.98 mm", build_material: "Glass front (Gorilla Glass 5), plastic frame, plastic back", water_resistance: "IP54, dust and splash resistant", ip_rating: "IP54", sim_type: "Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "8GB/256GB, 12GB/512GB", colors: ["Black", "Blue", "Purple"],
    display_type: "AMOLED, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1300 nits (peak)", hdr: "N/A", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "Mediatek Helio G99 Ultra", cpu: "Octa-core", gpu: "Mali-G57 MC2", fabrication: "6 nm", ram_variants: "8GB, 12GB", storage_variants: "256GB, 512GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 730, Multi-Core: 2000", cooling_system: "Graphite",
    cam_count: "Triple", cam_main_sensor: "64 MP, f/1.8, OIS", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "Yes", cam_flash: "LED flash, HDR, panorama", cam_video: "1080p@30/60fps",
    cam_front_resolution: "16 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30/60fps",
    battery_capacity: "5000 mAh", charging_wired: "67W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac", bluetooth_version: "5.2, A2DP, LE", has_nfc: true, gps_specs: "GPS, GLONASS, GALILEO, BDS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: false, network: "GSM / HSPA / LTE",
    sensor_fingerprint: "Under display, optical", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 13", ui_version: "MIUI 14 for POCO", update_policy: "2 Years OS Updates", ai_features: ["AI Camera"],
    chipset_highlight: "Helio G99-Ultra", camera_highlight: "64MP OIS Triple Cam", display_highlight: "120Hz AMOLED", battery_highlight: "5000mAh, 67W",
    meta_title: "POCO M6 Pro (4G) Specs & Features", meta_description: "Check the full specifications of POCO M6 Pro with Helio G99-Ultra."
  },
  {
    name: "POCO M6 Plus 5G", slug: "poco-m6-plus-5g", phone_status: "released", upcoming: false, launch_year: 2024, price_usd: 150,
    weight: "205 g", dimensions: "168.6 x 76.3 x 8.3 mm", build_material: "Glass front, plastic frame, glass back", water_resistance: "IP53, dust and splash resistant", ip_rating: "IP53", sim_type: "Hybrid Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "6GB/128GB, 8GB/128GB", colors: ["Misty Lavender", "Ice Silver", "Graphite Black"],
    display_type: "IPS LCD, 120Hz", screen_size: "6.79 inches", resolution: "1080 x 2460 pixels", refresh_rate: "120Hz", brightness: "550 nits", hdr: "N/A", protection: "Corning Gorilla Glass 3", pixel_density: "396 ppi",
    processor: "Qualcomm Snapdragon 4 Gen 2 AE", cpu: "Octa-core", gpu: "Adreno 613", fabrication: "4 nm", ram_variants: "6GB, 8GB", storage_variants: "128GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 900, Multi-Core: 2100", cooling_system: "Graphite",
    cam_count: "Dual", cam_main_sensor: "108 MP, f/1.8", cam_ultrawide: "N/A", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "Ring-LED flash, HDR, panorama", cam_video: "1080p@30fps",
    cam_front_resolution: "13 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5030 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac", bluetooth_version: "5.3, A2DP, LE", has_nfc: false, gps_specs: "GPS, GLONASS, GALILEO, BDS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: false, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 14", ui_version: "HyperOS", update_policy: "2 Years OS Updates", ai_features: ["AI Camera"],
    chipset_highlight: "Snapdragon 4 Gen 2", camera_highlight: "108MP Dual Cam", display_highlight: "6.79\" 120Hz LCD", battery_highlight: "5030mAh, 33W Charge",
    meta_title: "POCO M6 Plus 5G Specifications", meta_description: "POCO M6 Plus 5G features, specs, and price."
  },
  
  // 2023 (Released)
  {
    name: "POCO F5 Pro", slug: "poco-f5-pro", phone_status: "released", upcoming: false, launch_year: 2023, price_usd: 449,
    weight: "204 g", dimensions: "162.8 x 75.4 x 8.6 mm", build_material: "Glass front (Gorilla Glass 5), glass back, plastic frame", water_resistance: "IP53, dust and splash resistant", ip_rating: "IP53", sim_type: "Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "8GB/256GB, 12GB/256GB, 12GB/512GB", colors: ["Black", "White"],
    display_type: "AMOLED, 68B colors, 120Hz, Dolby Vision, HDR10+", screen_size: "6.67 inches", resolution: "1440 x 3200 pixels", refresh_rate: "120Hz", brightness: "1400 nits (peak)", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass 5", pixel_density: "526 ppi",
    processor: "Qualcomm Snapdragon 8+ Gen 1", cpu: "Octa-core", gpu: "Adreno 730", fabrication: "4 nm", ram_variants: "8GB, 12GB", storage_variants: "256GB, 512GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 1300, Multi-Core: 4000", cooling_system: "LiquidCool Technology 2.0",
    cam_count: "Triple", cam_main_sensor: "64 MP, f/1.8, OIS", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "Yes", cam_flash: "Dual-LED dual-tone flash, HDR, panorama", cam_video: "8K@24fps, 4K@30/60fps, 1080p@30/60/120/240fps",
    cam_front_resolution: "16 MP, f/2.5", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30/60fps",
    battery_capacity: "5160 mAh", charging_wired: "67W wired", charging_wireless: "30W wireless", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6", bluetooth_version: "5.3, A2DP, LE", has_nfc: true, gps_specs: "GPS, GLONASS, GALILEO, BDS, QZSS", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Under display, optical", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 13", ui_version: "MIUI 14 for POCO", update_policy: "3 Years OS Updates", ai_features: ["AI Magic Eraser"],
    chipset_highlight: "Snapdragon 8+ Gen 1", camera_highlight: "64MP OIS", display_highlight: "WQHD+ 120Hz AMOLED", battery_highlight: "5160mAh, 67W + 30W Wireless",
    meta_title: "POCO F5 Pro Specs and Review", meta_description: "POCO F5 Pro features a Snapdragon 8+ Gen 1, 2K display, and wireless charging."
  },
  {
    name: "POCO X5 Pro 5G", slug: "poco-x5-pro-5g", phone_status: "released", upcoming: false, launch_year: 2023, price_usd: 299,
    weight: "181 g", dimensions: "162.9 x 76 x 7.9 mm", build_material: "Glass front (Gorilla Glass 5), plastic back, plastic frame", water_resistance: "IP53, dust and splash resistant", ip_rating: "IP53", sim_type: "Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "6GB/128GB, 8GB/256GB", colors: ["Astral Black", "Horizon Blue", "Poco Yellow"],
    display_type: "AMOLED, 1B colors, 120Hz, Dolby Vision, HDR10+", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "900 nits (HBM)", hdr: "HDR10+, Dolby Vision", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 778G 5G", cpu: "Octa-core", gpu: "Adreno 642L", fabrication: "6 nm", ram_variants: "6GB, 8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 780, Multi-Core: 2900", cooling_system: "Graphite",
    cam_count: "Triple", cam_main_sensor: "108 MP, f/1.9", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "LED flash, HDR, panorama", cam_video: "4K@30fps, 1080p@30/60/120fps",
    cam_front_resolution: "16 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30/60fps",
    battery_capacity: "5000 mAh", charging_wired: "67W wired", charging_wireless: "N/A", charging_reverse: "5W reverse wired", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6", bluetooth_version: "5.2, A2DP, LE", has_nfc: true, gps_specs: "GPS, GLONASS, GALILEO, BDS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 12", ui_version: "MIUI 14 for POCO", update_policy: "3 Years OS Updates", ai_features: ["Vlog Mode"],
    chipset_highlight: "Snapdragon 778G", camera_highlight: "108MP Pro-grade Camera", display_highlight: "120Hz FHD+ AMOLED", battery_highlight: "5000mAh, 67W Turbo Charge",
    meta_title: "POCO X5 Pro 5G - Full Specs & Review", meta_description: "Details on POCO X5 Pro 5G with Snapdragon 778G, 108MP camera, and fast charging."
  },

  // 2022 (Released)
  {
    name: "POCO F4 GT", slug: "poco-f4-gt", phone_status: "released", upcoming: false, launch_year: 2022, price_usd: 599,
    weight: "210 g", dimensions: "162.5 x 76.7 x 8.5 mm", build_material: "Glass front (Gorilla Glass Victus), glass back, aluminum frame", water_resistance: "N/A", ip_rating: "N/A", sim_type: "Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "8GB/128GB, 12GB/256GB", colors: ["Stealth Black", "Knight Silver", "Cyber Yellow"],
    display_type: "AMOLED, 1B colors, 120Hz, HDR10+", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "800 nits (HBM)", hdr: "HDR10+", protection: "Corning Gorilla Glass Victus", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 8 Gen 1", cpu: "Octa-core", gpu: "Adreno 730", fabrication: "4 nm", ram_variants: "8GB, 12GB", storage_variants: "128GB, 256GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 1200, Multi-Core: 3500", cooling_system: "LiquidCool Technology 3.0",
    cam_count: "Triple", cam_main_sensor: "64 MP, f/1.9", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "Dual-LED flash, HDR, panorama", cam_video: "4K@30/60fps, 1080p@30/60/120fps",
    cam_front_resolution: "20 MP, f/2.4", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30/60fps",
    battery_capacity: "4700 mAh", charging_wired: "120W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6", bluetooth_version: "5.2, A2DP, LE", has_nfc: true, gps_specs: "GPS, GLONASS, GALILEO, BDS, QZSS, NavIC", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 12", ui_version: "MIUI 13", update_policy: "2 Years OS Updates", ai_features: ["Magnetic Pop-up Triggers"],
    chipset_highlight: "Snapdragon 8 Gen 1", camera_highlight: "64MP Triple Camera", display_highlight: "120Hz Flat AMOLED", battery_highlight: "4700mAh, 120W HyperCharge",
    meta_title: "POCO F4 GT Gaming Phone Specs", meta_description: "POCO F4 GT with magnetic triggers, Snapdragon 8 Gen 1, and 120W charging."
  },
  {
    name: "POCO X4 Pro 5G", slug: "poco-x4-pro-5g", phone_status: "released", upcoming: false, launch_year: 2022, price_usd: 299,
    weight: "205 g", dimensions: "164.2 x 76.1 x 8.1 mm", build_material: "Glass front (Gorilla Glass 5), glass back, plastic frame", water_resistance: "IP53, dust and splash resistant", ip_rating: "IP53", sim_type: "Hybrid Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "6GB/64GB, 6GB/128GB, 8GB/128GB, 8GB/256GB", colors: ["Laser Black", "Laser Blue", "Poco Yellow"],
    display_type: "AMOLED, 120Hz", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1200 nits (peak)", hdr: "N/A", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 695 5G", cpu: "Octa-core", gpu: "Adreno 619", fabrication: "6 nm", ram_variants: "6GB, 8GB", storage_variants: "64GB, 128GB, 256GB", storage_type: "UFS 2.2", geekbench_score: "Single-Core: 680, Multi-Core: 2000", cooling_system: "LiquidCool Technology",
    cam_count: "Triple", cam_main_sensor: "108 MP, f/1.9", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "LED flash, HDR, panorama", cam_video: "1080p@30fps",
    cam_front_resolution: "16 MP, f/2.5", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5000 mAh", charging_wired: "67W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac", bluetooth_version: "5.1, A2DP, LE", has_nfc: true, gps_specs: "GPS, GLONASS, GALILEO, BDS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 11", ui_version: "MIUI 13 for POCO", update_policy: "1 to 2 Years OS Updates", ai_features: ["AI Camera enhancements"],
    chipset_highlight: "Snapdragon 695", camera_highlight: "108MP Pro-grade", display_highlight: "120Hz AMOLED DotDisplay", battery_highlight: "5000mAh, 67W Turbo",
    meta_title: "POCO X4 Pro 5G Specifications", meta_description: "Specs and details for the POCO X4 Pro 5G smartphone."
  },

  // 2021 (Released)
  {
    name: "POCO F3", slug: "poco-f3", phone_status: "released", upcoming: false, launch_year: 2021, price_usd: 349,
    weight: "196 g", dimensions: "163.7 x 76.4 x 7.8 mm", build_material: "Glass front (Gorilla Glass 5), glass back (Gorilla Glass 5), plastic frame", water_resistance: "IP53, dust and splash protection", ip_rating: "IP53", sim_type: "Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "6GB/128GB, 8GB/256GB", colors: ["Arctic White", "Night Black", "Deep Ocean Blue"],
    display_type: "AMOLED, 120Hz, HDR10+", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "1300 nits (peak)", hdr: "HDR10+", protection: "Corning Gorilla Glass 5", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 870 5G", cpu: "Octa-core", gpu: "Adreno 650", fabrication: "7 nm", ram_variants: "6GB, 8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 950, Multi-Core: 3200", cooling_system: "LiquidCool Technology 1.0 Plus",
    cam_count: "Triple", cam_main_sensor: "48 MP, f/1.8", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "5 MP, f/2.4 (telemacro)", cam_ois: "No", cam_flash: "LED flash, HDR, panorama", cam_video: "4K@30fps, 1080p@30/60/120/240/960fps",
    cam_front_resolution: "20 MP, f/2.5", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "4520 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6", bluetooth_version: "5.1, A2DP, LE", has_nfc: true, gps_specs: "GPS, GLONASS, GALILEO, BDS, QZSS, NavIC", has_ir_blaster: true, has_audio_jack: false, usb_version: "2.0", has_5g: true, network: "GSM / HSPA / LTE / 5G",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 11", ui_version: "MIUI 12 for POCO", update_policy: "2 Years OS Updates", ai_features: ["Audio Zoom"],
    chipset_highlight: "Snapdragon 870", camera_highlight: "48MP Triple Cam", display_highlight: "120Hz E4 AMOLED", battery_highlight: "4520mAh, 33W Fast Charge",
    meta_title: "POCO F3 Performance and Specs", meta_description: "POCO F3 is a performance beast with Snapdragon 870 and 120Hz AMOLED."
  },
  {
    name: "POCO X3 Pro", slug: "poco-x3-pro", phone_status: "released", upcoming: false, launch_year: 2021, price_usd: 249,
    weight: "215 g", dimensions: "165.3 x 76.8 x 9.4 mm", build_material: "Glass front (Gorilla Glass 6), plastic back, plastic frame", water_resistance: "IP53, dust and splash protection", ip_rating: "IP53", sim_type: "Hybrid Dual SIM (Nano-SIM, dual stand-by)", phone_variants: "6GB/128GB, 8GB/256GB", colors: ["Phantom Black", "Frost Blue", "Metal Bronze"],
    display_type: "IPS LCD, 120Hz, HDR10", screen_size: "6.67 inches", resolution: "1080 x 2400 pixels", refresh_rate: "120Hz", brightness: "450 nits (typ)", hdr: "HDR10", protection: "Corning Gorilla Glass 6", pixel_density: "395 ppi",
    processor: "Qualcomm Snapdragon 860", cpu: "Octa-core", gpu: "Adreno 640", fabrication: "7 nm", ram_variants: "6GB, 8GB", storage_variants: "128GB, 256GB", storage_type: "UFS 3.1", geekbench_score: "Single-Core: 750, Multi-Core: 2600", cooling_system: "LiquidCool Technology 1.0 Plus",
    cam_count: "Quad", cam_main_sensor: "48 MP, f/1.8", cam_ultrawide: "8 MP, f/2.2", cam_telephoto: "N/A", cam_macro: "2 MP, f/2.4", cam_ois: "No", cam_flash: "Dual-LED flash, HDR, panorama", cam_video: "4K@30fps, 1080p@30/60/120fps",
    cam_front_resolution: "20 MP, f/2.2", cam_front_hdr: "HDR", cam_front_portrait: "Yes", cam_front_video: "1080p@30fps",
    battery_capacity: "5160 mAh", charging_wired: "33W wired", charging_wireless: "N/A", charging_reverse: "N/A", charger_included: true,
    usb_type: "USB Type-C 2.0, OTG", wifi_version: "Wi-Fi 802.11 a/b/g/n/ac", bluetooth_version: "5.0, A2DP, LE", has_nfc: true, gps_specs: "GPS, GLONASS, GALILEO, BDS", has_ir_blaster: true, has_audio_jack: true, usb_version: "2.0", has_5g: false, network: "GSM / HSPA / LTE",
    sensor_fingerprint: "Side-mounted", has_gyroscope: true, has_compass: true, has_accelerometer: true, has_face_unlock: true,
    android_version: "Android 11", ui_version: "MIUI 12 for POCO", update_policy: "1 to 2 Years OS Updates", ai_features: ["Dual video"],
    chipset_highlight: "Snapdragon 860", camera_highlight: "48MP Quad Cam", display_highlight: "120Hz FHD+ DotDisplay", battery_highlight: "5160mAh, 33W Fast Charge",
    meta_title: "POCO X3 Pro Specifications", meta_description: "The POCO X3 Pro comes with Snapdragon 860 and 120Hz display."
  }
];

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const Brand = mongoose.model('Brand', new mongoose.Schema({},{strict:false}));
    const b = await Brand.findOne({name: 'Xiaomi'});
    
    if (!b) {
        console.log("POCO brand not found!");
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
    
    console.log(`Successfully injected ${count} POCO phones using internal knowledge base!`);
    mongoose.disconnect();
});
