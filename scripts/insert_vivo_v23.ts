import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = process.env.MONGODB_URI;

const data = {
  "name": "Vivo V23",
  "slug": "vivo-v23",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 320,
  "price_display_text": "$320",
  "display_type": "AMOLED, 90Hz, HDR10+",
  "screen_size": "6.44 inches",
  "resolution": "1080 x 2400 pixels",
  "cpu": "MediaTek Dimensity 920",
  "ram_variants": "8GB, 12GB",
  "storage_variants": "128GB, 256GB",
  "cam_main_sensor": "64 MP",
  "cam_ultrawide": "8 MP",
  "cam_macro": "2 MP",
  "cam_front_resolution": "50 MP + 8 MP (Dual Selfie)",
  "battery_capacity": "4200 mAh",
  "charging_wired": "44W wired",
  "images": [],
  "seo_overview": "The Vivo V23 is a premium mid-range device focused on spectacular design and high-quality selfie photography, catering directly to USA consumers who love creating content. It boasts a sleek, flat-edge design reminiscent of premium flagships, complemented by a 6.44-inch AMOLED display with a 90Hz refresh rate. This screen provides deep blacks and vivid colors, ensuring your media looks fantastic. Powering the smartphone is the capable MediaTek Dimensity 920 processor, which balances excellent performance for daily applications with high energy efficiency. However, the true highlight of the Vivo V23 is its extraordinary dual front camera system. Featuring a 50 MP main selfie camera paired with an 8 MP ultra-wide lens and dual-tone spotlight LEDs, it captures flawless, well-lit portraits even in complete darkness. The rear camera setup is also formidable, anchored by a solid 64 MP main sensor. With a 4200 mAh battery keeping the device running and 44W wired fast charging to minimize downtime, it meets the demands of modern smartphone users. The unique color-changing back panel on select models adds an extra layer of flair, making the Vivo V23 a visually striking and highly capable device.",
  "verdict": "For selfie lovers and social media content creators in the USA, the Vivo V23 provides an almost unbeatable package for the price. The dual 50 MP + 8 MP front cameras with dual-tone LEDs are phenomenal, making front-facing photography a joy. The flat-edge design feels incredibly premium in hand, and the Dimensity 920 processor easily handles everyday tasks and light gaming. While the 4200 mAh battery is slightly smaller than some competitors, the 44W charging ensures you are never tethered to the wall for long. If a stunning design and top-tier selfie cameras are your priorities, the Vivo V23 is highly recommended.",
  "faqs": [
    {
      "question": "Does the Vivo V23 have a dual selfie camera?",
      "answer": "Yes, it features a unique dual front camera setup with a 50 MP main lens and an 8 MP ultra-wide lens, complete with spotlight LEDs."
    },
    {
      "question": "What processor powers the Vivo V23?",
      "answer": "The Vivo V23 is equipped with the capable and efficient MediaTek Dimensity 920 processor."
    },
    {
      "question": "Can I expand the storage on the Vivo V23?",
      "answer": "No, it lacks a microSD card slot, so you must select the appropriate 128GB or 256GB internal storage variant."
    },
    {
      "question": "Does the Vivo V23 support 5G connectivity?",
      "answer": "Yes, the Vivo V23 fully supports 5G networks, providing high-speed internet connectivity."
    },
    {
      "question": "Does the Vivo V23 have a headphone jack?",
      "answer": "No, it does not include a 3.5mm headphone jack, requiring the use of wireless audio or a USB-C adapter."
    }
  ],
  "meta_title": "Vivo V23 Price in USA, Specs & Comprehensive Review",
  "meta_description": "Explore the Vivo V23 specs, featuring a flat-edge design, Dimensity 920 processor, and incredible dual 50MP selfie cameras. See USA pricing and details.",
  "pros": [
    "Amazing dual 50MP selfie cameras",
    "Premium flat-edge design",
    "Solid Dimensity 920 performance",
    "Front-facing dual-tone LED flash"
  ],
  "cons": [
    "Battery capacity could be larger",
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
