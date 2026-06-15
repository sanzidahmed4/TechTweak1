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
      name: "Vivo X Fold 3",
      slug: "vivo-x-fold-3",
      brand_id: brand._id,
      price_usd: 1199,
      price_display_text: "$1,199",
      price_status: "official",
      release_date: "April 2024",
      phone_status: "released",
      is_published: true,
      display_type: "Foldable LTPO AMOLED",
      screen_size: "8.03 inches",
      resolution: "2200 x 2480 pixels",
      refresh_rate: "120Hz",
      cpu: "Snapdragon 8 Gen 2 (4 nm)",
      ram_variants: "12GB, 16GB",
      storage_variants: "256GB, 512GB, 1TB",
      cam_main_sensor: "50MP",
      cam_telephoto: "50MP",
      cam_ultrawide: "50MP",
      battery_capacity: "5500 mAh",
      charging_wired: "80W",
      weight: "219g",
      has_5g: true,
      seo_overview: "The Vivo X Fold 3 redefines expectations for foldable smartphones, delivering an incredibly lightweight chassis that rivals traditional candy-bar phones. Weighing a mere 219 grams, it is currently one of the thinnest and lightest book-style foldables ever created. But its slender profile doesn't mean it compromises on performance. Powered by the highly capable Snapdragon 8 Gen 2 processor, the X Fold 3 handles intensive gaming and heavy multitasking across its breathtaking 8.03-inch LTPO AMOLED inner display with ease. For photography, it features a versatile triple 50MP camera system, backed by Zeiss optics, which delivers sharp, true-to-life images and a solid 2x optical zoom. Furthermore, despite its slim dimensions, Vivo managed to equip the device with a substantial 5500 mAh battery, ensuring that users won't be tethered to a wall outlet throughout the day. While USA buyers must acquire it via third-party importers, the X Fold 3 offers a remarkably refined foldable experience at a more accessible price point than its 'Pro' counterpart.",
      verdict: "For USA buyers exploring the foldable market via import channels, the Vivo X Fold 3 is an outstanding option. Its incredibly lightweight design (219g), strong Snapdragon 8 Gen 2 performance, and capable Zeiss cameras make it a joy to use. While missing an official local warranty, it stands as one of the most comfortable and well-engineered foldables available today.",
      pros: [
        "Unbelievably thin and lightweight at 219g",
        "Large and vibrant 8.03-inch inner display",
        "Excellent 5500 mAh battery capacity",
        "Capable triple 50MP Zeiss camera setup"
      ],
      cons: [
        "Not officially available in the USA",
        "Uses the older Snapdragon 8 Gen 2 chip",
        "Lacks official US network band support and warranty"
      ],
      faqs: [
        { question: "Is the Vivo X Fold 3 sold in the USA?", answer: "No, the Vivo X Fold 3 is exclusively launched in China and must be imported if you live in the United States." },
        { question: "How heavy is the Vivo X Fold 3?", answer: "It is astonishingly light for a foldable, weighing just 219 grams, which is lighter than many traditional flagship phones." },
        { question: "What processor does the Vivo X Fold 3 use?", answer: "It is powered by the Qualcomm Snapdragon 8 Gen 2, which offers excellent performance and thermal efficiency." },
        { question: "Does the Vivo X Fold 3 have a good battery?", answer: "Yes, it boasts a very large 5500 mAh battery, providing excellent longevity for a foldable device." },
        { question: "What are the cameras like on the Vivo X Fold 3?", answer: "It features a very capable triple-camera system with three 50MP sensors (Main, Telephoto, and Ultrawide) enhanced by Zeiss optics." }
      ],
      meta_title: "Vivo X Fold 3 Price in USA, Specs & Review",
      meta_description: "Explore the Vivo X Fold 3 in the USA. An ultra-lightweight foldable weighing just 219g, featuring a Snapdragon 8 Gen 2 and Zeiss cameras. See full specs.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X Fold 3');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
