import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = 'mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak';

const data = {
  "name": "Vivo V25",
  "slug": "vivo-v25",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 330,
  "price_display_text": "$330",
  "display_type": "AMOLED, 90Hz, HDR10+",
  "screen_size": "6.44 inches",
  "resolution": "1080 x 2404 pixels",
  "cpu": "MediaTek Dimensity 900",
  "ram_variants": "8GB, 12GB",
  "storage_variants": "128GB, 256GB",
  "cam_main_sensor": "64 MP (OIS)",
  "cam_ultrawide": "8 MP",
  "cam_macro": "2 MP",
  "cam_front_resolution": "50 MP",
  "battery_capacity": "4500 mAh",
  "charging_wired": "44W wired",
  "images": [],
  "seo_overview": "The Vivo V25 is a feature-rich mid-range smartphone that offers a compelling mix of style and photographic prowess for budget-conscious USA buyers. It sports a compact and vibrant 6.44-inch AMOLED display with a 90Hz refresh rate, providing smooth scrolling and punchy colors for an enjoyable media consumption experience. Driving the device is the reliable MediaTek Dimensity 900 chipset, which ensures fluid multitasking and efficient power management for daily tasks and casual gaming. Photography is the clear standout feature, starting with a highly capable 64 MP main camera that utilizes Optical Image Stabilization (OIS) to capture sharp, clear photos even in low light. It is accompanied by an 8 MP ultra-wide lens and a 2 MP macro sensor for added versatility. The front-facing 50 MP camera is exceptional, featuring autofocus to deliver incredibly detailed selfies and high-quality video calls. A 4500 mAh battery powers the device, providing sufficient endurance for a full day's use, while the included 44W fast charging minimizes downtime. Combining premium glass build quality, excellent cameras, and reliable performance, the Vivo V25 represents outstanding value.",
  "verdict": "For USA consumers looking for a capable mid-range phone with exceptional selfie capabilities, the Vivo V25 is a fantastic option. The 50 MP front camera with autofocus is a rare find in this price segment, producing incredibly sharp portraits. The 64 MP rear camera with OIS is equally impressive, capturing vibrant and blur-free images. While the 90Hz refresh rate is slightly lower than the 120Hz standard found on newer models, the AMOLED display remains vivid and beautiful. Additionally, the inclusion of expandable storage is a great bonus. It is highly recommended for anyone prioritizing camera performance on a budget.",
  "faqs": [
    {
      "question": "Does the Vivo V25 support expandable storage?",
      "answer": "Yes, it features a shared SIM slot that allows you to expand the storage using a microSDXC card."
    },
    {
      "question": "What is the battery size of the Vivo V25?",
      "answer": "The device comes equipped with a solid 4500 mAh battery."
    },
    {
      "question": "Does the Vivo V25 have a good selfie camera?",
      "answer": "Absolutely, it features an outstanding 50 MP front camera with autofocus for superior clarity."
    },
    {
      "question": "What processor does the Vivo V25 use?",
      "answer": "It is powered by the highly efficient MediaTek Dimensity 900 chipset."
    },
    {
      "question": "Is the Vivo V25 display 120Hz?",
      "answer": "No, it features a 90Hz AMOLED display, which still provides a very smooth viewing experience."
    }
  ],
  "meta_title": "Vivo V25 Price in USA, Full Specs & Honest Review",
  "meta_description": "Explore the Vivo V25 specs, featuring a 6.44-inch AMOLED display, Dimensity 900 chipset, and a 64MP OIS camera. Find the USA price and full details.",
  "pros": [
    "Outstanding 50MP selfie camera with AF",
    "Great 64MP main camera with OIS",
    "Supports expandable storage",
    "Premium glass design"
  ],
  "cons": [
    "Display is limited to 90Hz",
    "Battery is slightly smaller than rivals"
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
