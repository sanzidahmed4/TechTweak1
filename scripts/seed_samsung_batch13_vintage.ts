import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number, keywordSuffix: string = 'price in bd') => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, samsung bangladesh, ${name.toLowerCase()} specs, vintage smartphone`,
  meta_description: `Official and Unofficial Samsung ${name} price in Bangladesh. Dive into the specs, design, and nostalgia of this vintage Samsung classic.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/samsung-${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} ${keywordSuffix}`,
  secondary_keywords: [`samsung ${name.toLowerCase()} price`, `samsung ${name.toLowerCase()} specs`, `samsung ${name.toLowerCase()} review`],
  question_keywords: [
    `what is the price of samsung ${name.toLowerCase()} in bangladesh?`,
    `is samsung ${name.toLowerCase()} still good?`,
    `does samsung ${name.toLowerCase()} have a removable battery?`
  ],
  faq_schema: [
    { question: `What is the price of Samsung ${name} in Bangladesh?`, answer: `The Samsung ${name} originally launched at around BDT ${price * 115}. Today, it is mostly considered a collector's item in the second-hand market.` },
    { question: `Is the Samsung ${name} waterproof?`, answer: `Most vintage devices are not waterproof, with the notable exception of the Galaxy S5 which featured IP67 resistance.` },
    { question: `Does the Samsung ${name} have a removable battery?`, answer: `Yes, almost all Samsung smartphones from this vintage era featured removable plastic backs and swappable batteries.` }
  ]
});

