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
    console.log('Connected to MongoDB');

    const brand = await Brand.findOne({ name: { $regex: /^vivo$/i } });
    if (!brand) {
      console.error('Vivo brand not found');
      process.exit(1);
    }

    const phoneData = {
      name: "Vivo X200 Pro",
      slug: "vivo-x200-pro",
      brand_id: brand._id,
      price_usd: 730,
      price_display_text: "$730",
      price_status: "official",
      release_date: "October 2024",
      phone_status: "released",
      is_published: true,
      display_type: "LTPO AMOLED",
      screen_size: "6.78 inches",
      resolution: "1260 x 2800 pixels",
      refresh_rate: "120Hz",
      cpu: "Mediatek Dimensity 9400 (3 nm)",
      ram_variants: "12GB, 16GB",
      storage_variants: "256GB, 512GB, 1TB",
      cam_main_sensor: "200MP",
      battery_capacity: "6000 mAh",
      charging_wired: "90W",
      charging_wireless: "30W",
      weight: "223g",
      has_5g: true,
      seo_overview: "The Vivo X200 Pro represents a major leap in mobile photography and performance, bringing flagship capabilities that easily rival the most established brands in the United States market. Powered by the incredibly efficient and blazing-fast Mediatek Dimensity 9400 chipset built on a 3nm process, it effortlessly handles heavy gaming and multitasking without skipping a beat. For photography enthusiasts, the standout feature is undoubtedly the massive 200MP main camera sensor that captures breathtaking detail, even in challenging low-light conditions. Paired with advanced computational photography, it delivers professional-grade portraits and stunning videography. The visual experience is anchored by a gorgeous 6.78-inch LTPO AMOLED display boasting a sharp 1260x2800 resolution and a dynamic 120Hz refresh rate for buttery-smooth scrolling and media consumption. All of this power is sustained by a massive 6000 mAh battery that practically eliminates range anxiety, supporting both rapid 90W wired and convenient 30W wireless charging. While not officially distributed in the US, securing an imported model gives American buyers access to one of the most capable Android devices available today, combining premium glass and aluminum aesthetics with top-tier hardware.",
      verdict: "For USA buyers willing to navigate the import market, the Vivo X200 Pro is an absolute powerhouse. It delivers an unparalleled 200MP camera experience, a massive 6000 mAh battery, and the ultra-fast Dimensity 9400 processor. While the lack of official US warranty is a drawback, the sheer hardware value and photographic prowess make it a compelling choice for tech enthusiasts and mobile photographers demanding the very best Android has to offer.",
      pros: [
        "Incredible 200MP main camera system",
        "Massive 6000 mAh battery with 90W fast charging",
        "Top-tier performance with Dimensity 9400",
        "Beautiful 6.78-inch LTPO AMOLED display"
      ],
      cons: [
        "Not officially sold in the US (requires importing)",
        "No official US manufacturer warranty",
        "Heavy at 223 grams"
      ],
      faqs: [
        { question: "Is the Vivo X200 Pro officially available in the USA?", answer: "No, the Vivo X200 Pro is not officially sold in the US. Buyers must purchase it through third-party importers, which means no official local warranty." },
        { question: "Does the Vivo X200 Pro work on US carrier networks?", answer: "Yes, but you must check the specific LTE and 5G bands of the imported model to ensure full compatibility with carriers like T-Mobile, AT&T, or Verizon." },
        { question: "What processor does the Vivo X200 Pro use?", answer: "It is powered by the top-of-the-line Mediatek Dimensity 9400 chipset, built on a highly efficient 3nm architecture for elite performance." },
        { question: "How long does the Vivo X200 Pro battery last?", answer: "With its massive 6000 mAh capacity, it easily provides all-day battery life even under heavy use, and it supports ultra-fast 90W wired charging." },
        { question: "What makes the Vivo X200 Pro camera special?", answer: "The standout feature is its massive 200MP main sensor, paired with advanced optics, which provides exceptional zoom capabilities and stunning low-light photography." }
      ],
      meta_title: "Vivo X200 Pro Price in USA, Specs & Review",
      meta_description: "Discover the Vivo X200 Pro in the USA. Featuring a stunning 200MP camera, Dimensity 9400 chipset, and massive 6000 mAh battery. See full specs and price.",
      seo_status: "Green",
      content_status: "Published"
    };

    const result = await Phone.findOneAndUpdate(
      { slug: phoneData.slug },
      { $set: phoneData },
      { upsert: true, new: true }
    );
    console.log('Successfully upserted Vivo X200 Pro:', result._id);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

run();
