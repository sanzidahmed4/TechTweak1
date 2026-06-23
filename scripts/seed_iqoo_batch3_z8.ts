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
    name: "iQOO Z8",
    slug: "iqoo-z8",
    brand_name: "iQOO",
    price_usd: 230,
    price_official: 230,
    is_official: true,
    release_date: "September 2023",
    release_date_parsed: new Date("2023-09-07"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Black", "Blue", "Silver"],
    model_number: "V2314A",
    made_in: "China",
    phone_variants: "8GB/256GB, 12GB/256GB, 12GB/512GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z8.jpg"
    ],
    
    chipset_highlight: "Dimensity 8200",
    camera_highlight: "64MP Dual OIS",
    display_highlight: "6.64\" 120Hz IPS LCD",
    battery_highlight: "5000mAh, 120W Fast",
    benchmark_highlight: "880,000+ AnTuTu",
    
    processor: "Mediatek Dimensity 8200 (4 nm)",
    weight: "200 g (7.05 oz)",
    dimensions: "164.6 x 75.8 x 8.8 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "IPS LCD",
    screen_size: "6.64 inches, 106.8 cm2 (~85.6% screen-to-body ratio)",
    resolution: "1080 x 2388 pixels",
    refresh_rate: "120Hz",
    brightness: "650 nits (typ)",
    hdr: "HDR10",
    protection: "Scratch-resistant glass",
    pixel_density: "~395 ppi density",
    
    cpu: "Octa-core (1x3.1 GHz Cortex-A78 & 3x3.0 GHz Cortex-A78 & 4x2.0 GHz Cortex-A55)",
    gpu: "Mali-G610 MC6",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB",
    storage_variants: "256GB, 512GB",
    storage_type: "UFS 3.1",
    geekbench_score: "3800 (v6)",
    cooling_system: "VC Liquid Cooling",
    
    cam_count: "Dual",
    cam_main_sensor: "64 MP, f/1.8, (wide), 1/2.0\", 0.7µm, PDAF, OIS",
    cam_ultrawide: "Not Supported",
    cam_telephoto: "Not Supported",
    cam_macro: "2 MP, f/2.4, (depth)",
    cam_ois: "OIS on Main Camera",
    cam_flash: "LED flash",
    cam_video: "4K@30fps, 1080p, gyro-EIS",
    
    cam_front_resolution: "16 MP, f/2.5, (wide)",
    cam_front_hdr: "HDR",
    cam_front_portrait: "Supported",
    cam_front_video: "1080p@30fps",
    
    battery_capacity: "5000 mAh, non-removable",
    charging_wired: "120W wired",
    charging_wireless: "Not Supported",
    charging_reverse: "Not Supported",
    charger_included: true,
    usb_type: "USB Type-C 2.0, OTG",
    
    has_5g: true,
    wifi_version: "Wi-Fi 802.11 a/b/g/n/ac/6, dual-band",
    bluetooth_version: "5.3, A2DP, LE, aptX HD, aptX Adaptive",
    has_nfc: true,
    gps_specs: "GPS, GALILEO, GLONASS, BDS, QZSS",
    has_ir_blaster: true,
    has_audio_jack: true,
    usb_version: "2.0",
    
    sensor_fingerprint: "Side-mounted",
    has_gyroscope: true,
    has_compass: true,
    has_accelerometer: true,
    has_face_unlock: true,
    
    android_version: "Android 13",
    ui_version: "OriginOS 3 (China)",
    update_policy: "2 Years OS Updates",
    ai_features: [],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The iQOO Z8 is a powerhouse in the budget segment, primarily because it brings the exceptionally capable MediaTek Dimensity 8200 processor to a very low price point. This 4nm chip is usually found in much more expensive premium mid-range devices, allowing the Z8 to handle intense games like Genshin Impact and BGMI with remarkable ease and stability.\n\nTo achieve this level of performance on a budget, iQOO made some strategic compromises. Instead of an AMOLED panel, it features a 120Hz IPS LCD screen. While the display isn't as vibrant as OLED competitors, the inclusion of a 3.5mm headphone jack, a massive 5000mAh battery, and blazingly fast 120W charging makes it an absolute dream for hardcore mobile gamers who prioritize speed and practicality over display contrast.",
    key_highlights: [
      "MediaTek Dimensity 8200 offers flagship-tier gaming performance on a budget.",
      "Extremely fast 120W wired charging.",
      "Maintains the 3.5mm headphone jack for zero-latency audio.",
      "64MP main camera with Optical Image Stabilization (OIS).",
      "120Hz IPS LCD display."
    ],
    verdict: "If you want raw processing power, rapid 120W charging, and don't mind an LCD screen, the iQOO Z8 is arguably the best budget gaming phone on the market. It punches far above its weight class.",
    pros: [
      "Incredible performance for the price (Dimensity 8200)",
      "Ultra-fast 120W charging",
      "Has a 3.5mm headphone jack",
      "Good 64MP OIS camera"
    ],
    cons: [
      "IPS LCD instead of AMOLED",
      "No ultrawide camera",
      "No official water resistance"
    ],
    
    faqs: [
      { question: "Is the iQOO Z8 good for gaming?", answer: "Yes, it is phenomenal. The Dimensity 8200 processor provides incredibly stable high-FPS gaming performance, outclassing almost everything else in its price range." },
      { question: "Does the iQOO Z8 have an AMOLED screen?", answer: "No, to keep the price aggressive while including a high-end processor and 120W charging, iQOO opted for an IPS LCD display." },
      { question: "Does the iQOO Z8 have a headphone jack?", answer: "Yes, it retains the 3.5mm headphone jack, which is excellent for gamers." }
    ],
    
    primary_keyword: "iQOO Z8 price",
    secondary_keywords: ["iQOO Z8 specs", "iQOO Z8 review", "Dimensity 8200 phone", "120W charging phone budget"],
    question_keywords: ["Is iQOO Z8 good for gaming?", "Does iQOO Z8 have AMOLED?"],
    meta_title: "iQOO Z8 Price, Specs, Dimensity 8200 Gaming & Review",
    meta_description: "Discover the full specifications, Dimensity 8200 gaming performance, 120W charging test, and expert review of the budget powerhouse iQOO Z8.",
    meta_keywords: "iQOO Z8, iQOO Z8 price, iQOO Z8 specs, Dimensity 8200, 120W charging, budget gaming phone",
    seo_slug: "iqoo-z8",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-z8",
    og_title: "iQOO Z8: The Budget Gaming King",
    og_description: "Explore the iQOO Z8. Dimensity 8200, 120W charging, and 120Hz LCD. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z8.jpg",
    twitter_title: "iQOO Z8 Price & Specs",
    twitter_description: "Dimensity 8200, 120Hz LCD, and 120W charging. Check out the iQOO Z8.",
    
    seo_status: "Green",
    seo_score: 92,
    schema_status: true,
    index_status: "index",
    content_status: "Published"
  },
  {
    name: "iQOO Z8x",
    slug: "iqoo-z8x",
    brand_name: "iQOO",
    price_usd: 180,
    price_official: 180,
    is_official: true,
    release_date: "September 2023",
    release_date_parsed: new Date("2023-09-07"),
    is_published: true,
    is_featured: false,
    upcoming: false,
    colors: ["Black", "Blue", "Silver"],
    model_number: "V2312A",
    made_in: "China",
    phone_variants: "8GB/128GB, 8GB/256GB, 12GB/256GB",
    
    images: [
      "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z8x.jpg"
    ],
    
    chipset_highlight: "Snapdragon 6 Gen 1",
    camera_highlight: "50MP Dual",
    display_highlight: "6.64\" 120Hz IPS LCD",
    battery_highlight: "6000mAh, 44W Fast",
    benchmark_highlight: "500,000+ AnTuTu",
    
    processor: "Qualcomm SM6450 Snapdragon 6 Gen 1 (4 nm)",
    weight: "199.6 g (7.05 oz)",
    dimensions: "164.6 x 75.8 x 9.1 mm",
    build_material: "Glass front, plastic frame, plastic back",
    sim_type: "Dual SIM (Nano-SIM, dual stand-by)",
    water_resistance: "Not IP-certified",
    
    display_type: "IPS LCD",
    screen_size: "6.64 inches, 106.8 cm2 (~85.6% screen-to-body ratio)",
    resolution: "1080 x 2388 pixels",
    refresh_rate: "120Hz",
    brightness: "600 nits (typ)",
    hdr: "Not Supported",
    protection: "Scratch-resistant glass",
    pixel_density: "~395 ppi density",
    
    cpu: "Octa-core (4x2.2 GHz Cortex-A78 & 4x1.8 GHz Cortex-A55)",
    gpu: "Adreno 710",
    fabrication: "4 nm",
    ram_variants: "8GB, 12GB",
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
    cam_video: "4K@30fps, 1080p",
    
    cam_front_resolution: "8 MP, f/2.0, (wide)",
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
    bluetooth_version: "5.1, A2DP, LE, aptX HD",
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
    
    android_version: "Android 13",
    ui_version: "OriginOS 3 (China)",
    update_policy: "2 Years OS Updates",
    ai_features: [],
    has_circle_to_search: false,
    has_ai_editing: false,
    has_live_translation: false,
    has_ai_assistant: false,
    
    seo_overview: "The iQOO Z8x is a battery champion designed for heavy media consumers and budget-conscious users. Its most defining feature is the massive 6000mAh battery. When paired with the highly power-efficient 4nm Snapdragon 6 Gen 1 processor, the Z8x delivers outstanding battery life that can easily stretch into a second day of heavy usage without breaking a sweat.\n\nTo hit its low price point, iQOO made several compromises compared to the standard Z8. It uses a slower 44W charging system, drops OIS from the 50MP main camera, and swaps the chipset for a more basic Snapdragon model. However, it still retains the 120Hz IPS LCD display and the 3.5mm headphone jack, making it an excellent utilitarian device for users who prioritize longevity over cutting-edge features.",
    key_highlights: [
      "Massive 6000mAh battery provides phenomenal endurance.",
      "Snapdragon 6 Gen 1 processor is extremely power-efficient.",
      "Smooth 120Hz IPS LCD display.",
      "Retains the 3.5mm headphone jack.",
      "Aggressively priced for the budget segment."
    ],
    verdict: "The iQOO Z8x is the perfect phone for delivery drivers, students, and anyone who despises charging their phone in the middle of the day. The 6000mAh battery and efficient 4nm chip make it an endurance king.",
    pros: [
      "Outstanding 6000mAh battery life",
      "Efficient Snapdragon 6 Gen 1 chip",
      "Has a 3.5mm headphone jack",
      "Very affordable"
    ],
    cons: [
      "IPS LCD screen instead of AMOLED",
      "Basic cameras with no OIS",
      "Charging speed (44W) is slow for a 6000mAh battery"
    ],
    
    faqs: [
      { question: "What is the difference between iQOO Z8 and Z8x?", answer: "The Z8 focuses on performance with the Dimensity 8200 and 120W charging. The Z8x focuses on battery life with a larger 6000mAh battery, but has a weaker Snapdragon 6 Gen 1 processor and slower 44W charging." },
      { question: "Does the iQOO Z8x have good battery life?", answer: "Yes, it has exceptional battery life thanks to the massive 6000mAh capacity and the very power-efficient 4nm processor." }
    ],
    
    primary_keyword: "iQOO Z8x price",
    secondary_keywords: ["iQOO Z8x specs", "iQOO Z8x review", "6000mAh battery phone", "Snapdragon 6 Gen 1 phone"],
    question_keywords: ["Difference between iQOO Z8 and Z8x?", "Is iQOO Z8x good for gaming?"],
    meta_title: "iQOO Z8x Price, Specs, 6000mAh Battery Test & Review",
    meta_description: "Discover the full specifications, massive 6000mAh battery life test, and expert review of the budget-friendly iQOO Z8x on TechTweak.",
    meta_keywords: "iQOO Z8x, iQOO Z8x price, iQOO Z8x specs, 6000mAh battery, Snapdragon 6 Gen 1, budget phone",
    seo_slug: "iqoo-z8x",
    canonical_url: "https://www.techtweak.tech/phones/iqoo/iqoo-z8x",
    og_title: "iQOO Z8x: The 6000mAh Battery King",
    og_description: "Explore the iQOO Z8x. Snapdragon 6 Gen 1, 120Hz LCD, and an enormous 6000mAh battery. Read the full review.",
    og_image: "https://fdn2.gsmarena.com/vv/bigpic/vivo-iqoo-z8x.jpg",
    twitter_title: "iQOO Z8x Price & Specs",
    twitter_description: "Snapdragon 6 Gen 1, 120Hz LCD, and 6000mAh. Check out the iQOO Z8x.",
    
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

    console.log("Batch 3 (Z8 Series) seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
