import mongoose from "mongoose";
import dotenv from "dotenv";
import Phone from "../src/lib/models/Phone";
import Brand from "../src/lib/models/Brand";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const phones = [
  {
    name: "iQOO 13",
    slug: "iqoo-13",
    brand_name: "iQOO",
    price_usd: 560,
    price_inr: 49999,
    price_official: 560,
    is_official: true,
    release_date: "November 2024",
    release_date_parsed: new Date("2024-11-01"),
    is_published: true,
    is_featured: true,
    upcoming: false,
    colors: ["Legend (White)", "Track (Black)", "Nardo Grey", "Isle of Man (Green)"],
    model_number: "V2408A, I2401",
    made_in: "China/India",
    phone_variants: "12GB/256GB, 16GB/256GB, 16GB/512GB, 16GB/1TB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-13.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8 Elite",
    camera_highlight: "50MP Triple OIS",
    display_highlight: "6.82\" 144Hz LTPO AMOLED",
    battery_highlight: "6150mAh, 120W Fast",
    benchmark_highlight: "3,000,000+ AnTuTu",
    
    processor: "Qualcomm SM8750-AB Snapdragon 8 Elite (3 nm)",
    weight: "207 g or 213 g (7.30 oz)",
    dimensions: "163.4 x 76.7 x 8.0 mm or 8.1 mm",
    build_material: "Glass front, aluminum frame, glass back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "IP68/IP69K dust/water resistant (up to 1.5m for 30 min)",
    
    display_type: "LTPO AMOLED, 1B colors",
    screen_size: "6.82 inches, 112.5 cm2 (~89.8% screen-to-body ratio)",
    resolution: "1440 x 3168 pixels",
    refresh_rate: "144Hz",
    brightness: "1800 nits (HBM)",
    hdr: "HDR10+",
    protection: "Scratch/drop-resistant glass",
    pixel_density: "~510 ppi density",
    
    cpu: "Octa-core (2x4.32 GHz Oryon V2 Phoenix L & 6x3.53 GHz Oryon V2 Phoenix M)",
    gpu: "Adreno 830",
    fabrication: "3 nm",
    ram_variants: "12GB, 16GB",
    storage_variants: "256GB, 512GB, 1TB",
    storage_type: "UFS 4.0",
    geekbench_score: "9980 (v6)",
    cooling_system: "7K VC Dual-Layer Vapor Chamber",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.9, 23mm (wide), 1/1.56\", 1.0µm, PDAF, OIS",
    cam_ultrawide: "50 MP, f/2.0, 150˚ (ultrawide), 1/2.76\", 0.64µm, AF",
    cam_telephoto: "50 MP, f/1.9, 46mm (telephoto), 1/2.93\", 0.6µm, PDAF, 2x optical zoom, OIS",
    cam_macro: "Supported via ultrawide AF",
    cam_ois: "OIS on Main and Telephoto",
    cam_flash: "Ring-LED flash, Monster Halo lighting",
    cam_video: "8K@30fps, 4K@24/30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "32 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "4K@30/60fps, 1080p@30/60fps, gyro-EIS",
    
    battery_capacity: "6150 mAh, non-removable (China) / 6000 mAh (Global)",
    charging_wired: "120W wired",
    charging_wireless: "Not Supported",
    charging_reverse: "10W reverse wired",
    charger_included: true,
    usb_type: "USB Type-C 3.2, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6/7, dual-band",
    bluetooth_version: "5.4, A2DP, LE, aptX HD, aptX Adaptive, aptX Lossless",
    has_nfc: true,
    gps_specs: "GPS (L1+L5), BDS (B1I+B1c+B2a), GALILEO (E1+E5a), QZSS (L1+L5), NavIC (L5), GLONASS",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "3.2",
    
    sensor_fingerprint: "Ultrasonic under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 15",
    ui_version: "Funtouch OS 15 (International), OriginOS 5 (China)",
    update_policy: "4 Years OS, 5 Years Security",
    ai_features: ["AI Image Expansion", "AI Voice Assistant", "Circle to Search", "Live Translation"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO 13 is a masterclass in extreme performance and mobile gaming innovation. Launched in late 2024, it harnesses the immense power of the Qualcomm Snapdragon 8 Elite built on a 3nm architecture, making it one of the absolute fastest smartphones available globally. Designed primarily for power users and competitive gamers, it features an expansive 6.82-inch LTPO AMOLED display running at a buttery smooth 144Hz refresh rate, complemented by an exclusive Q2 display chip that interpolates frames to enhance gaming fluidity without taxing the primary GPU. \n\nBeyond raw horsepower, the iQOO 13 brings significant upgrades to its camera array and endurance. The rear houses a versatile triple 50MP setup—including a primary sensor with OIS and a dedicated 2x optical telephoto lens that doubles as an excellent portrait shooter. The battery has seen a massive jump to a 6150mAh silicon-carbon cell (in select regions), while retaining the signature 120W FlashCharge technology that tops up the phone in a mere 30 minutes. Coupled with an IP68/IP69K rating, an ultrasonic fingerprint scanner, and the immersive 'Monster Halo' RGB lighting on the camera module, the iQOO 13 is an uncompromising flagship that excels in every metric.",
    key_highlights: [
      "Qualcomm Snapdragon 8 Elite (3nm) with astronomical AnTuTu scores.",
      "6.82-inch 144Hz LTPO AMOLED with 2K resolution.",
      "Dedicated Q2 Supercomputing Display Chip for gaming frame interpolation.",
      "Massive 6150mAh silicon-carbon battery with 120W wired charging.",
      "Triple 50MP rear camera system with OIS and 2x telephoto.",
      "IP68 and IP69K highest-grade dust and water resistance rating.",
      "Customizable 'Monster Halo' RGB lighting ring."
    ],
    verdict: "The iQOO 13 sets an incredibly high bar for 2024/2025 flagship killers. It delivers top-tier Snapdragon 8 Elite performance, a stunning 144Hz 2K display, and a massive battery that eliminates range anxiety entirely. While it lacks wireless charging, its ultra-fast 120W wired speeds, refined 50MP triple cameras, and premium build with IP69K certification make it an undeniable steal for gamers and power users looking for maximum value.",
    pros: [
      "Unmatched gaming performance with Snapdragon 8 Elite",
      "Stunningly bright, color-accurate 144Hz 2K display",
      "Incredible battery life with a 6150mAh capacity",
      "Lightning-fast 120W charging out of the box",
      "IP68/IP69K ultimate water and dust protection",
      "Ultrasonic fingerprint scanner is extremely fast"
    ],
    cons: [
      "No wireless charging support",
      "Funtouch OS includes some bloatware out of the box",
      "The device is slightly heavy at 213g"
    ],
    
    faqs: [
      { question: "Is the iQOO 13 good for gaming?", answer: "Absolutely. The iQOO 13 is specifically engineered for high-end gaming. It features the Snapdragon 8 Elite processor, a dedicated Q2 display chip for frame interpolation, a massive 7K VC cooling chamber, and a 144Hz refresh rate display, making it one of the best gaming phones on the market." },
      { question: "Does the iQOO 13 support wireless charging?", answer: "No, the iQOO 13 does not support wireless charging. However, it compensates with an incredibly fast 120W wired charging system that can fill its massive battery in about 30 minutes." },
      { question: "What is the battery capacity of the iQOO 13?", answer: "The Chinese variant of the iQOO 13 features a massive 6,150 mAh silicon-carbon battery, while the global/Indian variants typically feature a 6,000 mAh battery." },
      { question: "Is the iQOO 13 waterproof?", answer: "Yes, the iQOO 13 features industry-leading IP68 and IP69K ratings. This means it is highly resistant to dust and can withstand being submerged in water up to 1.5 meters for 30 minutes, as well as high-pressure water jets." },
      { question: "How many Android updates will the iQOO 13 get?", answer: "iQOO has promised 4 years of major Android OS updates and 5 years of security patches for the iQOO 13." }
    ],
    
    primary_keyword: "iQOO 13 price",
    secondary_keywords: ["iQOO 13 specs", "iQOO 13 review", "iQOO 13 camera", "iQOO 13 gaming test", "iQOO 13 battery life", "iQOO 13 antutu score", "iQOO 13 benchmark"],
    question_keywords: ["Is iQOO 13 good for gaming?", "Is iQOO 13 worth buying?", "Does iQOO 13 support wireless charging?", "How good is iQOO 13 camera?"],
    meta_title: "iQOO 13 Price, Specs, Camera, Battery & Review | TechTweak",
    meta_description: "Discover the full specifications, benchmark scores, gaming performance, battery life, camera quality and expert review of the iQOO 13 featuring Snapdragon 8 Elite on TechTweak.",
    meta_keywords: "iQOO 13, iQOO 13 price, iQOO 13 specs, iQOO 13 review, Snapdragon 8 Elite, 144Hz AMOLED, 120W charging, gaming phone",
    seo_slug: "iqoo-13",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-13",
    og_title: "iQOO 13: The Ultimate Snapdragon 8 Elite Gaming Flagship",
    og_description: "Explore the iQOO 13. Unrivaled gaming performance, triple 50MP cameras, and a massive 6150mAh battery. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-13.jpg",
    twitter_title: "iQOO 13 Price & Specs: A True Flagship Killer",
    twitter_description: "Snapdragon 8 Elite, 144Hz LTPO OLED, and 120W charging. Check out our full review of the new iQOO 13 on TechTweak.",
    
    seo_status: "Green",
    seo_score: 98,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO 12",
    slug: "iqoo-12",
    brand_name: "iQOO",
    price_usd: 650,
    price_inr: 52999,
    price_official: 650,
    is_official: true,
    release_date: "November 2023",
    release_date_parsed: new Date("2023-11-07"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Black", "Red", "White (BMW M Motorsport)"],
    model_number: "I2220, V2321A",
    made_in: "China/India",
    phone_variants: "12GB/256GB, 16GB/512GB, 16GB/1TB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-12.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8 Gen 3",
    camera_highlight: "50MP Triple OIS, 3x Tele",
    display_highlight: "6.78\" 144Hz AMOLED",
    battery_highlight: "5000mAh, 120W Fast",
    benchmark_highlight: "2,100,000+ AnTuTu",
    
    processor: "Qualcomm SM8650-AB Snapdragon 8 Gen 3 (4 nm)",
    weight: "203.7 g (7.16 oz)",
    dimensions: "163.2 x 75.9 x 8.1 mm",
    build_material: "Glass front, aluminum frame, glass/vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "IP64 dust and water resistant",
    
    display_type: "LTPO AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~89.6% screen-to-body ratio)",
    resolution: "1260 x 2800 pixels",
    refresh_rate: "144Hz",
    brightness: "1400 nits (HBM), 3000 nits (peak)",
    hdr: "HDR10+",
    protection: "Scratch/drop-resistant glass",
    pixel_density: "~453 ppi density",
    
    cpu: "Octa-core (1x3.3 GHz Cortex-X4 & 3x3.2 GHz Cortex-A720 & 2x3.0 GHz Cortex-A720 & 2x2.3 GHz Cortex-A520)",
    gpu: "Adreno 750",
    fabrication: "4 nm",
    ram_variants: "12GB, 16GB",
    storage_variants: "256GB, 512GB, 1TB",
    storage_type: "UFS 4.0",
    geekbench_score: "7100 (v6)",
    cooling_system: "6K VC Four-Zone Cooling System",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.7, 23mm (wide), 1/1.3\", 1.2µm, PDAF, OIS",
    cam_ultrawide: "50 MP, f/2.0, 15mm, 119˚ (ultrawide), AF",
    cam_telephoto: "64 MP, f/2.6, 70mm (periscope telephoto), 1/2.0\", PDAF, OIS, 3x optical zoom",
    cam_macro: "Supported via ultrawide",
    cam_ois: "OIS on Main and Periscope Telephoto",
    cam_flash: "Dual-LED flash",
    cam_video: "8K@30fps, 4K@24/30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps, gyro-EIS",
    
    battery_capacity: "5000 mAh, non-removable",
    charging_wired: "120W wired",
    charging_wireless: "Not Supported",
    charging_reverse: "Reverse wired charging",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6/7, tri-band",
    bluetooth_version: "5.4, A2DP, LE, aptX HD, aptX Adaptive, aptX Lossless",
    has_nfc: true,
    gps_specs: "GPS (L1+L5), GLONASS (G1), BDS (B1I+B1c+B2a), GALILEO (E1+E5a), QZSS (L1+L5)",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 14",
    ui_version: "Funtouch OS 14 (International), OriginOS 4 (China)",
    update_policy: "3 Years OS, 4 Years Security",
    ai_features: ["AI Night Vision", "AI Super Resolution", "Smart Erase"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO 12 redefined the affordable flagship landscape when it launched in late 2023, marking the debut of the powerhouse Snapdragon 8 Gen 3 chipset. Striking a beautiful balance between raw gaming performance and refined aesthetics, the iQOO 12 shed the overly aggressive \"gamer\" looks of its predecessors for a more elegant, flat-edged design (especially the BMW M Motorsport Legend edition). The 6.78-inch LTPO AMOLED display boasts an impressive 144Hz refresh rate, delivering incredibly smooth scrolling and a competitive edge in fast-paced multiplayer games.\n\nSurprisingly for a gaming-centric device, the iQOO 12 shines in the camera department. It features a versatile triple camera array, highlighted by a massive 50MP main sensor and an exceptional 64MP periscope telephoto lens with 3x optical zoom and 100x digital zoom—a true rarity in its price bracket. Coupled with a 5000mAh battery that charges from 0 to 100% in around 26 minutes via the included 120W brick, the iQOO 12 stands as one of the most well-rounded high-performance smartphones on the market.",
    key_highlights: [
      "First-to-market Qualcomm Snapdragon 8 Gen 3 processor.",
      "6.78-inch LTPO AMOLED 144Hz display with 3000 nits peak brightness.",
      "Class-leading 64MP periscope telephoto camera with 3x optical zoom.",
      "Super-fast 120W FlashCharge technology.",
      "Large 6K VC cooling chamber for sustained gaming performance.",
      "Premium flat-edge design with BMW M Motorsport branding option."
    ],
    verdict: "The iQOO 12 is a spectacular all-rounder. It delivers peak Snapdragon 8 Gen 3 performance for gamers, but also surprises with a highly capable flagship camera system featuring a 3x periscope zoom lens. If you are looking for top-tier performance without paying the ultra-premium prices of the Galaxy S Ultra series or iPhone Pro Max, the iQOO 12 is arguably the best value flagship of its generation.",
    pros: [
      "Incredible Snapdragon 8 Gen 3 performance",
      "Fantastic camera system with 64MP periscope zoom",
      "Superb 144Hz LTPO display",
      "120W extremely fast charging",
      "Excellent value for money"
    ],
    cons: [
      "Only IP64 rated (splash resistant, not submersible)",
      "USB Type-C is limited to USB 2.0 speeds",
      "No wireless charging capabilities",
      "Front camera capped at 1080p video recording"
    ],
    
    faqs: [
      { question: "Is the iQOO 12 good for gaming?", answer: "Yes, it is phenomenal. With the Snapdragon 8 Gen 3, a dedicated Q1 display chip, and a 6K VC cooling system, it handles demanding titles like Genshin Impact and BGMI at max settings with extreme stability." },
      { question: "Does the iQOO 12 have a periscope camera?", answer: "Yes, the iQOO 12 features a 64MP periscope telephoto lens offering 3x optical zoom, 10x lossless zoom, and up to 100x digital zoom." },
      { question: "Is the iQOO 12 fully waterproof?", answer: "No, the iQOO 12 carries an IP64 rating, meaning it is fully protected against dust and protected against water splashes from any direction, but it should not be submerged in water." },
      { question: "Does the iQOO 12 support wireless charging?", answer: "No, the iQOO 12 relies entirely on its 120W wired fast charging. If you need wireless charging, you would have to look at the iQOO 12 Pro model." },
      { question: "Can the iQOO 12 record 4K video on the front camera?", answer: "No, the 16MP front-facing selfie camera on the iQOO 12 is limited to 1080p video recording at 30fps." }
    ],
    
    primary_keyword: "iQOO 12 price",
    secondary_keywords: ["iQOO 12 specs", "iQOO 12 review", "iQOO 12 camera", "iQOO 12 gaming test", "iQOO 12 battery life", "iQOO 12 antutu score", "iQOO 12 benchmark"],
    question_keywords: ["Is iQOO 12 good for gaming?", "Is iQOO 12 worth buying?", "Does iQOO 12 support wireless charging?", "How good is iQOO 12 camera?"],
    meta_title: "iQOO 12 Price, Specs, Camera, Battery & Review | TechTweak",
    meta_description: "Discover the full specifications, benchmark scores, gaming performance, battery life, camera quality and expert review of the iQOO 12 on TechTweak.",
    meta_keywords: "iQOO 12, iQOO 12 price, iQOO 12 specs, iQOO 12 review, Snapdragon 8 Gen 3, 144Hz AMOLED, 120W charging, gaming phone",
    seo_slug: "iqoo-12",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-12",
    og_title: "iQOO 12: The Ultimate Snapdragon 8 Gen 3 Flagship Killer",
    og_description: "Explore the iQOO 12. Unrivaled gaming performance, periscope telephoto cameras, and 120W charging. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-12.jpg",
    twitter_title: "iQOO 12 Price & Specs: A True Flagship Killer",
    twitter_description: "Snapdragon 8 Gen 3, 144Hz LTPO OLED, and 120W charging. Check out our full review of the iQOO 12 on TechTweak.",
    
    seo_status: "Green",
    seo_score: 97,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO 12 Pro",
    slug: "iqoo-12-pro",
    brand_name: "iQOO",
    price_usd: 850,
    price_official: 850,
    is_official: true,
    release_date: "November 2023",
    release_date_parsed: new Date("2023-11-07"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Black", "Red", "White (BMW M Motorsport)"],
    model_number: "V2322A",
    made_in: "China",
    phone_variants: "16GB/256GB, 16GB/512GB, 16GB/1TB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-12-pro.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8 Gen 3",
    camera_highlight: "50MP Triple, 3x Tele",
    display_highlight: "6.78\" 144Hz 2K AMOLED",
    battery_highlight: "5100mAh, 120W Fast + 50W Wireless",
    benchmark_highlight: "2,100,000+ AnTuTu",
    
    processor: "Qualcomm SM8650-AB Snapdragon 8 Gen 3 (4 nm)",
    weight: "205 g or 210 g (7.23 oz)",
    dimensions: "164.6 x 75.4 x 8.6 mm",
    build_material: "Glass front, aluminum frame, glass/vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "IP68 dust and water resistant (up to 1.5m for 30 min)",
    
    display_type: "LTPO AMOLED, 1B colors, curved edge",
    screen_size: "6.78 inches, 111.0 cm2 (~89.4% screen-to-body ratio)",
    resolution: "1440 x 3200 pixels",
    refresh_rate: "144Hz",
    brightness: "1400 nits (HBM), 3000 nits (peak)",
    hdr: "HDR10+",
    protection: "Scratch/drop-resistant glass",
    pixel_density: "~518 ppi density",
    
    cpu: "Octa-core (1x3.3 GHz Cortex-X4 & 3x3.2 GHz Cortex-A720 & 2x3.0 GHz Cortex-A720 & 2x2.3 GHz Cortex-A520)",
    gpu: "Adreno 750",
    fabrication: "4 nm",
    ram_variants: "16GB",
    storage_variants: "256GB, 512GB, 1TB",
    storage_type: "UFS 4.0",
    geekbench_score: "7150 (v6)",
    cooling_system: "6K VC Four-Zone Cooling System",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.7, 23mm (wide), 1/1.3\", 1.2µm, PDAF, OIS",
    cam_ultrawide: "50 MP, f/2.0, 15mm, 119˚ (ultrawide), AF",
    cam_telephoto: "64 MP, f/2.6, 70mm (periscope telephoto), 1/2.0\", PDAF, OIS, 3x optical zoom",
    cam_macro: "Supported via ultrawide",
    cam_ois: "OIS on Main and Periscope Telephoto",
    cam_flash: "Dual-LED flash",
    cam_video: "8K@30fps, 4K@24/30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps, gyro-EIS",
    
    battery_capacity: "5100 mAh, non-removable",
    charging_wired: "120W wired",
    charging_wireless: "50W wireless",
    charging_reverse: "10W reverse wireless",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6/7, tri-band",
    bluetooth_version: "5.4, A2DP, LE, aptX HD, aptX Adaptive, aptX Lossless",
    has_nfc: true,
    gps_specs: "GPS (L1+L5), GLONASS (G1), BDS (B1I+B1c+B2a), GALILEO (E1+E5a), QZSS (L1+L5)",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Ultrasonic under-display (extra large sensing area)",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 14",
    ui_version: "OriginOS 4 (China exclusive)",
    update_policy: "3 Years OS, 4 Years Security",
    ai_features: ["AI Night Vision", "AI Super Resolution", "Smart Erase"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO 12 Pro represents the pinnacle of vivo's gaming sub-brand for the 2023-2024 cycle. While it shares the same Snapdragon 8 Gen 3 beating heart and exceptional camera system as the standard iQOO 12, the Pro variant adds several premium \"ultra-tier\" features that justify its moniker. The most immediately noticeable difference is the display: the iQOO 12 Pro features a stunning dual-curved Samsung E7 AMOLED panel with a sharper 2K resolution, making it a visual powerhouse for multimedia consumption and high-end gaming.\n\nFurthermore, the iQOO 12 Pro upgrades its physical durability by obtaining a full IP68 water and dust resistance certification, ensuring it can survive being fully submerged in water. It also adds a massive 50W fast wireless charging capability and 10W reverse wireless charging, features noticeably absent from the standard model. Finally, the iQOO 12 Pro utilizes a high-end 3D ultrasonic fingerprint scanner that offers a significantly larger sensing area and faster unlock speeds compared to optical variants. Primarily released in the Chinese market, the iQOO 12 Pro is an uncompromising enthusiast device.",
    key_highlights: [
      "2K (1440p) curved E7 AMOLED 144Hz display.",
      "Qualcomm Snapdragon 8 Gen 3 chipset.",
      "64MP periscope telephoto camera with 3x optical zoom.",
      "Full IP68 dust and water resistance.",
      "5100mAh battery with 120W wired and 50W wireless charging.",
      "Extra-large 3D ultrasonic fingerprint sensor."
    ],
    verdict: "If you want the absolute best iQOO has to offer and reside in a market where it's available, the iQOO 12 Pro is a masterpiece. It takes the phenomenal value proposition of the standard iQOO 12 and adds the premium touches—a 2K curved display, IP68 waterproofing, and fast wireless charging—to create a device that confidently competes with the top-tier 'Pro' and 'Ultra' phones from Apple, Samsung, and Xiaomi.",
    pros: [
      "Stunning 2K curved AMOLED display",
      "Top-tier Snapdragon 8 Gen 3 performance",
      "Extremely fast 50W wireless charging",
      "Full IP68 water and dust resistance",
      "Superior ultrasonic fingerprint scanner"
    ],
    cons: [
      "Limited availability outside of China",
      "Curved display isn't ideal for all types of gaming",
      "Selfie camera is still limited to 1080p video",
      "USB Type-C port is only USB 2.0"
    ],
    
    faqs: [
      { question: "What is the difference between iQOO 12 and iQOO 12 Pro?", answer: "The iQOO 12 Pro features a higher resolution 2K curved display (vs 1.5K flat), adds 50W wireless charging, features full IP68 waterproofing (vs IP64 splash resistance), and uses a faster, larger ultrasonic fingerprint scanner instead of an optical one." },
      { question: "Is the iQOO 12 Pro launched globally?", answer: "No, the iQOO 12 Pro was largely confined to the Chinese domestic market, whereas the standard iQOO 12 saw a broader international and Indian release." },
      { question: "Does the iQOO 12 Pro have a curved screen?", answer: "Yes, unlike the standard iQOO 12 which features a flat display, the iQOO 12 Pro utilizes a dual-curved edge display for a more premium, bezel-less look." },
      { question: "How fast does the iQOO 12 Pro charge wirelessly?", answer: "The iQOO 12 Pro supports incredibly fast 50W wireless charging, which can charge the massive 5100mAh battery in under 50 minutes using a compatible proprietary wireless charger." },
      { question: "Does the iQOO 12 Pro have an ultrasonic fingerprint sensor?", answer: "Yes, it features a premium 3D ultrasonic fingerprint sensor under the display, which is faster, more secure, and works better with wet fingers compared to standard optical sensors." }
    ],
    
    primary_keyword: "iQOO 12 Pro price",
    secondary_keywords: ["iQOO 12 Pro specs", "iQOO 12 Pro vs iQOO 12", "iQOO 12 Pro review", "iQOO 12 Pro wireless charging", "iQOO 12 Pro camera", "iQOO 12 Pro antutu score", "iQOO 12 Pro benchmark"],
    question_keywords: ["Is iQOO 12 Pro good for gaming?", "What is the difference between iQOO 12 and iQOO 12 Pro?", "Does iQOO 12 Pro support wireless charging?", "Is iQOO 12 Pro available in India?"],
    meta_title: "iQOO 12 Pro Price, Specs, Camera, Battery & Review | TechTweak",
    meta_description: "Discover the full specifications, benchmark scores, gaming performance, battery life, camera quality and expert review of the iQOO 12 Pro on TechTweak.",
    meta_keywords: "iQOO 12 Pro, iQOO 12 Pro price, iQOO 12 Pro specs, iQOO 12 Pro review, Snapdragon 8 Gen 3, 2K AMOLED, 120W charging, wireless charging",
    seo_slug: "iqoo-12-pro",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-12-pro",
    og_title: "iQOO 12 Pro: The Ultimate Snapdragon 8 Gen 3 Flagship",
    og_description: "Explore the iQOO 12 Pro. 2K curved display, 50W wireless charging, and full IP68 waterproofing. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-12-pro.jpg",
    twitter_title: "iQOO 12 Pro Price & Specs: A True Premium Flagship",
    twitter_description: "Snapdragon 8 Gen 3, 2K LTPO OLED, and 50W wireless charging. Check out our full review of the iQOO 12 Pro on TechTweak.",
    
    seo_status: "Green",
    seo_score: 95,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    let brand = await Brand.findOne({ slug: "iqoo" });
    if (!brand) {
      brand = new Brand({
        name: "iQOO",
        slug: "iqoo",
        description: "iQOO is a sub-brand of vivo focused on high-performance gaming smartphones.",
        logo_url: "https://upload.wikimedia.org/wikipedia/commons/4/4b/IQOO_logo.svg",
        country: "China",
        established_year: 2019
      });
      await brand.save();
      console.log("Created iQOO brand.");
    }

    for (const phoneData of phones) {
      const existing = await Phone.findOne({ slug: phoneData.slug });
      
      const mappedPhone = {
        ...phoneData,
        brand_id: brand._id
      };

      if (existing) {
        await Phone.updateOne({ slug: phoneData.slug }, mappedPhone);
        console.log(`Updated existing phone: ${phoneData.name}`);
      } else {
        const newPhone = new Phone(mappedPhone);
        await newPhone.save();
        console.log(`Inserted new phone: ${phoneData.name}`);
      }
    }

    console.log("Batch 1 (Part 1) seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
