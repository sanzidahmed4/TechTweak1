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
    name: "iQOO 10",
    slug: "iqoo-10",
    brand_name: "iQOO",
    price_usd: 550,
    price_official: 550,
    is_official: true,
    release_date: "July 2022",
    release_date_parsed: new Date("2022-07-19"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Black", "Orange", "White (BMW M Motorsport)"],
    model_number: "V2217A",
    made_in: "China",
    phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB, 12GB/512GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-10.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8+ Gen 1",
    camera_highlight: "50MP Triple OIS",
    display_highlight: "6.78\" 120Hz AMOLED",
    battery_highlight: "4700mAh, 120W Fast",
    benchmark_highlight: "1,050,000+ AnTuTu",
    
    processor: "Qualcomm SM8475 Snapdragon 8+ Gen 1 (4 nm)",
    weight: "206 g (7.27 oz)",
    dimensions: "164.5 x 77.1 x 8.4 mm",
    build_material: "Glass front, aluminum frame, glass back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~87.7% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "120Hz",
    brightness: "1500 nits (peak)",
    hdr: "HDR",
    protection: "Scratch-resistant glass",
    pixel_density: "~388 ppi density",
    
    cpu: "Octa-core (1x3.19 GHz Cortex-X2 & 3x2.75 GHz Cortex-A710 & 4x1.80 GHz Cortex-A510)",
    gpu: "Adreno 730",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB, 512GB",
    storage_type: "UFS 3.1",
    geekbench_score: "4050 (v5)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.9, (wide), 1/1.57\", 1.0µm, PDAF, OIS",
    cam_ultrawide: "13 MP, f/2.2, 16mm, 120˚ (ultrawide), AF",
    cam_telephoto: "12 MP, f/2.0, 47mm (telephoto), PDAF, 2x optical zoom",
    cam_macro: "Supported via ultrawide",
    cam_ois: "OIS on Main Camera",
    cam_flash: "Dual-LED dual-tone flash",
    cam_video: "4K@30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps, gyro-EIS",
    
    battery_capacity: "4700 mAh, non-removable",
    charging_wired: "120W wired (50% in 7 min, 100% in 19 min)",
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
    
    android_version: "Android 12",
    ui_version: "OriginOS Ocean (China)",
    update_policy: "3 Years OS Updates",
    ai_features: ["V1+ Display Chip"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "Launched alongside its 200W sibling, the standard iQOO 10 provides almost all of the flagship goodness at a more accessible price point. Powered by the same highly efficient Snapdragon 8+ Gen 1 processor, the iQOO 10 resolves the thermal issues seen in early 2022 flagships, offering sustained gaming performance without severe throttling. It features a flat 6.78-inch AMOLED display with a 120Hz refresh rate, a form factor heavily favored by competitive mobile gamers to prevent accidental edge touches.\n\nWhile it doesn't feature the 200W charging or the gimbal stabilization of the Pro model, the iQOO 10 is no slouch. Its 120W FlashCharge system can still juice up the 4700mAh battery from 0 to 100% in under 20 minutes. The camera system is robust, featuring a 50MP main sensor with standard OIS, a 13MP ultrawide, and a highly useful 12MP 2x optical telephoto lens for portraits. It is a fantastic option for users who want ultra-premium performance without paying the top-tier 'Pro' tax.",
    key_highlights: [
      "Snapdragon 8+ Gen 1 for sustained, cool gaming performance.",
      "120W wired fast charging fills the battery in 19 minutes.",
      "Flat 6.78-inch 120Hz AMOLED display with 1500 nits peak brightness.",
      "Vivo's V1+ imaging and display chip.",
      "Versatile 50MP triple camera setup with 2x optical zoom."
    ],
    verdict: "The iQOO 10 is an exceptional 'flagship killer' that nails the fundamentals. By pairing the highly efficient Snapdragon 8+ Gen 1 with a flat display and 120W charging, it provides a superior gaming experience. It is the perfect choice for users who want Pro-level performance but don't need curved screens or 200W experimental charging.",
    pros: [
      "Excellent Snapdragon 8+ Gen 1 performance",
      "Very fast 120W wired charging",
      "Flat AMOLED screen is great for gaming",
      "Good, versatile camera system with telephoto lens"
    ],
    cons: [
      "No wireless charging",
      "Not officially water resistant (No IP rating)",
      "Mainly limited to the Chinese market",
      "No 4K video on the front camera"
    ],
    
    faqs: [
      { question: "How fast is the iQOO 10 charging?", answer: "The iQOO 10 supports 120W fast charging, which can charge the 4700mAh battery to 50% in just 7 minutes and to 100% in about 19 minutes." },
      { question: "Does the iQOO 10 have the Snapdragon 8+ Gen 1?", answer: "Yes, it is powered by the TSMC-manufactured Snapdragon 8+ Gen 1, which runs significantly cooler and more efficiently than the standard 8 Gen 1." },
      { question: "What is the difference between iQOO 10 and iQOO 10 Pro?", answer: "The Pro model features a 2K curved display (vs 1080p flat), 200W charging (vs 120W), Gimbal OIS on the main camera, and an ultrasonic fingerprint scanner." }
    ],
    
    primary_keyword: "iQOO 10 price",
    secondary_keywords: ["iQOO 10 specs", "iQOO 10 vs iQOO 10 Pro", "iQOO 10 review", "iQOO 10 antutu score", "iQOO 10 charging"],
    question_keywords: ["Is iQOO 10 good for gaming?", "Does iQOO 10 have wireless charging?", "How fast does iQOO 10 charge?"],
    meta_title: "iQOO 10 Price, Specs, Gaming & Review | TechTweak",
    meta_description: "Discover the full specifications, 120W charging test, gaming performance, camera quality and expert review of the iQOO 10 featuring Snapdragon 8+ Gen 1 on TechTweak.",
    meta_keywords: "iQOO 10, iQOO 10 price, iQOO 10 specs, iQOO 10 review, Snapdragon 8+ Gen 1, 120W charging, gaming phone",
    seo_slug: "iqoo-10",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-10",
    og_title: "iQOO 10: The Flat-Screen Gaming Flagship",
    og_description: "Explore the iQOO 10. Flat 120Hz display, 120W charging, and Snapdragon 8+ Gen 1. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-10.jpg",
    twitter_title: "iQOO 10 Price & Specs: A Gamer's Delight",
    twitter_description: "Snapdragon 8+ Gen 1, flat OLED, and 120W charging. Check out the iQOO 10.",
    
    seo_status: "Green",
    seo_score: 93,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO 9T",
    slug: "iqoo-9t",
    brand_name: "iQOO",
    price_usd: 590,
    price_inr: 49999,
    price_official: 590,
    is_official: true,
    release_date: "August 2022",
    release_date_parsed: new Date("2022-08-02"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Alpha (Black)", "Legend (White/BMW M Motorsport)"],
    model_number: "I2201",
    made_in: "India/China",
    phone_variants: "8GB/128GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-9t.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8+ Gen 1",
    camera_highlight: "50MP Triple OIS",
    display_highlight: "6.78\" 120Hz E5 AMOLED",
    battery_highlight: "4700mAh, 120W Fast",
    benchmark_highlight: "1,080,000+ AnTuTu",
    
    processor: "Qualcomm SM8475 Snapdragon 8+ Gen 1 (4 nm)",
    weight: "206 g (7.27 oz)",
    dimensions: "164.5 x 77.1 x 8.4 mm",
    build_material: "Glass front (Gorilla Glass 5), aluminum frame, glass back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "IP52 dust and dripping water resistant",
    
    display_type: "AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~87.7% screen-to-body ratio)",
    resolution: "1080 x 2400 pixels",
    refresh_rate: "120Hz",
    brightness: "1500 nits (peak)",
    hdr: "HDR10+",
    protection: "Corning Gorilla Glass 5",
    pixel_density: "~388 ppi density",
    
    cpu: "Octa-core (1x3.19 GHz Cortex-X2 & 3x2.75 GHz Cortex-A710 & 4x1.80 GHz Cortex-A510)",
    gpu: "Adreno 730",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "128GB, 256GB",
    storage_type: "UFS 3.1",
    geekbench_score: "4080 (v5)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.9, (wide), 1/1.57\", 1.0µm, PDAF, OIS",
    cam_ultrawide: "13 MP, f/2.2, 16mm, 120˚ (ultrawide), AF",
    cam_telephoto: "12 MP, f/2.0, 47mm (telephoto), PDAF, 2x optical zoom",
    cam_macro: "Supported via ultrawide",
    cam_ois: "OIS on Main Camera",
    cam_flash: "Dual-LED dual-tone flash",
    cam_video: "4K@30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps, gyro-EIS",
    
    battery_capacity: "4700 mAh, non-removable",
    charging_wired: "120W wired (50% in 8 min, 100% in 19-20 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Reverse wired",
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
    ui_version: "Funtouch OS 12 (International)",
    update_policy: "3 Years OS Updates",
    ai_features: ["V1+ Display Chip"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO 9T was released globally in mid-2022 as a T-series refresh, and it shares virtually all of its DNA with the Chinese-exclusive iQOO 10. The 9T was explicitly launched to address the thermal throttling issues of the earlier iQOO 9 series by switching to the TSMC-fabricated Snapdragon 8+ Gen 1 processor. This change resulted in dramatically improved sustained gaming performance and battery life, making it one of the most reliable performance-focused phones of its generation.\n\nIt features the same flat 6.78-inch E5 AMOLED display with a 120Hz refresh rate, paired with vivo's custom V1+ display chip to assist in frame interpolation and night-time photography. The 4700mAh battery charges to 100% in under 20 minutes utilizing 120W wired charging. With a capable 50MP main camera featuring OIS and a 12MP telephoto lens, the iQOO 9T serves as a well-rounded, aggressively priced alternative to premium flagships in markets like India.",
    key_highlights: [
      "Snapdragon 8+ Gen 1 processor for superior thermal management.",
      "120W FlashCharge technology (full charge in 20 mins).",
      "Flat 6.78-inch 120Hz E5 AMOLED display.",
      "Vivo's V1+ dedicated imaging and display chip.",
      "50MP primary camera with OIS and 12MP telephoto lens."
    ],
    verdict: "The iQOO 9T is essentially the global version of the iQOO 10, bringing the fantastic Snapdragon 8+ Gen 1 and 120W charging to international markets. It is an outstanding choice for gamers who demand sustained high frame rates without aggressive throttling, all wrapped in an attractive BMW M Motorsport-inspired design.",
    pros: [
      "Excellent sustained performance with Snapdragon 8+ Gen 1",
      "Very fast 120W charging out of the box",
      "Great camera performance, especially with the V1+ chip",
      "Flat screen design is highly preferred for gaming",
      "Solid dual stereo speakers"
    ],
    cons: [
      "Funtouch OS 12 comes with noticeable bloatware",
      "No wireless charging",
      "Only IP52 splash resistant, not fully waterproof",
      "Design is identical to previous generations"
    ],
    
    faqs: [
      { question: "What is the difference between iQOO 9 and iQOO 9T?", answer: "The iQOO 9T is a mid-cycle refresh that features the much more power-efficient Snapdragon 8+ Gen 1 processor (compared to the 888+ or 8 Gen 1 in older models) and the newer V1+ display chip." },
      { question: "Is the iQOO 9T the same as the iQOO 10?", answer: "Yes, functionally and hardware-wise, the iQOO 9T (released in India/Global) is almost a 1:1 rebrand of the iQOO 10 (released in China), sharing the same processor, battery, charging, and display." },
      { question: "Does the iQOO 9T overheat?", answer: "No, thanks to the TSMC-fabricated Snapdragon 8+ Gen 1 and a large vapor chamber cooling system, the 9T runs significantly cooler than phones using the older Snapdragon 8 Gen 1." }
    ],
    
    primary_keyword: "iQOO 9T price",
    secondary_keywords: ["iQOO 9T specs", "iQOO 9T vs iQOO 9", "iQOO 9T review", "iQOO 9T gaming test", "iQOO 9T antutu"],
    question_keywords: ["Is iQOO 9T good for gaming?", "Does iQOO 9T overheat?", "Is iQOO 9T waterproof?"],
    meta_title: "iQOO 9T Price, Specs, Gaming & Review | TechTweak",
    meta_description: "Discover the full specifications, 120W charging test, gaming performance, camera quality and expert review of the iQOO 9T featuring Snapdragon 8+ Gen 1.",
    meta_keywords: "iQOO 9T, iQOO 9T price, iQOO 9T specs, iQOO 9T review, Snapdragon 8+ Gen 1, 120W charging, gaming phone",
    seo_slug: "iqoo-9t",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-9t",
    og_title: "iQOO 9T: Sustained Gaming Performance Mastered",
    og_description: "Explore the iQOO 9T. Flat 120Hz display, 120W charging, and Snapdragon 8+ Gen 1. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-9t.jpg",
    twitter_title: "iQOO 9T Price & Specs: A Gamer's Delight",
    twitter_description: "Snapdragon 8+ Gen 1, flat OLED, and 120W charging. Check out the iQOO 9T.",
    
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

    console.log("Batch 1 (Part 3) seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
