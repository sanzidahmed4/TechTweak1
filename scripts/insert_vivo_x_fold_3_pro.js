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
      name: "Vivo X Fold 3 Pro",
      slug: "vivo-x-fold-3-pro",
      brand_id: brand._id,
      price_usd: 1299,
      price_display_text: "$1,299",
      price_status: "official",
      release_date: "April 2024",
      phone_status: "released",
      is_published: true,
      display_type: "Foldable LTPO AMOLED",
      screen_size: "8.03 inches",
      resolution: "2200 x 2480 pixels",
      refresh_rate: "120Hz",
      cpu: "Snapdragon 8 Gen 3",
      ram_variants: "12GB, 16GB",
      storage_variants: "256GB, 512GB, 1TB",
      cam_main_sensor: "50MP",
      cam_telephoto: "64MP",
      cam_ultrawide: "50MP",
      battery_capacity: "5700 mAh",
      charging_wired: "120W",
      charging_wireless: "50W",
      weight: "236g",
      has_5g: true,
      seo_overview: "The Vivo X Fold 3 Pro is a masterclass in foldable smartphone engineering, combining top-tier performance with an impossibly thin and lightweight design. Despite being a foldable, it weighs just 236g and packs the incredibly powerful Snapdragon 8 Gen 3 chipset, making it a dream for productivity and gaming. Photography, an area where foldables usually compromise, is superb here thanks to a Zeiss-engineered triple camera setup that includes a versatile 64MP periscope telephoto lens for stunning zoom capabilities. Unfolding the device reveals a massive, brilliant 8.03-inch LTPO AMOLED display that makes multitasking and media consumption an absolute joy. Surprisingly, Vivo managed to fit a colossal 5700 mAh battery into its slender frame, supporting lightning-fast 120W wired and 50W wireless charging. While it requires importing for consumers in the USA, the X Fold 3 Pro stands as one of the most compelling and uncompromised foldable phones on the global market.",
      verdict: "If you want the ultimate foldable experience and don't mind importing to the USA, the Vivo X Fold 3 Pro is phenomenal. It offers an uncompromising camera setup, a massive battery, and Snapdragon 8 Gen 3 performance in a shockingly slim profile. Just be aware of the lack of US warranty and potential 5G band limitations.",
      pros: [
        "Incredibly thin and light for a foldable",
        "Top-tier Snapdragon 8 Gen 3 processor",
        "Uncompromised Zeiss camera system with 64MP telephoto",
        "Massive 5700 mAh battery with fast charging"
      ],
      cons: [
        "Not officially sold in the US (import only)",
        "Expensive initial investment",
        "No official USA customer support or warranty"
      ],
      faqs: [
        { question: "Is the Vivo X Fold 3 Pro available in the USA?", answer: "No, the Vivo X Fold 3 Pro is not officially released in the US. You must purchase it through a third-party importer." },
        { question: "What processor is inside the Vivo X Fold 3 Pro?", answer: "It is powered by the flagship Qualcomm Snapdragon 8 Gen 3 processor, delivering elite performance." },
        { question: "How big is the battery on the Vivo X Fold 3 Pro?", answer: "It features a surprisingly large 5700 mAh battery that easily outlasts many other foldable smartphones." },
        { question: "Does the Vivo X Fold 3 Pro have a good camera?", answer: "Yes, it boasts a Zeiss-engineered triple camera setup, including a 50MP main sensor and a 64MP periscope lens, making it one of the best cameras on a foldable." },
        { question: "Will the Vivo X Fold 3 Pro work with US carriers?", answer: "It will connect to US networks, but you should verify your specific carrier's 5G and LTE band compatibility beforehand." }
      ],
      meta_title: "Vivo X Fold 3 Pro Price in USA, Specs & Review",
      meta_description: "Check out the Vivo X Fold 3 Pro in the USA. A premium foldable with a Snapdragon 8 Gen 3 chip, 5700 mAh battery, and Zeiss cameras. See specs and price.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X Fold 3 Pro');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
