import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak";

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO Z9s Pro",
  "slug": "iqoo-z9s-pro",
  "price_usd": 300,
  "is_official": true,
  "release_date": "August 2024",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $300",
  "price_status": "official",
  "colors": ["Luxe Marble", "Flamboyant Orange (Vegan Leather)"],
  "seo_overview": "The iQOO Z9s Pro emerges as a stylish and capable mid-range contender, delivering an impressive array of features designed for everyday efficiency and multimedia enjoyment. At its core is the Qualcomm Snapdragon 7 Gen 3 processor, providing a perfect balance of snappy performance and power efficiency that smoothly handles daily tasks and moderate gaming. The device showcases a brilliant 6.77-inch AMOLED display with a 120Hz refresh rate and a staggering peak local brightness of 4500 nits, ensuring exceptional visibility even under harsh sunlight. While USA buyers will have to import this model, its value proposition is excellent. The camera setup is highlighted by a highly capable 50MP main sensor equipped with OIS (Sony IMX882), which excels at capturing clear, vibrant photos and stable video. To keep you connected longer, it houses a robust 5500 mAh battery that reliably powers through the day, complemented by speedy 80W fast charging. Additionally, features like an IP64 dust and water resistance rating, along with premium vegan leather design options, give the iQOO Z9s Pro a genuinely premium feel.",
  "verdict": "The iQOO Z9s Pro is a superb mid-range smartphone that offers premium design aesthetics, a remarkably bright 120Hz AMOLED display, and a highly efficient Snapdragon 7 Gen 3 processor. USA consumers should be mindful of importing and checking network band compatibility. However, if you are seeking excellent battery life, solid 50MP primary photography, and smooth performance for around $300, this phone offers fantastic value without breaking the bank.",
  "faqs": [
    { "question": "Can I use the iQOO Z9s Pro in the USA?", "answer": "The phone is mainly sold in India, meaning you will need to import it to the USA. It is vital to check if your carrier's 5G and LTE bands are supported." },
    { "question": "What is the processor on the iQOO Z9s Pro?", "answer": "It runs on the Qualcomm Snapdragon 7 Gen 3 chipset, which provides an excellent balance of power and efficiency." },
    { "question": "Does the iQOO Z9s Pro have a good battery?", "answer": "Yes, it boasts a large 5500 mAh battery with 80W wired fast charging capabilities." },
    { "question": "Is the iQOO Z9s Pro water-resistant?", "answer": "It comes with an IP64 rating, meaning it is protected against dust and water splashes." },
    { "question": "Does the iQOO Z9s Pro have a headphone jack?", "answer": "No, it does not include a 3.5mm headphone jack; you will need to use USB-C or wireless headphones." }
  ],
  "meta_title": "iQOO Z9s Pro Price in USA, Specs, Review & Launch Details",
  "meta_description": "Discover the iQOO Z9s Pro price in the USA, detailed specs, and review. Enjoy the Snapdragon 7 Gen 3, a super-bright AMOLED screen, and a 5500 mAh battery.",
  "pros": [
    "Efficient Snapdragon 7 Gen 3 performance",
    "Incredibly bright 120Hz AMOLED display",
    "Large 5500 mAh battery with 80W charging",
    "Premium design with vegan leather option"
  ],
  "cons": [
    "Not officially available in the USA",
    "No 3.5mm headphone jack"
  ],
  "display": "6.77-inch AMOLED, 120Hz, HDR10+, 4500 nits (peak)",
  "processor": "Qualcomm Snapdragon 7 Gen 3 (4 nm)",
  "ram": "8GB / 12GB",
  "storage": "128GB / 256GB UFS 2.2",
  "camera_main": "50 MP Wide, 8 MP Ultrawide",
  "camera_front": "16 MP",
  "battery": "5500 mAh",
  "charging": "80W wired fast charging",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO Z9s Pro price in USA",
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
