import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = 'mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak';

const data = {
  "name": "Vivo V23 Pro",
  "slug": "vivo-v23-pro",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 380,
  "price_display_text": "$380",
  "display_type": "AMOLED, 90Hz, HDR10+",
  "screen_size": "6.56 inches",
  "resolution": "1080 x 2376 pixels",
  "cpu": "MediaTek Dimensity 1200",
  "ram_variants": "8GB, 12GB",
  "storage_variants": "128GB, 256GB",
  "cam_main_sensor": "108 MP",
  "cam_ultrawide": "8 MP",
  "cam_macro": "2 MP",
  "cam_front_resolution": "50 MP + 8 MP (Dual Selfie)",
  "battery_capacity": "4300 mAh",
  "charging_wired": "44W wired",
  "images": [],
  "seo_overview": "The Vivo V23 Pro is a masterclass in mid-range smartphone design, offering an exceptional blend of aesthetics and high-end photography for USA consumers. It features a vibrant 6.56-inch AMOLED display with a 90Hz refresh rate, ensuring scrolling and media playback remain smooth and immersive. Performance is driven by the robust MediaTek Dimensity 1200 processor, providing seamless multitasking and impressive speed for heavy applications. The device truly shines in its camera capabilities, highlighted by an ultra-high resolution 108 MP main rear camera that captures stunning details in every shot. Even more impressively, the V23 Pro features a dual front-facing camera system, combining a massive 50 MP wide lens with an 8 MP ultra-wide lens, making it an absolute powerhouse for selfies and group portraits. It also features a mesmerizing color-changing glass back that shifts hues under sunlight. The phone packs a 4300 mAh battery to get you through the day, complemented by reliable 44W fast charging. Balancing a gorgeous, innovative design with an industry-leading selfie camera setup, the Vivo V23 Pro stands out in a crowded market.",
  "verdict": "For USA buyers who prioritize taking the best selfies possible, the Vivo V23 Pro is virtually unmatched in its price tier. The dual 50 MP + 8 MP front cameras deliver extraordinary clarity and versatility for group shots. The massive 108 MP rear camera is equally impressive, capturing crisp, high-resolution photos. The color-changing back adds a premium, futuristic touch to the design. While the 4300 mAh battery is slightly smaller than those of its rivals and it lacks a 120Hz display, the overall performance from the Dimensity 1200 processor makes it a fantastic buy for photography enthusiasts.",
  "faqs": [
    {
      "question": "What is special about the Vivo V23 Pro cameras?",
      "answer": "It features a massive 108 MP main rear camera and a unique dual selfie camera setup (50 MP + 8 MP)."
    },
    {
      "question": "Does the Vivo V23 Pro have a color-changing back?",
      "answer": "Yes, certain color variants feature a special glass back that changes color when exposed to UV light or sunlight."
    },
    {
      "question": "What processor does the Vivo V23 Pro use?",
      "answer": "The device is powered by the fast and capable MediaTek Dimensity 1200 processor."
    },
    {
      "question": "Is the Vivo V23 Pro good for gaming?",
      "answer": "Yes, the Dimensity 1200 chipset provides excellent performance, easily handling modern mobile games."
    },
    {
      "question": "Does the Vivo V23 Pro support expandable storage?",
      "answer": "No, it lacks a microSD card slot, meaning the internal storage cannot be expanded."
    }
  ],
  "meta_title": "Vivo V23 Pro Price in USA, Specs & Comprehensive Review",
  "meta_description": "Discover the Vivo V23 Pro featuring a 108MP rear camera, dual 50MP selfie cameras, and a color-changing back. Check out USA pricing and full specs.",
  "pros": [
    "Incredible dual selfie cameras",
    "Massive 108MP main camera",
    "Unique color-changing design",
    "Fast Dimensity 1200 performance"
  ],
  "cons": [
    "Battery capacity is on the smaller side",
    "Display is limited to 90Hz"
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
