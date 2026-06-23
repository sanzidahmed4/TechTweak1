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
      name: "iPhone 14",
      slug: "iphone-14",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2022-09-16",
      model_number: "A2649, A2881, A2882, A2883, A2884",
      colors: ["Midnight", "Starlight", "Product Red", "Blue", "Purple", "Yellow"],
      made_in: "China / India",
      phone_variants: "128GB, 256GB, 512GB",
      price_bdt: 95000,
      price_official: 95000,
      price_unofficial: 72000,
      chipset_highlight: "Apple A15 Bionic (5-core GPU)",
      camera_highlight: "Dual 12MP (Improved low light)",
      display_highlight: "6.1\" Super Retina XDR OLED",
      battery_highlight: "3,279 mAh",
      processor: "Apple A15 Bionic",
      ram_variants: "6 GB",
      storage_variants: "128 GB, 256 GB, 512 GB",
      display_type: "Super Retina XDR OLED",
      screen_size: "6.1 inches",
      resolution: "2532 × 1170 pixels",
      cam_count: "Dual",
      cam_main_sensor: "12 MP, f/1.5, Sensor-shift OIS",
      cam_ultrawide: "12 MP, f/2.4",
      has_5g: true,
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 14 Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 14 — Crash Detection, Emergency SOS via satellite.",
      updated_at: new Date()
    },
    {
      name: "iPhone 14 Plus",
      slug: "iphone-14-plus",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2022-10-07",
      model_number: "A2632, A2885, A2886, A2887, A2888",
      colors: ["Midnight", "Starlight", "Product Red", "Blue", "Purple", "Yellow"],
      made_in: "China",
      phone_variants: "128GB, 256GB, 512GB",
      price_bdt: 105000,
      price_official: 105000,
      price_unofficial: 82000,
      chipset_highlight: "Apple A15 Bionic (5-core GPU)",
      camera_highlight: "Dual 12MP (Improved low light)",
      display_highlight: "6.7\" Super Retina XDR OLED",
      battery_highlight: "4,325 mAh",
      processor: "Apple A15 Bionic",
      ram_variants: "6 GB",
      storage_variants: "128 GB, 256 GB, 512 GB",
      display_type: "Super Retina XDR OLED",
      screen_size: "6.7 inches",
      resolution: "2778 × 1284 pixels",
      cam_count: "Dual",
      cam_main_sensor: "12 MP, f/1.5, Sensor-shift OIS",
      cam_ultrawide: "12 MP, f/2.4",
      has_5g: true,
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 14 Plus Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 14 Plus — Big screen, big battery, Crash Detection.",
      updated_at: new Date()
    },
    {
      name: "iPhone 14 Pro",
      slug: "iphone-14-pro",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2022-09-16",
      model_number: "A2650, A2889, A2890, A2891, A2892",
      colors: ["Space Black", "Silver", "Gold", "Deep Purple"],
      made_in: "China",
      phone_variants: "128GB, 256GB, 512GB, 1TB",
      price_bdt: 135000,
      price_official: 135000,
      price_unofficial: 105000,
      chipset_highlight: "Apple A16 Bionic (4nm)",
      camera_highlight: "48MP Main + 12MP UW + 12MP Tele (3x)",
      display_highlight: "6.1\" Dynamic Island 120Hz OLED",
      battery_highlight: "3,200 mAh",
      processor: "Apple A16 Bionic",
      ram_variants: "6 GB",
      storage_variants: "128 GB, 256 GB, 512 GB, 1 TB",
      display_type: "Super Retina XDR OLED (Dynamic Island)",
      screen_size: "6.1 inches",
      resolution: "2556 × 1179 pixels",
      refresh_rate: "120 Hz",
      cam_count: "Triple",
      cam_main_sensor: "48 MP, f/1.78, Sensor-shift OIS",
      cam_ultrawide: "12 MP, f/2.2",
      cam_telephoto: "12 MP, f/2.8, 3x optical zoom",
      has_5g: true,
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 14 Pro Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 14 Pro — Dynamic Island, 48MP camera, Always-On display.",
      updated_at: new Date()
    },
    {
      name: "iPhone 14 Pro Max",
      slug: "iphone-14-pro-max",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2022-09-16",
      model_number: "A2651, A2893, A2894, A2895, A2896",
      colors: ["Space Black", "Silver", "Gold", "Deep Purple"],
      made_in: "China",
      phone_variants: "128GB, 256GB, 512GB, 1TB",
      price_bdt: 150000,
      price_official: 150000,
      price_unofficial: 115000,
      chipset_highlight: "Apple A16 Bionic (4nm)",
      camera_highlight: "48MP Main + 12MP UW + 12MP Tele (3x)",
      display_highlight: "6.7\" Dynamic Island 120Hz OLED",
      battery_highlight: "4,323 mAh",
      processor: "Apple A16 Bionic",
      ram_variants: "6 GB",
      storage_variants: "128 GB, 256 GB, 512 GB, 1 TB",
      display_type: "Super Retina XDR OLED (Dynamic Island)",
      screen_size: "6.7 inches",
      resolution: "2796 × 1290 pixels",
      refresh_rate: "120 Hz",
      cam_count: "Triple",
      cam_main_sensor: "48 MP, f/1.78, Sensor-shift OIS",
      cam_ultrawide: "12 MP, f/2.2",
      cam_telephoto: "12 MP, f/2.8, 3x optical zoom",
      has_5g: true,
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 14 Pro Max Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 14 Pro Max — Dynamic Island, 48MP camera, best battery.",
      updated_at: new Date()
    },
    {
      name: "iPhone 15",
      slug: "iphone-15",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2023-09-22",
      model_number: "A2846, A3089, A3090, A3092",
      colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
      made_in: "China / India",
      phone_variants: "128GB, 256GB, 512GB",
      price_bdt: 105000,
      price_official: 105000,
      price_unofficial: 85000,
      chipset_highlight: "Apple A16 Bionic (4nm)",
      camera_highlight: "48MP Main + 12MP Ultra Wide",
      display_highlight: "6.1\" Dynamic Island OLED",
      battery_highlight: "3,349 mAh",
      processor: "Apple A16 Bionic",
      ram_variants: "6 GB",
      storage_variants: "128 GB, 256 GB, 512 GB",
      display_type: "Super Retina XDR OLED (Dynamic Island)",
      screen_size: "6.1 inches",
      resolution: "2556 × 1179 pixels",
      cam_count: "Dual",
      cam_main_sensor: "48 MP, f/1.6, Sensor-shift OIS",
      cam_ultrawide: "12 MP, f/2.4",
      has_5g: true,
      usb_type: "USB-C",
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 15 Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 15 — Dynamic Island, 48MP camera, USB-C connector.",
      updated_at: new Date()
    },
    {
      name: "iPhone 15 Pro Max",
      slug: "iphone-15-pro-max",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2023-09-22",
      model_number: "A2849, A3105, A3106, A3108",
      colors: ["Black Titanium", "White Titanium", "Blue Titanium", "Natural Titanium"],
      made_in: "China",
      phone_variants: "256GB, 512GB, 1TB",
      price_bdt: 160000,
      price_official: 160000,
      price_unofficial: 135000,
      chipset_highlight: "Apple A17 Pro (3nm)",
      camera_highlight: "48MP Main + 12MP UW + 12MP Tele (5x Zoom)",
      display_highlight: "6.7\" Dynamic Island 120Hz OLED",
      battery_highlight: "4,441 mAh",
      processor: "Apple A17 Pro",
      ram_variants: "8 GB",
      storage_variants: "256 GB, 512 GB, 1 TB",
      display_type: "Super Retina XDR OLED (Dynamic Island)",
      screen_size: "6.7 inches",
      resolution: "2796 × 1290 pixels",
      refresh_rate: "120 Hz",
      cam_count: "Triple",
      cam_main_sensor: "48 MP, f/1.78, Sensor-shift OIS",
      cam_ultrawide: "12 MP, f/2.2",
      cam_telephoto: "12 MP, f/2.8, 5x optical zoom (Tetraprism)",
      has_5g: true,
      usb_type: "USB-C (USB 3)",
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 15 Pro Max Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 15 Pro Max — Titanium design, A17 Pro, 5x optical zoom.",
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
  console.log("Disconnected from MongoDB. Part 5 complete.");
}

run().catch(e => { console.error(e); process.exit(1); });
