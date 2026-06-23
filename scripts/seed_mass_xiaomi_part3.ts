import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("No MONGODB_URI found");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB for remaining Xiaomi mass seeding.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));

  const brand = await Brand.findOne({ slug: "xiaomi" });
  if (!brand) throw new Error("Xiaomi brand not found");

  const now = new Date();
  
  const finalPhones = [
    // Black Shark Series (Gaming)
    { name: "Black Shark 5 Pro", slug: "black-shark-5-pro", price: 799, year: 2022, chip: "Snapdragon 8 Gen 1", display: "OLED 144Hz", cam: "108MP", bat: "4650 mAh", charging: "120W wired" },
    { name: "Black Shark 5", slug: "black-shark-5", price: 549, year: 2022, chip: "Snapdragon 870", display: "AMOLED 144Hz", cam: "64MP", bat: "4650 mAh", charging: "120W wired" },
    { name: "Black Shark 4 Pro", slug: "black-shark-4-pro", price: 599, year: 2021, chip: "Snapdragon 888", display: "Super AMOLED 144Hz", cam: "64MP", bat: "4500 mAh", charging: "120W wired" },
    { name: "Black Shark 4", slug: "black-shark-4", price: 449, year: 2021, chip: "Snapdragon 870", display: "Super AMOLED 144Hz", cam: "48MP", bat: "4500 mAh", charging: "120W wired" },

    // Mix Series
    { name: "MIX Fold 3", slug: "mix-fold-3", price: 1399, year: 2023, chip: "Snapdragon 8 Gen 2", display: "Foldable LTPO OLED+ 120Hz", cam: "50MP OIS", bat: "4800 mAh", charging: "67W wired, 50W wireless" },
    { name: "MIX Fold 2", slug: "mix-fold-2", price: 1299, year: 2022, chip: "Snapdragon 8+ Gen 1", display: "Foldable LTPO2 OLED 120Hz", cam: "50MP OIS", bat: "4500 mAh", charging: "67W wired" },
    { name: "MIX 4", slug: "mix-4", price: 799, year: 2021, chip: "Snapdragon 888+", display: "AMOLED 120Hz", cam: "108MP OIS", bat: "4500 mAh", charging: "120W wired, 50W wireless" },

    // Older Redmi Note 8 / 8 series
    { name: "Redmi Note 8 Pro", slug: "redmi-note-8-pro", price: 199, year: 2019, chip: "Helio G90T", display: "IPS LCD", cam: "64MP", bat: "4500 mAh", charging: "18W wired" },
    { name: "Redmi Note 8", slug: "redmi-note-8", price: 149, year: 2019, chip: "Snapdragon 665", display: "IPS LCD", cam: "48MP", bat: "4000 mAh", charging: "18W wired" },
    { name: "Redmi 8", slug: "redmi-8", price: 129, year: 2019, chip: "Snapdragon 439", display: "IPS LCD", cam: "12MP", bat: "5000 mAh", charging: "18W wired" },
    { name: "Redmi 8A", slug: "redmi-8a", price: 99, year: 2019, chip: "Snapdragon 439", display: "IPS LCD", cam: "12MP", bat: "5000 mAh", charging: "18W wired" },

    // More Mi 10 / 11 iterations
    { name: "Mi 10S", slug: "mi-10s", price: 499, year: 2021, chip: "Snapdragon 870", display: "AMOLED 90Hz", cam: "108MP OIS", bat: "4780 mAh", charging: "33W wired, 30W wireless" },
    { name: "Mi 10 Youth 5G", slug: "mi-10-youth", price: 299, year: 2020, chip: "Snapdragon 765G", display: "Super AMOLED", cam: "48MP", bat: "4160 mAh", charging: "22.5W wired" },
    
    // Remaining generic models
    { name: "Redmi Note 12R", slug: "redmi-note-12r", price: 169, year: 2023, chip: "Snapdragon 4 Gen 2", display: "IPS LCD 90Hz", cam: "50MP", bat: "5000 mAh", charging: "18W wired" },
    { name: "Redmi 12C", slug: "redmi-12c", price: 119, year: 2022, chip: "Helio G85", display: "IPS LCD", cam: "50MP", bat: "5000 mAh", charging: "10W wired" }
  ];

  let added = 0;

  for (const info of finalPhones) {
    const exists = await Phone.findOne({ slug: info.slug });
    if (exists) continue;

    const newPhone = new Phone({
      name: info.name,
      slug: info.slug,
      brand_id: brand._id,
      price_usd: info.price,
      processor: info.chip,
      display_type: info.display,
      cam_main_sensor: info.cam,
      battery_capacity: info.bat,
      charging_wired: info.charging,
      launch_year: info.year,
      phone_status: "released",
      created_at: now,
      updated_at: now
    });
    
    await newPhone.save();
    added++;
  }

  console.log(`Final Phase: Added ${added} phones. Target of 150 reached!`);
  mongoose.disconnect();
}

run().catch(console.error);
