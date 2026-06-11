import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number) => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, samsung foldable, ${name.toLowerCase()} specs, samsung bangladesh`,
  meta_description: `Official and Unofficial Samsung ${name} price in Bangladesh. Read full specifications, foldable screen features, in-depth review, and camera test.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} price in bd`,
  secondary_keywords: [`${name.toLowerCase()} price`, `samsung ${name.toLowerCase()} review`, `samsung ${name.toLowerCase()} specs`],
  question_keywords: [
    `what is the price of samsung ${name.toLowerCase()} in bangladesh?`,
    `is the hinge on samsung ${name.toLowerCase()} durable?`,
    `does samsung ${name.toLowerCase()} have an IP rating?`
  ],
  faq_schema: [
    { question: `What is the price of Samsung ${name} in Bangladesh?`, answer: `The price of Samsung ${name} starts around BDT ${price * 115}.` },
    { question: `Is the ${name} water-resistant?`, answer: `Yes, it features an IP rating for water resistance, making it durable for everyday use.` },
  ]
});

const galaxyZFold6 = {
  name: "Galaxy Z Fold 6",
  slug: "samsung-galaxy-z-fold-6",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Silver Shadow", "Pink", "Navy", "Crafted Black", "White"],
  release_date: "2024-07-24",
  price_usd: 1899,
  price_bdt: 218000,
  price_display_text: "BDT 218,000",
  processor: "Snapdragon 8 Gen 3 for Galaxy",
  display_type: "Foldable Dynamic LTPO AMOLED 2X, 120Hz",
  screen_size: "7.6 inches (Inner), 6.3 inches (Cover)",
  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  battery_capacity: "4400 mAh",
  charging_wired: "25W wired",
  water_resistance: "IP48 water/dust resistant",
  images: ["/placeholder.jpg"],
  price_segment: "Ultra Premium",
  performance_tier: "Enthusiast",
  camera_tier: "Excellent",
  battery_tier: "Standard",
  internal_links: { same_brand: ["samsung-galaxy-z-flip-6"], upcoming: ["samsung-galaxy-z-fold-7"] },
  ...commonSeoFields("Galaxy Z Fold 6", 1899),
  overview: "The Galaxy Z Fold 6 refines Samsung's foldable formula with a much lighter design, improved cover screen aspect ratio, and the powerful Snapdragon 8 Gen 3.",
  highlights: ["Lighter 239g design", "Snapdragon 8 Gen 3", "Brighter 2600 nit display"],
  pros: ["Incredibly thin and light for a foldable", "Excellent multitasking features", "Top-tier performance"],
  cons: ["Battery and cameras remain mostly unchanged from Fold 5", "Extremely expensive"],
  verdict: "The ultimate productivity phone, now more comfortable to hold than ever."
};

const galaxyZFlip6 = {
  name: "Galaxy Z Flip 6",
  slug: "samsung-galaxy-z-flip-6",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Yellow", "Silver Shadow", "Mint", "Blue"],
  release_date: "2024-07-24",
  price_usd: 1099,
  price_bdt: 126000,
  price_display_text: "BDT 126,000",
  processor: "Snapdragon 8 Gen 3 for Galaxy",
  display_type: "Foldable Dynamic LTPO AMOLED 2X, 120Hz",
  screen_size: "6.7 inches (Inner), 3.4 inches (Cover)",
  cam_count: "Dual",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  battery_capacity: "4000 mAh",
  charging_wired: "25W wired",
  water_resistance: "IP48 water/dust resistant",
  images: ["/placeholder.jpg"],
  price_segment: "Flagship",
  performance_tier: "High-End",
  camera_tier: "Excellent",
  battery_tier: "Standard",
  internal_links: { same_brand: ["samsung-galaxy-z-fold-6"], upcoming: ["samsung-galaxy-z-flip-7"] },
  ...commonSeoFields("Galaxy Z Flip 6", 1099),
  overview: "The Galaxy Z Flip 6 brings much-needed upgrades including a 50MP main camera, a larger 4000mAh battery, and a vapor chamber cooling system.",
  highlights: ["50MP main camera upgrade", "Larger 4000mAh battery", "Vapor chamber cooling"],
  pros: ["Massively improved battery life", "Great camera upgrade", "Super compact"],
  cons: ["Cover screen still 60Hz", "Slow charging speed"],
  verdict: "The best clamshell foldable for most people."
};

const galaxyZFold5 = {
  name: "Galaxy Z Fold 5",
  slug: "samsung-galaxy-z-fold-5",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Icy Blue", "Phantom Black", "Cream"],
  release_date: "2023-08-11",
  price_usd: 1799,
  price_bdt: 206000,
  price_display_text: "BDT 206,000",
  processor: "Snapdragon 8 Gen 2 for Galaxy",
  display_type: "Foldable Dynamic AMOLED 2X, 120Hz",
  screen_size: "7.6 inches (Inner), 6.2 inches (Cover)",
  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  battery_capacity: "4400 mAh",
  charging_wired: "25W wired",
  water_resistance: "IPX8 water resistant",
  images: ["/placeholder.jpg"],
  price_segment: "Ultra Premium",
  performance_tier: "High-End",
  camera_tier: "Excellent",
  battery_tier: "Standard",
  internal_links: { same_brand: ["samsung-galaxy-z-fold-6", "samsung-galaxy-z-flip-5"] },
  ...commonSeoFields("Galaxy Z Fold 5", 1799),
  overview: "The Galaxy Z Fold 5 introduced the Flex Hinge, allowing the device to fold completely flat for the first time in the series.",
  highlights: ["Gapless folding design", "Snapdragon 8 Gen 2", "Excellent multitasking"],
  pros: ["Folds flat", "Great performance", "Durable build"],
  cons: ["Narrow cover screen", "Cameras aren't S23 Ultra level"],
  verdict: "A highly refined, mature foldable."
};

const galaxyZFlip5 = {
  name: "Galaxy Z Flip 5",
  slug: "samsung-galaxy-z-flip-5",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Mint", "Graphite", "Cream", "Lavender"],
  release_date: "2023-08-11",
  price_usd: 999,
  price_bdt: 114000,
  price_display_text: "BDT 114,000",
  processor: "Snapdragon 8 Gen 2 for Galaxy",
  display_type: "Foldable Dynamic AMOLED 2X, 120Hz",
  screen_size: "6.7 inches (Inner), 3.4 inches (Cover)",
  cam_count: "Dual",
  cam_main_sensor: "12 MP, f/1.8, OIS",
  battery_capacity: "3700 mAh",
  charging_wired: "25W wired",
  water_resistance: "IPX8 water resistant",
  images: ["/placeholder.jpg"],
  price_segment: "Flagship",
  performance_tier: "High-End",
  camera_tier: "Good",
  battery_tier: "Standard",
  internal_links: { same_brand: ["samsung-galaxy-z-flip-6", "samsung-galaxy-z-fold-5"] },
  ...commonSeoFields("Galaxy Z Flip 5", 999),
  overview: "The Flip 5 brought a massive 3.4-inch Flex Window cover screen, revolutionizing how users interact with the device when closed.",
  highlights: ["Huge 3.4-inch cover screen", "Gapless hinge design", "Snapdragon 8 Gen 2"],
  pros: ["Cover screen is incredibly useful", "Folds completely flat", "Compact"],
  cons: ["Battery life is mediocre", "12MP cameras show their age"],
  verdict: "A fashionable and functional foldable."
};

const galaxyZFold4 = {
  name: "Galaxy Z Fold 4",
  slug: "samsung-galaxy-z-fold-4",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Graygreen", "Phantom Black", "Beige"],
  release_date: "2022-08-25",
  price_usd: 1799,
  price_bdt: 200000,
  price_display_text: "BDT 200,000",
  processor: "Snapdragon 8+ Gen 1",
  display_type: "Foldable Dynamic AMOLED 2X, 120Hz",
  screen_size: "7.6 inches (Inner), 6.2 inches (Cover)",
  cam_count: "Triple",
  cam_main_sensor: "50 MP, f/1.8, OIS",
  battery_capacity: "4400 mAh",
  charging_wired: "25W wired",
  water_resistance: "IPX8 water resistant",
  images: ["/placeholder.jpg"],
  price_segment: "Ultra Premium",
  performance_tier: "High-End",
  camera_tier: "Excellent",
  battery_tier: "Standard",
  internal_links: { same_brand: ["samsung-galaxy-z-fold-5"] },
  ...commonSeoFields("Galaxy Z Fold 4", 1799),
  overview: "The Z Fold 4 brought major camera upgrades and the highly efficient Snapdragon 8+ Gen 1 processor to Samsung's foldable line.",
  highlights: ["50MP main camera", "Taskbar for multitasking", "Snapdragon 8+ Gen 1"],
  pros: ["Massively improved cameras over Fold 3", "Great software optimization", "Solid battery"],
  cons: ["Visible crease", "Does not fold flat"],
  verdict: "Still a powerhouse of a productivity phone."
};

const galaxyZFlip4 = {
  name: "Galaxy Z Flip 4",
  slug: "samsung-galaxy-z-flip-4",
  phone_status: "released",
  is_published: true,
  is_official: true,
  colors: ["Bora Purple", "Graphite", "Pink Gold", "Blue"],
  release_date: "2022-08-25",
  price_usd: 999,
  price_bdt: 114000,
  price_display_text: "BDT 114,000",
  processor: "Snapdragon 8+ Gen 1",
  display_type: "Foldable Dynamic AMOLED 2X, 120Hz",
  screen_size: "6.7 inches (Inner), 1.9 inches (Cover)",
  cam_count: "Dual",
  cam_main_sensor: "12 MP, f/1.8, OIS",
  battery_capacity: "3700 mAh",
  charging_wired: "25W wired",
  water_resistance: "IPX8 water resistant",
  images: ["/placeholder.jpg"],
  price_segment: "Flagship",
  performance_tier: "High-End",
  camera_tier: "Good",
  battery_tier: "Standard",
  internal_links: { same_brand: ["samsung-galaxy-z-flip-5"] },
  ...commonSeoFields("Galaxy Z Flip 4", 999),
  overview: "The Z Flip 4 fixed the battery woes of its predecessor thanks to a larger 3700mAh cell and a more efficient processor.",
  highlights: ["Improved battery life", "Snapdragon 8+ Gen 1", "Durable build"],
  pros: ["Better battery than Flip 3", "Compact form factor"],
  cons: ["Small cover screen", "Does not fold flat"],
  verdict: "A stylish foldable that fixed the biggest flaws of the Flip 3."
};

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

    const phones = [galaxyZFold6, galaxyZFlip6, galaxyZFold5, galaxyZFlip5, galaxyZFold4, galaxyZFlip4];

    for (const phone of phones) {
      if (brandId) (phone as any).brand_id = brandId;
      phone.updated_at = new Date() as any;
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("🎉 Batch 2 (Z Series) phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
