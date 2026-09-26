import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Helper to load .env.local if present
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const k = trimmed.slice(0, idx).trim();
        let v = trimmed.slice(idx + 1).trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        process.env[k] = v;
      }
    }
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set. Please create a .env.local file with your connection string or pass MONGODB_URI in the environment.");
  process.exit(1);
}

const iphone18Models = [
  {
    name: "Apple iPhone 18 Pro Max",
    slug: "apple-iphone-18-pro-max",
    price_usd: 1199,
    price_status: "official",
    release_date: "September 2026",
    release_date_parsed: new Date("2026-09-20"),
    phone_status: "released",
    is_published: true,
    is_featured: true,
    colors: ["Burgundy", "Glacier", "Silver", "Black"],
    images: [
      "https://res.cloudinary.com/dlmudayr5/image/upload/v1726000000/iphone18promax_front.webp"
    ],
    // Highlights
    chipset_highlight: "Apple A20 Pro (2nm TSMC) with 32-Core Neural Engine",
    camera_highlight: "48MP Variable Aperture (f/1.48-f/4.0) + 48MP 5x Periscope Telephoto",
    display_highlight: "6.9\" LTPO Super Retina XDR OLED, 120Hz ProMotion, 3000 nits Peak",
    battery_highlight: "5000 mAh with 35W Wired & 25W MagSafe Fast Charging",
    benchmark_highlight: "AnTuTu: ~2,450,000 | Geekbench 6: 3950 Single / 10200 Multi",
    // Core Specs
    display: "6.9 inches Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision, 3000 nits (peak)",
    processor: "Apple A20 Pro (2nm, Hexa-core: 2x 4.93 GHz Super Cores + 4x Efficiency Cores)",
    ram: "12GB LPDDR5X (WMCM packaging)",
    storage: "256GB / 512GB / 1TB / 2TB NVMe",
    camera_main: "48 MP (f/1.48-f/4.0 variable aperture, 24mm, sensor-shift OIS) + 48 MP (periscope telephoto, 5x optical zoom) + 48 MP (ultrawide, 120˚)",
    camera_front: "12 MP (f/1.9, Autofocus, SL 3D biometric sensor)",
    battery: "5000 mAh Li-Ion (non-removable)",
    charging: "35W wired, 25W wireless (MagSafe), 15W wireless (Qi2)",
    network: "5G (Apple C2 modem / Qualcomm X80 in select regions), Wi-Fi 7, Bluetooth 5.4",
    antutu_score: 2450000,
    // Detailed sections
    display_type: "LTPO Super Retina XDR OLED",
    screen_size: "6.9 inches (~92.2% screen-to-body ratio)",
    resolution: "1320 x 2868 pixels (~460 ppi)",
    refresh_rate: "120Hz ProMotion",
    brightness: "3000 nits (outdoor peak), 1000 nits (typical)",
    protection: "Ceramic Shield 2nd Gen, Titanium Frame Grade 5",
    cpu: "Apple A20 Pro Hexa-Core (2x 4.93 GHz + 4x 2.4 GHz)",
    gpu: "Apple 7-core GPU with Hardware Ray Tracing & Neural Accelerators",
    cooling_system: "Advanced Vapor Chamber Cooling System",
    weight: "221 g",
    dimensions: "163.0 x 77.6 x 8.25 mm",
    build_material: "Corning-made glass front/back, titanium alloy frame",
    sim_type: "Nano-SIM and eSIM or Dual eSIM (US models eSIM only)",
    water_resistance: "IP68 dust/water resistant (up to 6m for 30 min)",
    seo_overview: "The Apple iPhone 18 Pro Max represents Apple's milestone transition to the 2nm Apple A20 Pro chipset, introducing revolutionary variable physical aperture camera mechanics and a larger 5000 mAh battery.",
    key_highlights: [
      "TSMC 2nm Apple A20 Pro processor with 12GB LPDDR5X unified RAM",
      "Revolutionary variable aperture main camera (f/1.48 to f/4.0)",
      "Redesigned smaller Dynamic Island for higher display real estate",
      "Next-gen vapor chamber cooling preventing thermal throttling"
    ],
    verdict: "The iPhone 18 Pro Max is Apple's most ambitious flagship to date, uniting 2nm computing power, mechanical variable aperture optics, and the best endurance seen on any iPhone.",
    pros: ["Class-leading 2nm A20 Pro chip", "Variable aperture offers true optical depth of field", "Massive battery endurance increase", "High-efficiency Apple C2 5G modem"],
    cons: ["Premium price point", "Still relatively heavy device", "Standard 18 models delayed to 2027"],
    faqs: [
      { question: "What chip powers the iPhone 18 Pro Max?", answer: "It runs on the Apple A20 Pro, Apple's first chip manufactured on TSMC's cutting-edge 2nm process node." },
      { question: "Does the iPhone 18 Pro Max have a variable aperture camera?", answer: "Yes, it features a 48MP main sensor capable of mechanically shifting between f/1.48, f/1.8, f/2.8, and f/4.0." },
      { question: "What is the price of the iPhone 18 Pro Max?", answer: "The starting price is $1,199 for the 256GB base storage configuration." }
    ],
    meta_title: "Apple iPhone 18 Pro Max Specs, Review, Price & Release Date | TechTweak",
    meta_description: "Full specifications and review for Apple iPhone 18 Pro Max. 2nm A20 Pro chip, 48MP variable aperture camera, 6.9-inch 120Hz display, and 5000mAh battery.",
    meta_keywords: "iPhone 18 Pro Max, iPhone 18 Pro Max specs, A20 Pro 2nm, Apple iPhone 18 price, variable aperture iPhone"
  },
  {
    name: "Apple iPhone 18 Pro",
    slug: "apple-iphone-18-pro",
    price_usd: 999,
    price_status: "official",
    release_date: "September 2026",
    release_date_parsed: new Date("2026-09-20"),
    phone_status: "released",
    is_published: true,
    is_featured: true,
    colors: ["Burgundy", "Glacier", "Silver", "Black"],
    images: [
      "https://res.cloudinary.com/dlmudayr5/image/upload/v1726000000/iphone18pro_front.webp"
    ],
    chipset_highlight: "Apple A20 Pro (2nm TSMC) with 32-Core Neural Engine",
    camera_highlight: "48MP Variable Aperture (f/1.48-f/4.0) + 48MP 5x Periscope Telephoto",
    display_highlight: "6.3\" LTPO Super Retina XDR OLED, 120Hz ProMotion, 3000 nits Peak",
    battery_highlight: "3650 mAh with 30W Wired & 25W MagSafe Fast Charging",
    benchmark_highlight: "AnTuTu: ~2,420,000 | Geekbench 6: 3940 Single / 10100 Multi",
    display: "6.3 inches Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision, 3000 nits (peak)",
    processor: "Apple A20 Pro (2nm, Hexa-core: 2x 4.93 GHz Super Cores + 4x Efficiency Cores)",
    ram: "12GB LPDDR5X (WMCM packaging)",
    storage: "128GB / 256GB / 512GB / 1TB NVMe",
    camera_main: "48 MP (f/1.48-f/4.0 variable aperture, 24mm, sensor-shift OIS) + 48 MP (periscope telephoto, 5x optical zoom) + 48 MP (ultrawide, 120˚)",
    camera_front: "12 MP (f/1.9, Autofocus, SL 3D biometric sensor)",
    battery: "3650 mAh Li-Ion (non-removable)",
    charging: "30W wired, 25W wireless (MagSafe), 15W wireless (Qi2)",
    network: "5G (Apple C2 modem / Qualcomm X80 in select regions), Wi-Fi 7, Bluetooth 5.4",
    antutu_score: 2420000,
    display_type: "LTPO Super Retina XDR OLED",
    screen_size: "6.3 inches (~90.5% screen-to-body ratio)",
    resolution: "1206 x 2622 pixels (~460 ppi)",
    refresh_rate: "120Hz ProMotion",
    brightness: "3000 nits (outdoor peak), 1000 nits (typical)",
    protection: "Ceramic Shield 2nd Gen, Titanium Frame Grade 5",
    cpu: "Apple A20 Pro Hexa-Core (2x 4.93 GHz + 4x 2.4 GHz)",
    gpu: "Apple 7-core GPU with Hardware Ray Tracing & Neural Accelerators",
    cooling_system: "Vapor Chamber Cooling System",
    weight: "188 g",
    dimensions: "149.6 x 71.5 x 8.25 mm",
    build_material: "Corning-made glass front/back, titanium frame",
    sim_type: "Nano-SIM and eSIM or Dual eSIM",
    water_resistance: "IP68 dust/water resistant (up to 6m for 30 min)",
    seo_overview: "The Apple iPhone 18 Pro packs the revolutionary 2nm A20 Pro processor and variable aperture optics into a compact, pocket-friendly 6.3-inch titanium enclosure.",
    key_highlights: [
      "Compact 6.3-inch form factor with full Pro features",
      "TSMC 2nm Apple A20 Pro with 12GB LPDDR5X RAM",
      "Variable aperture camera system with 5x optical zoom",
      "Smaller Dynamic Island design"
    ],
    verdict: "For creators seeking pro-tier camera controls and breakthrough 2nm processing in a pocket-sized design, the iPhone 18 Pro is the pinnacle compact flagship.",
    pros: ["Unmatched compact power", "Variable aperture on a smaller phone", "120Hz ProMotion with 3000 nits brightness", "Titanium build quality"],
    cons: ["Battery capacity smaller than Pro Max", "Charging speeds conservative compared to Android rivals"],
    faqs: [
      { question: "What is the screen size of the iPhone 18 Pro?", answer: "The iPhone 18 Pro features a 6.3-inch Super Retina XDR OLED display with 120Hz ProMotion." },
      { question: "How much RAM does the iPhone 18 Pro have?", answer: "The iPhone 18 Pro features 12GB of unified LPDDR5X RAM." }
    ],
    meta_title: "Apple iPhone 18 Pro Specs, Review, Price & Release Date | TechTweak",
    meta_description: "Full specifications and review for Apple iPhone 18 Pro. 6.3-inch 120Hz display, 2nm A20 Pro chip, 48MP variable aperture camera, and titanium frame.",
    meta_keywords: "iPhone 18 Pro, iPhone 18 Pro specs, Apple A20 Pro, iPhone 18 Pro price, compact flagship"
  }
];

