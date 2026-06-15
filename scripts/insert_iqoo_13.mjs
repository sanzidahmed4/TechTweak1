import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak";

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

const data = {
  "name": "iQOO 13",
  "slug": "iqoo-13",
  "price_usd": 650,
  "is_official": true,
  "release_date": "November 2024",
  "phone_status": "released",
  "is_published": true,
  "price_display_text": "From $650",
  "price_status": "official",
  "colors": ["Legend (White)", "Track (Black)", "Nardo Grey", "Isle of Man (Green)"],
  "seo_overview": "The iQOO 13 is a high-performance flagship smartphone designed to deliver top-tier speed and cutting-edge features. Powered by the ultra-powerful Qualcomm Snapdragon 8 Elite chipset, it provides an exceptional experience for mobile gaming, multitasking, and heavy applications. The device features a gorgeous 6.82-inch LTPO AMOLED display with a remarkably smooth 144Hz refresh rate, ensuring fluid visuals whether you are browsing or engaging in competitive gaming. For the USA market, although it is typically available via import channels, the iQOO 13 remains a compelling option for enthusiasts seeking bleeding-edge hardware. Photography is handled by a versatile triple 50MP camera setup on the rear, including a sharp primary lens with OIS, a telephoto lens for detailed zoom shots, and an ultrawide sensor. The massive 6150 mAh battery guarantees long-lasting usage, and it supports incredibly fast charging to minimize downtime. With an IP68/IP69 rating for supreme dust and water resistance, the phone is built to withstand challenging environments. The sleek design, enhanced by a unique RGB LED light on the back, gives it a distinct aesthetic appeal.",
  "verdict": "The iQOO 13 is a phenomenal powerhouse for USA buyers willing to explore imported devices. Its Snapdragon 8 Elite processor and 144Hz AMOLED screen make it an absolute dream for gamers and power users. While network compatibility should be double-checked before purchasing in the United States, the robust 6150 mAh battery, incredibly fast charging, and premium camera capabilities make it a strong contender against mainstream flagships. If you prioritize raw performance and long battery life over traditional carrier support, the iQOO 13 is highly recommended.",
  "faqs": [
    { "question": "Does the iQOO 13 work on USA networks?", "answer": "The iQOO 13 is not officially released in the USA. Imported models may lack support for certain 5G or LTE bands, so you should check compatibility with your specific carrier before purchasing." },
    { "question": "What processor does the iQOO 13 use?", "answer": "It is powered by the top-tier Qualcomm Snapdragon 8 Elite chipset built on a 3nm process, delivering exceptional performance." },
    { "question": "Is the iQOO 13 waterproof?", "answer": "Yes, it features an IP68 and IP69 rating, providing excellent protection against dust and high-pressure water." },
    { "question": "What is the battery capacity of the iQOO 13?", "answer": "The device comes with a massive 6150 mAh battery, ensuring extended usage times even under heavy workloads." },
    { "question": "Does the iQOO 13 have a telephoto camera?", "answer": "Yes, it includes a 50MP telephoto lens with 2x optical zoom and Optical Image Stabilization (OIS)." }
  ],
  "meta_title": "iQOO 13 Price in USA, Specs, Review & Launch Details",
  "meta_description": "Discover the iQOO 13 price in the USA, full specs, and review. Experience the Snapdragon 8 Elite, 144Hz display, and massive 6150 mAh battery today.",
  "pros": [
    "Incredible performance with Snapdragon 8 Elite",
    "Stunning 144Hz LTPO AMOLED display",
    "Massive 6150 mAh battery with fast charging",
    "High-quality triple 50MP camera system"
  ],
  "cons": [
    "Not officially available in the USA market",
    "Lacks a microSD card slot for expandable storage"
  ],
  "display": "6.82-inch LTPO AMOLED, 144Hz, HDR10+",
  "processor": "Qualcomm Snapdragon 8 Elite (3 nm)",
  "ram": "12GB / 16GB",
  "storage": "256GB / 512GB / 1TB UFS 4.0",
  "camera_main": "50 MP Wide, 50 MP Telephoto, 50 MP Ultrawide",
  "camera_front": "32 MP",
  "battery": "6150 mAh",
  "charging": "120W wired fast charging",
  "network": "5G, 4G LTE",
  "primary_keyword": "iQOO 13 price in USA",
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
