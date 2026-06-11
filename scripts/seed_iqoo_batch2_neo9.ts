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
    name: "iQOO Neo 9S Pro+",
    slug: "iqoo-neo-9s-pro-plus",
    brand_name: "iQOO",
    price_usd: 420,
    price_official: 420,
    is_official: true,
    release_date: "July 2024",
    release_date_parsed: new Date("2024-07-11"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Buff Blue", "Star White", "Fighting Black"],
    model_number: "V2403A",
    made_in: "China",
    phone_variants: "12GB/256GB, 16GB/256GB, 12GB/512GB, 16GB/512GB, 16GB/1TB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo9s-pro-plus.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8 Gen 3",
    camera_highlight: "50MP Dual OIS",
    display_highlight: "6.78\" 144Hz LTPO AMOLED",
    battery_highlight: "5500mAh, 120W Fast",
    benchmark_highlight: "2,050,000+ AnTuTu",
    
    processor: "Qualcomm SM8650-AB Snapdragon 8 Gen 3 (4 nm)",
    weight: "193 g or 198 g (6.81 oz)",
    dimensions: "163.5 x 75.7 x 8.0 mm or 8.3 mm",
    build_material: "Glass front, plastic frame, glass or vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "LTPO AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~89.7% screen-to-body ratio)",
    resolution: "1260 x 2800 pixels",
    refresh_rate: "144Hz",
    brightness: "1400 nits (HBM)",
    hdr: "HDR10+",
    protection: "Scratch-resistant glass",
    pixel_density: "~453 ppi density",
    
    cpu: "Octa-core (1x3.3 GHz Cortex-X4 & 3x3.2 GHz Cortex-A720 & 2x3.0 GHz Cortex-A720 & 2x2.3 GHz Cortex-A520)",
    gpu: "Adreno 750",
    fabrication: "4 nm",
    ram_variants: "12GB, 16GB",
    storage_variants: "256GB, 512GB, 1TB",
    storage_type: "UFS 4.0",
    geekbench_score: "6800 (v6)",
    cooling_system: "6K VC Liquid Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "50 MP, f/1.9, (wide), 1/1.56\", PDAF, OIS",
    cam_ultrawide: "50 MP, f/2.0, 119˚ (ultrawide), AF",
    cam_telephoto: "Not Supported",
    cam_macro: "Supported via ultrawide",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "8K, 4K, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5500 mAh, non-removable",
    charging_wired: "120W wired (1-70% in 17 min, 100% in 28 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Reverse wired",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6/7, dual-band",
    bluetooth_version: "5.4, A2DP, LE, aptX HD, aptX Adaptive, aptX Lossless",
    has_nfc: true,
    gps_specs: "GPS (L1+L5), BDS, GALILEO, QZSS, GLONASS",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Ultrasonic under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 14",
    ui_version: "OriginOS 4",
    update_policy: "3 Years OS Updates",
    ai_features: ["Game Frame Interpolation", "AI Photography"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "Released in July 2024, the iQOO Neo 9S Pro+ redefines the 'flagship killer' category by offering the absolute pinnacle of Android performance at a remarkably aggressive price point. Powered by the Qualcomm Snapdragon 8 Gen 3 processor, this phone matches devices that cost twice as much in raw gaming capability. It boasts a flat 6.78-inch LTPO AMOLED display with a 144Hz refresh rate, paired with iQOO's proprietary Q1 gaming chip for seamless frame interpolation.\n\nBeyond performance, the Neo 9S Pro+ packs a massive 5500mAh battery that easily provides all-day endurance even under heavy gaming loads, and it can be rapidly topped up using the included 120W FlashCharge adapter. It also features a significant upgrade to its security hardware, utilizing a 3D ultrasonic under-display fingerprint sensor—a feature usually reserved for ultra-premium flagships. With a dual 50MP rear camera system, it represents one of the most balanced and powerful smartphones of 2024.",
    key_highlights: [
      "Top-tier Snapdragon 8 Gen 3 performance.",
      "Large 5500mAh battery with 120W wired charging.",
      "Fast and secure 3D Ultrasonic fingerprint scanner.",
      "Flat 144Hz LTPO AMOLED display perfect for gaming.",
      "Dual 50MP camera setup with OIS."
    ],
    verdict: "The iQOO Neo 9S Pro+ is simply one of the best value-for-money smartphones on the market. By combining the Snapdragon 8 Gen 3, a massive battery, and an ultrasonic fingerprint sensor at this price point, iQOO has created an unbeatable package for gamers and power users.",
    pros: [
      "Unmatched performance for the price",
      "Ultrasonic fingerprint scanner is incredibly fast",
      "Massive 5500mAh battery",
      "Very fast 120W charging",
      "Great main and ultrawide cameras"
    ],
    cons: [
      "Plastic frame to keep costs down",
      "No telephoto lens",
      "No wireless charging",
      "Exclusive to the Chinese market initially"
    ],
    
    faqs: [
      { question: "What processor does the iQOO Neo 9S Pro+ use?", answer: "It is powered by the top-tier Qualcomm Snapdragon 8 Gen 3 processor, ensuring maximum performance for all modern mobile games." },
      { question: "Does the iQOO Neo 9S Pro+ have an ultrasonic fingerprint scanner?", answer: "Yes, it uses an advanced 3D ultrasonic fingerprint scanner which is faster and more accurate than standard optical scanners, even when your fingers are wet." },
      { question: "How large is the battery in the Neo 9S Pro+?", answer: "It features a very large 5500mAh battery, providing excellent battery life despite the powerful processor." }
    ],
    
    primary_keyword: "iQOO Neo 9S Pro+ price",
    secondary_keywords: ["iQOO Neo 9S Pro+ specs", "iQOO Neo 9S Pro+ review", "iQOO Neo 9S Pro+ gaming", "iQOO Neo 9S Pro+ antutu", "Snapdragon 8 Gen 3 phone"],
    question_keywords: ["Is iQOO Neo 9S Pro+ good for gaming?", "Does Neo 9S Pro+ have ultrasonic fingerprint?", "How fast does Neo 9S Pro+ charge?"],
    meta_title: "iQOO Neo 9S Pro+ Price, Specs, Snapdragon 8 Gen 3 & Review",
    meta_description: "Discover the full specifications, 120W charging test, ultrasonic fingerprint features, and expert review of the iQOO Neo 9S Pro+ on TechTweak.",
    meta_keywords: "iQOO Neo 9S Pro+, iQOO Neo 9S Pro+ price, iQOO Neo 9S Pro+ specs, Snapdragon 8 Gen 3, 120W charging, ultrasonic fingerprint",
    seo_slug: "iqoo-neo-9s-pro-plus",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-neo-9s-pro-plus",
    og_title: "iQOO Neo 9S Pro+: The Ultimate Snapdragon 8 Gen 3 Value",
    og_description: "Explore the iQOO Neo 9S Pro+. Snapdragon 8 Gen 3, 5500mAh battery, and ultrasonic fingerprint. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo9s-pro-plus.jpg",
    twitter_title: "iQOO Neo 9S Pro+ Price & Specs: Elite Flagship Killer",
    twitter_description: "Snapdragon 8 Gen 3, 144Hz OLED, and 120W charging. Check out the iQOO Neo 9S Pro+.",
    
    seo_status: "Green",
    seo_score: 96,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Neo 9S Pro",
    slug: "iqoo-neo-9s-pro",
    brand_name: "iQOO",
    price_usd: 375,
    price_official: 375,
    is_official: true,
    release_date: "May 2024",
    release_date_parsed: new Date("2024-05-20"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["White", "Black", "Red/White (Leather)"],
    model_number: "V2339A",
    made_in: "China",
    phone_variants: "12GB/256GB, 16GB/256GB, 12GB/512GB, 16GB/512GB, 16GB/1TB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo9s-pro.jpg"
    ],
    
    chipset_highlight: "Dimensity 9300+",
    camera_highlight: "50MP Dual OIS",
    display_highlight: "6.78\" 144Hz LTPO AMOLED",
    battery_highlight: "5160mAh, 120W Fast",
    benchmark_highlight: "2,100,000+ AnTuTu",
    
    processor: "Mediatek Dimensity 9300+ (4 nm)",
    weight: "190 g or 196 g (6.70 oz)",
    dimensions: "163.5 x 75.7 x 8 mm or 8.3 mm",
    build_material: "Glass front, plastic frame, glass or vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "LTPO AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~89.7% screen-to-body ratio)",
    resolution: "1260 x 2800 pixels",
    refresh_rate: "144Hz",
    brightness: "1400 nits (HBM)",
    hdr: "HDR10+",
    protection: "Scratch-resistant glass",
    pixel_density: "~453 ppi density",
    
    cpu: "Octa-core (1x3.4 GHz Cortex-X4 & 3x2.85 GHz Cortex-X4 & 4x2.0 GHz Cortex-A720)",
    gpu: "Immortalis-G720 MC12",
    fabrication: "4 nm",
    ram_variants: "12GB, 16GB",
    storage_variants: "256GB, 512GB, 1TB",
    storage_type: "UFS 4.0",
    geekbench_score: "7000 (v6)",
    cooling_system: "6K VC Liquid Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "50 MP, f/1.9, (wide), 1/1.49\", PDAF, OIS",
    cam_ultrawide: "50 MP, f/2.0, 119˚ (ultrawide), AF",
    cam_telephoto: "Not Supported",
    cam_macro: "Supported via ultrawide",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "8K, 4K, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5160 mAh, non-removable",
    charging_wired: "120W wired (40% in 9 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Reverse wired",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6/7, dual-band",
    bluetooth_version: "5.4, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: true,
    gps_specs: "GPS (L1+L5), BDS, GALILEO, QZSS, GLONASS",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 14",
    ui_version: "OriginOS 4",
    update_policy: "3 Years OS Updates",
    ai_features: ["Game Frame Interpolation"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO Neo 9S Pro acts as a formidable, slightly more affordable sibling to the Neo 9S Pro+. Instead of utilizing a Qualcomm chip, it leverages the beastly MediaTek Dimensity 9300+ processor. Known for its unique 'all-big-core' architecture, the Dimensity 9300+ delivers some of the highest multi-core benchmark scores on the Android platform, making it exceptionally proficient at handling heavy multitasking and prolonged gaming sessions without dropping frames.\n\nIt features the exact same visually stunning 6.78-inch 144Hz LTPO AMOLED display found on the Plus model, ensuring a vibrant and incredibly responsive user interface. To keep costs competitive, the Neo 9S Pro opts for a slightly smaller 5160mAh battery (though still larger than most flagships) and utilizes a standard optical under-display fingerprint scanner rather than an ultrasonic one. With its dual 50MP camera setup and blazing 120W fast charging, it stands as an incredible value proposition.",
    key_highlights: [
      "MediaTek Dimensity 9300+ with 'all-big-core' architecture.",
      "Vibrant 6.78-inch 144Hz LTPO AMOLED flat display.",
      "Dual 50MP rear camera system with OIS.",
      "Large 5160mAh battery with 120W wired charging.",
      "Wi-Fi 7 and Bluetooth 5.4 support."
    ],
    verdict: "If you prioritize raw CPU performance and multitasking over specific Qualcomm-exclusive features, the iQOO Neo 9S Pro with its Dimensity 9300+ is an absolute steal. It delivers flagship-level performance and charging for a mid-range price.",
    pros: [
      "Incredible CPU performance from the Dimensity 9300+",
      "Stunning 144Hz LTPO display",
      "Great battery life despite the powerful chip",
      "Very fast 120W charging",
      "Excellent value for money"
    ],
    cons: [
      "No ultrasonic fingerprint scanner (uses standard optical)",
      "Plastic frame",
      "No telephoto lens",
      "No official IP rating"
    ],
    
    faqs: [
      { question: "What is the difference between Neo 9S Pro and Neo 9S Pro+?", answer: "The Neo 9S Pro+ uses a Snapdragon 8 Gen 3, a larger 5500mAh battery, and an ultrasonic fingerprint scanner. The Neo 9S Pro uses the Dimensity 9300+, a 5160mAh battery, and an optical fingerprint scanner." },
      { question: "Is the Dimensity 9300+ good for gaming?", answer: "Absolutely. With an 'all-big-core' design, it offers raw performance that frequently matches or exceeds the Snapdragon 8 Gen 3 in certain benchmarks, making it perfect for gaming." },
      { question: "Does the iQOO Neo 9S Pro have wireless charging?", answer: "No, to keep the price aggressive, iQOO omitted wireless charging from the Neo 9 series." }
    ],
    
    primary_keyword: "iQOO Neo 9S Pro price",
    secondary_keywords: ["iQOO Neo 9S Pro specs", "iQOO Neo 9S Pro review", "Dimensity 9300+ phone", "iQOO Neo 9S Pro vs Plus", "iQOO Neo 9S Pro gaming"],
    question_keywords: ["Is iQOO Neo 9S Pro good for gaming?", "Difference between Neo 9S Pro and Pro+?", "Does Neo 9S Pro overheat?"],
    meta_title: "iQOO Neo 9S Pro Price, Specs, Dimensity 9300+ & Review",
    meta_description: "Check out the full specifications, Dimensity 9300+ benchmark scores, battery life, and expert review of the iQOO Neo 9S Pro on TechTweak.",
    meta_keywords: "iQOO Neo 9S Pro, iQOO Neo 9S Pro price, iQOO Neo 9S Pro specs, Dimensity 9300+, 120W charging, gaming phone",
    seo_slug: "iqoo-neo-9s-pro",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-neo-9s-pro",
    og_title: "iQOO Neo 9S Pro: Dimensity 9300+ Performance Beast",
    og_description: "Explore the iQOO Neo 9S Pro. Dimensity 9300+, 144Hz AMOLED, and 120W charging. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo9s-pro.jpg",
    twitter_title: "iQOO Neo 9S Pro Price & Specs: CPU Powerhouse",
    twitter_description: "Dimensity 9300+, 144Hz OLED, and 120W charging. Check out the iQOO Neo 9S Pro.",
    
    seo_status: "Green",
    seo_score: 93,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Neo 9 Pro (China)",
    slug: "iqoo-neo-9-pro-china",
    brand_name: "iQOO",
    price_usd: 425,
    price_official: 425,
    is_official: true,
    release_date: "December 2023",
    release_date_parsed: new Date("2023-12-27"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Black", "Blue", "Red/White (Leather)"],
    model_number: "V2339A",
    made_in: "China",
    phone_variants: "12GB/256GB, 16GB/256GB, 16GB/512GB, 16GB/1TB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo9-pro.jpg"
    ],
    
    chipset_highlight: "Dimensity 9300",
    camera_highlight: "50MP Dual OIS",
    display_highlight: "6.78\" 144Hz LTPO AMOLED",
    battery_highlight: "5160mAh, 120W Fast",
    benchmark_highlight: "2,000,000+ AnTuTu",
    
    processor: "Mediatek Dimensity 9300 (4 nm)",
    weight: "190 g or 196 g (6.70 oz)",
    dimensions: "163.5 x 75.7 x 8 mm or 8.3 mm",
    build_material: "Glass front, plastic frame, glass or vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "LTPO AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~89.7% screen-to-body ratio)",
    resolution: "1260 x 2800 pixels",
    refresh_rate: "144Hz",
    brightness: "1400 nits (HBM)",
    hdr: "HDR10+",
    protection: "Scratch-resistant glass",
    pixel_density: "~453 ppi density",
    
    cpu: "Octa-core (1x3.25 GHz Cortex-X4 & 3x2.85 GHz Cortex-X4 & 4x2.0 GHz Cortex-A720)",
    gpu: "Immortalis-G720 MC12",
    fabrication: "4 nm",
    ram_variants: "12GB, 16GB",
    storage_variants: "256GB, 512GB, 1TB",
    storage_type: "UFS 4.0",
    geekbench_score: "6800 (v6)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "50 MP, f/1.5, (wide), 1/1.49\", PDAF, OIS",
    cam_ultrawide: "50 MP, f/2.0, 119˚ (ultrawide), AF",
    cam_telephoto: "Not Supported",
    cam_macro: "Supported via ultrawide",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "8K, 4K, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5160 mAh, non-removable",
    charging_wired: "120W wired (40% in 9 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Reverse wired",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6/7, dual-band",
    bluetooth_version: "5.4, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: true,
    gps_specs: "GPS (L1+L5), BDS, GALILEO, QZSS, GLONASS",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 14",
    ui_version: "OriginOS 4",
    update_policy: "3 Years OS Updates",
    ai_features: ["Game Frame Interpolation"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The original iQOO Neo 9 Pro was launched exclusively in the Chinese market in late 2023. This version is entirely distinct from the Indian version that launched months later. The Chinese Neo 9 Pro utilizes the incredibly powerful MediaTek Dimensity 9300 chipset, making it a computational monster capable of driving intense mobile games at 144Hz effortlessly. It also features a superior camera system compared to the global variants, boasting a dual 50MP rear camera setup—a 50MP main sensor paired with a high-resolution 50MP ultrawide lens.\n\nWith a large 5160mAh battery, users don't have to sacrifice longevity for performance, and the included 120W FlashCharge adapter ensures that the phone is never tethered to the wall for long. Sporting the brand's eye-catching dual-tone vegan leather design options, the original iQOO Neo 9 Pro remains a highly sought-after device for enthusiasts who want uncompromising MediaTek performance.",
    key_highlights: [
      "Powered by the MediaTek Dimensity 9300.",
      "Dual 50MP camera system (Main + Ultrawide).",
      "144Hz 6.78-inch LTPO AMOLED display.",
      "5160mAh battery with 120W fast charging.",
      "Eye-catching dual-tone leather design option."
    ],
    verdict: "The Chinese variant of the iQOO Neo 9 Pro is a phenomenal device. By opting for the Dimensity 9300 and a 50MP ultrawide camera, it arguably provides a superior experience to its global Snapdragon-powered counterpart. It is an easy recommendation for performance purists.",
    pros: [
      "Incredible CPU performance",
      "Superior 50MP ultrawide camera",
      "Vibrant 144Hz LTPO display",
      "Fast 120W charging"
    ],
    cons: [
      "Exclusive to China (no global ROM)",
      "Plastic frame",
      "No wireless charging"
    ],
    
    faqs: [
      { question: "Is the Chinese iQOO Neo 9 Pro different from the Indian one?", answer: "Yes. The Chinese version uses the MediaTek Dimensity 9300 and has a 50MP ultrawide camera. The Indian version uses the Snapdragon 8 Gen 2 and has an 8MP ultrawide camera." },
      { question: "Does it support 144Hz gaming?", answer: "Yes, the LTPO AMOLED display supports up to a 144Hz refresh rate, and the internal Q1 chip can interpolate game frames to achieve ultra-smooth gameplay." }
    ],
    
    primary_keyword: "iQOO Neo 9 Pro China price",
    secondary_keywords: ["iQOO Neo 9 Pro specs", "iQOO Neo 9 Pro review", "Dimensity 9300 phone", "iQOO Neo 9 Pro camera", "iQOO Neo 9 Pro China vs India"],
    question_keywords: ["Difference between Neo 9 Pro China and India?", "Is iQOO Neo 9 Pro good for gaming?"],
    meta_title: "iQOO Neo 9 Pro (China) Price, Specs & Dimensity 9300 Review",
    meta_description: "Discover the full specifications, Dimensity 9300 gaming performance, 50MP dual cameras, and expert review of the Chinese iQOO Neo 9 Pro on TechTweak.",
    meta_keywords: "iQOO Neo 9 Pro, iQOO Neo 9 Pro price, iQOO Neo 9 Pro China, Dimensity 9300, 120W charging, gaming phone",
    seo_slug: "iqoo-neo-9-pro-china",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-neo-9-pro-china",
    og_title: "iQOO Neo 9 Pro (China): Dimensity 9300 Flagship Killer",
    og_description: "Explore the Chinese iQOO Neo 9 Pro. Dimensity 9300, Dual 50MP cameras, and 120W charging. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo9-pro.jpg",
    twitter_title: "iQOO Neo 9 Pro Price & Specs",
    twitter_description: "Dimensity 9300, 144Hz OLED, and 120W charging. Check out the iQOO Neo 9 Pro.",
    
    seo_status: "Green",
    seo_score: 93,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Neo 9",
    slug: "iqoo-neo-9",
    brand_name: "iQOO",
    price_usd: 350,
    price_inr: 34999,
    price_official: 350,
    is_official: true,
    release_date: "December 2023",
    release_date_parsed: new Date("2023-12-27"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Black", "Blue", "Red/White (Leather)"],
    model_number: "V2338A",
    made_in: "China/India",
    phone_variants: "8GB/256GB, 12GB/256GB, 16GB/256GB, 16GB/512GB, 16GB/1TB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo9.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8 Gen 2",
    camera_highlight: "50MP Dual OIS",
    display_highlight: "6.78\" 144Hz LTPO AMOLED",
    battery_highlight: "5160mAh, 120W Fast",
    benchmark_highlight: "1,600,000+ AnTuTu",
    
    processor: "Qualcomm SM8550-AB Snapdragon 8 Gen 2 (4 nm)",
    weight: "190 g or 196 g (6.70 oz)",
    dimensions: "163.5 x 75.7 x 8 mm or 8.3 mm",
    build_material: "Glass front, plastic frame, glass or vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "LTPO AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~89.7% screen-to-body ratio)",
    resolution: "1260 x 2800 pixels",
    refresh_rate: "144Hz",
    brightness: "1400 nits (HBM)",
    hdr: "HDR10+",
    protection: "Scratch-resistant glass",
    pixel_density: "~453 ppi density",
    
    cpu: "Octa-core (1x3.2 GHz Cortex-X3 & 2x2.8 GHz Cortex-A715 & 2x2.8 GHz Cortex-A710 & 3x2.0 GHz Cortex-A510)",
    gpu: "Adreno 740",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB, 16GB",
    storage_variants: "256GB, 512GB, 1TB",
    storage_type: "UFS 4.0",
    geekbench_score: "5300 (v6)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "50 MP, f/1.9, (wide), 1/1.49\", PDAF, OIS",
    cam_ultrawide: "8 MP, f/2.2, 119˚ (ultrawide)",
    cam_telephoto: "Not Supported",
    cam_macro: "Supported via ultrawide",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "8K, 4K, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5160 mAh, non-removable",
    charging_wired: "120W wired (40% in 9 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Reverse wired",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6/7, dual-band",
    bluetooth_version: "5.3, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: true,
    gps_specs: "GPS (L1+L5), BDS, GALILEO, QZSS, GLONASS",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 14",
    ui_version: "OriginOS 4 (China), Funtouch 14 (International)",
    update_policy: "3 Years OS Updates",
    ai_features: ["Game Frame Interpolation"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO Neo 9 (also sold as the iQOO Neo 9 Pro in India) is widely considered one of the absolute best 'flagship killers' of its generation. By repurposing the highly successful Snapdragon 8 Gen 2 processor from the previous year's ultra-flagships, iQOO managed to hit an incredibly low price point without sacrificing stability or gaming performance. It pairs this reliable processor with a fantastic 6.78-inch 144Hz LTPO AMOLED display, making it incredibly responsive for competitive gamers.\n\nWhile its camera system isn't as robust as the Chinese Pro variant (it utilizes an 8MP ultrawide instead of a 50MP one), the 50MP main sensor with OIS performs admirably in all lighting conditions. The phone truly shines in the battery department, offering a large 5160mAh battery that easily outlasts the competition, coupled with blazing-fast 120W charging. For users looking for flagship-grade gaming on a budget, the iQOO Neo 9 is nearly flawless.",
    key_highlights: [
      "Snapdragon 8 Gen 2 processor offers phenomenal sustained performance.",
      "144Hz 6.78-inch LTPO AMOLED display.",
      "Large 5160mAh battery with rapid 120W wired charging.",
      "50MP primary camera with Optical Image Stabilization.",
      "Sold as the iQOO Neo 9 Pro in the Indian market."
    ],
    verdict: "The iQOO Neo 9 provides immense value. The Snapdragon 8 Gen 2 remains a phenomenally powerful and efficient chip, and combining it with a 144Hz display and 120W charging at this price point makes it an unbeatable deal for budget-conscious gamers.",
    pros: [
      "Exceptional gaming performance and stability",
      "Beautiful 144Hz LTPO display",
      "Very fast 120W charging",
      "Excellent main camera",
      "Great battery life"
    ],
    cons: [
      "Plastic frame",
      "Weak 8MP ultrawide camera",
      "No telephoto lens",
      "No wireless charging"
    ],
    
    faqs: [
      { question: "Is the iQOO Neo 9 the same as the iQOO Neo 9 Pro in India?", answer: "Yes, the standard iQOO Neo 9 released in China was rebranded and sold as the 'iQOO Neo 9 Pro' in the Indian market. They share the same Snapdragon 8 Gen 2 processor." },
      { question: "Is the iQOO Neo 9 good for gaming?", answer: "It is exceptional for gaming. The Snapdragon 8 Gen 2 is incredibly stable, and the 144Hz display ensures maximum fluidity." },
      { question: "How long does the battery last?", answer: "With a 5160mAh battery and a power-efficient processor, it easily lasts a full day of heavy use, and can be charged in under 30 minutes with the 120W charger." }
    ],
    
    primary_keyword: "iQOO Neo 9 price",
    secondary_keywords: ["iQOO Neo 9 specs", "iQOO Neo 9 review", "iQOO Neo 9 Pro India", "Snapdragon 8 Gen 2 phone", "iQOO Neo 9 gaming test"],
    question_keywords: ["Is iQOO Neo 9 same as Neo 9 Pro India?", "Does iQOO Neo 9 overheat?", "How fast is iQOO Neo 9 charging?"],
    meta_title: "iQOO Neo 9 Price, Specs, Snapdragon 8 Gen 2 & Review",
    meta_description: "Discover the full specifications, gaming performance, 120W charging test, and expert review of the iQOO Neo 9 (Neo 9 Pro India) on TechTweak.",
    meta_keywords: "iQOO Neo 9, iQOO Neo 9 price, iQOO Neo 9 specs, iQOO Neo 9 review, Snapdragon 8 Gen 2, 120W charging, gaming phone",
    seo_slug: "iqoo-neo-9",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-neo-9",
    og_title: "iQOO Neo 9: The Perfect Flagship Killer",
    og_description: "Explore the iQOO Neo 9. Snapdragon 8 Gen 2, 144Hz AMOLED, and 120W charging. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo9.jpg",
    twitter_title: "iQOO Neo 9 Price & Specs: Elite Gaming",
    twitter_description: "Snapdragon 8 Gen 2, 144Hz OLED, and 120W charging. Check out the iQOO Neo 9.",
    
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

    console.log("Batch 2 (Neo 9 Series) seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
