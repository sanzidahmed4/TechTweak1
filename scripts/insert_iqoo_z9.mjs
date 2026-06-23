import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO Z9",
  "slug": "iqoo-z9",
  "price_usd": 250,
  "is_official": true,
  "release_date": "March 2024",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $250",
  "price_status": "official",
  "colors": ["Brushed Green", "Graphene Blue"],
  "seo_overview": "The iQOO Z9 is a highly attractive budget smartphone that perfectly balances essential features with impressive daily performance. Powered by the incredibly efficient MediaTek Dimensity 7200 processor, it ensures a responsive user experience, smooth multitasking, and sufficient power for casual mobile gaming. The visual experience is anchored by a sharp 6.67-inch AMOLED display that produces vibrant colors and deep blacks, ideal for streaming media and daily browsing. Though the iQOO Z9 requires importing for the USA market, its affordability makes it an enticing prospect for budget-savvy consumers. The device is equipped with a reliable 50MP primary camera that takes excellent, vibrant photos for social media sharing. To guarantee long-lasting usage, it houses a large 5000 mAh battery that easily provides all-day power, complemented by a swift 44W wired fast charging system that reduces your time spent plugged into the wall. Packaged in a slim, modern design, the iQOO Z9 stands as an exceptional mid-range option.",
  "verdict": "For USA buyers willing to navigate the import process, the iQOO Z9 presents an incredible value proposition. Featuring the power-efficient Dimensity 7200 processor, a beautiful AMOLED display, and a dependable 5000 mAh battery, it easily meets the needs of most everyday users. As long as you verify network compatibility with your specific carrier beforehand, the iQOO Z9 is a highly recommended budget smartphone that refuses to compromise on the essentials.",
  "faqs": [
    { "question": "Does the iQOO Z9 work in the USA?", "answer": "The iQOO Z9 is not officially sold in the USA. You can import it, but you should check your carrier's LTE and 5G band support." },
    { "question": "What is the processor on the iQOO Z9?", "answer": "It is powered by the highly efficient MediaTek Dimensity 7200 chipset." },
    { "question": "What kind of display does the iQOO Z9 have?", "answer": "It features a vibrant 6.67-inch AMOLED display with a high refresh rate." },
    { "question": "What is the battery size of the iQOO Z9?", "answer": "The device comes with a large 5000 mAh battery, perfect for all-day usage." },
    { "question": "Does the iQOO Z9 support fast charging?", "answer": "Yes, it supports 44W wired fast charging, allowing for quick battery top-ups." }
  ],
  "meta_title": "iQOO Z9 Price in USA, Specs, Review & Launch Details",
  "meta_description": "Check the iQOO Z9 price in the USA, full specs, and review. Experience the Dimensity 7200, a vibrant AMOLED screen, and a large 5000 mAh battery.",
  "pros": [
    "Great value for budget consumers",
    "Power-efficient Dimensity 7200 chipset",
    "Beautiful AMOLED display",
    "Solid 5000 mAh battery life"
  ],
  "cons": [
    "Not officially available in the USA",
    "Lacks an ultrawide camera lens"
  ],
  "display": "6.67-inch AMOLED, 120Hz, 1800 nits (peak)",
  "processor": "MediaTek Dimensity 7200 (4 nm)",
  "ram": "8GB",
  "storage": "128GB / 256GB UFS 2.2",
  "camera_main": "50 MP Wide, 2 MP Depth",
  "camera_front": "16 MP",
  "battery": "5000 mAh",
  "charging": "44W wired fast charging",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO Z9 price in USA",
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
