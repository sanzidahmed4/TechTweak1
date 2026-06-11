import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number, keywordSuffix: string = 'price in bd') => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, samsung bangladesh, ${name.toLowerCase()} specs, f series`,
  meta_description: `Official and Unofficial Samsung ${name} price in Bangladesh. Discover its camera, battery life, performance, and complete specifications.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/samsung-${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} ${keywordSuffix}`,
  secondary_keywords: [`samsung ${name.toLowerCase()} price`, `samsung ${name.toLowerCase()} specs`, `samsung ${name.toLowerCase()} review`],
  question_keywords: [
    `what is the price of samsung ${name.toLowerCase()} in bangladesh?`,
    `is samsung ${name.toLowerCase()} good for gaming?`,
    `what is the battery capacity of samsung ${name.toLowerCase()}?`
  ],
  faq_schema: [
    { question: `What is the price of Samsung ${name} in Bangladesh?`, answer: `The expected original price of the Samsung ${name} in Bangladesh is around BDT ${price * 115}. Pricing may vary based on ongoing discounts and availability.` },
    { question: `Does the Samsung ${name} support fast charging?`, answer: `Yes, Samsung's F-series typically supports at least 15W or 25W fast charging. Check the detailed specifications below.` },
    { question: `Is the Samsung ${name} good for photography?`, answer: `The F-series generally offers excellent camera performance for its price segment, often sharing sensors with the popular M and A series.` }
  ]
});

