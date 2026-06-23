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
      name: "Vivo X70 Pro+",
      slug: "vivo-x70-pro-plus",
      brand_id: brand._id,
      price_usd: 1080,
      price_display_text: "$1,080",
      price_status: "official",
      release_date: "September 2021",
      phone_status: "released",
      is_published: true,
      display_type: "LTPO AMOLED",
      screen_size: "6.78 inches",
      resolution: "1440 x 3200 pixels",
      refresh_rate: "120Hz",
      cpu: "Snapdragon 888+ (5 nm)",
      ram_variants: "8GB, 12GB",
      storage_variants: "256GB, 512GB",
      cam_main_sensor: "50MP",
      cam_telephoto: "8MP + 12MP",
      cam_ultrawide: "48MP",
      battery_capacity: "4500 mAh",
      charging_wired: "55W",
      charging_wireless: "50W",
      weight: "209g",
      has_5g: true,
      seo_overview: "The Vivo X70 Pro+ stands as a monumental release in mobile photography history, cementing Vivo's reputation for building top-tier camera phones. Its standout feature is an incredibly advanced quad-camera system co-engineered with Zeiss. This includes a unique 48MP ultrawide lens equipped with a physical micro-gimbal mechanism for remarkably smooth video, alongside a 50MP main sensor, a 5x periscope lens, and a 2x portrait telephoto. Beyond its optical prowess, it is powered by the muscular Snapdragon 888+ processor, providing ample horsepower for demanding applications and mobile gaming. The visual experience is delivered through a stunning 6.78-inch LTPO AMOLED display with a crisp 1440p resolution and an adaptive 120Hz refresh rate. Backed by a solid 4500 mAh battery supporting both 55W wired and 50W wireless charging, it remains a robust device for heavy users. Although it was never officially distributed in the United States, its legendary camera capabilities continue to draw the attention of dedicated smartphone importers.",
      verdict: "For USA-based smartphone photography enthusiasts, importing the Vivo X70 Pro+ is still a tempting proposition. The gimbal-stabilized ultrawide camera and the versatility of its Zeiss quad-lens array are outstanding. While it lacks domestic 5G optimizations and official US warranty support, its hardware remains fiercely competitive even years after release.",
      pros: [
        "Legendary Zeiss quad-camera setup",
        "Unique gimbal stabilization on the ultrawide lens",
        "Powerful Snapdragon 888+ processor",
        "Gorgeous 1440p LTPO AMOLED display"
      ],
      cons: [
        "Not officially available in the USA",
        "No official domestic customer support",
        "Battery life is average for its class"
      ],
      faqs: [
        { question: "Can I buy the Vivo X70 Pro+ in the USA?", answer: "No, the Vivo X70 Pro+ was not officially launched in the United States and must be acquired through third-party import sites." },
        { question: "What makes the Vivo X70 Pro+ camera so good?", answer: "It features four highly capable lenses including a 5x periscope zoom and a 48MP ultrawide lens with physical gimbal stabilization for incredibly smooth video." },
        { question: "Does the Vivo X70 Pro+ support wireless charging?", answer: "Yes, it supports very fast 50W wireless charging as well as 55W wired charging." },
        { question: "What processor is inside the Vivo X70 Pro+?", answer: "The device is powered by the Snapdragon 888+, an overclocked version of Qualcomm's 2021 flagship processor." },
        { question: "Will the Vivo X70 Pro+ work on US carriers?", answer: "It will work to some degree, but as an imported model, it may lack full compatibility with all the 5G and LTE bands used by US networks." }
      ],
      meta_title: "Vivo X70 Pro+ Price in USA, Specs & Review",
      meta_description: "Explore the Vivo X70 Pro+ in the USA. A legendary camera phone featuring a gimbal-stabilized ultrawide lens, Snapdragon 888+, and 1440p display.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X70 Pro+');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
