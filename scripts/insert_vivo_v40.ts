import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = 'mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak';

const data = {
  "name": "Vivo V40",
  "slug": "vivo-v40",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 450,
  "price_display_text": "$450",
  "display_type": "AMOLED, 120Hz, 4500 nits peak, HDR10+",
  "screen_size": "6.78 inches",
  "resolution": "1260 x 2800 pixels",
  "cpu": "Qualcomm Snapdragon 7 Gen 3",
  "ram_variants": "8GB, 12GB",
  "storage_variants": "128GB, 256GB, 512GB",
  "cam_main_sensor": "50 MP (OIS, Zeiss)",
  "cam_ultrawide": "50 MP (Zeiss)",
  "cam_front_resolution": "50 MP",
  "battery_capacity": "5500 mAh",
  "charging_wired": "80W wired",
  "images": [],
  "seo_overview": "The Vivo V40 emerges as a highly capable and stylish smartphone tailored for photography lovers and everyday users in the USA. Featuring a stunning 6.78-inch AMOLED screen with an incredible 4500 nits of peak brightness and a 120Hz refresh rate, it ensures a visually spectacular experience indoors and out. At its core, the Qualcomm Snapdragon 7 Gen 3 processor handles applications smoothly, offering excellent power efficiency and lag-free multitasking. The camera system is a standout, boasting dual 50 MP rear cameras engineered with Zeiss optics. The main lens features OIS for incredibly sharp photos, while the ultra-wide lens expertly captures sprawling landscapes. Additionally, a massive 50 MP selfie camera ensures unmatched clarity for front-facing photos. A robust 5500 mAh battery keeps the device powered through intense usage, perfectly complemented by blazing-fast 80W wired charging. With top-tier IP68 and IP69 water and dust resistance, the Vivo V40 pairs delicate elegance with rugged durability, resulting in a premium and reliable mid-range device.",
  "verdict": "For USA buyers seeking premium features at a competitive price, the Vivo V40 is an excellent choice. The gorgeous 4500-nit AMOLED display and powerful Snapdragon 7 Gen 3 processor provide a seamless and visually impressive user experience. The standout Zeiss-engineered dual 50 MP cameras capture remarkably clear photos and ultra-wide shots. Furthermore, the combination of a 5500 mAh battery and 80W fast charging guarantees impressive all-day usage. Offering a refined design alongside rugged IP69 water resistance, this device is highly recommended for users prioritizing photography and durability in a mid-range package.",
  "faqs": [
    {
      "question": "Is the Vivo V40 completely water-resistant?",
      "answer": "Yes, it boasts rigorous IP68 and IP69 ratings, making it highly resistant to dust and both deep water submersion and high-pressure water jets."
    },
    {
      "question": "Does the Vivo V40 feature Zeiss cameras?",
      "answer": "Yes, both the main and ultra-wide 50 MP cameras are co-engineered with Zeiss for professional-grade photography."
    },
    {
      "question": "What processor powers the Vivo V40?",
      "answer": "The device runs on the efficient and powerful Qualcomm Snapdragon 7 Gen 3 chipset."
    },
    {
      "question": "Can I expand the storage of the Vivo V40?",
      "answer": "No, the Vivo V40 does not feature a microSD card slot, so you must select between the 128GB, 256GB, or 512GB internal storage options."
    },
    {
      "question": "How fast does the Vivo V40 charge?",
      "answer": "It supports ultra-fast 80W wired charging, minimizing your downtime drastically."
    }
  ],
  "meta_title": "Vivo V40 Price in USA, Specs & Review",
  "meta_description": "Discover the Vivo V40 featuring a 6.78-inch AMOLED display, Snapdragon 7 Gen 3 processor, and Zeiss 50MP cameras. Check USA pricing and full specs.",
  "pros": [
    "Bright 4500-nit AMOLED screen",
    "Zeiss-engineered 50MP cameras",
    "Outstanding IP69 water resistance",
    "Huge 5500 mAh battery"
  ],
  "cons": [
    "Lacks wireless charging",
    "No expandable storage support"
  ]
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    const brandName = 'vivo';
    const brand = await Brand.findOne({ slug: brandName });
    if (!brand) {
      console.log('Brand not found:', brandName);
      process.exit(1);
    }
    
    data.brand_id = brand._id;
    data.updated_at = new Date();

    const existing = await Phone.findOne({ slug: data.slug });
    if (existing) {
      await Phone.updateOne({ slug: data.slug }, data);
      console.log('Updated existing phone:', data.slug);
    } else {
      data.created_at = new Date();
      await Phone.create(data);
      console.log('Inserted new phone:', data.slug);
    }

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

run();