const phonesData = [
  {
    name: "Galaxy S5",
    slug: "samsung-galaxy-s5",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Charcoal Black", "Copper Gold", "Electric Blue", "Shimmery White"],
    release_date: "2014-04-11",
    price_usd: 650,
    price_bdt: 55000,
    price_display_text: "BDT 55,000",
    processor: "Snapdragon 801",
    gpu: "Adreno 330",
    display_type: "Super AMOLED",
    screen_size: "5.1 inches",
    refresh_rate: "60Hz",
    brightness: "400 nits",
    cam_count: "Single",
    cam_main_sensor: "16 MP, f/2.2, PDAF",
    video_recording: "4K@30fps, 1080p@60fps",
    battery_capacity: "2800 mAh (Removable)",
    charging_wired: "18W wired",
    wireless_charging: "Qi wireless charging (market dependent)",
    ip_rating: "IP67 dust/water resistant",
    weight: "145 g",
    dimensions: "142 x 72.5 x 8.1 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Basic",
    internal_links: { same_brand: ["samsung-galaxy-s4"] },
    ...commonSeoFields("Galaxy S5", 650),
    overview: "The Galaxy S5 is one of Samsung's most polarizing yet feature-rich flagships from the early smartphone era. It was heavily criticized for its plastic 'band-aid' textured back cover, which many felt didn't match its premium price tag. However, beneath the plastic shell, it was an absolute powerhouse. It was the first Galaxy S phone to introduce IP67 water resistance, a fingerprint scanner (swipe-style), and a built-in heart rate monitor. Furthermore, it featured a removable 2800mAh battery and a beautiful 5.1-inch Super AMOLED display, making it a highly practical, if not beautiful, device.",
    highlights: ["IP67 water resistance", "Removable 2800mAh battery", "Built-in heart rate monitor"],
    pros: ["Incredibly feature-packed", "Water resistance was rare at the time", "Replaceable battery"],
    cons: ["Cheap-feeling plastic design", "Swipe-style fingerprint scanner was finicky"],
    verdict: "A phone that prioritized utilitarian features and durability over premium aesthetics, making it a classic workhorse."
  },
  {
    name: "Galaxy S4",
    slug: "samsung-galaxy-s4",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["White Frost", "Black Mist", "Aurora Red"],
    release_date: "2013-04-27",
    price_usd: 600,
    price_bdt: 50000,
    price_display_text: "BDT 50,000",
    processor: "Exynos 5410 Octa",
    gpu: "PowerVR SGX544MP3",
    display_type: "Super AMOLED",
    screen_size: "5.0 inches",
    refresh_rate: "60Hz",
    brightness: "350 nits",
    cam_count: "Single",
    cam_main_sensor: "13 MP, f/2.2, AF",
    video_recording: "1080p@30fps",
    battery_capacity: "2600 mAh (Removable)",
    charging_wired: "Standard",
    wireless_charging: "Qi wireless charging (market dependent)",
    ip_rating: "None",
    weight: "130 g",
    dimensions: "136.6 x 69.8 x 7.9 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Entry-Level",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Basic",
    internal_links: { same_brand: ["samsung-galaxy-s5"] },
    ...commonSeoFields("Galaxy S4", 600),
    overview: "The Galaxy S4 remains one of the best-selling smartphones in history, solidifying Samsung's dominance over the Android ecosystem. It took the highly successful pebble-shaped design of the S3 and refined it, packing a much sharper 1080p 5.0-inch Super AMOLED screen into an incredibly thin and lightweight body. Samsung loaded TouchWiz with endless smart features like 'Smart Scroll' (scrolling with your eyes) and 'Air View' (hovering your finger over the screen). While many of these were dismissed as gimmicks, they showcased Samsung's ambitious vision for smartphone interaction.",
    highlights: ["Gorgeous 5.0-inch 1080p display", "Incredibly lightweight at 130g", "Packed with innovative software gimmicks"],
    pros: ["Extremely comfortable to hold", "Removable battery and expandable storage", "Excellent display for 2013"],
    cons: ["Slippery, glossy plastic build", "Software was bloated with features"],
    verdict: "A commercial juggernaut that offered a stunning screen and threw every possible software feature at the wall to see what stuck."
  },
  {
    name: "Galaxy Note 4",
    slug: "samsung-galaxy-note-4",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Frosted white", "Charcoal black", "Bronze Gold", "Blossom Pink"],
    release_date: "2014-10-17",
    price_usd: 750,
    price_bdt: 65000,
    price_display_text: "BDT 65,000",
    processor: "Snapdragon 805",
    gpu: "Adreno 420",
    display_type: "Super AMOLED",
    screen_size: "5.7 inches",
    refresh_rate: "60Hz",
    brightness: "400 nits",
    cam_count: "Single",
    cam_main_sensor: "16 MP, f/2.2, OIS, AF",
    video_recording: "4K@30fps, 1080p@60fps",
    battery_capacity: "3220 mAh (Removable)",
    charging_wired: "15W wired",
    wireless_charging: "Qi wireless charging (market dependent)",
    ip_rating: "None",
    weight: "176 g",
    dimensions: "153.5 x 78.6 x 8.5 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Basic",
    internal_links: { same_brand: ["samsung-galaxy-note-3", "samsung-galaxy-note-5"] },
    ...commonSeoFields("Galaxy Note 4", 750),
    overview: "The Galaxy Note 4 is widely regarded by Samsung purists as the greatest Note device ever built. It was the perfect culmination of Samsung's utilitarian era. It introduced a much-needed metal frame to the series, giving it a premium feel, while retaining the faux-leather removable back cover that allowed users to swap out the 3220mAh battery. The 5.7-inch display was bumped up to a stunning 1440p (Quad HD) resolution, making it incredibly sharp. With a vastly improved S Pen, expandable storage, and OIS on its 16MP camera, it was the ultimate power user's dream.",
    highlights: ["1440p Quad HD Super AMOLED", "Premium metal frame", "Removable battery & MicroSD"],
    pros: ["The ultimate 'no-compromise' power user phone", "Stunningly sharp display", "Excellent camera with OIS"],
    cons: ["TouchWiz software could lag over time", "Swipe fingerprint scanner was unreliable"],
    verdict: "The absolute pinnacle of the classic Note series, offering every feature a power user could ever want."
  },
  {
    name: "Galaxy Note 3",
    slug: "samsung-galaxy-note-3",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Black", "White", "Pink", "Rose Gold"],
    release_date: "2013-09-25",
    price_usd: 700,
    price_bdt: 60000,
    price_display_text: "BDT 60,000",
    processor: "Snapdragon 800",
    gpu: "Adreno 330",
    display_type: "Super AMOLED",
    screen_size: "5.7 inches",
    refresh_rate: "60Hz",
    brightness: "350 nits",
    cam_count: "Single",
    cam_main_sensor: "13 MP, f/2.2, AF",
    video_recording: "4K@30fps, 1080p@60fps",
    battery_capacity: "3200 mAh (Removable)",
    charging_wired: "Standard",
    wireless_charging: "No",
    ip_rating: "None",
    weight: "168 g",
    dimensions: "151.2 x 79.2 x 8.3 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Entry-Level",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Basic",
    internal_links: { same_brand: ["samsung-galaxy-note-4"] },
    ...commonSeoFields("Galaxy Note 3", 700),
    overview: "The Galaxy Note 3 was the device that solidified the 'phablet' category as a permanent fixture in the smartphone industry. It ditched the glossy plastic of the Note 2 in favor of a unique, stitched faux-leather back cover, giving it the appearance of a premium pocket notebook. It was famously one of the very first smartphones to shoot 4K video, thanks to the immensely powerful Snapdragon 800 processor. The massive 5.7-inch 1080p screen was a joy to use with the S Pen, and the inclusion of an unusual USB 3.0 port allowed for blazing-fast data transfers.",
    highlights: ["First phone with 4K video recording", "Stitched faux-leather design", "USB 3.0 port for fast transfers"],
    pros: ["Unique, premium notebook aesthetic", "Massive, beautiful 1080p screen", "Very powerful for its time"],
    cons: ["Very wide and difficult to use one-handed", "USB 3.0 port was wide and ugly"],
    verdict: "A groundbreaking powerhouse that proved huge screens and stylus inputs were not just fads, but the future of mobile computing."
  },
  {
    name: "Galaxy Grand 2",
    slug: "samsung-galaxy-grand-2",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Black", "White", "Pink"],
    release_date: "2014-01-01",
    price_usd: 250,
    price_bdt: 20000,
    price_display_text: "BDT 20,000",
    processor: "Snapdragon 400",
    gpu: "Adreno 305",
    display_type: "TFT",
    screen_size: "5.25 inches",
    refresh_rate: "60Hz",
    brightness: "350 nits",
    cam_count: "Single",
    cam_main_sensor: "8 MP, AF",
    video_recording: "1080p@30fps",
    battery_capacity: "2600 mAh (Removable)",
    charging_wired: "Standard",
    wireless_charging: "No",
    ip_rating: "None",
    weight: "163 g",
    dimensions: "146.8 x 75.3 x 8.9 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Entry-Level",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Basic",
    internal_links: { same_brand: ["samsung-galaxy-grand-prime"] },
    ...commonSeoFields("Galaxy Grand 2", 250),
    overview: "The Galaxy Grand 2 was the perfect budget 'phablet' of its era. Before the A-series and M-series existed, the Grand series offered large screens to users who couldn't afford a Galaxy Note. It adopted the stylish faux-leather stitched back design from the Note 3, making it look far more premium than its price suggested. It featured a respectable 5.25-inch HD display and was powered by a reliable Snapdragon 400 processor. While it lacked the S Pen and the raw power of the flagship series, it was an incredibly popular choice for budget-conscious multimedia consumers.",
    highlights: ["Faux-leather stitched design", "Large 5.25-inch HD display", "Removable 2600mAh battery"],
    pros: ["Looked like a premium Note device", "Great screen size for the price", "Reliable dual-SIM functionality"],
    cons: ["TFT screen had poor viewing angles", "Camera was very basic"],
    verdict: "A highly successful budget phablet that brought the premium Note aesthetic to the masses at a fraction of the cost."
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

    console.log("🎉 Samsung Batch 13 (Vintage) completed! Added 5 phones.");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
