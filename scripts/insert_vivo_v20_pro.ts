import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = 'mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak';

const data = {
  "name": "Vivo V20 Pro",
  "slug": "vivo-v20-pro",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 250,
  "price_display_text": "$250",
  "display_type": "AMOLED, HDR10",
  "screen_size": "6.44 inches",
  "resolution": "1080 x 2400 pixels",
  "cpu": "Qualcomm Snapdragon 765G 5G",
  "ram_variants": "8GB",
  "storage_variants": "128GB",
  "cam_main_sensor": "64 MP",
  "cam_ultrawide": "8 MP",
  "cam_macro": "2 MP (depth)",
  "cam_front_resolution": "44 MP + 8 MP (Dual Selfie)",
  "battery_capacity": "4000 mAh",
  "charging_wired": "33W wired",
  "images": [],
  "seo_overview": "The Vivo V20 Pro makes an unforgettable impression in the USA mid-range smartphone segment by offering an ultra-sleek design combined with highly capable dual selfie cameras. The device features a vibrant 6.44-inch AMOLED display that supports HDR10, guaranteeing vivid colors and deep contrasts for all your multimedia needs. Under the beautifully crafted glass back sits the Qualcomm Snapdragon 765G 5G processor, providing reliable, lag-free performance and ensuring fast 5G connectivity for the future. Without a doubt, its standout feature is the incredible dual front-facing camera array, consisting of a 44 MP main sensor and an 8 MP ultra-wide lens, making it an absolute dream for vloggers and social media enthusiasts who want expansive, high-quality selfies. Not to be outdone, the rear sports a versatile 64 MP triple-camera system for crisp daily photography. The phone relies on a 4000 mAh battery to keep it powered, which can be quickly recharged using the 33W fast wired charging adapter. Despite omitting a headphone jack and expandable storage, the Vivo V20 Pro remains a top-tier choice for users seeking an elegant device with flagship-level selfie capabilities.",
  "verdict": "For USA buyers heavily invested in social media and vlogging, the Vivo V20 Pro is a fantastic mid-range option. The dual selfie camera setup (44 MP + 8 MP) easily outperforms many higher-priced competitors in front-facing photo and video quality. The Snapdragon 765G 5G provides seamless daily performance and excellent energy efficiency. While the battery is capped at 4000 mAh, its remarkably slim 7.4mm profile makes it one of the most comfortable phones to hold. If you can overlook the lack of expandable storage, the V20 Pro delivers exceptional value and style.",
  "faqs": [
    {
      "question": "Does the Vivo V20 Pro have a dual selfie camera?",
      "answer": "Yes, it boasts a powerful dual front camera setup featuring a 44 MP main lens and an 8 MP ultra-wide lens."
    },
    {
      "question": "What processor powers the Vivo V20 Pro?",
      "answer": "The device is driven by the highly capable Qualcomm Snapdragon 765G 5G chipset."
    },
    {
      "question": "Can I use a microSD card in the Vivo V20 Pro?",
      "answer": "No, the Vivo V20 Pro does not feature a microSD card slot, so you cannot expand its 128GB of internal storage."
    },
    {
      "question": "Does the Vivo V20 Pro support 5G?",
      "answer": "Yes, thanks to the Snapdragon 765G processor, the device fully supports 5G connectivity."
    },
    {
      "question": "Is there a headphone jack on the Vivo V20 Pro?",
      "answer": "No, the device lacks a 3.5mm headphone jack, requiring you to use wireless headphones or an adapter."
    }
  ],
  "meta_title": "Vivo V20 Pro Price in USA, Specs & Comprehensive Review",
  "meta_description": "Check the Vivo V20 Pro specs, highlighting a dual 44MP+8MP front camera, Snapdragon 765G 5G, and a sleek AMOLED display. Find USA pricing and full details.",
  "pros": [
    "Incredible dual selfie cameras",
    "Ultra-slim and stylish design",
    "Reliable Snapdragon 765G performance",
    "Vibrant HDR10 AMOLED display"
  ],
  "cons": [
    "Lacks expandable storage",
    "Average 4000 mAh battery capacity"
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
