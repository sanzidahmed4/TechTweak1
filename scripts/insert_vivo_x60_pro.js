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
      name: "Vivo X60 Pro",
      slug: "vivo-x60-pro",
      brand_id: brand._id,
      price_usd: 1050,
      price_display_text: "$1,050",
      price_status: "official",
      release_date: "April 2021",
      phone_status: "released",
      is_published: true,
      display_type: "AMOLED",
      screen_size: "6.56 inches",
      resolution: "1080 x 2376 pixels",
      refresh_rate: "120Hz",
      cpu: "Snapdragon 870 5G",
      ram_variants: "12GB",
      storage_variants: "256GB",
      cam_main_sensor: "48MP",
      cam_telephoto: "13MP",
      cam_ultrawide: "13MP",
      battery_capacity: "4200 mAh",
      charging_wired: "33W",
      weight: "179g",
      has_5g: true,
      seo_overview: "The Vivo X60 Pro (Global version) is an elegant, highly capable smartphone that places a strong emphasis on videography and design. Its standout feature is the 48MP main camera equipped with Vivo's Gimbal Stabilization 2.0. This physical micro-gimbal system counteracts hand shakes significantly better than traditional OIS, allowing users to capture incredibly smooth video and sharp low-light photography. Co-engineered with Zeiss, the triple-camera array also includes a 13MP ultrawide and a 13MP portrait telephoto lens. Under the hood, the device is powered by the dependable Qualcomm Snapdragon 870 5G chipset, providing smooth and sustained performance without severe overheating issues. Its design is notably thin and light, weighing only 179g, and features a gorgeous 6.56-inch AMOLED display with a 120Hz refresh rate. While the 4200 mAh battery and 33W charging are somewhat modest, its gimbal camera technology makes it a highly desirable import for videographers in the USA.",
      verdict: "If you prioritize capturing incredibly smooth video on a smartphone, the Vivo X60 Pro is a fascinating import option for USA buyers thanks to its unique Gimbal Stabilization 2.0 system. However, the premium import price combined with a lack of wireless charging and official US warranty makes it a niche choice suited mostly for camera enthusiasts.",
      pros: [
        "Unique Gimbal Stabilization 2.0 for buttery smooth video",
        "Very sleek, lightweight design (179g)",
        "Excellent Zeiss-branded camera system",
        "Reliable Snapdragon 870 performance"
      ],
      cons: [
        "Not officially available in the USA",
        "Small 4200 mAh battery capacity",
        "Relatively slow 33W charging compared to rivals"
      ],
      faqs: [
        { question: "Is the Vivo X60 Pro available in the USA?", answer: "No, the Vivo X60 Pro was not officially released in the US. It must be purchased via international import channels." },
        { question: "What is Gimbal Stabilization on the Vivo X60 Pro?", answer: "It is a physical mechanism built into the main 48MP camera that moves the entire lens to counteract handshakes, resulting in much smoother video than standard OIS." },
        { question: "Does the Vivo X60 Pro have a headphone jack?", answer: "No, it does not include a 3.5mm headphone jack." },
        { question: "What processor does the global Vivo X60 Pro use?", answer: "The global version of the Vivo X60 Pro is powered by the Qualcomm Snapdragon 870 5G processor." },
        { question: "Does the Vivo X60 Pro support wireless charging?", answer: "No, it only supports 33W wired charging." }
      ],
      meta_title: "Vivo X60 Pro Price in USA, Specs & Review",
      meta_description: "Learn about the Vivo X60 Pro in the USA. Featuring unique Gimbal Stabilization 2.0, a Snapdragon 870 chip, and Zeiss optics. See price and full specs.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X60 Pro');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
