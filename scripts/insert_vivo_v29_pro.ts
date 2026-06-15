import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = 'mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak';

const data = {
  "name": "Vivo V29 Pro",
  "slug": "vivo-v29-pro",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 450,
  "price_display_text": "$450",
  "display_type": "AMOLED, 120Hz, HDR10+",
  "screen_size": "6.78 inches",
  "resolution": "1260 x 2800 pixels",
  "cpu": "MediaTek Dimensity 8200",
  "ram_variants": "8GB, 12GB",
  "storage_variants": "256GB",
  "cam_main_sensor": "50 MP (OIS)",
  "cam_telephoto": "12 MP (2x optical zoom)",
  "cam_ultrawide": "8 MP",
  "cam_front_resolution": "50 MP",
  "battery_capacity": "4600 mAh",
  "charging_wired": "80W wired",
  "images": [],
  "seo_overview": "The Vivo V29 Pro is an elegantly designed smartphone that targets mobile photography enthusiasts and power users in the USA. Showcasing a spectacular 6.78-inch AMOLED display with a high 120Hz refresh rate, it offers an incredibly smooth and vibrant visual experience, perfect for gaming and media consumption. Underneath its sleek exterior, the device is powered by the highly capable MediaTek Dimensity 8200 chipset, ensuring swift app launches and seamless multitasking capabilities. The defining feature of the Vivo V29 Pro is its versatile triple camera system on the back. It pairs a remarkable 50 MP primary lens with Optical Image Stabilization (OIS) alongside a dedicated 12 MP telephoto lens boasting 2x optical zoom, ensuring exceptional portrait shots and clear zooming. Furthermore, a 50 MP front-facing camera takes incredibly sharp and flattering selfies. Despite its incredibly slim 7.5mm profile, it houses a reliable 4600 mAh battery that easily lasts throughout the day. When it comes time to recharge, the blazing-fast 80W wired charging minimizes your wait time substantially. Combining top-tier performance, professional-grade cameras, and a stunning design, the Vivo V29 Pro is a formidable option in the mid-range market.",
  "verdict": "For USA buyers seeking a sophisticated smartphone with exceptional portrait photography capabilities, the Vivo V29 Pro is an outstanding choice. The inclusion of a dedicated 12 MP telephoto lens significantly elevates its portrait capabilities, setting it apart from many competitors. The vibrant AMOLED display and the powerful Dimensity 8200 processor ensure a flawless and responsive daily user experience. Although the 4600 mAh battery is slightly smaller than some rivals, the ultra-fast 80W charging completely mitigates this issue. If a sleek design and premium camera performance are your top priorities, this phone is highly recommended.",
  "faqs": [
    {
      "question": "Does the Vivo V29 Pro have a telephoto camera?",
      "answer": "Yes, it features a dedicated 12 MP telephoto lens with 2x optical zoom, which is excellent for portrait photography."
    },
    {
      "question": "What is the charging speed of the Vivo V29 Pro?",
      "answer": "The device supports ultra-fast 80W wired charging, allowing for very rapid battery replenishment."
    },
    {
      "question": "Does the Vivo V29 Pro support expandable storage?",
      "answer": "No, the Vivo V29 Pro does not have a microSD card slot, meaning storage cannot be expanded."
    },
    {
      "question": "Is the Vivo V29 Pro good for gaming?",
      "answer": "Yes, the MediaTek Dimensity 8200 processor provides excellent performance for mobile gaming and heavy multitasking."
    },
    {
      "question": "Does the Vivo V29 Pro support 5G?",
      "answer": "Absolutely, it is a 5G-enabled device, ensuring high-speed internet connectivity across compatible networks."
    }
  ],
  "meta_title": "Vivo V29 Pro Price in USA, Specs & Comprehensive Review",
  "meta_description": "Check out the Vivo V29 Pro featuring a 6.78-inch AMOLED display, Dimensity 8200 chipset, and a 50MP OIS camera. Explore the USA price and full specifications.",
  "pros": [
    "Dedicated 12MP telephoto lens",
    "Gorgeous 120Hz AMOLED display",
    "Blazing fast 80W charging",
    "Ultra-sleek and premium design"
  ],
  "cons": [
    "No expandable storage support",
    "Battery capacity could be larger"
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
