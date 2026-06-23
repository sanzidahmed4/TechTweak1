import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO Z7",
  "slug": "iqoo-z7",
  "price_usd": 230,
  "is_official": true,
  "release_date": "March 2023",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $230",
  "price_status": "official",
  "colors": ["Norway Blue", "Pacific Night"],
  "seo_overview": "The iQOO Z7 represents excellent value in the budget smartphone space, combining essential everyday features with eye-catching aesthetics. Featuring the reliable MediaTek Dimensity 920 processor, the device is perfectly tuned for efficient multitasking, social media scrolling, and casual gaming without draining your battery. It boasts a brilliant 6.38-inch AMOLED display with a 90Hz refresh rate, ensuring that all visual content, from YouTube videos to mobile games, looks sharp, vibrant, and smooth. Although the iQOO Z7 is primarily an international device requiring importation for USA buyers, its compelling price-to-performance ratio makes it an excellent option. For photography, it relies on a highly capable 64MP primary camera featuring Optical Image Stabilization (OIS), a rare and welcome addition in this price segment that guarantees steady, blur-free shots. The phone is powered by a dependable 4500 mAh battery that easily lasts all day, while the 44W fast charging system ensures you are never away from your screen for long. With an IP54 rating for splash resistance and a standard headphone jack, the iQOO Z7 is a practical and powerful mid-range choice.",
  "verdict": "If you are searching for an affordable smartphone that doesn't compromise on display quality or camera stability, the iQOO Z7 is a phenomenal choice. For roughly $230 via import, you gain a 90Hz AMOLED screen, a 64MP OIS camera, and dependable Dimensity 920 performance. USA buyers should double-check network compatibility, but if the bands align, this device offers incredible everyday utility and value for budget-conscious consumers.",
  "faqs": [
    { "question": "Can I use the iQOO Z7 in the USA?", "answer": "The iQOO Z7 is an international model. USA buyers will need to import the device and check carrier compatibility for 5G and LTE bands." },
    { "question": "What processor is in the iQOO Z7?", "answer": "The global version is powered by the highly efficient MediaTek Dimensity 920 chipset." },
    { "question": "Does the iQOO Z7 have an AMOLED display?", "answer": "Yes, it features a vibrant 6.38-inch AMOLED screen with a 90Hz refresh rate." },
    { "question": "Does the iQOO Z7 camera have OIS?", "answer": "Yes, its 64MP primary camera is equipped with Optical Image Stabilization for steady shots and videos." },
    { "question": "Does the iQOO Z7 have a headphone jack?", "answer": "Yes, the device conveniently retains the 3.5mm headphone jack for wired audio." }
  ],
  "meta_title": "iQOO Z7 Price in USA, Specs, Review & Launch Details",
  "meta_description": "Check the iQOO Z7 price in the USA, full specs, and review. Experience a 90Hz AMOLED display, a 64MP OIS camera, and the Dimensity 920 processor.",
  "pros": [
    "Vibrant 90Hz AMOLED display",
    "64MP primary camera with OIS",
    "Retains the 3.5mm headphone jack",
    "Excellent value for budget buyers"
  ],
  "cons": [
    "Not officially available in the USA",
    "Smaller 4500 mAh battery capacity"
  ],
  "display": "6.38-inch AMOLED, 90Hz, HDR10+, 1300 nits (peak)",
  "processor": "MediaTek Dimensity 920 (6 nm)",
  "ram": "6GB / 8GB",
  "storage": "128GB",
  "camera_main": "64 MP Wide, 2 MP Depth",
  "camera_front": "16 MP",
  "battery": "4500 mAh",
  "charging": "44W wired fast charging",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO Z7 price in USA",
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
