import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number, keywordSuffix: string = 'price in bd') => ({
  meta_title: `${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `${name.toLowerCase()}, ${name.toLowerCase()} price in bd, redmi bangladesh, ${name.toLowerCase()} specs, best budget phone`,
  meta_description: `Official and Unofficial ${name} price in Bangladesh. Read full specifications, camera performance, gaming tests, and an honest review of this budget king.`,
  canonical_url: `https://www.techtweak.tech/phones/xiaomi/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `${name.toLowerCase()} ${keywordSuffix}`,
  secondary_keywords: [`${name.toLowerCase()} price`, `${name.toLowerCase()} review`, `${name.toLowerCase()} specs`],
  question_keywords: [
    `what is the price of ${name.toLowerCase()} in bangladesh?`,
    `is ${name.toLowerCase()} good for gaming?`,
    `does ${name.toLowerCase()} have a good camera?`
  ],
  faq_schema: [
    { question: `What is the price of ${name} in Bangladesh?`, answer: `The ${name} is available in Bangladesh at an expected starting price of BDT ${price * 115}. Pricing may vary based on RAM/Storage variants.` },
    { question: `Is the ${name} good for gaming?`, answer: `Yes, it offers a solid processor for its price segment, making it highly capable of running modern mobile games at medium to high settings.` },
    { question: `What is the battery capacity of ${name}?`, answer: `It typically features a 5000mAh battery (verify exact capacity in the specs table below) with fast charging support.` }
  ]
});

