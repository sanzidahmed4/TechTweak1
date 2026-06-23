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
      name: "Vivo X60 Pro+",
      slug: "vivo-x60-pro-plus",
      brand_id: brand._id,
      price_usd: 773,
      price_display_text: "$773",
      price_status: "official",
      release_date: "January 2021",
      phone_status: "released",
      is_published: true,
      display_type: "Super AMOLED",
      screen_size: "6.56 inches",
      resolution: "1080 x 2376 pixels",
      refresh_rate: "120Hz",
      cpu: "Snapdragon 888 (5 nm)",
      ram_variants: "8GB, 12GB",
      storage_variants: "128GB, 256GB",
      cam_main_sensor: "50MP",
      cam_telephoto: "8MP + 32MP",
      cam_ultrawide: "48MP",
      battery_capacity: "4200 mAh",
      charging_wired: "55W",
      weight: "191g",
      has_5g: true,
      seo_overview: "The Vivo X60 Pro+ represents a defining moment in smartphone photography, blending premium design with an incredibly ambitious quad-camera array. Wrapped in a luxurious eco-leather back, the device is visually striking and comfortable to hold. Photography is clearly the main focus, highlighted by a massive 50MP main sensor and a unique 48MP ultrawide camera equipped with a physical micro-gimbal for cinematic, ultra-smooth video recording. Additionally, it offers a 5x optical periscope lens and a dedicated 2x telephoto for pristine portraits, all bearing the iconic Zeiss branding. Beyond its cameras, it doesn't slouch on performance, utilizing the powerful Snapdragon 888 chipset to drive intensive applications and games without breaking a sweat. The front is dominated by a beautiful 6.56-inch Super AMOLED display with a 120Hz refresh rate. While its 4200 mAh battery is relatively modest and it lacks an official USA release, the X60 Pro+ remains a legendary piece of camera-phone history for dedicated tech enthusiasts.",
      verdict: "For smartphone photography purists in the USA, importing the Vivo X60 Pro+ offers access to one of the most versatile and capable camera systems ever made. The gimbal-stabilized ultrawide and Zeiss optics are extraordinary. However, buyers must accept the trade-offs of a smaller 4200 mAh battery, no wireless charging, and a lack of official local support.",
      pros: [
        "Phenomenal Zeiss quad-camera system",
        "Unique gimbal stabilization on the 48MP ultrawide lens",
        "High-end Snapdragon 888 performance",
        "Premium eco-leather design"
      ],
      cons: [
        "Not officially sold in the USA",
        "Battery capacity is quite small at 4200 mAh",
        "Lacks wireless charging capability"
      ],
      faqs: [
        { question: "Is the Vivo X60 Pro+ available in the United States?", answer: "No, the Vivo X60 Pro+ was not released in the US. Interested buyers must purchase it through international import sites." },
        { question: "What is special about the Vivo X60 Pro+ camera?", answer: "It features a unique 48MP ultrawide camera with physical gimbal stabilization, as well as a 50MP main sensor and two dedicated zoom lenses, all co-engineered with Zeiss." },
        { question: "Does the Vivo X60 Pro+ have wireless charging?", answer: "No, the Vivo X60 Pro+ only supports 55W fast wired charging and does not feature wireless charging." },
        { question: "What processor does the Vivo X60 Pro+ use?", answer: "It is powered by the flagship-tier Qualcomm Snapdragon 888 processor." },
        { question: "Will the Vivo X60 Pro+ work on US 5G networks?", answer: "As an imported device, it may lack compatibility with certain 5G and LTE bands used by US cellular providers, so network coverage may be limited." }
      ],
      meta_title: "Vivo X60 Pro+ Price in USA, Specs & Review",
      meta_description: "Check out the Vivo X60 Pro+ in the USA. A legendary camera phone with gimbal stabilization, Snapdragon 888, and Zeiss optics. See price and full specs.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X60 Pro+');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
