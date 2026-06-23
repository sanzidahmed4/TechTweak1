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
    name: "iQOO Z7 Pro",
    slug: "iqoo-z7-pro",
    brand_name: "iQOO",
    price_usd: 290,
    price_inr: 23999,
    price_official: 290,
    is_official: true,
    release_date: "September 2023",
    release_date_parsed: new Date("2023-09-05"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Blue Lagoon", "Graphite Matte"],
    model_number: "I2301",
    made_in: "India",
    phone_variants: "8GB/128GB, 8GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z7-pro.jpg"
    ],
    
    chipset_highlight: "Dimensity 7200",
    camera_highlight: "64MP Dual OIS",
    display_highlight: "6.78\" 120Hz Curved AMOLED",
    battery_highlight: "4600mAh, 66W Fast",
    benchmark_highlight: "710,000+ AnTuTu",
    
    processor: "Mediatek Dimensity 7200 (4 nm)",
    weight: "175 g (6.17 oz)",
    dimensions: "164.1 x 74.8 x 7.4 mm",
    build_material: "Glass front, plastic frame, glass back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "IP54, dust and splash resistant",
    
    display_type: "AMOLED, 1B colors, Curved",
    screen_size: "6.78 inches, 111.0 cm2 (~90.4% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "120Hz",
    brightness: "1300 nits (peak)",
    hdr: "HDR10+",
    protection: "Schott Xensation Up",
    pixel_density: "~388 ppi density",
    
    cpu: "Octa-core (2x2.8 GHz Cortex-A715 & 6x 2.0 Cortex-A510)",
    gpu: "Mali-G610 MC4",
    fabrication: "4 nm",
    ram_variants: "8GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 2.2",
    geekbench_score: "2600 (v6)",
    cooling_system: "Vapor Chamber Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "64 MP, f/1.8, (wide), PDAF, OIS",
    cam_ultrawide: "Not Supported",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (depth)",
    cam_ois: "OIS on Main Camera",
    cam_flash: "Ring-LED flash",
    cam_video: "4K@30fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "4600 mAh, non-removable",
    charging_wired: "66W wired (50% in 22 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.3, A2DP, LE",
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
    
    android_version: "Android 13",
    ui_version: "Funtouch 14",
    update_policy: "2 Years OS Updates",
    ai_features: [],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The iQOO Z7 Pro represents a significant shift for the Z-series, pivoting from pure utilitarian gaming to a highly premium, aesthetic-focused design. Its standout feature is a stunning 6.78-inch 3D curved AMOLED display with incredibly thin bezels, giving it the look and feel of a much more expensive flagship. It is exceptionally thin and light, measuring just 7.4mm thick and weighing only 175g.\n\nDespite its sleek profile, it packs the highly capable 4nm MediaTek Dimensity 7200 processor, delivering excellent performance that easily handles daily tasks and moderate gaming. The 64MP OIS main camera takes vibrant photos, assisted by a unique Aura Ring Light flash. To achieve its thin design, the battery is slightly smaller at 4600mAh, and it omits the ultrawide camera, stereo speakers, and 3.5mm headphone jack. It is an ideal phone for users who want flagship-level style without breaking the bank.",
    key_highlights: [
      "Gorgeous 3D curved AMOLED display with ultra-thin bezels.",
      "Exceptionally thin and light design (7.4mm, 175g).",
      "MediaTek Dimensity 7200 provides highly efficient, stable performance.",
      "64MP main camera with Optical Image Stabilization (OIS).",
      "66W fast charging."
    ],
    verdict: "The iQOO Z7 Pro is one of the most beautiful phones in its price segment. It trades some utilitarian features like a larger battery and stereo speakers to achieve a stunning, lightweight, curved-display design.",
    pros: [
      "Stunning curved AMOLED display",
      "Very thin and lightweight",
      "Solid performance from the Dimensity 7200",
      "Good primary camera"
    ],
    cons: [
      "No ultrawide camera",
      "Single bottom-firing speaker (no stereo)",
      "Smaller 4600mAh battery"
    ],
    
    faqs: [
      { question: "Is the iQOO Z7 Pro good for gaming?", answer: "Yes, the Dimensity 7200 handles games like BGMI at 60fps smoothly. However, hardcore gamers might prefer the flat-screen iQOO Neo series." },
      { question: "Does the iQOO Z7 Pro have an ultrawide camera?", answer: "No, it only has a 64MP main camera and a 2MP depth sensor." },
      { question: "Does it have stereo speakers?", answer: "No, it features a single bottom-firing speaker." }
    ],
    
    primary_keyword: "iQOO Z7 Pro price",
    secondary_keywords: ["iQOO Z7 Pro specs", "iQOO Z7 Pro review", "Dimensity 7200 phone", "curved display phone budget"],
    question_keywords: ["Does iQOO Z7 Pro have ultrawide camera?", "Is iQOO Z7 Pro curved?", "Does iQOO Z7 Pro have stereo speakers?"],
    meta_title: "iQOO Z7 Pro Price, Specs, Curved Display & Review",
    meta_description: "Discover the full specifications, Dimensity 7200 performance, camera test, and expert review of the beautifully curved iQOO Z7 Pro.",
    meta_keywords: "iQOO Z7 Pro, iQOO Z7 Pro price, iQOO Z7 Pro specs, Dimensity 7200, curved display, budget premium phone",
    seo_slug: "iqoo-z7-pro",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-z7-pro",
    og_title: "iQOO Z7 Pro: Flagship Looks on a Budget",
    og_description: "Explore the iQOO Z7 Pro. Curved AMOLED, Dimensity 7200, and an ultra-thin design. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z7-pro.jpg",
    twitter_title: "iQOO Z7 Pro Price & Specs",
    twitter_description: "Dimensity 7200, Curved OLED, and 64MP OIS. Check out the iQOO Z7 Pro.",
    
    seo_status: "Green",
    seo_score: 92,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Z7 (India)",
    slug: "iqoo-z7-india",
    brand_name: "iQOO",
    price_usd: 230,
    price_inr: 18999,
    price_official: 230,
    is_official: true,
    release_date: "March 2023",
    release_date_parsed: new Date("2023-03-21"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Norway Blue", "Pacific Night"],
    model_number: "I2207",
    made_in: "India",
    phone_variants: "6GB/128GB, 8GB/128GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z7-5g.jpg"
    ],
    
    chipset_highlight: "Dimensity 920",
    camera_highlight: "64MP Dual OIS",
    display_highlight: "6.38\" 90Hz AMOLED",
    battery_highlight: "4500mAh, 44W Fast",
    benchmark_highlight: "480,000+ AnTuTu",
    
    processor: "Mediatek Dimensity 920 (6 nm)",
    weight: "173 g (6.10 oz)",
    dimensions: "158.9 x 73.5 x 7.8 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Hybrid Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "IP54, dust and splash resistant",
    
    display_type: "AMOLED, 90Hz",
    screen_size: "6.38 inches, 98.3 cm2 (~84.1% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "90Hz",
    brightness: "1300 nits (peak)",
    hdr: "HDR10+",
    protection: "Schott Xensation glass",
    pixel_density: "~413 ppi density",
    
    cpu: "Octa-core (2x2.5 GHz Cortex-A78 & 6x2.0 GHz Cortex-A55)",
    gpu: "Mali-G68 MC4",
    fabrication: "6 nm",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB",
    storage_type: "UFS 2.2",
    geekbench_score: "2300 (v5)",
    cooling_system: "Graphite Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "64 MP, f/1.8, (wide), PDAF, OIS",
    cam_ultrawide: "Not Supported",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (depth)",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "4K@30fps, 1080p@30fps",
    
    cam_front_resolution: "16 MP, f/2.0, (wide)",
    cam_front_hdr: "Not Supported",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "4500 mAh, non-removable",
    charging_wired: "44W wired (50% in 25 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.2, A2DP, LE",
    has_nfc: false,
    gps_specs: "GPS, GLONASS, GALILEO, BDS",
    has_ir_blaster: false,
    has_audio_jack: true,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 13",
    ui_version: "Funtouch 13",
    update_policy: "2 Years OS Updates",
    ai_features: [],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The iQOO Z7 launched in India is a compact, aggressively priced mid-ranger that targets everyday performance rather than hardcore gaming. It is powered by the MediaTek Dimensity 920 processor, which provides smooth performance for daily tasks and casual gaming. Its defining characteristic is its size; featuring a 6.38-inch AMOLED display, it is significantly smaller and easier to use one-handed than most modern smartphones.\n\nThe AMOLED screen is vibrant and supports a 90Hz refresh rate, though it retains an older waterdrop notch design rather than a modern punch-hole. It features a capable 64MP main camera equipped with Optical Image Stabilization (OIS), a rare inclusion at this price point. With a 4500mAh battery, 44W fast charging, and a 3.5mm headphone jack, it is a highly practical device for users who prefer smaller phones.",
    key_highlights: [
      "Compact 6.38-inch 90Hz AMOLED display.",
      "MediaTek Dimensity 920 processor provides balanced performance.",
      "64MP primary camera featuring Optical Image Stabilization.",
      "Retains the 3.5mm headphone jack and expandable storage via microSD.",
      "IP54 dust and splash resistance."
    ],
    verdict: "The iQOO Z7 (India) is an excellent choice for users who want a compact phone with a great AMOLED display, solid daily performance, and OIS on the camera. However, its outdated waterdrop notch design and lack of an ultrawide camera hold it back slightly.",
    pros: [
      "Compact and lightweight design",
      "Bright AMOLED screen",
      "64MP OIS camera takes good photos",
      "Has a headphone jack and microSD slot"
    ],
    cons: [
      "Outdated waterdrop notch design",
      "Only a 90Hz refresh rate",
      "No ultrawide camera",
      "Funtouch OS bloatware"
    ],
    
    faqs: [
      { question: "Is the Indian iQOO Z7 different from the Chinese Z7?", answer: "Yes, completely different. The Chinese Z7 has a larger 120Hz LCD screen, a much faster processor, and 120W charging. The Indian Z7 is a smaller, cheaper phone with a 90Hz AMOLED screen." },
      { question: "Does the iQOO Z7 have a headphone jack?", answer: "Yes, it retains the 3.5mm audio jack." }
    ],
    
    primary_keyword: "iQOO Z7 price",
    secondary_keywords: ["iQOO Z7 specs", "iQOO Z7 review", "Dimensity 920 phone", "iQOO Z7 camera"],
    question_keywords: ["Does iQOO Z7 have OIS?", "Is iQOO Z7 India different from China?"],
    meta_title: "iQOO Z7 (India) Price, Specs, Dimensity 920 & Review",
    meta_description: "Discover the full specifications, compact 90Hz AMOLED display, camera test, and expert review of the iQOO Z7 featuring Dimensity 920.",
    meta_keywords: "iQOO Z7, iQOO Z7 price, iQOO Z7 specs, Dimensity 920, 90Hz AMOLED, compact phone",
    seo_slug: "iqoo-z7-india",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-z7-india",
    og_title: "iQOO Z7 (India): The Compact Budget All-Rounder",
    og_description: "Explore the Indian iQOO Z7. Dimensity 920, compact 90Hz AMOLED, and 64MP OIS camera. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z7-5g.jpg",
    twitter_title: "iQOO Z7 Price & Specs",
    twitter_description: "Dimensity 920, 90Hz OLED, and 64MP OIS. Check out the iQOO Z7.",
    
    seo_status: "Green",
    seo_score: 90,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Z7s",
    slug: "iqoo-z7s",
    brand_name: "iQOO",
    price_usd: 220,
    price_inr: 17999,
    price_official: 220,
    is_official: true,
    release_date: "May 2023",
    release_date_parsed: new Date("2023-05-22"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Norway Blue", "Pacific Night"],
    model_number: "I2223",
    made_in: "India",
    phone_variants: "6GB/128GB, 8GB/128GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z7s-5g.jpg"
    ],
    
    chipset_highlight: "Snapdragon 695",
    camera_highlight: "64MP Dual OIS",
    display_highlight: "6.38\" 90Hz AMOLED",
    battery_highlight: "4500mAh, 44W Fast",
    benchmark_highlight: "400,000+ AnTuTu",
    
    processor: "Qualcomm SM6375 Snapdragon 695 5G (6 nm)",
    weight: "172 g (6.07 oz)",
    dimensions: "158.9 x 73.5 x 7.8 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Hybrid Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "IP54, dust and splash resistant",
    
    display_type: "AMOLED, 90Hz",
    screen_size: "6.38 inches, 98.3 cm2 (~84.1% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "90Hz",
    brightness: "1300 nits (peak)",
    hdr: "Not Supported",
    protection: "Schott Xensation glass",
    pixel_density: "~413 ppi density",
    
    cpu: "Octa-core (2x2.2 GHz Kryo 660 Gold & 6x1.7 GHz Kryo 660 Silver)",
    gpu: "Adreno 619",
    fabrication: "6 nm",
    ram_variants: "6GB, 8GB",
    storage_variants: "128GB",
    storage_type: "UFS 2.2",
    geekbench_score: "2000 (v5)",
    cooling_system: "Graphite Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "64 MP, f/1.8, (wide), PDAF, OIS",
    cam_ultrawide: "Not Supported",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (depth)",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "1080p@30fps",
    
    cam_front_resolution: "16 MP, f/2.0, (wide)",
    cam_front_hdr: "Not Supported",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "4500 mAh, non-removable",
    charging_wired: "44W wired (1-50% in 24 min)",
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
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 13",
    ui_version: "Funtouch 13",
    update_policy: "2 Years OS Updates",
    ai_features: [],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The iQOO Z7s is an incredibly minor revision of the standard iQOO Z7 (India variant), released just a few months later. Externally, the two devices are absolutely identical, sharing the same compact 6.38-inch 90Hz AMOLED display, the same 172g lightweight chassis, and the exact same 64MP OIS camera. \n\nThe only significant difference lies in the processor. Due to supply chain issues with the Dimensity 920, iQOO swapped the chipset in the Z7s to the ubiquitous Qualcomm Snapdragon 695 5G. This results in a slight downgrade in raw CPU and GPU performance compared to the original Z7, and notably removes the ability to record 4K video (capped at 1080p). Otherwise, it remains a solid compact phone with an excellent screen and a 3.5mm headphone jack.",
    key_highlights: [
      "Compact 6.38-inch 90Hz AMOLED display.",
      "Qualcomm Snapdragon 695 5G processor.",
      "64MP primary camera featuring Optical Image Stabilization.",
      "Retains the 3.5mm headphone jack and expandable storage.",
      "IP54 dust and splash resistance."
    ],
    verdict: "The iQOO Z7s is essentially the iQOO Z7 with a slightly weaker processor. It is a good phone if you want a compact device with a bright AMOLED screen, but the older Z7 is technically better due to 4K video support.",
    pros: [
      "Compact, pocket-friendly design",
      "Bright AMOLED screen",
      "Good 64MP camera with OIS",
      "Has a headphone jack and microSD slot"
    ],
    cons: [
      "Snapdragon 695 is a downgrade from the Dimensity 920",
      "Cannot record 4K video",
      "Outdated waterdrop notch design",
      "Only a 90Hz refresh rate"
    ],
    
    faqs: [
      { question: "What is the difference between iQOO Z7 and iQOO Z7s?", answer: "The only difference is the processor. The Z7 uses the MediaTek Dimensity 920 and can record 4K video. The Z7s uses the Snapdragon 695 and is limited to 1080p video." },
      { question: "Is the iQOO Z7s good for gaming?", answer: "The Snapdragon 695 is adequate for casual gaming, but it will struggle with heavy games like Genshin Impact or BGMI at high frame rates." }
    ],
    
    primary_keyword: "iQOO Z7s price",
    secondary_keywords: ["iQOO Z7s specs", "iQOO Z7s review", "Snapdragon 695 phone", "iQOO Z7s vs Z7"],
    question_keywords: ["What is the difference between iQOO Z7 and Z7s?", "Does iQOO Z7s have 4K video recording?"],
    meta_title: "iQOO Z7s Price, Specs, Snapdragon 695 & Review",
    meta_description: "Discover the full specifications, Snapdragon 695 performance, camera test, and expert review of the compact iQOO Z7s.",
    meta_keywords: "iQOO Z7s, iQOO Z7s price, iQOO Z7s specs, Snapdragon 695, 90Hz AMOLED, compact phone",
    seo_slug: "iqoo-z7s",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-z7s",
    og_title: "iQOO Z7s: The Compact Snapdragon Alternative",
    og_description: "Explore the iQOO Z7s. Snapdragon 695, compact 90Hz AMOLED, and 64MP OIS camera. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z7s-5g.jpg",
    twitter_title: "iQOO Z7s Price & Specs",
    twitter_description: "Snapdragon 695, 90Hz OLED, and 64MP OIS. Check out the iQOO Z7s.",
    
    seo_status: "Green",
    seo_score: 90,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Z6 Pro",
    slug: "iqoo-z6-pro",
    brand_name: "iQOO",
    price_usd: 280,
    price_inr: 23999,
    price_official: 280,
    is_official: true,
    release_date: "April 2022",
    release_date_parsed: new Date("2022-04-27"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Phantom Dusk", "Legion Sky"],
    model_number: "I2127",
    made_in: "India",
    phone_variants: "6GB/128GB, 8GB/128GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z6-pro.jpg"
    ],
    
    chipset_highlight: "Snapdragon 778G",
    camera_highlight: "64MP Triple",
    display_highlight: "6.44\" 90Hz AMOLED",
    battery_highlight: "4700mAh, 66W Fast",
    benchmark_highlight: "550,000+ AnTuTu",
    
    processor: "Qualcomm SM7325 Snapdragon 778G 5G (6 nm)",
    weight: "180 g (6.35 oz)",
    dimensions: "159.7 x 73.6 x 8.5 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "AMOLED, 90Hz",
    screen_size: "6.44 inches, 100.0 cm2 (~85.1% screen-to-body ratio)",
    resolution: "1080 x 2404 pixels",
    refresh_rate: "90Hz",
    brightness: "1300 nits (peak)",
    hdr: "HDR10+",
    protection: "Schott Xensation glass",
    pixel_density: "~409 ppi density",
    
    cpu: "Octa-core (1x2.4 GHz Cortex-A78 & 3x2.2 GHz Cortex-A78 & 4x1.9 GHz Cortex-A55)",
    gpu: "Adreno 642L",
    fabrication: "6 nm",
    ram_variants: "6GB, 8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 2.2",
    geekbench_score: "2800 (v5)",
    cooling_system: "VC Liquid Cooling System",
    
    cam_count: "Triple",
    cam_main_sensor: "64 MP, f/1.8, 26mm (wide), PDAF",
    cam_ultrawide: "8 MP, f/2.2, 117˚ (ultrawide)",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (macro)",
    cam_ois: "Not Supported",
    cam_flash: "Dual-LED dual-tone flash",
    cam_video: "4K@30fps, 1080p@30/60fps, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.0, (wide)",
    cam_front_hdr: "Not Supported",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "4700 mAh, non-removable",
    charging_wired: "66W wired (50% in 18 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.2, A2DP, LE",
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
    ai_features: [],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "Released in 2022, the iQOO Z6 Pro was a highly capable premium mid-ranger built around the beloved Snapdragon 778G processor. This chip was famous for delivering excellent, stable performance without overheating, making the Z6 Pro a fantastic choice for gamers who couldn't afford a flagship. It features a bright 6.44-inch AMOLED display, though the refresh rate is capped at 90Hz instead of the smoother 120Hz found on some competitors.\n\nThe camera system is versatile, featuring a 64MP primary sensor alongside a dedicated 8MP ultrawide lens—a feature missing on many subsequent Z-series models. While it lacks OIS and a 3.5mm headphone jack, its 4700mAh battery combined with 66W fast charging made it an incredibly dependable daily driver.",
    key_highlights: [
      "Snapdragon 778G processor offers famously stable performance and thermal efficiency.",
      "Bright 6.44-inch AMOLED display.",
      "Versatile camera setup including an 8MP ultrawide lens.",
      "4700mAh battery with 66W fast charging.",
      "Large vapor chamber cooling system."
    ],
    verdict: "The iQOO Z6 Pro remains a solid, dependable smartphone thanks to the legendary Snapdragon 778G. However, its 90Hz display and lack of OIS on the camera show its age compared to newer models.",
    pros: [
      "Snapdragon 778G offers excellent sustained performance",
      "Bright AMOLED screen",
      "Fast 66W charging",
      "Includes an ultrawide camera"
    ],
    cons: [
      "Display is only 90Hz",
      "No Optical Image Stabilization (OIS)",
      "No 3.5mm headphone jack or expandable storage"
    ],
    
    faqs: [
      { question: "Is the iQOO Z6 Pro good for gaming?", answer: "Yes, the Snapdragon 778G is a highly optimized chip that handles games like BGMI at 60fps smoothly without severe overheating." },
      { question: "Does the iQOO Z6 Pro have an ultrawide camera?", answer: "Yes, unlike the newer Z7 models, the Z6 Pro includes an 8MP ultrawide camera." }
    ],
    
    primary_keyword: "iQOO Z6 Pro price",
    secondary_keywords: ["iQOO Z6 Pro specs", "iQOO Z6 Pro review", "Snapdragon 778G phone", "iQOO Z6 Pro camera"],
    question_keywords: ["Is iQOO Z6 Pro good for gaming?", "Does iQOO Z6 Pro have an ultrawide camera?"],
    meta_title: "iQOO Z6 Pro Price, Specs, Snapdragon 778G & Review",
    meta_description: "Discover the full specifications, Snapdragon 778G gaming performance, 66W charging test, and expert review of the iQOO Z6 Pro.",
    meta_keywords: "iQOO Z6 Pro, iQOO Z6 Pro price, iQOO Z6 Pro specs, Snapdragon 778G, 90Hz AMOLED, gaming phone",
    seo_slug: "iqoo-z6-pro",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-z6-pro",
    og_title: "iQOO Z6 Pro: The Snapdragon 778G Workhorse",
    og_description: "Explore the iQOO Z6 Pro. Snapdragon 778G, AMOLED display, and 66W fast charging. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z6-pro.jpg",
    twitter_title: "iQOO Z6 Pro Price & Specs",
    twitter_description: "Snapdragon 778G, 90Hz OLED, and 64MP Camera. Check out the iQOO Z6 Pro.",
    
    seo_status: "Green",
    seo_score: 90,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Z6 (India 5G)",
    slug: "iqoo-z6-india-5g",
    brand_name: "iQOO",
    price_usd: 200,
    price_inr: 15499,
    price_official: 200,
    is_official: true,
    release_date: "March 2022",
    release_date_parsed: new Date("2022-03-22"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Dynamo Black", "Chromatic Blue"],
    model_number: "I2127",
    made_in: "India",
    phone_variants: "4GB/128GB, 6GB/128GB, 8GB/128GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z6.jpg"
    ],
    
    chipset_highlight: "Snapdragon 695",
    camera_highlight: "50MP Triple",
    display_highlight: "6.58\" 120Hz IPS LCD",
    battery_highlight: "5000mAh, 18W",
    benchmark_highlight: "400,000+ AnTuTu",
    
    processor: "Qualcomm SM6375 Snapdragon 695 5G (6 nm)",
    weight: "186 g (6.56 oz)",
    dimensions: "164 x 75.8 x 8.3 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Hybrid Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "IPS LCD",
    screen_size: "6.58 inches, 104.3 cm2 (~83.9% screen-to-body ratio)",
    resolution: "1080 x 2408 pixels",
    refresh_rate: "120Hz",
    brightness: "460 nits (typ)",
    hdr: "Not Supported",
    protection: "Scratch-resistant glass",
    pixel_density: "~401 ppi density",
    
    cpu: "Octa-core (2x2.2 GHz Kryo 660 Gold & 6x1.7 GHz Kryo 660 Silver)",
    gpu: "Adreno 619",
    fabrication: "6 nm",
    ram_variants: "4GB, 6GB, 8GB",
    storage_variants: "128GB",
    storage_type: "UFS 2.2",
    geekbench_score: "2000 (v5)",
    cooling_system: "5-Layer Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.8, 26mm (wide), PDAF",
    cam_ultrawide: "Not Supported",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (macro)",
    cam_ois: "Not Supported",
    cam_flash: "Dual-LED dual-tone flash",
    cam_video: "1080p@30fps",
    
    cam_front_resolution: "16 MP, f/2.0, (wide)",
    cam_front_hdr: "Not Supported",
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
    
    android_version: "Android 12",
    ui_version: "Funtouch 12",
    update_policy: "2 Years OS Updates",
    ai_features: [],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The iQOO Z6 5G was launched as an entry-level performance phone for the Indian market, focusing on bringing 5G connectivity and a high refresh rate to a tight budget. It features the Snapdragon 695 5G processor, a highly capable chip that handles daily tasks smoothly and provides decent casual gaming performance, kept cool by a 5-layer liquid cooling system.\n\nTo hit its aggressive price point, it utilizes a 120Hz IPS LCD screen rather than AMOLED, and restricts charging speeds to a relatively slow 18W for its large 5000mAh battery. The camera system is basic, relying heavily on its 50MP main sensor while omitting an ultrawide lens. Despite these compromises, its combination of a 120Hz screen, 3.5mm headphone jack, and 5G support made it very popular among budget buyers in 2022.",
    key_highlights: [
      "Snapdragon 695 processor brings reliable 5G performance.",
      "Fluid 120Hz IPS LCD display.",
      "Large 5000mAh battery.",
      "Features a 5-layer liquid cooling system for gaming.",
      "Retains the 3.5mm headphone jack and expandable storage."
    ],
    verdict: "The iQOO Z6 5G is a basic, no-frills budget phone. The 120Hz screen and Snapdragon 695 are great for the price, but the incredibly slow 18W charging makes it feel dated.",
    pros: [
      "Good performance for the price from Snapdragon 695",
      "120Hz refresh rate display",
      "Great battery life",
      "Has a headphone jack and microSD slot"
    ],
    cons: [
      "Very slow 18W charging",
      "IPS LCD screen has average viewing angles",
      "No ultrawide camera",
      "Cannot record 4K video"
    ],
    
    faqs: [
      { question: "Is the iQOO Z6 good for BGMI?", answer: "The Snapdragon 695 handles BGMI adequately on medium settings, but it cannot run the game at 60fps smoothly on high graphics." },
      { question: "Does the iQOO Z6 support fast charging?", answer: "It only supports 18W charging, which takes over 2 hours to fully charge the 5000mAh battery." }
    ],
    
    primary_keyword: "iQOO Z6 5G price",
    secondary_keywords: ["iQOO Z6 5G specs", "iQOO Z6 5G review", "Snapdragon 695 phone", "iQOO Z6 charging"],
    question_keywords: ["Is iQOO Z6 5G good for gaming?", "Does iQOO Z6 have fast charging?"],
    meta_title: "iQOO Z6 5G Price, Specs, Snapdragon 695 & Review",
    meta_description: "Discover the full specifications, Snapdragon 695 performance, camera test, and expert review of the budget iQOO Z6 5G.",
    meta_keywords: "iQOO Z6 5G, iQOO Z6 5G price, iQOO Z6 5G specs, Snapdragon 695, 120Hz LCD, budget phone",
    seo_slug: "iqoo-z6-india-5g",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-z6-india-5g",
    og_title: "iQOO Z6 5G: Budget Performance",
    og_description: "Explore the iQOO Z6 5G. Snapdragon 695, 120Hz LCD, and a 5000mAh battery. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z6.jpg",
    twitter_title: "iQOO Z6 5G Price & Specs",
    twitter_description: "Snapdragon 695, 120Hz LCD, and 50MP Camera. Check out the iQOO Z6 5G.",
    
    seo_status: "Green",
    seo_score: 90,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Z5",
    slug: "iqoo-z5",
    brand_name: "iQOO",
    price_usd: 270,
    price_official: 270,
    is_official: true,
    release_date: "September 2021",
    release_date_parsed: new Date("2021-09-28"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Arctic Dawn", "Mystic Space", "Aurora"],
    model_number: "I2018",
    made_in: "China",
    phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z5.jpg"
    ],
    
    chipset_highlight: "Snapdragon 778G",
    camera_highlight: "64MP Triple",
    display_highlight: "6.67\" 120Hz IPS LCD",
    battery_highlight: "5000mAh, 44W Fast",
    benchmark_highlight: "550,000+ AnTuTu",
    
    processor: "Qualcomm SM7325 Snapdragon 778G 5G (6 nm)",
    weight: "193 g (6.81 oz)",
    dimensions: "164.7 x 76.7 x 8.5 mm",
    build_material: "Glass front (Panda Glass), plastic frame, plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "IPS LCD",
    screen_size: "6.67 inches, 107.4 cm2 (~85.0% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "120Hz",
    brightness: "650 nits (peak)",
    hdr: "HDR10",
    protection: "Panda Glass",
    pixel_density: "~395 ppi density",
    
    cpu: "Octa-core (4x2.4 GHz Kryo 670 & 4x1.8 GHz Kryo 670)",
    gpu: "Adreno 642L",
    fabrication: "6 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "2800 (v5)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "64 MP, f/1.8, 26mm (wide), 1/1.97\", 0.7µm, PDAF",
    cam_ultrawide: "8 MP, f/2.2, 120˚, 16mm (ultrawide)",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (macro)",
    cam_ois: "Not Supported",
    cam_flash: "LED flash",
    cam_video: "4K@30/60fps, 1080p@30/60fps, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5000 mAh, non-removable",
    charging_wired: "44W wired (50% in 26 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.2, A2DP, LE, aptX HD, aptX Adaptive",
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
    
    android_version: "Android 11",
    ui_version: "Funtouch 12",
    update_policy: "2 Years OS Updates",
    ai_features: [],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The iQOO Z5 was highly praised upon its release in late 2021 as a masterclass in mid-range balancing. It utilized the legendary Snapdragon 778G processor, which offered near-flagship performance without the thermal throttling issues of higher-end chips. This made the Z5 a favorite among mobile gamers looking for stable, sustained framerates over long sessions.\n\nWhile it featured an IPS LCD rather than an AMOLED screen, the display offered a fast 120Hz refresh rate and HDR10 support. It also delighted enthusiasts by including stereo speakers and maintaining the 3.5mm headphone jack. The camera system was surprisingly competent, featuring a 64MP main sensor capable of 4K video recording, alongside an 8MP ultrawide. Paired with a massive 5000mAh battery and fast UFS 3.1 storage, the iQOO Z5 delivered an incredibly complete experience for its price.",
    key_highlights: [
      "Snapdragon 778G processor delivers flawless, sustained mid-range performance.",
      "120Hz IPS LCD display with HDR10 support.",
      "Fast UFS 3.1 storage (rare for this price bracket in 2021).",
      "Stereo speakers and a 3.5mm headphone jack.",
      "Large 5000mAh battery with 44W fast charging."
    ],
    verdict: "The iQOO Z5 remains one of the best-balanced mid-range phones iQOO ever produced. The combination of the Snapdragon 778G, UFS 3.1 storage, stereo speakers, and a massive battery made it unbeatable for gamers on a budget.",
    pros: [
      "Snapdragon 778G offers excellent performance without overheating",
      "Fast UFS 3.1 storage makes loading games quick",
      "Great battery life",
      "Has stereo speakers and a headphone jack"
    ],
    cons: [
      "IPS LCD screen lacks the deep blacks of AMOLED",
      "No Optical Image Stabilization (OIS) on the camera",
      "Plastic build"
    ],
    
    faqs: [
      { question: "Does the iQOO Z5 have an AMOLED display?", answer: "No, it features a 120Hz IPS LCD display." },
      { question: "Is the iQOO Z5 good for gaming?", answer: "Yes, the Snapdragon 778G combined with UFS 3.1 storage makes it an excellent device for stable, high-FPS gaming." },
      { question: "Does the iQOO Z5 have stereo speakers?", answer: "Yes, it features a dual stereo speaker setup, which is great for media consumption." }
    ],
    
    primary_keyword: "iQOO Z5 price",
    secondary_keywords: ["iQOO Z5 specs", "iQOO Z5 review", "Snapdragon 778G phone", "iQOO Z5 camera"],
    question_keywords: ["Does iQOO Z5 have AMOLED?", "Does iQOO Z5 have stereo speakers?"],
    meta_title: "iQOO Z5 Price, Specs, Snapdragon 778G & Review",
    meta_description: "Discover the full specifications, Snapdragon 778G gaming performance, battery test, and expert review of the classic iQOO Z5 on TechTweak.",
    meta_keywords: "iQOO Z5, iQOO Z5 price, iQOO Z5 specs, Snapdragon 778G, 120Hz LCD, budget phone",
    seo_slug: "iqoo-z5",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-z5",
    og_title: "iQOO Z5: The Perfect Mid-Range Balance",
    og_description: "Explore the iQOO Z5. Snapdragon 778G, 120Hz LCD, and stereo speakers. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z5.jpg",
    twitter_title: "iQOO Z5 Price & Specs",
    twitter_description: "Snapdragon 778G, 120Hz LCD, and 5000mAh. Check out the iQOO Z5.",
    
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

    console.log("Batch 3 (Z7 & Older) seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
