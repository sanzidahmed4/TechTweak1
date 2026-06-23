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
      name: "Vivo X100",
      slug: "vivo-x100",
      brand_id: brand._id,
      price_usd: 599,
      price_display_text: "$599",
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
      cam_telephoto: "64MP",
      cam_ultrawide: "50MP",
      battery_capacity: "5000 mAh",
      charging_wired: "120W",
      weight: "206g",
      has_5g: true,
      seo_overview: "The Vivo X100 redefines value in the flagship tier, offering spectacular specifications that outclass many higher-priced competitors in the USA. At its core lies the Mediatek Dimensity 9300 processor, a 4nm powerhouse that handles heavy gaming, multitasking, and media consumption with effortless efficiency. Photography is a major highlight, boasting a triple camera array engineered alongside Zeiss. This includes a 50MP main sensor and a highly capable 64MP periscope telephoto lens that delivers crystal-clear 3x optical zoom. The display is a massive 6.78-inch LTPO AMOLED panel, offering vibrant colors, incredibly smooth 120Hz scrolling, and exceptional peak brightness. Powering the experience is a robust 5000 mAh battery that practically eliminates downtime thanks to a jaw-dropping 120W wired charging speed. While it lacks official distribution in the United States, acquiring the Vivo X100 through import channels rewards buyers with an exceptionally premium Android experience without the traditional flagship price tag.",
      verdict: "The Vivo X100 is an incredibly attractive option for USA buyers seeking high-end specs on a budget, assuming you don't mind importing. With a stunning Zeiss-branded camera system, blazing-fast 120W charging, and the mighty Dimensity 9300 chipset, it punches well above its weight class. Just be prepared to navigate potential 5G band limitations on local carriers.",
      pros: [
        "Incredible value for flagship performance",
        "Excellent 64MP periscope telephoto camera",
        "Insanely fast 120W wired charging",
        "Top-tier Mediatek Dimensity 9300 chipset"
      ],
      cons: [
        "Must be imported to the USA",
        "Lacks official USA warranty and customer support",
        "No wireless charging support"
      ],
      faqs: [
        { question: "Is the Vivo X100 officially available in the USA?", answer: "No, the Vivo X100 is not officially sold by Vivo in the United States, so buyers must purchase it through third-party importers." },
        { question: "What processor does the Vivo X100 have?", answer: "It is powered by the top-tier Mediatek Dimensity 9300, providing blazing-fast speeds and high power efficiency." },
        { question: "Does the Vivo X100 camera have optical zoom?", answer: "Yes, it features a 64MP periscope telephoto camera capable of 3x optical zoom for sharp, detailed close-ups." },
        { question: "How fast does the Vivo X100 charge?", answer: "It supports ultra-fast 120W wired charging, which can fill its 5000 mAh battery in a very short amount of time." },
        { question: "Will the Vivo X100 work on US cellular networks?", answer: "It will work, but you should verify your specific carrier's 5G and LTE band compatibility, as imported models may lack support for all US bands." }
      ],
      meta_title: "Vivo X100 Price in USA, Specs & Review",
      meta_description: "Discover the Vivo X100 in the USA. Offering flagship features like the Dimensity 9300, 120W fast charging, and Zeiss cameras. Check out the specs and price.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X100');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
