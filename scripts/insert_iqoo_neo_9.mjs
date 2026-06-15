import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak";

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO Neo 9",
  "slug": "iqoo-neo-9",
  "price_usd": 320,
  "is_official": true,
  "release_date": "December 2023",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $320",
  "price_status": "official",
  "colors": ["Black", "Blue", "Red/White (Dual-tone)"],
  "seo_overview": "The iQOO Neo 9 is an exceptional value-focused smartphone that delivers flagship-grade power for a fraction of the expected price. Under the hood lies the highly acclaimed Snapdragon 8 Gen 2 processor, an architecture proven to handle intensive mobile gaming, robust multitasking, and heavy applications with absolute efficiency. The front of the phone boasts a beautiful 6.78-inch LTPO AMOLED display capable of a 144Hz refresh rate, ensuring that every animation and scroll is buttery smooth. For users in the USA, purchasing the iQOO Neo 9 involves importing the device, but the resulting savings make it highly compelling. It features a streamlined dual-camera setup starring a high-quality 50MP primary sensor equipped with Optical Image Stabilization (OIS), resulting in crisp photos and steady 8K video recording. With a generous 5160 mAh battery capacity, you can game and browse for hours, and the incredible 120W wired charging capability ensures you are never tethered to an outlet for long. Blending performance, display quality, and outstanding battery tech, the iQOO Neo 9 is a formidable mid-range champion.",
  "verdict": "If you are a USA buyer looking to maximize performance per dollar, the iQOO Neo 9 is incredibly difficult to beat. The Snapdragon 8 Gen 2 chipset and 144Hz AMOLED screen provide an elite, fluid experience typically reserved for much pricier phones. While it omits a telephoto lens and requires importing, its exceptional 120W charging and massive battery make it an absolute steal for gamers and heavy users who don't want to compromise on speed.",
  "faqs": [
    { "question": "Can I use the iQOO Neo 9 in the USA?", "answer": "The iQOO Neo 9 is primarily sold in China, meaning USA buyers must import it. Always check your carrier's LTE and 5G bands to ensure network compatibility." },
    { "question": "What processor powers the iQOO Neo 9?", "answer": "It is powered by the top-tier Qualcomm Snapdragon 8 Gen 2 chipset." },
    { "question": "Does the iQOO Neo 9 have wireless charging?", "answer": "No, it does not support wireless charging, but it features blazing fast 120W wired charging." },
    { "question": "Is the iQOO Neo 9 display good for gaming?", "answer": "Yes, its 6.78-inch LTPO AMOLED screen with a 144Hz refresh rate is perfectly suited for a premium gaming experience." },
    { "question": "Does the iQOO Neo 9 record 8K video?", "answer": "Yes, its main 50MP camera supports 8K video recording." }
  ],
  "meta_title": "iQOO Neo 9 Price in USA, Specs, Review & Launch Details",
  "meta_description": "Check out the iQOO Neo 9 price in the USA, full specs, and review. Unbeatable value with a Snapdragon 8 Gen 2, 144Hz display, and 120W fast charging.",
  "pros": [
    "Amazing value for a Snapdragon 8 Gen 2 device",
    "Super smooth 144Hz LTPO AMOLED display",
    "Massive 5160 mAh battery",
    "Incredibly fast 120W charging"
  ],
  "cons": [
    "Not officially sold in the USA",
    "Lacks a dedicated telephoto camera"
  ],
  "display": "6.78-inch LTPO AMOLED, 144Hz, HDR10+",
  "processor": "Qualcomm Snapdragon 8 Gen 2 (4 nm)",
  "ram": "12GB / 16GB",
  "storage": "256GB / 512GB / 1TB UFS 4.0",
  "camera_main": "50 MP Wide, 8 MP Ultrawide",
  "camera_front": "16 MP",
  "battery": "5160 mAh",
  "charging": "120W wired fast charging",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO Neo 9 price in USA",
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
