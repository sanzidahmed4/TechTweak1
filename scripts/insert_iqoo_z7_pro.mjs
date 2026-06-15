import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak";

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO Z7 Pro",
  "slug": "iqoo-z7-pro",
  "price_usd": 290,
  "is_official": true,
  "release_date": "August 2023",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $290",
  "price_status": "official",
  "colors": ["Blue Lagoon", "Graphite Matte"],
  "seo_overview": "The iQOO Z7 Pro is a beautifully crafted mid-range smartphone that excels in delivering reliable performance wrapped in a premium, ultra-slim design. Powered by the highly efficient MediaTek Dimensity 7200 processor, this device handles daily multitasking, media streaming, and casual gaming with impressive fluidity. Visually, the phone stands out with a stunning 6.78-inch curved AMOLED display boasting a 120Hz refresh rate, which provides a highly immersive and smooth viewing experience rarely seen at this price point. Although USA buyers must import the iQOO Z7 Pro, the combination of sleek aesthetics and solid hardware makes it an attractive proposition. Photography is handled gracefully by a 64MP primary rear camera equipped with Optical Image Stabilization (OIS), ensuring your photos and 4K videos remain crisp and stable even in challenging lighting. It houses a 4600 mAh battery that reliably powers you through the day, complemented by a rapid 66W charging system capable of reaching 50% capacity in roughly 22 minutes. With its striking curved display and capable chipset, the iQOO Z7 Pro is a brilliant everyday smartphone.",
  "verdict": "The iQOO Z7 Pro is an elegant, highly capable device that brings curved AMOLED displays and Dimensity 7200 performance to the mid-range segment. For approximately $290 via import, USA consumers get a smartphone that looks and feels significantly more expensive than it is. While it lacks an ultrawide camera and a headphone jack, its 66W charging, sleek profile, and vibrant display make it an outstanding choice for those prioritizing design and everyday speed.",
  "faqs": [
    { "question": "Can I buy the iQOO Z7 Pro in the USA?", "answer": "The iQOO Z7 Pro is an international device primarily sold in India. USA buyers will need to import it and ensure their carrier supports its network bands." },
    { "question": "What processor does the iQOO Z7 Pro use?", "answer": "It is equipped with the highly power-efficient MediaTek Dimensity 7200 chipset." },
    { "question": "Does the iQOO Z7 Pro have an ultrawide camera?", "answer": "No, its dual-camera setup consists of a 64MP main sensor and a 2MP depth sensor, omitting an ultrawide lens." },
    { "question": "What is the charging speed of the iQOO Z7 Pro?", "answer": "It supports 66W wired fast charging, which is capable of reaching 50% in approximately 22 minutes." },
    { "question": "Does the iQOO Z7 Pro feature a curved display?", "answer": "Yes, it boasts a premium 6.78-inch curved AMOLED display with a 120Hz refresh rate." }
  ],
  "meta_title": "iQOO Z7 Pro Price in USA, Specs, Review & Launch Details",
  "meta_description": "Discover the iQOO Z7 Pro price in the USA, full specs, and review. Experience a premium curved AMOLED display, Dimensity 7200, and 66W fast charging.",
  "pros": [
    "Gorgeous 120Hz curved AMOLED display",
    "Reliable Dimensity 7200 performance",
    "Ultra-slim and premium design",
    "Solid 64MP main camera with OIS"
  ],
  "cons": [
    "Lacks an ultrawide camera",
    "Not officially available in the USA"
  ],
  "display": "6.78-inch AMOLED, 120Hz, HDR10+, 1300 nits (peak)",
  "processor": "MediaTek Dimensity 7200 (4 nm)",
  "ram": "8GB",
  "storage": "128GB / 256GB",
  "camera_main": "64 MP Wide, 2 MP Depth",
  "camera_front": "16 MP",
  "battery": "4600 mAh",
  "charging": "66W wired fast charging",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO Z7 Pro price in USA",
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
