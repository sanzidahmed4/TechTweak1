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
  console.log("Connected to MongoDB for Xiaomi mass seeding.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));

  const brand = await Brand.findOne({ slug: "xiaomi" });
  if (!brand) throw new Error("Xiaomi brand not found");

  const now = new Date();
  
  const xiaomiPhones = [
    // 13 Series
    { name: "Xiaomi 13T Pro", slug: "xiaomi-13t-pro", price: 699, year: 2023, chip: "Dimensity 9200+", display: "AMOLED 144Hz", cam: "50MP OIS", bat: "5000 mAh", charging: "120W wired" },
    { name: "Xiaomi 13T", slug: "xiaomi-13t", price: 549, year: 2023, chip: "Dimensity 8200 Ultra", display: "AMOLED 144Hz", cam: "50MP OIS", bat: "5000 mAh", charging: "67W wired" },
    { name: "Xiaomi 13 Lite", slug: "xiaomi-13-lite", price: 449, year: 2023, chip: "Snapdragon 7 Gen 1", display: "AMOLED 120Hz", cam: "50MP", bat: "4500 mAh", charging: "67W wired" },
    { name: "Xiaomi 13 Ultra", slug: "xiaomi-13-ultra", price: 1199, year: 2023, chip: "Snapdragon 8 Gen 2", display: "LTPO AMOLED 120Hz", cam: "50MP OIS (1-inch)", bat: "5000 mAh", charging: "90W wired, 50W wireless" },

    // 12 Series
    { name: "Xiaomi 12T Pro", slug: "xiaomi-12t-pro", price: 749, year: 2022, chip: "Snapdragon 8+ Gen 1", display: "AMOLED 120Hz", cam: "200MP OIS", bat: "5000 mAh", charging: "120W wired" },
    { name: "Xiaomi 12T", slug: "xiaomi-12t", price: 599, year: 2022, chip: "Dimensity 8100-Ultra", display: "AMOLED 120Hz", cam: "108MP OIS", bat: "5000 mAh", charging: "120W wired" },
    { name: "Xiaomi 12S Ultra", slug: "xiaomi-12s-ultra", price: 1099, year: 2022, chip: "Snapdragon 8+ Gen 1", display: "LTPO2 AMOLED 120Hz", cam: "50MP OIS (1-inch)", bat: "4860 mAh", charging: "67W wired, 50W wireless" },
    { name: "Xiaomi 12S Pro", slug: "xiaomi-12s-pro", price: 849, year: 2022, chip: "Snapdragon 8+ Gen 1", display: "LTPO AMOLED 120Hz", cam: "50MP OIS", bat: "4600 mAh", charging: "120W wired, 50W wireless" },
    { name: "Xiaomi 12S", slug: "xiaomi-12s", price: 699, year: 2022, chip: "Snapdragon 8+ Gen 1", display: "AMOLED 120Hz", cam: "50MP OIS", bat: "4500 mAh", charging: "67W wired, 50W wireless" },
    { name: "Xiaomi 12 Pro", slug: "xiaomi-12-pro", price: 999, year: 2021, chip: "Snapdragon 8 Gen 1", display: "LTPO AMOLED 120Hz", cam: "50MP OIS", bat: "4600 mAh", charging: "120W wired, 50W wireless" },
    { name: "Xiaomi 12", slug: "xiaomi-12", price: 749, year: 2021, chip: "Snapdragon 8 Gen 1", display: "AMOLED 120Hz", cam: "50MP OIS", bat: "4500 mAh", charging: "67W wired, 50W wireless" },
    { name: "Xiaomi 12X", slug: "xiaomi-12x", price: 599, year: 2021, chip: "Snapdragon 870", display: "AMOLED 120Hz", cam: "50MP OIS", bat: "4500 mAh", charging: "67W wired" },
    { name: "Xiaomi 12 Lite", slug: "xiaomi-12-lite", price: 399, year: 2022, chip: "Snapdragon 778G", display: "AMOLED 120Hz", cam: "108MP", bat: "4300 mAh", charging: "67W wired" },

    // 11 Series
    { name: "Xiaomi 11T Pro", slug: "xiaomi-11t-pro", price: 649, year: 2021, chip: "Snapdragon 888", display: "AMOLED 120Hz", cam: "108MP", bat: "5000 mAh", charging: "120W wired" },
    { name: "Xiaomi 11T", slug: "xiaomi-11t", price: 499, year: 2021, chip: "Dimensity 1200", display: "AMOLED 120Hz", cam: "108MP", bat: "5000 mAh", charging: "67W wired" },
    { name: "Xiaomi 11 Lite 5G NE", slug: "xiaomi-11-lite-5g-ne", price: 349, year: 2021, chip: "Snapdragon 778G", display: "AMOLED 90Hz", cam: "64MP", bat: "4250 mAh", charging: "33W wired" },
    { name: "Mi 11 Ultra", slug: "mi-11-ultra", price: 1199, year: 2021, chip: "Snapdragon 888", display: "AMOLED 120Hz", cam: "50MP OIS", bat: "5000 mAh", charging: "67W wired, 67W wireless" },
    { name: "Mi 11 Pro", slug: "mi-11-pro", price: 899, year: 2021, chip: "Snapdragon 888", display: "AMOLED 120Hz", cam: "50MP OIS", bat: "5000 mAh", charging: "67W wired, 67W wireless" },
    { name: "Mi 11", slug: "mi-11", price: 749, year: 2020, chip: "Snapdragon 888", display: "AMOLED 120Hz", cam: "108MP OIS", bat: "4600 mAh", charging: "55W wired, 50W wireless" },
    { name: "Mi 11i", slug: "mi-11i", price: 649, year: 2021, chip: "Snapdragon 888", display: "Super AMOLED 120Hz", cam: "108MP", bat: "4520 mAh", charging: "33W wired" },
    { name: "Mi 11 Lite 5G", slug: "mi-11-lite-5g", price: 369, year: 2021, chip: "Snapdragon 780G", display: "AMOLED 90Hz", cam: "64MP", bat: "4250 mAh", charging: "33W wired" },
    { name: "Mi 11 Lite", slug: "mi-11-lite", price: 299, year: 2021, chip: "Snapdragon 732G", display: "AMOLED 90Hz", cam: "64MP", bat: "4250 mAh", charging: "33W wired" },

    // 10 Series
    { name: "Mi 10T Pro 5G", slug: "mi-10t-pro-5g", price: 599, year: 2020, chip: "Snapdragon 865", display: "IPS LCD 144Hz", cam: "108MP OIS", bat: "5000 mAh", charging: "33W wired" },
    { name: "Mi 10T 5G", slug: "mi-10t-5g", price: 499, year: 2020, chip: "Snapdragon 865", display: "IPS LCD 144Hz", cam: "64MP", bat: "5000 mAh", charging: "33W wired" },
    { name: "Mi 10T Lite 5G", slug: "mi-10t-lite-5g", price: 279, year: 2020, chip: "Snapdragon 750G", display: "IPS LCD 120Hz", cam: "64MP", bat: "4820 mAh", charging: "33W wired" },
    { name: "Mi 10 Ultra", slug: "mi-10-ultra", price: 999, year: 2020, chip: "Snapdragon 865", display: "OLED 120Hz", cam: "48MP OIS", bat: "4500 mAh", charging: "120W wired, 50W wireless" },
    { name: "Mi 10 Pro 5G", slug: "mi-10-pro-5g", price: 899, year: 2020, chip: "Snapdragon 865", display: "Super AMOLED 90Hz", cam: "108MP OIS", bat: "4500 mAh", charging: "50W wired, 30W wireless" },
    { name: "Mi 10 5G", slug: "mi-10-5g", price: 699, year: 2020, chip: "Snapdragon 865", display: "Super AMOLED 90Hz", cam: "108MP OIS", bat: "4780 mAh", charging: "30W wired, 30W wireless" },
    { name: "Mi 10 Lite 5G", slug: "mi-10-lite-5g", price: 349, year: 2020, chip: "Snapdragon 765G", display: "AMOLED 60Hz", cam: "48MP", bat: "4160 mAh", charging: "20W wired" }
  ];

  let added = 0;

  for (const info of xiaomiPhones) {
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

  console.log(`Xiaomi Phase 2: Added ${added} phones.`);
  mongoose.disconnect();
}

run().catch(console.error);
