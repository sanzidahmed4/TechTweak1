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
      name: "iPhone 16",
      slug: "iphone-16",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2024-09-20",
      colors: ["Black", "White", "Pink", "Teal", "Ultramarine"],
      phone_variants: "128GB, 256GB, 512GB",
      price_bdt: 115000,
      price_official: 115000,
      price_unofficial: 95000,
      chipset_highlight: "Apple A18 (3nm)",
      camera_highlight: "48MP Fusion + 12MP Ultra Wide (Camera Control)",
      display_highlight: "6.1\" Super Retina XDR OLED",
      battery_highlight: "3,561 mAh",
      processor: "Apple A18",
      ram_variants: "8 GB",
      storage_variants: "128 GB, 256 GB, 512 GB",
      display_type: "Super Retina XDR OLED",
      screen_size: "6.1 inches",
      resolution: "2556 × 1179 pixels",
      cam_count: "Dual",
      cam_main_sensor: "48 MP, f/1.6, Sensor-shift OIS",
      cam_ultrawide: "12 MP, f/2.2",
      has_5g: true,
      usb_type: "USB-C (USB 2)",
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 16 Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 16 — A18 chip, Camera Control button, Apple Intelligence.",
      updated_at: new Date()
    },
    {
      name: "iPhone 16 Pro Max",
      slug: "iphone-16-pro-max",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2024-09-20",
      colors: ["Black Titanium", "White Titanium", "Natural Titanium", "Desert Titanium"],
      phone_variants: "256GB, 512GB, 1TB",
      price_bdt: 175000,
      price_official: 175000,
      price_unofficial: 145000,
      chipset_highlight: "Apple A18 Pro (3nm)",
      camera_highlight: "48MP Main + 48MP UW + 12MP Tele (5x Zoom)",
      display_highlight: "6.9\" ProMotion 120Hz OLED",
      battery_highlight: "4,685 mAh",
      processor: "Apple A18 Pro",
      ram_variants: "8 GB",
      storage_variants: "256 GB, 512 GB, 1 TB",
      display_type: "Super Retina XDR OLED with ProMotion",
      screen_size: "6.9 inches",
      resolution: "2868 × 1320 pixels",
      refresh_rate: "120 Hz",
      cam_count: "Triple",
      cam_main_sensor: "48 MP, f/1.78, Sensor-shift OIS",
      cam_ultrawide: "48 MP, f/2.2",
      cam_telephoto: "12 MP, f/2.8, 5x optical zoom",
      has_5g: true,
      usb_type: "USB-C (USB 3)",
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 16 Pro Max Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 16 Pro Max — Largest display, A18 Pro, 5x zoom, Camera Control.",
      updated_at: new Date()
    },
    {
      name: "iPhone 17 Air",
      slug: "iphone-17-air",
      brand_id: bid,
      is_published: true,
      is_official: true,
      release_date: "2025-09-19",
      colors: ["Silver", "Space Gray", "Rose Gold"],
      phone_variants: "256GB, 512GB",
      price_bdt: 145000,
      price_official: 145000,
      price_unofficial: 120000,
      chipset_highlight: "Apple A19 Pro (3nm)",
      camera_highlight: "Single 48MP (Ultra-thin design)",
      display_highlight: "6.5\" ProMotion 120Hz OLED",
      battery_highlight: "Slim profile battery",
      processor: "Apple A19 Pro",
      ram_variants: "8 GB",
      storage_variants: "256 GB, 512 GB",
      display_type: "Super Retina XDR OLED with ProMotion",
      screen_size: "6.5 inches",
      resolution: "2740 × 1260 pixels (approx)",
      refresh_rate: "120 Hz",
      cam_count: "Single",
      cam_main_sensor: "48 MP, f/1.8",
      has_5g: true,
      usb_type: "USB-C",
      sensor_fingerprint: "Face ID",
      meta_title: "iPhone 17 Air Specs & Price in Bangladesh | TechTweak",
      meta_description: "Specs of iPhone 17 Air — Ultra-thin 5.6mm design, A19 Pro, ProMotion.",
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
  console.log("Disconnected from MongoDB. Part 6 complete.");
}

run().catch(e => { console.error(e); process.exit(1); });
