import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = process.env.MONGODB_URI;

const data = {
  "name": "Vivo V40e",
  "slug": "vivo-v40e",
  "is_published": true,
  "is_featured": false,
  "phone_status": "released",
  "price_usd": 350,
  "price_display_text": "$350",
  "display_type": "AMOLED, 120Hz, HDR10+",
  "screen_size": "6.77 inches",
  "resolution": "1080 x 2392 pixels",
  "cpu": "MediaTek Dimensity 7300",
  "ram_variants": "8GB",
  "storage_variants": "128GB, 256GB",
  "cam_main_sensor": "50 MP (OIS)",
  "cam_ultrawide": "8 MP",
  "cam_front_resolution": "50 MP",
  "battery_capacity": "5500 mAh",
  "charging_wired": "80W wired",
  "images": [],
  "seo_overview": "The Vivo V40e strikes the perfect balance between affordability and elegant features, making it an attractive option for USA buyers seeking a dependable mid-range device. It sports a brilliant 6.77-inch AMOLED display with a 120Hz refresh rate and HDR10+ support, delivering vivid colors and buttery-smooth scrolling. Powering the smartphone is the capable MediaTek Dimensity 7300 processor, ensuring steady performance for everyday applications, light gaming, and seamless multitasking. On the photography front, the 50 MP primary rear camera comes with Optical Image Stabilization (OIS), helping you capture crisp, blur-free photos in challenging lighting conditions. The 8 MP ultra-wide lens is perfect for expansive group shots, while the impressive 50 MP selfie camera ensures you always look your best. Keeping everything running is a substantial 5500 mAh battery that easily provides an entire day's worth of power. Additionally, the device supports ultra-fast 80W charging, getting you back to 100% in no time. Wrapped in a sleek and lightweight frame, the Vivo V40e is a modern device built for practical daily usage.",
  "verdict": "For budget-conscious consumers in the USA, the Vivo V40e provides exceptional value without significantly compromising on premium features. The vibrant AMOLED display is fantastic for media consumption, while the 50 MP OIS camera guarantees sharp and clear photography. The battery life is phenomenal thanks to the 5500 mAh cell, and the 80W fast charging is incredibly convenient. While it lacks expandable storage, the standard options are quite sufficient. If you want a stylish, long-lasting smartphone with an excellent camera setup at a lower price point, the Vivo V40e is a superb choice.",
  "faqs": [
    {
      "question": "Does the Vivo V40e have a headphone jack?",
      "answer": "No, the Vivo V40e does not feature a 3.5mm headphone jack, so you will need wireless earbuds or a USB-C adapter."
    },
    {
      "question": "What is the battery size of the Vivo V40e?",
      "answer": "It is equipped with a large 5500 mAh battery that provides outstanding all-day endurance."
    },
    {
      "question": "Does the Vivo V40e support 5G connectivity?",
      "answer": "Yes, it is fully compatible with 5G networks, ensuring high-speed internet connectivity across the USA."
    },
    {
      "question": "Can I expand the storage on the Vivo V40e?",
      "answer": "The device lacks a microSD card slot, meaning the internal storage cannot be expanded."
    },
    {
      "question": "Is the Vivo V40e water-resistant?",
      "answer": "It features an IP64 rating, which protects it against dust and light water splashes, but it is not meant for full submersion."
    }
  ],
  "meta_title": "Vivo V40e Price in USA, Full Specs & Review",
  "meta_description": "Check the Vivo V40e specs, featuring a 6.77-inch 120Hz AMOLED display, Dimensity 7300, and a 50MP OIS camera. Find the USA price and full details.",
  "pros": [
    "Vibrant 120Hz AMOLED display",
    "Solid 50MP main camera with OIS",
    "Exceptional 5500 mAh battery",
    "Ultra-fast 80W wired charging"
  ],
  "cons": [
    "No 3.5mm headphone jack",
    "Lacks microSD expansion"
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
