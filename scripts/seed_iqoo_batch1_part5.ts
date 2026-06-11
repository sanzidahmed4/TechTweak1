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
    name: "iQOO 8 Pro",
    slug: "iqoo-8-pro",
    brand_name: "iQOO",
    price_usd: 770,
    price_official: 770,
    is_official: true,
    release_date: "August 2021",
    release_date_parsed: new Date("2021-08-17"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["White (BMW M Motorsport)", "Black"],
    model_number: "V2141A",
    made_in: "China",
    phone_variants: "8GB/256GB, 12GB/256GB, 12GB/512GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-8-pro.jpg"
    ],
    
    chipset_highlight: "Snapdragon 888+",
    camera_highlight: "50MP Triple Gimbal OIS",
    display_highlight: "6.78\" 120Hz LTPO AMOLED",
    battery_highlight: "4500mAh, 120W Fast",
    benchmark_highlight: "840,000+ AnTuTu",
    
    processor: "Qualcomm SM8350 Snapdragon 888+ 5G (5 nm)",
    weight: "205 g (7.23 oz)",
    dimensions: "165 x 75.2 x 9.2 mm",
    build_material: "Glass front, aluminum frame, glass/carbon fiber back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "LTPO AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~89.4% screen-to-body ratio)",
    resolution: "1440 x 3200 pixels",
    refresh_rate: "120Hz",
    brightness: "1500 nits (peak)",
    hdr: "HDR10+, Dolby Vision",
    protection: "Scratch-resistant glass",
    pixel_density: "~518 ppi density",
    
    cpu: "Octa-core (1x2.99 GHz Cortex-X1 & 3x2.42 GHz Cortex-A78 & 4x1.80 GHz Cortex-A55)",
    gpu: "Adreno 660",
    fabrication: "5 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "256GB, 512GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3650 (v5)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.8, 23mm (wide), 1/1.56\", 1.0µm, PDAF, gimbal OIS",
    cam_ultrawide: "48 MP, f/2.2, 14mm, 114˚ (ultrawide), 1/2.0\", 0.8µm, AF",
    cam_telephoto: "16 MP, f/2.2, 60mm (telephoto), 1/3.1\", 1.0µm, PDAF, OIS, 2.5x optical zoom",
    cam_macro: "Supported via ultrawide",
    cam_ois: "Gimbal OIS on Main, Standard OIS on Telephoto",
    cam_flash: "Dual-LED dual-tone flash",
    cam_video: "8K@30fps, 4K@30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.4, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps, gyro-EIS",
    
    battery_capacity: "4500 mAh, non-removable",
    charging_wired: "120W wired (100% in 18 min)",
    charging_wireless: "50W wireless",
    charging_reverse: "10W reverse wireless",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.2, A2DP, LE, aptX HD, aptX Adaptive",
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
    
    android_version: "Android 11",
    ui_version: "OriginOS 1.0 (China)",
    update_policy: "2 Years OS Updates",
    ai_features: ["Gimbal Stabilization"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO 8 Pro arrived in late 2021 as a technological showcase, proving that iQOO was more than just a gaming-centric brand. It features the Snapdragon 888+ processor, an overclocked version of Qualcomm's flagship chip, delivering blazing-fast performance. Its standout feature is arguably the gorgeous 6.78-inch LTPO AMOLED display, pushing a 2K resolution at 120Hz while supporting Dolby Vision. It was one of the best displays on any smartphone at the time of release.\n\niQOO also loaded the 8 Pro with a staggering camera array. It uses a 50MP primary sensor stabilized by a micro-gimbal, a massive 48MP ultrawide sensor, and a 16MP 2.5x telephoto lens with OIS. Combined with 120W wired charging that fills the 4500mAh battery in roughly 18 minutes, 50W wireless charging, and a massive 3D ultrasonic fingerprint scanner, the iQOO 8 Pro remains a highly capable, feature-packed ultra-premium flagship.",
    key_highlights: [
      "Stunning 2K LTPO AMOLED display with Dolby Vision.",
      "Snapdragon 888+ 5G processor for top-tier performance.",
      "50MP Gimbal OIS primary camera.",
      "120W wired and 50W wireless charging.",
      "Large-area 3D ultrasonic fingerprint scanner."
    ],
    verdict: "The iQOO 8 Pro was ahead of its time, packing a 2K LTPO display, Gimbal OIS, and 120W charging into a single device. It is an exceptional flagship that rivals the very best of its generation, though its limited availability outside of China makes it a rare find.",
    pros: [
      "Beautiful 2K LTPO display",
      "Fantastic Gimbal-stabilized camera",
      "Extremely fast charging (wired and wireless)",
      "Excellent ultrasonic fingerprint scanner"
    ],
    cons: [
      "No official IP water resistance rating",
      "Snapdragon 888+ can run warm under sustained load",
      "Exclusive to the Chinese market"
    ],
    
    faqs: [
      { question: "Does the iQOO 8 Pro have an ultrasonic fingerprint scanner?", answer: "Yes, it features a 3D ultrasonic fingerprint scanner that works incredibly fast and covers a larger area than typical optical scanners." },
      { question: "Does the iQOO 8 Pro support wireless charging?", answer: "Yes, it supports extremely fast 50W wireless charging." },
      { question: "What is Gimbal OIS?", answer: "Gimbal OIS physically moves the entire camera module to stabilize the shot, providing much smoother video recording than traditional optical image stabilization." }
    ],
    
    primary_keyword: "iQOO 8 Pro price",
    secondary_keywords: ["iQOO 8 Pro specs", "iQOO 8 Pro review", "iQOO 8 Pro camera", "iQOO 8 Pro 120W", "iQOO 8 Pro antutu"],
    question_keywords: ["Does iQOO 8 Pro have wireless charging?", "How fast is iQOO 8 Pro charging?", "Is iQOO 8 Pro waterproof?"],
    meta_title: "iQOO 8 Pro Price, Specs, Gimbal Camera & Review | TechTweak",
    meta_description: "Check out the full specifications, Gimbal OIS camera quality, gaming performance, and expert review of the iQOO 8 Pro featuring Snapdragon 888+.",
    meta_keywords: "iQOO 8 Pro, iQOO 8 Pro price, iQOO 8 Pro specs, iQOO 8 Pro review, Snapdragon 888+, Gimbal OIS, 120W charging",
    seo_slug: "iqoo-8-pro",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-8-pro",
    og_title: "iQOO 8 Pro: 2K LTPO Display Meets Gimbal OIS",
    og_description: "Explore the iQOO 8 Pro. 120W charging, 2K AMOLED, and Snapdragon 888+. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-8-pro.jpg",
    twitter_title: "iQOO 8 Pro Price & Specs: A Masterpiece",
    twitter_description: "Snapdragon 888+, Gimbal OIS, and 120W charging. Check out the iQOO 8 Pro.",
    
    seo_status: "Green",
    seo_score: 95,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO 8",
    slug: "iqoo-8",
    brand_name: "iQOO",
    price_usd: 590,
    price_official: 590,
    is_official: true,
    release_date: "August 2021",
    release_date_parsed: new Date("2021-08-17"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["White (BMW M Motorsport)", "Orange", "Black"],
    model_number: "V2136A",
    made_in: "China",
    phone_variants: "8GB/128GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-8.jpg"
    ],
    
    chipset_highlight: "Snapdragon 888",
    camera_highlight: "50MP Triple Gimbal OIS",
    display_highlight: "6.56\" 120Hz AMOLED",
    battery_highlight: "4350mAh, 120W Fast",
    benchmark_highlight: "800,000+ AnTuTu",
    
    processor: "Qualcomm SM8350 Snapdragon 888 5G (5 nm)",
    weight: "200 g (7.05 oz)",
    dimensions: "159.1 x 75.1 x 8.6 mm",
    build_material: "Glass front, aluminum frame, glass back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "AMOLED, 1B colors",
    screen_size: "6.56 inches, 104.6 cm2 (~87.5% screen-to-body ratio)",
    resolution: "1080 x 2376 pixels",
    refresh_rate: "120Hz",
    brightness: "1200 nits (peak)",
    hdr: "HDR10",
    protection: "Scratch-resistant glass",
    pixel_density: "~398 ppi density",
    
    cpu: "Octa-core (1x2.84 GHz Cortex-X1 & 3x2.42 GHz Cortex-A78 & 4x1.80 GHz Cortex-A55)",
    gpu: "Adreno 660",
    fabrication: "5 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3600 (v5)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.8, 23mm (wide), 1/1.56\", 1.0µm, PDAF, gimbal OIS",
    cam_ultrawide: "13 MP, f/2.2, 120˚ (ultrawide)",
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
    charging_wired: "120W wired (100% in 18 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
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
    
    android_version: "Android 11",
    ui_version: "OriginOS 1.0 (China)",
    update_policy: "2 Years OS Updates",
    ai_features: ["Gimbal Stabilization"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "Launched alongside the Pro variant, the standard iQOO 8 offers a more flat, gaming-oriented design while retaining much of the flagship magic. It is powered by the highly capable Snapdragon 888 processor and features a 6.56-inch flat 120Hz AMOLED display. Flat displays are often preferred by competitive mobile gamers as they completely eliminate accidental edge touches and distortion.\n\nRemarkably, iQOO included the 50MP Gimbal OIS primary camera on this standard model, meaning video creators and night-time photographers get near Pro-level stabilization. It also supports the same insane 120W FlashCharge technology, capable of filling the 4350mAh battery in just 18 minutes. It serves as a slightly more compact, incredibly powerful option for users who don't need curved screens or wireless charging.",
    key_highlights: [
      "Snapdragon 888 5G processor.",
      "120W wired fast charging.",
      "50MP primary camera with Gimbal Optical Image Stabilization.",
      "6.56-inch flat 120Hz AMOLED display.",
      "Compact footprint compared to modern ultra-flagships."
    ],
    verdict: "The iQOO 8 is a brilliant premium device that strikes a great balance. By combining a flat screen, the Snapdragon 888, 120W charging, and Gimbal OIS, it offers everything a gamer or casual user could want without the premium price tag of the Pro model.",
    pros: [
      "Gimbal OIS on the main camera is exceptional",
      "Very fast 120W charging",
      "Flat display is ideal for gaming",
      "Great performance from Snapdragon 888"
    ],
    cons: [
      "Smaller 4350mAh battery",
      "No wireless charging",
      "No IP rating for water resistance",
      "Mostly exclusive to China"
    ],
    
    faqs: [
      { question: "What is the difference between iQOO 8 and iQOO 8 Pro?", answer: "The Pro features a larger, curved 2K LTPO display, a faster Snapdragon 888+ processor, wireless charging, and an ultrasonic fingerprint scanner. The standard iQOO 8 has a flat 1080p display, Snapdragon 888, and no wireless charging." },
      { question: "Does the iQOO 8 have Gimbal OIS?", answer: "Yes, like the Pro model, the standard iQOO 8 features Gimbal OIS on its 50MP main camera." },
      { question: "How long does it take to charge the iQOO 8?", answer: "Using the included 120W charger, it takes roughly 18 minutes to charge from 0 to 100%." }
    ],
    
    primary_keyword: "iQOO 8 price",
    secondary_keywords: ["iQOO 8 specs", "iQOO 8 review", "iQOO 8 vs iQOO 8 Pro", "iQOO 8 antutu score", "iQOO 8 camera"],
    question_keywords: ["Does iQOO 8 have wireless charging?", "Is iQOO 8 good for gaming?", "How fast does iQOO 8 charge?"],
    meta_title: "iQOO 8 Price, Specs, Gaming & Gimbal Camera Review",
    meta_description: "Discover the full specifications, 120W charging test, gaming performance, and expert review of the iQOO 8 featuring Snapdragon 888 and Gimbal OIS.",
    meta_keywords: "iQOO 8, iQOO 8 price, iQOO 8 specs, iQOO 8 review, Snapdragon 888, Gimbal OIS, 120W charging, gaming phone",
    seo_slug: "iqoo-8",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-8",
    og_title: "iQOO 8: Flat Screen Gaming with Gimbal OIS",
    og_description: "Explore the iQOO 8. Flat 120Hz display, 120W charging, and Gimbal OIS. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-8.jpg",
    twitter_title: "iQOO 8 Price & Specs: Gimbal Camera Power",
    twitter_description: "Snapdragon 888, Gimbal OIS, and 120W charging. Check out the iQOO 8.",
    
    seo_status: "Green",
    seo_score: 93,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO 7 Legend",
    slug: "iqoo-7-legend",
    brand_name: "iQOO",
    price_usd: 550,
    price_inr: 39990,
    price_official: 550,
    is_official: true,
    release_date: "April 2021",
    release_date_parsed: new Date("2021-04-26"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Legend (BMW M Motorsport White)"],
    model_number: "I2009",
    made_in: "India",
    phone_variants: "8GB/128GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-7-legend.jpg"
    ],
    
    chipset_highlight: "Snapdragon 888",
    camera_highlight: "48MP Triple OIS",
    display_highlight: "6.62\" 120Hz AMOLED",
    battery_highlight: "4000mAh, 66W Fast",
    benchmark_highlight: "800,000+ AnTuTu",
    
    processor: "Qualcomm SM8350 Snapdragon 888 5G (5 nm)",
    weight: "209.5 g (7.37 oz)",
    dimensions: "162.2 x 75.8 x 8.7 mm",
    build_material: "Glass front, aluminum frame, glass back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "AMOLED",
    screen_size: "6.62 inches, 105.8 cm2 (~86.0% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "120Hz",
    brightness: "1300 nits (peak)",
    hdr: "HDR10+",
    protection: "Scratch-resistant glass",
    pixel_density: "~398 ppi density",
    
    cpu: "Octa-core (1x2.84 GHz Cortex-X1 & 3x2.42 GHz Cortex-A78 & 4x1.80 GHz Cortex-A55)",
    gpu: "Adreno 660",
    fabrication: "5 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3600 (v5)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "48 MP, f/1.8, 26mm (wide), 1/2.0\", 0.8µm, PDAF, OIS",
    cam_ultrawide: "13 MP, f/2.2, 120˚, 16mm (ultrawide)",
    cam_telephoto: "13 MP, f/2.5, 50mm (telephoto), 1/2.8\", 0.8µm, PDAF, 2x optical zoom",
    cam_macro: "Supported via ultrawide",
    cam_ois: "OIS on Main Camera",
    cam_flash: "Dual-LED dual-tone flash",
    cam_video: "4K@30fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.0, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "4000 mAh, non-removable",
    charging_wired: "66W wired (Global/India) / 120W (China)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.2, A2DP, LE, aptX HD",
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
    
    android_version: "Android 11",
    ui_version: "Funtouch 11.1 (International), OriginOS (China)",
    update_policy: "2 Years OS Updates",
    ai_features: ["Game Frame Interpolation"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO 7 Legend (which is essentially the Chinese iQOO 7 rebranded for the global/Indian market) made a massive impact when it launched as one of the most affordable smartphones sporting the flagship Snapdragon 888 processor. Featuring a striking BMW M Motorsport 'Legend' design with its iconic tri-color racing stripes over an AG glass back, it looks as fast as it performs.\n\nThe phone was designed with performance in mind, incorporating a massive vapor chamber cooling system to tame the often-hot Snapdragon 888 during intense gaming. It features a bright, flat 6.62-inch 120Hz AMOLED display and an impressive camera setup containing a 48MP main sensor with OIS and a 13MP telephoto lens for high-quality portraits. While its 4000mAh battery is slightly smaller than average, the extremely fast 66W charging (or 120W in China) compensates for it by providing quick top-ups.",
    key_highlights: [
      "Snapdragon 888 5G processor for uncompromising speed.",
      "Iconic BMW M Motorsport Legend design.",
      "Flat 6.62-inch 120Hz AMOLED display.",
      "Versatile 48MP main camera + 13MP telephoto setup.",
      "Large vapor chamber cooling system for gaming."
    ],
    verdict: "The iQOO 7 Legend is a fantastic flagship killer that offers top-tier Snapdragon 888 performance wrapped in a gorgeous BMW M Motorsport design. It is highly recommended for gamers and power users, although heavy users might find the 4000mAh battery slightly lacking.",
    pros: [
      "Excellent Snapdragon 888 performance for the price",
      "Unique and premium BMW M design",
      "Flat, bright 120Hz AMOLED screen",
      "Good camera system with telephoto lens"
    ],
    cons: [
      "Small 4000mAh battery drains quickly under heavy load",
      "Funtouch OS has bloatware",
      "No official IP water resistance rating",
      "No 3.5mm headphone jack"
    ],
    
    faqs: [
      { question: "Is the iQOO 7 Legend good for gaming?", answer: "Yes, it is excellent. With a Snapdragon 888 processor, a large vapor chamber cooling system, and a 120Hz flat AMOLED screen, it handles all modern games at maximum settings." },
      { question: "Does the iQOO 7 Legend overheat?", answer: "While the Snapdragon 888 chip runs warm, iQOO's massive vapor chamber cooling system manages the heat well, preventing severe throttling during gameplay." },
      { question: "What is the battery life on the iQOO 7 Legend?", answer: "It has a 4000mAh battery. With moderate use, it lasts a day, but heavy gaming will require a mid-day top-up using the fast 66W charger." }
    ],
    
    primary_keyword: "iQOO 7 Legend price",
    secondary_keywords: ["iQOO 7 Legend specs", "iQOO 7 Legend review", "iQOO 7 Legend gaming", "iQOO 7 Legend antutu", "iQOO 7 Legend vs OnePlus 9R"],
    question_keywords: ["Is iQOO 7 Legend good for gaming?", "Does iQOO 7 Legend overheat?", "How fast does iQOO 7 Legend charge?"],
    meta_title: "iQOO 7 Legend Price, Specs, Gaming Test & Review",
    meta_description: "Discover the full specifications, gaming performance, camera test, and expert review of the iQOO 7 Legend featuring Snapdragon 888.",
    meta_keywords: "iQOO 7 Legend, iQOO 7 Legend price, iQOO 7 Legend specs, iQOO 7 Legend review, Snapdragon 888, 66W charging, gaming phone",
    seo_slug: "iqoo-7-legend",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-7-legend",
    og_title: "iQOO 7 Legend: The Snapdragon 888 Flagship Killer",
    og_description: "Explore the iQOO 7 Legend. Snapdragon 888, BMW M design, and 120Hz AMOLED. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-7-legend.jpg",
    twitter_title: "iQOO 7 Legend Price & Specs: True Power",
    twitter_description: "Snapdragon 888, 120Hz OLED, and 66W charging. Check out the iQOO 7 Legend.",
    
    seo_status: "Green",
    seo_score: 93,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO 7 (India)",
    slug: "iqoo-7-india",
    brand_name: "iQOO",
    price_usd: 430,
    price_inr: 31990,
    price_official: 430,
    is_official: true,
    release_date: "April 2021",
    release_date_parsed: new Date("2021-04-26"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Solid Ice", "Storm Black", "Monster Orange"],
    model_number: "I2012",
    made_in: "India",
    phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-7-india.jpg"
    ],
    
    chipset_highlight: "Snapdragon 870",
    camera_highlight: "48MP Triple OIS",
    display_highlight: "6.62\" 120Hz AMOLED",
    battery_highlight: "4400mAh, 66W Fast",
    benchmark_highlight: "700,000+ AnTuTu",
    
    processor: "Qualcomm SM8250-AC Snapdragon 870 5G (7 nm)",
    weight: "196 g (6.91 oz)",
    dimensions: "163.3 x 76.4 x 8.4 mm",
    build_material: "Glass front, plastic frame, glass back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "AMOLED, 120Hz",
    screen_size: "6.62 inches, 105.8 cm2 (~84.8% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "120Hz",
    brightness: "1300 nits (peak)",
    hdr: "HDR10+",
    protection: "Scratch-resistant glass",
    pixel_density: "~398 ppi density",
    
    cpu: "Octa-core (1x3.2 GHz Kryo 585 & 3x2.42 GHz Kryo 585 & 4x1.80 GHz Kryo 585)",
    gpu: "Adreno 650",
    fabrication: "7 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3350 (v5)",
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
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "4400 mAh, non-removable",
    charging_wired: "66W wired (100% in 22 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.1, A2DP, LE, aptX HD",
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
    
    android_version: "Android 11",
    ui_version: "Funtouch 11.1",
    update_policy: "2 Years OS Updates",
    ai_features: ["Game Frame Interpolation"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO 7 (India) was introduced as an ultra-competitive mid-range flagship killer, serving as a rebrand of the popular global iQOO Neo5. It was strategically launched alongside the iQOO 7 Legend. While the Legend got the blazing hot Snapdragon 888, the standard iQOO 7 (India) was equipped with the highly praised, incredibly stable Snapdragon 870 processor. For many gamers, the Snapdragon 870 was preferred because it offered near-flagship performance without the severe thermal throttling seen in the 888 generation.\n\nIt features a gorgeous flat 6.62-inch 120Hz AMOLED display and an intelligent display chip designed to interpolate game frames, making games look smoother while saving battery. The 48MP main camera comes with Optical Image Stabilization (OIS), offering excellent photography for its price class. With a 4400mAh battery and fast 66W charging that fills the phone in just 22 minutes, the iQOO 7 (India) quickly became one of the most highly recommended mid-rangers of 2021.",
    key_highlights: [
      "Snapdragon 870 processor ensures cool, sustained high-end performance.",
      "Intelligent display chip for gaming frame interpolation.",
      "48MP main camera with OIS for sharp low-light photography.",
      "Flat 6.62-inch 120Hz AMOLED display.",
      "66W FlashCharge fills the 4400mAh battery in 22 minutes."
    ],
    verdict: "The iQOO 7 (India) is a masterpiece of balance. By utilizing the incredibly stable Snapdragon 870 chip, it provides a far more consistent gaming experience than many expensive flagships of its era. It represents spectacular value for money in the premium mid-range segment.",
    pros: [
      "Snapdragon 870 offers phenomenal sustained performance without overheating",
      "Bright, fluid 120Hz AMOLED display",
      "Great 48MP OIS camera for the price segment",
      "Very fast 66W charging"
    ],
    cons: [
      "Plastic frame instead of metal",
      "No telephoto lens (replaced by a 2MP depth sensor)",
      "Lots of bloatware out of the box in Funtouch OS",
      "No 3.5mm headphone jack"
    ],
    
    faqs: [
      { question: "What is the difference between iQOO 7 and iQOO 7 Legend?", answer: "The iQOO 7 Legend has a faster (but hotter) Snapdragon 888, a metal frame, a telephoto camera, and a smaller 4000mAh battery. The standard iQOO 7 has a Snapdragon 870, a plastic frame, a larger 4400mAh battery, and no telephoto lens." },
      { question: "Is the iQOO 7 (India) good for gaming?", answer: "Yes, it is arguably one of the best budget gaming phones of its generation. The Snapdragon 870 is renowned for maintaining high frame rates without overheating." },
      { question: "Does the iQOO 7 have a headphone jack?", answer: "No, you will need to use a USB-C adapter or wireless Bluetooth earphones." }
    ],
    
    primary_keyword: "iQOO 7 India price",
    secondary_keywords: ["iQOO 7 specs", "iQOO 7 review", "iQOO 7 gaming test", "iQOO 7 vs Poco F3", "iQOO 7 antutu"],
    question_keywords: ["Is iQOO 7 good for gaming?", "Difference between iQOO 7 and iQOO 7 Legend?", "Does iQOO 7 overheat?"],
    meta_title: "iQOO 7 (India) Price, Specs, Gaming Test & Review",
    meta_description: "Check out the full specifications, gaming performance, camera test, and expert review of the iQOO 7 (India) featuring Snapdragon 870 on TechTweak.",
    meta_keywords: "iQOO 7, iQOO 7 India price, iQOO 7 specs, iQOO 7 review, Snapdragon 870, 66W charging, gaming phone",
    seo_slug: "iqoo-7-india",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-7-india",
    og_title: "iQOO 7 (India): The Snapdragon 870 Gaming King",
    og_description: "Explore the iQOO 7. Stable Snapdragon 870 performance, 120Hz AMOLED, and 66W charging. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-7-india.jpg",
    twitter_title: "iQOO 7 Price & Specs: Supreme Balance",
    twitter_description: "Snapdragon 870, 120Hz OLED, and 66W charging. Check out the iQOO 7.",
    
    seo_status: "Green",
    seo_score: 93,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO 3",
    slug: "iqoo-3",
    brand_name: "iQOO",
    price_usd: 500,
    price_inr: 36990,
    price_official: 500,
    is_official: true,
    release_date: "March 2020",
    release_date_parsed: new Date("2020-03-04"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Volcano Orange", "Quantum Silver", "Tornado Black"],
    model_number: "I1927",
    made_in: "China/India",
    phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-3-5g.jpg"
    ],
    
    chipset_highlight: "Snapdragon 865",
    camera_highlight: "48MP Quad Camera",
    display_highlight: "6.44\" Super AMOLED",
    battery_highlight: "4400mAh, 55W Fast",
    benchmark_highlight: "590,000+ AnTuTu",
    
    processor: "Qualcomm SM8250 Snapdragon 865 5G (7 nm+)",
    weight: "214.5 g (7.58 oz)",
    dimensions: "158.5 x 74.9 x 9.2 mm",
    build_material: "Glass front (Gorilla Glass 6), aluminum frame, glass back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "Super AMOLED",
    screen_size: "6.44 inches, 100.1 cm2 (~84.3% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "60Hz",
    brightness: "800 nits (peak)",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass 6",
    pixel_density: "~409 ppi density",
    
    cpu: "Octa-core (1x2.84 GHz Cortex-A77 & 3x2.42 GHz Cortex-A77 & 4x1.80 GHz Cortex-A55)",
    gpu: "Adreno 650",
    fabrication: "7 nm+",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3300 (v4)",
    cooling_system: "Carbon Fiber VC Liquid Cooling",
    
    cam_count: "Quad",
    cam_main_sensor: "48 MP, f/1.8, (wide), 1/2.0\", 0.8µm, PDAF",
    cam_ultrawide: "13 MP, f/2.2, 120˚, 16mm (ultrawide)",
    cam_telephoto: "13 MP, f/2.5, 50mm (telephoto), PDAF, 2x optical zoom",
    cam_macro: "2 MP, f/2.4, (depth)",
    cam_ois: "Not Supported",
    cam_flash: "LED flash",
    cam_video: "4K@30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "4400 mAh, non-removable",
    charging_wired: "55W wired (50% in 15 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.1, A2DP, LE, aptX HD",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, BDS",
    has_ir_blaster: false,
    has_audio_jack: true,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 10",
    ui_version: "iQOO UI 1.0",
    update_policy: "2 Years OS Updates",
    ai_features: ["Monster Touch Buttons"],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The iQOO 3 marks the global genesis of the iQOO brand as an independent powerhouse. Launched in early 2020, it aimed directly at the 'flagship killer' market dominated by OnePlus. It was one of the very first smartphones to be powered by the Snapdragon 865 5G processor and introduced lightning-fast UFS 3.1 storage to the industry, resulting in incredibly quick app load times and gaming performance.\n\nDesigned heavily with gamers in mind, the iQOO 3 features unique 'Monster Touch' capacitive shoulder buttons on its side frame, giving gamers console-like shoulder triggers without needing external attachments. It features a bright 6.44-inch Super AMOLED display (though limited to 60Hz), a massive 4400mAh battery, and a blazing-fast 55W charger that fills 50% of the battery in just 15 minutes. It also pleasingly retained the 3.5mm headphone jack with a dedicated AK4377A Hi-Fi audio chip, making it a rare treat for audiophiles.",
    key_highlights: [
      "Snapdragon 865 5G processor with UFS 3.1 storage.",
      "Monster Touch capacitive shoulder triggers for gaming.",
      "Dedicated AK4377A Hi-Fi audio chip with a 3.5mm headphone jack.",
      "4400mAh battery with 55W Super FlashCharge.",
      "48MP Quad camera system with 2x optical zoom telephoto."
    ],
    verdict: "The iQOO 3 is a historic device for the brand. While its 60Hz display felt slightly outdated even at launch, its raw Snapdragon 865 power, capacitive gaming triggers, UFS 3.1 storage, and dedicated Hi-Fi audio DAC made it an absolute dream for mobile gamers and audiophiles alike.",
    pros: [
      "Exceptional gaming performance with Snapdragon 865",
      "Monster Touch shoulder buttons provide a massive gaming advantage",
      "Super-fast UFS 3.1 storage",
      "Features a 3.5mm headphone jack with a dedicated Hi-Fi DAC",
      "Extremely fast 55W charging"
    ],
    cons: [
      "Display is locked at a standard 60Hz refresh rate",
      "No OIS on any of the cameras",
      "Device is quite thick and heavy",
      "iQOO UI heavily layered over Android 10"
    ],
    
    faqs: [
      { question: "Does the iQOO 3 have a high refresh rate display?", answer: "No, one of its few drawbacks is that the 6.44-inch Super AMOLED display is locked at a standard 60Hz refresh rate." },
      { question: "What are Monster Touch buttons?", answer: "They are two capacitive touch sensors located on the right frame of the phone. When playing games in landscape mode, you can map these sensors to act as shoulder triggers (like L1/R1 on a controller)." },
      { question: "Does the iQOO 3 have a headphone jack?", answer: "Yes! It features a 3.5mm headphone jack and even includes an AK4377A independent audio DAC for Hi-Res audio output." }
    ],
    
    primary_keyword: "iQOO 3 price",
    secondary_keywords: ["iQOO 3 specs", "iQOO 3 review", "iQOO 3 gaming", "iQOO 3 monster touch", "iQOO 3 5g"],
    question_keywords: ["Does iQOO 3 have 120Hz?", "Does iQOO 3 have a headphone jack?", "Is iQOO 3 good for gaming?"],
    meta_title: "iQOO 3 Price, Specs, Gaming Triggers & Review",
    meta_description: "Check out the full specifications, Monster Touch gaming triggers, Hi-Fi audio DAC, and expert review of the classic iQOO 3 featuring Snapdragon 865.",
    meta_keywords: "iQOO 3, iQOO 3 price, iQOO 3 specs, iQOO 3 review, Snapdragon 865, Monster Touch, 55W charging, gaming phone",
    seo_slug: "iqoo-3",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-3",
    og_title: "iQOO 3: The Genesis of iQOO Flagships",
    og_description: "Explore the iQOO 3. Snapdragon 865, capacitive shoulder buttons, and a Hi-Fi DAC. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-3-5g.jpg",
    twitter_title: "iQOO 3 Price & Specs: Classic Power",
    twitter_description: "Snapdragon 865, Monster Touch, and 55W charging. Check out the iQOO 3.",
    
    seo_status: "Green",
    seo_score: 91,
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

    console.log("Batch 1 (Part 5) seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