async function updateIPhone18Series() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, { dbName: "techtweak" });
    console.log("✅ Connected successfully to database: techtweak");

    const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({ name: String, slug: String }));
    const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

    // Find Apple Brand
    let appleBrand = await Brand.findOne({ slug: "apple" });
    if (!appleBrand) {
      appleBrand = await Brand.findOne({ name: /apple/i });
    }

    if (!appleBrand) {
      console.log("⚠️ Apple brand not found, creating Apple brand document...");
      appleBrand = await Brand.create({
        name: "Apple",
        slug: "apple",
        logo_url: "https://res.cloudinary.com/dlmudayr5/image/upload/v1716000000/apple_logo.svg",
        description: "Apple Inc. is an American multinational technology company headquartered in Cupertino, California.",
        is_published: true,
        order: 1
      });
    }

    console.log(`Using Apple Brand ID: ${appleBrand._id} (${appleBrand.name})`);

    let updatedCount = 0;
    let insertedCount = 0;

    for (const phoneData of iphone18Models) {
      const doc = {
        ...phoneData,
        brand_id: appleBrand._id,
        updated_at: new Date()
      };

      const existing = await Phone.findOne({ slug: phoneData.slug });
      if (existing) {
        await Phone.updateOne({ _id: existing._id }, { $set: doc });
        console.log(`🔄 Updated: ${phoneData.name} (${phoneData.slug})`);
        updatedCount++;
      } else {
        await Phone.create({
          ...doc,
          created_at: new Date()
        });
        console.log(`✨ Inserted: ${phoneData.name} (${phoneData.slug})`);
        insertedCount++;
      }
    }

    console.log(`\n🎉 Completed iPhone 18 Series Update!`);
    console.log(`Total Models: ${iphone18Models.length} | Updated: ${updatedCount} | Inserted: ${insertedCount}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating iPhone 18 Series:", error);
    process.exit(1);
  }
}

updateIPhone18Series();
