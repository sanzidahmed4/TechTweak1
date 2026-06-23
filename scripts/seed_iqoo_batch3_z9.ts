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
    name: "iQOO Z9 Turbo",
    slug: "iqoo-z9-turbo",
    brand_name: "iQOO",
    price_usd: 280,
    price_official: 280,
    is_official: true,
    release_date: "April 2024",
    release_date_parsed: new Date("2024-04-24"),
    is_published: true,
    is_featured: true,
    upcoming: false,
    colors: ["Black", "Mint", "White"],
    model_number: "V2352A",
    made_in: "China",
    phone_variants: "12GB/256GB, 16GB/256GB, 12GB/512GB, 16GB/512GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z9-turbo.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8s Gen 3",
    camera_highlight: "50MP Dual OIS",
    display_highlight: "6.78\" 144Hz AMOLED",
    battery_highlight: "6000mAh, 80W Fast",
    benchmark_highlight: "1,500,000+ AnTuTu",
    
    processor: "Qualcomm SM8635 Snapdragon 8s Gen 3 (4 nm)",
    weight: "194.9 g (6.88 oz)",
    dimensions: "163.7 x 76 x 8 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "IP64, dust and water resistant",
    
    display_type: "AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~89.2% screen-to-body ratio)",
    resolution: "1260 x 2800 pixels",
    refresh_rate: "144Hz",
    brightness: "4500 nits (peak)",
    hdr: "HDR",
    protection: "Scratch-resistant glass",
    pixel_density: "~453 ppi density",
    
    cpu: "Octa-core (1x3.0 GHz Cortex-X4 & 4x2.8 GHz Cortex-A720 & 3x2.0 GHz Cortex-A520)",
    gpu: "Adreno 735",
    fabrication: "4 nm",
    ram_variants: "12GB, 16GB",
    storage_variants: "256GB, 512GB",
    storage_type: "UFS 4.0",
    geekbench_score: "5200 (v6)",
    cooling_system: "6000mm² VC Liquid Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "50 MP, f/1.8, (wide), 1/1.95\", 0.8µm, PDAF, OIS",
    cam_ultrawide: "8 MP, f/2.2, (ultrawide)",
    cam_telephoto: "Not Supported",
    cam_macro: "Not Supported",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "4K@30/60fps, 1080p, gyro-EIS, OIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide), 1/3.0\", 1.0µm",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "6000 mAh, non-removable",
    charging_wired: "80W wired",
    charging_wireless: "Not Supported",
    charging_reverse: "7.5W reverse wired",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.4, A2DP, LE, aptX HD, aptX Adaptive, aptX Lossless",
    has_nfc: true,
    gps_specs: "GPS, GALILEO, GLONASS, QZSS, BDS",
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
    update_policy: "2 Years OS Updates",
    ai_features: ["Independent Graphics Chip Turbo"],
    has_circle_to_search: true,
    has_ai_editing: true,
    has_live_translation: true,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO Z9 Turbo completely redefines what is possible in the budget mid-range segment. Powered by the incredible Snapdragon 8s Gen 3 processor, it offers near-flagship performance at a fraction of the cost, making it an absolute dream for mobile gamers. Despite being impressively thin at just 8mm, it houses a massive 6000mAh battery, ensuring extreme longevity even during heavy gaming sessions, and it supports 80W fast charging.\n\nIt features an exceptionally bright 144Hz AMOLED display peaking at 4500 nits, along with an IP64 rating for dust and water resistance. While the camera system is secondary to its performance—sporting a 50MP main sensor and an 8MP ultrawide—the iQOO Z9 Turbo is undeniably one of the most powerful value-for-money smartphones of 2024.",
    key_highlights: [
      "Snapdragon 8s Gen 3 provides immense performance.",
      "Massive 6000mAh battery packed into a thin 8mm body.",
      "Incredibly bright 144Hz AMOLED display peaking at 4500 nits.",
      "IP64 rating protects against dust and water splashes.",
      "Features an independent graphics chip for gaming frame interpolation."
    ],
    verdict: "If performance and battery life are your primary concerns, the iQOO Z9 Turbo is practically unbeatable at this price. It bridges the gap between mid-range and flagship like never before.",
    pros: [
      "Unmatched performance for the price (Snapdragon 8s Gen 3)",
      "Incredible battery life from the 6000mAh cell",
      "Very thin and light considering the battery size",
      "Gorgeous 144Hz 1.5K display"
    ],
    cons: [
      "Plastic frame and back",
      "Ultrawide camera is average",
      "No wireless charging"
    ],
    
    faqs: [
      { question: "Is the iQOO Z9 Turbo better than the iQOO Neo 9?", answer: "The Neo 9 uses the Snapdragon 8 Gen 2, which has a slightly stronger GPU, but the Z9 Turbo has a much larger 6000mAh battery. The Z9 Turbo is better for battery life, while the Neo 9 is slightly better for sustained extreme gaming." },
      { question: "Does the iQOO Z9 Turbo have a glass back?", answer: "No, the Z9 Turbo uses a plastic back and frame to reduce weight and keep costs down." }
    ],
    
    primary_keyword: "iQOO Z9 Turbo price",
    secondary_keywords: ["iQOO Z9 Turbo specs", "iQOO Z9 Turbo review", "Snapdragon 8s Gen 3 phone", "iQOO Z9 Turbo antutu", "6000mAh battery phone"],
    question_keywords: ["Is iQOO Z9 Turbo good for gaming?", "Does iQOO Z9 Turbo have wireless charging?"],
    meta_title: "iQOO Z9 Turbo Price, Specs, Snapdragon 8s Gen 3 & Review",
    meta_description: "Discover the full specifications, Snapdragon 8s Gen 3 performance, massive 6000mAh battery test, and expert review of the iQOO Z9 Turbo on TechTweak.",
    meta_keywords: "iQOO Z9 Turbo, iQOO Z9 Turbo price, iQOO Z9 Turbo specs, Snapdragon 8s Gen 3, 6000mAh, gaming phone",
    seo_slug: "iqoo-z9-turbo",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-z9-turbo",
    og_title: "iQOO Z9 Turbo: Flagship Power, 6000mAh Battery",
    og_description: "Explore the iQOO Z9 Turbo. Snapdragon 8s Gen 3, 144Hz AMOLED, and 6000mAh battery. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z9-turbo.jpg",
    twitter_title: "iQOO Z9 Turbo Price & Specs: Unbeatable Value",
    twitter_description: "Snapdragon 8s Gen 3, 144Hz OLED, and 6000mAh. Check out the iQOO Z9 Turbo.",
    
    seo_status: "Green",
    seo_score: 95,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Z9s Pro",
    slug: "iqoo-z9s-pro",
    brand_name: "iQOO",
    price_usd: 300,
    price_inr: 24999,
    price_official: 300,
    is_official: true,
    release_date: "August 2024",
    release_date_parsed: new Date("2024-08-23"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Luxe Marble (Glossy)", "Flamboyant Orange (Leather)"],
    model_number: "I2305",
    made_in: "India",
    phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z9s-pro.jpg"
    ],
    
    chipset_highlight: "Snapdragon 7 Gen 3",
    camera_highlight: "50MP Dual OIS",
    display_highlight: "6.77\" 120Hz Curved AMOLED",
    battery_highlight: "5500mAh, 80W Fast",
    benchmark_highlight: "800,000+ AnTuTu",
    
    processor: "Qualcomm SM7550-AB Snapdragon 7 Gen 3 (4 nm)",
    weight: "185 g or 190 g (6.53 oz)",
    dimensions: "163.7 x 75 x 7.5 mm",
    build_material: "Glass front, plastic frame, glass or vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "IP64, dust and water resistant",
    
    display_type: "AMOLED, 1B colors, Curved",
    screen_size: "6.77 inches, 110.8 cm2 (~90.3% screen-to-body ratio)",
    resolution: "1080 x 2392 pixels",
    refresh_rate: "120Hz",
    brightness: "4500 nits (peak)",
    hdr: "HDR10+",
    protection: "Schott Xensation Up",
    pixel_density: "~388 ppi density",
    
    cpu: "Octa-core (1x2.63 GHz Cortex-A715 & 3x2.4 GHz Cortex-A715 & 4x1.8 GHz Cortex-A510)",
    gpu: "Adreno 720",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 2.2",
    geekbench_score: "3200 (v6)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "50 MP, f/1.8, (wide), 1/1.95\", 0.8µm, PDAF, OIS",
    cam_ultrawide: "8 MP, f/2.2, 120˚ (ultrawide)",
    cam_telephoto: "Not Supported",
    cam_macro: "Not Supported",
    cam_ois: "OIS on Main Camera",
    cam_flash: "Ring-LED flash",
    cam_video: "4K@30fps, 1080p, gyro-EIS, OIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5500 mAh, non-removable",
    charging_wired: "80W wired",
    charging_wireless: "Not Supported",
    charging_reverse: "7.5W reverse wired",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.4, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: false,
    gps_specs: "GPS, GLONASS, GALILEO, BDS, QZSS",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 14",
    ui_version: "Funtouch 14",
    update_policy: "2 Years OS Updates",
    ai_features: ["AI Erase", "AI Photo Enhance"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The iQOO Z9s Pro is a premium mid-range offering that focuses heavily on aesthetics and balanced performance. It features a striking 6.77-inch 3D curved AMOLED display with incredibly thin bezels, giving it a flagship-level look and feel, especially in the Flamboyant Orange vegan leather finish. Powered by the efficient Snapdragon 7 Gen 3 processor, it handles daily tasks and moderate gaming with absolute ease, while maintaining excellent battery life.\n\nSpeaking of battery, it houses a large 5500mAh cell squeezed into a remarkably thin 7.5mm profile, complemented by 80W fast charging. The camera system features a reliable 50MP Sony IMX882 sensor with OIS, alongside an 8MP ultrawide lens. While it uses older UFS 2.2 storage, the overall package makes the Z9s Pro one of the most stylish and dependable smartphones in its price bracket.",
    key_highlights: [
      "Gorgeous 3D curved AMOLED display with 4500 nits peak brightness.",
      "Snapdragon 7 Gen 3 offers an excellent balance of power and efficiency.",
      "Super slim 7.5mm design despite housing a large 5500mAh battery.",
      "50MP Sony IMX882 primary camera with OIS.",
      "IP64 dust and water resistance."
    ],
    verdict: "The iQOO Z9s Pro is for users who want flagship aesthetics and reliable daily performance rather than raw gaming power. Its curved display and leather finish make it feel far more expensive than it is.",
    pros: [
      "Stunning premium design with a curved screen",
      "Excellent battery life and fast 80W charging",
      "Very bright display",
      "Good primary camera performance"
    ],
    cons: [
      "Uses slower UFS 2.2 storage",
      "Funtouch OS bloatware",
      "No NFC or headphone jack",
      "Video recording capped at 4K 30fps"
    ],
    
    faqs: [
      { question: "Is the iQOO Z9s Pro good for heavy gaming?", answer: "The Snapdragon 7 Gen 3 is capable, but it is not a dedicated gaming chip. It handles BGMI/PUBG well at 60fps, but hardcore gamers should look at the iQOO Neo series instead." },
      { question: "Does the iQOO Z9s Pro have a curved display?", answer: "Yes, it features a 3D curved AMOLED display which gives it a very premium look and thin bezels." }
    ],
    
    primary_keyword: "iQOO Z9s Pro price",
    secondary_keywords: ["iQOO Z9s Pro specs", "iQOO Z9s Pro review", "Snapdragon 7 Gen 3 phone", "iQOO Z9s Pro camera"],
    question_keywords: ["Is iQOO Z9s Pro curved?", "Does Z9s Pro have UFS 3.1?"],
    meta_title: "iQOO Z9s Pro Price, Specs, Curved Display & Review",
    meta_description: "Discover the full specifications, Snapdragon 7 Gen 3 performance, camera test, and expert review of the beautifully curved iQOO Z9s Pro.",
    meta_keywords: "iQOO Z9s Pro, iQOO Z9s Pro price, iQOO Z9s Pro specs, Snapdragon 7 Gen 3, curved display, 5500mAh",
    seo_slug: "iqoo-z9s-pro",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-z9s-pro",
    og_title: "iQOO Z9s Pro: Premium Aesthetics on a Budget",
    og_description: "Explore the iQOO Z9s Pro. Curved AMOLED, Snapdragon 7 Gen 3, and 5500mAh battery. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z9s-pro.jpg",
    twitter_title: "iQOO Z9s Pro Price & Specs",
    twitter_description: "Snapdragon 7 Gen 3, Curved OLED, and 80W charging. Check out the iQOO Z9s Pro.",
    
    seo_status: "Green",
    seo_score: 91,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Z9s",
    slug: "iqoo-z9s",
    brand_name: "iQOO",
    price_usd: 240,
    price_inr: 19999,
    price_official: 240,
    is_official: true,
    release_date: "August 2024",
    release_date_parsed: new Date("2024-08-23"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Titanium Matte", "Onyx Green"],
    model_number: "I2304",
    made_in: "India",
    phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z9s.jpg"
    ],
    
    chipset_highlight: "Dimensity 7300",
    camera_highlight: "50MP Dual OIS",
    display_highlight: "6.77\" 120Hz Curved AMOLED",
    battery_highlight: "5500mAh, 44W Fast",
    benchmark_highlight: "650,000+ AnTuTu",
    
    processor: "Mediatek Dimensity 7300 (4 nm)",
    weight: "180 g or 182 g (6.35 oz)",
    dimensions: "163.7 x 75 x 7.5 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "IP64, dust and water resistant",
    
    display_type: "AMOLED, 1B colors, Curved",
    screen_size: "6.77 inches, 110.8 cm2 (~90.3% screen-to-body ratio)",
    resolution: "1080 x 2392 pixels",
    refresh_rate: "120Hz",
    brightness: "1800 nits (peak)",
    hdr: "HDR10+",
    protection: "Schott Xensation Up",
    pixel_density: "~388 ppi density",
    
    cpu: "Octa-core (4x2.5 GHz Cortex-A78 & 4x2.0 GHz Cortex-A55)",
    gpu: "Mali-G615 MC2",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 2.2",
    geekbench_score: "2800 (v6)",
    cooling_system: "Liquid Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "50 MP, f/1.8, (wide), PDAF, OIS",
    cam_ultrawide: "Not Supported",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (depth)",
    cam_ois: "OIS on Main Camera",
    cam_flash: "Ring-LED flash",
    cam_video: "4K@30/60fps, 1080p, gyro-EIS, OIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5500 mAh, non-removable",
    charging_wired: "44W wired",
    charging_wireless: "Not Supported",
    charging_reverse: "7.5W reverse wired",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.4, A2DP, LE",
    has_nfc: false,
    gps_specs: "GPS, GLONASS, GALILEO, BDS, QZSS",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 14",
    ui_version: "Funtouch 14",
    update_policy: "2 Years OS Updates",
    ai_features: ["AI Erase", "AI Photo Enhance"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The standard iQOO Z9s provides the same luxurious curved display aesthetics as the Pro model, but drops the price further by utilizing a more budget-focused MediaTek Dimensity 7300 processor. It retains the exceptionally thin 7.5mm profile while incredibly managing to keep the massive 5500mAh battery intact, though charging speeds drop slightly from 80W to 44W compared to the Pro.\n\nAnother compromise is the camera setup; the Z9s loses the 8MP ultrawide lens, replacing it with a 2MP depth sensor, though it retains the excellent 50MP Sony IMX882 primary camera with OIS. If you want the premium look and feel of a curved AMOLED screen and stellar battery life on a strict budget, the iQOO Z9s is a compelling option.",
    key_highlights: [
      "Curved 120Hz AMOLED display provides flagship aesthetics.",
      "Incredibly thin 7.5mm profile despite a 5500mAh battery.",
      "Reliable 50MP Sony IMX882 main camera with OIS.",
      "MediaTek Dimensity 7300 processor for solid daily performance.",
      "IP64 protection rating."
    ],
    verdict: "The iQOO Z9s is all about style and battery life. It sacrifices an ultrawide camera and the absolute fastest charging speeds to bring a beautiful curved AMOLED screen to a lower price point.",
    pros: [
      "Premium curved display on a budget",
      "Massive 5500mAh battery in a very slim phone",
      "Good primary 50MP OIS camera",
      "IP64 rating"
    ],
    cons: [
      "No ultrawide camera",
      "44W charging is slightly slow for the battery size",
      "Uses slower UFS 2.2 storage",
      "No 3.5mm headphone jack"
    ],
    
    faqs: [
      { question: "What is the difference between iQOO Z9s and Z9s Pro?", answer: "The Z9s Pro has a faster Snapdragon 7 Gen 3 chip, an 8MP ultrawide camera, and 80W charging. The standard Z9s uses the Dimensity 7300, lacks an ultrawide camera, and has 44W charging. They look almost identical." },
      { question: "Does the iQOO Z9s have a curved screen?", answer: "Yes, it shares the exact same 6.77-inch 3D curved AMOLED display as the Pro model." }
    ],
    
    primary_keyword: "iQOO Z9s price",
    secondary_keywords: ["iQOO Z9s specs", "iQOO Z9s review", "Dimensity 7300 phone", "iQOO Z9s vs Z9s Pro"],
    question_keywords: ["Is iQOO Z9s curved?", "Does iQOO Z9s have ultrawide camera?"],
    meta_title: "iQOO Z9s Price, Specs, Dimensity 7300 & Review",
    meta_description: "Discover the full specifications, curved AMOLED display, 5500mAh battery test, and expert review of the iQOO Z9s.",
    meta_keywords: "iQOO Z9s, iQOO Z9s price, iQOO Z9s specs, Dimensity 7300, curved display, 5500mAh, budget phone",
    seo_slug: "iqoo-z9s",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-z9s",
    og_title: "iQOO Z9s: Beautifully Curved & Budget Friendly",
    og_description: "Explore the iQOO Z9s. Curved AMOLED, Dimensity 7300, and 5500mAh battery. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z9s.jpg",
    twitter_title: "iQOO Z9s Price & Specs",
    twitter_description: "Dimensity 7300, Curved OLED, and 5500mAh. Check out the iQOO Z9s.",
    
    seo_status: "Green",
    seo_score: 90,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Z9",
    slug: "iqoo-z9",
    brand_name: "iQOO",
    price_usd: 240,
    price_inr: 19999,
    price_official: 240,
    is_official: true,
    release_date: "March 2024",
    release_date_parsed: new Date("2024-03-12"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Brushed Green", "Graphene Blue"],
    model_number: "I2302",
    made_in: "India",
    phone_variants: "8GB/128GB, 8GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z9-india.jpg"
    ],
    
    chipset_highlight: "Dimensity 7200",
    camera_highlight: "50MP Dual OIS",
    display_highlight: "6.67\" 120Hz AMOLED",
    battery_highlight: "5000mAh, 44W Fast",
    benchmark_highlight: "730,000+ AnTuTu",
    
    processor: "Mediatek Dimensity 7200 (4 nm)",
    weight: "188 g (6.63 oz)",
    dimensions: "163.2 x 75.8 x 7.8 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "IP54, dust and splash resistant",
    
    display_type: "AMOLED, 120Hz",
    screen_size: "6.67 inches, 107.4 cm2 (~86.8% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "120Hz",
    brightness: "1800 nits (peak)",
    hdr: "HDR10+",
    protection: "DT-Star2 Glass",
    pixel_density: "~395 ppi density",
    
    cpu: "Octa-core (2x2.8 GHz Cortex-A715 & 6x 2.0 Cortex-A510)",
    gpu: "Mali-G610 MC4",
    fabrication: "4 nm",
    ram_variants: "8GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 2.2",
    geekbench_score: "2600 (v6)",
    cooling_system: "Graphite Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "50 MP, f/1.8, (wide), 1/1.95\", 0.8µm, PDAF, OIS",
    cam_ultrawide: "Not Supported",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (depth)",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "4K@30fps, 1080p, gyro-EIS, OIS",
    
    cam_front_resolution: "16 MP, f/2.0, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5000 mAh, non-removable",
    charging_wired: "44W wired (50% in 30 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.3, A2DP, LE",
    has_nfc: false,
    gps_specs: "GPS, GLONASS, GALILEO, BDS, QZSS",
    has_ir_blaster: false,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 14",
    ui_version: "Funtouch 14",
    update_policy: "2 Years OS Updates",
    ai_features: [],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The standard iQOO Z9 (Global/India variant) is a highly competitive lower-mid-range device powered by the MediaTek Dimensity 7200. This 4nm processor provides exceptional performance in its price tier, easily achieving over 700,000 points on AnTuTu and handling popular games with ease. It sports a bright, flat 6.67-inch 120Hz AMOLED display with 1800 nits peak brightness.\n\nLike many phones in the Z-series, it prioritizes performance over camera versatility. While the 50MP Sony IMX882 primary sensor with OIS takes excellent photos, it completely lacks an ultrawide lens. The 5000mAh battery combined with the efficient processor results in outstanding battery life, supported by 44W fast charging. It's a fantastic, no-nonsense choice for users wanting maximum speed on a tight budget.",
    key_highlights: [
      "MediaTek Dimensity 7200 provides class-leading performance.",
      "50MP Sony IMX882 primary camera with OIS.",
      "Bright 120Hz AMOLED display.",
      "Excellent battery life from the 5000mAh cell.",
      "Slim and lightweight design at just 7.8mm thick."
    ],
    verdict: "The iQOO Z9 is a performance champion in the budget segment. While the lack of an ultrawide camera is disappointing, the speed of the Dimensity 7200 and the quality of the AMOLED display make it an easy recommendation for gamers on a budget.",
    pros: [
      "Dimensity 7200 offers fantastic performance",
      "Very bright and vibrant AMOLED screen",
      "Primary camera takes great photos",
      "Excellent battery life"
    ],
    cons: [
      "No ultrawide camera",
      "Bloatware in Funtouch OS",
      "Only IP54 splash resistance"
    ],
    
    faqs: [
      { question: "Is the iQOO Z9 good for gaming?", answer: "Yes, the Dimensity 7200 is one of the most powerful processors in this price segment, making it great for gaming at medium to high settings." },
      { question: "Does the iQOO Z9 have a headphone jack?", answer: "No, it does not have a 3.5mm headphone jack." }
    ],
    
    primary_keyword: "iQOO Z9 price",
    secondary_keywords: ["iQOO Z9 specs", "iQOO Z9 review", "Dimensity 7200 phone", "iQOO Z9 antutu"],
    question_keywords: ["Is iQOO Z9 good for gaming?", "Does iQOO Z9 have an ultrawide camera?"],
    meta_title: "iQOO Z9 Price, Specs, Dimensity 7200 & Review",
    meta_description: "Discover the full specifications, Dimensity 7200 performance, camera test, and expert review of the iQOO Z9 on TechTweak.",
    meta_keywords: "iQOO Z9, iQOO Z9 price, iQOO Z9 specs, Dimensity 7200, 120Hz AMOLED, budget phone",
    seo_slug: "iqoo-z9",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-z9",
    og_title: "iQOO Z9: Budget Performance Champion",
    og_description: "Explore the iQOO Z9. Dimensity 7200, 120Hz AMOLED, and 5000mAh battery. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z9-india.jpg",
    twitter_title: "iQOO Z9 Price & Specs",
    twitter_description: "Dimensity 7200, 120Hz OLED, and 50MP OIS. Check out the iQOO Z9.",
    
    seo_status: "Green",
    seo_score: 90,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Z9x",
    slug: "iqoo-z9x",
    brand_name: "iQOO",
    price_usd: 170,
    price_inr: 12999,
    price_official: 170,
    is_official: true,
    release_date: "April 2024",
    release_date_parsed: new Date("2024-04-24"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Tornado Green", "Storm Grey", "Starburst White"],
    model_number: "I2219",
    made_in: "China",
    phone_variants: "4GB/128GB, 6GB/128GB, 8GB/128GB, 8GB/256GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z9x.jpg"
    ],
    
    chipset_highlight: "Snapdragon 6 Gen 1",
    camera_highlight: "50MP Dual",
    display_highlight: "6.72\" 120Hz IPS LCD",
    battery_highlight: "6000mAh, 44W Fast",
    benchmark_highlight: "500,000+ AnTuTu",
    
    processor: "Qualcomm SM6450 Snapdragon 6 Gen 1 (4 nm)",
    weight: "199 g (7.02 oz)",
    dimensions: "165.7 x 76 x 8 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "IP64, dust and water resistant",
    
    display_type: "IPS LCD",
    screen_size: "6.72 inches, 109.0 cm2 (~86.4% screen-to-body ratio)",
    resolution: "1080 x 2408 pixels",
    refresh_rate: "120Hz",
    brightness: "1000 nits (peak)",
    hdr: "Not Supported",
    protection: "Scratch-resistant glass",
    pixel_density: "~393 ppi density",
    
    cpu: "Octa-core (4x2.2 GHz Cortex-A78 & 4x1.8 GHz Cortex-A55)",
    gpu: "Adreno 710",
    fabrication: "4 nm",
    ram_variants: "4GB, 6GB, 8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 2.2",
    geekbench_score: "2300 (v6)",
    cooling_system: "Graphite Sheet",
    
    cam_count: "Dual",
    cam_main_sensor: "50 MP, f/1.8, (wide), PDAF",
    cam_ultrawide: "Not Supported",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (depth)",
    cam_ois: "Not Supported",
    cam_flash: "LED flash",
    cam_video: "4K@30fps, 1080p@30fps",
    
    cam_front_resolution: "8 MP, f/2.1, (wide)",
    cam_front_hdr: "Not Supported",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "6000 mAh, non-removable",
    charging_wired: "44W wired",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band",
    bluetooth_version: "5.1, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: false,
    gps_specs: "GPS, GALILEO, GLONASS, BDS, QZSS",
    has_ir_blaster: false,
    has_audio_jack: true,
    usb_version: "2.0",
    
    sensor_fingerprint: "Side-mounted",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 14",
    ui_version: "Funtouch 14 / OriginOS 4",
    update_policy: "2 Years OS Updates",
    ai_features: [],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The iQOO Z9x is the most budget-friendly entry in the Z9 series, designed for users who prioritize battery life and essential performance over premium features. Its standout feature is an absolutely massive 6000mAh battery. Paired with the highly efficient 4nm Snapdragon 6 Gen 1 processor, the Z9x offers multi-day battery life for casual users and can easily survive the most demanding, all-day gaming sessions.\n\nTo keep the price extremely low, iQOO opted for a 120Hz IPS LCD rather than an AMOLED screen, and a basic 50MP camera without Optical Image Stabilization (OIS). However, it retains a 3.5mm headphone jack and expandable storage via microSDXC, features that many budget buyers still value heavily. It is a workhorse device focused entirely on longevity.",
    key_highlights: [
      "Gigantic 6000mAh battery provides outstanding battery life.",
      "Snapdragon 6 Gen 1 offers smooth, efficient daily performance.",
      "120Hz IPS LCD display with 1000 nits peak brightness.",
      "Retains the 3.5mm headphone jack and expandable microSD storage.",
      "IP64 dust and water resistance."
    ],
    verdict: "If you want a phone that simply refuses to die, the iQOO Z9x is for you. The 6000mAh battery combined with a 4nm chip makes it a battery king, though the LCD screen and average cameras reflect its budget price.",
    pros: [
      "Phenomenal battery life from the 6000mAh cell",
      "Solid daily performance from the Snapdragon 6 Gen 1",
      "Has a headphone jack and microSD slot",
      "IP64 rating is rare at this price"
    ],
    cons: [
      "IPS LCD screen instead of AMOLED",
      "Cameras are very basic and lack OIS",
      "Base model only has 4GB RAM"
    ],
    
    faqs: [
      { question: "Does the iQOO Z9x have an AMOLED screen?", answer: "No, it uses an IPS LCD screen to keep the cost down." },
      { question: "Can I expand the storage on the iQOO Z9x?", answer: "Yes, it supports microSDXC cards for storage expansion, which is a rare feature in modern smartphones." }
    ],
    
    primary_keyword: "iQOO Z9x price",
    secondary_keywords: ["iQOO Z9x specs", "iQOO Z9x review", "Snapdragon 6 Gen 1 phone", "6000mAh battery phone budget"],
    question_keywords: ["Does iQOO Z9x have AMOLED?", "Does iQOO Z9x have expandable storage?"],
    meta_title: "iQOO Z9x Price, Specs, 6000mAh Battery & Review",
    meta_description: "Discover the full specifications, Snapdragon 6 Gen 1 performance, massive 6000mAh battery test, and expert review of the budget iQOO Z9x.",
    meta_keywords: "iQOO Z9x, iQOO Z9x price, iQOO Z9x specs, Snapdragon 6 Gen 1, 6000mAh battery, budget phone",
    seo_slug: "iqoo-z9x",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-z9x",
    og_title: "iQOO Z9x: The Budget Battery King",
    og_description: "Explore the iQOO Z9x. Snapdragon 6 Gen 1, 120Hz LCD, and a massive 6000mAh battery. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z9x.jpg",
    twitter_title: "iQOO Z9x Price & Specs",
    twitter_description: "Snapdragon 6 Gen 1, 120Hz LCD, and 6000mAh. Check out the iQOO Z9x.",
    
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

    console.log("Batch 3 (Z9 Series) seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
