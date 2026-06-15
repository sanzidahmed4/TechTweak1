import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = 'mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak';

const data = {
  "name": "Vivo V20",
  "slug": "vivo-v20",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 230,
  "price_display_text": "$230",
  "display_type": "AMOLED",
  "screen_size": "6.44 inches",
  "resolution": "1080 x 2400 pixels",
  "cpu": "Qualcomm Snapdragon 720G",
  "ram_variants": "8GB",
  "storage_variants": "128GB, 256GB",
  "cam_main_sensor": "64 MP",
  "cam_ultrawide": "8 MP",
  "cam_macro": "2 MP (depth)",
  "cam_front_resolution": "44 MP (AF)",
  "battery_capacity": "4000 mAh",
  "charging_wired": "33W wired",
  "images": [],
  "seo_overview": "The Vivo V20 is an exceptional mid-range smartphone explicitly tailored for photography enthusiasts and USA buyers who appreciate a refined, lightweight design. Its stunning 6.44-inch AMOLED display delivers deep contrasts and vibrant colors, making it a joy for multimedia consumption and web browsing. Operating underneath its beautifully crafted glass exterior is the dependable Qualcomm Snapdragon 720G processor, which efficiently handles daily tasks and casual gaming without breaking a sweat. The device truly makes its mark in the camera department; its outstanding 44 MP front-facing camera features sophisticated autofocus to capture the sharpest selfies imaginable. Meanwhile, the back houses a highly versatile 64 MP triple-camera system capable of shooting stunning 4K videos. Beyond its photographic prowess, the phone includes a dedicated microSD slot, allowing you to easily expand your storage for all those high-resolution photos. The Vivo V20 is powered by a reliable 4000 mAh battery that comfortably lasts a full day, and the swift 33W wired charging quickly replenishes your power. If you want a stylish, camera-focused phone that won't break the bank, the Vivo V20 is a remarkable option.",
  "verdict": "For USA consumers on a tight budget who refuse to compromise on selfie quality, the Vivo V20 is an easy recommendation. The 44 MP autofocus front camera captures incredibly sharp photos, completely outclassing many phones in its price range. The Snapdragon 720G processor offers stable performance for daily use, perfectly complementing the crisp AMOLED display. A massive advantage is the inclusion of a dedicated microSD card slot, which is a rarity on modern devices. While it lacks 5G connectivity and a high refresh rate screen, the overall value and camera capabilities make it a phenomenal budget-friendly choice.",
  "faqs": [
    {
      "question": "Does the Vivo V20 support expandable storage?",
      "answer": "Yes, it features a dedicated microSD card slot, allowing you to expand storage without sacrificing a SIM slot."
    },
    {
      "question": "What is the front camera resolution of the Vivo V20?",
      "answer": "The device boasts an incredibly sharp 44 MP front-facing camera equipped with autofocus."
    },
    {
      "question": "What processor does the Vivo V20 use?",
      "answer": "It is powered by the highly efficient Qualcomm Snapdragon 720G processor."
    },
    {
      "question": "Does the Vivo V20 support 5G?",
      "answer": "No, the standard Vivo V20 is limited to 4G LTE connectivity."
    },
    {
      "question": "Does the Vivo V20 have a headphone jack?",
      "answer": "No, the Vivo V20 does not include a traditional 3.5mm headphone jack."
    }
  ],
  "meta_title": "Vivo V20 Price in USA, Full Specs & Honest Review",
  "meta_description": "Explore the Vivo V20 specs, featuring an incredible 44MP autofocus selfie camera, Snapdragon 720G, and a gorgeous AMOLED display. Check USA pricing today.",
  "pros": [
    "Phenomenal 44MP front camera with AF",
    "Supports dedicated microSD storage",
    "Ultra-sleek and lightweight design",
    "Vibrant AMOLED display"
  ],
  "cons": [
    "No 5G connectivity",
    "Lacks a 3.5mm headphone jack"
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
