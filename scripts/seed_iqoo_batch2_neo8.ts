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
    name: "iQOO Neo 8 Pro",
    slug: "iqoo-neo-8-pro",
    brand_name: "iQOO",
    price_usd: 480,
    price_official: 480,
    is_official: true,
    release_date: "May 2023",
    release_date_parsed: new Date("2023-05-23"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Red (Leather)", "Mint", "Black"],
    model_number: "V2302A",
    made_in: "China",
    phone_variants: "16GB/256GB, 16GB/512GB, 16GB/1TB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo8-pro.jpg"
    ],
    
    chipset_highlight: "Dimensity 9200+",
    camera_highlight: "50MP Dual OIS",
    display_highlight: "6.78\" 144Hz AMOLED",
    battery_highlight: "5000mAh, 120W Fast",
    benchmark_highlight: "1,350,000+ AnTuTu",
    
    processor: "Mediatek Dimensity 9200+ (4 nm)",
    weight: "192 g (6.77 oz)",
    dimensions: "164.7 x 77 x 8.5 mm",
    build_material: "Glass front, plastic frame, glass or vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~87.5% screen-to-body ratio)",
    resolution: "1260 x 2800 pixels",
    refresh_rate: "144Hz",
    brightness: "1300 nits (peak)",
    hdr: "HDR10",
    protection: "Scratch-resistant glass",
    pixel_density: "~453 ppi density",
    
    cpu: "Octa-core (1x3.35 GHz Cortex-X3 & 3x3.0 GHz Cortex-A715 & 4x2.0 GHz Cortex-A510)",
    gpu: "Immortalis-G715 MC11",
    fabrication: "4 nm",
    ram_variants: "16GB",
    storage_variants: "256GB, 512GB, 1TB",
    storage_type: "UFS 4.0",
    geekbench_score: "5400 (v6)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "50 MP, f/1.9, (wide), 1/1.49\", PDAF, OIS",
    cam_ultrawide: "8 MP, f/2.2, (ultrawide)",
    cam_telephoto: "Not Supported",
    cam_macro: "Supported via ultrawide",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "8K@30fps, 4K@30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5000 mAh, non-removable",
    charging_wired: "120W wired (50% in 9 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Reverse wired",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.3, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: true,
    gps_specs: "GPS, GALILEO, GLONASS, BDS",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 13",
    ui_version: "OriginOS 3 (China), Funtouch 13 (International)",
    update_policy: "2 Years OS Updates",
    ai_features: ["Game Frame Interpolation"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The iQOO Neo 8 Pro is a performance-focused smartphone that disrupted the premium mid-range market upon its release in mid-2023. It became one of the first devices globally to feature the flagship MediaTek Dimensity 9200+ processor. This chip, combined with an enormous 16GB of standard RAM across all variants, ensured that the Neo 8 Pro could handle intense mobile gaming, 8K video recording, and heavy multitasking without breaking a sweat.\n\nGamers will especially appreciate the 6.78-inch 144Hz AMOLED display, which offers an incredibly smooth visual experience and a high 1260p resolution for sharp graphics. Powering this setup is a reliable 5000mAh battery paired with iQOO's famous 120W fast charging technology, capable of juicing the phone from 0 to 50% in under 10 minutes. While the camera setup is somewhat basic—featuring a 50MP main sensor with OIS and an 8MP ultrawide—the phone's primary focus on raw speed makes it a top-tier choice for enthusiasts.",
    key_highlights: [
      "MediaTek Dimensity 9200+ processor for ultra-high performance.",
      "16GB RAM comes standard across all storage options.",
      "Vibrant 144Hz 6.78-inch AMOLED display.",
      "5000mAh battery with blazing fast 120W charging.",
      "Capable 50MP primary camera with Optical Image Stabilization."
    ],
    verdict: "The iQOO Neo 8 Pro is a speed demon. If your priority is gaming, multitasking, and fast charging, it is incredibly difficult to find a better phone at this price point. However, photography enthusiasts might find the 8MP ultrawide camera a bit limiting.",
    pros: [
      "Dimensity 9200+ offers top-tier flagship performance",
      "Massive 16GB RAM as standard",
      "Incredibly fluid 144Hz display",
      "Very fast 120W charging"
    ],
    cons: [
      "Plastic frame",
      "Mediocre 8MP ultrawide camera",
      "No IP rating for water resistance"
    ],
    
    faqs: [
      { question: "Is the iQOO Neo 8 Pro good for gaming?", answer: "Yes, it is phenomenal. It pairs the high-end Dimensity 9200+ processor with 16GB of RAM and a 144Hz display, making it perfect for competitive mobile gaming." },
      { question: "Does the iQOO Neo 8 Pro have wireless charging?", answer: "No, wireless charging is omitted to maintain its aggressive price, but it features incredibly fast 120W wired charging." },
      { question: "How much RAM does the iQOO Neo 8 Pro have?", answer: "Uniquely, every variant of the Neo 8 Pro comes with 16GB of LPDDR5X RAM." }
    ],
    
    primary_keyword: "iQOO Neo 8 Pro price",
    secondary_keywords: ["iQOO Neo 8 Pro specs", "iQOO Neo 8 Pro review", "iQOO Neo 8 Pro gaming", "Dimensity 9200+ phone", "iQOO Neo 8 Pro antutu"],
    question_keywords: ["Is iQOO Neo 8 Pro good for gaming?", "Does Neo 8 Pro have wireless charging?", "How fast does Neo 8 Pro charge?"],
    meta_title: "iQOO Neo 8 Pro Price, Specs, Dimensity 9200+ & Review",
    meta_description: "Check out the full specifications, Dimensity 9200+ gaming performance, 120W charging test, and expert review of the iQOO Neo 8 Pro on TechTweak.",
    meta_keywords: "iQOO Neo 8 Pro, iQOO Neo 8 Pro price, iQOO Neo 8 Pro specs, Dimensity 9200+, 120W charging, gaming phone",
    seo_slug: "iqoo-neo-8-pro",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-neo-8-pro",
    og_title: "iQOO Neo 8 Pro: Dimensity 9200+ Powered Flagship Killer",
    og_description: "Explore the iQOO Neo 8 Pro. Dimensity 9200+, 144Hz AMOLED, and 120W charging. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo8-pro.jpg",
    twitter_title: "iQOO Neo 8 Pro Price & Specs: Raw Power",
    twitter_description: "Dimensity 9200+, 144Hz OLED, and 120W charging. Check out the iQOO Neo 8 Pro.",
    
    seo_status: "Green",
    seo_score: 93,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Neo 8",
    slug: "iqoo-neo-8",
    brand_name: "iQOO",
    price_usd: 350,
    price_official: 350,
    is_official: true,
    release_date: "May 2023",
    release_date_parsed: new Date("2023-05-23"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Red (Leather)", "Mint", "Black"],
    model_number: "V2301A",
    made_in: "China",
    phone_variants: "12GB/256GB, 16GB/256GB, 12GB/512GB, 16GB/512GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo8.jpg"
    ],
    
    chipset_highlight: "Snapdragon 8+ Gen 1",
    camera_highlight: "50MP Dual OIS",
    display_highlight: "6.78\" 144Hz AMOLED",
    battery_highlight: "5000mAh, 120W Fast",
    benchmark_highlight: "1,100,000+ AnTuTu",
    
    processor: "Qualcomm SM8475 Snapdragon 8+ Gen 1 (4 nm)",
    weight: "192 g (6.77 oz)",
    dimensions: "164.7 x 77 x 8.5 mm",
    build_material: "Glass front, plastic frame, glass or vegan leather back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "AMOLED, 1B colors",
    screen_size: "6.78 inches, 111.0 cm2 (~87.5% screen-to-body ratio)",
    resolution: "1260 x 2800 pixels",
    refresh_rate: "144Hz",
    brightness: "1300 nits (peak)",
    hdr: "HDR10",
    protection: "Scratch-resistant glass",
    pixel_density: "~453 ppi density",
    
    cpu: "Octa-core (1x3.0 GHz Cortex-X2 & 3x2.5 GHz Cortex-A710 & 4x1.80 GHz Cortex-A510)",
    gpu: "Adreno 730",
    fabrication: "4 nm",
    ram_variants: "12GB, 16GB",
    storage_variants: "256GB, 512GB",
    storage_type: "UFS 3.1",
    geekbench_score: "4200 (v6)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "50 MP, f/1.9, (wide), PDAF, OIS",
    cam_ultrawide: "Not Supported",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (depth)",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "8K@30fps, 4K@30/60fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5000 mAh, non-removable",
    charging_wired: "120W wired (50% in 9 min)",
    charging_wireless: "Not Supported",
    charging_reverse: "Reverse wired",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.3, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: true,
    gps_specs: "GPS, GALILEO, GLONASS, BDS",
    has_ir_blaster: true,
    has_audio_jack: false,
    usb_version: "2.0",
    
    sensor_fingerprint: "Optical under-display",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 13",
    ui_version: "OriginOS 3 (China)",
    update_policy: "2 Years OS Updates",
    ai_features: ["Game Frame Interpolation"],
    has_circle_to_search: false,
    has_ai_editing: true,
    has_live_translation: false,
    has_ai_assistant: true,
    
    seo_overview: "The standard iQOO Neo 8 is a highly capable premium mid-ranger that delivers exceptional stability and speed by utilizing the proven Qualcomm Snapdragon 8+ Gen 1 processor. Released alongside the Dimensity-powered Pro model, the standard Neo 8 offers an alternative for users who prefer Qualcomm's architecture, which is famous for its consistent frame rates in high-end mobile games.\n\nIt shares the same stunning 6.78-inch 144Hz AMOLED display and the massive 5000mAh battery with 120W fast charging as the Pro model, ensuring that the day-to-day user experience remains largely identical. The primary compromise comes in the camera system: while it retains a solid 50MP main camera with OIS, it completely drops the ultrawide lens in favor of a 2MP depth sensor. If you don't care about ultrawide photography, the iQOO Neo 8 provides a phenomenal gaming experience at a heavily discounted price.",
    key_highlights: [
      "Snapdragon 8+ Gen 1 processor for proven stability.",
      "144Hz 6.78-inch AMOLED display.",
      "5000mAh battery with 120W fast wired charging.",
      "50MP main camera with Optical Image Stabilization.",
      "Available with an eye-catching red vegan leather back."
    ],
    verdict: "The iQOO Neo 8 is a brilliant budget gaming device. The Snapdragon 8+ Gen 1 remains an exceptionally powerful chip, and paired with a 144Hz display and 120W charging, it offers incredible value. The lack of an ultrawide camera is its only significant downside.",
    pros: [
      "Snapdragon 8+ Gen 1 offers fantastic, stable gaming performance",
      "Very bright and smooth 144Hz AMOLED display",
      "120W charging is exceptionally fast",
      "Great main camera for the price"
    ],
    cons: [
      "No ultrawide camera",
      "Plastic frame",
      "No official IP rating for water resistance"
    ],
    
    faqs: [
      { question: "What is the difference between iQOO Neo 8 and Neo 8 Pro?", answer: "The Neo 8 uses the Snapdragon 8+ Gen 1 and lacks an ultrawide camera. The Neo 8 Pro uses the faster Dimensity 9200+ processor and features an 8MP ultrawide camera." },
      { question: "Is the iQOO Neo 8 good for gaming?", answer: "Yes. The Snapdragon 8+ Gen 1 is highly optimized for gaming, and the 144Hz display makes competitive gaming incredibly smooth." },
      { question: "Does the iQOO Neo 8 have a glass back?", answer: "It depends on the color. The Red variant features a premium vegan leather back, while the Mint and Black variants use a glass back." }
    ],
    
    primary_keyword: "iQOO Neo 8 price",
    secondary_keywords: ["iQOO Neo 8 specs", "iQOO Neo 8 review", "Snapdragon 8+ Gen 1 phone", "iQOO Neo 8 camera", "iQOO Neo 8 vs Poco F5 Pro"],
    question_keywords: ["Is iQOO Neo 8 good for gaming?", "Difference between Neo 8 and Neo 8 Pro?", "Does iQOO Neo 8 overheat?"],
    meta_title: "iQOO Neo 8 Price, Specs, Gaming Test & Review | TechTweak",
    meta_description: "Discover the full specifications, gaming performance, 120W charging speed, and expert review of the iQOO Neo 8 featuring Snapdragon 8+ Gen 1 on TechTweak.",
    meta_keywords: "iQOO Neo 8, iQOO Neo 8 price, iQOO Neo 8 specs, iQOO Neo 8 review, Snapdragon 8+ Gen 1, 120W charging, gaming phone",
    seo_slug: "iqoo-neo-8",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-neo-8",
    og_title: "iQOO Neo 8: The Snapdragon 8+ Gen 1 Gaming Beast",
    og_description: "Explore the iQOO Neo 8. Snapdragon 8+ Gen 1, 144Hz AMOLED, and 120W charging. Read the full review and specs on TechTweak.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-neo8.jpg",
    twitter_title: "iQOO Neo 8 Price & Specs: Elite Gaming",
    twitter_description: "Snapdragon 8+ Gen 1, 144Hz OLED, and 120W charging. Check out the iQOO Neo 8.",
    
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

    console.log("Batch 2 (Neo 8 Series) seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
