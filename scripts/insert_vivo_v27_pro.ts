import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = process.env.MONGODB_URI;

const data = {
  "name": "Vivo V27 Pro",
  "slug": "vivo-v27-pro",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 480,
  "price_display_text": "$480",
  "display_type": "AMOLED, 120Hz, HDR10+",
  "screen_size": "6.78 inches",
  "resolution": "1080 x 2400 pixels",
  "cpu": "MediaTek Dimensity 8200",
  "ram_variants": "8GB, 12GB",
  "storage_variants": "128GB, 256GB",
  "cam_main_sensor": "50 MP (OIS)",
  "cam_ultrawide": "8 MP",
  "cam_macro": "2 MP",
  "cam_front_resolution": "50 MP",
  "battery_capacity": "4600 mAh",
  "charging_wired": "66W wired",
  "images": [],
  "seo_overview": "The Vivo V27 Pro emerges as a beautifully crafted smartphone designed for USA consumers who value aesthetic elegance and robust camera performance. It features a sweeping 6.78-inch AMOLED display with a 120Hz refresh rate, ensuring that all visual content, from gaming to streaming, is incredibly fluid and immersive. Under the hood, the MediaTek Dimensity 8200 processor provides a snappy and highly responsive user experience, perfectly managing multitasking and demanding apps. Photography is a major highlight, centered around an impressive 50 MP main camera with Optical Image Stabilization (OIS) that excels in low-light environments. Complementing this is an 8 MP ultra-wide lens and a 2 MP macro sensor. Selfie lovers will appreciate the high-resolution 50 MP front camera equipped with autofocus. One of the most unique aspects of the Vivo V27 Pro is its color-changing back panel, which shifts hues when exposed to UV light. The device is powered by a reliable 4600 mAh battery, which quickly recharges thanks to the impressive 66W wired charging capability. Overall, it perfectly balances a futuristic design with reliable daily performance.",
  "verdict": "For USA buyers looking for a phone that turns heads, the Vivo V27 Pro is an exceptional mid-range choice. The color-changing back panel is a unique party trick, but the device's real strength lies in its performance. The Dimensity 8200 processor handles heavy usage effortlessly, and the 50 MP OIS camera produces consistently stellar photos. While the 4600 mAh battery is slightly smaller than some competitors, the 66W fast charging compensates by providing a 50% charge in under 20 minutes. If you want a stylish, capable phone with great portrait photography features, the Vivo V27 Pro is highly recommended.",
  "faqs": [
    {
      "question": "What is unique about the Vivo V27 Pro design?",
      "answer": "The phone features a unique color-changing back panel that shifts its color when exposed to UV light or direct sunlight."
    },
    {
      "question": "Does the Vivo V27 Pro support wireless charging?",
      "answer": "No, it does not support wireless charging, but it features very fast 66W wired charging."
    },
    {
      "question": "What processor does the Vivo V27 Pro use?",
      "answer": "It is powered by the fast and efficient MediaTek Dimensity 8200 chipset."
    },
    {
      "question": "Can I expand the storage of the Vivo V27 Pro?",
      "answer": "No, it lacks a microSD card slot, so you are limited to the internal storage options."
    },
    {
      "question": "Does the Vivo V27 Pro have a good selfie camera?",
      "answer": "Yes, it boasts a top-tier 50 MP front camera with autofocus for incredibly sharp and detailed selfies."
    }
  ],
  "meta_title": "Vivo V27 Pro Price in USA, Full Specs & Honest Review",
  "meta_description": "Discover the Vivo V27 Pro featuring a unique color-changing back, 6.78-inch AMOLED display, and a 50MP OIS camera. Check USA pricing and full details.",
  "pros": [
    "Unique color-changing back panel",
    "Excellent 50MP main camera with OIS",
    "Smooth and fast Dimensity 8200 processor",
    "Fast 66W wired charging"
  ],
  "cons": [
    "Lacks expandable storage",
    "No wireless charging support"
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
