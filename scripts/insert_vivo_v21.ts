import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = process.env.MONGODB_URI;

const data = {
  "name": "Vivo V21",
  "slug": "vivo-v21",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 280,
  "price_display_text": "$280",
  "display_type": "AMOLED, 90Hz, HDR10+",
  "screen_size": "6.44 inches",
  "resolution": "1080 x 2400 pixels",
  "cpu": "MediaTek Dimensity 800U 5G",
  "ram_variants": "8GB",
  "storage_variants": "128GB, 256GB",
  "cam_main_sensor": "64 MP (OIS)",
  "cam_ultrawide": "8 MP",
  "cam_macro": "2 MP",
  "cam_front_resolution": "44 MP (OIS)",
  "battery_capacity": "4000 mAh",
  "charging_wired": "33W wired",
  "images": [],
  "seo_overview": "The Vivo V21 is a brilliant mid-range smartphone explicitly engineered for selfie lovers and vlogging enthusiasts in the USA. At the forefront of the device is a vibrant 6.44-inch AMOLED display boasting a 90Hz refresh rate, which provides smooth visuals and excellent color accuracy for daily media consumption. Powering the phone is the highly efficient MediaTek Dimensity 800U 5G processor, ensuring that multitasking and connectivity remain fast and reliable. What truly sets the Vivo V21 apart from the competition is its extraordinary 44 MP front-facing camera, uniquely equipped with Optical Image Stabilization (OIS) and autofocus. This guarantees incredibly sharp and stable selfies and vlog videos, even in low-light scenarios. The rear camera setup is equally impressive, anchored by a 64 MP main sensor that also utilizes OIS. The device is impressively thin, measuring just 7.3mm, and houses a 4000 mAh battery. Paired with 33W wired fast charging, you can quickly top up the battery and get back to creating content. If front-facing camera quality and a sleek, lightweight design are your top priorities, the Vivo V21 is an unparalleled choice.",
  "verdict": "For USA buyers who prioritize the selfie camera above all else, the Vivo V21 is an exceptional device. The 44 MP front camera with OIS is an incredibly rare and valuable feature, making it an absolute powerhouse for vlogging and social media content creation. The 64 MP rear camera is also highly capable, delivering crisp photos. While the 4000 mAh battery is smaller than what is typically found in modern mid-range phones, the energy-efficient Dimensity 800U processor helps maximize its longevity. Despite lacking a 3.5mm headphone jack, its ultra-slim design and stellar camera capabilities make it highly recommended.",
  "faqs": [
    {
      "question": "Does the Vivo V21 front camera have OIS?",
      "answer": "Yes, the 44 MP front-facing camera features Optical Image Stabilization (OIS), which is very rare for a selfie camera."
    },
    {
      "question": "Does the Vivo V21 support expandable storage?",
      "answer": "Yes, it features a hybrid dual SIM slot, allowing you to use a microSD card to expand your storage."
    },
    {
      "question": "What is the battery capacity of the Vivo V21?",
      "answer": "The device comes with a 4000 mAh battery, supported by 33W fast wired charging."
    },
    {
      "question": "What processor does the Vivo V21 use?",
      "answer": "It is equipped with the capable and efficient MediaTek Dimensity 800U 5G processor."
    },
    {
      "question": "Does the Vivo V21 have a headphone jack?",
      "answer": "No, the Vivo V21 does not include a 3.5mm headphone jack."
    }
  ],
  "meta_title": "Vivo V21 Price in USA, Full Specs & Honest Review",
  "meta_description": "Check the Vivo V21 specs, highlighting a 44MP front camera with OIS, a 64MP rear OIS camera, and a 90Hz AMOLED display. Find USA pricing and full details.",
  "pros": [
    "Incredible 44MP front camera with OIS",
    "Solid 64MP main rear camera",
    "Ultra-slim and lightweight design",
    "Vibrant 90Hz AMOLED screen"
  ],
  "cons": [
    "Smaller 4000 mAh battery capacity",
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
