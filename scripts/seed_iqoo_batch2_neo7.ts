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
    name: "iQOO Neo 7 Pro",
    slug: "iqoo-neo-7-pro",
    brand_name: "iQOO",
    price_usd: 420,
    price_inr: 34999,
    price_official: 420,
    is_official: true,
    release_date: "July 2023",
    release_date_parsed: new Date("2023-07-15"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Fearless Flame (Orange Leather)", "Dark Storm (Black)"],
    model_number: "I2217",
    made_in: "India",
    phone_variants: "8GB/128GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo7-pro.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8+ Gen 1",
    camera_highlight: "50MP Triple OIS",
    display_highlight: "6.78\" 120Hz AMOLED",
    battery_highlight: "5000mAh, 120W Fast",
    benchmark_highlight: "1,100,000+ AnTuTu",
    
    processor: "Qualcomm SM8475 Snapdragon 8+ Gen 1 (4 nm)",
    weight: "197 g or 202 g (6.95 oz)",
    dimensions: "164.8 x 76.9 x 8.5 mm or 8.9 mm",
    build_material: "Glass front, plastic frame, glass or vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~87.6% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "120Hz",
    brightness: "1300 nits (peak)",
    hdr: "HDR10+",
    protection: "Scratch-resistant glass",
    pixel_density: "~388 ppi density",
    
    cpu: "Octa-core (1x3.19 GHz Cortex-X2 & 3x2.75 GHz Cortex-A710 & 4x2.0 GHz Cortex-A510)",
    gpu: "Adreno 730",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "4200 (v6)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.9, 24mm (wide), 1/1.57\", 1.0µm, PDAF, OIS",
    cam_ultrawide: "8 MP, f/2.2, 16mm (ultrawide)",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (macro)",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "4K@30fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5000 mAh, non-removable",
    charging_wired: "120W wired (50% in 8 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.3, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: false,
    gps_specs: "GPS, GLONASS, GALILEO, BDS, QZSS, NavIC",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 13",
    ui_version: "Funtouch 13",
    update_policy: "2 Years OS Updates",
    ai_features: ["Independent Gaming Chip"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO Neo 7 Pro made a massive splash in the Indian smartphone market by bringing the highly acclaimed Snapdragon 8+ Gen 1 processor to an incredibly aggressive price point. Often dubbed the ultimate 'budget flagship,' it is essentially a rebranded version of the Chinese iQOO Neo 7 Racing Edition. It features an Independent Gaming Chip (IGC) that interpolates frames, allowing games that normally run at 60fps to appear as if they are running at 90fps or 120fps, drastically reducing GPU load and saving battery.\n\nBeyond raw performance, the Neo 7 Pro boasts a large 5000mAh battery paired with 120W FlashCharge, capable of charging the phone to 50% in just 8 minutes. The camera system is surprisingly capable for a gaming phone, featuring a 50MP main sensor with OIS. Wrapped in an eye-catching 'Fearless Flame' orange vegan leather option, the Neo 7 Pro was one of the most highly recommended smartphones of 2023.",
    key_highlights: [
      "Snapdragon 8+ Gen 1 guarantees premium, stable gaming performance.",
      "Independent Gaming Chip for frame interpolation.",
      "120W fast charging (0-50% in 8 minutes).",
      "50MP primary camera with Optical Image Stabilization.",
      "Vibrant 6.78-inch 120Hz AMOLED display."
    ],
    verdict: "The iQOO Neo 7 Pro is a masterclass in offering flagship performance on a budget. By combining the Snapdragon 8+ Gen 1, an Independent Gaming Chip, and 120W charging, it provides an unbeatable experience for gamers and power users alike.",
    pros: [
      "Phenomenal gaming performance and stability",
      "Independent Gaming Chip works wonders for battery life",
      "Very fast 120W charging",
      "Great premium leather design option"
    ],
    cons: [
      "Plastic frame",
      "Lots of pre-installed bloatware (Funtouch OS)",
      "Average 8MP ultrawide camera",
      "No official water resistance rating"
    ],
    
    faqs: [
      { question: "What does the Independent Gaming Chip do?", answer: "The chip acts similarly to DLSS on a PC. It interpolates frames between the native frames rendered by the GPU, allowing a 60fps game to look like a 90fps or 120fps game without stressing the main processor." },
      { question: "Is the iQOO Neo 7 Pro good for photography?", answer: "While its primary focus is gaming, the 50MP main camera with OIS takes excellent photos. However, the 8MP ultrawide and 2MP macro cameras are quite average." },
      { question: "Does the iQOO Neo 7 Pro have an IP rating?", answer: "No, to keep costs down, iQOO did not obtain an official IP rating for water or dust resistance." }
    ],
    
    primary_keyword: "iQOO Neo 7 Pro price",
    secondary_keywords: ["iQOO Neo 7 Pro specs", "iQOO Neo 7 Pro review", "iQOO Neo 7 Pro gaming", "Snapdragon 8+ Gen 1 phone", "iQOO Neo 7 Pro vs Poco F5"],
    question_keywords: ["Is iQOO Neo 7 Pro good for gaming?", "What is Independent Gaming Chip?", "Does iQOO Neo 7 Pro have wireless charging?"],
    meta_title: "iQOO Neo 7 Pro Price, Specs, Gaming Test & Review",
    meta_description: "Discover the full specifications, gaming performance, 120W charging test, and expert review of the iQOO Neo 7 Pro featuring Snapdragon 8+ Gen 1.",
    meta_keywords: "iQOO Neo 7 Pro, iQOO Neo 7 Pro price, iQOO Neo 7 Pro specs, iQOO Neo 7 Pro review, Snapdragon 8+ Gen 1, 120W charging, gaming phone",
    seo_slug: "iqoo-neo-7-pro",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-neo-7-pro",
    og_title: "iQOO Neo 7 Pro: The Budget Gaming King",
    og_description: "Explore the iQOO Neo 7 Pro. Snapdragon 8+ Gen 1, Independent Gaming Chip, and 120W charging. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo7-pro.jpg",
    twitter_title: "iQOO Neo 7 Pro Price & Specs",
    twitter_description: "Snapdragon 8+ Gen 1, 120Hz OLED, and 120W charging. Check out the iQOO Neo 7 Pro.",
    
    seo_status: "Green",
    seo_score: 94,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Neo 7",
    slug: "iqoo-neo-7",
    brand_name: "iQOO",
    price_usd: 340,
    price_inr: 29999,
    price_official: 340,
    is_official: true,
    release_date: "February 2023",
    release_date_parsed: new Date("2023-02-16"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Interstellar Black", "Frost Blue"],
    model_number: "I2214",
    made_in: "India",
    phone_variants: "8GB/128GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo7-global.jpg"
    ],
    
    chipset_highlight: "Dimensity 8200",
    camera_highlight: "64MP Triple OIS",
    display_highlight: "6.78\" 120Hz AMOLED",
    battery_highlight: "5000mAh, 120W Fast",
    benchmark_highlight: "850,000+ AnTuTu",
    
    processor: "Mediatek Dimensity 8200 (4 nm)",
    weight: "193 g (6.81 oz)",
    dimensions: "164.8 x 76.9 x 8.6 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~87.6% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "120Hz",
    brightness: "1300 nits (peak)",
    hdr: "HDR10+",
    protection: "Scratch-resistant glass",
    pixel_density: "~388 ppi density",
    
    cpu: "Octa-core (1x3.1 GHz Cortex-A78 & 3x3.0 GHz Cortex-A78 & 4x2.0 GHz Cortex-A55)",
    gpu: "Mali-G610 MC6",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3800 (v6)",
    cooling_system: "Liquid Cooling System",
    
    cam_count: "Triple",
    cam_main_sensor: "64 MP, f/1.8, (wide), PDAF, OIS",
    cam_ultrawide: "Not Supported",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (macro)",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "4K@30fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5000 mAh, non-removable",
    charging_wired: "120W wired (50% in 10 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.3, A2DP, LE",
    has_nfc: false,
    gps_specs: "GPS, GLONASS, GALILEO, BDS, NavIC",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 13",
    ui_version: "Funtouch 13",
    update_policy: "2 Years OS Updates",
    ai_features: ["Motion Control Gaming"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO Neo 7 (Indian/Global variant) is entirely different from the Chinese model of the same name, as it is actually a rebranded iQOO Neo 7 SE. It was one of the first smartphones to utilize the MediaTek Dimensity 8200 processor, a 4nm chip that delivers exceptional premium mid-range performance. It handles 90fps gaming in titles like BGMI and PUBG Mobile with remarkable stability and minimal thermal throttling.\n\nThe phone features a massive 6.78-inch 120Hz AMOLED display, making media consumption and gaming a delight. However, to achieve its incredibly low starting price, iQOO made severe compromises in the camera department. It features a 64MP main camera with OIS, but completely lacks an ultrawide camera, offering only two somewhat useless 2MP sensors alongside it. Despite the camera limitations, its 5000mAh battery and 120W charging make it a phenomenal buy for budget gamers who do not care about photography.",
    key_highlights: [
      "MediaTek Dimensity 8200 processor provides excellent 90fps gaming.",
      "120W FlashCharge (0-50% in 10 minutes).",
      "Large 6.78-inch 120Hz AMOLED display.",
      "Motion Control feature for mapping physical tilts to on-screen actions.",
      "64MP main camera with Optical Image Stabilization."
    ],
    verdict: "If you want the absolute best gaming performance for the lowest possible price, the iQOO Neo 7 is unmatched in its segment. However, the complete lack of an ultrawide camera and the plastic build mean it is strictly a gamer's device, not an all-rounder.",
    pros: [
      "Exceptional gaming performance from the Dimensity 8200",
      "Very fast 120W charging",
      "Large and bright 120Hz AMOLED display",
      "Excellent battery life"
    ],
    cons: [
      "No ultrawide camera",
      "Plastic back and frame feel cheap",
      "Funtouch OS bloatware",
      "Average low-light camera performance"
    ],
    
    faqs: [
      { question: "Is the iQOO Neo 7 good for BGMI/PUBG?", answer: "Yes, it is excellent. The Dimensity 8200 comfortably supports 90fps gaming in BGMI/PUBG and maintains stable frame rates without severe overheating." },
      { question: "Does the iQOO Neo 7 have an ultrawide camera?", answer: "No, this is its biggest drawback. It only features a 64MP main camera and two 2MP 'filler' sensors (macro and depth)." },
      { question: "Is the iQOO Neo 7 India different from the China version?", answer: "Yes. The Chinese Neo 7 uses the much faster Dimensity 9000+ processor and has an 8MP ultrawide camera. The Indian Neo 7 uses the Dimensity 8200 and has no ultrawide lens." }
    ],
    
    primary_keyword: "iQOO Neo 7 price",
    secondary_keywords: ["iQOO Neo 7 specs", "iQOO Neo 7 review", "iQOO Neo 7 gaming", "Dimensity 8200 phone", "iQOO Neo 7 bgmi 90fps"],
    question_keywords: ["Does iQOO Neo 7 have ultrawide camera?", "Is iQOO Neo 7 good for BGMI?", "How fast is iQOO Neo 7 charging?"],
    meta_title: "iQOO Neo 7 Price, Specs, BGMI 90fps Test & Review",
    meta_description: "Discover the full specifications, BGMI 90fps gaming performance, 120W charging test, and expert review of the iQOO Neo 7 featuring Dimensity 8200.",
    meta_keywords: "iQOO Neo 7, iQOO Neo 7 price, iQOO Neo 7 specs, iQOO Neo 7 review, Dimensity 8200, 120W charging, gaming phone, BGMI 90fps",
    seo_slug: "iqoo-neo-7",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-neo-7",
    og_title: "iQOO Neo 7: The Budget 90fps Gaming Beast",
    og_description: "Explore the iQOO Neo 7. Dimensity 8200, 120Hz AMOLED, and 120W charging. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo7-global.jpg",
    twitter_title: "iQOO Neo 7 Price & Specs: Raw Value",
    twitter_description: "Dimensity 8200, 120Hz OLED, and 120W charging. Check out the iQOO Neo 7.",
    
    seo_status: "Green",
    seo_score: 93,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Neo 7 (China)",
    slug: "iqoo-neo-7-china",
    brand_name: "iQOO",
    price_usd: 390,
    price_official: 390,
    is_official: true,
    release_date: "October 2022",
    release_date_parsed: new Date("2022-10-31"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Pop Orange", "Impression Blue", "Geometric Black"],
    model_number: "V2231A",
    made_in: "China",
    phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB, 12GB/512GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo7.jpg"
    ],
    
    chipset_highlight: "Dimensity 9000+",
    camera_highlight: "50MP Triple OIS",
    display_highlight: "6.78\" 120Hz AMOLED",
    battery_highlight: "5000mAh, 120W Fast",
    benchmark_highlight: "1,150,000+ AnTuTu",
    
    processor: "Mediatek Dimensity 9000+ (4 nm)",
    weight: "197 g or 202 g (6.95 oz)",
    dimensions: "164.8 x 76.9 x 8.5 mm or 8.9 mm",
    build_material: "Glass front, plastic frame, glass or vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~87.6% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "120Hz",
    brightness: "1500 nits (peak)",
    hdr: "HDR10+",
    protection: "Scratch-resistant glass",
    pixel_density: "~388 ppi density",
    
    cpu: "Octa-core (1x3.20 GHz Cortex-X2 & 3x2.85 GHz Cortex-A710 & 4x1.80 GHz Cortex-A510)",
    gpu: "Mali-G710 MC10",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB, 512GB",
    storage_type: "UFS 3.1",
    geekbench_score: "4400 (v6)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.9, 24mm (wide), 1/1.56\", 1.0µm, PDAF, OIS",
    cam_ultrawide: "8 MP, f/2.2, 16mm (ultrawide)",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (macro)",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "4K@30fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5000 mAh, non-removable",
    charging_wired: "120W wired (50% in 9 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.3, A2DP, LE, aptX HD",
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
    ui_version: "OriginOS Ocean (China)",
    update_policy: "2 Years OS Updates",
    ai_features: ["Game Frame Interpolation"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The original iQOO Neo 7 launched exclusively in China is a vastly superior device to the global model that shares its name. The Chinese Neo 7 is powered by the flagship-grade MediaTek Dimensity 9000+ processor, a massive step up from the Dimensity 8200 found in the global variant, putting it on par with the Snapdragon 8+ Gen 1 in terms of raw computational power. It handles the most demanding tasks and high-frame-rate games effortlessly.\n\nFurthermore, it does not compromise as heavily on the camera system. While it shares the same 50MP primary sensor with OIS as many of its siblings, it actually includes an 8MP ultrawide camera, making it much more versatile for photography than the global Neo 7. Wrapped in attractive vegan leather back panel options and featuring the same staple 5000mAh battery with 120W fast charging, the Chinese iQOO Neo 7 is a brilliant all-round flagship killer.",
    key_highlights: [
      "MediaTek Dimensity 9000+ processor delivers ultra-premium performance.",
      "50MP main camera and an 8MP ultrawide camera.",
      "Bright 1500-nit 6.78-inch 120Hz AMOLED display.",
      "5000mAh battery with 120W wired fast charging.",
      "Premium vegan leather design options."
    ],
    verdict: "The Chinese iQOO Neo 7 is a far more complete smartphone than its global namesake. By including the incredibly powerful Dimensity 9000+ and an actual ultrawide camera, it stands as a true flagship killer rather than just a budget gaming phone.",
    pros: [
      "Flagship-tier CPU performance from Dimensity 9000+",
      "Includes an 8MP ultrawide camera",
      "Very fast 120W charging",
      "Beautiful AMOLED screen"
    ],
    cons: [
      "Exclusive to the Chinese market (no global ROM)",
      "Plastic frame",
      "No official water resistance rating"
    ],
    
    faqs: [
      { question: "Is the Chinese iQOO Neo 7 better than the Indian version?", answer: "Yes. The Chinese version uses the much faster Dimensity 9000+ processor and includes an 8MP ultrawide camera, whereas the Indian version uses the Dimensity 8200 and lacks an ultrawide camera entirely." },
      { question: "Can I use the Chinese iQOO Neo 7 globally?", answer: "While the hardware works, the phone comes with OriginOS which lacks Google Play Services out of the box and has many Chinese apps pre-installed. It requires technical know-how to set up for global use." },
      { question: "Does the iQOO Neo 7 China overheat?", answer: "The Dimensity 9000+ runs slightly warmer than Qualcomm chips, but the massive VC liquid cooling chamber effectively manages thermals during gaming." }
    ],
    
    primary_keyword: "iQOO Neo 7 China price",
    secondary_keywords: ["iQOO Neo 7 China specs", "iQOO Neo 7 Dimensity 9000+", "iQOO Neo 7 China review", "iQOO Neo 7 China vs India", "iQOO Neo 7 antutu"],
    question_keywords: ["Difference between iQOO Neo 7 China and India?", "Is iQOO Neo 7 China good for gaming?"],
    meta_title: "iQOO Neo 7 (China) Price, Specs & Dimensity 9000+ Review",
    meta_description: "Check out the full specifications, Dimensity 9000+ performance, camera test, and expert review of the Chinese iQOO Neo 7 on TechTweak.",
    meta_keywords: "iQOO Neo 7, iQOO Neo 7 China, iQOO Neo 7 price, iQOO Neo 7 specs, Dimensity 9000+, 120W charging, gaming phone",
    seo_slug: "iqoo-neo-7-china",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-neo-7-china",
    og_title: "iQOO Neo 7 (China): The True Flagship Killer",
    og_description: "Explore the Chinese iQOO Neo 7. Dimensity 9000+, 120Hz AMOLED, and 120W charging. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo7.jpg",
    twitter_title: "iQOO Neo 7 (China) Price & Specs",
    twitter_description: "Dimensity 9000+, 120Hz OLED, and 120W charging. Check out the iQOO Neo 7.",
    
    seo_status: "Green",
    seo_score: 93,
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

    console.log("Batch 2 (Neo 7 Series) seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
