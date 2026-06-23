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
      name: "Vivo X90 Pro+",
      slug: "vivo-x90-pro-plus",
      brand_id: brand._id,
      price_usd: 900,
      price_display_text: "$900",
      price_status: "official",
      release_date: "December 2022",
      phone_status: "released",
      is_published: true,
      display_type: "LTPO4 AMOLED",
      screen_size: "6.78 inches",
      resolution: "1440 x 3200 pixels",
      refresh_rate: "120Hz",
      cpu: "Snapdragon 8 Gen 2 (4 nm)",
      ram_variants: "12GB",
      storage_variants: "256GB, 512GB",
      cam_main_sensor: "50.3MP",
      cam_telephoto: "64MP + 50MP",
      cam_ultrawide: "48MP",
      battery_capacity: "4700 mAh",
      charging_wired: "80W",
      charging_wireless: "50W",
      weight: "221g",
      has_5g: true,
      seo_overview: "The Vivo X90 Pro+ is a monumental device in the smartphone photography space, boasting a massive 1-inch main camera sensor that challenges traditional point-and-shoot cameras. Engineered with Zeiss optics, its quad-camera array includes a 64MP periscope lens and an additional 50MP portrait telephoto, making it arguably the most versatile camera phone released in its generation. Processing power is equally impressive, utilizing the Qualcomm Snapdragon 8 Gen 2 chipset to deliver blazing-fast, lag-free performance across all applications and high-end games. The visual experience is handled by a stunning 6.78-inch LTPO4 AMOLED display with an ultra-sharp 1440p resolution and a smooth 120Hz refresh rate. While the 4700 mAh battery is slightly smaller than some competitors, it charges rapidly via 80W wired or 50W wireless speeds. Although strictly an imported device for the USA market, its gorgeous eco-leather back and unparalleled camera capabilities make it a highly desirable piece of technology for mobile photography enthusiasts.",
      verdict: "For USA buyers seeking the absolute pinnacle of smartphone camera technology, the Vivo X90 Pro+ is an incredible import choice. Its 1-inch main sensor and dual telephoto lenses capture astonishing photos. The caveat is the lack of official US warranty and potential network limitations, but the raw hardware is simply unmatched.",
      pros: [
        "Incredible 1-inch main camera sensor",
        "Extremely powerful Snapdragon 8 Gen 2 chip",
        "Versatile dual-telephoto Zeiss camera system",
        "Stunning 1440p LTPO4 AMOLED display"
      ],
      cons: [
        "Only available via importing to the USA",
        "Battery capacity is a bit smaller (4700 mAh)",
        "No official warranty or technical support"
      ],
      faqs: [
        { question: "Can I buy the Vivo X90 Pro+ in the USA?", answer: "Not officially. The Vivo X90 Pro+ is a China-exclusive device, meaning US buyers must purchase it through third-party import websites." },
        { question: "What is special about the Vivo X90 Pro+ camera?", answer: "It features a massive 1-inch main sensor co-engineered with Zeiss, allowing it to capture significantly more light and detail than standard smartphone cameras." },
        { question: "What processor does the Vivo X90 Pro+ use?", answer: "It is powered by the flagship Qualcomm Snapdragon 8 Gen 2 chipset." },
        { question: "Does the Vivo X90 Pro+ support wireless charging?", answer: "Yes, it supports very fast 50W wireless charging as well as 80W wired charging." },
        { question: "Will the Vivo X90 Pro+ work on US 5G networks?", answer: "Compatibility will be limited. Since it is designed for the Chinese market, it lacks some of the essential 5G and LTE bands used by US carriers." }
      ],
      meta_title: "Vivo X90 Pro+ Price in USA, Specs & Review",
      meta_description: "Learn about the Vivo X90 Pro+ in the USA. Featuring a 1-inch 50MP camera, Snapdragon 8 Gen 2, and 1440p display. Check out the price and full specs.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X90 Pro+');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