const phonesData = [
  {
    name: "Galaxy F62",
    slug: "samsung-galaxy-f62",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Laser Green", "Laser Gray", "Laser Blue"],
    release_date: "2021-02-22",
    price_usd: 330,
    price_bdt: 35000,
    price_display_text: "BDT 35,000",
    processor: "Exynos 9825",
    gpu: "Mali-G76 MP12",
    display_type: "Super AMOLED Plus",
    screen_size: "6.7 inches",
    refresh_rate: "60Hz",
    brightness: "420 nits",
    cam_count: "Quad",
    cam_main_sensor: "64 MP, f/1.8, PDAF",
    video_recording: "4K@30fps, 1080p@30fps",
    battery_capacity: "7000 mAh",
    charging_wired: "25W wired",
    wireless_charging: "No",
    ip_rating: "None",
    weight: "218 g",
    dimensions: "163.9 x 76.3 x 9.5 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Good",
    battery_tier: "Endurance",
    internal_links: { same_brand: ["samsung-galaxy-m51"] },
    ...commonSeoFields("Galaxy F62", 330),
    overview: "The Galaxy F62 caused a massive splash in the mid-range market by utilizing a flagship-grade processor (the Exynos 9825 from the Note 10 series) in a budget-friendly body. To power this hungry processor, Samsung equipped it with a monstrous 7000mAh battery, making it a heavy but incredibly enduring powerhouse. The 6.7-inch Super AMOLED Plus display provided stunning visuals, though it was restricted to a standard 60Hz refresh rate. While its thick and heavy plastic build wasn't for everyone, its raw processing power and battery life made it legendary among budget gamers and power users.",
    highlights: ["Flagship Exynos 9825 Processor", "Massive 7000mAh Battery", "6.7-inch Super AMOLED Plus"],
    pros: ["Incredible processing power for the price", "Legendary two-day battery life", "Beautiful display"],
    cons: ["Very heavy and bulky", "Only 60Hz refresh rate", "Plastic back scratches easily"],
    verdict: "An absolute powerhouse for power users, offering flagship processing speed and unparalleled battery life on a strict budget."
  },
  {
    name: "Galaxy F54 5G",
    slug: "samsung-galaxy-f54-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Meteor Blue", "Stardust Silver"],
    release_date: "2023-06-06",
    price_usd: 350,
    price_bdt: 42000,
    price_display_text: "BDT 42,000",
    processor: "Exynos 1380",
    gpu: "Mali-G68 MP5",
    display_type: "Super AMOLED Plus, 120Hz",
    screen_size: "6.7 inches",
    refresh_rate: "120Hz",
    brightness: "800 nits",
    cam_count: "Triple",
    cam_main_sensor: "108 MP, f/1.8, PDAF, OIS",
    video_recording: "4K@30fps, 1080p@30/60fps",
    battery_capacity: "6000 mAh",
    charging_wired: "25W wired",
    wireless_charging: "No",
    ip_rating: "None",
    weight: "199 g",
    dimensions: "164.9 x 77.3 x 8.4 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Premium Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Excellent",
    battery_tier: "Endurance",
    internal_links: { same_brand: ["samsung-galaxy-m54-5g", "samsung-galaxy-a54-5g"] },
    ...commonSeoFields("Galaxy F54 5G", 350),
    overview: "The Galaxy F54 5G is essentially a rebranded twin of the highly popular M54, designed to conquer the premium mid-range segment. Its main selling point is the stunning 108MP camera equipped with Optical Image Stabilization (OIS), which captures incredibly sharp photos even in low light. It boasts a beautiful, massive 6.7-inch 120Hz Super AMOLED Plus display that makes scrolling and media consumption an absolute joy. Despite housing a massive 6000mAh battery, Samsung managed to keep the phone relatively slim at 8.4mm, though it lacks the IP rating found on its A-series sibling, the A54.",
    highlights: ["108MP Camera with OIS", "6000mAh Battery", "120Hz Super AMOLED Plus Display"],
    pros: ["Stunning high-resolution camera", "Excellent battery life", "Slimmer than expected for its battery size"],
    cons: ["No IP water resistance", "No stereo speakers", "Exynos 1380 can stutter during heavy gaming"],
    verdict: "A superb multimedia and photography device that excels in battery life, but falls slightly short in premium features like water resistance."
  },
  {
    name: "Galaxy F34 5G",
    slug: "samsung-galaxy-f34-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Orchid Violet", "Mystic Green", "Meteor Black"],
    release_date: "2023-08-12",
    price_usd: 230,
    price_bdt: 26000,
    price_display_text: "BDT 26,000",
    processor: "Exynos 1280",
    gpu: "Mali-G68",
    display_type: "Super AMOLED, 120Hz",
    screen_size: "6.5 inches",
    refresh_rate: "120Hz",
    brightness: "1000 nits (peak)",
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.8, PDAF, OIS",
    video_recording: "4K@30fps, 1080p@30fps",
    battery_capacity: "6000 mAh",
    charging_wired: "25W wired",
    wireless_charging: "No",
    ip_rating: "None",
    weight: "208 g",
    dimensions: "161.7 x 77.2 x 8.8 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Good",
    battery_tier: "Endurance",
    internal_links: { same_brand: ["samsung-galaxy-m34-5g"] },
    ...commonSeoFields("Galaxy F34 5G", 230),
    overview: "The Galaxy F34 5G was launched to bring highly sought-after premium features down to an aggressive budget price. It remarkably includes Optical Image Stabilization (OIS) on its 50MP main camera—a feature very rare at this price point—which ensures steady video and sharp low-light photos. It also boasts a 6.5-inch 120Hz Super AMOLED display capable of reaching 1000 nits of peak brightness. Fueled by a massive 6000mAh battery, it can easily last two days of moderate use. However, the slightly older Exynos 1280 processor and the outdated waterdrop notch design hold it back slightly.",
    highlights: ["120Hz Super AMOLED Display", "50MP Camera with OIS", "6000mAh Battery"],
    pros: ["Incredible screen for the price", "OIS makes a big difference in photography", "Great battery life"],
    cons: ["Outdated teardrop notch design", "Thick bezels", "Processor shows its age"],
    verdict: "An amazing value-for-money phone that prioritizes screen quality and a steady camera over a modern design."
  },
  {
    name: "Galaxy F22",
    slug: "samsung-galaxy-f22",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Denim Black", "Denim Blue"],
    release_date: "2021-07-13",
    price_usd: 170,
    price_bdt: 18500,
    price_display_text: "BDT 18,500",
    processor: "Mediatek Helio G80",
    gpu: "Mali-G52 MC2",
    display_type: "Super AMOLED, 90Hz",
    screen_size: "6.4 inches",
    refresh_rate: "90Hz",
    brightness: "600 nits",
    cam_count: "Quad",
    cam_main_sensor: "48 MP, f/1.8, PDAF",
    video_recording: "1080p@30fps",
    battery_capacity: "6000 mAh",
    charging_wired: "15W wired",
    wireless_charging: "No",
    ip_rating: "None",
    weight: "203 g",
    dimensions: "159.9 x 74 x 9.3 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Endurance",
    internal_links: { same_brand: ["samsung-galaxy-m22"] },
    ...commonSeoFields("Galaxy F22", 170),
    overview: "The Galaxy F22 is a quintessential entry-level multimedia device. Its biggest strength is its 6.4-inch Super AMOLED display, which remarkably runs at a smooth 90Hz—a very rare combination at such a low price point. It also packs a massive 6000mAh battery that can last practically forever given the efficient, albeit slow, MediaTek Helio G80 processor. The primary sacrifice made here is the screen resolution, which is restricted to a relatively soft 720p. Despite this, for heavy media consumption on a strict budget, its vibrant colors and incredible battery life make it a solid choice.",
    highlights: ["90Hz Super AMOLED Display", "6000mAh Battery", "48MP Quad Camera"],
    pros: ["Extremely smooth and vibrant display", "Unbeatable battery endurance", "Great value"],
    cons: ["Only 720p screen resolution", "Slow 15W charging speed", "Sluggish processor"],
    verdict: "A perfect budget phone for users who spend their days watching YouTube and scrolling social media."
  },
  {
    name: "Galaxy F14 5G",
    slug: "samsung-galaxy-f14-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["OMG Black", "GOAT Green", "BAE Purple"],
    release_date: "2023-03-30",
    price_usd: 160,
    price_bdt: 18000,
    price_display_text: "BDT 18,000",
    processor: "Exynos 1330",
    gpu: "Mali-G68 MP2",
    display_type: "PLS LCD, 90Hz",
    screen_size: "6.6 inches",
    refresh_rate: "90Hz",
    brightness: "400 nits",
    cam_count: "Dual",
    cam_main_sensor: "50 MP, f/1.8, PDAF",
    video_recording: "1080p@30fps",
    battery_capacity: "6000 mAh",
    charging_wired: "25W wired",
    wireless_charging: "No",
    ip_rating: "None",
    weight: "206 g",
    dimensions: "166.8 x 77.2 x 9.4 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Entry-Level",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Endurance",
    internal_links: { same_brand: ["samsung-galaxy-m14-5g"] },
    ...commonSeoFields("Galaxy F14 5G", 160),
    overview: "The Galaxy F14 5G is focused purely on bringing future-proof 5G connectivity and outstanding battery life to the entry-level segment. It features the incredibly power-efficient 5nm Exynos 1330 processor, which handles daily tasks surprisingly well. Combined with the signature 6000mAh battery of the F-series, it offers multi-day endurance. While it trades the AMOLED panel for a 90Hz PLS LCD to keep costs low, the screen remains sharp at 1080p. The 50MP main camera takes acceptable daylight photos, making it a very reliable workhorse device.",
    highlights: ["5nm Exynos 1330 5G Processor", "6000mAh Battery", "6.6-inch 90Hz Full HD+ display"],
    pros: ["Affordable 5G access", "Excellent battery life", "Fluid 90Hz screen"],
    cons: ["LCD display lacks vibrancy", "Thick and quite heavy", "Cameras struggle in low light"],
    verdict: "A no-nonsense, affordable 5G smartphone that guarantees long battery life and reliable basic performance."
  }
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));
    const samsungBrand = await Brand.findOne({ name: /Samsung/i });

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    for (const phone of phonesData) {
      if (samsungBrand) (phone as any).brand_id = samsungBrand._id;
      phone.updated_at = new Date() as any;
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("🎉 Samsung Batch 14 (Popular F-Series) completed! Added 5 phones.");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
