import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO Z9s",
  "slug": "iqoo-z9s",
  "price_usd": 240,
  "is_official": true,
  "release_date": "August 2024",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $240",
  "price_status": "official",
  "colors": ["Titanium Matte", "Onyx Green"],
  "seo_overview": "The iQOO Z9s arrives as an incredibly competitive budget-friendly smartphone, packed with features that typically belong to a higher price bracket. It is powered by the MediaTek Dimensity 7300 processor, a highly capable mid-range chipset that delivers smooth multitasking and reliable performance for day-to-day apps and light gaming. The front of the phone is dominated by a vibrant 6.77-inch AMOLED display boasting a fluid 120Hz refresh rate, guaranteeing that your scrolling and media consumption remain uninterrupted and visually stunning. Although the iQOO Z9s is not officially available in the USA, importing it grants access to impressive specifications at a very low cost. Photography is handled by a dependable 50MP primary sensor, which captures detailed shots and supports high-quality 4K video recording. To keep you connected, the device features a substantial 5500 mAh battery that easily outlasts a full day of heavy usage, supported by 44W fast charging. With its slim 7.5mm profile and IP64 dust and water resistance, the iQOO Z9s is a wonderfully crafted daily driver that offers massive value for budget-conscious buyers.",
  "verdict": "The iQOO Z9s is a fantastic choice for those looking to maximize their budget. For approximately $240 via import, you gain access to a gorgeous 120Hz AMOLED display, reliable Dimensity 7300 performance, and an enormous 5500 mAh battery. While USA buyers must check for network band compatibility and accept the lack of a telephoto lens or ultra-fast flagship charging, the sheer value packed into this slim and durable device makes it a stellar mid-range purchase.",
  "faqs": [
    { "question": "Can I buy the iQOO Z9s in the USA?", "answer": "The iQOO Z9s is an international device primarily sold in India, meaning USA buyers will need to use import services and verify carrier network compatibility." },
    { "question": "What is the processor on the iQOO Z9s?", "answer": "It utilizes the reliable MediaTek Dimensity 7300 mid-range processor." },
    { "question": "Does the iQOO Z9s have a good battery life?", "answer": "Yes, it boasts a very large 5500 mAh battery that provides excellent endurance." },
    { "question": "Does the iQOO Z9s feature an AMOLED display?", "answer": "Yes, it has a 6.77-inch AMOLED display with a smooth 120Hz refresh rate." },
    { "question": "What is the charging speed of the iQOO Z9s?", "answer": "It supports 44W wired fast charging." }
  ],
  "meta_title": "iQOO Z9s Price in USA, Specs, Review & Launch Details",
  "meta_description": "Check the iQOO Z9s price in the USA, full specs, and review. Experience the Dimensity 7300, a 120Hz AMOLED screen, and a massive 5500 mAh battery.",
  "pros": [
    "Excellent value for the price",
    "Large 5500 mAh battery",
    "Smooth 120Hz AMOLED display",
    "Dependable Dimensity 7300 performance"
  ],
  "cons": [
    "Not officially available in the USA",
    "Slower 44W charging compared to Pro models"
  ],
  "display": "6.77-inch AMOLED, 120Hz, HDR10+, 1800 nits (peak)",
  "processor": "MediaTek Dimensity 7300 (4 nm)",
  "ram": "8GB / 12GB",
  "storage": "128GB / 256GB UFS 2.2",
  "camera_main": "50 MP Wide, 2 MP Depth",
  "camera_front": "16 MP",
  "battery": "5500 mAh",
  "charging": "44W wired fast charging",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO Z9s price in USA",
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
