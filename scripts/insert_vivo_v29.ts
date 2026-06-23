import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = process.env.MONGODB_URI;

const data = {
  "name": "Vivo V29",
  "slug": "vivo-v29",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 350,
  "price_display_text": "$350",
  "display_type": "AMOLED, 120Hz, HDR10+",
  "screen_size": "6.78 inches",
  "resolution": "1260 x 2800 pixels",
  "cpu": "Qualcomm Snapdragon 778G 5G",
  "ram_variants": "8GB, 12GB",
  "storage_variants": "128GB, 256GB, 512GB",
  "cam_main_sensor": "50 MP (OIS)",
  "cam_ultrawide": "8 MP",
  "cam_front_resolution": "50 MP",
  "battery_capacity": "4600 mAh",
  "charging_wired": "80W wired",
  "images": [],
  "seo_overview": "The Vivo V29 is a beautifully crafted mid-range smartphone tailored for style-conscious users and photography enthusiasts in the USA. At the forefront of its design is a striking 6.78-inch AMOLED display that boasts a 120Hz refresh rate, delivering exceptional fluidity and brilliant colors for an immersive visual experience. Under the hood, it is powered by the dependable Qualcomm Snapdragon 778G 5G processor, ensuring that multitasking, app navigation, and moderate gaming run without a hitch. The photographic capabilities are a major selling point, highlighted by a 50 MP main camera with OIS that excels in capturing crisp, blur-free images even in low light. Paired with a versatile 8 MP ultra-wide lens, users can effortlessly capture sweeping landscapes. The front-facing 50 MP camera is equally impressive, offering high-resolution selfies perfect for social media. Durability is heavily emphasized with a robust IP68 rating for water and dust resistance, adding substantial peace of mind. To keep you connected, the 4600 mAh battery easily lasts through a busy day, and the incredibly fast 80W wired charging gets you from zero to 50% in just 17 minutes. The Vivo V29 seamlessly integrates a luxurious design with practical daily performance.",
  "verdict": "For USA consumers wanting a sleek, premium-looking smartphone without the flagship price, the Vivo V29 is an excellent choice. It excels in delivering a gorgeous AMOLED display and a highly capable 50 MP camera system that shoots fantastic photos day or night. The IP68 water resistance is a rare and highly appreciated feature at this price point, offering tremendous durability. While the Snapdragon 778G processor is slightly older, it still provides smooth and reliable performance for daily tasks. Combined with ultra-fast 80W charging, this device offers fantastic value and refined aesthetics.",
  "faqs": [
    {
      "question": "Is the Vivo V29 completely water-resistant?",
      "answer": "Yes, it boasts a full IP68 rating, meaning it can withstand dust and submersion in up to 1.5 meters of water for 30 minutes."
    },
    {
      "question": "Does the Vivo V29 have a headphone jack?",
      "answer": "No, it does not feature a 3.5mm headphone jack, so you will need to use wireless headphones or a USB-C adapter."
    },
    {
      "question": "How fast does the Vivo V29 charge?",
      "answer": "The Vivo V29 supports blazing-fast 80W wired charging, getting you up to 50% charge in just 17 minutes."
    },
    {
      "question": "What processor does the Vivo V29 use?",
      "answer": "It is equipped with the proven and efficient Qualcomm Snapdragon 778G 5G processor."
    },
    {
      "question": "Can I expand the storage on the Vivo V29?",
      "answer": "No, the device lacks a microSD card slot, meaning the internal storage cannot be expanded."
    }
  ],
  "meta_title": "Vivo V29 Price in USA, Full Specs & Detailed Review",
  "meta_description": "Discover the Vivo V29 specs, featuring a 6.78-inch AMOLED display, Snapdragon 778G, and IP68 water resistance. Check USA pricing and full features.",
  "pros": [
    "Premium IP68 water resistance",
    "Gorgeous 120Hz AMOLED display",
    "Ultra-fast 80W wired charging",
    "Excellent 50MP main camera with OIS"
  ],
  "cons": [
    "Slightly older Snapdragon chipset",
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
