import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = 'mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak';

const data = {
  "name": "Vivo V30e",
  "slug": "vivo-v30e",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 300,
  "price_display_text": "$300",
  "display_type": "AMOLED, 120Hz, 1300 nits peak",
  "screen_size": "6.78 inches",
  "resolution": "1080 x 2400 pixels",
  "cpu": "Qualcomm Snapdragon 6 Gen 1",
  "ram_variants": "8GB, 12GB",
  "storage_variants": "128GB, 256GB",
  "cam_main_sensor": "50 MP",
  "cam_ultrawide": "8 MP",
  "cam_front_resolution": "50 MP",
  "battery_capacity": "5500 mAh",
  "charging_wired": "44W wired",
  "images": [],
  "seo_overview": "The Vivo V30e is a stylish and reliable smartphone crafted to deliver premium features at an accessible price point for USA consumers. Sporting a vibrant 6.78-inch AMOLED display with a fluid 120Hz refresh rate, it ensures that watching videos and scrolling through social media is exceptionally smooth. At the heart of the device lies the Qualcomm Snapdragon 6 Gen 1 processor, providing solid performance for daily tasks and moderate gaming without excessive battery drain. The photography experience is anchored by a high-resolution 50 MP main camera that captures stunning details in various lighting scenarios, accompanied by an 8 MP ultra-wide lens for sweeping landscape shots. Furthermore, the impressive 50 MP front-facing camera with Eye Autofocus guarantees sharp, high-quality selfies every time. One of its most appealing features is the massive 5500 mAh battery, which easily powers the device through long days of heavy use, supported by convenient 44W fast charging. Combining an elegant, slim design with reliable everyday performance and a stellar camera setup, the Vivo V30e stands out as an incredibly balanced mid-range option.",
  "verdict": "For USA buyers on a budget who refuse to compromise on design and battery life, the Vivo V30e is a fantastic choice. The 6.78-inch AMOLED screen provides a vibrant viewing experience, while the Snapdragon 6 Gen 1 chipset handles everyday applications with ease. Its massive 5500 mAh battery ensures you won't have to worry about charging during the day, and the 50 MP front and rear cameras deliver excellent photo quality. Although the 44W charging speed is slightly slower than its premium siblings, the device's overall value, elegant aesthetic, and robust battery make it highly recommended.",
  "faqs": [
    {
      "question": "Can I expand the storage on the Vivo V30e?",
      "answer": "Yes, it features a shared SIM slot that supports microSDXC cards for expandable storage."
    },
    {
      "question": "What is the battery size of the Vivo V30e?",
      "answer": "The Vivo V30e is equipped with a very large 5500 mAh battery for extended usage."
    },
    {
      "question": "Does the Vivo V30e have a good selfie camera?",
      "answer": "Absolutely, it features a high-resolution 50 MP front camera with Eye Autofocus for sharp selfies."
    },
    {
      "question": "What processor does the Vivo V30e use?",
      "answer": "It is powered by the capable and efficient Qualcomm Snapdragon 6 Gen 1 processor."
    },
    {
      "question": "Is the Vivo V30e display smooth?",
      "answer": "Yes, it boasts a 6.78-inch AMOLED display with a fast 120Hz refresh rate for incredibly smooth scrolling."
    }
  ],
  "meta_title": "Vivo V30e Price in USA, Full Specs & Review",
  "meta_description": "Discover the Vivo V30e specs, featuring a 6.78-inch AMOLED display, Snapdragon 6 Gen 1, and a huge 5500mAh battery. See USA pricing and details.",
  "pros": [
    "Vibrant 120Hz AMOLED screen",
    "Massive 5500 mAh battery",
    "Excellent 50MP selfie camera",
    "Supports expandable storage"
  ],
  "cons": [
    "Slower 44W charging speed",
    "Average low-light camera performance"
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
