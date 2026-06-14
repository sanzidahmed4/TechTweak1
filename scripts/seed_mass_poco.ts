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
  console.log("Connected to MongoDB for POCO mass seeding.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));

  const brand = await Brand.findOne({ slug: "poco" });
  if (!brand) throw new Error("POCO brand not found");

  const now = new Date();
  
  const pocoPhones = [
    // F Series (Flagship Killers)
    { name: "POCO F5 Pro", slug: "poco-f5-pro", price: 449, year: 2023, chip: "Snapdragon 8+ Gen 1", display: "AMOLED 120Hz", cam: "64MP", bat: "5160 mAh", charging: "67W wired, 30W wireless" },
    { name: "POCO F5", slug: "poco-f5", price: 379, year: 2023, chip: "Snapdragon 7+ Gen 2", display: "AMOLED 120Hz", cam: "64MP", bat: "5000 mAh", charging: "67W wired" },
    { name: "POCO F4 GT", slug: "poco-f4-gt", price: 599, year: 2022, chip: "Snapdragon 8 Gen 1", display: "AMOLED 120Hz", cam: "64MP", bat: "4700 mAh", charging: "120W wired" },
    { name: "POCO F4", slug: "poco-f4", price: 399, year: 2022, chip: "Snapdragon 870", display: "AMOLED 120Hz", cam: "64MP OIS", bat: "4500 mAh", charging: "67W wired" },
    { name: "POCO F3", slug: "poco-f3", price: 349, year: 2021, chip: "Snapdragon 870", display: "AMOLED 120Hz", cam: "48MP", bat: "4520 mAh", charging: "33W wired" },
    { name: "POCO F2 Pro", slug: "poco-f2-pro", price: 499, year: 2020, chip: "Snapdragon 865", display: "Super AMOLED 60Hz", cam: "64MP", bat: "4700 mAh", charging: "30W wired" },

    // X Series (Mid-range Performance)
    { name: "POCO X5 Pro", slug: "poco-x5-pro", price: 299, year: 2023, chip: "Snapdragon 778G", display: "AMOLED 120Hz", cam: "108MP", bat: "5000 mAh", charging: "67W wired" },
    { name: "POCO X5", slug: "poco-x5", price: 249, year: 2023, chip: "Snapdragon 695", display: "AMOLED 120Hz", cam: "48MP", bat: "5000 mAh", charging: "33W wired" },
    { name: "POCO X4 GT", slug: "poco-x4-gt", price: 379, year: 2022, chip: "Dimensity 8100", display: "IPS LCD 144Hz", cam: "64MP", bat: "5080 mAh", charging: "67W wired" },
    { name: "POCO X4 Pro 5G", slug: "poco-x4-pro-5g", price: 299, year: 2022, chip: "Snapdragon 695", display: "AMOLED 120Hz", cam: "108MP", bat: "5000 mAh", charging: "67W wired" },
    { name: "POCO X3 GT", slug: "poco-x3-gt", price: 299, year: 2021, chip: "Dimensity 1100", display: "IPS LCD 120Hz", cam: "64MP", bat: "5000 mAh", charging: "67W wired" },
    { name: "POCO X3 Pro", slug: "poco-x3-pro", price: 249, year: 2021, chip: "Snapdragon 860", display: "IPS LCD 120Hz", cam: "48MP", bat: "5160 mAh", charging: "33W wired" },
    { name: "POCO X3 NFC", slug: "poco-x3-nfc", price: 229, year: 2020, chip: "Snapdragon 732G", display: "IPS LCD 120Hz", cam: "64MP", bat: "5160 mAh", charging: "33W wired" },
    { name: "POCO X2", slug: "poco-x2", price: 229, year: 2020, chip: "Snapdragon 730G", display: "IPS LCD 120Hz", cam: "64MP", bat: "4500 mAh", charging: "27W wired" },

    // M Series (Budget)
    { name: "POCO M5s", slug: "poco-m5s", price: 209, year: 2022, chip: "Helio G95", display: "AMOLED 60Hz", cam: "64MP", bat: "5000 mAh", charging: "33W wired" },
    { name: "POCO M5", slug: "poco-m5", price: 189, year: 2022, chip: "Helio G99", display: "IPS LCD 90Hz", cam: "50MP", bat: "5000 mAh", charging: "18W wired" },
    { name: "POCO M4 Pro 5G", slug: "poco-m4-pro-5g", price: 229, year: 2021, chip: "Dimensity 810", display: "IPS LCD 90Hz", cam: "50MP", bat: "5000 mAh", charging: "33W wired" },
    { name: "POCO M4 Pro", slug: "poco-m4-pro", price: 219, year: 2022, chip: "Helio G96", display: "AMOLED 90Hz", cam: "64MP", bat: "5000 mAh", charging: "33W wired" },
    { name: "POCO M3 Pro 5G", slug: "poco-m3-pro-5g", price: 179, year: 2021, chip: "Dimensity 700", display: "IPS LCD 90Hz", cam: "48MP", bat: "5000 mAh", charging: "18W wired" },
    { name: "POCO M3", slug: "poco-m3", price: 149, year: 2020, chip: "Snapdragon 662", display: "IPS LCD 60Hz", cam: "48MP", bat: "6000 mAh", charging: "18W wired" },
    { name: "POCO M2 Pro", slug: "poco-m2-pro", price: 189, year: 2020, chip: "Snapdragon 720G", display: "IPS LCD 60Hz", cam: "48MP", bat: "5000 mAh", charging: "33W wired" },
    { name: "POCO M2", slug: "poco-m2", price: 149, year: 2020, chip: "Helio G80", display: "IPS LCD 60Hz", cam: "13MP", bat: "5000 mAh", charging: "18W wired" },

    // C Series (Ultra Budget)
    { name: "POCO C55", slug: "poco-c55", price: 119, year: 2023, chip: "Helio G85", display: "IPS LCD 60Hz", cam: "50MP", bat: "5000 mAh", charging: "10W wired" },
    { name: "POCO C51", slug: "poco-c51", price: 109, year: 2023, chip: "Helio G36", display: "IPS LCD 60Hz", cam: "8MP", bat: "5000 mAh", charging: "10W wired" },
    { name: "POCO C50", slug: "poco-c50", price: 99, year: 2023, chip: "Helio A22", display: "IPS LCD 60Hz", cam: "8MP", bat: "5000 mAh", charging: "10W wired" },
    { name: "POCO C40", slug: "poco-c40", price: 129, year: 2022, chip: "JLQ JR510", display: "IPS LCD 60Hz", cam: "13MP", bat: "6000 mAh", charging: "18W wired" },
    { name: "POCO C31", slug: "poco-c31", price: 109, year: 2021, chip: "Helio G35", display: "IPS LCD 60Hz", cam: "13MP", bat: "5000 mAh", charging: "10W wired" },
    { name: "POCO C3", slug: "poco-c3", price: 99, year: 2020, chip: "Helio G35", display: "IPS LCD 60Hz", cam: "13MP", bat: "5000 mAh", charging: "10W wired" }
  ];

  let added = 0;

  for (const info of pocoPhones) {
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

  console.log(`POCO Phase 2: Added ${added} phones.`);
  mongoose.disconnect();
}

run().catch(console.error);
