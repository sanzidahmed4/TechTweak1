import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO 11 Pro",
  "slug": "iqoo-11-pro",
  "price_usd": 715,
  "is_official": true,
  "release_date": "December 2022",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $715",
  "price_status": "official",
  "colors": ["Black", "Green", "White (BMW M branding)"],
  "seo_overview": "The iQOO 11 Pro is a premium powerhouse designed to redefine mobile gaming and everyday performance. Featuring the highly capable Snapdragon 8 Gen 2 processor, this device handles heavy applications, multitasking, and demanding games with absolute ease. Its massive 6.78-inch LTPO4 AMOLED display boasts a 144Hz refresh rate, delivering incredibly smooth scrolling and vivid colors that make media consumption a joy. For users in the USA, getting hands on the iQOO 11 Pro requires importing, but the effort is rewarded with cutting-edge technology. Photography is elevated by a sophisticated triple camera setup, including a 50MP primary lens with OIS, a 13MP telephoto lens for detailed portraits, and a 50MP ultrawide sensor. One of the most groundbreaking features of this phone is its astonishing 200W wired fast charging, which replenishes its 4700 mAh battery in just minutes. Alongside 50W wireless charging, you get remarkable flexibility. With premium build materials like vegan leather or glass and a refined design, the iQOO 11 Pro stands as an exceptional flagship.",
  "verdict": "The iQOO 11 Pro is an ultra-premium device tailored for enthusiasts who want uncompromising speed and state-of-the-art charging technology. The combination of the Snapdragon 8 Gen 2 chipset and mind-blowing 200W wired charging sets it apart from traditional smartphones. USA buyers must consider import constraints and verify carrier band support. If you seek raw power, a stunning 144Hz display, and practically zero battery anxiety, the iQOO 11 Pro is an outstanding choice that rivals the best devices on the market.",
  "faqs": [
    { "question": "Does the iQOO 11 Pro support 200W charging?", "answer": "Yes, it supports incredibly fast 200W wired charging, allowing the battery to go from zero to full in just a matter of minutes." },
    { "question": "What is the processor inside the iQOO 11 Pro?", "answer": "It is powered by the top-tier Qualcomm Snapdragon 8 Gen 2 chipset." },
    { "question": "Can I buy the iQOO 11 Pro in the USA?", "answer": "The iQOO 11 Pro is not officially released in the USA, so buyers will need to use import channels and check carrier band compatibility." },
    { "question": "Does the iQOO 11 Pro have a good display?", "answer": "It features a stunning 6.78-inch LTPO4 AMOLED display with a blazing fast 144Hz refresh rate, making it perfect for gaming." },
    { "question": "Is there wireless charging on the iQOO 11 Pro?", "answer": "Yes, it supports 50W wireless charging, providing a convenient and fast wireless power solution." }
  ],
  "meta_title": "iQOO 11 Pro Price in USA, Specs, Review & Launch Details",
  "meta_description": "Check the iQOO 11 Pro price in the USA, detailed specs, and review. Enjoy the Snapdragon 8 Gen 2, 144Hz display, and groundbreaking 200W fast charging.",
  "pros": [
    "Groundbreaking 200W wired charging",
    "Excellent Snapdragon 8 Gen 2 performance",
    "Stunning 144Hz LTPO4 AMOLED display",
    "Supports 50W wireless charging"
  ],
  "cons": [
    "Not officially available in the USA",
    "Average 13MP telephoto camera resolution"
  ],
  "display": "6.78-inch LTPO4 AMOLED, 144Hz, HDR10+",
  "processor": "Qualcomm Snapdragon 8 Gen 2 (4 nm)",
  "ram": "8GB / 12GB / 16GB",
  "storage": "256GB / 512GB UFS 4.0",
  "camera_main": "50 MP Wide, 13 MP Telephoto, 50 MP Ultrawide",
  "camera_front": "16 MP",
  "battery": "4700 mAh",
  "charging": "200W wired, 50W wireless",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO 11 Pro price in USA",
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
