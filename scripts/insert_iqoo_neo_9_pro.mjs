import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak";

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO Neo 9 Pro",
  "slug": "iqoo-neo-9-pro",
  "price_usd": 420,
  "is_official": true,
  "release_date": "December 2023",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $420",
  "price_status": "official",
  "colors": ["Fiery Red", "Conqueror Black", "Nautical Blue"],
  "seo_overview": "The iQOO Neo 9 Pro stands out as an incredibly powerful yet affordable smartphone option for discerning buyers. Equipped with the top-tier MediaTek Dimensity 9300 chipset (or Snapdragon 8 Gen 2 in some regions), it absolutely crushes demanding applications and intensive gaming sessions with ease. Its 6.78-inch 144Hz AMOLED display provides an incredibly smooth and responsive visual experience, whether you are scrolling through social media or engaging in fast-paced competitive gaming. For the USA market, acquiring the iQOO Neo 9 Pro requires utilizing import channels, but the value it provides is hard to beat locally. The phone features a capable camera system headed by a 50MP primary sensor with OIS, ensuring your photos remain sharp and vibrant. Powering all these features is a robust 5160 mAh battery that easily provides all-day endurance. Even better, it supports lightning-fast 120W wired charging, which can replenish the battery in a matter of minutes. With its eye-catching design options and premium performance, the iQOO Neo 9 Pro is a true flagship killer.",
  "verdict": "The iQOO Neo 9 Pro is a phenomenal device for USA buyers willing to go through the import process. Offering flagship-level performance from its Dimensity 9300 or Snapdragon processor, it punches far above its price bracket. The 144Hz AMOLED display and rapid 120W charging make it a dream for heavy users and gamers alike. As long as you verify network compatibility with your local carrier, the iQOO Neo 9 Pro provides unparalleled value and speed for your hard-earned money.",
  "faqs": [
    { "question": "Does the iQOO Neo 9 Pro work on USA networks?", "answer": "As an imported device, the iQOO Neo 9 Pro may lack support for certain 5G or LTE bands used in the USA. Checking compatibility with your carrier is highly recommended." },
    { "question": "What is the battery size of the iQOO Neo 9 Pro?", "answer": "It comes with a large 5160 mAh battery, which provides excellent endurance for heavy usage." },
    { "question": "Does the iQOO Neo 9 Pro support fast charging?", "answer": "Yes, it supports an impressive 120W wired fast charging technology." },
    { "question": "Is the iQOO Neo 9 Pro good for gaming?", "answer": "Absolutely. Thanks to its powerful processor and 144Hz AMOLED display, it offers a fantastic mobile gaming experience." },
    { "question": "Does the iQOO Neo 9 Pro have an ultrawide camera?", "answer": "Yes, it features an ultrawide camera alongside its high-quality 50MP main sensor." }
  ],
  "meta_title": "iQOO Neo 9 Pro Price in USA, Specs, Review & Launch Details",
  "meta_description": "Discover the iQOO Neo 9 Pro price in the USA, specs, and review. Experience flagship performance, a 144Hz AMOLED display, and blazing 120W fast charging.",
  "pros": [
    "Incredible flagship-level performance",
    "Stunning 144Hz AMOLED display",
    "Large 5160 mAh battery with 120W fast charging",
    "Outstanding value for the price"
  ],
  "cons": [
    "Not officially available in the USA market",
    "No wireless charging support"
  ],
  "display": "6.78-inch AMOLED, 144Hz, HDR10+",
  "processor": "MediaTek Dimensity 9300 (4 nm) / Snapdragon 8 Gen 2",
  "ram": "8GB / 12GB / 16GB",
  "storage": "256GB / 512GB / 1TB UFS 4.0",
  "camera_main": "50 MP Wide, 50 MP Ultrawide (China) or 8 MP Ultrawide (Global)",
  "camera_front": "16 MP",
  "battery": "5160 mAh",
  "charging": "120W wired fast charging",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO Neo 9 Pro price in USA",
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
