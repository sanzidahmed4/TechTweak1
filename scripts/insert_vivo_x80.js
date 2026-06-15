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
      name: "Vivo X80",
      slug: "vivo-x80",
      brand_id: brand._id,
      price_usd: 800,
      price_display_text: "$800",
      price_status: "official",
      release_date: "April 2022",
      phone_status: "released",
      is_published: true,
      display_type: "AMOLED",
      screen_size: "6.78 inches",
      resolution: "1080 x 2400 pixels",
      refresh_rate: "120Hz",
      cpu: "Mediatek Dimensity 9000 (4 nm)",
      ram_variants: "8GB, 12GB",
      storage_variants: "128GB, 256GB, 512GB",
      cam_main_sensor: "50MP",
      cam_telephoto: "12MP",
      cam_ultrawide: "12MP",
      battery_capacity: "4500 mAh",
      charging_wired: "80W",
      weight: "206g",
      has_5g: true,
      seo_overview: "The Vivo X80 provides an exceptional blend of top-tier performance and high-end photography in a sleek, beautifully designed package. Powered by the incredibly capable Mediatek Dimensity 9000 chipset, this device ensures that heavy applications, intense gaming sessions, and daily multitasking are handled with absolute ease and thermal efficiency. Photography is a clear focus here, backed by a Zeiss-engineered triple camera setup that includes a 50MP main sensor capable of capturing crisp, vivid imagery and a dedicated 12MP portrait lens for beautiful background blur. Users interact with the device through a stunning 6.78-inch AMOLED display that offers vibrant colors and a fluid 120Hz refresh rate. To keep you powered throughout the day, the device packs a 4500 mAh battery that can be rapidly topped up using the included 80W fast wired charger. While USA buyers will need to purchase the Vivo X80 through third-party international importers, the device remains a stellar premium smartphone choice that undercuts the price of typical top-tier flagships.",
      verdict: "The Vivo X80 is a hidden gem for USA buyers willing to venture into the import market. It offers robust Dimensity 9000 performance, excellent Zeiss cameras, and super-fast 80W charging. While you do miss out on official domestic warranty and certain 5G bands, the overall hardware value makes it a compelling purchase.",
      pros: [
        "Highly capable Mediatek Dimensity 9000 processor",
        "Solid Zeiss triple camera system",
        "Fast 80W wired charging",
        "Vibrant 120Hz AMOLED display"
      ],
      cons: [
        "Not officially released in the US",
        "No wireless charging support",
        "Potential limited compatibility with US 5G networks"
      ],
      faqs: [
        { question: "Is the Vivo X80 officially sold in the USA?", answer: "No, the Vivo X80 was not released in the United States, meaning it must be imported through third-party websites." },
        { question: "What processor does the Vivo X80 use?", answer: "The Vivo X80 is powered by the Mediatek Dimensity 9000, a highly efficient and powerful flagship processor." },
        { question: "Does the Vivo X80 support wireless charging?", answer: "No, unlike the X80 Pro, the standard Vivo X80 only supports fast wired charging up to 80W." },
        { question: "Are the cameras on the Vivo X80 good?", answer: "Yes, it features a 50MP main camera and Zeiss optics, producing excellent photos, especially for its price." },
        { question: "Will the Vivo X80 work on my US carrier?", answer: "It will work, but network coverage may vary as imported devices often lack support for all US LTE and 5G bands." }
      ],
      meta_title: "Vivo X80 Price in USA, Specs & Review",
      meta_description: "Discover the Vivo X80 in the USA. Offering flagship-level Dimensity 9000 performance, Zeiss cameras, and 80W fast charging. Check out the specs and price.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X80');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
