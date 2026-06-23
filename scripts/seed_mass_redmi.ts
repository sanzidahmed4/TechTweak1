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
  console.log("Connected to MongoDB for Redmi mass seeding.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));

  // Usually Redmi is stored under Xiaomi brand in this DB schema.
  const brand = await Brand.findOne({ slug: "xiaomi" });
  if (!brand) throw new Error("Xiaomi brand not found");

  const now = new Date();
  
  const redmiPhones = [
    // K Series (Flagship Killers)
    { name: "Redmi K60 Pro", slug: "redmi-k60-pro", price: 479, year: 2023, chip: "Snapdragon 8 Gen 2", display: "OLED 120Hz", cam: "54MP OIS", bat: "5000 mAh", charging: "120W wired, 30W wireless" },
    { name: "Redmi K60", slug: "redmi-k60", price: 359, year: 2023, chip: "Snapdragon 8+ Gen 1", display: "OLED 120Hz", cam: "64MP OIS", bat: "5500 mAh", charging: "67W wired, 30W wireless" },
    { name: "Redmi K60E", slug: "redmi-k60e", price: 319, year: 2023, chip: "Dimensity 8200", display: "OLED 120Hz", cam: "48MP OIS", bat: "5500 mAh", charging: "67W wired" },
    { name: "Redmi K50 Pro", slug: "redmi-k50-pro", price: 469, year: 2022, chip: "Dimensity 9000", display: "OLED 120Hz", cam: "108MP OIS", bat: "5000 mAh", charging: "120W wired" },
    { name: "Redmi K50", slug: "redmi-k50", price: 379, year: 2022, chip: "Dimensity 8100", display: "OLED 120Hz", cam: "48MP OIS", bat: "5500 mAh", charging: "67W wired" },
    { name: "Redmi K50 Gaming", slug: "redmi-k50-gaming", price: 529, year: 2022, chip: "Snapdragon 8 Gen 1", display: "OLED 120Hz", cam: "64MP", bat: "4700 mAh", charging: "120W wired" },
    { name: "Redmi K50i", slug: "redmi-k50i", price: 329, year: 2022, chip: "Dimensity 8100", display: "IPS LCD 144Hz", cam: "64MP", bat: "5080 mAh", charging: "67W wired" },
    { name: "Redmi K40 Pro+", slug: "redmi-k40-pro-plus", price: 569, year: 2021, chip: "Snapdragon 888", display: "Super AMOLED 120Hz", cam: "108MP", bat: "4520 mAh", charging: "33W wired" },
    { name: "Redmi K40 Pro", slug: "redmi-k40-pro", price: 429, year: 2021, chip: "Snapdragon 888", display: "Super AMOLED 120Hz", cam: "64MP", bat: "4520 mAh", charging: "33W wired" },
    { name: "Redmi K40", slug: "redmi-k40", price: 309, year: 2021, chip: "Snapdragon 870", display: "Super AMOLED 120Hz", cam: "48MP", bat: "4520 mAh", charging: "33W wired" },

    // Note 12 Series
    { name: "Redmi Note 12 Turbo", slug: "redmi-note-12-turbo", price: 289, year: 2023, chip: "Snapdragon 7+ Gen 2", display: "OLED 120Hz", cam: "64MP OIS", bat: "5000 mAh", charging: "67W wired" },
    { name: "Redmi Note 12 Pro Speed", slug: "redmi-note-12-pro-speed", price: 249, year: 2022, chip: "Snapdragon 778G", display: "OLED 120Hz", cam: "108MP", bat: "5000 mAh", charging: "67W wired" },
    { name: "Redmi Note 12 Discovery", slug: "redmi-note-12-discovery", price: 329, year: 2022, chip: "Dimensity 1080", display: "OLED 120Hz", cam: "200MP OIS", bat: "4300 mAh", charging: "210W wired" },

    // Note 11 Series
    { name: "Redmi Note 11 Pro+ 5G", slug: "redmi-note-11-pro-plus-5g", price: 369, year: 2021, chip: "Dimensity 920", display: "Super AMOLED 120Hz", cam: "108MP", bat: "4500 mAh", charging: "120W wired" },
    { name: "Redmi Note 11 Pro 5G", slug: "redmi-note-11-pro-5g", price: 329, year: 2022, chip: "Snapdragon 695", display: "Super AMOLED 120Hz", cam: "108MP", bat: "5000 mAh", charging: "67W wired" },
    { name: "Redmi Note 11 Pro 4G", slug: "redmi-note-11-pro", price: 299, year: 2022, chip: "Helio G96", display: "Super AMOLED 120Hz", cam: "108MP", bat: "5000 mAh", charging: "67W wired" },
    { name: "Redmi Note 11S", slug: "redmi-note-11s", price: 249, year: 2022, chip: "Helio G96", display: "AMOLED 90Hz", cam: "108MP", bat: "5000 mAh", charging: "33W wired" },
    { name: "Redmi Note 11", slug: "redmi-note-11", price: 199, year: 2022, chip: "Snapdragon 680", display: "AMOLED 90Hz", cam: "50MP", bat: "5000 mAh", charging: "33W wired" },
    { name: "Redmi Note 11T 5G", slug: "redmi-note-11t-5g", price: 229, year: 2021, chip: "Dimensity 810", display: "IPS LCD 90Hz", cam: "50MP", bat: "5000 mAh", charging: "33W wired" },

    // Note 10 Series
    { name: "Redmi Note 10 Pro Max", slug: "redmi-note-10-pro-max", price: 279, year: 2021, chip: "Snapdragon 732G", display: "Super AMOLED 120Hz", cam: "108MP", bat: "5020 mAh", charging: "33W wired" },
    { name: "Redmi Note 10 Pro", slug: "redmi-note-10-pro", price: 249, year: 2021, chip: "Snapdragon 732G", display: "AMOLED 120Hz", cam: "64MP", bat: "5020 mAh", charging: "33W wired" },
    { name: "Redmi Note 10S", slug: "redmi-note-10s", price: 219, year: 2021, chip: "Helio G95", display: "AMOLED 60Hz", cam: "64MP", bat: "5000 mAh", charging: "33W wired" },
    { name: "Redmi Note 10 5G", slug: "redmi-note-10-5g", price: 199, year: 2021, chip: "Dimensity 700", display: "IPS LCD 90Hz", cam: "48MP", bat: "5000 mAh", charging: "18W wired" },
    { name: "Redmi Note 10", slug: "redmi-note-10", price: 179, year: 2021, chip: "Snapdragon 678", display: "Super AMOLED 60Hz", cam: "48MP", bat: "5000 mAh", charging: "33W wired" },

    // Note 9 Series
    { name: "Redmi Note 9 Pro 5G", slug: "redmi-note-9-pro-5g", price: 249, year: 2020, chip: "Snapdragon 750G", display: "IPS LCD 120Hz", cam: "108MP", bat: "4820 mAh", charging: "33W wired" },
    { name: "Redmi Note 9 Pro", slug: "redmi-note-9-pro", price: 229, year: 2020, chip: "Snapdragon 720G", display: "IPS LCD 60Hz", cam: "64MP", bat: "5020 mAh", charging: "30W wired" },
    { name: "Redmi Note 9S", slug: "redmi-note-9s", price: 199, year: 2020, chip: "Snapdragon 720G", display: "IPS LCD 60Hz", cam: "48MP", bat: "5020 mAh", charging: "18W wired" },
    { name: "Redmi Note 9", slug: "redmi-note-9", price: 169, year: 2020, chip: "Helio G85", display: "IPS LCD 60Hz", cam: "48MP", bat: "5020 mAh", charging: "18W wired" },

    // Base Budget Series
    { name: "Redmi 12", slug: "redmi-12", price: 149, year: 2023, chip: "Helio G88", display: "IPS LCD 90Hz", cam: "50MP", bat: "5000 mAh", charging: "18W wired" },
    { name: "Redmi 10C", slug: "redmi-10c", price: 139, year: 2022, chip: "Snapdragon 680", display: "IPS LCD 60Hz", cam: "50MP", bat: "5000 mAh", charging: "18W wired" },
    { name: "Redmi 10A", slug: "redmi-10a", price: 119, year: 2022, chip: "Helio G25", display: "IPS LCD 60Hz", cam: "13MP", bat: "5000 mAh", charging: "10W wired" },
    { name: "Redmi 10", slug: "redmi-10", price: 159, year: 2021, chip: "Helio G88", display: "IPS LCD 90Hz", cam: "50MP", bat: "5000 mAh", charging: "18W wired" },
    { name: "Redmi 9T", slug: "redmi-9t", price: 149, year: 2021, chip: "Snapdragon 662", display: "IPS LCD 60Hz", cam: "48MP", bat: "6000 mAh", charging: "18W wired" },
    { name: "Redmi 9A", slug: "redmi-9a", price: 99, year: 2020, chip: "Helio G25", display: "IPS LCD 60Hz", cam: "13MP", bat: "5000 mAh", charging: "10W wired" },
    { name: "Redmi 9C", slug: "redmi-9c", price: 109, year: 2020, chip: "Helio G35", display: "IPS LCD 60Hz", cam: "13MP", bat: "5000 mAh", charging: "10W wired" },
    { name: "Redmi 9", slug: "redmi-9", price: 139, year: 2020, chip: "Helio G80", display: "IPS LCD 60Hz", cam: "13MP", bat: "5020 mAh", charging: "18W wired" }
  ];

  let added = 0;

  for (const info of redmiPhones) {
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

  console.log(`Redmi Phase 2: Added ${added} phones.`);
  mongoose.disconnect();
}

run().catch(console.error);
