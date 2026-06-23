import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO 12 Pro",
  "slug": "iqoo-12-pro",
  "price_usd": 685,
  "is_official": true,
  "release_date": "November 2023",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $685",
  "price_status": "official",
  "colors": ["Black", "Red", "White (BMW M branding)"],
  "seo_overview": "The iQOO 12 Pro pushes the boundaries of flagship mobile performance, delivering an extraordinary smartphone experience for demanding users. Armed with the formidable Qualcomm Snapdragon 8 Gen 3 processor, this device offers blistering speeds for intensive applications, heavy multitasking, and graphic-intensive gaming. The phone boasts a gorgeous 6.78-inch LTPO AMOLED display with a 144Hz refresh rate, ensuring that every swipe and animation feels incredibly fluid. Although it requires importing for the USA market, the iQOO 12 Pro provides specifications that rival any top-tier device available locally. Photography enthusiasts will appreciate its versatile triple rear camera system, featuring a 50MP primary sensor, a 64MP periscope telephoto lens with 3x optical zoom, and a 50MP ultrawide shooter for capturing stunning landscapes. The massive 5100 mAh battery ensures reliable all-day usage, while the rapid charging capabilities ensure you spend less time tethered to a wall. Its sleek design, premium build quality, and advanced cooling mechanisms make it an outstanding choice for power users who want uncompromising hardware in their pocket.",
  "verdict": "The iQOO 12 Pro is a true flagship killer that offers uncompromising speed, a phenomenal display, and an exceptional camera system. For USA buyers, securing one means exploring import options, but the reward is a smartphone powered by the Snapdragon 8 Gen 3 at a highly competitive price point. Before purchasing, verify carrier compatibility to ensure seamless network connectivity. If you want a device that excels in gaming, photography, and battery life without paying typical flagship premiums, the iQOO 12 Pro is a fantastic investment.",
  "faqs": [
    { "question": "Does the iQOO 12 Pro work on USA networks?", "answer": "The iQOO 12 Pro is not officially released in the USA. Imported models might lack support for certain 5G or LTE bands, so verifying carrier compatibility is highly recommended." },
    { "question": "What processor does the iQOO 12 Pro use?", "answer": "It is powered by the top-tier Qualcomm Snapdragon 8 Gen 3 chipset, delivering incredible processing power and efficiency." },
    { "question": "Is the iQOO 12 Pro good for gaming?", "answer": "Absolutely. With its powerful processor, advanced cooling system, and 144Hz AMOLED display, it offers an exceptional mobile gaming experience." },
    { "question": "What is the battery capacity of the iQOO 12 Pro?", "answer": "The device comes with a large 5100 mAh battery, ensuring extended usage times even under heavy workloads." },
    { "question": "Does the iQOO 12 Pro have a periscope camera?", "answer": "Yes, it includes a 64MP periscope telephoto lens with 3x optical zoom for crisp and detailed long-range shots." }
  ],
  "meta_title": "iQOO 12 Pro Price in USA, Specs, Review & Launch Details",
  "meta_description": "Discover the iQOO 12 Pro price in the USA, full specs, and review. Get the Snapdragon 8 Gen 3, 144Hz AMOLED, and 64MP periscope camera today.",
  "pros": [
    "Incredible performance with Snapdragon 8 Gen 3",
    "Stunning 144Hz LTPO AMOLED display",
    "Excellent 64MP periscope telephoto camera",
    "Large 5100 mAh battery with fast charging"
  ],
  "cons": [
    "Not officially available in the USA market",
    "Funtouch OS might have bloatware out of the box"
  ],
  "display": "6.78-inch LTPO AMOLED, 144Hz, HDR10+",
  "processor": "Qualcomm Snapdragon 8 Gen 3 (4 nm)",
  "ram": "16GB",
  "storage": "256GB / 512GB / 1TB UFS 4.0",
  "camera_main": "50 MP Wide, 64 MP Periscope Telephoto, 50 MP Ultrawide",
  "camera_front": "16 MP",
  "battery": "5100 mAh",
  "charging": "120W wired, 50W wireless",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO 12 Pro price in USA",
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
