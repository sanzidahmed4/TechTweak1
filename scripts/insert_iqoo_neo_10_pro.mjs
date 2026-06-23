import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO Neo 10 Pro",
  "slug": "iqoo-neo-10-pro",
  "price_usd": 450,
  "is_official": true,
  "release_date": "November 2024",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $450",
  "price_status": "official",
  "colors": ["Black", "White", "Orange/Grey"],
  "seo_overview": "The iQOO Neo 10 Pro redefines the mid-range smartphone segment by offering flagship-level performance at a highly accessible price point. Powered by the incredibly efficient MediaTek Dimensity 9400 processor, this device handles everything from daily multitasking to graphic-intensive gaming with absolute ease. The visual experience is anchored by a stunning 6.78-inch LTPO AMOLED display featuring a blazing 144Hz refresh rate, ensuring perfectly smooth scrolling and vivid multimedia consumption. For USA buyers looking to maximize their tech budget, importing the iQOO Neo 10 Pro is a fantastic route to obtaining premium hardware without the premium cost. The phone is equipped with a capable dual 50MP camera setup—a sharp primary lens with OIS paired with an equally resolute ultrawide sensor—allowing for excellent photography in various lighting conditions. To keep you powered throughout the day, it houses an enormous 6100 mAh battery that supports extremely fast 120W wired charging. With the inclusion of an advanced under-display 3D ultrasonic fingerprint scanner, the iQOO Neo 10 Pro stands out as an exceptional value proposition for tech enthusiasts.",
  "verdict": "The iQOO Neo 10 Pro is a spectacular option for USA consumers willing to import their devices. By utilizing the MediaTek Dimensity 9400 chipset, it delivers top-tier performance that rivals much more expensive smartphones. The massive 6100 mAh battery and ultra-fast charging make battery anxiety a thing of the past. Although network compatibility must be verified before purchasing, the phone's beautiful 144Hz display and solid 50MP cameras make it a highly recommended choice for those seeking maximum value.",
  "faqs": [
    { "question": "Does the iQOO Neo 10 Pro work in the USA?", "answer": "The device is primarily intended for the Chinese market. USA buyers must check its supported 5G and LTE bands to ensure compatibility with their carrier before importing." },
    { "question": "What processor is in the iQOO Neo 10 Pro?", "answer": "It uses the high-performance MediaTek Dimensity 9400 chipset." },
    { "question": "What is the battery capacity of the iQOO Neo 10 Pro?", "answer": "It boasts a massive 6100 mAh battery, providing exceptional all-day battery life." },
    { "question": "Does the iQOO Neo 10 Pro support fast charging?", "answer": "Yes, it supports blazing fast 120W wired charging." },
    { "question": "Is there a telephoto camera on the iQOO Neo 10 Pro?", "answer": "No, it features a dual-camera system consisting of a 50MP primary sensor and a 50MP ultrawide sensor, omitting a dedicated telephoto lens." }
  ],
  "meta_title": "iQOO Neo 10 Pro Price in USA, Specs, Review & Launch",
  "meta_description": "Check the iQOO Neo 10 Pro price in the USA, detailed specs, and review. Experience the Dimensity 9400, 144Hz AMOLED, and huge 6100 mAh battery.",
  "pros": [
    "Excellent MediaTek Dimensity 9400 performance",
    "Huge 6100 mAh battery with 120W charging",
    "Stunning 144Hz LTPO AMOLED display",
    "High-quality dual 50MP rear cameras"
  ],
  "cons": [
    "Not officially available in the USA",
    "Lacks a dedicated telephoto camera lens"
  ],
  "display": "6.78-inch LTPO AMOLED, 144Hz, HDR10+",
  "processor": "MediaTek Dimensity 9400 (3 nm)",
  "ram": "12GB / 16GB",
  "storage": "256GB / 512GB / 1TB UFS 4.0",
  "camera_main": "50 MP Wide, 50 MP Ultrawide",
  "camera_front": "16 MP",
  "battery": "6100 mAh",
  "charging": "120W wired fast charging",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO Neo 10 Pro price in USA",
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
