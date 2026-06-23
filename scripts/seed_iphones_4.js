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
      name: "iPhone 13 mini",
      slug: "iphone-13-mini",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2021-09-24",
      model_number: "A2481, A2626, A2628, A2629, A2630",
      colors: ["Starlight", "Midnight", "Blue", "Pink", "Product Red", "Green"],
      made_in: "China",
      phone_variants: "128GB, 256GB, 512GB",
      price_bdt: 85000,
      price_official: 85000,
      price_unofficial: 68000,
      chipset_highlight: "Apple A15 Bionic (5nm)",
      camera_highlight: "Dual 12MP with Sensor-shift OIS",
      display_highlight: "5.4\" Super Retina XDR OLED",
      battery_highlight: "2,438 mAh",
      processor: "Apple A15 Bionic",
      ram_variants: "4 GB",
      storage_variants: "128 GB, 256 GB, 512 GB",
      display_type: "Super Retina XDR OLED",
      screen_size: "5.4 inches",
      resolution: "2340 × 1080 pixels",
      cam_count: "Dual",
      cam_main_sensor: "12 MP, f/1.6, Sensor-shift OIS",
      cam_ultrawide: "12 MP, f/2.4",
      has_5g: true,
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 13 mini Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 13 mini — Cinematic mode, A15 Bionic, 5G, compact size.",
      updated_at: new Date()
    },
    {
      name: "iPhone 13",
      slug: "iphone-13",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2021-09-24",
      model_number: "A2482, A2631, A2633, A2634, A2635",
      colors: ["Starlight", "Midnight", "Blue", "Pink", "Product Red", "Green"],
      made_in: "China / India",
      phone_variants: "128GB, 256GB, 512GB",
      price_bdt: 95000,
      price_official: 95000,
      price_unofficial: 75000,
      chipset_highlight: "Apple A15 Bionic (5nm)",
      camera_highlight: "Dual 12MP with Sensor-shift OIS",
      display_highlight: "6.1\" Super Retina XDR OLED",
      battery_highlight: "3,227 mAh",
      processor: "Apple A15 Bionic",
      ram_variants: "4 GB",
      storage_variants: "128 GB, 256 GB, 512 GB",
      display_type: "Super Retina XDR OLED",
      screen_size: "6.1 inches",
      resolution: "2532 × 1170 pixels",
      cam_count: "Dual",
      cam_main_sensor: "12 MP, f/1.6, Sensor-shift OIS",
      cam_ultrawide: "12 MP, f/2.4",
      has_5g: true,
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 13 Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 13 — Cinematic mode, A15 Bionic, longer battery life.",
      updated_at: new Date()
    },
    {
      name: "iPhone 13 Pro",
      slug: "iphone-13-pro",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2021-09-24",
      model_number: "A2483, A2636, A2638, A2639, A2640",
      colors: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
      made_in: "China",
      phone_variants: "128GB, 256GB, 512GB, 1TB",
      price_bdt: 125000,
      price_official: 125000,
      price_unofficial: 98000,
      chipset_highlight: "Apple A15 Bionic (5-core GPU)",
      camera_highlight: "Triple 12MP + LiDAR (3x Optical Zoom)",
      display_highlight: "6.1\" ProMotion 120Hz OLED",
      battery_highlight: "3,095 mAh",
      processor: "Apple A15 Bionic",
      ram_variants: "6 GB",
      storage_variants: "128 GB, 256 GB, 512 GB, 1 TB",
      display_type: "Super Retina XDR OLED with ProMotion",
      screen_size: "6.1 inches",
      resolution: "2532 × 1170 pixels",
      refresh_rate: "120 Hz",
      cam_count: "Triple",
      cam_main_sensor: "12 MP, f/1.5, Sensor-shift OIS",
      cam_ultrawide: "12 MP, f/1.8",
      cam_telephoto: "12 MP, f/2.8, 3x optical zoom",
      has_5g: true,
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 13 Pro Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 13 Pro — 120Hz ProMotion, ProRes video, Macro mode.",
      updated_at: new Date()
    },
    {
      name: "iPhone 13 Pro Max",
      slug: "iphone-13-pro-max",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2021-09-24",
      model_number: "A2484, A2641, A2643, A2644, A2645",
      colors: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
      made_in: "China",
      phone_variants: "128GB, 256GB, 512GB, 1TB",
      price_bdt: 140000,
      price_official: 140000,
      price_unofficial: 110000,
      chipset_highlight: "Apple A15 Bionic (5-core GPU)",
      camera_highlight: "Triple 12MP + LiDAR (3x Optical Zoom)",
      display_highlight: "6.7\" ProMotion 120Hz OLED",
      battery_highlight: "4,352 mAh (Massive life)",
      processor: "Apple A15 Bionic",
      ram_variants: "6 GB",
      storage_variants: "128 GB, 256 GB, 512 GB, 1 TB",
      display_type: "Super Retina XDR OLED with ProMotion",
      screen_size: "6.7 inches",
      resolution: "2778 × 1284 pixels",
      refresh_rate: "120 Hz",
      cam_count: "Triple",
      cam_main_sensor: "12 MP, f/1.5, Sensor-shift OIS",
      cam_ultrawide: "12 MP, f/1.8",
      cam_telephoto: "12 MP, f/2.8, 3x optical zoom",
      has_5g: true,
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 13 Pro Max Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 13 Pro Max — Best battery life, 120Hz display, 3x zoom.",
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
  console.log("Disconnected from MongoDB. Part 4 complete.");
}

run().catch(e => { console.error(e); process.exit(1); });
