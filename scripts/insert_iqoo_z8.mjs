import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak";

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO Z8",
  "slug": "iqoo-z8",
  "price_usd": 235,
  "is_official": true,
  "release_date": "August 2023",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $235",
  "price_status": "official",
  "colors": ["Black", "Blue", "White"],
  "seo_overview": "The iQOO Z8 is an incredibly compelling smartphone for budget-conscious buyers seeking uncompromising performance and rapid charging capabilities. Outfitted with the highly capable MediaTek Dimensity 8200 processor, this device effortlessly powers through daily tasks, multimedia consumption, and moderate gaming without missing a beat. It features a bright and fluid 6.64-inch IPS LCD panel with a fast 120Hz refresh rate, guaranteeing smooth scrolling and immersive viewing experiences. For USA consumers, acquiring the iQOO Z8 requires importing the device, but the phenomenal value it offers makes it well worth the consideration. Photography is managed by a solid 64MP primary camera supported by Optical Image Stabilization (OIS), resulting in surprisingly sharp and steady shots for a phone in this price tier. Perhaps its most outstanding feature is the generous 5000 mAh battery combined with blazing-fast 120W wired charging, which can replenish your battery in a matter of minutes. Complete with a 3.5mm headphone jack and striking color options, the iQOO Z8 is a fantastic all-around performer.",
  "verdict": "The iQOO Z8 provides an astonishing amount of tech for approximately $235. The combination of the Dimensity 8200 chipset, 120Hz display, and ultra-fast 120W charging makes it an absolute powerhouse in the budget segment. While USA buyers must consider import wait times and network compatibility, the raw performance and battery convenience you receive in return make it a highly recommended choice for everyday users.",
  "faqs": [
    { "question": "Can I use the iQOO Z8 in the USA?", "answer": "The iQOO Z8 is primarily sold in China, meaning USA buyers must import it. Always verify your specific carrier's network band compatibility first." },
    { "question": "What is the processor powering the iQOO Z8?", "answer": "The device features the powerful MediaTek Dimensity 8200 chipset." },
    { "question": "Does the iQOO Z8 support fast charging?", "answer": "Yes, it supports an incredibly fast 120W wired charging system to quickly top up the 5000 mAh battery." },
    { "question": "Is there a headphone jack on the iQOO Z8?", "answer": "Yes, unlike many modern smartphones, the iQOO Z8 includes a 3.5mm headphone jack." },
    { "question": "Does the iQOO Z8 have an AMOLED display?", "answer": "No, it utilizes a high-quality 120Hz IPS LCD panel instead of an AMOLED screen." }
  ],
  "meta_title": "iQOO Z8 Price in USA, Specs, Review & Launch Details",
  "meta_description": "Find the iQOO Z8 price in the USA, detailed specs, and review. Experience the Dimensity 8200, a 120Hz display, and blazing fast 120W charging.",
  "pros": [
    "Amazing value for budget buyers",
    "Blazing fast 120W wired charging",
    "Solid performance from the Dimensity 8200",
    "Retains the 3.5mm headphone jack"
  ],
  "cons": [
    "Not officially available in the USA",
    "Uses an IPS LCD instead of AMOLED"
  ],
  "display": "6.64-inch IPS LCD, 120Hz, HDR10",
  "processor": "MediaTek Dimensity 8200 (4 nm)",
  "ram": "8GB / 12GB",
  "storage": "256GB / 512GB UFS 3.1",
  "camera_main": "64 MP Wide, 2 MP Depth",
  "camera_front": "16 MP",
  "battery": "5000 mAh",
  "charging": "120W wired fast charging",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO Z8 price in USA",
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
