import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak";

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO 12",
  "slug": "iqoo-12",
  "price_usd": 635,
  "is_official": true,
  "release_date": "November 2023",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $635",
  "price_status": "official",
  "colors": ["Black", "Red", "White (Legend)"],
  "seo_overview": "The iQOO 12 stands out as a high-performance, gaming-focused smartphone that brings top-tier specifications to a highly competitive price point. Powered by the incredibly fast Qualcomm Snapdragon 8 Gen 3 chipset, it handles graphically intense games and heavy multitasking workloads effortlessly. The device sports a vibrant 6.78-inch AMOLED display with a remarkably smooth 144Hz refresh rate, ensuring that animations and fast-paced gameplay remain perfectly fluid. For consumers in the USA looking for a device that punches above its weight class, the iQOO 12 is an enticing import option. It is equipped with a highly capable triple camera system that includes a 50MP main sensor, a 64MP periscope telephoto lens with 3x optical zoom, and a 50MP ultrawide camera, making it exceptionally versatile for photography. A generous 5000 mAh battery ensures the phone easily lasts through a full day of heavy usage, supported by ultra-fast 120W wired charging that minimizes downtime. Its dedicated gaming chip, robust vapor chamber cooling, and striking design make it an excellent choice for users who demand power without paying an absolute premium.",
  "verdict": "The iQOO 12 is an exceptional device for USA buyers willing to go the import route, offering flagship-level performance via the Snapdragon 8 Gen 3 chipset at a much lower cost. Its blazing-fast 144Hz AMOLED screen and phenomenal camera array—including a periscope zoom lens—are typically reserved for much more expensive devices. While network band compatibility is a crucial factor to check beforehand, the iQOO 12 is highly recommended for power users and mobile gamers seeking maximum value and uncompromised speed.",
  "faqs": [
    { "question": "Does the iQOO 12 work on USA cellular networks?", "answer": "The iQOO 12 is not officially sold in the USA. Buyers must check network band compatibility with their specific carrier, as imported models may lack certain 5G or LTE frequencies." },
    { "question": "What is the processor inside the iQOO 12?", "answer": "It is powered by the flagship Qualcomm Snapdragon 8 Gen 3 processor, providing phenomenal gaming and daily performance." },
    { "question": "Does the iQOO 12 feature wireless charging?", "answer": "No, the standard iQOO 12 does not support wireless charging, but it makes up for it with incredibly fast 120W wired charging." },
    { "question": "Does the iQOO 12 have a good camera system?", "answer": "Yes, it features a versatile triple-camera setup including a 50MP main sensor and a 64MP periscope telephoto lens capable of 3x optical zoom." },
    { "question": "Is the iQOO 12 display good for gaming?", "answer": "Absolutely. It sports a 6.78-inch AMOLED screen with a rapid 144Hz refresh rate, offering a buttery smooth visual experience." }
  ],
  "meta_title": "iQOO 12 Price in USA, Specs, Review & Launch Details",
  "meta_description": "Find the iQOO 12 price in the USA, detailed specs, and review. Unleash flagship performance with the Snapdragon 8 Gen 3, 144Hz AMOLED, and 120W charging.",
  "pros": [
    "Top-tier Snapdragon 8 Gen 3 performance",
    "Beautiful 144Hz AMOLED display",
    "Impressive 64MP periscope zoom camera",
    "Blazing fast 120W wired charging"
  ],
  "cons": [
    "Lacks wireless charging support",
    "Not officially released for the USA market"
  ],
  "display": "6.78-inch AMOLED, 144Hz, HDR10+",
  "processor": "Qualcomm Snapdragon 8 Gen 3 (4 nm)",
  "ram": "12GB / 16GB",
  "storage": "256GB / 512GB / 1TB UFS 4.0",
  "camera_main": "50 MP Wide, 64 MP Periscope Telephoto, 50 MP Ultrawide",
  "camera_front": "16 MP",
  "battery": "5000 mAh",
  "charging": "120W wired fast charging",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO 12 price in USA",
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
