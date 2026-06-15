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
      name: "Vivo X90 Pro",
      slug: "vivo-x90-pro",
      brand_id: brand._id,
      price_usd: 730,
      price_display_text: "$730",
      price_status: "official",
      release_date: "December 2022",
      phone_status: "released",
      is_published: true,
      display_type: "AMOLED",
      screen_size: "6.78 inches",
      resolution: "1260 x 2800 pixels",
      refresh_rate: "120Hz",
      cpu: "Mediatek Dimensity 9200 (4 nm)",
      ram_variants: "8GB, 12GB",
      storage_variants: "256GB, 512GB",
      cam_main_sensor: "50.3MP",
      cam_telephoto: "50MP",
      cam_ultrawide: "12MP",
      battery_capacity: "4870 mAh",
      charging_wired: "120W",
      charging_wireless: "50W",
      weight: "214.9g",
      has_5g: true,
      seo_overview: "The Vivo X90 Pro is a true photography-focused flagship that brings professional-grade optics to the palm of your hand. Its defining feature is a massive 1-inch 50.3MP primary sensor co-engineered with Zeiss, capable of capturing unprecedented detail and light in nearly any environment. Accompanied by a dedicated 50MP portrait telephoto lens, it produces striking, bokeh-rich photos that rival dedicated cameras. Beyond its camera prowess, the X90 Pro is fueled by the powerful Mediatek Dimensity 9200 chipset, delivering remarkably swift performance for heavy multitasking and demanding mobile games. Users are treated to a vibrant 6.78-inch AMOLED display with a fluid 120Hz refresh rate, ensuring an immersive viewing experience. To top it all off, the device features a reliable 4870 mAh battery supported by incredibly fast 120W wired charging, practically eliminating low-battery anxiety. While USA buyers must acquire it through import channels, the X90 Pro's premium eco-leather design and spectacular photographic capabilities make it a compelling choice for enthusiasts.",
      verdict: "For mobile photography lovers in the USA willing to import their device, the Vivo X90 Pro is a fantastic choice. The 1-inch Zeiss camera sensor is a game-changer for low-light photography and portraits. However, lacking an official US release means you won't have local warranty support, and you must verify 5G band compatibility with your carrier.",
      pros: [
        "Massive 1-inch 50.3MP main camera sensor",
        "Extremely fast 120W wired charging",
        "Powerful Dimensity 9200 processor",
        "Premium eco-leather design aesthetic"
      ],
      cons: [
        "Not officially sold in the United States",
        "No official manufacturer warranty in the US",
        "Ultrawide camera is only 12MP"
      ],
      faqs: [
        { question: "Is the Vivo X90 Pro available in the United States?", answer: "No, the Vivo X90 Pro was not officially launched in the USA. Buyers must purchase it through third-party international importers." },
        { question: "What is special about the Vivo X90 Pro camera?", answer: "It features a massive 1-inch primary camera sensor that captures significantly more light, resulting in exceptional low-light photos and natural background blur." },
        { question: "What processor does the Vivo X90 Pro use?", answer: "It uses the flagship Mediatek Dimensity 9200 chipset, providing excellent speed and thermal management." },
        { question: "How quickly does the Vivo X90 Pro charge?", answer: "It supports blazing-fast 120W wired charging, which can charge the battery to 50% in roughly 8 minutes." },
        { question: "Will the Vivo X90 Pro work on US carriers?", answer: "It will work to some extent, but as an imported device, it may lack full support for all US 5G and LTE bands." }
      ],
      meta_title: "Vivo X90 Pro Price in USA, Specs & Review",
      meta_description: "Explore the Vivo X90 Pro in the USA. Featuring a 1-inch Zeiss camera, Dimensity 9200 chipset, and 120W fast charging. Check out the price and full specs.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X90 Pro');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
