import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO Neo 10",
  "slug": "iqoo-neo-10",
  "price_usd": 400,
  "is_official": true,
  "release_date": "November 2024",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $400",
  "price_status": "official",
  "colors": ["Black", "White", "Orange/Grey"],
  "seo_overview": "The iQOO Neo 10 brings a phenomenal mix of high-end specifications and an accessible price tag, making it an excellent choice for performance-oriented users. At its heart lies the powerful Qualcomm Snapdragon 8 Gen 3 processor, capable of handling everything from everyday multitasking to graphically demanding gaming sessions effortlessly. The 6.78-inch AMOLED display with an incredibly smooth 144Hz refresh rate provides an immersive visual experience whether you are streaming content or navigating apps. Although USA buyers will need to explore import channels to purchase the device, its compelling hardware makes the effort worthwhile. On the rear, the phone sports a solid 50MP primary camera that captures detailed and vibrant images, though it omits a dedicated telephoto lens to keep costs low. To support heavy usage, a massive 6100 mAh battery resides within the sleek chassis, paired with ultra-fast 120W wired charging to ensure you are never out of power for long. With its modern aesthetics and focus on raw speed, the iQOO Neo 10 is a standout device in its class.",
  "verdict": "The iQOO Neo 10 is an exceptional smartphone that offers flagship-grade power at a mid-range price. The combination of the Snapdragon 8 Gen 3 chipset and a 144Hz AMOLED screen provides a stellar gaming and daily usage experience. While USA availability is limited to imports and network compatibility should be checked, the sheer value proposition is undeniable. If you want top-tier processing speeds and excellent battery life without the premium cost, this phone is highly recommended.",
  "faqs": [
    { "question": "Can I buy the iQOO Neo 10 in the USA?", "answer": "The iQOO Neo 10 is not officially released in the USA. You can purchase it via third-party importers, but you must verify carrier network compatibility." },
    { "question": "What is the processor on the iQOO Neo 10?", "answer": "The device is powered by the top-tier Qualcomm Snapdragon 8 Gen 3 chipset." },
    { "question": "Does the iQOO Neo 10 have a good battery?", "answer": "Yes, it boasts a massive 6100 mAh battery that easily lasts throughout the day even with heavy usage." },
    { "question": "What is the charging speed of the iQOO Neo 10?", "answer": "It supports ultra-fast 120W wired charging to minimize downtime." },
    { "question": "Is the display on the iQOO Neo 10 suitable for gaming?", "answer": "Absolutely. It features a stunning 144Hz AMOLED screen that provides buttery smooth gameplay and animations." }
  ],
  "meta_title": "iQOO Neo 10 Price in USA, Specs, Review & Launch Details",
  "meta_description": "Discover the iQOO Neo 10 price in the USA, full specs, and review. Experience Snapdragon 8 Gen 3 power, a 144Hz AMOLED screen, and a massive 6100 mAh battery.",
  "pros": [
    "High-end Snapdragon 8 Gen 3 processor",
    "Massive 6100 mAh battery with 120W fast charging",
    "Stunning 144Hz AMOLED display",
    "Excellent value for money"
  ],
  "cons": [
    "Not officially available in the USA",
    "Lacks wireless charging"
  ],
  "display": "6.78-inch AMOLED, 144Hz, HDR10+",
  "processor": "Qualcomm Snapdragon 8 Gen 3 (4 nm)",
  "ram": "12GB / 16GB",
  "storage": "256GB / 512GB / 1TB UFS 4.0",
  "camera_main": "50 MP Wide, 8 MP Ultrawide",
  "camera_front": "16 MP",
  "battery": "6100 mAh",
  "charging": "120W wired fast charging",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO Neo 10 price in USA",
  "seo_status": "Green",
  "content_status": "Published"
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    let brand = await Brand.findOne({ slug: 'iqoo' });
    if (!brand) {
      brand = await Brand.create({ name: 'iQOO', slug: 'iqoo' });
    }
    data.brand_id = brand._id;
    await Phone.findOneAndUpdate({ slug: data.slug }, { $set: data }, { upsert: true, new: true });
    console.log(`Successfully inserted: ${data.name}`);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}
run();
