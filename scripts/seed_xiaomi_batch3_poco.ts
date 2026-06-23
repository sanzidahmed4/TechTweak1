import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number, keywordSuffix: string = 'price in bd') => ({
  meta_title: `POCO ${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `poco ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, poco bangladesh, ${name.toLowerCase()} specs, best gaming phone`,
  meta_description: `Official and Unofficial POCO ${name} price in Bangladesh. Read full specifications, extreme gaming tests, thermal performance, and our honest review.`,
  canonical_url: `https://www.techtweak.tech/phones/xiaomi/poco-${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `poco ${name.toLowerCase()} ${keywordSuffix}`,
  secondary_keywords: [`poco ${name.toLowerCase()} price`, `poco ${name.toLowerCase()} gaming test`, `poco ${name.toLowerCase()} specs`],
  question_keywords: [
    `what is the price of poco ${name.toLowerCase()} in bangladesh?`,
    `is poco ${name.toLowerCase()} good for pubg and free fire?`,
    `does poco ${name.toLowerCase()} overheat?`
  ],
  faq_schema: [
    { question: `What is the price of POCO ${name} in Bangladesh?`, answer: `The POCO ${name} is available in Bangladesh at an expected starting price of BDT ${price * 115}.` },
    { question: `Is the POCO ${name} the best gaming phone under its budget?`, answer: `POCO devices are specifically tuned for gaming, usually offering the most powerful processors in their respective price segments.` },
    { question: `Does the POCO ${name} support 5G?`, answer: `Please check the network section in the specs below; however, most modern POCO X and F series phones support 5G.` }
  ]
});

