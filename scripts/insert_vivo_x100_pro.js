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
      name: "Vivo X100 Pro",
      slug: "vivo-x100-pro",
      brand_id: brand._id,
      price_usd: 899,
      price_display_text: "$899",
      price_status: "official",
      release_date: "November 2023",
      phone_status: "released",
      is_published: true,
      display_type: "LTPO AMOLED",
      screen_size: "6.78 inches",
      resolution: "1260 x 2800 pixels",
      refresh_rate: "120Hz",
      cpu: "Mediatek Dimensity 9300 (4 nm)",
      ram_variants: "12GB, 16GB",
      storage_variants: "256GB, 512GB, 1TB",
      cam_main_sensor: "50MP",
      cam_telephoto: "50MP",
      cam_ultrawide: "50MP",
      battery_capacity: "5400 mAh",
      charging_wired: "100W",
      charging_wireless: "50W",
      weight: "225g",
      has_5g: true,
      seo_overview: "The Vivo X100 Pro stands out as an exceptional flagship device, blending beautiful design aesthetics with top-of-the-line performance and camera capabilities. Powered by the Mediatek Dimensity 9300 chipset, this phone delivers desktop-class power while remaining highly efficient for demanding users in the USA. Its camera system is a collaboration with Zeiss, featuring a trio of 50MP sensors—including a highly capable 4.3x periscope telephoto lens—that captures breathtaking, professional-quality imagery in any lighting condition. The visual experience is anchored by a vibrant 6.78-inch LTPO AMOLED display with a 120Hz refresh rate, ensuring ultra-smooth scrolling and immersive media consumption. Battery anxiety is eliminated with a 5400 mAh battery that charges at incredibly fast 100W wired and 50W wireless speeds. While it is an imported device and requires users to be mindful of carrier network compatibility, the Vivo X100 Pro represents a superb premium alternative for mobile enthusiasts seeking cutting-edge Android innovation.",
      verdict: "For USA buyers, the Vivo X100 Pro is a fantastic import choice if you prioritize mobile photography and raw performance. The Zeiss-branded 50MP triple-camera setup is among the best in its class, and the Dimensity 9300 chipset is fiercely powerful. While lack of official US distribution and warranty are hurdles, it remains a compelling device for power users.",
      pros: [
        "Incredible Zeiss-engineered triple 50MP cameras",
        "Lightning-fast Dimensity 9300 processor",
        "Excellent 5400 mAh battery with 100W fast charging",
        "Beautiful 6.78-inch LTPO AMOLED display"
      ],
      cons: [
        "Must be imported for USA buyers",
        "No official US warranty",
        "OriginOS software may require initial tweaking"
      ],
      faqs: [
        { question: "Is the Vivo X100 Pro officially sold in the USA?", answer: "No, the Vivo X100 Pro is not officially distributed in the United States and must be purchased via international importers." },
        { question: "Does the Vivo X100 Pro camera have optical zoom?", answer: "Yes, it features a 50MP periscope telephoto lens with 4.3x optical zoom, co-engineered with Zeiss." },
        { question: "What is the processor on the Vivo X100 Pro?", answer: "The device is powered by the Mediatek Dimensity 9300, a highly capable and efficient flagship processor." },
        { question: "How fast does the Vivo X100 Pro charge?", answer: "It supports blazing-fast 100W wired charging and 50W wireless charging, filling its 5400 mAh battery very rapidly." },
        { question: "Will the Vivo X100 Pro work on US carriers?", answer: "It is compatible with some US networks, but you should verify your carrier's specific 5G and LTE bands to ensure good coverage before importing." }
      ],
      meta_title: "Vivo X100 Pro Price in USA, Specs & Review",
      meta_description: "Explore the Vivo X100 Pro in the USA. Featuring a powerful Dimensity 9300 chipset, triple 50MP Zeiss cameras, and 5400 mAh battery. See full specs.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X100 Pro');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
