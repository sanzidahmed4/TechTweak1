import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number, keywordSuffix: string = 'price in bd') => ({
  meta_title: `${name} Price in Bangladesh, Leaks & Specs`,
  meta_keywords: `${name.toLowerCase()}, ${name.toLowerCase()} price in bd, upcoming xiaomi, ${name.toLowerCase()} leaks, new redmi phone`,
  meta_description: `Latest leaks and expected ${name} price in Bangladesh. Read rumored specifications, release date, and our analysis of this upcoming device.`,
  canonical_url: `https://www.techtweak.tech/phones/xiaomi/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `${name.toLowerCase()} ${keywordSuffix}`,
  secondary_keywords: [`${name.toLowerCase()} price`, `${name.toLowerCase()} release date`, `${name.toLowerCase()} leaks`],
  question_keywords: [
    `when will ${name.toLowerCase()} launch in bangladesh?`,
    `what is the expected price of ${name.toLowerCase()}?`,
    `what processor does ${name.toLowerCase()} use?`
  ],
  faq_schema: [
    { question: `When will the ${name} launch in Bangladesh?`, answer: `The official launch date is currently unconfirmed, but based on industry rumors, it is expected in the coming months.` },
    { question: `What is the expected price of the ${name}?`, answer: `Based on leaks, the ${name} is expected to be priced around BDT ${price * 115}. This is subject to change upon official release.` },
    { question: `Are the specs for the ${name} official?`, answer: `No, the specifications listed on this page are based on leaks and rumors. They will be updated once the device is officially announced.` }
  ]
});

const phonesData = [
  {
    name: "Xiaomi 15 Ultra",
    slug: "xiaomi-15-ultra",
    phone_status: "upcoming",
    is_published: true,
    is_official: false,
    expected_launch_date: "2025-02-15",
    launch_year: 2025,
    launch_quarter: "Q1",
    leak_confidence: "Moderate",
    colors: ["Black", "White", "Titanium"],
    price_usd: null,
    price_display_text: "Not Announced Yet",
    processor: "Snapdragon 8 Gen 4 (Rumored)",
    gpu: "Adreno 830 (Rumored)",
    display_type: "LTPO AMOLED, 120Hz",
    screen_size: "6.78 inches",
    refresh_rate: "120Hz",
    brightness: "4000 nits (peak rumored)",
    cam_count: "Quad",
    cam_main_sensor: "50 MP, 1-inch type, next-gen Leica optics",
    video_recording: "8K@30fps, 4K@120fps (Rumored)",
    battery_capacity: "Expected 5200 mAh",
    charging_wired: "90W wired (Rumored)",
    wireless_charging: "80W wireless (Rumored)",
    ip_rating: "IP68 dust/water resistant",
    weight: "Unknown",
    dimensions: "Unknown",
    images: ["/placeholder.jpg"],
    price_segment: "Ultra Premium",
    performance_tier: "Enthusiast",
    camera_tier: "Pro",
    battery_tier: "Standard",
    internal_links: { same_brand: ["xiaomi-14-ultra"], upcoming: ["xiaomi-15-pro"] },
    ...commonSeoFields("Xiaomi 15 Ultra", 1600),
    overview: "The Xiaomi 15 Ultra is the highly anticipated successor to the photography king, the 14 Ultra. Rumors suggest it will be powered by the upcoming Snapdragon 8 Gen 4 architecture, promising unprecedented computational photography power. The main focus, as always with the Ultra series, is the Leica camera system. Early leaks indicate a refined 1-inch type sensor and potential upgrades to the dual-telephoto setup for even better zoom clarity. The display is also rumored to reach an astonishing 4000 nits of peak brightness. While still unconfirmed, it's shaping up to be the ultimate camera phone of 2025.",
    highlights: ["Snapdragon 8 Gen 4", "Next-gen Leica Quad Camera", "Rumored 4000-nit display"],
    pros: ["Expected to have class-leading cameras", "Unmatched processor performance"],
    cons: ["Likely to be extremely expensive", "Specs are still largely rumored"],
    verdict: "A device worth waiting for if you demand the absolute pinnacle of smartphone photography and are willing to pay the premium."
  },
  {
    name: "Redmi Note 14 Pro+ 5G",
    slug: "redmi-note-14-pro-plus-5g",
    phone_status: "upcoming",
    is_published: true,
    is_official: false,
    expected_launch_date: "2024-09-25",
    launch_year: 2024,
    launch_quarter: "Q3",
    leak_confidence: "High",
    colors: ["Black", "White", "Purple"],
    price_usd: null,
    price_display_text: "Not Announced Yet",
    processor: "Dimensity 7300 Ultra (Rumored)",
    gpu: "Mali-G615 MC2 (Rumored)",
    display_type: "AMOLED, 120Hz",
    screen_size: "6.67 inches",
    refresh_rate: "120Hz",
    brightness: "2000 nits (peak rumored)",
    cam_count: "Triple",
    cam_main_sensor: "50 MP, OIS (Rumored shift from 200MP)",
    video_recording: "4K@30fps (Rumored)",
    battery_capacity: "Expected 5000 mAh",
    charging_wired: "120W wired",
    wireless_charging: "No",
    ip_rating: "IP68 dust/water resistant",
    weight: "Unknown",
    dimensions: "Unknown",
    images: ["/placeholder.jpg"],
    price_segment: "Premium Mid-Range",
    performance_tier: "High-End",
    camera_tier: "Excellent",
    battery_tier: "Standard",
    internal_links: { same_brand: ["redmi-note-13-pro-plus-5g"] },
    ...commonSeoFields("Redmi Note 14 Pro+ 5G", 420),
    overview: "The Redmi Note 14 Pro+ 5G is expected to continue Redmi's trend of blurring the lines between mid-range and flagship devices. Interestingly, early leaks suggest a shift away from the 200MP sensors of previous generations in favor of a larger, higher-quality 50MP main sensor, potentially offering better low-light performance. It is expected to retain the luxurious curved display, IP68 water resistance, and incredibly fast 120W charging from the Note 13 Pro+. The processor is rumored to be the MediaTek Dimensity 7300 Ultra, providing a solid bump in efficiency and gaming performance.",
    highlights: ["Rumored 50MP Premium Sensor", "120W Fast Charging", "Curved AMOLED Display"],
    pros: ["Potential massive camera quality upgrade", "Premium build quality", "Very fast charging"],
    cons: ["Only rumored specs available", "May drop the 200MP marketing appeal"],
    verdict: "If leaks are accurate, the shift to a better 50MP sensor could make this the smartest mid-range camera phone to buy."
  },
  {
    name: "POCO X7 Pro",
    slug: "poco-x7-pro",
    phone_status: "upcoming",
    is_published: true,
    is_official: false,
    expected_launch_date: "2025-01-10",
    launch_year: 2025,
    launch_quarter: "Q1",
    leak_confidence: "Low",
    colors: ["Black", "Yellow", "Blue"],
    price_usd: null,
    price_display_text: "Not Announced Yet",
    processor: "Dimensity 8400 (Rumored)",
    gpu: "Unknown",
    display_type: "AMOLED, 120Hz",
    screen_size: "6.67 inches",
    refresh_rate: "120Hz",
    brightness: "Unknown",
    cam_count: "Triple",
    cam_main_sensor: "64 MP, OIS (Rumored)",
    video_recording: "4K@30fps (Rumored)",
    battery_capacity: "Expected 5000 mAh",
    charging_wired: "67W wired",
    wireless_charging: "No",
    ip_rating: "IP54 dust/splash resistant",
    weight: "Unknown",
    dimensions: "Unknown",
    images: ["/placeholder.jpg"],
    price_segment: "Mid-Range",
    performance_tier: "High-End",
    camera_tier: "Good",
    battery_tier: "Standard",
    internal_links: { same_brand: ["poco-x6-pro-5g"] },
    ...commonSeoFields("POCO X7 Pro", 320),
    overview: "The POCO X7 Pro is expected to be the next gaming champion in the mid-range market. Building upon the incredible success of the X6 Pro, this upcoming device is rumored to utilize an even more powerful MediaTek Dimensity 8-series processor, potentially the Dimensity 8400. This should yield benchmark scores that completely dominate its price segment. We expect it to retain the excellent 1.5K AMOLED display and fast UFS 4.0 storage. While the camera system usually takes a backseat on POCO devices, it should still feature a competent OIS-enabled main shooter for everyday photography.",
    highlights: ["Next-gen Dimensity Processor", "1.5K AMOLED Display", "Aggressive Gaming Performance"],
    pros: ["Expected to dominate mid-range benchmarks", "Likely to offer great value for gamers"],
    cons: ["Very little concrete information available", "Cameras will likely remain average"],
    verdict: "A phone firmly on the radar for mobile gamers looking to maximize performance per dollar in early 2025."
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

    console.log("🎉 Phase 2 Batch 4 (Upcoming Xiaomi & Redmi) completed successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
