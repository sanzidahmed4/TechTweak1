require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

const PhoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', PhoneSchema);
const BrandSchema = new mongoose.Schema({}, { strict: false });
const Brand = mongoose.models.Brand || mongoose.model('Brand', BrandSchema);

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    const brand = await Brand.findOne({ name: { $regex: /^vivo$/i } });
    
    const phoneData = {
      name: "Vivo X80 Pro",
      slug: "vivo-x80-pro",
      brand_id: brand._id,
      price_usd: 850,
      price_display_text: "$850",
      price_status: "official",
      release_date: "April 2022",
      phone_status: "released",
      is_published: true,
      display_type: "LTPO3 AMOLED",
      screen_size: "6.78 inches",
      resolution: "1440 x 3200 pixels",
      refresh_rate: "120Hz",
      cpu: "Snapdragon 8 Gen 1 (4 nm)",
      ram_variants: "8GB, 12GB",
      storage_variants: "256GB, 512GB",
      cam_main_sensor: "50MP",
      cam_telephoto: "8MP + 12MP",
      cam_ultrawide: "48MP",
      battery_capacity: "4700 mAh",
      charging_wired: "80W",
      charging_wireless: "50W",
      weight: "215g",
      has_5g: true,
      seo_overview: "The Vivo X80 Pro established Vivo as a heavyweight contender in the premium camera phone market, pushing the boundaries of mobile photography with its Zeiss-engineered quad-camera system. One of its standout features is the 12MP portrait telephoto lens equipped with advanced gimbal stabilization, allowing for incredibly smooth video and exceptionally sharp portraits even in low light. This is paired with a 50MP main sensor, an 8MP periscope lens for 5x optical zoom, and a 48MP ultrawide shooter. Under the hood, the device is powered by the flagship Snapdragon 8 Gen 1 processor, ensuring snappy performance across heavy apps and mobile games. The visual experience is spectacular on its 6.78-inch LTPO3 AMOLED display, boasting a crisp 1440p resolution and an adaptive 120Hz refresh rate. Supported by a 4700 mAh battery with rapid 80W wired and 50W wireless charging, it offers an uncompromised flagship experience. While it was not officially distributed in the United States, tech enthusiasts frequently import it for its unique, top-tier photography capabilities.",
      verdict: "The Vivo X80 Pro is an outstanding choice for USA buyers who prioritize smartphone photography and are comfortable navigating the import market. The gimbal-stabilized portrait camera and stunning 1440p display are massive highlights. Keep in mind that missing an official US warranty and potential 5G band limitations are part of the trade-off.",
      pros: [
        "Incredible quad-camera setup with Zeiss optics",
        "Unique gimbal stabilization on the portrait lens",
        "Beautiful, high-resolution LTPO3 AMOLED display",
        "Fast 80W wired and 50W wireless charging"
      ],
      cons: [
        "Not officially available in the USA",
        "Older Snapdragon 8 Gen 1 can run warm",
        "No official US warranty support"
      ],
      faqs: [
        { question: "Is the Vivo X80 Pro sold in the USA?", answer: "No, the Vivo X80 Pro was never officially launched in the United States. It must be purchased through international importers." },
        { question: "What is special about the Vivo X80 Pro camera?", answer: "It features a versatile quad-camera array with Zeiss optics, and remarkably, its 2x telephoto portrait lens includes physical gimbal stabilization for superior low-light shots." },
        { question: "Does the Vivo X80 Pro support wireless charging?", answer: "Yes, it supports very fast 50W wireless charging, as well as 80W fast wired charging." },
        { question: "What processor does the Vivo X80 Pro have?", answer: "The Vivo X80 Pro is powered by the high-end Qualcomm Snapdragon 8 Gen 1 processor." },
        { question: "Will the Vivo X80 Pro work on US carriers?", answer: "It will have limited compatibility. Because it's an international model, it may be missing certain 5G or LTE bands used by major US carriers." }
      ],
      meta_title: "Vivo X80 Pro Price in USA, Specs & Review",
      meta_description: "Learn about the Vivo X80 Pro in the USA. Featuring a gimbal-stabilized portrait camera, Snapdragon 8 Gen 1, and 1440p display. Check out full specs.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X80 Pro');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
