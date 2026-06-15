import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = 'mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak';

const data = {
  "name": "Vivo V29e",
  "slug": "vivo-v29e",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 280,
  "price_display_text": "$280",
  "display_type": "AMOLED, 120Hz, 1150 nits peak",
  "screen_size": "6.67 inches",
  "resolution": "1080 x 2400 pixels",
  "cpu": "Qualcomm Snapdragon 695 5G",
  "ram_variants": "8GB, 12GB",
  "storage_variants": "256GB",
  "cam_main_sensor": "64 MP (OIS)",
  "cam_ultrawide": "8 MP",
  "cam_front_resolution": "50 MP",
  "battery_capacity": "5000 mAh",
  "charging_wired": "44W wired",
  "images": [],
  "seo_overview": "The Vivo V29e brings elegant design and highly capable cameras to the budget-friendly mid-range smartphone tier, making it an excellent choice for USA consumers. The front of the device features a brilliant 6.67-inch AMOLED display with a 120Hz refresh rate, providing buttery-smooth interactions and vibrant colors for all your entertainment needs. Powered by the reliable Qualcomm Snapdragon 695 5G processor, the phone delivers steady and efficient performance for daily applications and light gaming. One of the primary attractions of the Vivo V29e is its impressive photography setup, featuring a high-resolution 64 MP main camera with Optical Image Stabilization (OIS) that guarantees clear, stable shots even in tricky lighting conditions. Combined with an 8 MP ultra-wide lens, you have great flexibility for various scenarios. Additionally, selfie lovers will adore the incredibly sharp 50 MP front camera that ensures flawless self-portraits. With a large 5000 mAh battery, you can comfortably get through a full day of usage, and the included 44W fast charging tops up the power quickly. Encased in a beautiful glass back with IP54 splash resistance, the Vivo V29e perfectly blends aesthetics with reliable daily utility.",
  "verdict": "For USA buyers on a strict budget, the Vivo V29e offers incredible value, particularly in terms of display and camera quality. The 6.67-inch 120Hz AMOLED screen is a joy to use, and the 64 MP OIS camera produces surprisingly crisp photos for its price category. The massive 5000 mAh battery easily lasts all day, providing excellent reliability. While the Snapdragon 695 processor isn't designed for heavy gaming, it is more than sufficient for everyday use. If you want a stylish device with great battery life and a standout selfie camera without breaking the bank, the Vivo V29e is highly recommended.",
  "faqs": [
    {
      "question": "Is the Vivo V29e water-resistant?",
      "answer": "Yes, it features an IP54 rating, providing decent protection against dust and light water splashes."
    },
    {
      "question": "Does the Vivo V29e support expandable storage?",
      "answer": "No, the device does not feature a microSD card slot, so you must rely on the internal 256GB storage."
    },
    {
      "question": "What processor does the Vivo V29e use?",
      "answer": "It is powered by the highly efficient Qualcomm Snapdragon 695 5G chipset."
    },
    {
      "question": "What is the battery capacity of the Vivo V29e?",
      "answer": "The Vivo V29e boasts a large and reliable 5000 mAh battery for all-day usage."
    },
    {
      "question": "Does the Vivo V29e have a headphone jack?",
      "answer": "No, it lacks a 3.5mm headphone jack, requiring the use of wireless earbuds or an adapter."
    }
  ],
  "meta_title": "Vivo V29e Price in USA, Full Specs & Honest Review",
  "meta_description": "Explore the Vivo V29e specs, featuring a 6.67-inch AMOLED screen, Snapdragon 695 5G, and a 64MP OIS camera. Check USA pricing and full details.",
  "pros": [
    "Gorgeous 120Hz AMOLED screen",
    "Solid 64MP main camera with OIS",
    "Exceptional 50MP selfie camera",
    "Reliable 5000 mAh battery"
  ],
  "cons": [
    "Older Snapdragon 695 chipset",
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
