import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number) => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, samsung flagship, ${name.toLowerCase()} specs, samsung bangladesh`,
  meta_description: `Official and Unofficial Samsung ${name} price in Bangladesh. Read full specifications, legacy flagship features, in-depth review, and camera test.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} price in bd`,
  secondary_keywords: [`${name.toLowerCase()} price`, `samsung ${name.toLowerCase()} review`, `samsung ${name.toLowerCase()} specs`],
  question_keywords: [
    `what is the price of samsung ${name.toLowerCase()} in bangladesh?`,
    `is samsung ${name.toLowerCase()} still worth buying?`,
    `does samsung ${name.toLowerCase()} have an IP rating?`
  ],
  faq_schema: [
    { question: `What is the price of Samsung ${name} in Bangladesh?`, answer: `The price of Samsung ${name} was around BDT ${price * 115} at launch.` },
    { question: `Is the ${name} water-resistant?`, answer: `Yes, it features an IP68 rating for water and dust resistance.` },
  ]
});

const phonesData = [
  {
    name: "Galaxy S20 Ultra",
    slug: "samsung-galaxy-s20-ultra",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Cosmic Grey", "Cosmic Black", "Cloud White"],
    release_date: "2020-03-15",
    price_usd: 1399,
    price_bdt: 160000,
    price_display_text: "BDT 160,000",
    processor: "Exynos 990 / Snapdragon 865",
    display_type: "Dynamic AMOLED 2X, 120Hz",
    screen_size: "6.9 inches",
    cam_count: "Quad",
    cam_main_sensor: "108 MP, f/1.8, OIS",
    cam_telephoto: "48 MP Periscope Telephoto, 4x optical zoom, 10x hybrid zoom",
    battery_capacity: "5000 mAh",
    charging_wired: "45W wired",
    water_resistance: "IP68 dust/water resistant",
    images: ["/placeholder.jpg"],
    price_segment: "Ultra Premium",
    performance_tier: "High-End",
    camera_tier: "Pro",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-s21-ultra-5g", "samsung-galaxy-s20-plus"] },
    ...commonSeoFields("Galaxy S20 Ultra", 1399),
    overview: "The S20 Ultra was Samsung's first 'Ultra' branded phone, introducing the massive 108MP camera and 100x Space Zoom to the world.",
    highlights: ["100x Space Zoom", "108MP Main Camera", "6.9-inch 120Hz Display"],
    pros: ["Massive beautiful screen", "Incredible camera zoom capabilities"],
    cons: ["Exynos 990 version had severe overheating issues", "Autofocus issues on launch", "Very heavy"],
    verdict: "A groundbreaking but flawed first attempt at an 'Ultra' phone."
  },
  {
    name: "Galaxy S20+",
    slug: "samsung-galaxy-s20-plus",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Cosmic Black", "Cosmic Grey", "Cloud Blue", "Cloud White", "Aura Red"],
    release_date: "2020-03-06",
    price_usd: 1199,
    price_bdt: 138000,
    price_display_text: "BDT 138,000",
    processor: "Exynos 990 / Snapdragon 865",
    display_type: "Dynamic AMOLED 2X, 120Hz",
    screen_size: "6.7 inches",
    cam_count: "Quad",
    cam_main_sensor: "12 MP, f/1.8, OIS",
    cam_telephoto: "64 MP Telephoto, 3x hybrid zoom",
    battery_capacity: "4500 mAh",
    charging_wired: "25W wired",
    water_resistance: "IP68 dust/water resistant",
    images: ["/placeholder.jpg"],
    price_segment: "Flagship",
    performance_tier: "High-End",
    camera_tier: "Excellent",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-s20-ultra", "samsung-galaxy-s20"] },
    ...commonSeoFields("Galaxy S20+", 1199),
    overview: "The Galaxy S20+ was the sweet spot of the 2020 lineup, offering a large screen without the extreme price and weight of the Ultra.",
    highlights: ["6.7-inch 120Hz Screen", "64MP Telephoto", "Slim Design"],
    pros: ["Perfect size for most", "Reliable cameras", "Beautiful design"],
    cons: ["Exynos 990 thermal issues", "120Hz only works at 1080p resolution"],
    verdict: "A much more balanced phone than the S20 Ultra."
  },
  {
    name: "Galaxy S20",
    slug: "samsung-galaxy-s20",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Cosmic Grey", "Cloud Blue", "Cloud Pink", "Cloud White"],
    release_date: "2020-03-06",
    price_usd: 999,
    price_bdt: 115000,
    price_display_text: "BDT 115,000",
    processor: "Exynos 990 / Snapdragon 865",
    display_type: "Dynamic AMOLED 2X, 120Hz",
    screen_size: "6.2 inches",
    cam_count: "Triple",
    cam_main_sensor: "12 MP, f/1.8, OIS",
    battery_capacity: "4000 mAh",
    charging_wired: "25W wired",
    water_resistance: "IP68 dust/water resistant",
    images: ["/placeholder.jpg"],
    price_segment: "Flagship",
    performance_tier: "High-End",
    camera_tier: "Excellent",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-s20-plus", "samsung-galaxy-s20-fe"] },
    ...commonSeoFields("Galaxy S20", 999),
    overview: "The base Galaxy S20 offered flagship power in a compact, easy-to-hold form factor.",
    highlights: ["Compact 6.2-inch screen", "120Hz Refresh Rate", "Flagship cameras"],
    pros: ["Very easy to hold one-handed", "Lightweight", "Same main camera as the S20+"],
    cons: ["Battery life is subpar", "Thermal throttling"],
    verdict: "A great small phone that was held back by a weak battery."
  },
  {
    name: "Galaxy S20 FE 5G",
    slug: "samsung-galaxy-s20-fe-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Cloud Lavender", "Cloud Mint", "Cloud Navy", "Cloud White", "Cloud Red", "Cloud Orange"],
    release_date: "2020-10-02",
    price_usd: 699,
    price_bdt: 80000,
    price_display_text: "BDT 80,000",
    processor: "Snapdragon 865 5G",
    display_type: "Super AMOLED, 120Hz",
    screen_size: "6.5 inches",
    cam_count: "Triple",
    cam_main_sensor: "12 MP, f/1.8, OIS",
    cam_telephoto: "8 MP Telephoto, 3x optical zoom",
    battery_capacity: "4500 mAh",
    charging_wired: "25W wired",
    water_resistance: "IP68 dust/water resistant",
    images: ["/placeholder.jpg"],
    price_segment: "Premium Mid-Range",
    performance_tier: "High-End",
    camera_tier: "Excellent",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-s20", "samsung-galaxy-s21-fe-5g"] },
    ...commonSeoFields("Galaxy S20 FE 5G", 699),
    overview: "The 'Fan Edition' took the best parts of the S20 series, added the superior Snapdragon 865 chip globally (for the 5G model), and sold it at a massive discount.",
    highlights: ["Snapdragon 865 globally", "120Hz AMOLED", "Flagship Cameras"],
    pros: ["Incredible value", "Fixed the overheating issues of the Exynos S20 series", "Great cameras"],
    cons: ["Plastic back", "Touchscreen issues on early units"],
    verdict: "One of the best phones Samsung ever made in terms of pure value."
  },
  {
    name: "Galaxy S10+",
    slug: "samsung-galaxy-s10-plus",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Prism White", "Prism Black", "Prism Green", "Prism Blue", "Canary Yellow", "Flamingo Pink", "Ceramic Black", "Ceramic White"],
    release_date: "2019-03-08",
    price_usd: 999,
    price_bdt: 115000,
    price_display_text: "BDT 115,000",
    processor: "Exynos 9820 / Snapdragon 855",
    display_type: "Dynamic AMOLED",
    screen_size: "6.4 inches",
    cam_count: "Triple",
    cam_main_sensor: "12 MP, f/1.5-2.4, OIS",
    cam_front_resolution: "10 MP + 8 MP depth sensor",
    battery_capacity: "4100 mAh",
    charging_wired: "15W wired",
    water_resistance: "IP68 dust/water resistant",
    images: ["/placeholder.jpg"],
    price_segment: "Flagship",
    performance_tier: "Mainstream",
    camera_tier: "Good",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-s10", "samsung-galaxy-s20-plus"] },
    ...commonSeoFields("Galaxy S10+", 999),
    overview: "The Galaxy S10+ was a masterpiece of smartphone design, featuring a beautiful curved AMOLED screen, a headphone jack, and expandable storage.",
    highlights: ["Headphone Jack", "Expandable Storage", "Variable Aperture Camera"],
    pros: ["Timeless design", "Included a headphone jack", "Dual front cameras"],
    cons: ["Pill-shaped cutout was intrusive", "Slow 15W charging"],
    verdict: "Often considered the peak of Samsung's classic smartphone era."
  },
  {
    name: "Galaxy S10",
    slug: "samsung-galaxy-s10",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Prism White", "Prism Black", "Prism Green", "Prism Blue"],
    release_date: "2019-03-08",
    price_usd: 899,
    price_bdt: 104000,
    price_display_text: "BDT 104,000",
    processor: "Exynos 9820 / Snapdragon 855",
    display_type: "Dynamic AMOLED",
    screen_size: "6.1 inches",
    cam_count: "Triple",
    cam_main_sensor: "12 MP, f/1.5-2.4, OIS",
    battery_capacity: "3400 mAh",
    charging_wired: "15W wired",
    water_resistance: "IP68 dust/water resistant",
    images: ["/placeholder.jpg"],
    price_segment: "Flagship",
    performance_tier: "Mainstream",
    camera_tier: "Good",
    battery_tier: "Basic",
    internal_links: { same_brand: ["samsung-galaxy-s10-plus", "samsung-galaxy-s10e"] },
    ...commonSeoFields("Galaxy S10", 899),
    overview: "The standard Galaxy S10 offered the perfect balance of size and features, retaining the triple camera setup of the Plus model in a smaller footprint.",
    highlights: ["Compact Design", "Headphone Jack", "Beautiful Display"],
    pros: ["Perfect size", "Great cameras"],
    cons: ["Battery life was very poor", "Ultrasonic fingerprint scanner was slow at launch"],
    verdict: "A great phone hampered by its small battery."
  },
  {
    name: "Galaxy S10e",
    slug: "samsung-galaxy-s10e",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Prism White", "Prism Black", "Prism Green", "Prism Blue", "Canary Yellow", "Flamingo Pink"],
    release_date: "2019-03-08",
    price_usd: 749,
    price_bdt: 86000,
    price_display_text: "BDT 86,000",
    processor: "Exynos 9820 / Snapdragon 855",
    display_type: "Dynamic AMOLED",
    screen_size: "5.8 inches",
    cam_count: "Dual",
    cam_main_sensor: "12 MP, f/1.5-2.4, OIS",
    battery_capacity: "3100 mAh",
    charging_wired: "15W wired",
    water_resistance: "IP68 dust/water resistant",
    images: ["/placeholder.jpg"],
    price_segment: "Premium Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Good",
    battery_tier: "Basic",
    internal_links: { same_brand: ["samsung-galaxy-s10"] },
    ...commonSeoFields("Galaxy S10e", 749),
    overview: "The 'Essential' Galaxy S10e was a flat-screened, incredibly compact flagship that many fans still beg Samsung to recreate today.",
    highlights: ["Flat 5.8-inch display", "Side-mounted fingerprint scanner", "Flagship Processor"],
    pros: ["Extremely comfortable to hold", "Flat screen means no accidental touches", "Fast physical fingerprint scanner"],
    cons: ["Very poor battery life", "Missing the telephoto lens"],
    verdict: "A cult classic among small phone enthusiasts."
  }
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const BrandSchema = new mongoose.Schema({}, { strict: false });
    const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
    
    const samsungBrand = await Brand.findOne({ name: /Samsung/i });
    let brandId = null;
    if (samsungBrand) brandId = samsungBrand._id;

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    for (const phone of phonesData) {
      if (brandId) (phone as any).brand_id = brandId;
      phone.updated_at = new Date() as any;
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("🎉 Batch 5 Part 2 (Legacy S Series) phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
