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
      name: "Vivo X70 Pro",
      slug: "vivo-x70-pro",
      brand_id: brand._id,
      price_usd: 650,
      price_display_text: "$650",
      price_status: "official",
      release_date: "September 2021",
      phone_status: "released",
      is_published: true,
      display_type: "AMOLED",
      screen_size: "6.56 inches",
      resolution: "1080 x 2376 pixels",
      refresh_rate: "120Hz",
      cpu: "Mediatek Dimensity 1200 / Exynos 1080",
      ram_variants: "8GB, 12GB",
      storage_variants: "128GB, 256GB, 512GB",
      cam_main_sensor: "50MP",
      cam_telephoto: "8MP + 12MP",
      cam_ultrawide: "12MP",
      battery_capacity: "4450 mAh",
      charging_wired: "44W",
      weight: "183g",
      has_5g: true,
      seo_overview: "The Vivo X70 Pro is a beautifully crafted smartphone that brings pro-grade photography tools into a lightweight, stylish form factor. Weighing just 183g, it is incredibly comfortable to hold while still offering a vibrant 6.56-inch AMOLED display with a buttery smooth 120Hz refresh rate. Its standout feature is undoubtedly the Zeiss-engineered quad-camera system. Unlike many phones in its price range, it includes two dedicated zoom lenses—a 2x portrait telephoto and a 5x optical periscope lens—making it exceptionally versatile for capturing subjects at any distance. Performance is snappy and reliable, driven by either the Mediatek Dimensity 1200 or Exynos 1080 processor (depending on the region of the imported model). While the 4450 mAh battery and 44W charging aren't the fastest on the market, they are more than adequate for a full day of use. Because the device was never officially launched in the United States, users must purchase it through third-party import retailers, but its stellar camera system makes it a worthy consideration.",
      verdict: "For USA buyers, the Vivo X70 Pro is an excellent import option if camera versatility is your top priority without paying ultra-premium prices. Having both a 2x portrait and a 5x periscope lens in this price bracket is rare. However, the lack of official US warranty and potential gaps in 5G network support are significant factors to consider.",
      pros: [
        "Exceptional Zeiss quad-camera system",
        "Includes both 2x and 5x optical zoom lenses",
        "Lightweight and elegant design (183g)",
        "Smooth 120Hz AMOLED display"
      ],
      cons: [
        "Not officially released in the USA",
        "Battery life and charging speed are average",
        "No wireless charging support"
      ],
      faqs: [
        { question: "Can I buy the Vivo X70 Pro in the USA?", answer: "The Vivo X70 Pro was not officially released in the US. You must purchase it through international import websites." },
        { question: "Does the Vivo X70 Pro have a periscope camera?", answer: "Yes, it features an 8MP periscope telephoto lens capable of 5x optical zoom, which is rare for its price class." },
        { question: "What processor does the Vivo X70 Pro use?", answer: "Depending on the region, it is powered by either the Mediatek Dimensity 1200 or the Samsung Exynos 1080." },
        { question: "Does the Vivo X70 Pro support wireless charging?", answer: "No, the Vivo X70 Pro only supports 44W wired fast charging." },
        { question: "Will the Vivo X70 Pro work on US cellular networks?", answer: "It will work, but network compatibility may be limited. Imported devices often lack support for specific US LTE and 5G bands." }
      ],
      meta_title: "Vivo X70 Pro Price in USA, Specs & Review",
      meta_description: "Learn about the Vivo X70 Pro in the USA. A lightweight camera powerhouse featuring a 5x periscope lens, 120Hz AMOLED screen, and Zeiss optics.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X70 Pro');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
