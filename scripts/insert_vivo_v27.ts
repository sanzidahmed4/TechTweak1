import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = 'mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak';

const data = {
  "name": "Vivo V27",
  "slug": "vivo-v27",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 380,
  "price_display_text": "$380",
  "display_type": "AMOLED, 120Hz, HDR10+",
  "screen_size": "6.78 inches",
  "resolution": "1080 x 2400 pixels",
  "cpu": "MediaTek Dimensity 7200",
  "ram_variants": "8GB, 12GB",
  "storage_variants": "128GB, 256GB",
  "cam_main_sensor": "50 MP (OIS)",
  "cam_ultrawide": "8 MP",
  "cam_macro": "2 MP",
  "cam_front_resolution": "50 MP",
  "battery_capacity": "4600 mAh",
  "charging_wired": "66W wired",
  "images": [],
  "seo_overview": "The Vivo V27 brings an alluring design and robust camera features to mid-range smartphone buyers in the USA. With a stunning 6.78-inch AMOLED display that supports a 120Hz refresh rate and HDR10+, users can expect incredibly smooth interactions and vivid, lifelike colors when watching videos or playing games. At the heart of the device is the highly efficient MediaTek Dimensity 7200 processor, delivering snappy performance for everyday tasks and moderate gaming without excessive battery consumption. The Vivo V27 really shines in the photography department, equipped with a custom 50 MP Sony IMX766V main sensor featuring Optical Image Stabilization (OIS) for breathtaking low-light shots. It is paired with an 8 MP ultra-wide lens and a 2 MP macro lens to cover various photographic needs. Additionally, the 50 MP front camera is perfect for high-quality selfies and video calls. Designed with a sleek, ultra-slim profile, the phone houses a 4600 mAh battery that reliably powers through the day. The included 66W wired charging support is highly convenient, minimizing the time you spend connected to a wall adapter. Combining a premium aesthetic with fantastic camera capabilities, the Vivo V27 is a very strong mid-range contender.",
  "verdict": "For USA consumers prioritizing camera quality and sleek design within a moderate budget, the Vivo V27 is an outstanding option. The custom 50 MP Sony main camera captures excellent photos, particularly in low-light conditions, while the 50 MP selfie camera ensures you always look your best. The Dimensity 7200 processor provides reliable and smooth performance for daily use, perfectly complementing the gorgeous 120Hz AMOLED display. Although the battery size is a bit modest, the extremely fast 66W charging effectively offsets this. It is a highly recommended smartphone for photography lovers looking for great value.",
  "faqs": [
    {
      "question": "What sensor does the Vivo V27 main camera use?",
      "answer": "It uses a highly capable, custom Sony IMX766V 50 MP sensor with OIS for superior photo quality."
    },
    {
      "question": "Does the Vivo V27 support fast charging?",
      "answer": "Yes, it supports very fast 66W wired charging, which can charge the battery to 50% in roughly 19 minutes."
    },
    {
      "question": "Can I expand the storage of the Vivo V27?",
      "answer": "No, the Vivo V27 does not feature a microSD card slot for expandable storage."
    },
    {
      "question": "What processor powers the Vivo V27?",
      "answer": "The device is powered by the efficient and capable MediaTek Dimensity 7200 processor."
    },
    {
      "question": "Does the Vivo V27 have a headphone jack?",
      "answer": "No, it lacks a traditional 3.5mm headphone jack."
    }
  ],
  "meta_title": "Vivo V27 Price in USA, Full Specs & Comprehensive Review",
  "meta_description": "Check the Vivo V27 specs, featuring a 6.78-inch AMOLED display, Dimensity 7200, and a 50MP Sony IMX766V camera. Explore the USA price and full details.",
  "pros": [
    "Custom 50MP Sony camera with OIS",
    "Gorgeous 120Hz AMOLED display",
    "Ultra-sleek and lightweight design",
    "Fast 66W wired charging"
  ],
  "cons": [
    "No expandable storage support",
    "Average 4600 mAh battery capacity"
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
