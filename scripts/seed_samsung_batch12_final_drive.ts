import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number, keywordSuffix: string = 'price in bd') => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} price in bd, samsung bangladesh, ${name.toLowerCase()} specs, legacy smartphone`,
  meta_description: `Official and Unofficial Samsung ${name} price in Bangladesh. Uncover its full technical specifications, design history, and performance review.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/samsung-${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} ${keywordSuffix}`,
  secondary_keywords: [`samsung ${name.toLowerCase()} price`, `samsung ${name.toLowerCase()} specs`, `samsung ${name.toLowerCase()} review`],
  question_keywords: [
    `what is the price of samsung ${name.toLowerCase()} in bangladesh?`,
    `does samsung ${name.toLowerCase()} support wireless charging?`,
    `is samsung ${name.toLowerCase()} still available?`
  ],
  faq_schema: [
    { question: `What is the price of Samsung ${name} in Bangladesh?`, answer: `The expected original launch price of the Samsung ${name} in Bangladesh was around BDT ${price * 115}. It is now only found in second-hand markets.` },
    { question: `Does the Samsung ${name} have wireless charging?`, answer: `Check the detailed charging specs below. While older S and Note series models usually feature it, mid-range devices from this era typically do not.` },
    { question: `Is the Samsung ${name} water-resistant?`, answer: `Generally, only S and Note flagships from the S7 era onwards feature IP-rated water resistance.` }
  ]
});

const phonesData = [
  {
    name: "Galaxy C9 Pro",
    slug: "samsung-galaxy-c9-pro",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Gold", "Pink Gold", "Black"],
    release_date: "2016-11-01",
    price_usd: 470,
    price_bdt: 45000,
    price_display_text: "BDT 45,000",
    processor: "Snapdragon 653",
    gpu: "Adreno 510",
    display_type: "Super AMOLED",
    screen_size: "6.0 inches",
    refresh_rate: "60Hz",
    brightness: "400 nits",
    cam_count: "Single",
    cam_main_sensor: "16 MP, f/1.9, PDAF",
    video_recording: "1080p@30fps",
    battery_capacity: "4000 mAh",
    charging_wired: "18W wired",
    wireless_charging: "No",
    ip_rating: "None",
    weight: "189 g",
    dimensions: "162.9 x 80.7 x 6.9 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Mid-Range",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-a9-2018"] },
    ...commonSeoFields("Galaxy C9 Pro", 470),
    overview: "The Galaxy C9 Pro was an absolute beast of a mid-range phone specifically designed for multimedia and gaming enthusiasts in the Asian market. It was famously Samsung's very first smartphone to pack a massive 6GB of RAM—even beating the flagship Galaxy S7 to that milestone. It featured a huge 6.0-inch Super AMOLED display and a very thin, premium metal unibody design with sleek, micro-slotted antenna lines. The large 4000mAh battery combined with stereo speakers made it an incredibly popular device for media consumption before the Infinity Display era began.",
    highlights: ["First Samsung with 6GB RAM", "Premium ultra-thin metal body", "Stereo speakers"],
    pros: ["Fantastic for gaming and media at the time", "Stunning, large AMOLED display", "Very solid build quality"],
    cons: ["Never received many software updates", "Camera performance was average"],
    verdict: "A legendary powerhouse from the mid-2010s that prioritized memory and screen size over almost everything else."
  },
  {
    name: "Galaxy Note 5",
    slug: "samsung-galaxy-note-5",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Black Sapphire", "Gold Platinum", "Silver Titan", "White Pearl"],
    release_date: "2015-08-21",
    price_usd: 700,
    price_bdt: 60000,
    price_display_text: "BDT 60,000",
    processor: "Exynos 7420 Octa",
    gpu: "Mali-T760MP8",
    display_type: "Super AMOLED",
    screen_size: "5.7 inches",
    refresh_rate: "60Hz",
    brightness: "600 nits",
    cam_count: "Single",
    cam_main_sensor: "16 MP, f/1.9, OIS",
    video_recording: "4K@30fps, 1080p@60fps",
    battery_capacity: "3000 mAh",
    charging_wired: "15W wired",
    wireless_charging: "Qi/PMA wireless charging",
    ip_rating: "None",
    weight: "171 g",
    dimensions: "153.2 x 76.1 x 7.6 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Basic",
    internal_links: { same_brand: ["samsung-galaxy-note-8", "samsung-galaxy-s6-edge"] },
    ...commonSeoFields("Galaxy Note 5", 700),
    overview: "The Galaxy Note 5 marked a massive, highly controversial shift in Samsung's design philosophy. It completely abandoned the faux-leather and plastic of previous Notes, introducing a breathtaking glass-and-metal design that felt incredibly luxurious. The back glass was curved at the edges, making the large 5.7-inch device remarkably comfortable to hold. However, to achieve this beautiful design, Samsung infuriated power users by removing the replaceable battery and the microSD card slot—features that were considered essential to the Note identity. Despite the backlash, it was arguably the best-looking phone of 2015.",
    highlights: ["Gorgeous glass-and-metal design", "Spring-loaded S Pen", "Incredible 16MP camera with OIS"],
    pros: ["Stunning display quality", "Camera took fantastic photos", "Felt like a true luxury item"],
    cons: ["No microSD card slot", "Battery could not be removed or easily replaced", "Infamous 'S-Pen backwards' design flaw"],
    verdict: "A controversial but undeniably beautiful flagship that signaled the end of the removable battery era for Samsung."
  },
  {
    name: "Galaxy S6 Edge",
    slug: "samsung-galaxy-s6-edge",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["White Pearl", "Black Sapphire", "Gold Platinum", "Green Emerald"],
    release_date: "2015-04-10",
    price_usd: 850,
    price_bdt: 65000,
    price_display_text: "BDT 65,000",
    processor: "Exynos 7420 Octa",
    gpu: "Mali-T760MP8",
    display_type: "Super AMOLED",
    screen_size: "5.1 inches",
    refresh_rate: "60Hz",
    brightness: "600 nits",
    cam_count: "Single",
    cam_main_sensor: "16 MP, f/1.9, OIS",
    video_recording: "4K@30fps, 1080p@60fps",
    battery_capacity: "2600 mAh",
    charging_wired: "15W wired",
    wireless_charging: "Qi/PMA wireless charging",
    ip_rating: "None",
    weight: "132 g",
    dimensions: "142.1 x 70.1 x 7 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Budget",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Basic",
    internal_links: { same_brand: ["samsung-galaxy-s7-edge"] },
    ...commonSeoFields("Galaxy S6 Edge", 850),
    overview: "The Galaxy S6 Edge is arguably the most important phone in Samsung's history. After the plastic build of the S5 was heavily criticized, Samsung went back to the drawing board and created 'Project Zero'. The result was a jaw-dropping glass-and-metal masterpiece that introduced the 'Edge' display—curving the screen down both sides of the phone. It looked and felt like an artifact from the future. While the battery was dreadfully small and it lost water resistance and the microSD slot, the sheer beauty of the device forced the entire smartphone industry to rethink phone design.",
    highlights: ["First dual-curved Edge display", "Stunning glass and metal build", "Excellent 16MP Camera"],
    pros: ["Changed smartphone design forever", "Absolutely gorgeous hardware", "Fantastic screen and camera"],
    cons: ["Terrible battery life", "Extremely slippery to hold", "Removed SD card slot"],
    verdict: "A wildly ambitious, beautifully flawed masterpiece that completely revolutionized how modern smartphones look."
  },
  {
    name: "Galaxy A8 Star",
    slug: "samsung-galaxy-a8-star",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Black", "White"],
    release_date: "2018-06-01",
    price_usd: 400,
    price_bdt: 42000,
    price_display_text: "BDT 42,000",
    processor: "Snapdragon 660",
    gpu: "Adreno 512",
    display_type: "Super AMOLED",
    screen_size: "6.3 inches",
    refresh_rate: "60Hz",
    brightness: "450 nits",
    cam_count: "Dual",
    cam_main_sensor: "24 MP, f/1.7, PDAF",
    video_recording: "4K@30fps, 1080p@30fps",
    battery_capacity: "3700 mAh",
    charging_wired: "15W wired",
    wireless_charging: "No",
    ip_rating: "None",
    weight: "191 g",
    dimensions: "162.4 x 77 x 7.6 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Mid-Range",
    performance_tier: "Basic",
    camera_tier: "Basic",
    battery_tier: "Standard",
    internal_links: { same_brand: ["samsung-galaxy-a9-2018", "samsung-galaxy-a7-2018"] },
    ...commonSeoFields("Galaxy A8 Star", 400),
    overview: "The Galaxy A8 Star was a slightly unusual release from Samsung, acting as a bridge between the old-school flat-screened mid-rangers and the upcoming multi-camera revolution. It featured a very large, sharp 6.3-inch Super AMOLED screen with no notch or hole-punch, making it highly desirable for media consumption. It housed a dual rear camera setup (24MP + 16MP) designed specifically to take excellent low-light photos. Unlike many other A-series phones of its time, it opted for the Qualcomm Snapdragon 660 rather than an Exynos chip, ensuring highly stable performance and good thermal efficiency.",
    highlights: ["No-notch 6.3-inch AMOLED display", "Dual high-res rear cameras", "Snapdragon 660 processor"],
    pros: ["Great performance stability", "Large, uninterrupted screen", "Good camera quality"],
    cons: ["Design was a bit bland compared to its siblings", "Slightly overpriced at launch"],
    verdict: "A very solid, dependable mid-ranger that offered stable performance and a great screen without relying on flashy design gimmicks."
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

    console.log("🎉 Samsung Batch 12 (Final Legacy Drive) completed! Added 4 phones.");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
