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
      name: "Vivo X60",
      slug: "vivo-x60",
      brand_id: brand._id,
      price_usd: 536,
      price_display_text: "$536",
      price_status: "official",
      release_date: "April 2021",
      phone_status: "released",
      is_published: true,
      display_type: "AMOLED",
      screen_size: "6.56 inches",
      resolution: "1080 x 2376 pixels",
      refresh_rate: "120Hz",
      cpu: "Snapdragon 870 5G",
      ram_variants: "8GB, 12GB",
      storage_variants: "128GB, 256GB",
      cam_main_sensor: "48MP",
      cam_telephoto: "13MP",
      cam_ultrawide: "13MP",
      battery_capacity: "4300 mAh",
      charging_wired: "33W",
      weight: "176g",
      has_5g: true,
      seo_overview: "The Vivo X60 is a sleek and highly capable mid-range premium device that brings flagship-level features to a more accessible price point. Weighing in at an incredibly light 176g, it boasts a gorgeous, slim profile that is very comfortable for daily use. The front is dominated by a beautiful 6.56-inch AMOLED display with a 120Hz refresh rate, delivering ultra-smooth scrolling and vibrant media playback. Performance is handled by the excellent Qualcomm Snapdragon 870 5G chipset, which strikes a perfect balance between high-end processing speed and battery efficiency. On the back, it features a highly competent triple-camera array engineered in partnership with Zeiss. This setup includes a 48MP main shooter, a 13MP ultrawide, and a 13MP dedicated portrait lens, ensuring excellent photo versatility. Its 4300 mAh battery easily provides all-day endurance, supported by 33W fast charging. While it requires importing for consumers in the USA, the X60 provides exceptional value for those seeking a slim phone with a great camera and robust performance.",
      verdict: "For USA buyers, the Vivo X60 offers fantastic value through the import market. Its incredibly thin and lightweight design, paired with the snappy Snapdragon 870 processor and quality Zeiss cameras, make it a delight to use. Just keep in mind the lack of official US warranty and potential missing 5G network bands.",
      pros: [
        "Incredibly thin and lightweight design (176g)",
        "Excellent Snapdragon 870 performance",
        "Vibrant 120Hz AMOLED display",
        "Capable Zeiss-branded triple cameras"
      ],
      cons: [
        "Not officially sold in the USA",
        "Lacks wireless charging",
        "No official domestic customer support"
      ],
      faqs: [
        { question: "Is the Vivo X60 available for purchase in the USA?", answer: "No, the Vivo X60 was not officially released in the US. You must buy it through an international third-party importer." },
        { question: "Does the Vivo X60 have a headphone jack?", answer: "No, it does not feature a 3.5mm headphone jack." },
        { question: "What processor does the Vivo X60 use?", answer: "The global version of the Vivo X60 is powered by the fast and reliable Qualcomm Snapdragon 870 5G chipset." },
        { question: "Does the Vivo X60 support wireless charging?", answer: "No, it only supports 33W wired charging." },
        { question: "Are the cameras good on the Vivo X60?", answer: "Yes, it features a versatile triple-camera setup co-engineered with Zeiss, producing excellent quality photos for its class." }
      ],
      meta_title: "Vivo X60 Price in USA, Specs & Review",
      meta_description: "Learn about the Vivo X60 in the USA. A sleek, lightweight smartphone featuring a Snapdragon 870, 120Hz AMOLED display, and Zeiss optics.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X60');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
