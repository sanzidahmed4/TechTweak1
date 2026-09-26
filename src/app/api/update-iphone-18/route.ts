import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import connectToDatabase from '@/lib/mongodb/mongoose';
import Phone from '@/lib/models/Phone';
import Brand from '@/lib/models/Brand';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Locate Apple Brand
    let apple = await Brand.findOne({ slug: 'apple' });
    if (!apple) {
      apple = await Brand.findOne({ name: /apple/i });
    }

    if (!apple) {
      return NextResponse.json({ success: false, error: "Apple brand not found in database" }, { status: 404 });
    }

    const defaultImages = [
      "https://res.cloudinary.com/dlmudayr5/image/upload/f_auto,q_auto/v1790431738/tech_tweak/phones/temp-phone/qf7xzwt807yz0ggj7ycb.webp",
      "https://res.cloudinary.com/dlmudayr5/image/upload/f_auto,q_auto/v1790431738/tech_tweak/phones/temp-phone/y9tu9kvicyjko3aotnaz.webp",
      "https://res.cloudinary.com/dlmudayr5/image/upload/f_auto,q_auto/v1790431738/tech_tweak/phones/temp-phone/nvpc0ajk1j2btd9kkfpm.webp"
    ];

    // 2. Define Apple iPhone 18 Pro Specs
    const iphone18ProDoc = {
      name: "Apple iPhone 18 Pro",
      slug: "apple-iphone-18-pro",
      brand_id: apple._id,
      price_usd: 999,
      price_official: 999,
      price_status: "official",
      release_date: "September 2026",
      release_date_parsed: new Date("2026-09-20"),
      phone_status: "released",
      is_published: true,
      is_featured: true,
      colors: ["Burgundy", "Glacier", "Silver", "Black"],
      images: defaultImages,

      // Highlights
      chipset_highlight: "Apple A20 Pro (2nm TSMC) with 32-Core Neural Engine",
      camera_highlight: "48MP Variable Aperture (f/1.48-f/4.0) + 48MP 5x Periscope Telephoto",
      display_highlight: "6.3\" LTPO Super Retina XDR OLED, 120Hz ProMotion, 3000 nits Peak",
      battery_highlight: "3650 mAh with 30W Wired & 25W MagSafe Fast Charging",
      benchmark_highlight: "AnTuTu: ~2,420,000 | Geekbench 6: 3940 Single / 10100 Multi",

      // Specs
      display: "6.3 inches Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision, 3000 nits (peak)",
      processor: "Apple A20 Pro (2nm, Hexa-core: 2x 4.93 GHz Super Cores + 4x Efficiency Cores)",
      ram: "12GB LPDDR5X (WMCM packaging)",
      storage: "128GB / 256GB / 512GB / 1TB NVMe",
      camera_main: "48 MP (f/1.48-f/4.0 variable aperture, 24mm, sensor-shift OIS) + 48 MP (periscope telephoto, 5x optical zoom) + 48 MP (ultrawide, 120˚)",
      camera_front: "12 MP (f/1.9, Autofocus, SL 3D biometric sensor)",
      battery: "3650 mAh Li-Ion (non-removable)",
      charging: "30W wired, 25W wireless (MagSafe), 15W wireless (Qi2)",
      network: "5G (Apple C2 modem / Qualcomm X80 in select regions), Wi-Fi 7, Bluetooth 5.4",
      antutu_score: 2420000,
      display_type: "LTPO Super Retina XDR OLED",
      screen_size: "6.3 inches (~90.5% screen-to-body ratio)",
      resolution: "1206 x 2622 pixels (~460 ppi)",
      refresh_rate: "120Hz ProMotion",
      brightness: "3000 nits (outdoor peak), 1000 nits (typical)",
      protection: "Ceramic Shield 2nd Gen, Titanium Frame Grade 5",
      cpu: "Apple A20 Pro Hexa-Core (2x 4.93 GHz + 4x 2.4 GHz)",
      gpu: "Apple 7-core GPU with Hardware Ray Tracing & Neural Accelerators",
      cooling_system: "Vapor Chamber Cooling System",
      weight: "188 g",
      dimensions: "149.6 x 71.5 x 8.25 mm",
      build_material: "Corning-made glass front/back, titanium frame",
      sim_type: "Nano-SIM and eSIM or Dual eSIM",
      water_resistance: "IP68 dust/water resistant (up to 6m for 30 min)",
      seo_overview: "The Apple iPhone 18 Pro packs the revolutionary 2nm A20 Pro processor and variable aperture optics into a compact, pocket-friendly 6.3-inch titanium enclosure.",
      key_highlights: [
        "Compact 6.3-inch form factor with full Pro features",
        "TSMC 2nm Apple A20 Pro with 12GB LPDDR5X RAM",
        "Variable aperture camera system with 5x optical zoom",
        "Smaller Dynamic Island design"
      ],
      verdict: "For creators seeking pro-tier camera controls and breakthrough 2nm processing in a pocket-sized design, the iPhone 18 Pro is the pinnacle compact flagship.",
      pros: ["Unmatched compact power", "Variable aperture on a smaller phone", "120Hz ProMotion with 3000 nits brightness", "Titanium build quality"],
      cons: ["Battery capacity smaller than Pro Max", "Charging speeds conservative compared to Android rivals"],
      faqs: [
        { question: "What is the screen size of the iPhone 18 Pro?", answer: "The iPhone 18 Pro features a 6.3-inch Super Retina XDR OLED display with 120Hz ProMotion." },
        { question: "How much RAM does the iPhone 18 Pro have?", answer: "The iPhone 18 Pro features 12GB of unified LPDDR5X RAM." }
      ],
      meta_title: "Apple iPhone 18 Pro Specs, Review, Price & Release Date | TechTweak",
      meta_description: "Full specifications and review for Apple iPhone 18 Pro. 6.3-inch 120Hz display, 2nm A20 Pro chip, 48MP variable aperture camera, and titanium frame.",
      meta_keywords: "iPhone 18 Pro, iPhone 18 Pro specs, Apple A20 Pro, iPhone 18 Pro price, compact flagship",
      updated_at: new Date()
    };

    // 3. Upsert Apple iPhone 18 Pro
    const result = await Phone.findOneAndUpdate(
      { slug: iphone18ProDoc.slug },
      { $set: iphone18ProDoc },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // 4. Revalidate all caches
    revalidatePath('/');
    revalidatePath('/phones');
    revalidatePath('/phones/apple');
    revalidatePath('/phones/apple/apple-iphone-18-pro');
    revalidatePath('/search');
    revalidatePath('/admin/phones');
    revalidateTag('phones', 'max');
    revalidateTag('featured-phones', 'max');

    return NextResponse.json({
      success: true,
      message: "Apple iPhone 18 Pro updated successfully in live production database!",
      phone: {
        id: result._id,
        name: result.name,
        slug: result.slug,
        brand: apple.name,
        price_usd: result.price_usd,
        is_published: result.is_published
      }
    });
  } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    console.error("Error in update-iphone-18 route:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
