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
      name: "Vivo X70",
      slug: "vivo-x70",
      brand_id: brand._id,
      price_usd: 575,
      price_display_text: "$575",
      price_status: "official",
      release_date: "September 2021",
      phone_status: "released",
      is_published: true,
      display_type: "Super AMOLED",
      screen_size: "6.56 inches",
      resolution: "1080 x 2376 pixels",
      refresh_rate: "120Hz",
      cpu: "Mediatek Dimensity 1200 (6 nm)",
      ram_variants: "8GB, 12GB",
      storage_variants: "128GB, 256GB",
      cam_main_sensor: "40MP",
      cam_telephoto: "12MP",
      cam_ultrawide: "12MP",
      battery_capacity: "4400 mAh",
      charging_wired: "44W",
      weight: "181g",
      has_5g: true,
      seo_overview: "The Vivo X70 offers a fantastic balance of high-end features and striking design for tech enthusiasts exploring the imported smartphone market. Weighing a mere 181g and boasting a sleek 7.6mm profile, it is incredibly comfortable for single-handed use. It features a bright and fluid 6.56-inch Super AMOLED display with a 120Hz refresh rate, ensuring scrolling and gaming are perfectly smooth. Performance is rock-solid thanks to the highly capable Mediatek Dimensity 1200 chipset, which easily handles multitasking without draining power too rapidly. Photography is a major strength, leaning on a triple-camera system co-engineered with Zeiss. Its 40MP main sensor captures beautiful, color-accurate images, accompanied by a 12MP portrait telephoto and a 12MP ultrawide lens. While the 4400 mAh battery isn't massive by modern standards, it reliably lasts through the day and recharges quickly via the 44W included charger. Although not officially released in the USA, it remains a brilliant mid-range premium option for buyers willing to import.",
      verdict: "For USA buyers looking for a sleek, lightweight phone with a high-quality Zeiss camera, the Vivo X70 is a solid choice via international import. It offers great Dimensity 1200 performance and a beautiful 120Hz display. The trade-offs include no official local warranty, average battery life, and potential network incompatibilities on US carriers.",
      pros: [
        "Very sleek and lightweight design (181g)",
        "Excellent triple camera system with Zeiss optics",
        "Fluid 120Hz Super AMOLED display",
        "Capable Dimensity 1200 processor"
      ],
      cons: [
        "Not officially sold in the United States",
        "No official USA network or warranty support",
        "Lacks wireless charging"
      ],
      faqs: [
        { question: "Is the Vivo X70 officially sold in the USA?", answer: "No, the Vivo X70 was only launched in international markets, so US customers must purchase it through third-party importers." },
        { question: "Does the Vivo X70 have a headphone jack?", answer: "No, the Vivo X70 does not include a 3.5mm headphone jack. You will need to use Bluetooth or a USB-C adapter." },
        { question: "What processor does the Vivo X70 use?", answer: "It is powered by the fast and efficient Mediatek Dimensity 1200 chipset." },
        { question: "Does the Vivo X70 support 5G?", answer: "Yes, it is a 5G-capable device, though its compatibility with specific US 5G networks may be limited due to its international band support." },
        { question: "Are the cameras good on the Vivo X70?", answer: "Yes, the phone features a very capable 40MP main sensor and Zeiss optics, producing high-quality photos and portraits." }
      ],
      meta_title: "Vivo X70 Price in USA, Specs & Review",
      meta_description: "Explore the Vivo X70 in the USA. A lightweight 5G smartphone with a Dimensity 1200 chip, 120Hz display, and excellent Zeiss cameras. Read full specs.",
      seo_status: "Green",
      content_status: "Published"
    };

    await Phone.findOneAndUpdate({ slug: phoneData.slug }, { $set: phoneData }, { upsert: true });
    console.log('Upserted Vivo X70');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}
run();
