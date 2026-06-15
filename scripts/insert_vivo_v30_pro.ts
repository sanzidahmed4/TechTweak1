import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = 'mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak';

const data = {
  "name": "Vivo V30 Pro",
  "slug": "vivo-v30-pro",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 500,
  "price_display_text": "$500",
  "display_type": "AMOLED, 120Hz, HDR10+",
  "screen_size": "6.78 inches",
  "resolution": "1260 x 2800 pixels",
  "cpu": "MediaTek Dimensity 8200",
  "ram_variants": "8GB, 12GB",
  "storage_variants": "256GB, 512GB",
  "cam_main_sensor": "50 MP (OIS, Zeiss)",
  "cam_telephoto": "50 MP (2x optical zoom, Zeiss)",
  "cam_ultrawide": "50 MP (Zeiss)",
  "cam_front_resolution": "50 MP",
  "battery_capacity": "5000 mAh",
  "charging_wired": "80W wired",
  "images": [],
  "seo_overview": "The Vivo V30 Pro is a revolutionary device for mobile photography enthusiasts in the USA, blending an ultra-slim design with powerhouse camera capabilities. Featuring a magnificent 6.78-inch AMOLED display with a fluid 120Hz refresh rate, users are treated to a vibrant and smooth visual experience for gaming and media consumption. Performance is expertly managed by the MediaTek Dimensity 8200 chipset, ensuring that demanding applications run flawlessly without lag. The absolute highlight of the Vivo V30 Pro is its exceptional quad 50 MP camera system, uniquely co-engineered with ZEISS. The rear array includes a 50 MP main lens with OIS, a 50 MP telephoto lens with 2x optical zoom for stunning portraits, and a 50 MP ultra-wide lens. Paired with a 50 MP front camera and the innovative Aura Light flash, this phone captures professional-grade photos in any lighting environment. Powering this sleek device is a robust 5000 mAh battery that reliably provides an entire day of usage, further enhanced by 80W rapid wired charging to ensure you spend less time tethered to an outlet. The Vivo V30 Pro represents an unparalleled combination of elegance, performance, and elite photography.",
  "verdict": "For USA consumers prioritizing camera quality above all else, the Vivo V30 Pro is an absolute must-have in the mid-range market. Its quad 50 MP ZEISS-engineered camera setup easily rivals top-tier flagships, producing incredibly detailed photos and flawless portraits. The phone’s remarkably slim and elegant design houses a bright AMOLED display and a highly capable Dimensity 8200 processor. With reliable 5000 mAh battery endurance and 80W fast charging, the device offers excellent daily utility. While it omits wireless charging, its extraordinary camera prowess and sophisticated aesthetic make it an exceptionally strong recommendation.",
  "faqs": [
    {
      "question": "Does the Vivo V30 Pro feature ZEISS cameras?",
      "answer": "Yes, it boasts a unique quad 50 MP setup co-engineered with ZEISS optics and features ZEISS T* lens coating."
    },
    {
      "question": "What is the battery capacity of the Vivo V30 Pro?",
      "answer": "The device comes equipped with a long-lasting 5000 mAh battery."
    },
    {
      "question": "How fast does the Vivo V30 Pro charge?",
      "answer": "It supports rapid 80W wired charging, which can fully recharge the phone in approximately 43 minutes."
    },
    {
      "question": "Is the Vivo V30 Pro suitable for gaming?",
      "answer": "Absolutely, the MediaTek Dimensity 8200 processor and 120Hz AMOLED display provide a smooth and responsive gaming experience."
    },
    {
      "question": "Does the Vivo V30 Pro support expandable storage?",
      "answer": "No, it does not have a microSD card slot, so you must rely on the internal 256GB or 512GB storage."
    }
  ],
  "meta_title": "Vivo V30 Pro Price in USA, Specs & Review",
  "meta_description": "Explore the Vivo V30 Pro featuring a 6.78-inch AMOLED display, Dimensity 8200 chipset, and ZEISS-engineered 50MP cameras. Find the USA price and full specs.",
  "pros": [
    "Incredible ZEISS quad 50MP cameras",
    "Ultra-slim and elegant design",
    "Gorgeous 120Hz AMOLED display",
    "Rapid 80W wired charging"
  ],
  "cons": [
    "No wireless charging feature",
    "Lacks expandable storage support"
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
