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
      name: "Vivo X90",
      slug: "vivo-x90",
      brand_id: brand._id,
      price_usd: 520,
      price_display_text: "$520",
      price_status: "official",
      release_date: "November 2022",
      phone_status: "released",
      is_published: true,
      display_type: "AMOLED",
      screen_size: "6.78 inches",
      resolution: "1260 x 2800 pixels",
      refresh_rate: "120Hz",
      cpu: "Mediatek Dimensity 9200 (4 nm)",
      ram_variants: "8GB, 12GB",
      storage_variants: "128GB, 256GB, 512GB",
      cam_main_sensor: "50MP",
      cam_telephoto: "12MP",
      cam_ultrawide: "12MP",
      battery_capacity: "4810 mAh",
      charging_wired: "120W",
      weight: "200g",
      has_5g: true,
      seo_overview: "The Vivo X90 serves as a powerful entry point into the flagship tier, offering fantastic value for users willing to explore international imported devices in the USA. At its heart lies the Mediatek Dimensity 9200 chipset, built on a 4nm architecture, which effortlessly handles gaming and multitasking while keeping power consumption low. The visual experience is anchored by a sharp 6.78-inch AMOLED display that supports a 120Hz refresh rate and HDR10+, making media consumption vibrant and fluid. Despite being the base model of its lineup, the X90 doesn't skimp on photography. It features a versatile triple camera setup, utilizing Zeiss optics and a capable 50MP main sensor to capture stunning detail and accurate colors. Furthermore, the 4810 mAh battery ensures reliable all-day use, but the real standout is the blisteringly fast 120W wired charging that minimizes downtime. While the lack of official USA distribution poses network and warranty considerations, the sheer hardware value makes the Vivo X90 an enticing smartphone for tech enthusiasts.",
      verdict: "The Vivo X90 delivers an incredibly smooth, powerful Android experience thanks to the Dimensity 9200 chip and a gorgeous 120Hz display. At its relatively low equivalent price point, the fast 120W charging and Zeiss cameras provide massive value. However, USA buyers must import it, meaning you sacrifice official customer support and seamless carrier compatibility.",
      pros: [
        "Incredibly fast 120W wired charging",
        "Excellent Mediatek Dimensity 9200 performance",
        "Beautiful 120Hz AMOLED display",
        "Solid Zeiss-branded triple camera setup"
      ],
      cons: [
        "Not officially sold in the USA",
        "May have limited 5G network support",
        "Lacks wireless charging capability"
      ],
      faqs: [
        { question: "Is the Vivo X90 sold in US stores?", answer: "No, the Vivo X90 was only officially launched in Asian markets. USA customers must buy it through an import retailer." },
        { question: "Does the Vivo X90 support fast charging?", answer: "Yes, it supports incredibly fast 120W wired charging that can charge the phone in a very short amount of time." },
        { question: "What processor does the Vivo X90 have?", answer: "It is powered by the Mediatek Dimensity 9200, a highly capable flagship-tier processor." },
        { question: "Does the Vivo X90 have wireless charging?", answer: "No, unlike the Pro models in the series, the base Vivo X90 only supports wired charging." },
        { question: "Are the cameras good on the Vivo X90?", answer: "Yes, it features a strong 50MP main camera backed by Zeiss optics, providing excellent photo quality for its price range." }
      ],
      meta_title: "Vivo X90 Price in USA, Specs & Review",
      meta_description: "Check out the Vivo X90 in the USA. Offering flagship features like the Dimensity 9200 processor, 120W fast charging, and Zeiss cameras. See specs and price.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X90');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
