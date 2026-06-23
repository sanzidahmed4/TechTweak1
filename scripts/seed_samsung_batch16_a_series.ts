import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number, keywordSuffix: string = 'price in bd') => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, samsung bangladesh, ${name.toLowerCase()} specs, a series`,
  meta_description: `Official and Unofficial Samsung ${name} price in Bangladesh. Dive into its design, camera quality, gaming performance, and complete specifications.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/samsung-${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} ${keywordSuffix}`,
  secondary_keywords: [`samsung ${name.toLowerCase()} price`, `samsung ${name.toLowerCase()} specs`, `samsung ${name.toLowerCase()} review`],
  question_keywords: [
    `what is the price of samsung ${name.toLowerCase()} in bangladesh?`,
    `is samsung ${name.toLowerCase()} waterproof?`,
    `does samsung ${name.toLowerCase()} support 5g?`
  ],
  faq_schema: [
    { question: `What is the price of Samsung ${name} in Bangladesh?`, answer: `The expected original price of the Samsung ${name} in Bangladesh is around BDT ${price * 115}. Check local stores for exact current pricing.` },
    { question: `Is the Samsung ${name} waterproof?`, answer: `Please refer to the specifications below. Samsung typically reserves IP67 water resistance for the higher-end A5X and A7X models.` },
    { question: `Is the Samsung ${name} good for gaming?`, answer: `It handles casual gaming perfectly well, but for heavy 3D games, performance depends on the specific processor detailed below.` }
  ]
});

const phonesData = [
  {
    name: "Galaxy A71 5G",
    slug: "samsung-galaxy-a71-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Prism Cube Black", "Prism Cube Sliver", "Prism Cube Blue"],
    release_date: "2020-06-15",
    price_usd: 600,
    price_bdt: 68000,
    price_display_text: "BDT 68,000",
    processor: "Exynos 980 / Snapdragon 765G",
    gpu: "Mali-G76 MP5 / Adreno 620",
    display_type: "Super AMOLED Plus",
    screen_size: "6.7 inches",
    refresh_rate: "60Hz",
    brightness: "400 nits",
    cam_count: "Quad",
    cam_main_sensor: "64 MP, f/1.8, PDAF",
    video_recording: "4K@30fps, 1080p@30/240fps",
    battery_capacity: "4500 mAh",
    charging_wired: "25W wired",
    wireless_charging: "No",
    ip_rating: "None",
    weight: "185 g",
    dimensions: "162.5 x 75.5 x 8.1 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Premium Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Good",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-a51-5g", "samsung-galaxy-a72"] },
    ...commonSeoFields("Galaxy A71 5G", 600),
    overview: "The Galaxy A71 5G was one of Samsung's first major pushes to bring 5G connectivity to the premium mid-range market. Building upon the massive success of the 4G A71, it retained the gorgeous, massive 6.7-inch Super AMOLED Plus display that made it a media consumption powerhouse. Depending on the market, it featured either the Exynos 980 or the Snapdragon 765G, both of which provided excellent daily performance and solid gaming capabilities. The premium 'Glasstic' back featured a unique prismatic pattern. However, the lack of a high refresh rate screen and water resistance kept it from feeling like a true flagship killer.",
    highlights: ["Massive 6.7-inch Super AMOLED Plus", "5G Connectivity", "Excellent 64MP Quad Camera"],
    pros: ["Beautiful, large display", "Great battery life with 25W charging", "Very capable processor for the price"],
    cons: ["Only a 60Hz refresh rate", "No IP water resistance rating", "Plastic back feels less premium"],
    verdict: "A superb large-screen mid-ranger that successfully brought 5G to the A-series, held back only by its 60Hz display."
  },
  {
    name: "Galaxy A51 5G",
    slug: "samsung-galaxy-a51-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Prism Cube Black", "Prism Cube White", "Prism Cube Pink"],
    release_date: "2020-04-29",
    price_usd: 500,
    price_bdt: 55000,
    price_display_text: "BDT 55,000",
    processor: "Exynos 980",
    gpu: "Mali-G76 MP5",
    display_type: "Super AMOLED",
    screen_size: "6.5 inches",
    refresh_rate: "60Hz",
    brightness: "400 nits",
    cam_count: "Quad",
    cam_main_sensor: "48 MP, f/2.0, PDAF",
    video_recording: "4K@30fps, 1080p@30/120fps",
    battery_capacity: "4500 mAh",
    charging_wired: "15W wired",
    wireless_charging: "No",
    ip_rating: "None",
    weight: "187 g",
    dimensions: "158.9 x 73.6 x 8.7 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Good",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-a71-5g", "samsung-galaxy-a52-5g"] },
    ...commonSeoFields("Galaxy A51 5G", 500),
    overview: "The Galaxy A51 5G took the world's best-selling Android phone (the 4G A51) and significantly upgraded its internals. Beyond just adding a 5G modem, Samsung swapped the sluggish Exynos 9611 for the vastly superior Exynos 980, completely transforming the phone's performance profile from sluggish to snappy. It also received a battery bump to 4500mAh to handle the 5G drain, making the phone noticeably heavier and thicker. The stunning 6.5-inch Super AMOLED screen remained, making it a fantastic all-rounder. However, like the A71 5G, it lacked high refresh rates and water resistance.",
    highlights: ["Huge performance boost over 4G model", "Gorgeous 6.5-inch Super AMOLED", "4500mAh battery"],
    pros: ["Excellent, snappy performance", "Beautiful display", "Reliable battery life"],
    cons: ["Thicker and heavier than the sleek 4G version", "Only 15W charging is very slow", "60Hz display"],
    verdict: "A massive internal upgrade over the standard A51 that delivered true mid-range performance and 5G connectivity."
  },
  {
    name: "Galaxy A31",
    slug: "samsung-galaxy-a31",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Prism Crush Black", "Prism Crush Blue", "Prism Crush Red", "Prism Crush White"],
    release_date: "2020-04-27",
    price_usd: 230,
    price_bdt: 25000,
    price_display_text: "BDT 25,000",
    processor: "Mediatek Helio P65",
    gpu: "Mali-G52 MC2",
    display_type: "Super AMOLED",
    screen_size: "6.4 inches",
    refresh_rate: "60Hz",
    brightness: "400 nits",
    cam_count: "Quad",
    cam_main_sensor: "48 MP, f/2.0, PDAF",
    video_recording: "1080p@30fps",
    battery_capacity: "5000 mAh",
    charging_wired: "15W wired",
    wireless_charging: "No",
    ip_rating: "None",
    weight: "185 g",
    dimensions: "159.3 x 73.1 x 8.6 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Long-Lasting",
    internal_links: { same_brand: ["samsung-galaxy-a32", "samsung-galaxy-a21s"] },
    ...commonSeoFields("Galaxy A31", 230),
    overview: "The Galaxy A31 was designed for users who wanted the premium Super AMOLED screen of the A51 without paying the premium price. It offered a beautiful 6.4-inch 1080p AMOLED display, which was rare in its specific price bracket. It also boasted a massive 5000mAh battery, guaranteeing incredible endurance for daily tasks. However, the use of the MediaTek Helio P65 processor meant that while the screen looked great, the phone felt sluggish to use. Multi-tasking and gaming were noticeably slow, making it a phone meant strictly for light usage and media consumption.",
    highlights: ["6.4-inch 1080p Super AMOLED Display", "Massive 5000mAh Battery", "In-display fingerprint scanner"],
    pros: ["Fantastic screen quality for the price", "Excellent battery life", "Premium-looking design"],
    cons: ["Helio P65 processor is very slow", "Noticeable UI lag", "Slow 15W charging"],
    verdict: "A beautifully designed budget phone with a stunning screen, heavily bottlenecked by a weak processor."
  },
  {
    name: "Galaxy A15 4G",
    slug: "samsung-galaxy-a15",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Brave Black", "Optimistic Blue", "Magical Blue", "Personality Yellow"],
    release_date: "2023-12-11",
    price_usd: 180,
    price_bdt: 20000,
    price_display_text: "BDT 20,000",
    processor: "Mediatek Helio G99",
    gpu: "Mali-G57 MC2",
    display_type: "Super AMOLED, 90Hz",
    screen_size: "6.5 inches",
    refresh_rate: "90Hz",
    brightness: "800 nits",
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.8, AF",
    video_recording: "1080p@30fps",
    battery_capacity: "5000 mAh",
    charging_wired: "25W wired",
    wireless_charging: "No",
    ip_rating: "None",
    weight: "200 g",
    dimensions: "160.1 x 76.8 x 8.4 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Long-Lasting",
    internal_links: { same_brand: ["samsung-galaxy-a15-5g", "samsung-galaxy-a25-5g"] },
    ...commonSeoFields("Galaxy A15 4G", 180),
    overview: "The Galaxy A15 4G is a monumental release for Samsung's budget lineup because it finally brought a Super AMOLED display to the A1X series. For years, this price tier was stuck with inferior LCD panels. Not only is it a 90Hz AMOLED screen, but it also reaches 800 nits of brightness, making it entirely visible outdoors. Furthermore, Samsung equipped it with the highly reliable MediaTek Helio G99, making it significantly faster and smoother than the A14. Coupled with a 5000mAh battery and 4 years of OS updates, it is arguably the best budget phone Samsung has ever made.",
    highlights: ["90Hz Super AMOLED Display", "Reliable Helio G99 Processor", "4 Years of OS Updates"],
    pros: ["Unbeatable screen quality for the price", "Excellent software support", "Snappy daily performance"],
    cons: ["Thick bezels and waterdrop notch", "No 4K video recording", "No charger in the box"],
    verdict: "A groundbreaking budget phone that finally brings Samsung's legendary AMOLED screens to the masses."
  },
  {
    name: "Galaxy A14 4G",
    slug: "samsung-galaxy-a14",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Black", "Light Green", "Dark Red", "Silver"],
    release_date: "2023-02-28",
    price_usd: 150,
    price_bdt: 17000,
    price_display_text: "BDT 17,000",
    processor: "Mediatek Helio G80",
    gpu: "Mali-G52 MC2",
    display_type: "PLS LCD",
    screen_size: "6.6 inches",
    refresh_rate: "60Hz",
    brightness: "400 nits",
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.8, PDAF",
    video_recording: "1080p@30fps",
    battery_capacity: "5000 mAh",
    charging_wired: "15W wired",
    wireless_charging: "No",
    ip_rating: "None",
    weight: "201 g",
    dimensions: "167.7 x 78 x 9.1 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Entry-Level",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Long-Lasting",
    internal_links: { same_brand: ["samsung-galaxy-a14-5g", "samsung-galaxy-a13"] },
    ...commonSeoFields("Galaxy A14 4G", 150),
    overview: "The Galaxy A14 4G was Samsung's baseline smartphone for 2023. It adopted the flat, clean design language of the flagship S23 series, making it look much more expensive than it actually was. However, the internal hardware was kept strictly basic to maintain the low price. It featured a standard 60Hz PLS LCD screen and the aging MediaTek Helio G80 processor. While it handled basic calling and social media fine, it struggled with multitasking. Its biggest strengths were its excellent 5000mAh battery life and Samsung's reliable One UI software experience.",
    highlights: ["S23-style premium flat design", "5000mAh Battery", "50MP Main Camera"],
    pros: ["Looks much more expensive than it is", "Great battery life", "Clean software interface"],
    cons: ["Very slow performance", "Basic 60Hz LCD screen", "Slow 15W charging"],
    verdict: "A phone bought for its looks, battery, and software reliability, rather than its raw performance."
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

    console.log("🎉 Samsung Batch 16 (Popular A-Series) completed! Added 5 phones.");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
