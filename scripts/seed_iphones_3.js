require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });
const BrandSchema = new mongoose.Schema({}, { strict: false });

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);
  const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);

  const apple = await Brand.findOne({ name: /apple/i }).lean();
  if (!apple) { console.error("Apple brand not found"); process.exit(1); }
  const bid = apple._id;

  const phones = [
    {
      name: "iPhone SE (2nd generation)",
      slug: "iphone-se-2020",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2020-04-24",
      model_number: "A2275, A2296, A2298",
      colors: ["Black", "White", "Product Red"],
      made_in: "China / India",
      phone_variants: "64GB, 128GB, 256GB",
      price_bdt: 42000,
      price_official: 42000,
      price_unofficial: 35000,
      chipset_highlight: "Apple A13 Bionic (7nm+)",
      camera_highlight: "Single 12MP Wide with Portrait mode",
      display_highlight: "4.7\" Retina HD display",
      battery_highlight: "1,821 mAh",
      processor: "Apple A13 Bionic",
      cpu: "Apple A13 Bionic (7nm+)",
      ram_variants: "3 GB",
      storage_variants: "64 GB, 128 GB, 256 GB",
      display_type: "Retina IPS LCD",
      screen_size: "4.7 inches",
      resolution: "1334 × 750 pixels",
      cam_count: "Single",
      cam_main_sensor: "12 MP, f/1.8, OIS",
      has_5g: false,
      sensor_fingerprint: "Touch ID (Home button)",
      meta_title: "iPhone SE (2020) Specs & Price in Bangladesh | TechTweak",
      meta_description: "Full specs of iPhone SE 2nd Gen — A13 Bionic, compact 4.7\" display.",
      updated_at: new Date()
    },
    {
      name: "iPhone SE (3rd generation)",
      slug: "iphone-se-2022",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2022-03-18",
      model_number: "A2595, A2783, A2785",
      colors: ["Midnight", "Starlight", "Product Red"],
      made_in: "China / India",
      phone_variants: "64GB, 128GB, 256GB",
      price_bdt: 52000,
      price_official: 52000,
      price_unofficial: 45000,
      chipset_highlight: "Apple A15 Bionic (5nm)",
      camera_highlight: "Single 12MP with Smart HDR 4",
      display_highlight: "4.7\" Retina HD display",
      battery_highlight: "2,018 mAh",
      processor: "Apple A15 Bionic",
      cpu: "Apple A15 Bionic (5nm)",
      ram_variants: "4 GB",
      storage_variants: "64 GB, 128 GB, 256 GB",
      display_type: "Retina IPS LCD",
      screen_size: "4.7 inches",
      resolution: "1334 × 750 pixels",
      cam_count: "Single",
      cam_main_sensor: "12 MP, f/1.8, OIS",
      has_5g: true,
      sensor_fingerprint: "Touch ID (Home button)",
      meta_title: "iPhone SE (2022) Specs & Price in Bangladesh | TechTweak",
      meta_description: "Full specs of iPhone SE 3rd Gen — A15 Bionic, 5G support, compact design.",
      updated_at: new Date()
    },
    {
      name: "iPhone 12 mini",
      slug: "iphone-12-mini",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2020-11-13",
      model_number: "A2176, A2398, A2399, A2400",
      colors: ["Black", "White", "Product Red", "Green", "Blue", "Purple"],
      made_in: "China",
      phone_variants: "64GB, 128GB, 256GB",
      price_bdt: 75000,
      price_official: 75000,
      price_unofficial: 58000,
      chipset_highlight: "Apple A14 Bionic (5nm)",
      camera_highlight: "Dual 12MP (Wide + Ultra Wide)",
      display_highlight: "5.4\" Super Retina XDR OLED",
      battery_highlight: "2,227 mAh",
      processor: "Apple A14 Bionic",
      ram_variants: "4 GB",
      storage_variants: "64 GB, 128 GB, 256 GB",
      display_type: "Super Retina XDR OLED",
      screen_size: "5.4 inches",
      resolution: "2340 × 1080 pixels",
      cam_count: "Dual",
      cam_main_sensor: "12 MP, f/1.6, OIS",
      cam_ultrawide: "12 MP, f/2.4",
      has_5g: true,
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 12 mini Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 12 mini — compact flagship with 5G and A14 Bionic.",
      updated_at: new Date()
    },
    {
      name: "iPhone 12",
      slug: "iphone-12",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2020-10-23",
      model_number: "A2172, A2402, A2403, A2404",
      colors: ["Black", "White", "Product Red", "Green", "Blue", "Purple"],
      made_in: "China / India",
      phone_variants: "64GB, 128GB, 256GB",
      price_bdt: 85000,
      price_official: 85000,
      price_unofficial: 65000,
      chipset_highlight: "Apple A14 Bionic (5nm)",
      camera_highlight: "Dual 12MP (Wide + Ultra Wide)",
      display_highlight: "6.1\" Super Retina XDR OLED",
      battery_highlight: "2,815 mAh",
      processor: "Apple A14 Bionic",
      ram_variants: "4 GB",
      storage_variants: "64 GB, 128 GB, 256 GB",
      display_type: "Super Retina XDR OLED",
      screen_size: "6.1 inches",
      resolution: "2532 × 1170 pixels",
      cam_count: "Dual",
      cam_main_sensor: "12 MP, f/1.6, OIS",
      cam_ultrawide: "12 MP, f/2.4",
      has_5g: true,
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 12 Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 12 — A14 Bionic, 5G, OLED display, dual cameras.",
      updated_at: new Date()
    },
    {
      name: "iPhone 12 Pro",
      slug: "iphone-12-pro",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2020-10-23",
      model_number: "A2341, A2406, A2407, A2408",
      colors: ["Silver", "Graphite", "Gold", "Pacific Blue"],
      made_in: "China",
      phone_variants: "128GB, 256GB, 512GB",
      price_bdt: 110000,
      price_official: 110000,
      price_unofficial: 85000,
      chipset_highlight: "Apple A14 Bionic (5nm)",
      camera_highlight: "Triple 12MP + LiDAR Scanner",
      display_highlight: "6.1\" Super Retina XDR OLED",
      battery_highlight: "2,815 mAh",
      processor: "Apple A14 Bionic",
      ram_variants: "6 GB",
      storage_variants: "128 GB, 256 GB, 512 GB",
      display_type: "Super Retina XDR OLED",
      screen_size: "6.1 inches",
      resolution: "2532 × 1170 pixels",
      cam_count: "Triple",
      cam_main_sensor: "12 MP, f/1.6, OIS",
      cam_ultrawide: "12 MP, f/2.4",
      cam_telephoto: "12 MP, f/2.0, 2x optical zoom",
      has_5g: true,
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 12 Pro Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 12 Pro — Triple cameras, LiDAR, A14 Bionic, 5G.",
      updated_at: new Date()
    },
    {
      name: "iPhone 12 Pro Max",
      slug: "iphone-12-pro-max",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2020-11-13",
      model_number: "A2342, A2410, A2411, A2412",
      colors: ["Silver", "Graphite", "Gold", "Pacific Blue"],
      made_in: "China",
      phone_variants: "128GB, 256GB, 512GB",
      price_bdt: 125000,
      price_official: 125000,
      price_unofficial: 95000,
      chipset_highlight: "Apple A14 Bionic (5nm)",
      camera_highlight: "Triple 12MP (Sensor-shift OIS) + LiDAR",
      display_highlight: "6.7\" Super Retina XDR OLED",
      battery_highlight: "3,687 mAh",
      processor: "Apple A14 Bionic",
      ram_variants: "6 GB",
      storage_variants: "128 GB, 256 GB, 512 GB",
      display_type: "Super Retina XDR OLED",
      screen_size: "6.7 inches",
      resolution: "2778 × 1284 pixels",
      cam_count: "Triple",
      cam_main_sensor: "12 MP, f/1.6, Sensor-shift OIS",
      cam_ultrawide: "12 MP, f/2.4",
      cam_telephoto: "12 MP, f/2.2, 2.5x optical zoom",
      has_5g: true,
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 12 Pro Max Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 12 Pro Max — Largest screen, Sensor-shift OIS, LiDAR, 5G.",
      updated_at: new Date()
    }
  ];

  for (const p of phones) {
    const exists = await Phone.findOne({ slug: p.slug });
    if (exists) {
      await Phone.updateOne({ slug: p.slug }, { $set: p });
      console.log(`Updated: ${p.name}`);
    } else {
      await Phone.create(p);
      console.log(`Created: ${p.name}`);
    }
  }

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB. Part 3 complete.");
}

run().catch(e => { console.error(e); process.exit(1); });
