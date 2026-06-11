import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number) => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, samsung ${name.toLowerCase()} review, ${name.toLowerCase()} specs, samsung bangladesh`,
  meta_description: `Official and Unofficial Samsung ${name} price in Bangladesh. Read full specifications, features, in-depth review, and camera test.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} price in bd`,
  secondary_keywords: [`${name.toLowerCase()} price`, `samsung ${name.toLowerCase()} review`, `samsung ${name.toLowerCase()} specs`],
  question_keywords: [
    `what is the price of samsung ${name.toLowerCase()} in bangladesh?`,
    `is samsung ${name.toLowerCase()} good for gaming?`,
    `does samsung ${name.toLowerCase()} have an IP rating?`
  ],
  faq_schema: [
    { question: `What is the price of Samsung ${name} in Bangladesh?`, answer: `The price of Samsung ${name} starts around BDT ${price * 115}.` },
  ]
});

const phonesData = [
  {
    name: "Galaxy A52s 5G",
    slug: "samsung-galaxy-a52s-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Awesome Black", "Awesome White", "Awesome Purple", "Awesome Mint"],
    release_date: "2021-09-01",
    price_usd: 350,
    price_bdt: 40000,
    price_display_text: "BDT 40,000",
    processor: "Snapdragon 778G 5G",
    display_type: "Super AMOLED, 120Hz, 800 nits",
    screen_size: "6.5 inches",
    cam_count: "Quad",
    cam_main_sensor: "64 MP, f/1.8, OIS",
    battery_capacity: "4500 mAh",
    charging_wired: "25W wired",
    water_resistance: "IP67 dust/water resistant",
    images: ["/placeholder.jpg"],
    price_segment: "Mid-Range",
    performance_tier: "High-End",
    camera_tier: "Good",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-a53-5g", "samsung-galaxy-a52-5g"] },
    ...commonSeoFields("Galaxy A52s 5G", 350),
    overview: "The Galaxy A52s 5G remains one of Samsung's most highly praised mid-range devices, thanks to the very capable Snapdragon 778G processor which outperformed even its successor, the A53.",
    highlights: ["Snapdragon 778G", "120Hz Super AMOLED", "IP67 Rating", "Headphone Jack"],
    pros: ["Fantastic performance", "Headphone jack included", "OIS on main camera"],
    cons: ["Slightly smaller battery than newer models", "Slower 25W charging"],
    verdict: "A legendary mid-range phone that still offers great value on the used market."
  },
  {
    name: "Galaxy A72",
    slug: "samsung-galaxy-a72",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Awesome Black", "Awesome White", "Awesome Violet", "Awesome Blue"],
    release_date: "2021-03-26",
    price_usd: 400,
    price_bdt: 46000,
    price_display_text: "BDT 46,000",
    processor: "Snapdragon 720G",
    display_type: "Super AMOLED, 90Hz",
    screen_size: "6.7 inches",
    cam_count: "Quad",
    cam_main_sensor: "64 MP, f/1.8, OIS",
    cam_telephoto: "8 MP, f/2.4, OIS, 3x optical zoom",
    battery_capacity: "5000 mAh",
    charging_wired: "25W wired",
    water_resistance: "IP67 dust/water resistant",
    images: ["/placeholder.jpg"],
    price_segment: "Premium Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Excellent",
    battery_tier: "Long-Lasting",
    internal_links: { same_brand: ["samsung-galaxy-a52", "samsung-galaxy-a73-5g"] },
    ...commonSeoFields("Galaxy A72", 400),
    overview: "The Galaxy A72 offered flagship-level camera versatility with a dedicated 3x telephoto lens, making it unique in the mid-range segment.",
    highlights: ["3x Optical Telephoto Lens", "5000mAh Battery", "6.7-inch screen"],
    pros: ["Real telephoto zoom", "Great battery life", "IP67 rating"],
    cons: ["Only 90Hz refresh rate", "No 5G support", "Snapdragon 720G is quite weak"],
    verdict: "A great choice for photography lovers on a budget, though it lacks 5G."
  },
  {
    name: "Galaxy A52 5G",
    slug: "samsung-galaxy-a52-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Awesome Black", "Awesome White", "Awesome Violet", "Awesome Blue"],
    release_date: "2021-03-19",
    price_usd: 350,
    price_bdt: 40000,
    price_display_text: "BDT 40,000",
    processor: "Snapdragon 750G 5G",
    display_type: "Super AMOLED, 120Hz",
    screen_size: "6.5 inches",
    cam_count: "Quad",
    cam_main_sensor: "64 MP, f/1.8, OIS",
    battery_capacity: "4500 mAh",
    charging_wired: "25W wired",
    water_resistance: "IP67 dust/water resistant",
    images: ["/placeholder.jpg"],
    price_segment: "Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Good",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-a52", "samsung-galaxy-a52s-5g"] },
    ...commonSeoFields("Galaxy A52 5G", 350),
    overview: "The A52 5G kicked off Samsung's dominance in the premium mid-range space by offering a 120Hz display and IP67 water resistance.",
    highlights: ["120Hz AMOLED", "IP67 Rating", "Snapdragon 750G"],
    pros: ["Smooth display", "Reliable main camera", "Water resistant"],
    cons: ["Plastic back", "Processor is average"],
    verdict: "A pioneer of the modern Galaxy A-series formula."
  },
  {
    name: "Galaxy A52",
    slug: "samsung-galaxy-a52",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Awesome Black", "Awesome White", "Awesome Violet", "Awesome Blue"],
    release_date: "2021-03-26",
    price_usd: 280,
    price_bdt: 32000,
    price_display_text: "BDT 32,000",
    processor: "Snapdragon 720G",
    display_type: "Super AMOLED, 90Hz",
    screen_size: "6.5 inches",
    cam_count: "Quad",
    cam_main_sensor: "64 MP, f/1.8, OIS",
    battery_capacity: "4500 mAh",
    charging_wired: "25W wired",
    water_resistance: "IP67 dust/water resistant",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Good",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-a52-5g"] },
    ...commonSeoFields("Galaxy A52", 280),
    overview: "The 4G variant of the A52 stepped down the refresh rate to 90Hz and used the Snapdragon 720G but kept the excellent camera and water resistance.",
    highlights: ["OIS Camera", "IP67", "90Hz Screen"],
    pros: ["Cheaper than the 5G version", "Great cameras"],
    cons: ["Sluggish processor", "No 5G"],
    verdict: "Good for basic users who still want premium features."
  },
  {
    name: "Galaxy A32",
    slug: "samsung-galaxy-a32",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Awesome Black", "Awesome White", "Awesome Blue", "Awesome Violet"],
    release_date: "2021-02-25",
    price_usd: 200,
    price_bdt: 23000,
    price_display_text: "BDT 23,000",
    processor: "Helio G80",
    display_type: "Super AMOLED, 90Hz",
    screen_size: "6.4 inches",
    cam_count: "Quad",
    cam_main_sensor: "64 MP, f/1.8",
    battery_capacity: "5000 mAh",
    charging_wired: "15W wired",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Endurance",
    internal_links: { same_brand: ["samsung-galaxy-a33-5g"] },
    ...commonSeoFields("Galaxy A32", 200),
    overview: "The Galaxy A32 brought a 90Hz Super AMOLED screen to a very affordable price point, though it compromised heavily on processing power.",
    highlights: ["90Hz AMOLED", "5000mAh Battery", "64MP Camera"],
    pros: ["Great display for the price", "Excellent battery life"],
    cons: ["Very slow performance", "Slow 15W charging", "No OIS"],
    verdict: "Buy only if the screen and battery are your sole priorities."
  },
  {
    name: "Galaxy A22",
    slug: "samsung-galaxy-a22",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Black", "White", "Mint", "Violet"],
    release_date: "2021-07-01",
    price_usd: 180,
    price_bdt: 20000,
    price_display_text: "BDT 20,000",
    processor: "Helio G80",
    display_type: "Super AMOLED, 90Hz",
    screen_size: "6.4 inches",
    cam_count: "Quad",
    cam_main_sensor: "48 MP, f/1.8, OIS",
    battery_capacity: "5000 mAh",
    charging_wired: "15W wired",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Endurance",
    internal_links: { same_brand: ["samsung-galaxy-a23"] },
    ...commonSeoFields("Galaxy A22", 180),
    overview: "Surprisingly packing an OIS camera and an AMOLED display, the A22 was a very strong budget offering from Samsung.",
    highlights: ["OIS on budget", "90Hz AMOLED", "5000mAh"],
    pros: ["Camera stability", "Good display"],
    cons: ["720p resolution screen", "Slow charging"],
    verdict: "The 720p screen holds it back, but the OIS is a rare treat."
  },
  {
    name: "Galaxy A12",
    slug: "samsung-galaxy-a12",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Black", "White", "Blue", "Red"],
    release_date: "2020-12-21",
    price_usd: 150,
    price_bdt: 17000,
    price_display_text: "BDT 17,000",
    processor: "Helio P35",
    display_type: "PLS IPS",
    screen_size: "6.5 inches",
    cam_count: "Quad",
    cam_main_sensor: "48 MP, f/2.0",
    battery_capacity: "5000 mAh",
    charging_wired: "15W wired",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Endurance",
    internal_links: { same_brand: ["samsung-galaxy-a13"] },
    ...commonSeoFields("Galaxy A12", 150),
    overview: "One of the best-selling smartphones globally in 2021, the A12 was a basic reliable device for the masses.",
    highlights: ["Huge global sales", "5000mAh battery"],
    pros: ["Affordable", "Long battery life"],
    cons: ["Very slow Helio P35", "Poor screen quality"],
    verdict: "An entry-level staple that has now been vastly superseded."
  },
  {
    name: "Galaxy A71",
    slug: "samsung-galaxy-a71",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Prism Crush Black", "Silver", "Blue", "Pink"],
    release_date: "2020-01-17",
    price_usd: 350,
    price_bdt: 40000,
    price_display_text: "BDT 40,000",
    processor: "Snapdragon 730",
    display_type: "Super AMOLED Plus",
    screen_size: "6.7 inches",
    cam_count: "Quad",
    cam_main_sensor: "64 MP, f/1.8",
    battery_capacity: "4500 mAh",
    charging_wired: "25W wired",
    images: ["/placeholder.jpg"],
    price_segment: "Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Good",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-a72", "samsung-galaxy-a51"] },
    ...commonSeoFields("Galaxy A71", 350),
    overview: "The Galaxy A71 was a hit in 2020, offering a massive, beautiful screen and solid Snapdragon performance.",
    highlights: ["Super AMOLED Plus", "Snapdragon 730"],
    pros: ["Very thin and light", "Great screen size"],
    cons: ["No high refresh rate", "Plastic back prone to scratches"],
    verdict: "A classic mid-range device that paved the way for modern A-series."
  },
  {
    name: "Galaxy A51",
    slug: "samsung-galaxy-a51",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Prism Crush Black", "White", "Blue", "Pink"],
    release_date: "2019-12-16",
    price_usd: 250,
    price_bdt: 28000,
    price_display_text: "BDT 28,000",
    processor: "Exynos 9611",
    display_type: "Super AMOLED",
    screen_size: "6.5 inches",
    cam_count: "Quad",
    cam_main_sensor: "48 MP, f/2.0",
    battery_capacity: "4000 mAh",
    charging_wired: "15W wired",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-a52", "samsung-galaxy-a71"] },
    ...commonSeoFields("Galaxy A51", 250),
    overview: "Perhaps the most recognizable Samsung mid-range phone of its era, the A51 sold in massive numbers due to its sleek design and AMOLED screen.",
    highlights: ["Sleek design", "Infinity-O display"],
    pros: ["Gorgeous screen for its time", "Lightweight"],
    cons: ["Exynos 9611 was sluggish even at launch", "Small battery"],
    verdict: "A design triumph but a performance letdown."
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

    console.log("🎉 Batch 5 Part 1 (Legacy A Series) phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