const phonesData = [
  {
    name: "X6 Pro 5G",
    slug: "poco-x6-pro-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Black", "Yellow", "Grey"],
    release_date: "2024-01-11",
    price_usd: 300,
    price_bdt: 34500,
    price_display_text: "BDT 34,500",
    processor: "Dimensity 8300 Ultra",
    gpu: "Mali G615-MC6",
    display_type: "AMOLED, 68B colors, 120Hz",
    screen_size: "6.67 inches",
    refresh_rate: "120Hz",
    brightness: "1800 nits (peak)",
    cam_count: "Triple",
    cam_main_sensor: "64 MP, f/1.7, OIS",
    video_recording: "4K@24/30fps, 1080p@30/60fps",
    battery_capacity: "5000 mAh",
    charging_wired: "67W wired",
    wireless_charging: "No",
    ip_rating: "IP54, dust and splash resistant",
    weight: "186 g (plastic) / 190 g (vegan leather)",
    dimensions: "160.5 x 74.3 x 8.3 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Mid-Range",
    performance_tier: "High-End", // Massive performance for the price
    camera_tier: "Good",
    battery_tier: "Standard",
    internal_links: { same_brand: ["poco-x6-5g", "poco-f5-5g"] },
    ...commonSeoFields("X6 Pro 5G", 300),
    overview: "The POCO X6 Pro 5G is a masterclass in aggressive pricing and raw horsepower. Equipped with the astonishingly fast MediaTek Dimensity 8300 Ultra processor and lightning-fast UFS 4.0 storage, this phone delivers benchmark scores that rival flagship devices costing twice as much. The device isn't just about raw power; it features a brilliant 1.5K AMOLED display with razor-thin bezels, offering a highly immersive gaming and media experience. It is one of the first phones to ship with Xiaomi's new HyperOS right out of the box. The iconic POCO yellow variant comes with a grippy vegan leather back, adding a touch of distinct personality.",
    highlights: ["Dimensity 8300 Ultra Processor", "UFS 4.0 Fast Storage", "HyperOS out of the box"],
    pros: ["Flagship-level gaming performance", "Excellent 1.5K display", "Great value for money"],
    cons: ["Average camera performance", "Prone to slight warming under extreme load"],
    verdict: "If your primary goal is maximizing gaming performance per dollar, the POCO X6 Pro has absolutely no equal in the mid-range segment."
  },
  {
    name: "X6 5G",
    slug: "poco-x6-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Black", "White", "Blue"],
    release_date: "2024-01-11",
    price_usd: 250,
    price_bdt: 28000,
    price_display_text: "BDT 28,000",
    processor: "Snapdragon 7s Gen 2",
    gpu: "Adreno 710",
    display_type: "AMOLED, 68B colors",
    screen_size: "6.67 inches",
    refresh_rate: "120Hz",
    brightness: "1800 nits (peak)",
    cam_count: "Triple",
    cam_main_sensor: "64 MP, f/1.8, OIS",
    video_recording: "4K@30fps, 1080p@30/60fps",
    battery_capacity: "5100 mAh",
    charging_wired: "67W wired",
    wireless_charging: "No",
    ip_rating: "IP54, dust and splash resistant",
    weight: "181 g",
    dimensions: "161.2 x 74.3 x 8 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Mainstream",
    camera_tier: "Basic",
    battery_tier: "Long-Lasting",
    internal_links: { same_brand: ["poco-x6-pro-5g", "poco-m6-pro"] },
    ...commonSeoFields("X6 5G", 250),
    overview: "While the Pro version gets all the headlines, the standard POCO X6 5G is a phenomenally well-balanced device. Essentially a rebranded Redmi Note 13 Pro (with a different main camera), it boasts the exact same gorgeous 1.5K AMOLED display and the reliable Snapdragon 7s Gen 2 chipset. It’s designed for users who want a smooth, stutter-free daily experience with light to medium gaming on the side. The inclusion of OIS on the 64MP main camera ensures sharp photos, and the 5100mAh battery paired with 67W charging means you will rarely have battery anxiety.",
    highlights: ["Snapdragon 7s Gen 2", "1.5K AMOLED Display", "64MP Camera with OIS"],
    pros: ["Fantastic, bright display", "Great battery life", "Solid, stable performance"],
    cons: ["Shiny plastic back is a fingerprint magnet", "Bloatware requires manual removal"],
    verdict: "A superb all-rounder that prioritizes a great screen, solid battery, and stable performance for a very affordable price."
  },
  {
    name: "F5 5G",
    slug: "poco-f5-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Black", "Blue", "White"],
    release_date: "2023-05-09",
    price_usd: 350,
    price_bdt: 40000,
    price_display_text: "BDT 40,000",
    processor: "Snapdragon 7+ Gen 2",
    gpu: "Adreno 725",
    display_type: "AMOLED, 68B colors",
    screen_size: "6.67 inches",
    refresh_rate: "120Hz",
    brightness: "1000 nits (peak)",
    cam_count: "Triple",
    cam_main_sensor: "64 MP, f/1.8, OIS",
    video_recording: "4K@30fps, 1080p@30/60/120fps",
    battery_capacity: "5000 mAh",
    charging_wired: "67W wired",
    wireless_charging: "No",
    ip_rating: "IP53, dust and splash resistant",
    weight: "181 g",
    dimensions: "161.1 x 75 x 7.9 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Mid-Range",
    performance_tier: "High-End",
    camera_tier: "Good",
    battery_tier: "Standard",
    internal_links: { same_brand: ["poco-x6-pro-5g"] },
    ...commonSeoFields("F5 5G", 350),
    overview: "The POCO F5 disrupted the mid-range market by being the first device to utilize the legendary Snapdragon 7+ Gen 2 processor, a chip that basically offered Snapdragon 8+ Gen 1 performance in a cheaper package. This resulted in absolutely stunning gaming performance, thermal stability, and battery efficiency. Beyond the chip, it features a remarkably slim and light profile (just 181g), a beautiful 120Hz AMOLED panel, and a rare 3.5mm headphone jack—a feature gamers truly appreciate. While the camera isn't the main focus, the 64MP OIS sensor does an adequate job for daily social media use.",
    highlights: ["Snapdragon 7+ Gen 2 Processor", "Ultra-slim 7.9mm profile", "Includes 3.5mm Headphone Jack"],
    pros: ["Unbeatable sustained performance", "Lightweight and comfortable to hold", "Excellent battery efficiency"],
    cons: ["Plastic build doesn't feel premium", "Average low-light camera performance"],
    verdict: "A legendary gaming phone that proved you don't need an '8-series' Snapdragon to achieve flawless high-end performance."
  }
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));
    const xiaomiBrand = await Brand.findOne({ name: /Xiaomi/i });

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    for (const phone of phonesData) {
      if (xiaomiBrand) (phone as any).brand_id = xiaomiBrand._id;
      phone.updated_at = new Date() as any;
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("🎉 Phase 2 Batch 3 (POCO Series) completed successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
