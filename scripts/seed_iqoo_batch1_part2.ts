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
    name: "iQOO 11 Pro",
    slug: "iqoo-11-pro",
    brand_name: "iQOO",
    price_usd: 750,
    price_official: 750,
    is_official: true,
    release_date: "December 2022",
    release_date_parsed: new Date("2022-12-08"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Black", "Mint", "White (BMW M Motorsport)"],
    model_number: "V2243A",
    made_in: "China",
    phone_variants: "8GB/256GB, 12GB/256GB, 16GB/512GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-11-pro.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8 Gen 2",
    camera_highlight: "50MP Triple, 200W Fast",
    display_highlight: "6.78\" 144Hz E6 AMOLED",
    battery_highlight: "4700mAh, 200W Wired + 50W Wireless",
    benchmark_highlight: "1,320,000+ AnTuTu",
    
    processor: "Qualcomm SM8550-AB Snapdragon 8 Gen 2 (4 nm)",
    weight: "210.5 g or 213 g (7.44 oz)",
    dimensions: "164.8 x 75.3 x 8.9 mm",
    build_material: "Glass front, aluminum frame, glass/vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "LTPO4 AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~89.4% screen-to-body ratio)",
    resolution: "1440 x 3200 pixels",
    refresh_rate: "144Hz",
    brightness: "1800 nits (peak)",
    hdr: "HDR10+",
    protection: "Scratch-resistant glass",
    pixel_density: "~518 ppi density",
    
    cpu: "Octa-core (1x3.2 GHz Cortex-X3 & 2x2.8 GHz Cortex-A715 & 2x2.8 GHz Cortex-A710 & 3x2.0 GHz Cortex-A510)",
    gpu: "Adreno 740",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB, 16GB",
    storage_variants: "256GB, 512GB",
    storage_type: "UFS 4.0",
    geekbench_score: "5200 (v5)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.8, 23mm (wide), 1/1.49\", 1.0µm, PDAF, OIS",
    cam_ultrawide: "50 MP, f/2.3, 15mm, 150˚ (ultrawide), 1/2.76\", 0.64µm, AF",
    cam_telephoto: "13 MP, f/2.5, 50mm (telephoto), PDAF, 2x optical zoom",
    cam_macro: "Supported via ultrawide",
    cam_ois: "OIS on Main Camera",
    cam_flash: "Dual-LED flash",
    cam_video: "8K@30fps, 4K@30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps, gyro-EIS",
    
    battery_capacity: "4700 mAh, non-removable",
    charging_wired: "200W wired (100% in 10 min)",
    charging_wireless: "50W wireless",
    charging_reverse: "10W reverse wireless",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.3, A2DP, LE, aptX HD, aptX Adaptive",
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
    
    android_version: "Android 13",
    ui_version: "OriginOS 3 (China)",
    update_policy: "3 Years OS Updates",
    ai_features: ["Game Frame Interpolation", "AI Photography"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO 11 Pro represents a masterclass in extreme charging speeds and flagship performance. Launched as part of the 2023 lineup, it is powered by the top-tier Qualcomm Snapdragon 8 Gen 2 processor, ensuring flawless performance across heavy applications and intense gaming sessions. The device stands out with its gorgeous 6.78-inch E6 AMOLED display, which boasts a 2K resolution, a 144Hz refresh rate, and 1800 nits of peak brightness for stunning visual fidelity.\n\nHowever, its most defining feature is the ludicrous 200W FlashCharge technology. The iQOO 11 Pro can charge its 4700mAh dual-cell battery from 0% to a full 100% in a mind-boggling 10 minutes. It also supports 50W fast wireless charging. In the camera department, it utilizes a 50MP primary sensor with OIS, a massive 150-degree 50MP ultrawide lens, and a 13MP telephoto lens for portraits. Combined with an advanced 3D ultrasonic fingerprint scanner, the iQOO 11 Pro is an absolute powerhouse.",
    key_highlights: [
      "200W wired charging tops up the battery in just 10 minutes.",
      "Stunning 2K E6 LTPO4 AMOLED 144Hz display.",
      "Powered by the highly efficient Snapdragon 8 Gen 2.",
      "Advanced 3D ultrasonic under-display fingerprint sensor.",
      "Dual 50MP rear camera system (Main + 150-degree Ultrawide)."
    ],
    verdict: "If charging speed is your absolute top priority alongside no-compromise flagship performance, the iQOO 11 Pro is a dream device. While it lacks full IP68 waterproofing, its ultra-fast 200W wired charging, 50W wireless charging, brilliant 2K 144Hz display, and Snapdragon 8 Gen 2 processor make it an incredibly compelling, futuristic flagship.",
    pros: [
      "Ludicrously fast 200W charging",
      "Brilliant 2K E6 AMOLED display at 144Hz",
      "Top-tier Snapdragon 8 Gen 2 performance",
      "Excellent ultra-wide camera with 150-degree FOV",
      "Fast and reliable ultrasonic fingerprint scanner"
    ],
    cons: [
      "No official IP water/dust resistance rating",
      "Camera telephoto is only 2x optical",
      "Limited global availability compared to standard iQOO 11"
    ],
    
    faqs: [
      { question: "How fast is the iQOO 11 Pro charging?", answer: "The iQOO 11 Pro features an incredibly fast 200W wired charging system capable of taking the battery from 0% to 100% in exactly 10 minutes under optimal conditions." },
      { question: "Does the iQOO 11 Pro support wireless charging?", answer: "Yes, it supports extremely fast 50W wireless charging, as well as 10W reverse wireless charging." },
      { question: "Is the iQOO 11 Pro good for gaming?", answer: "Absolutely. With the Snapdragon 8 Gen 2 chipset, a 144Hz E6 AMOLED display, and a dedicated V2 display chip, it handles all modern titles effortlessly." },
      { question: "Does the iQOO 11 Pro have an ultrasonic fingerprint scanner?", answer: "Yes, the Pro model is equipped with a large-area 3D ultrasonic fingerprint scanner under the display." }
    ],
    
    primary_keyword: "iQOO 11 Pro price",
    secondary_keywords: ["iQOO 11 Pro specs", "iQOO 11 Pro charging speed", "iQOO 11 Pro review", "iQOO 11 Pro antutu score", "iQOO 11 Pro camera"],
    question_keywords: ["How fast is iQOO 11 Pro charging?", "Does iQOO 11 Pro have wireless charging?", "Is iQOO 11 Pro waterproof?"],
    meta_title: "iQOO 11 Pro Price, Specs, 200W Charging & Review | TechTweak",
    meta_description: "Check out the full specifications, 200W charging test, gaming performance, and expert review of the iQOO 11 Pro featuring Snapdragon 8 Gen 2 on TechTweak.",
    meta_keywords: "iQOO 11 Pro, iQOO 11 Pro price, iQOO 11 Pro specs, iQOO 11 Pro review, Snapdragon 8 Gen 2, 200W charging",
    seo_slug: "iqoo-11-pro",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-11-pro",
    og_title: "iQOO 11 Pro: The 200W Charging Powerhouse",
    og_description: "Explore the iQOO 11 Pro. 200W fast charging, 2K AMOLED display, and Snapdragon 8 Gen 2. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-11-pro.jpg",
    twitter_title: "iQOO 11 Pro Price & Specs: 200W FlashCharge",
    twitter_description: "Snapdragon 8 Gen 2, 2K LTPO OLED, and 200W charging. Check out our full review of the iQOO 11 Pro.",
    
    seo_status: "Green",
    seo_score: 96,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO 11",
    slug: "iqoo-11",
    brand_name: "iQOO",
    price_usd: 620,
    price_inr: 51999,
    price_official: 620,
    is_official: true,
    release_date: "December 2022",
    release_date_parsed: new Date("2022-12-08"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Black", "Green", "White (BMW M Motorsport)"],
    model_number: "I2209, V2243A",
    made_in: "China/India",
    phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB, 16GB/256GB, 16GB/512GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-11.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8 Gen 2",
    camera_highlight: "50MP Triple OIS",
    display_highlight: "6.78\" 144Hz E6 AMOLED",
    battery_highlight: "5000mAh, 120W Fast",
    benchmark_highlight: "1,300,000+ AnTuTu",
    
    processor: "Qualcomm SM8550-AB Snapdragon 8 Gen 2 (4 nm)",
    weight: "205 g or 208 g (7.23 oz)",
    dimensions: "164.9 x 77.1 x 8.4 mm",
    build_material: "Glass front, aluminum frame, glass/vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "LTPO4 AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~87.3% screen-to-body ratio)",
    resolution: "1440 x 3200 pixels",
    refresh_rate: "144Hz",
    brightness: "1800 nits (peak)",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass Victus",
    pixel_density: "~518 ppi density",
    
    cpu: "Octa-core (1x3.2 GHz Cortex-X3 & 2x2.8 GHz Cortex-A715 & 2x2.8 GHz Cortex-A710 & 3x2.0 GHz Cortex-A510)",
    gpu: "Adreno 740",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB, 16GB",
    storage_variants: "128GB, 256GB, 512GB",
    storage_type: "UFS 4.0 (UFS 3.1 for 128GB)",
    geekbench_score: "5150 (v5)",
    cooling_system: "Liquid Cooling Chamber",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.9, 23mm (wide), 1/1.57\", 1.0µm, PDAF, OIS",
    cam_ultrawide: "8 MP, f/2.2, 16mm (ultrawide)",
    cam_telephoto: "13 MP, f/2.5, 50mm (telephoto), PDAF, 2x optical zoom",
    cam_macro: "Supported via ultrawide",
    cam_ois: "OIS on Main Camera",
    cam_flash: "Dual-LED flash",
    cam_video: "8K@30fps, 4K@30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps, gyro-EIS",
    
    battery_capacity: "5000 mAh, non-removable",
    charging_wired: "120W wired",
    charging_wireless: "Not Supported",
    charging_reverse: "Reverse wired",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.3, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, BDS",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 13",
    ui_version: "Funtouch OS 13 (International), OriginOS 3 (China)",
    update_policy: "3 Years OS Updates",
    ai_features: ["Game Frame Interpolation", "V2 Display Chip"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO 11 made a major splash in the global market as one of the very first smartphones to be powered by the formidable Snapdragon 8 Gen 2 processor. Continuing iQOO's legacy of pairing raw gaming performance with aggressive pricing, the iQOO 11 delivered a true high-end experience without breaking the bank. It features a flat, highly responsive 6.78-inch E6 LTPO4 AMOLED display with a 144Hz refresh rate and a crisp 1440p resolution—a specification typically reserved for ultra-premium flagships.\n\nBuilt for gamers and power users, the iQOO 11 houses a dedicated V2 supercomputing chip that interpolates frames in supported games, reducing GPU load while maintaining incredibly smooth visuals. The large 5000mAh battery ensures all-day endurance, and the included 120W FlashCharge adapter effortlessly refuels the device to 100% in roughly 25 minutes. Although its camera system isn't as robust as the Pro variant or the subsequent iQOO 12 series, the 50MP primary sensor with OIS still captures excellent, reliable shots in all lighting conditions.",
    key_highlights: [
      "High-performance Snapdragon 8 Gen 2 processor.",
      "Vivid 6.78-inch E6 AMOLED display with 144Hz refresh rate and 2K resolution.",
      "Dedicated V2 display chip for gaming enhancements.",
      "Large 5000mAh battery with rapid 120W wired charging.",
      "Flat display design ideal for competitive gaming."
    ],
    verdict: "The iQOO 11 is an exceptional flagship killer that prioritizes performance, display quality, and charging speeds. If you are an avid mobile gamer who prefers flat screens and blazing-fast processors over extravagant camera setups, the iQOO 11 offers arguably the best value in the Snapdragon 8 Gen 2 generation.",
    pros: [
      "Phenomenal gaming performance",
      "Gorgeous flat 2K E6 AMOLED screen",
      "Super-fast 120W charging",
      "Excellent battery life (5000mAh)",
      "Great main camera performance"
    ],
    cons: [
      "No wireless charging",
      "Subpar 8MP ultrawide camera",
      "Funtouch OS contains bloatware"
    ],
    
    faqs: [
      { question: "Is the iQOO 11 screen flat or curved?", answer: "The iQOO 11 features a completely flat 6.78-inch E6 AMOLED display, which is heavily preferred by gamers for avoiding accidental edge touches." },
      { question: "Does the iQOO 11 support 120W charging?", answer: "Yes, it supports 120W FlashCharge technology and the charger is included in the box." },
      { question: "What is the V2 chip in iQOO 11?", answer: "The V2 chip is a dedicated display/image signal processor built by vivo. It helps interpolate frames during gaming for smoother gameplay and assists in noise reduction for night photography." },
      { question: "Does iQOO 11 have a headphone jack?", answer: "No, like most modern flagships, the iQOO 11 does not feature a 3.5mm headphone jack." }
    ],
    
    primary_keyword: "iQOO 11 price",
    secondary_keywords: ["iQOO 11 specs", "iQOO 11 review", "iQOO 11 gaming", "iQOO 11 vs OnePlus 11", "iQOO 11 antutu"],
    question_keywords: ["Is iQOO 11 good for gaming?", "Does iQOO 11 have wireless charging?", "Is iQOO 11 display flat?"],
    meta_title: "iQOO 11 Price, Specs, Gaming Test & Review | TechTweak",
    meta_description: "Discover the full specifications, gaming performance, benchmark scores, battery life, and expert review of the iQOO 11 featuring Snapdragon 8 Gen 2 on TechTweak.",
    meta_keywords: "iQOO 11, iQOO 11 price, iQOO 11 specs, iQOO 11 review, Snapdragon 8 Gen 2, 144Hz AMOLED, gaming phone",
    seo_slug: "iqoo-11",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-11",
    og_title: "iQOO 11: Flat Screen Snapdragon 8 Gen 2 Gaming Flagship",
    og_description: "Explore the iQOO 11. 144Hz 2K flat display, 120W charging, and Snapdragon 8 Gen 2 performance. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-11.jpg",
    twitter_title: "iQOO 11 Price & Specs: Elite Gaming Flagship",
    twitter_description: "Snapdragon 8 Gen 2, 2K flat OLED, and 120W charging. Check out our full review of the iQOO 11.",
    
    seo_status: "Green",
    seo_score: 94,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO 11S",
    slug: "iqoo-11s",
    brand_name: "iQOO",
    price_usd: 550,
    price_official: 550,
    is_official: true,
    release_date: "July 2023",
    release_date_parsed: new Date("2023-07-04"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Black", "Cyan", "White (BMW M Motorsport)"],
    model_number: "V2304A",
    made_in: "China",
    phone_variants: "12GB/256GB, 16GB/256GB, 16GB/512GB, 16GB/1TB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-11s.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8 Gen 2",
    camera_highlight: "50MP Triple OIS",
    display_highlight: "6.78\" 144Hz E6 AMOLED",
    battery_highlight: "4700mAh, 200W Fast",
    benchmark_highlight: "1,320,000+ AnTuTu",
    
    processor: "Qualcomm SM8550-AB Snapdragon 8 Gen 2 (4 nm)",
    weight: "207.5 g or 209.5 g (7.34 oz)",
    dimensions: "164.9 x 77.1 x 8.4 mm",
    build_material: "Glass front, aluminum frame, glass/vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "LTPO4 AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~87.3% screen-to-body ratio)",
    resolution: "1440 x 3200 pixels",
    refresh_rate: "144Hz",
    brightness: "1800 nits (peak)",
    hdr: "HDR10+",
    protection: "Scratch-resistant glass",
    pixel_density: "~518 ppi density",
    
    cpu: "Octa-core (1x3.2 GHz Cortex-X3 & 2x2.8 GHz Cortex-A715 & 2x2.8 GHz Cortex-A710 & 3x2.0 GHz Cortex-A510)",
    gpu: "Adreno 740",
    fabrication: "4 nm",
    ram_variants: "12GB, 16GB",
    storage_variants: "256GB, 512GB, 1TB",
    storage_type: "UFS 4.0",
    geekbench_score: "5220 (v5)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.9, 23mm (wide), 1/1.49\", 1.0µm, PDAF, OIS",
    cam_ultrawide: "8 MP, f/2.2, 16mm (ultrawide)",
    cam_telephoto: "13 MP, f/2.5, 47mm (telephoto), PDAF, 2x optical zoom",
    cam_macro: "Supported via ultrawide",
    cam_ois: "OIS on Main Camera",
    cam_flash: "Dual-LED flash",
    cam_video: "8K@30fps, 4K@30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps, gyro-EIS",
    
    battery_capacity: "4700 mAh, non-removable",
    charging_wired: "200W wired",
    charging_wireless: "Not Supported",
    charging_reverse: "Reverse wired",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.3, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: true,
    gps_specs: "GPS, GLONASS, GALILEO, BDS, QZSS",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 13",
    ui_version: "OriginOS 3",
    update_policy: "3 Years OS Updates",
    ai_features: ["Game Frame Interpolation"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO 11S is a mid-cycle refresh of the popular iQOO 11, released primarily in the Chinese market in mid-2023. It aims to bridge the gap between the standard iQOO 11 and the ultra-premium iQOO 11 Pro by combining the best features of both models into a single, aggressive package. It retains the same flat 6.78-inch 2K 144Hz AMOLED display and Snapdragon 8 Gen 2 processor from the standard model, making it a favorite for mobile eSports competitors who prefer flat screens.\n\nThe most significant upgrade in the 11S is its charging capability. iQOO swapped out the standard model's 5000mAh battery with 120W charging for a 4700mAh cell that supports the absurdly fast 200W FlashCharge technology previously reserved only for the Pro model. It also features a slightly modified 50MP Sony IMX866 primary camera sensor. Overall, the iQOO 11S is for users who loved the flat-screen design of the standard iQOO 11 but demanded the lightning-fast 200W charging speed of the Pro.",
    key_highlights: [
      "Crazy fast 200W wired charging.",
      "Flat 6.78-inch E6 AMOLED 144Hz display.",
      "Snapdragon 8 Gen 2 performance.",
      "Sony IMX866 50MP main camera with OIS."
    ],
    verdict: "The iQOO 11S is a fantastic iterative upgrade. By bringing 200W charging to a flat-screened device, iQOO created the ultimate gaming smartphone for users who want to eliminate charging downtime entirely.",
    pros: [
      "Incredible 200W charging speeds",
      "Stunning 2K 144Hz flat display",
      "Top-tier performance",
      "Up to 1TB of storage"
    ],
    cons: [
      "Smaller battery than the standard iQOO 11",
      "Exclusive to the Chinese market",
      "No wireless charging"
    ],
    
    faqs: [
      { question: "What is the difference between iQOO 11 and iQOO 11S?", answer: "The primary difference is charging and battery. The iQOO 11S has a 4700mAh battery with 200W charging, while the iQOO 11 has a 5000mAh battery with 120W charging. The 11S also features a slightly newer Sony IMX866 main camera sensor." },
      { question: "Does the iQOO 11S have 200W charging?", answer: "Yes, it supports the same ultra-fast 200W charging found on the iQOO 11 Pro." }
    ],
    
    primary_keyword: "iQOO 11S price",
    secondary_keywords: ["iQOO 11S specs", "iQOO 11S vs iQOO 11", "iQOO 11S charging", "iQOO 11S review"],
    question_keywords: ["What is the difference between iQOO 11 and 11S?", "Does iQOO 11S have wireless charging?"],
    meta_title: "iQOO 11S Price, Specs, 200W Charging & Review | TechTweak",
    meta_description: "Discover the full specifications, 200W charging speeds, battery life, camera quality and expert review of the iQOO 11S on TechTweak.",
    meta_keywords: "iQOO 11S, iQOO 11S price, iQOO 11S specs, iQOO 11S review, Snapdragon 8 Gen 2, 200W charging",
    seo_slug: "iqoo-11s",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-11s",
    og_title: "iQOO 11S: 200W Charging Meets Flat Display Gaming",
    og_description: "Explore the iQOO 11S. 200W fast charging, 2K AMOLED flat display, and Snapdragon 8 Gen 2. Read the full review and specs.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-11s.jpg",
    twitter_title: "iQOO 11S Price & Specs: Extreme Gaming",
    twitter_description: "Snapdragon 8 Gen 2, 2K flat OLED, and 200W charging. Check out the iQOO 11S.",
    
    seo_status: "Green",
    seo_score: 93,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO 10 Pro",
    slug: "iqoo-10-pro",
    brand_name: "iQOO",
    price_usd: 730,
    price_official: 730,
    is_official: true,
    release_date: "July 2022",
    release_date_parsed: new Date("2022-07-19"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Black", "White (BMW M Motorsport)"],
    model_number: "V2218A",
    made_in: "China",
    phone_variants: "8GB/256GB, 12GB/256GB, 12GB/512GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-10-pro.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8+ Gen 1",
    camera_highlight: "50MP Triple Gimbal OIS",
    display_highlight: "6.78\" 120Hz E5 AMOLED",
    battery_highlight: "4700mAh, 200W Fast",
    benchmark_highlight: "1,080,000+ AnTuTu",
    
    processor: "Qualcomm SM8475 Snapdragon 8+ Gen 1 (4 nm)",
    weight: "215.4 g or 216.2 g (7.62 oz)",
    dimensions: "164.9 x 75.5 x 9.5 mm",
    build_material: "Glass front, aluminum frame, glass/aramid fiber back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "LTPO3 AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~89.4% screen-to-body ratio)",
    resolution: "1440 x 3200 pixels",
    refresh_rate: "120Hz",
    brightness: "1500 nits (peak)",
    hdr: "HDR10+",
    protection: "Scratch-resistant glass",
    pixel_density: "~518 ppi density",
    
    cpu: "Octa-core (1x3.19 GHz Cortex-X2 & 3x2.75 GHz Cortex-A710 & 4x1.80 GHz Cortex-A510)",
    gpu: "Adreno 730",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "256GB, 512GB",
    storage_type: "UFS 3.1",
    geekbench_score: "4100 (v5)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.9, 23mm (wide), 1/1.57\", 1.0µm, PDAF, gimbal OIS",
    cam_ultrawide: "50 MP, f/2.3, 15mm, 150˚ (ultrawide), 1/2.76\", 0.64µm, AF",
    cam_telephoto: "14.6 MP, f/2.2, 69mm (telephoto), PDAF, OIS, 3x optical zoom",
    cam_macro: "Supported via ultrawide",
    cam_ois: "Gimbal OIS on Main, Standard OIS on Telephoto",
    cam_flash: "Dual-LED flash",
    cam_video: "8K@30fps, 4K@30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps, gyro-EIS",
    
    battery_capacity: "4700 mAh, non-removable",
    charging_wired: "200W wired (100% in 10 min)",
    charging_wireless: "50W wireless",
    charging_reverse: "10W reverse wireless",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.3, A2DP, LE, aptX HD, aptX Adaptive",
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
    ui_version: "OriginOS Ocean (China), Funtouch 12 (International)",
    update_policy: "3 Years OS Updates",
    ai_features: ["Gimbal Stabilization"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "Released in mid-2022, the iQOO 10 Pro was a groundbreaking device that introduced the world to commercial 200W fast charging. Long before competitors caught up, the iQOO 10 Pro demonstrated that a 4700mAh battery could be safely charged from completely empty to 100% in a mere 10 minutes. This phone isn't just a one-trick pony, however. It utilizes the highly efficient Snapdragon 8+ Gen 1 processor, solving the overheating issues of the previous generation, and pairs it with a beautiful 6.78-inch LTPO3 curved AMOLED display running at 120Hz.\n\nThe camera setup is equally impressive. It features a 50MP primary sensor equipped with vivo's signature micro-gimbal OIS, offering video stabilization that goes far beyond standard optical systems. This is paired with a 150-degree 50MP ultrawide lens and a 3x optical telephoto lens. Wrapped in a premium design featuring an aramid fiber back or BMW M Motorsport branding, the iQOO 10 Pro remains an iconic flagship that set the benchmark for ultra-fast charging.",
    key_highlights: [
      "World's first smartphone with 200W wired charging.",
      "Snapdragon 8+ Gen 1 chipset for sustained performance.",
      "50MP main camera with Gimbal Optical Image Stabilization.",
      "Curved 6.78-inch LTPO3 AMOLED display.",
      "50W wireless charging support."
    ],
    verdict: "The iQOO 10 Pro is a historically significant flagship that pioneered 200W charging. Combining Gimbal OIS cameras, top-tier performance for its era, and rapid wireless charging, it represents a massive leap forward in smartphone hardware innovation.",
    pros: [
      "Pioneering 200W fast charging",
      "Gimbal stabilization provides incredibly smooth video",
      "Great performance from Snapdragon 8+ Gen 1",
      "Stunning curved LTPO3 display",
      "Fast ultrasonic fingerprint sensor"
    ],
    cons: [
      "Heavier and thicker than average flagships",
      "No official IP water/dust resistance rating",
      "Curved screen might not appeal to hardcore mobile gamers"
    ],
    
    faqs: [
      { question: "How long does it take to charge the iQOO 10 Pro?", answer: "The iQOO 10 Pro takes exactly 10 minutes to charge its 4700mAh battery from 0% to 100% using the included 200W charging brick." },
      { question: "What is Gimbal OIS on the iQOO 10 Pro?", answer: "Gimbal OIS is an advanced hardware stabilization system that moves the entire camera sensor on multiple axes to counteract handshakes, resulting in much smoother video recording than standard OIS." },
      { question: "Does the iQOO 10 Pro overheat?", answer: "No, thanks to the efficiency of the Snapdragon 8+ Gen 1 chipset and a large vapor chamber cooling system, the iQOO 10 Pro maintains excellent thermal management." }
    ],
    
    primary_keyword: "iQOO 10 Pro price",
    secondary_keywords: ["iQOO 10 Pro specs", "iQOO 10 Pro 200W charging", "iQOO 10 Pro review", "iQOO 10 Pro camera test", "iQOO 10 Pro antutu"],
    question_keywords: ["How long does it take to charge iQOO 10 Pro?", "Does iQOO 10 Pro have Gimbal OIS?", "Is iQOO 10 Pro waterproof?"],
    meta_title: "iQOO 10 Pro Price, Specs, 200W Charging & Review | TechTweak",
    meta_description: "Discover the full specifications, 200W charging test, Gimbal OIS camera quality, and expert review of the iQOO 10 Pro on TechTweak.",
    meta_keywords: "iQOO 10 Pro, iQOO 10 Pro price, iQOO 10 Pro specs, iQOO 10 Pro review, Snapdragon 8+ Gen 1, 200W charging, Gimbal OIS",
    seo_slug: "iqoo-10-pro",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-10-pro",
    og_title: "iQOO 10 Pro: The Pioneer of 200W Charging",
    og_description: "Explore the iQOO 10 Pro. World's first 200W fast charging phone with Gimbal OIS and Snapdragon 8+ Gen 1. Read the full review on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-10-pro.jpg",
    twitter_title: "iQOO 10 Pro Price & Specs: 200W FlashCharge",
    twitter_description: "Snapdragon 8+ Gen 1, Gimbal OIS, and 200W charging. Check out the iQOO 10 Pro.",
    
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

    console.log("Batch 1 (Part 2) seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
