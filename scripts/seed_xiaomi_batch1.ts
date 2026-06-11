import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFields = (name: string, price: number, keywordSuffix: string = 'price in bd') => ({
  meta_title: `${name} Price in Bangladesh, Specs & Review`,
  meta_keywords: `${name.toLowerCase()}, ${name.toLowerCase()} price in bd, xiaomi bangladesh, ${name.toLowerCase()} specs, flagship xiaomi`,
  meta_description: `Official and Unofficial ${name} price in Bangladesh. Discover its premium Leica cameras, hyper-fast charging, gaming performance, and in-depth review.`,
  canonical_url: `https://www.techtweak.tech/phones/xiaomi/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `${name.toLowerCase()} ${keywordSuffix}`,
  secondary_keywords: [`${name.toLowerCase()} price`, `${name.toLowerCase()} review`, `${name.toLowerCase()} specs`],
  question_keywords: [
    `what is the price of ${name.toLowerCase()} in bangladesh?`,
    `does ${name.toLowerCase()} have leica cameras?`,
    `is ${name.toLowerCase()} good for gaming?`
  ],
  faq_schema: [
    { question: `What is the price of ${name} in Bangladesh?`, answer: `The expected or official price of the ${name} is around BDT ${price * 115}. Pricing varies between official retail and unofficial channels.` },
    { question: `Does the ${name} support wireless charging?`, answer: `Please refer to the detailed hardware specifications on this page, as wireless charging varies by Xiaomi model (typically present on Pro and Ultra models).` },
    { question: `Is the ${name} waterproof?`, answer: `Flagship Xiaomi models usually carry an IP68 rating, making them water and dust resistant, but always verify the exact IP rating in the specs table.` }
  ]
});

const phonesData = [
  {
    name: "Xiaomi 14 Ultra",
    slug: "xiaomi-14-ultra",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Black", "White", "Titanium Gray"],
    release_date: "2024-02-22",
    price_usd: 1500,
    price_bdt: 170000,
    price_display_text: "BDT 170,000",
    processor: "Snapdragon 8 Gen 3",
    gpu: "Adreno 750",
    display_type: "LTPO AMOLED, 68B colors",
    screen_size: "6.73 inches",
    refresh_rate: "120Hz",
    brightness: "3000 nits (peak)",
    cam_count: "Quad",
    cam_main_sensor: "50 MP, f/1.6-4.0 (variable), 1-inch type, Leica optics",
    video_recording: "8K@24/30fps, 4K@24/30/60/120fps",
    battery_capacity: "5000 mAh",
    charging_wired: "90W wired",
    wireless_charging: "80W wireless, 10W reverse wireless",
    ip_rating: "IP68 dust/water resistant",
    weight: "219.8 g",
    dimensions: "161.4 x 75.3 x 9.2 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Ultra Premium",
    performance_tier: "Enthusiast",
    camera_tier: "Pro",
    battery_tier: "Standard",
    internal_links: { same_brand: ["xiaomi-14-pro", "xiaomi-13-ultra"], upcoming: ["xiaomi-15-ultra"] },
    ...commonSeoFields("Xiaomi 14 Ultra", 1500),
    overview: "The Xiaomi 14 Ultra is an absolute masterclass in mobile photography, developed in deep collaboration with Leica. Unlike most smartphones, it genuinely feels like a professional camera that happens to make phone calls. It features a massive 1-inch type sensor with a variable aperture, accompanied by two incredible telephoto lenses that deliver unparalleled zoom quality and portrait aesthetics. Encased in a premium, camera-like faux-leather back with a substantial circular camera island, the device commands attention. Beyond optics, the Snapdragon 8 Gen 3 ensures blistering speeds, while the brilliant 3000-nit LTPO display makes outdoor viewing a joy. It also boasts blazing fast 90W wired and an astonishing 80W wireless charging, completely eliminating battery anxiety.",
    highlights: ["Leica Quad Camera System", "Variable Aperture 1-inch Sensor", "80W Wireless Charging"],
    pros: ["Class-leading photography experience", "Stunning 3000-nit display", "Incredibly fast charging speeds"],
    cons: ["Very thick and top-heavy design", "HyperOS still has some bloatware"],
    verdict: "If you prioritize photography above everything else, the Xiaomi 14 Ultra is the ultimate tool. It rivals dedicated point-and-shoot cameras while offering top-tier smartphone performance."
  },
  {
    name: "Xiaomi 14 Pro",
    slug: "xiaomi-14-pro",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Black", "Silver", "Titanium", "Green"],
    release_date: "2023-11-01",
    price_usd: 900,
    price_bdt: 105000,
    price_display_text: "BDT 105,000",
    processor: "Snapdragon 8 Gen 3",
    gpu: "Adreno 750",
    display_type: "LTPO AMOLED, 68B colors",
    screen_size: "6.73 inches",
    refresh_rate: "120Hz",
    brightness: "3000 nits (peak)",
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.4-4.0 (variable), Leica optics",
    video_recording: "8K@24fps, 4K@24/30/60fps",
    battery_capacity: "4880 mAh",
    charging_wired: "120W wired",
    wireless_charging: "50W wireless",
    ip_rating: "IP68 dust/water resistant",
    weight: "223 g",
    dimensions: "161.4 x 75.3 x 8.5 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Flagship",
    performance_tier: "High-End",
    camera_tier: "Excellent",
    battery_tier: "Standard",
    internal_links: { same_brand: ["xiaomi-14", "xiaomi-14-ultra"], upcoming: ["xiaomi-15-pro"] },
    ...commonSeoFields("Xiaomi 14 Pro", 900),
    overview: "The Xiaomi 14 Pro strikes a fantastic balance between extreme flagship capabilities and everyday practicality. It introduces a stunning quad-curved display that melts beautifully into the titanium or aluminum frame, offering a highly immersive viewing experience. The camera system, fine-tuned by Leica, introduces a variable aperture mechanism that physically adjusts from f/1.4 to f/4.0, granting photographers true optical control over depth of field and light intake. Powered by the Snapdragon 8 Gen 3, it crushes heavy gaming and multitasking without breaking a sweat. The device also features incredibly rapid 120W wired charging, which can fill the battery in under 20 minutes, making it an excellent companion for power users on the go.",
    highlights: ["Variable Aperture Main Camera", "120W HyperCharge", "Quad-curved 3000-nit display"],
    pros: ["Premium build quality", "Fantastic optical depth of field", "Super-fast charging"],
    cons: ["Slightly heavier than predecessors", "Limited global availability compared to the standard model"],
    verdict: "A superb all-around flagship that offers unique variable aperture photography and unmatched charging speeds in a beautiful chassis."
  },
  {
    name: "Xiaomi 14",
    slug: "xiaomi-14",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Black", "White", "Jade Green", "Pink"],
    release_date: "2023-11-01",
    price_usd: 800,
    price_bdt: 95000,
    price_display_text: "BDT 95,000",
    processor: "Snapdragon 8 Gen 3",
    gpu: "Adreno 750",
    display_type: "LTPO OLED, 68B colors",
    screen_size: "6.36 inches",
    refresh_rate: "120Hz",
    brightness: "3000 nits (peak)",
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.6, OIS, Leica lens",
    video_recording: "8K@24fps, 4K@24/30/60fps",
    battery_capacity: "4610 mAh",
    charging_wired: "90W wired",
    wireless_charging: "50W wireless",
    ip_rating: "IP68 dust/water resistant",
    weight: "188 g",
    dimensions: "152.8 x 71.5 x 8.2 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Flagship",
    performance_tier: "High-End",
    camera_tier: "Excellent",
    battery_tier: "Standard",
    internal_links: { same_brand: ["xiaomi-14-pro", "xiaomi-13"], upcoming: ["xiaomi-15"] },
    ...commonSeoFields("Xiaomi 14", 800),
    overview: "In a world dominated by massive phablets, the Xiaomi 14 stands out as a true compact flagship powerhouse. Don't let its pocket-friendly 6.36-inch size fool you; this device is packed with the exact same Snapdragon 8 Gen 3 processor found in its larger siblings. The flat display, sharp edges, and elegant glass back make it incredibly comfortable to operate one-handed. It doesn't compromise on photography either, featuring a versatile trio of 50MP Leica-tuned cameras that produce vibrant, color-accurate photos. Despite its small footprint, Xiaomi managed to cram in a 4610mAh battery alongside 90W fast charging and 50W wireless charging, proving that you don't need a huge phone to get uncompromising flagship features.",
    highlights: ["Compact 6.36-inch form factor", "Snapdragon 8 Gen 3", "50W Wireless Charging"],
    pros: ["Perfect size for one-handed use", "No compromises on performance", "Excellent Leica color science"],
    cons: ["Battery life is decent but not class-leading", "Selfie camera tops out at 1080p for high framerates"],
    verdict: "The ultimate choice for users who hate massive phones but refuse to compromise on top-tier performance and cameras."
  },
  {
    name: "Xiaomi 13 Ultra",
    slug: "xiaomi-13-ultra",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Black", "Olive Green", "White"],
    release_date: "2023-04-21",
    price_usd: 1200,
    price_bdt: 140000,
    price_display_text: "BDT 140,000",
    processor: "Snapdragon 8 Gen 2",
    gpu: "Adreno 740",
    display_type: "LTPO AMOLED, 1B colors",
    screen_size: "6.73 inches",
    refresh_rate: "120Hz",
    brightness: "2600 nits (peak)",
    cam_count: "Quad",
    cam_main_sensor: "50.3 MP, f/1.9-4.0, 1-inch type, Leica optics",
    video_recording: "8K@24fps, 4K@24/30/60fps",
    battery_capacity: "5000 mAh",
    charging_wired: "90W wired",
    wireless_charging: "50W wireless",
    ip_rating: "IP68 dust/water resistant",
    weight: "227 g",
    dimensions: "163.2 x 74.6 x 9.1 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Ultra Premium",
    performance_tier: "High-End",
    camera_tier: "Pro",
    battery_tier: "Standard",
    internal_links: { same_brand: ["xiaomi-14-ultra", "xiaomi-13-pro"] },
    ...commonSeoFields("Xiaomi 13 Ultra", 1200),
    overview: "The Xiaomi 13 Ultra set a new standard for smartphone photography with its bold, camera-centric design featuring a prominent circular lens module. At its heart lies a massive 1-inch Sony IMX989 sensor equipped with a dual-aperture mechanism, allowing it to adapt effortlessly to varying lighting conditions. The collaboration with Leica is evident in the authentic color grading and detailed contrast. The device sports a bright 2600-nit display and is driven by the highly efficient Snapdragon 8 Gen 2, ensuring smooth operation. The antibacterial eco-leather back not only provides a premium grip but also adds to the aesthetic appeal, making it feel more like a luxury camera than a traditional smartphone.",
    highlights: ["1-inch type main sensor", "Authentic Leica Aesthetics", "Antibacterial eco-leather back"],
    pros: ["Unmatched zoom capabilities", "Premium camera-like grip", "Excellent battery efficiency"],
    cons: ["Very bulky and heavy", "Can get warm during prolonged video recording"],
    verdict: "A monumental leap in mobile photography, ideal for enthusiasts who want a dedicated camera experience inside an Android flagship."
  },
  {
    name: "Xiaomi 13T Pro",
    slug: "xiaomi-13t-pro",
    phone_status: "released",
    is_published: true,
    is_official: true,
    colors: ["Alpine Blue", "Meadow Green", "Black"],
    release_date: "2023-09-26",
    price_usd: 650,
    price_bdt: 75000,
    price_display_text: "BDT 75,000",
    processor: "Dimensity 9200+",
    gpu: "Immortalis-G715 MC11",
    display_type: "AMOLED, 68B colors",
    screen_size: "6.67 inches",
    refresh_rate: "144Hz",
    brightness: "2600 nits (peak)",
    cam_count: "Triple",
    cam_main_sensor: "50 MP, f/1.9, OIS, Leica lens",
    video_recording: "8K@24fps, 4K@30/60fps",
    battery_capacity: "5000 mAh",
    charging_wired: "120W wired",
    wireless_charging: "No",
    ip_rating: "IP68 dust/water resistant",
    weight: "206 g",
    dimensions: "162.2 x 75.7 x 8.5 mm",
    images: ["/placeholder.jpg"],
    price_segment: "Premium Mid-Range",
    performance_tier: "High-End",
    camera_tier: "Excellent",
    battery_tier: "Standard",
    internal_links: { same_brand: ["xiaomi-13t", "xiaomi-14"] },
    ...commonSeoFields("Xiaomi 13T Pro", 650),
    overview: "The Xiaomi 13T Pro is known as the 'flagship killer' of the 13 series, delivering high-end performance at a significantly lower price point. Instead of Snapdragon, it utilizes the incredibly powerful MediaTek Dimensity 9200+, which easily rivals the best chips on the market. One of its standout features is the incredibly smooth 144Hz AMOLED display, making it a joy for fast-paced gaming and scrolling. Unlike previous T-series models, this one brings Leica-tuned cameras and an IP68 waterproof rating, ensuring it feels like a true premium device. The insane 120W fast charging tops up the battery from zero to full in about 19 minutes, changing how you think about charging entirely.",
    highlights: ["MediaTek Dimensity 9200+", "144Hz Display", "120W Fast Charging"],
    pros: ["Exceptional value for money", "Incredibly fast charging", "Smooth 144Hz refresh rate"],
    cons: ["No wireless charging", "Plastic frame feels slightly less premium"],
    verdict: "One of the best value-for-money high-end phones available, offering 90% of a true flagship experience for a fraction of the cost."
  }
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const BrandSchema = new mongoose.Schema({}, { strict: false });
    const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
    
    // Ensure Xiaomi brand exists
    let xiaomiBrand = await Brand.findOne({ name: /Xiaomi/i });
    if (!xiaomiBrand) {
      console.log("Creating Xiaomi brand...");
      xiaomiBrand = await Brand.create({
        name: "Xiaomi",
        slug: "xiaomi",
        description: "Xiaomi Corporation is a Chinese designer and manufacturer of consumer electronics.",
        is_published: true,
        logo_url: "/placeholder.jpg"
      });
    }

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    for (const phone of phonesData) {
      (phone as any).brand_id = xiaomiBrand._id;
      phone.updated_at = new Date() as any;
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("🎉 Phase 2 Batch 1 (Xiaomi Flagships) completed successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
