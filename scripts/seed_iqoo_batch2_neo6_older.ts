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
    name: "iQOO Neo 6 (China)",
    slug: "iqoo-neo-6-china",
    brand_name: "iQOO",
    price_usd: 440,
    price_official: 440,
    is_official: true,
    release_date: "April 2022",
    release_date_parsed: new Date("2022-04-20"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Black", "Blue", "Orange (Leather)"],
    model_number: "V2196A",
    made_in: "China",
    phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo6.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8 Gen 1",
    camera_highlight: "64MP Triple OIS",
    display_highlight: "6.62\" 120Hz AMOLED",
    battery_highlight: "4700mAh, 80W Fast",
    benchmark_highlight: "1,000,000+ AnTuTu",
    
    processor: "Qualcomm SM8450 Snapdragon 8 Gen 1 (4 nm)",
    weight: "194 g or 197.2 g (6.84 oz)",
    dimensions: "163 x 76.2 x 8.5 mm or 8.9 mm",
    build_material: "Glass front, plastic frame, glass or vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "AMOLED, 120Hz",
    screen_size: "6.62 inches, 105.8 cm2 (~85.2% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "120Hz",
    brightness: "1300 nits (peak)",
    hdr: "HDR10+",
    protection: "Scratch-resistant glass",
    pixel_density: "~398 ppi density",
    
    cpu: "Octa-core (1x3.00 GHz Cortex-X2 & 3x2.50 GHz Cortex-A710 & 4x1.80 GHz Cortex-A510)",
    gpu: "Adreno 730",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3600 (v5)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "64 MP, f/1.9, 24mm (wide), 1/1.72\", 0.8µm, PDAF, OIS",
    cam_ultrawide: "12 MP, f/2.2, 116˚ (ultrawide)",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (depth)",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "4K@30fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.0, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "4700 mAh, non-removable",
    charging_wired: "80W wired (20-80% in 19 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
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
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 12",
    ui_version: "OriginOS Ocean (China)",
    update_policy: "2 Years OS Updates",
    ai_features: ["Independent Display Chip Pro"],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The iQOO Neo 6 (China edition) was launched as a true premium flagship killer. Unlike its global counterpart which utilized the Snapdragon 870, this Chinese version featured the top-tier Snapdragon 8 Gen 1 processor. This made it significantly more powerful for intense 3D gaming and heavy emulation tasks. It sports a bright 6.62-inch 120Hz AMOLED display supported by an 'Independent Display Chip Pro' designed to interpolate game frames and reduce GPU load.\n\nThe camera system is surprisingly capable, featuring a 64MP primary sensor with OIS and a proper 12MP ultrawide lens—a feature often missing or downgraded in mid-range gaming phones. With a 4700mAh battery and fast 80W charging, it provides an excellent balance of power, battery life, and photography for users in the Chinese market.",
    key_highlights: [
      "Snapdragon 8 Gen 1 processor for raw flagship performance.",
      "Independent Display Chip Pro for gaming frame interpolation.",
      "64MP main camera with OIS and a 12MP ultrawide lens.",
      "4700mAh battery with 80W fast charging.",
      "Available with a premium Orange vegan leather back."
    ],
    verdict: "The Chinese iQOO Neo 6 is a significantly better phone than its global counterpart. By including the Snapdragon 8 Gen 1 and a highly capable 12MP ultrawide camera, it stands as a full-fledged flagship rather than just a mid-range gaming phone.",
    pros: [
      "Massive performance jump over the global Neo 6",
      "Good 64MP OIS camera and 12MP ultrawide",
      "Fast 80W charging",
      "Independent display chip saves battery while gaming"
    ],
    cons: [
      "Exclusive to China (OriginOS lacks Google Play out of the box)",
      "Plastic frame",
      "Snapdragon 8 Gen 1 can run hot"
    ],
    
    faqs: [
      { question: "Is the Chinese iQOO Neo 6 different from the Indian one?", answer: "Yes, significantly. The Chinese version uses the much faster Snapdragon 8 Gen 1 processor and has a 12MP ultrawide camera, while the Indian version uses the Snapdragon 870 and an 8MP ultrawide." },
      { question: "Does the iQOO Neo 6 have an IP rating?", answer: "No, to keep costs down, there is no official water resistance rating." }
    ],
    
    primary_keyword: "iQOO Neo 6 China price",
    secondary_keywords: ["iQOO Neo 6 specs", "iQOO Neo 6 Snapdragon 8 Gen 1", "iQOO Neo 6 China review", "iQOO Neo 6 vs Poco F4 GT"],
    question_keywords: ["Difference between iQOO Neo 6 China and India?", "Is iQOO Neo 6 good for gaming?"],
    meta_title: "iQOO Neo 6 (China) Price, Specs, Gaming Test & Review",
    meta_description: "Discover the full specifications, Snapdragon 8 Gen 1 performance, camera test, and expert review of the Chinese iQOO Neo 6.",
    meta_keywords: "iQOO Neo 6, iQOO Neo 6 China price, iQOO Neo 6 specs, Snapdragon 8 Gen 1, 80W charging, gaming phone",
    seo_slug: "iqoo-neo-6-china",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-neo-6-china",
    og_title: "iQOO Neo 6 (China): The Ultimate Flagship Killer",
    og_description: "Explore the Chinese iQOO Neo 6. Snapdragon 8 Gen 1, 120Hz AMOLED, and 80W charging. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo6.jpg",
    twitter_title: "iQOO Neo 6 (China) Price & Specs",
    twitter_description: "Snapdragon 8 Gen 1, 120Hz OLED, and 80W charging. Check out the iQOO Neo 6.",
    
    seo_status: "Green",
    seo_score: 91,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Neo 6 (India)",
    slug: "iqoo-neo-6-india",
    brand_name: "iQOO",
    price_usd: 350,
    price_inr: 29999,
    price_official: 350,
    is_official: true,
    release_date: "May 2022",
    release_date_parsed: new Date("2022-05-31"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Dark Nova", "Cyber Mirage", "Maverick Orange"],
    model_number: "I2126",
    made_in: "India",
    phone_variants: "8GB/128GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo6-global.jpg"
    ],
    
    chipset_highlight: "Snapdragon 870",
    camera_highlight: "64MP Triple OIS",
    display_highlight: "6.62\" 120Hz AMOLED",
    battery_highlight: "4700mAh, 80W Fast",
    benchmark_highlight: "720,000+ AnTuTu",
    
    processor: "Qualcomm SM8250-AC Snapdragon 870 5G (7 nm)",
    weight: "190 g (6.70 oz)",
    dimensions: "163 x 76.2 x 8.5 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "AMOLED, 120Hz",
    screen_size: "6.62 inches, 105.8 cm2 (~85.2% screen-to-body ratio)",
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
    geekbench_score: "3300 (v5)",
    cooling_system: "Cascade Cooling System",
    
    cam_count: "Triple",
    cam_main_sensor: "64 MP, f/1.9, 24mm (wide), 1/1.72\", 0.8µm, PDAF, OIS",
    cam_ultrawide: "8 MP, f/2.2, 116˚ (ultrawide)",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (macro)",
    cam_ois: "OIS on Main Camera",
    cam_flash: "Dual-LED dual-tone flash",
    cam_video: "4K@30fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.0, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "4700 mAh, non-removable",
    charging_wired: "80W wired (50% in 12 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band",
    bluetooth_version: "5.2, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: false,
    gps_specs: "GPS, GLONASS, GALILEO, BDS",
    has_ir_blaster: true,
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
    ai_features: ["Cascade Cooling System"],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The iQOO Neo 6 (Indian variant) is one of the most highly recommended mid-range gaming phones of 2022. By utilizing the incredibly stable and proven Snapdragon 870 processor, it offered near-flagship performance without the severe overheating issues that plagued newer processors at the time. It handles competitive gaming like BGMI and Call of Duty Mobile at maximum frame rates with ease, supported by a 6.62-inch 120Hz AMOLED display.\n\nWhile it is built entirely of plastic to keep the price aggressive, it features a surprisingly decent 64MP main camera with OIS. It also includes 80W fast charging capable of filling its 4700mAh battery in roughly 32 minutes. For budget-conscious mobile gamers, the iQOO Neo 6 remains a legendary device in its price segment.",
    key_highlights: [
      "Snapdragon 870 processor guarantees stable, high-FPS gaming without overheating.",
      "120Hz AMOLED display with 1300 nits peak brightness.",
      "64MP main camera with Optical Image Stabilization.",
      "80W fast wired charging.",
      "Extensive Cascade Cooling system for heat management."
    ],
    verdict: "The Indian variant of the iQOO Neo 6 is a masterclass in compromise. By using a slightly older but highly reliable Snapdragon 870 chip, it provides an unbeatable gaming experience in the budget mid-range segment.",
    pros: [
      "Snapdragon 870 offers flawless sustained gaming performance",
      "Bright 120Hz AMOLED screen",
      "Very fast 80W charging",
      "OIS on the main camera"
    ],
    cons: [
      "All-plastic build feels cheap",
      "Funtouch OS has a lot of bloatware",
      "Weak 8MP ultrawide camera",
      "No 3.5mm headphone jack"
    ],
    
    faqs: [
      { question: "Is the iQOO Neo 6 good for BGMI/PUBG?", answer: "Yes, it is one of the best budget phones for BGMI. The Snapdragon 870 runs the game smoothly at 60/90fps and stays cool thanks to the large cooling chamber." },
      { question: "Does the iQOO Neo 6 have a headphone jack?", answer: "No, you will need to use a USB-C adapter or Bluetooth headphones for audio." }
    ],
    
    primary_keyword: "iQOO Neo 6 India price",
    secondary_keywords: ["iQOO Neo 6 specs", "iQOO Neo 6 review", "iQOO Neo 6 BGMI", "Snapdragon 870 phone", "iQOO Neo 6 vs Poco F4"],
    question_keywords: ["Is iQOO Neo 6 good for gaming?", "Does iQOO Neo 6 have a headphone jack?", "Is Neo 6 better than Neo 7?"],
    meta_title: "iQOO Neo 6 (India) Price, Specs, BGMI Test & Review",
    meta_description: "Discover the full specifications, BGMI gaming performance, 80W charging test, and expert review of the Indian iQOO Neo 6 featuring Snapdragon 870.",
    meta_keywords: "iQOO Neo 6, iQOO Neo 6 India price, iQOO Neo 6 specs, iQOO Neo 6 review, Snapdragon 870, 80W charging, gaming phone, BGMI",
    seo_slug: "iqoo-neo-6-india",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-neo-6-india",
    og_title: "iQOO Neo 6: The Ultimate Budget Gaming Phone",
    og_description: "Explore the iQOO Neo 6. Snapdragon 870, 120Hz AMOLED, and 80W charging. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo6-global.jpg",
    twitter_title: "iQOO Neo 6 Price & Specs: Stable Power",
    twitter_description: "Snapdragon 870, 120Hz OLED, and 80W charging. Check out the iQOO Neo 6.",
    
    seo_status: "Green",
    seo_score: 92,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Neo 5",
    slug: "iqoo-neo-5",
    brand_name: "iQOO",
    price_usd: 380,
    price_official: 380,
    is_official: true,
    release_date: "March 2021",
    release_date_parsed: new Date("2021-03-22"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Black", "Blue", "Orange"],
    model_number: "V2055A",
    made_in: "China",
    phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo5.jpg"
    ],
    
    chipset_highlight: "Snapdragon 870",
    camera_highlight: "48MP Triple OIS",
    display_highlight: "6.62\" 120Hz AMOLED",
    battery_highlight: "4400mAh, 66W Fast",
    benchmark_highlight: "710,000+ AnTuTu",
    
    processor: "Qualcomm SM8250-AC Snapdragon 870 5G (7 nm)",
    weight: "196 g (6.91 oz)",
    dimensions: "163.3 x 76.4 x 8.4 mm",
    build_material: "Glass front, plastic frame, plastic back",
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
    geekbench_score: "3300 (v5)",
    cooling_system: "Liquid Cooling Chamber",
    
    cam_count: "Triple",
    cam_main_sensor: "48 MP, f/1.8, 25mm (wide), 1/2.0\", 0.8µm, PDAF, OIS",
    cam_ultrawide: "13 MP, f/2.2, 16mm, 120˚ (ultrawide)",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (depth)",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "4K@30fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.0, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "4400 mAh, non-removable",
    charging_wired: "66W wired",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac, dual-band",
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
    ui_version: "OriginOS (China)",
    update_policy: "2 Years OS Updates",
    ai_features: ["Independent Display Chip"],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "Released in early 2021, the iQOO Neo 5 was a significant milestone for the brand, largely setting the blueprint for future mid-range gaming phones. It utilized the legendary Snapdragon 870 processor, offering flagship-level performance without the notorious overheating issues of the Snapdragon 888 generation. Uniquely, it was one of the first mid-rangers to feature an Independent Display Chip that helped interpolate frames in unsupported games to push them to 90fps or 120fps.\n\nThe device featured a brilliant 6.62-inch 120Hz AMOLED display and a decent 48MP main camera with Optical Image Stabilization (OIS). Its 4400mAh battery was paired with a 66W fast charger, allowing for quick top-ups between gaming sessions. Interestingly, this exact hardware configuration was so successful that iQOO rebranded it as the standard iQOO 7 in the Indian market later that year.",
    key_highlights: [
      "Stable, high-performance Snapdragon 870 processor.",
      "Independent Display Chip for gaming frame interpolation.",
      "48MP main camera with OIS and a 13MP ultrawide lens.",
      "120Hz AMOLED display.",
      "Later rebranded as the iQOO 7 in India."
    ],
    verdict: "The iQOO Neo 5 is a historic mid-ranger that proved you didn't need the absolute newest silicon to get a fantastic gaming experience. It is highly capable and set the standard for the 'flagship killer' segment in 2021.",
    pros: [
      "Flawless sustained performance from Snapdragon 870",
      "Independent display chip is great for gaming",
      "Good 48MP OIS main camera",
      "Solid 120Hz AMOLED screen"
    ],
    cons: [
      "Plastic frame",
      "Average 4400mAh battery life",
      "No 3.5mm headphone jack"
    ],
    
    faqs: [
      { question: "Is the iQOO Neo 5 the same as the iQOO 7 in India?", answer: "Yes, the iQOO Neo 5 (China) was launched in India under the name 'iQOO 7'. They share the exact same hardware." },
      { question: "Does the iQOO Neo 5 have an independent display chip?", answer: "Yes, it uses an extra chip to interpolate game frames, making gameplay smoother while reducing the load on the main GPU." }
    ],
    
    primary_keyword: "iQOO Neo 5 price",
    secondary_keywords: ["iQOO Neo 5 specs", "iQOO Neo 5 review", "iQOO Neo 5 vs iQOO 7", "Snapdragon 870 gaming"],
    question_keywords: ["Is iQOO Neo 5 same as iQOO 7?", "Is iQOO Neo 5 good for gaming?"],
    meta_title: "iQOO Neo 5 Price, Specs & Review | TechTweak",
    meta_description: "Discover the full specifications, gaming performance, and expert review of the iQOO Neo 5 featuring the Snapdragon 870.",
    meta_keywords: "iQOO Neo 5, iQOO Neo 5 price, iQOO Neo 5 specs, iQOO Neo 5 review, Snapdragon 870, 66W charging, gaming phone",
    seo_slug: "iqoo-neo-5",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-neo-5",
    og_title: "iQOO Neo 5: The Original Snapdragon 870 King",
    og_description: "Explore the iQOO Neo 5. Snapdragon 870, 120Hz AMOLED, and 66W charging. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo5.jpg",
    twitter_title: "iQOO Neo 5 Price & Specs",
    twitter_description: "Snapdragon 870, 120Hz OLED, and 66W charging. Check out the iQOO Neo 5.",
    
    seo_status: "Green",
    seo_score: 90,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Neo 3 5G",
    slug: "iqoo-neo-3-5g",
    brand_name: "iQOO",
    price_usd: 390,
    price_official: 390,
    is_official: true,
    release_date: "April 2020",
    release_date_parsed: new Date("2020-04-23"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Blue", "Black/Dark Blue"],
    model_number: "V1981A",
    made_in: "China",
    phone_variants: "6GB/128GB, 8GB/128GB, 8GB/256GB, 12GB/128GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo3-5g.jpg"
    ],
    
    chipset_highlight: "Snapdragon 865",
    camera_highlight: "48MP Triple",
    display_highlight: "6.57\" 144Hz IPS LCD",
    battery_highlight: "4500mAh, 44W Fast",
    benchmark_highlight: "590,000+ AnTuTu",
    
    processor: "Qualcomm SM8250 Snapdragon 865 5G (7 nm+)",
    weight: "198.1 g (6.98 oz)",
    dimensions: "163.7 x 75.6 x 8.9 mm",
    build_material: "Glass front, plastic frame, glass back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "IPS LCD",
    screen_size: "6.57 inches, 104.9 cm2 (~84.7% screen-to-body ratio)",
    resolution: "1080 x 2408 pixels",
    refresh_rate: "144Hz",
    brightness: "500 nits (typ)",
    hdr: "HDR10",
    protection: "Scratch-resistant glass",
    pixel_density: "~402 ppi density",
    
    cpu: "Octa-core (1x2.84 GHz Kryo 585 & 3x2.42 GHz Kryo 585 & 4x1.8 GHz Kryo 585)",
    gpu: "Adreno 650",
    fabrication: "7 nm+",
    ram_variants: "6GB, 8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3300 (v4)",
    cooling_system: "Liquid Cooling Tube",
    
    cam_count: "Triple",
    cam_main_sensor: "48 MP, f/1.8, (wide), 1/2.0\", 0.8µm, PDAF",
    cam_ultrawide: "8 MP, f/2.2, 16mm (ultrawide), 1/4.0\", 1.12µm",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (macro)",
    cam_ois: "Not Supported",
    cam_flash: "LED flash",
    cam_video: "4K@30fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.0, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "4500 mAh, non-removable",
    charging_wired: "44W wired (50% in 20 min, 100% in 58 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.0, A2DP, LE, aptX HD",
    has_nfc: true,
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
    ui_version: "iQOO UI 1.0 (China)",
    update_policy: "2 Years OS Updates",
    ai_features: ["Game Space"],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "Released in mid-2020, the iQOO Neo 3 5G was a breakthrough device that made flagship processing power incredibly affordable. By utilizing the top-tier Snapdragon 865 5G chipset, it delivered raw computing and gaming power that rivaled phones twice its price. To achieve this aggressive pricing, iQOO made an interesting choice: instead of an OLED display, the Neo 3 used a 6.57-inch IPS LCD, but gave it a blistering fast 144Hz refresh rate, a massive advantage for competitive gamers.\n\nIt also pleased enthusiasts by including dual stereo speakers and retaining the 3.5mm headphone jack, featuring a dedicated Hi-Fi audio chip. The 4500mAh battery was supported by 44W fast charging, very respectable for its era. While its 48MP triple camera setup lacked OIS and was decidedly average, the iQOO Neo 3 achieved legendary status as a pure, unadulterated budget gaming powerhouse.",
    key_highlights: [
      "Snapdragon 865 5G processor provides true flagship power.",
      "Blazing fast 144Hz IPS LCD display.",
      "Dual stereo speakers and a 3.5mm headphone jack with Hi-Fi DAC.",
      "4500mAh battery with 44W fast charging.",
      "Side-mounted fingerprint scanner."
    ],
    verdict: "The iQOO Neo 3 is a classic. If you were a gamer in 2020 looking for maximum performance at a minimum price, this was the phone to buy. The 144Hz LCD and Snapdragon 865 made it an emulation and competitive gaming dream.",
    pros: [
      "Snapdragon 865 is incredibly powerful",
      "144Hz refresh rate is fantastic for gaming",
      "Has a 3.5mm headphone jack and stereo speakers",
      "UFS 3.1 storage ensures fast load times"
    ],
    cons: [
      "LCD panel instead of AMOLED (inferior contrast)",
      "Cameras are very average and lack OIS",
      "Side-mounted fingerprint scanner instead of in-display"
    ],
    
    faqs: [
      { question: "Does the iQOO Neo 3 have an AMOLED display?", answer: "No, to keep the price down, it uses an IPS LCD display. However, it boasts a very high 144Hz refresh rate." },
      { question: "Is the iQOO Neo 3 good for gaming?", answer: "Yes, at launch it was one of the best budget gaming phones available, pairing the Snapdragon 865 with a 144Hz screen and a headphone jack." },
      { question: "Does it have a headphone jack?", answer: "Yes, it features a 3.5mm headphone jack with a dedicated Hi-Fi audio chip." }
    ],
    
    primary_keyword: "iQOO Neo 3 price",
    secondary_keywords: ["iQOO Neo 3 specs", "iQOO Neo 3 review", "iQOO Neo 3 5G gaming", "Snapdragon 865 phone"],
    question_keywords: ["Does iQOO Neo 3 have AMOLED?", "Does iQOO Neo 3 have a headphone jack?"],
    meta_title: "iQOO Neo 3 5G Price, Specs & Gaming Review | TechTweak",
    meta_description: "Discover the full specifications, 144Hz gaming performance, and expert review of the classic iQOO Neo 3 5G featuring Snapdragon 865.",
    meta_keywords: "iQOO Neo 3, iQOO Neo 3 price, iQOO Neo 3 specs, iQOO Neo 3 review, Snapdragon 865, 144Hz LCD, gaming phone",
    seo_slug: "iqoo-neo-3-5g",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-neo-3-5g",
    og_title: "iQOO Neo 3 5G: The Original Budget Gaming Beast",
    og_description: "Explore the iQOO Neo 3. Snapdragon 865, 144Hz display, and Hi-Fi audio. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo3-5g.jpg",
    twitter_title: "iQOO Neo 3 Price & Specs",
    twitter_description: "Snapdragon 865, 144Hz LCD, and 44W charging. Check out the iQOO Neo 3 5G.",
    
    seo_status: "Green",
    seo_score: 90,
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

    console.log("Batch 2 (Neo 6 & Older) seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