const phonesData = [
  {
    name: "Redmi Note 13 Pro+ 5G",
    slug: "redmi-note-13-pro-plus-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Midnight Black", "Moonlight White", "Aurora Purple", "Fusion Purple", "Fusion Black"],
    release_date: "2023-09-21",
    price_usd: 400,
    price_bdt: 46000,
    price_display_text: "BDT 46,000",
    processor: "Dimensity 7200 Ultra",
    gpu: "Mali-G610 MC4",
    display_type: "AMOLED, 68B colors, 120Hz",
    screen_size: "6.67 inches",
    refresh_rate: "120Hz",
    brightness: "1800 nits (peak)",
    cam_count: "Triple",
    cam_main_sensor: "200 MP, f/1.7, OIS",
    video_recording: "4K@24/30fps, 1080p@30/60/120fps",
    battery_capacity: "5000 mAh",
    charging_wired: "120W wired",
    wireless_charging: "No",
    ip_rating: "IP68 dust/water resistant",
    weight: "204.5 g",
    dimensions: "161.4 x 74.2 x 8.9 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Premium Mid-Range",
    performance_tier: "High-End",
    camera_tier: "Excellent",
    battery_tier: "Standard",
    internal_links: { same_brand: ["redmi-note-13-pro-5g"], upcoming: ["redmi-note-14-pro-plus-5g"] },
    ...commonSeoFields("Redmi Note 13 Pro+ 5G", 400),
    overview: "The Redmi Note 13 Pro+ 5G completely redefines what consumers can expect from the Redmi Note series. Moving away from budget roots, this model features a stunning curved AMOLED display and a premium vegan leather (or glass) back that feels incredibly luxurious. It introduces IP68 water and dust resistance, a rarity at this price point. Powering the device is the highly capable MediaTek Dimensity 7200 Ultra, paired with a massive 200MP main camera that captures incredible detail even in low light. To top it off, the device supports blazing fast 120W HyperCharge, powering the 5000mAh battery from 0 to 100% in roughly 19 minutes.",
    highlights: ["200MP OIS Camera", "120W HyperCharge", "IP68 Water Resistance"],
    pros: ["Premium curved design", "Excellent main camera performance", "Incredibly fast charging"],
    cons: ["Ultrawide camera is weak", "Tons of pre-installed bloatware"],
    verdict: "A near-flagship experience at a mid-range price. The Note 13 Pro+ is easily the most premium device Redmi has ever made."
  },
  {
    name: "Redmi Note 13 Pro 5G",
    slug: "redmi-note-13-pro-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Midnight Black", "Ocean Teal", "Aurora Purple"],
    release_date: "2023-09-21",
    price_usd: 300,
    price_bdt: 34500,
    price_display_text: "BDT 34,500",
    processor: "Snapdragon 7s Gen 2",
    gpu: "Adreno 710",
    display_type: "AMOLED, 68B colors",
    screen_size: "6.67 inches",
    refresh_rate: "120Hz",
    brightness: "1800 nits (peak)",
    cam_count: "Triple",
    cam_main_sensor: "200 MP, f/1.7, OIS",
    video_recording: "4K@30fps, 1080p@30/60/120fps",
    battery_capacity: "5100 mAh",
    charging_wired: "67W wired",
    wireless_charging: "No",
    ip_rating: "IP54 dust/splash resistant",
    weight: "187 g",
    dimensions: "161.2 x 74.3 x 8 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Good",
    battery_tier: "Long-Lasting",
    internal_links: { same_brand: ["redmi-note-13-pro-plus-5g", "redmi-note-13-5g"] },
    ...commonSeoFields("Redmi Note 13 Pro 5G", 300),
    overview: "The Redmi Note 13 Pro 5G is the sweet spot of the 13 series lineup, offering a remarkable balance of performance, photography, and price. It retains the headline-grabbing 200MP main camera from the Pro+ model but switches to a flat, incredibly sharp 1.5K AMOLED display. Under the hood, it utilizes the efficient Snapdragon 7s Gen 2 processor, which delivers highly stable day-to-day performance and solid mid-tier gaming. The battery is slightly larger at 5100mAh, paired with a very respectable 67W fast charging. It adopts a modern, boxy design that looks far more expensive than it actually is.",
    highlights: ["200MP OIS Camera", "Snapdragon 7s Gen 2", "1.5K Resolution Display"],
    pros: ["Fantastic main camera", "Crisp flat display with tiny bezels", "Great battery life"],
    cons: ["Only IP54 splash resistance", "Average video stabilization"],
    verdict: "The most sensible purchase in the lineup. It delivers exactly what most users need without the premium price tag of the Pro+."
  },
  {
    name: "Redmi Note 13 4G",
    slug: "redmi-note-13-4g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Midnight Black", "Mint Green", "Ice Blue", "Ocean Sunset"],
    release_date: "2024-01-15",
    price_usd: 180,
    price_bdt: 20000,
    price_display_text: "BDT 20,000",
    processor: "Snapdragon 685",
    gpu: "Adreno 610",
    display_type: "AMOLED, 1B colors",
    screen_size: "6.67 inches",
    refresh_rate: "120Hz",
    brightness: "1800 nits (peak)",
    cam_count: "Triple",
    cam_main_sensor: "108 MP, f/1.8",
    video_recording: "1080p@30fps",
    battery_capacity: "5000 mAh",
    charging_wired: "33W wired",
    wireless_charging: "No",
    ip_rating: "IP54 dust/splash resistant",
    weight: "188.5 g",
    dimensions: "162.3 x 75.6 x 8 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Endurance",
    internal_links: { same_brand: ["redmi-note-13-5g"] },
    ...commonSeoFields("Redmi Note 13 4G", 180),
    overview: "The Redmi Note 13 4G serves as the entry point into the highly popular Note 13 family. It focuses heavily on providing an exceptional viewing experience on a tight budget by featuring a stunning 6.67-inch AMOLED display with a 120Hz refresh rate and ultra-thin bezels. It is powered by the dependable Snapdragon 685 chipset, which handles daily social media, browsing, and light gaming with ease. Photography is handled by a massive 108MP main sensor that captures excellent daylight photos. The device boasts an in-display fingerprint scanner, stereo speakers, and exceptional multi-day battery life thanks to its 5000mAh cell.",
    highlights: ["120Hz AMOLED Display", "108MP Main Camera", "In-display fingerprint scanner"],
    pros: ["Beautiful screen with tiny bezels", "Excellent battery life", "Premium design feel"],
    cons: ["Processor is relatively weak", "No 4K video recording"],
    verdict: "An absolute visual treat for media consumers on a budget. Don't buy it for heavy gaming, but buy it for the fantastic display."
  },
  {
    name: "Redmi Note 12 Pro 5G",
    slug: "redmi-note-12-pro-5g",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Stardust Purple", "Frosted Blue", "Onyx Black", "White"],
    release_date: "2022-10-27",
    price_usd: 280,
    price_bdt: 32000,
    price_display_text: "BDT 32,000",
    processor: "Dimensity 1080",
    gpu: "Mali-G68 MC4",
    display_type: "OLED, 1B colors",
    screen_size: "6.67 inches",
    refresh_rate: "120Hz",
    brightness: "900 nits (HBM)",
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.9, OIS, Sony IMX766",
    video_recording: "4K@30fps, 1080p@30/60/120fps",
    battery_capacity: "5000 mAh",
    charging_wired: "67W wired",
    wireless_charging: "No",
    ip_rating: "IP53, dust and splash resistant",
    weight: "187 g",
    dimensions: "163 x 76 x 8 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Mid-Range",
    performance_tier: "Mainstream",
    camera_tier: "Good",
    battery_tier: "Standard",
    internal_links: { same_brand: ["redmi-note-13-pro-5g"] },
    ...commonSeoFields("Redmi Note 12 Pro 5G", 280),
    overview: "The Redmi Note 12 Pro 5G became an instant classic upon release by bringing the flagship-grade Sony IMX766 camera sensor (with OIS) to the mid-range segment. This resulted in outstanding photography, particularly in low-light environments. The phone features a vibrant, flat 120Hz OLED display that supports Dolby Vision, making it a stellar device for content consumption. Underneath, it relies on the MediaTek Dimensity 1080, an incredibly well-balanced chipset that delivers smooth daily UI performance and consistent framerates in popular games. The glass back adds a premium touch to this highly successful smartphone.",
    highlights: ["Sony IMX766 Main Sensor with OIS", "Dimensity 1080 Processor", "120Hz Dolby Vision OLED"],
    pros: ["Flagship-level main camera", "Excellent sustained performance", "Great stereo speakers"],
    cons: ["Comes with bloatware", "Updates are historically slower"],
    verdict: "Even a generation old, the Note 12 Pro 5G remains one of the best camera phones you can buy in its price bracket."
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

    console.log("🎉 Phase 2 Batch 2 (Redmi Note Series) completed successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
