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
      name: "Vivo X200",
      slug: "vivo-x200",
      brand_id: brand._id,
      price_usd: 790,
      price_display_text: "$790",
      price_status: "official",
      release_date: "October 2024",
      phone_status: "released",
      is_published: true,
      display_type: "AMOLED",
      screen_size: "6.67 inches",
      resolution: "1260 x 2800 pixels",
      refresh_rate: "120Hz",
      cpu: "Mediatek Dimensity 9400 (3 nm)",
      ram_variants: "12GB, 16GB",
      storage_variants: "256GB, 512GB, 1TB",
      cam_main_sensor: "50MP",
      battery_capacity: "5800 mAh",
      charging_wired: "90W",
      weight: "197g",
      has_5g: true,
      seo_overview: "The Vivo X200 arrives as a highly capable flagship alternative, packing serious performance and camera hardware into a more accessible package than its Pro sibling. Powered by the same ultra-efficient Mediatek Dimensity 9400 processor built on a 3nm architecture, it delivers blazing-fast speeds and incredible energy efficiency. Photography enthusiasts will appreciate its versatile 50MP main camera setup that captures sharp, vibrant photos with signature Vivo color science. The device features a gorgeous 6.67-inch AMOLED display with a 120Hz refresh rate, ensuring that games, movies, and daily browsing look spectacular. To keep you running all day, Vivo has equipped the X200 with a massive 5800 mAh battery that charges rapidly via the included 90W wired charger. For buyers in the USA, the device must be imported since it isn't officially sold stateside, but it remains a phenomenal value for those seeking cutting-edge Android performance, premium build quality, and a top-tier camera system in a sleek 197-gram package.",
      verdict: "The Vivo X200 is an outstanding device for USA buyers willing to go the import route. It offers flagship-level performance with the Dimensity 9400 chip and a stellar 50MP camera system. While lacking official local warranty and US-specific network bands, its massive 5800 mAh battery and premium AMOLED display make it a compelling purchase for tech enthusiasts looking for high-end features at a competitive price.",
      pros: [
        "Powerful Dimensity 9400 chipset",
        "Excellent 50MP main camera system",
        "Massive 5800 mAh battery with 90W charging",
        "Vibrant 120Hz AMOLED display"
      ],
      cons: [
        "Not officially available in the USA",
        "Lacks official US warranty",
        "May have limited 5G band compatibility in the US"
      ],
      faqs: [
        { question: "Is the Vivo X200 officially sold in the United States?", answer: "No, the Vivo X200 is not officially available in the USA. Buyers must purchase it through international importers." },
        { question: "Will the Vivo X200 work with US cellular networks?", answer: "It will work, but network compatibility depends on your carrier. You should check the phone's supported LTE and 5G bands against your carrier's network." },
        { question: "What is the processor in the Vivo X200?", answer: "The Vivo X200 is powered by the Mediatek Dimensity 9400, a highly efficient 3nm flagship processor." },
        { question: "Does the Vivo X200 have good battery life?", answer: "Yes, it features a massive 5800 mAh battery that easily provides all-day use and supports ultra-fast 90W wired charging." },
        { question: "What is the display size of the Vivo X200?", answer: "It features a beautiful 6.67-inch AMOLED display with a 120Hz refresh rate and a resolution of 1260 x 2800 pixels." }
      ],
      meta_title: "Vivo X200 Price in USA, Specs & Review",
      meta_description: "Discover the Vivo X200 in the USA. Featuring a powerful Dimensity 9400 chipset, 50MP camera, and 5800 mAh battery. Check out full specs and pricing details.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X200');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
