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
  // --- U SERIES ---
  {
    name: "iQOO U5",
    slug: "iqoo-u5",
    brand_name: "iQOO",
    price_usd: 200,
    price_official: 200,
    is_official: true,
    release_date: "December 2021",
    release_date_parsed: new Date("2021-12-24"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["White", "Gray", "Aurora"],
    model_number: "V2165A",
    made_in: "China",
    phone_variants: "4GB/128GB, 6GB/128GB, 8GB/128GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-u5.jpg"
    ],
    
    chipset_highlight: "Snapdragon 695",
    camera_highlight: "50MP Dual",
    display_highlight: "6.58\" 120Hz IPS LCD",
    battery_highlight: "5000mAh, 18W",
    benchmark_highlight: "400,000+ AnTuTu",
    
    processor: "Qualcomm SM6375 Snapdragon 695 5G (6 nm)",
    weight: "185 g (6.53 oz)",
    dimensions: "164 x 75.8 x 8.3 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "IPS LCD, 120Hz",
    screen_size: "6.58 inches, 104.3 cm2 (~83.9% screen-to-body ratio)",
    resolution: "1080 x 2408 pixels",
    refresh_rate: "120Hz",
    brightness: "460 nits (typ)",
    hdr: "HDR10",
    protection: "Scratch-resistant glass",
    pixel_density: "~401 ppi density",
    
    cpu: "Octa-core (2x2.2 GHz Kryo 660 Gold & 6x1.7 GHz Kryo 660 Silver)",
    gpu: "Adreno 619",
    fabrication: "6 nm",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "128GB",
    storage_type: "UFS 2.2",
    geekbench_score: "2000 (v5)",
    cooling_system: "Liquid Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "50 MP, f/1.8, 26mm (wide), PDAF",
    cam_ultrawide: "Not Supported",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (macro)",
    cam_ois: "Not Supported",
    cam_flash: "LED flash",
    cam_video: "4K@30fps, 1080p@30fps",
    
    cam_front_resolution: "8 MP, f/1.8, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5000 mAh, non-removable",
    charging_wired: "18W wired",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band",
    bluetooth_version: "5.1, A2DP, LE, aptX HD",
    has_nfc: false,
    gps_specs: "GPS, GLONASS, GALILEO, BDS",
    has_ir_blaster: false,
    has_audio_jack: true,
    usb_version: "2.0",
    
    sensor_fingerprint: "Side-mounted",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 12",
    ui_version: "OriginOS Ocean",
    update_policy: "1 Year OS Updates",
    ai_features: [],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The iQOO U5 is a classic entry-level 5G smartphone that aimed to bring high refresh rates and reliable 5G connectivity to a strict budget. Powered by the incredibly popular Snapdragon 695 5G processor, it offers stable performance that is perfectly adequate for daily social media use and casual gaming.\n\nWhile it features a smooth 120Hz IPS LCD screen, it cuts costs in areas like charging speeds, maxing out at a sluggish 18W for its large 5000mAh battery. The camera system is basic, relying entirely on a 50MP main sensor without any ultrawide capabilities. It is a strictly functional device designed for users who need a dependable battery and 5G speeds without paying for premium extras.",
    key_highlights: [
      "Reliable 5G performance from the Snapdragon 695 chip.",
      "Smooth 120Hz IPS LCD display.",
      "Large 5000mAh battery provides excellent all-day endurance.",
      "Retains the 3.5mm headphone jack.",
      "Supports 4K video recording on the main camera."
    ],
    verdict: "The iQOO U5 is a decent entry-level phone if your primary concerns are battery life and 5G connectivity, but its slow 18W charging and lack of an ultrawide camera show its age.",
    pros: [
      "Solid daily performance from the Snapdragon 695",
      "120Hz refresh rate",
      "Great battery life",
      "Has a 3.5mm headphone jack"
    ],
    cons: [
      "Very slow 18W charging",
      "IPS LCD screen has average viewing angles",
      "No ultrawide camera"
    ],
    
    faqs: [
      { question: "Is the iQOO U5 good for heavy gaming?", answer: "No, the Snapdragon 695 is meant for casual gaming. Heavy games like Genshin Impact will struggle at high settings." },
      { question: "Does the iQOO U5 support fast charging?", answer: "It only supports 18W charging, which takes nearly two hours to fully charge the 5000mAh battery." }
    ],
    
    primary_keyword: "iQOO U5 price",
    secondary_keywords: ["iQOO U5 specs", "iQOO U5 review", "Snapdragon 695 budget phone"],
    question_keywords: ["Does iQOO U5 have fast charging?", "Is iQOO U5 good for gaming?"],
    meta_title: "iQOO U5 Price, Specs, Snapdragon 695 & Review",
    meta_description: "Discover the full specifications, battery life test, and expert review of the budget-friendly iQOO U5 featuring a 120Hz display and Snapdragon 695.",
    meta_keywords: "iQOO U5, iQOO U5 price, iQOO U5 specs, Snapdragon 695, budget phone, 5000mAh",
    seo_slug: "iqoo-u5",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-u5",
    og_title: "iQOO U5: Entry-Level 5G Performance",
    og_description: "Explore the iQOO U5. Snapdragon 695, 120Hz LCD, and a 5000mAh battery. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-u5.jpg",
    twitter_title: "iQOO U5 Price & Specs",
    twitter_description: "Snapdragon 695, 120Hz LCD, and 50MP Camera. Check out the iQOO U5.",
    
    seo_status: "Green",
    seo_score: 88,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO U5x",
    slug: "iqoo-u5x",
    brand_name: "iQOO",
    price_usd: 140,
    price_official: 140,
    is_official: true,
    release_date: "March 2022",
    release_date_parsed: new Date("2022-03-24"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Dark Blue", "Light Blue"],
    model_number: "V2180A",
    made_in: "China",
    phone_variants: "4GB/128GB, 8GB/128GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-u5x.jpg"
    ],
    
    chipset_highlight: "Snapdragon 680",
    camera_highlight: "13MP Dual",
    display_highlight: "6.51\" 60Hz IPS LCD",
    battery_highlight: "5000mAh, 10W",
    benchmark_highlight: "250,000+ AnTuTu",
    
    processor: "Qualcomm SM6225 Snapdragon 680 4G (6 nm)",
    weight: "179 g (6.31 oz)",
    dimensions: "164 x 75.2 x 8.3 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "IPS LCD",
    screen_size: "6.51 inches, 102.3 cm2 (~82.8% screen-to-body ratio)",
    resolution: "720 x 1600 pixels",
    refresh_rate: "60Hz",
    brightness: "400 nits (typ)",
    hdr: "Not Supported",
    protection: "Scratch-resistant glass",
    pixel_density: "~270 ppi density",
    
    cpu: "Octa-core (4x2.4 GHz Kryo 265 Gold & 4x1.9 GHz Kryo 265 Silver)",
    gpu: "Adreno 610",
    fabrication: "6 nm",
    ram_variants: "4GB, 8GB",
    storage_variants: "128GB",
    storage_type: "UFS 2.2",
    geekbench_score: "1400 (v5)",
    cooling_system: "Graphite Sheet",
    
    cam_count: "Dual",
    cam_main_sensor: "13 MP, f/2.2, (wide), AF",
    cam_ultrawide: "Not Supported",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (macro)",
    cam_ois: "Not Supported",
    cam_flash: "LED flash",
    cam_video: "1080p@30fps",
    
    cam_front_resolution: "8 MP, f/2.0, (wide)",
    cam_front_hdr: "Not Supported",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5000 mAh, non-removable",
    charging_wired: "10W wired",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "microUSB 2.0, OTG",
    
    has_5g: false,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band",
    bluetooth_version: "5.0, A2DP, LE",
    has_nfc: false,
    gps_specs: "GPS, GLONASS, GALILEO, BDS",
    has_ir_blaster: false,
    has_audio_jack: true,
    usb_version: "2.0",
    
    sensor_fingerprint: "Side-mounted",
    has_gyroscope: false,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 11",
    ui_version: "OriginOS Ocean",
    update_policy: "1 Year OS Updates",
    ai_features: [],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The iQOO U5x is the most stripped-down, basic phone in iQOO's entire lineup. Released to hit an absolute bottom-tier price point, it abandons 5G connectivity entirely in favor of the older Snapdragon 680 4G processor. Its most significant drawback is the display, which is a 720p 60Hz LCD—a rarity even in the modern budget segment.\n\nFurthermore, the device clings to the obsolete microUSB standard instead of USB-C, and it charges at an agonizingly slow 10W. It does feature a large 5000mAh battery, which, combined with the low-resolution screen and efficient 6nm processor, results in truly phenomenal multi-day battery life. The U5x is strictly for users whose only requirement is that their phone turns on and lasts forever on a single charge.",
    key_highlights: [
      "Phenomenal multi-day battery life thanks to the 5000mAh cell and low-res screen.",
      "Snapdragon 680 offers basic, efficient 4G performance.",
      "Dedicated microSD card slot for expanding storage.",
      "Retains the 3.5mm headphone jack."
    ],
    verdict: "The iQOO U5x is extremely difficult to recommend. The presence of a microUSB port, 10W charging, and a 720p 60Hz screen make it feel like a phone from 2017 rather than 2022. It is purely a budget battery phone.",
    pros: [
      "Incredible battery life",
      "Has a headphone jack and dedicated microSD slot",
      "Very cheap"
    ],
    cons: [
      "Uses an obsolete microUSB port",
      "Painfully slow 10W charging",
      "720p 60Hz screen",
      "Very basic 13MP camera",
      "No 5G support"
    ],
    
    faqs: [
      { question: "Does the iQOO U5x have a USB-C port?", answer: "No, shockingly, it uses the outdated microUSB port." },
      { question: "Is the iQOO U5x good for gaming?", answer: "No, it is barely capable of running modern 3D games due to the weak GPU and 60Hz 720p screen." }
    ],
    
    primary_keyword: "iQOO U5x price",
    secondary_keywords: ["iQOO U5x specs", "iQOO U5x review", "Snapdragon 680 phone budget"],
    question_keywords: ["Does iQOO U5x have USB-C?", "Does iQOO U5x support fast charging?"],
    meta_title: "iQOO U5x Price, Specs, Battery Test & Review",
    meta_description: "Discover the full specifications, incredible battery life, and expert review of the ultra-budget iQOO U5x featuring the Snapdragon 680.",
    meta_keywords: "iQOO U5x, iQOO U5x price, iQOO U5x specs, Snapdragon 680, ultra-budget phone, 5000mAh",
    seo_slug: "iqoo-u5x",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-u5x",
    og_title: "iQOO U5x: Maximum Battery, Minimal Features",
    og_description: "Explore the iQOO U5x. Snapdragon 680, 5000mAh battery, and a 720p display. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-u5x.jpg",
    twitter_title: "iQOO U5x Price & Specs",
    twitter_description: "Snapdragon 680, 720p LCD, and 5000mAh. Check out the iQOO U5x.",
    
    seo_status: "Green",
    seo_score: 87,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO U3",
    slug: "iqoo-u3",
    brand_name: "iQOO",
    price_usd: 230,
    price_official: 230,
    is_official: true,
    release_date: "December 2020",
    release_date_parsed: new Date("2020-12-14"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Black", "Aurora"],
    model_number: "V2061A",
    made_in: "China",
    phone_variants: "6GB/128GB, 8GB/128GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-u3.jpg"
    ],
    
    chipset_highlight: "Dimensity 800U",
    camera_highlight: "48MP Dual",
    display_highlight: "6.58\" 90Hz IPS LCD",
    battery_highlight: "5000mAh, 18W",
    benchmark_highlight: "340,000+ AnTuTu",
    
    processor: "MediaTek MT6853V Dimensity 800U 5G (7 nm)",
    weight: "185.5 g (6.56 oz)",
    dimensions: "164.2 x 75.4 x 8.4 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "IPS LCD",
    screen_size: "6.58 inches, 104.3 cm2 (~84.4% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "90Hz",
    brightness: "460 nits (typ)",
    hdr: "HDR10",
    protection: "Scratch-resistant glass",
    pixel_density: "~400 ppi density",
    
    cpu: "Octa-core (2x2.4 GHz Cortex-A76 & 6x2.0 GHz Cortex-A55)",
    gpu: "Mali-G57 MC3",
    fabrication: "7 nm",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB",
    storage_type: "UFS 2.2",
    geekbench_score: "1800 (v5)",
    cooling_system: "Liquid Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "48 MP, f/1.8, 25mm (wide), 1/2.0\", 0.8µm, PDAF",
    cam_ultrawide: "Not Supported",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (depth)",
    cam_ois: "Not Supported",
    cam_flash: "LED flash",
    cam_video: "4K@30fps, 1080p@30fps",
    
    cam_front_resolution: "20 MP, f/2.0, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5000 mAh, non-removable",
    charging_wired: "18W wired",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band",
    bluetooth_version: "5.1, A2DP, LE",
    has_nfc: false,
    gps_specs: "GPS, GLONASS, GALILEO, BDS",
    has_ir_blaster: false,
    has_audio_jack: true,
    usb_version: "2.0",
    
    sensor_fingerprint: "Side-mounted",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 10",
    ui_version: "iQOO UI",
    update_policy: "No Guaranteed Updates",
    ai_features: [],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "Released at the end of 2020, the iQOO U3 was an early pioneer in bringing 5G connectivity to the budget segment via the MediaTek Dimensity 800U processor. It offered surprisingly robust performance for its time, handling multitasking and casual gaming significantly better than many of its 4G competitors. \n\nIt features a 90Hz IPS LCD screen with a waterdrop notch, an aesthetic that was already aging in 2020 but helped keep costs down. The 48MP main camera takes acceptable photos in daylight, and the inclusion of a high-resolution 20MP selfie camera was a nice touch. Paired with a 5000mAh battery, it was a practical, workhorse phone, though its slow 18W charging makes it feel ancient by modern standards.",
    key_highlights: [
      "Early adopter of budget 5G via the Dimensity 800U processor.",
      "Smooth 90Hz IPS LCD display.",
      "High-resolution 20MP front-facing selfie camera.",
      "Large 5000mAh battery.",
      "Capable 48MP primary rear camera."
    ],
    verdict: "The iQOO U3 is a relic of the early 5G budget era. While the Dimensity 800U provided great performance back in 2020, the phone's waterdrop notch, LCD screen, and slow 18W charging make it obsolete today.",
    pros: [
      "Dimensity 800U still provides decent performance",
      "Good 20MP selfie camera",
      "Great battery life",
      "Has a headphone jack"
    ],
    cons: [
      "Outdated waterdrop notch design",
      "Slow 18W charging",
      "Launched with ancient Android 10",
      "No ultrawide camera"
    ],
    
    faqs: [
      { question: "Is the iQOO U3 a 5G phone?", answer: "Yes, it supports 5G networks thanks to the Dimensity 800U processor." },
      { question: "Does the iQOO U3 support fast charging?", answer: "It supports 18W charging, which is very slow for a 5000mAh battery." }
    ],
    
    primary_keyword: "iQOO U3 price",
    secondary_keywords: ["iQOO U3 specs", "iQOO U3 review", "Dimensity 800U phone"],
    question_keywords: ["Is iQOO U3 5G?", "Does iQOO U3 have AMOLED?"],
    meta_title: "iQOO U3 Price, Specs, Dimensity 800U & Review",
    meta_description: "Discover the full specifications, battery life test, and retro review of the 5G-capable iQOO U3 featuring a 90Hz display.",
    meta_keywords: "iQOO U3, iQOO U3 price, iQOO U3 specs, Dimensity 800U, budget 5G phone, 5000mAh",
    seo_slug: "iqoo-u3",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-u3",
    og_title: "iQOO U3: The Budget 5G Pioneer",
    og_description: "Explore the iQOO U3. Dimensity 800U, 90Hz LCD, and a 5000mAh battery. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-u3.jpg",
    twitter_title: "iQOO U3 Price & Specs",
    twitter_description: "Dimensity 800U, 90Hz LCD, and 48MP Camera. Check out the iQOO U3.",
    
    seo_status: "Green",
    seo_score: 87,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },

  // --- UPCOMING LEAKS ---
  {
    name: "iQOO 14",
    slug: "iqoo-14",
    brand_name: "iQOO",
    price_usd: 800,
    price_official: 800,
    is_official: false,
    release_date: "Expected Late 2026",
    release_date_parsed: new Date("2026-12-01"),
    is_published: true,
    is_featured: true,
    upcoming: true,
    colors: ["Black", "White", "BMW M Motorsport Edition"],
    model_number: "Upcoming",
    made_in: "China",
    phone_variants: "12GB/256GB, 16GB/512GB, 16GB/1TB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-12.jpg" // Placeholder using 12's image style
    ],
    
    chipset_highlight: "Snapdragon 8 Elite 2",
    camera_highlight: "50MP Triple (Periscope)",
    display_highlight: "6.8\" 165Hz 2K OLED",
    battery_highlight: "7000mAh, 120W Fast",
    benchmark_highlight: "3,500,000+ AnTuTu (Est.)",
    
    processor: "Qualcomm Snapdragon 8 Elite 2 (Rumored)",
    weight: "Unknown",
    dimensions: "Unknown",
    build_material: "Glass front, aluminum frame, glass/leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "IP68/IP69 dust/water resistant (Rumored)",
    
    display_type: "OLED, 1B colors, Micro-Quad-Curved",
    screen_size: "6.8 inches (Expected)",
    resolution: "1440 x 3200 pixels (2K)",
    refresh_rate: "165Hz",
    brightness: "5000 nits (peak)",
    hdr: "HDR10+, Dolby Vision",
    protection: "Gorilla Glass Armor (Rumored)",
    pixel_density: "~515 ppi density",
    
    cpu: "Next-Gen Oryon Cores",
    gpu: "Next-Gen Adreno",
    fabrication: "3 nm",
    ram_variants: "12GB, 16GB",
    storage_variants: "256GB, 512GB, 1TB",
    storage_type: "UFS 4.0",
    geekbench_score: "N/A",
    cooling_system: "Dual Vapor Chamber Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, (wide), PDAF, OIS (Rumored)",
    cam_ultrawide: "50 MP, (ultrawide)",
    cam_telephoto: "50 MP, (periscope telephoto), 3x optical zoom, OIS",
    cam_macro: "Supported via Ultrawide",
    cam_ois: "OIS on Main and Telephoto",
    cam_flash: "Dual-LED flash, RGB Aura Light",
    cam_video: "8K@30fps, 4K@30/60/120fps",
    
    cam_front_resolution: "32 MP, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "4K@30fps",
    
    battery_capacity: "7000 mAh, non-removable (Rumored Solid-State)",
    charging_wired: "120W wired",
    charging_wireless: "50W wireless (Rumored for Pro variant)",
    charging_reverse: "10W reverse wireless",
    charger_included: true,
    usb_type: "USB Type-C 3.2, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6e/7",
    bluetooth_version: "5.4, aptX Lossless",
    has_nfc: true,
    gps_specs: "GPS (L1+L5), GLONASS, GALILEO, BDS",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "3.2",
    
    sensor_fingerprint: "Ultrasonic under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 15 (Expected)",
    ui_version: "OriginOS 6",
    update_policy: "4 Years OS Updates (Expected)",
    ai_features: ["Next-Gen Generative AI", "AI Game Frame Interpolation"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    seo_overview: "The highly anticipated iQOO 14 is shaping up to be an absolute monster in the flagship killer segment. According to the latest leaks and rumors, it is expected to launch in late 2026 featuring Qualcomm's next-generation Snapdragon 8 Elite 2 processor. This will make it one of the most powerful gaming phones on the planet. \n\nRumors suggest a breathtaking 6.8-inch 165Hz 2K OLED micro-quad-curved display. Perhaps the most mind-blowing leak is regarding its battery: industry insiders claim the iQOO 14 will feature a revolutionary 7000mAh semi-solid-state battery while maintaining a thin profile, supported by 120W wired charging. It is also expected to sport a versatile triple 50MP camera setup, including a periscope telephoto lens on the Pro model. We will update this page as more official information becomes available.",
    key_highlights: [
      "Rumored to feature the ultra-powerful Snapdragon 8 Elite 2 processor.",
      "Expected to pack a massive 7000mAh semi-solid-state battery.",
      "165Hz 2K OLED micro-quad-curved display for elite gaming.",
      "Triple 50MP camera system, possibly including a periscope lens.",
      "Expected to feature an ultrasonic under-display fingerprint scanner."
    ],
    verdict: "If the rumors hold true, the iQOO 14 will redefine battery life in flagship smartphones with its 7000mAh capacity while offering unparalleled Snapdragon 8 Elite 2 gaming performance.",
    pros: [
      "Rumored 7000mAh battery is revolutionary",
      "Next-gen Snapdragon 8 Elite 2 performance",
      "165Hz 2K display",
      "Ultrasonic fingerprint scanner"
    ],
    cons: [
      "Not yet officially announced",
      "May be very heavy with a 7000mAh battery",
      "Global availability may be limited initially"
    ],
    
    faqs: [
      { question: "When will the iQOO 14 be released?", answer: "Based on previous release cycles, the iQOO 14 is expected to be announced in China in late 2026, with a global release following shortly after." },
      { question: "Will the iQOO 14 have a 7000mAh battery?", answer: "Current leaks heavily suggest iQOO is working on a 7000mAh semi-solid-state battery for the iQOO 14, though this is not yet officially confirmed." }
    ],
    
    primary_keyword: "iQOO 14 leaks",
    secondary_keywords: ["iQOO 14 specs", "iQOO 14 release date", "iQOO 14 rumors", "Snapdragon 8 Elite 2 phone"],
    question_keywords: ["When will iQOO 14 launch?", "Does iQOO 14 have 7000mAh battery?"],
    meta_title: "iQOO 14 Leaks, Rumored Specs, Release Date & 7000mAh Battery",
    meta_description: "Get the latest leaks, rumored specifications, and expected release date for the upcoming iQOO 14, featuring the Snapdragon 8 Elite 2 and a massive 7000mAh battery.",
    meta_keywords: "iQOO 14, iQOO 14 leaks, iQOO 14 rumors, iQOO 14 specs, Snapdragon 8 Elite 2, 7000mAh battery",
    seo_slug: "iqoo-14",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-14",
    og_title: "iQOO 14: Leaks, Rumors & Specs",
    og_description: "Discover the latest rumors regarding the iQOO 14. Snapdragon 8 Elite 2, 165Hz OLED, and a 7000mAh battery.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-12.jpg",
    twitter_title: "iQOO 14 Leaks & Expected Specs",
    twitter_description: "Snapdragon 8 Elite 2 and 7000mAh. Read the latest iQOO 14 rumors.",
    
    seo_status: "Green",
    seo_score: 95,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Neo 11",
    slug: "iqoo-neo-11",
    brand_name: "iQOO",
    price_usd: 500,
    price_official: 500,
    is_official: false,
    release_date: "Expected Mid 2026",
    release_date_parsed: new Date("2026-06-30"),
    is_published: true,
    is_featured: true,
    upcoming: true,
    colors: ["Neon Green", "Carbon Black", "Speed Blue"],
    model_number: "Upcoming",
    made_in: "China",
    phone_variants: "12GB/256GB, 16GB/512GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo9-pro-.jpg" // Placeholder
    ],
    
    chipset_highlight: "Snapdragon 8 Elite",
    camera_highlight: "50MP Dual OIS",
    display_highlight: "6.82\" 144Hz 2K OLED",
    battery_highlight: "7500mAh, 100W Fast",
    benchmark_highlight: "3,000,000+ AnTuTu",
    
    processor: "Qualcomm Snapdragon 8 Elite (SM8750-AC) (3 nm)",
    weight: "Unknown",
    dimensions: "Unknown",
    build_material: "Glass front, metal middle frame, glass/plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "IP68/IP69 dust and water resistant",
    
    display_type: "OLED, 1B colors, Flat",
    screen_size: "6.82 inches",
    resolution: "1440 x 3168 pixels (2K)",
    refresh_rate: "144Hz",
    brightness: "4500 nits (peak)",
    hdr: "HDR10+",
    protection: "Scratch-resistant glass",
    pixel_density: "~510 ppi density",
    
    cpu: "Next-Gen Octa-Core",
    gpu: "Adreno 830",
    fabrication: "3 nm",
    ram_variants: "12GB, 16GB",
    storage_variants: "256GB, 512GB",
    storage_type: "UFS 4.0",
    geekbench_score: "N/A",
    cooling_system: "Dual VC Liquid Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "50 MP, (wide), PDAF, OIS",
    cam_ultrawide: "8 MP, (ultrawide)",
    cam_telephoto: "Not Supported",
    cam_macro: "Not Supported",
    cam_ois: "OIS on Main Camera",
    cam_flash: "Dual-LED flash",
    cam_video: "4K@30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "7500 mAh, semi-solid-state, non-removable",
    charging_wired: "100W wired",
    charging_wireless: "Not Supported",
    charging_reverse: "10W reverse wired",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/7",
    bluetooth_version: "5.4, aptX HD",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, BDS",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Ultrasonic under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 16",
    ui_version: "OriginOS 6",
    update_policy: "3 Years OS Updates",
    ai_features: ["Independent Graphics Chip"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The highly anticipated iQOO Neo 11 is poised to disrupt the sub-flagship market with an incredible focus on endurance and raw performance. Leaks indicate it will be powered by the 3nm Snapdragon 8 Elite processor, ensuring top-tier frame rates in the most demanding mobile games. It will feature a stunning 6.82-inch flat 2K OLED display with a 144Hz refresh rate, catering directly to competitive gamers.\n\nThe most mind-boggling leaked specification is its battery: the Neo 11 is rumored to feature an absolutely massive 7,500mAh semi-solid-state battery capable of surviving extreme temperatures (-20°C to 40°C), supported by 100W fast charging. It will also reportedly feature an IP68/69 rating and an ultrasonic fingerprint scanner, features normally reserved for ultra-premium devices. This page will be updated as official announcements are made.",
    key_highlights: [
      "Leaked to feature an enormous 7,500mAh semi-solid-state battery.",
      "Powered by the 3nm Snapdragon 8 Elite processor.",
      "6.82-inch flat 2K OLED display with a 144Hz refresh rate.",
      "Ultrasonic under-display fingerprint scanner.",
      "IP68/69 rating for extreme dust and water resistance."
    ],
    verdict: "If the rumors are accurate, the iQOO Neo 11 will be the ultimate gaming phone for users who hate charging. A 7500mAh battery combined with the Snapdragon 8 Elite is a gamer's dream.",
    pros: [
      "Rumored 7500mAh battery is game-changing",
      "Snapdragon 8 Elite performance",
      "Flat 2K OLED screen is perfect for gaming",
      "Ultrasonic fingerprint scanner"
    ],
    cons: [
      "Not officially released yet",
      "Only an 8MP ultrawide camera",
      "May be a heavy device"
    ],
    
    faqs: [
      { question: "Will the iQOO Neo 11 have a 7500mAh battery?", answer: "Current industry leaks strongly suggest the Neo 11 will utilize a new semi-solid-state battery technology to fit 7500mAh into a standard smartphone chassis." },
      { question: "Is the iQOO Neo 11 screen flat or curved?", answer: "According to leaks, it will feature a flat 6.82-inch 2K OLED display, which is heavily preferred by gamers." }
    ],
    
    primary_keyword: "iQOO Neo 11 leaks",
    secondary_keywords: ["iQOO Neo 11 specs", "iQOO Neo 11 release date", "iQOO Neo 11 rumors", "7500mAh battery phone"],
    question_keywords: ["When is iQOO Neo 11 releasing?", "Does iQOO Neo 11 have Snapdragon 8 Elite?"],
    meta_title: "iQOO Neo 11 Leaks, Rumored Specs & 7500mAh Battery",
    meta_description: "Get the latest leaks, rumored specifications, and release date details for the upcoming iQOO Neo 11, featuring the Snapdragon 8 Elite and a 7500mAh battery.",
    meta_keywords: "iQOO Neo 11, iQOO Neo 11 leaks, iQOO Neo 11 rumors, iQOO Neo 11 specs, Snapdragon 8 Elite, 7500mAh battery",
    seo_slug: "iqoo-neo-11",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-neo-11",
    og_title: "iQOO Neo 11: 7500mAh Gaming Beast Leaks",
    og_description: "Discover the latest rumors regarding the iQOO Neo 11. Snapdragon 8 Elite, 144Hz OLED, and a 7500mAh battery.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo9-pro-.jpg",
    twitter_title: "iQOO Neo 11 Leaks & Expected Specs",
    twitter_description: "Snapdragon 8 Elite and 7500mAh. Read the latest iQOO Neo 11 rumors.",
    
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

    const brand = await Brand.findOne({ slug: "iqoo" });
    if (!brand) throw new Error("iQOO brand not found");

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

    console.log("Batch 4 (U Series & Upcoming) seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
