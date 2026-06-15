import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = 'mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak';

const data = {
  "name": "Vivo V40 Pro",
  "slug": "vivo-v40-pro",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 599,
  "price_display_text": "$599",
  "display_type": "AMOLED, 120Hz, 4500 nits peak, HDR10+",
  "screen_size": "6.78 inches",
  "resolution": "1260 x 2800 pixels",
  "cpu": "MediaTek Dimensity 9200+",
  "ram_variants": "8GB, 12GB",
  "storage_variants": "256GB, 512GB",
  "cam_main_sensor": "50 MP (OIS)",
  "cam_telephoto": "50 MP (2x optical zoom)",
  "cam_ultrawide": "50 MP",
  "cam_front_resolution": "50 MP",
  "battery_capacity": "5500 mAh",
  "charging_wired": "80W wired",
  "images": [],
  "seo_overview": "The Vivo V40 Pro offers an outstanding blend of flagship performance and professional-grade photography for smartphone users in the USA. Showcasing a spectacular 6.78-inch AMOLED display that achieves a remarkable peak brightness of 4500 nits, this device guarantees absolute clarity in any lighting environment. Performance is driven by the robust MediaTek Dimensity 9200+ processor, delivering effortless multitasking and smooth high-end gaming sessions. Photography enthusiasts are treated to an exceptional triple 50 MP camera array on the back, comprising a primary lens with OIS, a 2x optical telephoto lens, and a versatile ultra-wide sensor. Furthermore, the 50 MP front camera captures incredibly sharp selfies and high-definition video. The sleek, durable glass design is complemented by superior IP68 and IP69K dust and water resistance ratings. Providing immense longevity, the massive 5500 mAh battery easily lasts an entire day of heavy use, while the 80W rapid wired charging minimizes charging times significantly. The Vivo V40 Pro seamlessly merges advanced technology with elegant design to deliver an uncompromised mobile experience.",
  "verdict": "For USA consumers seeking a premium smartphone experience, the Vivo V40 Pro presents exceptional value. The triple 50 MP camera system captures flawless photos and versatile portraits with its dedicated telephoto lens. Powered by the powerful Dimensity 9200+ chipset and paired with an astonishingly bright 4500-nit display, it handles everything from media consumption to intense gaming flawlessly. Its massive 5500 mAh battery ensures all-day endurance, and the 80W wired charging gets you back in action swiftly. This device is highly recommended for users prioritizing top-tier photography and flagship-level performance in a sleek package.",
  "faqs": [
    {
      "question": "Is the Vivo V40 Pro water-resistant?",
      "answer": "Yes, it boasts an impressive IP68 and IP69K rating, providing excellent protection against dust and high-pressure water."
    },
    {
      "question": "Does the Vivo V40 Pro have a telephoto camera?",
      "answer": "Absolutely, it features a 50 MP telephoto lens with 2x optical zoom for stunning portrait photography."
    },
    {
      "question": "What processor does the Vivo V40 Pro use?",
      "answer": "It is equipped with the powerful MediaTek Dimensity 9200+ chipset, ensuring top-tier performance for all tasks."
    },
    {
      "question": "How fast does the Vivo V40 Pro charge?",
      "answer": "The device supports blazing-fast 80W wired charging, which replenishes the large 5500 mAh battery incredibly quickly."
    },
    {
      "question": "Can I expand the storage on the Vivo V40 Pro?",
      "answer": "No, it does not support expandable storage via microSD, so you must select the appropriate internal storage option."
    }
  ],
  "meta_title": "Vivo V40 Pro Price in USA, Specs & Review",
  "meta_description": "Check out the Vivo V40 Pro specifications, featuring a 6.78-inch AMOLED screen, Dimensity 9200+ processor, and triple 50MP cameras. See the full USA price.",
  "pros": [
    "Incredibly bright 4500-nit AMOLED display",
    "Outstanding triple 50MP camera setup",
    "Top-tier IP68/IP69K water resistance",
    "Powerful Dimensity 9200+ performance"
  ],
  "cons": [
    "No wireless charging support",
    "Lacks a microSD card slot"
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
