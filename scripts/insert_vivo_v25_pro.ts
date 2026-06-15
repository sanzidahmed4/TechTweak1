import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = 'mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak';

const data = {
  "name": "Vivo V25 Pro",
  "slug": "vivo-v25-pro",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 450,
  "price_display_text": "$450",
  "display_type": "AMOLED, 120Hz, HDR10+, 1300 nits peak",
  "screen_size": "6.56 inches",
  "resolution": "1080 x 2376 pixels",
  "cpu": "MediaTek Dimensity 1300",
  "ram_variants": "8GB, 12GB",
  "storage_variants": "128GB, 256GB",
  "cam_main_sensor": "64 MP (OIS)",
  "cam_ultrawide": "12 MP",
  "cam_macro": "2 MP",
  "cam_front_resolution": "32 MP",
  "battery_capacity": "4830 mAh",
  "charging_wired": "66W wired",
  "images": [],
  "seo_overview": "The Vivo V25 Pro is a sophisticated mid-range smartphone built for USA buyers who appreciate elegant aesthetics and reliable multimedia performance. Highlighting its elegant design is a brilliant 6.56-inch AMOLED display that supports a 120Hz refresh rate and reaches up to 1300 nits of peak brightness, ensuring vibrant visuals and exceptional clarity even under direct sunlight. Driving the phone's robust performance is the MediaTek Dimensity 1300 processor, offering smooth and highly responsive multitasking capabilities that handle demanding apps and gaming sessions with ease. The device shines in the photography department, featuring a highly capable 64 MP main camera with Optical Image Stabilization (OIS) for blur-free low-light photos. An accompanying 12 MP ultra-wide lens provides fantastic sweeping shots. For selfie enthusiasts, the high-quality 32 MP front camera guarantees excellent portraits and video calls. The device also features a reliable 4830 mAh battery that comfortably lasts a full day, and the incredibly swift 66W wired charging means less time plugged into the wall. Combining an innovative color-changing back design with serious mid-range firepower, the Vivo V25 Pro is a strong contender.",
  "verdict": "For USA consumers seeking a highly capable phone with a standout design, the Vivo V25 Pro delivers excellent value. Its color-changing rear panel is visually striking, but it's the Dimensity 1300 performance and the 120Hz AMOLED display that truly impress in daily usage. The 64 MP main camera with OIS ensures that you capture sharp, professional-looking photos in nearly any lighting condition. Although it lacks expandable storage and a headphone jack, its solid 4830 mAh battery and fast 66W charging make it incredibly dependable. It is highly recommended for users who want style and substance.",
  "faqs": [
    {
      "question": "Does the Vivo V25 Pro support wireless charging?",
      "answer": "No, it does not support wireless charging, but it features very fast 66W wired charging."
    },
    {
      "question": "Can I expand the storage of the Vivo V25 Pro?",
      "answer": "The Vivo V25 Pro does not feature a microSD card slot, so the internal storage cannot be expanded."
    },
    {
      "question": "What is the peak brightness of the Vivo V25 Pro display?",
      "answer": "The stunning AMOLED display reaches an impressive peak brightness of 1300 nits."
    },
    {
      "question": "What processor powers the Vivo V25 Pro?",
      "answer": "The device is equipped with the powerful and efficient MediaTek Dimensity 1300 processor."
    },
    {
      "question": "Does the Vivo V25 Pro have a color-changing back?",
      "answer": "Yes, the Sailing Blue variant features a unique color-changing back panel when exposed to UV light."
    }
  ],
  "meta_title": "Vivo V25 Pro Price in USA, Specs & Comprehensive Review",
  "meta_description": "Check the Vivo V25 Pro specs, featuring a 6.56-inch AMOLED display, Dimensity 1300 chipset, and a 64MP OIS camera. Find the USA price and full details.",
  "pros": [
    "Gorgeous 1300-nit AMOLED display",
    "Excellent 64MP camera with OIS",
    "Fast and reliable Dimensity 1300 processor",
    "Unique color-changing design"
  ],
  "cons": [
    "No expandable storage support",
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
