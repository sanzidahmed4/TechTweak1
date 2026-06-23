import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number) => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Rumors`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, upcoming samsung, ${name.toLowerCase()} rumors, samsung bangladesh`,
  meta_description: `Latest rumors, expected price, and specifications for the upcoming Samsung ${name} in Bangladesh.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} price in bd`,
  secondary_keywords: [`${name.toLowerCase()} rumors`, `samsung ${name.toLowerCase()} release date`, `samsung ${name.toLowerCase()} specs`],
  question_keywords: [
    `what is the expected price of samsung ${name.toLowerCase()} in bangladesh?`,
    `when will samsung ${name.toLowerCase()} be released?`,
    `what are the leaked specs of samsung ${name.toLowerCase()}?`
  ],
  faq_schema: [
    { question: `What is the expected price of Samsung ${name} in Bangladesh?`, answer: `The Samsung ${name} is expected to start around BDT ${price * 115}. However, this is based on leaks and rumors.` },
    { question: `When will the Samsung ${name} be released?`, answer: `The official release date is not yet confirmed, but it is expected to launch later this year or early next year.` },
  ]
});

const phonesData = [
  {
    name: "Galaxy Z Fold 6 Slim",
    slug: "samsung-galaxy-z-fold-6-slim",
    phone_status: "upcoming",
    is_published: true,
    is_official: false,
    expected_launch_date: "2024-10-15",
    launch_year: 2024,
    launch_quarter: "Q4",
    leak_confidence: "High",
    price_usd: null,
    price_display_text: "Not Announced Yet",
    processor: "Snapdragon 8 Gen 3 for Galaxy",
    display_type: "Foldable Dynamic LTPO AMOLED 2X, 120Hz",
    screen_size: "8.0 inches (Inner), 6.5 inches (Cover)",
    cam_count: "Triple",
    cam_main_sensor: "200 MP, f/1.7, OIS (Rumored)",
    battery_capacity: "Expected 4400 mAh",
    charging_wired: "25W wired",
    images: ["/placeholder.jpg"],
    price_segment: "Ultra Premium",
    performance_tier: "Enthusiast",
    camera_tier: "Pro",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-z-fold-6"], upcoming: ["samsung-galaxy-z-flip-fe"] },
    ...commonSeoFields("Galaxy Z Fold 6 Slim", 2100),
    overview: "Rumors suggest Samsung is working on an ultra-thin version of the Z Fold 6, potentially featuring a titanium body and larger screens, aimed at the highest end of the market.",
    highlights: ["Ultra-thin design", "Larger 8-inch inner display", "Titanium frame (Rumored)"],
    pros: ["Thinner and lighter than the standard Fold 6", "Bigger screens"],
    cons: ["Expected to be extremely expensive", "May lack S-Pen support due to thinness"],
    verdict: "An upcoming ultra-premium device for those who want the thinnest foldable possible."
  },
  {
    name: "Galaxy Z Flip FE",
    slug: "samsung-galaxy-z-flip-fe",
    phone_status: "upcoming",
    is_published: true,
    is_official: false,
    expected_launch_date: "2025-02-10",
    launch_year: 2025,
    launch_quarter: "Q1",
    leak_confidence: "Moderate",
    price_usd: null,
    price_display_text: "Not Announced Yet",
    processor: "Exynos 2400e (Rumored)",
    display_type: "Foldable Dynamic AMOLED 2X, 120Hz",
    screen_size: "6.7 inches (Inner), smaller cover screen",
    cam_count: "Dual",
    cam_main_sensor: "50 MP, f/1.8, OIS",
    battery_capacity: "Expected 4000 mAh",
    charging_wired: "25W wired",
    images: ["/placeholder.jpg"],
    price_segment: "Premium Mid-Range",
    performance_tier: "High-End",
    camera_tier: "Good",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-z-flip-6"], upcoming: ["samsung-galaxy-z-fold-6-slim"] },
    ...commonSeoFields("Galaxy Z Flip FE", 700),
    overview: "Samsung is widely rumored to be developing a 'Fan Edition' of their popular Z Flip line, aiming to bring foldable technology to a much lower price point.",
    highlights: ["More affordable foldable", "Exynos 2400e processor", "Flagship-tier main camera"],
    pros: ["Lower barrier to entry for foldables", "Still retains the compact flip form factor"],
    cons: ["Likely to use a weaker processor", "Smaller cover screen compared to Flip 6"],
    verdict: "If priced right, this could be the phone that makes foldables mainstream."
  },
  {
    name: "Galaxy A57",
    slug: "samsung-galaxy-a57",
    phone_status: "upcoming",
    is_published: true,
    is_official: false,
    expected_launch_date: "2026-03-15",
    launch_year: 2026,
    launch_quarter: "Q1",
    leak_confidence: "Low",
    price_usd: null,
    price_display_text: "Not Announced Yet",
    processor: "Exynos 1680 (Rumored)",
    display_type: "Super AMOLED, 120Hz",
    screen_size: "6.6 inches",
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.8, OIS",
    battery_capacity: "Expected 5000 mAh",
    charging_wired: "45W wired (Rumored)",
    images: ["/placeholder.jpg"],
    price_segment: "Premium Mid-Range",
    performance_tier: "High-End",
    camera_tier: "Good",
    battery_tier: "Long-Lasting",
    internal_links: { same_brand: ["samsung-galaxy-a56"], upcoming: ["samsung-galaxy-a37"] },
    ...commonSeoFields("Galaxy A57", 450),
    overview: "Looking far ahead, the Galaxy A57 will be the 2026 iteration of Samsung's best-selling premium mid-range line. Details are scarce, but expectations point to AI features trickling down from the S-series.",
    highlights: ["Galaxy AI features expected", "Next-gen Exynos mid-range chip", "45W fast charging rumored"],
    pros: ["Will bring flagship AI features to a lower price point", "Long software support expected"],
    cons: ["Very early in development, specs may change significantly"],
    verdict: "A phone to look forward to in 2026."
  },
  {
    name: "Galaxy A37",
    slug: "samsung-galaxy-a37",
    phone_status: "upcoming",
    is_published: true,
    is_official: false,
    expected_launch_date: "2026-03-15",
    launch_year: 2026,
    launch_quarter: "Q1",
    leak_confidence: "Low",
    price_usd: null,
    price_display_text: "Not Announced Yet",
    processor: "Exynos 1480 (Rumored)",
    display_type: "Super AMOLED, 120Hz",
    screen_size: "6.6 inches",
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.8, OIS",
    battery_capacity: "Expected 5000 mAh",
    charging_wired: "25W wired",
    images: ["/placeholder.jpg"],
    price_segment: "Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Good",
    battery_tier: "Long-Lasting",
    internal_links: { same_brand: ["samsung-galaxy-a36"], upcoming: ["samsung-galaxy-a57"] },
    ...commonSeoFields("Galaxy A37", 350),
    overview: "The Galaxy A37 will be the affordable sibling to the A57, expected to feature the reliable Exynos 1480 from previous generations but with updated software and design.",
    highlights: ["120Hz AMOLED", "OIS Camera", "Expected Android 16"],
    pros: ["Solid mid-range value", "Reliable update schedule"],
    cons: ["May reuse older processor architectures"],
    verdict: "Too early to tell, but will likely be a very popular mid-ranger."
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

    console.log("🎉 Batch 5 Part 4 (Upcoming) phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
