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
      name: "Vivo X Fold",
      slug: "vivo-x-fold",
      brand_id: brand._id,
      price_usd: 1399,
      price_display_text: "$1,399",
      price_status: "official",
      release_date: "April 2022",
      phone_status: "released",
      is_published: true,
      display_type: "Foldable LTPO AMOLED",
      screen_size: "8.03 inches",
      resolution: "1916 x 2160 pixels",
      refresh_rate: "120Hz",
      cpu: "Snapdragon 8 Gen 1 (4 nm)",
      ram_variants: "12GB",
      storage_variants: "256GB, 512GB",
      cam_main_sensor: "50MP",
      cam_telephoto: "8MP + 12MP",
      cam_ultrawide: "48MP",
      battery_capacity: "4600 mAh",
      charging_wired: "66W",
      charging_wireless: "50W",
      weight: "311g",
      has_5g: true,
      seo_overview: "The original Vivo X Fold marked the company's bold entry into the foldable smartphone market, instantly setting high standards for the competition. While its 311g weight makes it a hefty device, the build quality and premium materials are undeniable. When unfolded, the device reveals a massive 8.03-inch LTPO AMOLED display with a remarkably unnoticeable crease and a fluid 120Hz refresh rate. It is powered by the top-tier Snapdragon 8 Gen 1 processor, ensuring snappy performance across productivity tasks and mobile games. Where the Vivo X Fold truly shines against other foldables is in its uncompromised camera system. Armed with Zeiss optics, it boasts a 50MP main sensor, a 5x optical periscope lens, a 2x portrait telephoto, and a 48MP ultrawide, rivaling dedicated camera phones. Though it requires USA buyers to navigate the import market, this pioneering foldable delivers an uncompromising premium Android experience with cutting-edge optical features.",
      verdict: "The Vivo X Fold is a groundbreaking foldable that brings proper flagship cameras—including a 5x periscope lens—to a folding device. For USA buyers willing to import, it offers an incredible 8.03-inch display and Snapdragon 8 Gen 1 performance. However, its heavy 311g weight and lack of official US software support are notable drawbacks to consider.",
      pros: [
        "Uncompromised Zeiss quad-camera setup",
        "Large, beautiful 8.03-inch foldable display",
        "Dual ultrasonic under-display fingerprint scanners",
        "Powerful Snapdragon 8 Gen 1 processor"
      ],
      cons: [
        "Very heavy and bulky at 311 grams",
        "Requires importing to the United States",
        "No official domestic warranty or support"
      ],
      faqs: [
        { question: "Is the Vivo X Fold officially available in the USA?", answer: "No, the Vivo X Fold was a China-exclusive release and must be purchased via third-party importers." },
        { question: "How heavy is the Vivo X Fold?", answer: "It is quite heavy, weighing in at 311 grams, making it bulkier than most modern foldables." },
        { question: "Does the Vivo X Fold have good cameras?", answer: "Yes, it features one of the best camera setups on a foldable, including a 5x periscope zoom lens and Zeiss optics." },
        { question: "What processor does the Vivo X Fold use?", answer: "It is equipped with the powerful Qualcomm Snapdragon 8 Gen 1 chipset." },
        { question: "Does the Vivo X Fold support wireless charging?", answer: "Yes, it supports fast 50W wireless charging, which is impressive for a foldable smartphone." }
      ],
      meta_title: "Vivo X Fold Price in USA, Specs & Review",
      meta_description: "Explore the Vivo X Fold in the USA. A premium foldable device featuring a Snapdragon 8 Gen 1, Zeiss quad cameras, and an 8-inch display. See full specs.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X Fold');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
