import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = process.env.MONGODB_URI;

const data = {
  "name": "Vivo V30",
  "slug": "vivo-v30",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 400,
  "price_display_text": "$400",
  "display_type": "AMOLED, 120Hz, 2800 nits peak, HDR10+",
  "screen_size": "6.78 inches",
  "resolution": "1260 x 2800 pixels",
  "cpu": "Qualcomm Snapdragon 7 Gen 3",
  "ram_variants": "8GB, 12GB",
  "storage_variants": "128GB, 256GB, 512GB",
  "cam_main_sensor": "50 MP (OIS)",
  "cam_ultrawide": "50 MP",
  "cam_front_resolution": "50 MP",
  "battery_capacity": "5000 mAh",
  "charging_wired": "80W wired",
  "images": [],
  "seo_overview": "The Vivo V30 brings a highly refined smartphone experience to the USA market, combining elegant aesthetics with highly capable hardware. The front of the device is dominated by a stunning 6.78-inch AMOLED display, featuring a fluid 120Hz refresh rate and an impressive peak brightness of 2800 nits. Under the hood, the Qualcomm Snapdragon 7 Gen 3 processor ensures snappy responsiveness and reliable multitasking for everyday activities and modern gaming. One of the standout features of the Vivo V30 is its photography suite, boasting a dual 50 MP rear camera setup. The main sensor captures incredibly sharp photos with OIS, while the 50 MP ultra-wide lens easily accommodates expansive scenery. The exclusive Smart Aura Ring Light elevates portrait photography, delivering studio-like illumination in low-light environments. To top it off, a 50 MP front-facing camera guarantees ultra-clear selfies. The phone is powered by a dependable 5000 mAh battery that easily sustains long hours of usage, backed by blazing-fast 80W wired charging. Wrapped in a sophisticated chassis with IP54 splash resistance, the Vivo V30 is a phenomenal mid-range contender.",
  "verdict": "For USA buyers seeking a sleek mid-range device with a heavy emphasis on photography, the Vivo V30 is an outstanding option. The dual 50 MP camera system and the innovative Smart Aura Ring Light deliver exceptional portraits and night photography. Paired with a gorgeous 2800-nit AMOLED display and the highly efficient Snapdragon 7 Gen 3 processor, the overall performance is impressively smooth. The long-lasting 5000 mAh battery and swift 80W charging provide significant daily convenience. Although it lacks stereo speakers, its premium design and versatile cameras make it a highly recommended smartphone.",
  "faqs": [
    {
      "question": "Does the Vivo V30 have stereo speakers?",
      "answer": "No, the Vivo V30 features a single bottom-firing speaker, lacking a stereo speaker setup."
    },
    {
      "question": "What processor does the Vivo V30 use?",
      "answer": "The Vivo V30 is powered by the efficient and capable Qualcomm Snapdragon 7 Gen 3 chipset."
    },
    {
      "question": "How fast does the Vivo V30 charge?",
      "answer": "It supports ultra-fast 80W wired charging, which quickly replenishes the 5000 mAh battery."
    },
    {
      "question": "Can I expand the storage of the Vivo V30?",
      "answer": "No, the device does not feature a microSD card slot, so you must rely on internal storage."
    },
    {
      "question": "Is the Vivo V30 water-resistant?",
      "answer": "It comes with an IP54 rating, providing basic protection against dust and light water splashes."
    }
  ],
  "meta_title": "Vivo V30 Price in USA, Full Specs & Detailed Review",
  "meta_description": "Check the Vivo V30 specs, featuring a 6.78-inch AMOLED display, Snapdragon 7 Gen 3 processor, and dual 50MP cameras. See the USA price and full details.",
  "pros": [
    "Bright 2800-nit AMOLED display",
    "Excellent dual 50MP camera setup",
    "Innovative Smart Aura Ring Light",
    "Fast 80W wired charging"
  ],
  "cons": [
    "Lacks stereo speakers",
    "No expandable storage"
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
