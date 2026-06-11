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
    name: "iQOO 9 Pro",
    slug: "iqoo-9-pro",
    brand_name: "iQOO",
    price_usd: 800,
    price_inr: 64990,
    price_official: 800,
    is_official: true,
    release_date: "January 2022",
    release_date_parsed: new Date("2022-01-12"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Legend (BMW M Motorsport)", "Dark Cruise", "Orange"],
    model_number: "V2172A, I2022",
    made_in: "China/India",
    phone_variants: "8GB/256GB, 12GB/256GB, 12GB/512GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-9-pro.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8 Gen 1",
    camera_highlight: "50MP Triple Gimbal OIS",
    display_highlight: "6.78\" 120Hz E5 AMOLED",
    battery_highlight: "4700mAh, 120W Fast",
    benchmark_highlight: "1,000,000+ AnTuTu",
    
    processor: "Qualcomm SM8450 Snapdragon 8 Gen 1 (4 nm)",
    weight: "204 g or 210 g (7.20 oz)",
    dimensions: "164.8 x 75.2 x 8.8 mm or 8.9 mm",
    build_material: "Glass front, aluminum frame, glass or aramid fiber back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "LTPO2 AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~89.6% screen-to-body ratio)",
    resolution: "1440 x 3200 pixels",
    refresh_rate: "120Hz",
    brightness: "1500 nits (peak)",
    hdr: "HDR10+",
    protection: "Panda Glass",
    pixel_density: "~518 ppi density",
    
    cpu: "Octa-core (1x3.00 GHz Cortex-X2 & 3x2.50 GHz Cortex-A710 & 4x1.80 GHz Cortex-A510)",
    gpu: "Adreno 730",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "256GB, 512GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3850 (v5)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.8, (wide), 1/1.57\", 1.0µm, PDAF, gimbal OIS",
    cam_ultrawide: "50 MP, f/2.3, 15mm, 150˚ (ultrawide), AF",
    cam_telephoto: "16 MP, f/2.2, 60mm (telephoto), PDAF, OIS, 2.5x optical zoom",
    cam_macro: "Supported via ultrawide",
    cam_ois: "Gimbal OIS on Main",
    cam_flash: "Dual-LED dual-tone flash",
    cam_video: "8K@30fps, 4K@30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps, gyro-EIS",
    
    battery_capacity: "4700 mAh, non-removable",
    charging_wired: "120W wired (100% in 19 min)",
    charging_wireless: "50W wireless",
    charging_reverse: "10W reverse wireless",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.2, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, BDS, QZSS",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Ultrasonic under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 12",
    ui_version: "Funtouch 12 (International), OriginOS Ocean (China)",
    update_policy: "3 Years OS Updates",
    ai_features: ["Gimbal Stabilization"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO 9 Pro is a true powerhouse that defined the early 2022 flagship space. Powered by the then-new Snapdragon 8 Gen 1 processor, it aimed to offer a zero-compromise experience for both gamers and photography enthusiasts. It features a stunning 6.78-inch LTPO2 AMOLED curved display with 2K resolution, capable of dynamically adjusting its refresh rate from 1Hz to 120Hz to preserve battery life while offering ultra-smooth visuals.\n\nThe camera system is arguably its strongest non-gaming feature. It utilizes a 50MP primary sensor equipped with micro-gimbal optical image stabilization, providing incredibly smooth video capture that rivals dedicated action cameras. It also features a massive 150-degree 50MP ultrawide lens and a 16MP 2.5x optical telephoto lens. Coupled with an advanced 3D ultrasonic fingerprint scanner, 120W wired charging, and 50W wireless charging, the iQOO 9 Pro was one of the most complete Android flagships of its year.",
    key_highlights: [
      "Micro-Gimbal Optical Image Stabilization for ultra-smooth video.",
      "6.78-inch 2K LTPO2 AMOLED curved display.",
      "Top-tier Snapdragon 8 Gen 1 performance.",
      "120W wired and 50W wireless fast charging.",
      "Advanced 3D Ultrasonic under-display fingerprint sensor."
    ],
    verdict: "The iQOO 9 Pro is a phenomenal device that excels in almost every category. Whether you are buying it for its blazing-fast 120W charging, its unique gimbal-stabilized camera, or its stunning 2K LTPO display, it rarely disappoints. However, the Snapdragon 8 Gen 1 can run hot during prolonged extreme gaming sessions.",
    pros: [
      "Exceptional 2K LTPO display",
      "Gimbal OIS makes a massive difference in video recording",
      "Incredibly fast 3D ultrasonic fingerprint scanner",
      "Very fast 120W charging",
      "Eye-catching BMW M Motorsport design"
    ],
    cons: [
      "Snapdragon 8 Gen 1 is prone to thermal throttling under heavy load",
      "No official IP water resistance rating",
      "Curved screen might lead to accidental touches"
    ],
    
    faqs: [
      { question: "Does the iQOO 9 Pro have wireless charging?", answer: "Yes, it supports 50W fast wireless charging as well as 10W reverse wireless charging." },
      { question: "What is Gimbal OIS?", answer: "Unlike standard OIS which only moves the lens slightly, Gimbal OIS moves the entire camera module to counteract larger hand movements, leading to much smoother video." },
      { question: "Is the fingerprint scanner on the iQOO 9 Pro good?", answer: "It is exceptional. It uses a 3D ultrasonic sensor that covers a large area of the screen and works instantly, even with wet or dirty fingers." }
    ],
    
    primary_keyword: "iQOO 9 Pro price",
    secondary_keywords: ["iQOO 9 Pro specs", "iQOO 9 Pro review", "iQOO 9 Pro camera", "iQOO 9 Pro gimbal OIS", "iQOO 9 Pro vs OnePlus 10 Pro"],
    question_keywords: ["Does iQOO 9 Pro have wireless charging?", "How fast is iQOO 9 Pro charging?", "Is iQOO 9 Pro waterproof?"],
    meta_title: "iQOO 9 Pro Price, Specs, Gimbal Camera & Review | TechTweak",
    meta_description: "Discover the full specifications, Gimbal OIS camera test, gaming performance, and expert review of the iQOO 9 Pro on TechTweak.",
    meta_keywords: "iQOO 9 Pro, iQOO 9 Pro price, iQOO 9 Pro specs, iQOO 9 Pro review, Snapdragon 8 Gen 1, Gimbal OIS, 120W charging",
    seo_slug: "iqoo-9-pro",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-9-pro",
    og_title: "iQOO 9 Pro: The Gimbal-Stabilized Flagship",
    og_description: "Explore the iQOO 9 Pro. Gimbal OIS, 2K LTPO curved display, and Snapdragon 8 Gen 1. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-9-pro.jpg",
    twitter_title: "iQOO 9 Pro Price & Specs: A Camera Masterpiece",
    twitter_description: "Snapdragon 8 Gen 1, 2K OLED, and 120W charging. Check out the iQOO 9 Pro.",
    
    seo_status: "Green",
    seo_score: 95,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO 9 (India)",
    slug: "iqoo-9-india",
    brand_name: "iQOO",
    price_usd: 580,
    price_inr: 42990,
    price_official: 580,
    is_official: true,
    release_date: "February 2022",
    release_date_parsed: new Date("2022-02-23"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Legend (White)", "Alpha (Black)"],
    model_number: "I2121",
    made_in: "India",
    phone_variants: "8GB/128GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-9-india.jpg"
    ],
    
    chipset_highlight: "Snapdragon 888+",
    camera_highlight: "48MP Triple Gimbal OIS",
    display_highlight: "6.56\" 120Hz AMOLED",
    battery_highlight: "4350mAh, 120W Fast",
    benchmark_highlight: "850,000+ AnTuTu",
    
    processor: "Qualcomm SM8350 Snapdragon 888+ 5G (5 nm)",
    weight: "200 g (7.05 oz)",
    dimensions: "159.1 x 75.1 x 8.6 mm",
    build_material: "Glass front (Panda Glass), aluminum frame, glass back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "AMOLED, 1B colors",
    screen_size: "6.56 inches, 104.6 cm2 (~87.5% screen-to-body ratio)",
    resolution: "1080 x 2376 pixels",
    refresh_rate: "120Hz",
    brightness: "1200 nits (peak)",
    hdr: "HDR10+",
    protection: "Panda Glass",
    pixel_density: "~398 ppi density",
    
    cpu: "Octa-core (1x2.89 GHz Cortex-X1 & 3x2.42 GHz Cortex-A78 & 4x1.80 GHz Cortex-A55)",
    gpu: "Adreno 660",
    fabrication: "5 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3650 (v5)",
    cooling_system: "Liquid Cooling Chamber",
    
    cam_count: "Triple",
    cam_main_sensor: "48 MP, f/1.8, 25mm (wide), 1/2.0\", 0.8µm, PDAF, gimbal OIS",
    cam_ultrawide: "13 MP, f/2.2, 16mm, 120˚ (ultrawide)",
    cam_telephoto: "13 MP, f/2.5, 50mm (telephoto), PDAF, 2x optical zoom",
    cam_macro: "Supported via ultrawide",
    cam_ois: "Gimbal OIS on Main",
    cam_flash: "Dual-LED dual-tone flash",
    cam_video: "4K@30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps, gyro-EIS",
    
    battery_capacity: "4350 mAh, non-removable",
    charging_wired: "120W wired (50% in 6 min, 100% in 18 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Reverse wired",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band",
    bluetooth_version: "5.2, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: false,
    gps_specs: "GPS, GLONASS, GALILEO, BDS",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 12",
    ui_version: "Funtouch 12",
    update_policy: "2 Years OS Updates",
    ai_features: ["Game Frame Interpolation", "Gimbal Stabilization"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO 9 (Indian Variant) is a unique device that differs significantly from its Chinese counterpart. Instead of the Snapdragon 8 Gen 1, the Indian iQOO 9 utilizes the highly capable Snapdragon 888+ processor, making it a powerful premium mid-ranger rather than an absolute top-tier flagship. It sports a 6.56-inch 120Hz flat AMOLED display with 10-bit color depth, delivering vibrant and smooth visuals favored by mobile gamers.\n\nRemarkably, iQOO included their premium Gimbal OIS technology on the 48MP main camera of this more affordable model, ensuring incredibly smooth video recording and sharp low-light photos. The device also features extremely fast 120W charging, capable of filling its 4350mAh battery in roughly 18 minutes. For users looking for flagship-level gaming and a fantastic stabilized camera without paying full flagship prices, the iQOO 9 India variant is a very smart choice.",
    key_highlights: [
      "Snapdragon 888+ 5G processor for reliable high performance.",
      "120W FlashCharge (0-100% in 18 minutes).",
      "48MP main camera with Gimbal Optical Image Stabilization.",
      "Flat 6.56-inch 120Hz AMOLED display.",
      "Dedicated intelligent display chip for gaming."
    ],
    verdict: "The iQOO 9 (India) is a stellar 'flagship killer' that cleverly repurposes previous-generation flagship silicon (Snapdragon 888+) to hit an aggressive price point. With Gimbal OIS, 120W charging, and a flat 120Hz screen, it is highly recommended for mobile gamers and content creators on a budget.",
    pros: [
      "Excellent value for money",
      "Gimbal OIS on the main camera is fantastic",
      "Extremely fast 120W charging",
      "Flat display is great for gaming"
    ],
    cons: [
      "Older Snapdragon 888+ chipset instead of 8 Gen 1",
      "Smaller 4350mAh battery",
      "No IP rating for water resistance",
      "Bloatware in Funtouch OS"
    ],
    
    faqs: [
      { question: "Is the iQOO 9 India different from the China version?", answer: "Yes, significantly. The Chinese iQOO 9 uses a Snapdragon 8 Gen 1 and has a different camera setup, while the Indian iQOO 9 uses a Snapdragon 888+ and features Gimbal OIS." },
      { question: "How long does the battery last on the iQOO 9?", answer: "While the 4350mAh battery is slightly smaller than average, it easily lasts a full day of moderate use. More importantly, the 120W charger can refill it in just 18 minutes." },
      { question: "Does the iQOO 9 support wireless charging?", answer: "No, wireless charging is reserved for the 'Pro' models in the iQOO lineup." }
    ],
    
    primary_keyword: "iQOO 9 India price",
    secondary_keywords: ["iQOO 9 specs", "iQOO 9 India review", "iQOO 9 gaming test", "iQOO 9 vs OnePlus 9RT"],
    question_keywords: ["Is iQOO 9 good for gaming?", "Does iQOO 9 have wireless charging?", "Difference between iQOO 9 India and China?"],
    meta_title: "iQOO 9 (India) Price, Specs, Gimbal Camera & Review",
    meta_description: "Check out the full specifications, gaming performance, Gimbal OIS camera test, and expert review of the iQOO 9 (India) featuring Snapdragon 888+.",
    meta_keywords: "iQOO 9, iQOO 9 India, iQOO 9 price, iQOO 9 specs, iQOO 9 review, Snapdragon 888+, Gimbal OIS, 120W charging",
    seo_slug: "iqoo-9-india",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-9-india",
    og_title: "iQOO 9 (India): Flagship Killer with Gimbal OIS",
    og_description: "Explore the iQOO 9 (India). Snapdragon 888+, 120W charging, and Gimbal OIS camera. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-9-india.jpg",
    twitter_title: "iQOO 9 Price & Specs: A Gamer's Delight",
    twitter_description: "Snapdragon 888+, Gimbal OIS, and 120W charging. Check out the iQOO 9 (India).",
    
    seo_status: "Green",
    seo_score: 93,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO 9 SE",
    slug: "iqoo-9-se",
    brand_name: "iQOO",
    price_usd: 450,
    price_inr: 33990,
    price_official: 450,
    is_official: true,
    release_date: "March 2022",
    release_date_parsed: new Date("2022-03-02"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Space Fusion", "Sunset Sierra"],
    model_number: "I2120",
    made_in: "India",
    phone_variants: "8GB/128GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-9-se.jpg"
    ],
    
    chipset_highlight: "Snapdragon 888",
    camera_highlight: "48MP Triple OIS",
    display_highlight: "6.62\" 120Hz Super AMOLED",
    battery_highlight: "4500mAh, 66W Fast",
    benchmark_highlight: "800,000+ AnTuTu",
    
    processor: "Qualcomm SM8350 Snapdragon 888 5G (5 nm)",
    weight: "199 g (7.02 oz)",
    dimensions: "163.2 x 76.4 x 8.4 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "Super AMOLED",
    screen_size: "6.62 inches, 106.3 cm2 (~85.2% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "120Hz",
    brightness: "1200 nits (peak)",
    hdr: "HDR10+",
    protection: "Panda Glass",
    pixel_density: "~398 ppi density",
    
    cpu: "Octa-core (1x2.84 GHz Cortex-X1 & 3x2.42 GHz Cortex-A78 & 4x1.80 GHz Cortex-A55)",
    gpu: "Adreno 660",
    fabrication: "5 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3500 (v5)",
    cooling_system: "Liquid Cooling Chamber",
    
    cam_count: "Triple",
    cam_main_sensor: "48 MP, f/1.8, 25mm (wide), 1/2.0\", 0.8µm, PDAF, OIS",
    cam_ultrawide: "13 MP, f/2.2, 16mm, 120˚ (ultrawide)",
    cam_telephoto: "2 MP, f/2.4, (depth)",
    cam_macro: "Supported via ultrawide",
    cam_ois: "OIS on Main Camera",
    cam_flash: "Dual-LED dual-tone flash",
    cam_video: "4K@30fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.0, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps, gyro-EIS",
    
    battery_capacity: "4500 mAh, non-removable",
    charging_wired: "66W wired (50% in 14 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band",
    bluetooth_version: "5.2, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, BDS",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 12",
    ui_version: "Funtouch 12",
    update_policy: "2 Years OS Updates",
    ai_features: ["Game Frame Interpolation"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO 9 SE is designed to be an aggressive entry point into the iQOO 9 series, targeting the highly competitive 'flagship killer' segment in India. Powered by the Snapdragon 888 processor, it offers exceptional gaming performance and speed at a fraction of the cost of modern flagships. It sports a flat 6.62-inch 120Hz Super AMOLED display, which is bright, responsive, and ideal for gaming.\n\nTo hit its attractive price point, iQOO made sensible compromises: the back panel and frame are made of polycarbonate rather than glass and metal, and the charging speed is 'only' 66W compared to the 120W seen on its more expensive siblings. However, the camera remains surprisingly capable, featuring a 48MP primary sensor with OIS and a 13MP ultrawide lens. For budget-conscious gamers, the iQOO 9 SE remains one of the best value propositions available.",
    key_highlights: [
      "Snapdragon 888 5G processor for high-end gaming.",
      "6.62-inch 120Hz Super AMOLED flat display.",
      "48MP main camera with Optical Image Stabilization.",
      "66W FlashCharge technology.",
      "Intelligent display chip for frame interpolation."
    ],
    verdict: "The iQOO 9 SE is a masterclass in compromise. By utilizing a plastic build and the still-powerful Snapdragon 888, iQOO managed to create a device that performs like a flagship but costs like a mid-ranger. It is highly recommended for mobile gamers on a strict budget.",
    pros: [
      "Fantastic performance for the price",
      "Bright 120Hz Super AMOLED display",
      "Reliable 48MP main camera with OIS",
      "Fast 66W charging"
    ],
    cons: [
      "Plastic build feels less premium",
      "Snapdragon 888 can get warm during long sessions",
      "No 3.5mm headphone jack",
      "Average battery life"
    ],
    
    faqs: [
      { question: "Is the iQOO 9 SE good for gaming?", answer: "Yes, it is excellent for gaming. The Snapdragon 888 processor combined with a 120Hz Super AMOLED display and a dedicated gaming chip ensures smooth frame rates in most demanding titles." },
      { question: "Does the iQOO 9 SE have a glass back?", answer: "No, to keep the price competitive, the iQOO 9 SE features a polycarbonate (plastic) back and frame." },
      { question: "Does the iQOO 9 SE support 5G?", answer: "Yes, the iQOO 9 SE supports multiple 5G bands, making it future-proof for next-generation networks." }
    ],
    
    primary_keyword: "iQOO 9 SE price",
    secondary_keywords: ["iQOO 9 SE specs", "iQOO 9 SE review", "iQOO 9 SE gaming", "iQOO 9 SE vs Poco F4", "iQOO 9 SE antutu"],
    question_keywords: ["Is iQOO 9 SE good for gaming?", "Does iQOO 9 SE have a glass back?", "Is iQOO 9 SE waterproof?"],
    meta_title: "iQOO 9 SE Price, Specs, Gaming & Review | TechTweak",
    meta_description: "Discover the full specifications, gaming performance, camera test, and expert review of the iQOO 9 SE featuring Snapdragon 888 on TechTweak.",
    meta_keywords: "iQOO 9 SE, iQOO 9 SE price, iQOO 9 SE specs, iQOO 9 SE review, Snapdragon 888, 66W charging, gaming phone",
    seo_slug: "iqoo-9-se",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-9-se",
    og_title: "iQOO 9 SE: The Affordable Gaming Powerhouse",
    og_description: "Explore the iQOO 9 SE. Snapdragon 888, 120Hz AMOLED, and 66W charging. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-9-se.jpg",
    twitter_title: "iQOO 9 SE Price & Specs: Flagship Killer",
    twitter_description: "Snapdragon 888, 120Hz OLED, and 66W charging. Check out the iQOO 9 SE.",
    
    seo_status: "Green",
    seo_score: 92,
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

    console.log("Batch 1 (Part 4) seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
