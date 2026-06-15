import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak";

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO 11",
  "slug": "iqoo-11",
  "price_usd": 650,
  "is_official": true,
  "release_date": "December 2022",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $650",
  "price_status": "official",
  "colors": ["Black", "Green", "White (BMW M branding)"],
  "seo_overview": "The iQOO 11 is a formidable smartphone tailored for extreme gaming and top-notch performance. Under its sleek exterior lies the ultra-fast Snapdragon 8 Gen 2 processor, which makes multitasking and high-fidelity gaming effortless. The visual experience is equally stunning, featuring a beautiful 6.78-inch LTPO4 AMOLED display with a 144Hz refresh rate, ensuring silky smooth animations and rapid touch response. For USA buyers, the iQOO 11 must be imported, yet it provides specifications that rival locally available premium phones at a competitive price. Its versatile camera system includes a reliable 50MP main sensor, alongside a 13MP telephoto and an 8MP ultrawide lens, giving you plenty of options for varied photography scenarios. It is equipped with a massive 5000 mAh battery that easily lasts all day, while the astonishing 120W wired fast charging means you spend less time tethered to a wall and more time on the go. Its striking aesthetics and premium build materials make it a compelling choice for tech enthusiasts.",
  "verdict": "The iQOO 11 is a brilliant offering for USA-based enthusiasts willing to navigate the import process. Combining the sheer power of the Snapdragon 8 Gen 2 with a 144Hz display, it is a mobile gamer’s dream. The 120W fast charging and large battery provide immense convenience. While carrier band compatibility needs checking before purchasing, the iQOO 11 delivers incredible flagship-level features without a massive price premium, making it a stellar investment.",
  "faqs": [
    { "question": "Does the iQOO 11 work on USA carriers?", "answer": "The iQOO 11 is an imported device, so it may lack support for certain 5G or LTE bands used in the USA. Checking compatibility with your carrier is highly recommended." },
    { "question": "What processor does the iQOO 11 use?", "answer": "It is equipped with the powerful Qualcomm Snapdragon 8 Gen 2 chipset." },
    { "question": "What is the charging speed of the iQOO 11?", "answer": "The phone supports ultra-fast 120W wired charging, which can quickly top up the 5000 mAh battery." },
    { "question": "Is the iQOO 11 good for gaming?", "answer": "Yes, its combination of a Snapdragon 8 Gen 2 processor and a 144Hz LTPO4 AMOLED display makes it fantastic for gaming." },
    { "question": "Does the iQOO 11 have a telephoto camera?", "answer": "Yes, it includes a 13MP telephoto lens capable of 2x optical zoom for crisp portraits." }
  ],
  "meta_title": "iQOO 11 Price in USA, Specs, Review & Launch Details",
  "meta_description": "Discover the iQOO 11 price in the USA, specs, and review. Unleash powerful gaming with the Snapdragon 8 Gen 2, 144Hz AMOLED display, and 120W charging.",
  "pros": [
    "High-end Snapdragon 8 Gen 2 performance",
    "Stunning 144Hz LTPO4 AMOLED screen",
    "Massive 5000 mAh battery with 120W charging",
    "Great build quality"
  ],
  "cons": [
    "Not officially released in the USA market",
    "No wireless charging support"
  ],
  "display": "6.78-inch LTPO4 AMOLED, 144Hz, HDR10+",
  "processor": "Qualcomm Snapdragon 8 Gen 2 (4 nm)",
  "ram": "8GB / 12GB / 16GB",
  "storage": "128GB UFS 3.1 / 256GB / 512GB UFS 4.0",
  "camera_main": "50 MP Wide, 13 MP Telephoto, 8 MP Ultrawide",
  "camera_front": "16 MP",
  "battery": "5000 mAh",
  "charging": "120W wired fast charging",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO 11 price in USA",
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
