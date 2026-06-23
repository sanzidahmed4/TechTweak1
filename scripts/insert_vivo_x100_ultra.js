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
      name: "Vivo X100 Ultra",
      slug: "vivo-x100-ultra",
      brand_id: brand._id,
      price_usd: 850,
      price_display_text: "$850",
      price_status: "official",
      release_date: "May 2024",
      phone_status: "released",
      is_published: true,
      display_type: "LTPO AMOLED",
      screen_size: "6.78 inches",
      resolution: "1440 x 3200 pixels",
      refresh_rate: "120Hz",
      cpu: "Snapdragon 8 Gen 3",
      ram_variants: "12GB, 16GB",
      storage_variants: "256GB, 512GB, 1TB",
      cam_main_sensor: "50MP",
      cam_telephoto: "200MP",
      cam_ultrawide: "50MP",
      battery_capacity: "5500 mAh",
      charging_wired: "80W",
      charging_wireless: "30W",
      weight: "229g",
      has_5g: true,
      seo_overview: "The Vivo X100 Ultra is a true photography powerhouse that redefines what a smartphone camera can achieve, making it a highly sought-after device for tech enthusiasts in the USA. Although exclusively launched in China, its extraordinary Zeiss-engineered camera system—highlighted by a jaw-dropping 200MP periscope telephoto lens and a 50MP main sensor—commands attention globally. Powered by the ultra-premium Snapdragon 8 Gen 3 chipset, the X100 Ultra handles demanding applications and intensive gaming with zero compromise. The visual experience is spectacular thanks to a 6.78-inch LTPO AMOLED display featuring a crisp 1440 x 3200 resolution and a peak brightness of 3000 nits. To keep the device running, Vivo packed in a robust 5500 mAh battery supporting both 80W fast wired charging and 30W wireless charging. While USA buyers must resort to importing the device and forgo an official warranty, the unparalleled combination of top-tier silicon and revolutionary optical zoom makes the X100 Ultra an elite choice for serious mobile photographers.",
      verdict: "For USA buyers willing to import, the Vivo X100 Ultra is an uncompromising masterclass in mobile photography. Its 200MP periscope lens and Snapdragon 8 Gen 3 processor deliver elite performance. The lack of official US bands and warranty are notable drawbacks, but for camera purists, it offers an experience unmatched by mainstream competitors.",
      pros: [
        "Unbelievable 200MP periscope telephoto camera",
        "Top-tier Snapdragon 8 Gen 3 performance",
        "Stunning 1440p LTPO AMOLED display",
        "Excellent 5500 mAh battery capacity"
      ],
      cons: [
        "Requires importing to the USA",
        "No official US warranty or support",
        "OriginOS may require setup for Western users"
      ],
      faqs: [
        { question: "Is the Vivo X100 Ultra available in the USA?", answer: "No, the Vivo X100 Ultra was launched exclusively in China and must be imported to the USA via third-party retailers." },
        { question: "What processor does the Vivo X100 Ultra use?", answer: "It is powered by the flagship Qualcomm Snapdragon 8 Gen 3 chipset for maximum performance and efficiency." },
        { question: "How good is the camera on the Vivo X100 Ultra?", answer: "It features a phenomenal Zeiss-branded triple camera setup, including a massive 200MP periscope telephoto lens for unmatched zoom capabilities." },
        { question: "Does the Vivo X100 Ultra support wireless charging?", answer: "Yes, it supports up to 30W wireless charging alongside its very fast 80W wired charging capabilities." },
        { question: "Will the Vivo X100 Ultra work on US 5G networks?", answer: "Compatibility is limited. Because it is a Chinese model, it may lack certain 5G and LTE bands required for full connectivity on US carriers." }
      ],
      meta_title: "Vivo X100 Ultra Price in USA, Specs & Review",
      meta_description: "Discover the Vivo X100 Ultra in the USA. Featuring a game-changing 200MP periscope camera, Snapdragon 8 Gen 3, and 5500 mAh battery. See full specs.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X100 Ultra');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
