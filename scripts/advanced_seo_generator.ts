import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("No MONGODB_URI found");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB for Advanced 2026 SEO Updates...");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));

  const phones = await Phone.find({});
  let updatedCount = 0;

  const brands = await Brand.find({});
  const brandMap = new Map();
  brands.forEach(b => brandMap.set(b._id.toString(), { name: b.name, slug: b.slug }));

  for (const p of phones) {
    let brandName = "Smartphone";
    let brandSlug = "brand";
    
    if (p.brand_id) {
        const b = brandMap.get(p.brand_id.toString());
        if (b) {
            brandName = b.name;
            brandSlug = b.slug;
        }
    } else if (p.name.toLowerCase().includes("xiaomi") || p.name.toLowerCase().includes("redmi")) {
        brandName = "Xiaomi";
        brandSlug = "xiaomi";
    } else if (p.name.toLowerCase().includes("poco")) {
        brandName = "POCO";
        brandSlug = "poco";
    } else if (p.name.toLowerCase().includes("samsung")) {
        brandName = "Samsung";
        brandSlug = "samsung";
    } else if (p.name.toLowerCase().includes("apple") || p.name.toLowerCase().includes("iphone")) {
        brandName = "Apple";
        brandSlug = "apple";
    }

    const isFlagship = p.price_usd && p.price_usd >= 800;
    const isMidRange = p.price_usd && p.price_usd >= 300 && p.price_usd < 800;
    const isBudget = p.price_usd && p.price_usd < 300;
    
    // Convert USD to approximate BDT (1 USD = ~120 BDT for 2026 conversion logic)
    const priceBdtApprox = p.price_usd ? Math.round((p.price_usd * 120) / 1000) * 1000 : 0;
    const bdtKeyword = priceBdtApprox > 0 ? `under ${priceBdtApprox + 5000} Taka` : "in Bangladesh";

    const chipset = p.processor || p.chipset_highlight || "Advanced 2026 chipset";
    const display = p.display_type || "AMOLED display";
    const cam = p.cam_main_sensor || p.camera_main || "AI-powered camera";
    const bat = p.battery_capacity || p.battery || "Long-lasting battery";

    // 1. Meta Title (2026 Trend: Emphasizing Official/Unofficial & 2026)
    const metaTitle = `${p.name} Price in Bangladesh 2026 | Official & Unofficial Specs - TechTweak`;

    // 2. Meta Description
    let metaDescription = `Looking for the ${p.name}? Discover the official and unofficial price in BD. Explore its ${chipset} performance, ${cam} capabilities, and full specifications on TechTweak.`;
    if (isFlagship) {
        metaDescription = `Check out the ${p.name} official price in Bangladesh 2026. See the ultimate review of its AI features, ${cam}, and flagship ${chipset} performance.`;
    } else if (isBudget) {
        metaDescription = `Find the best price for the ${p.name} in Bangladesh. Get full specs, PUBG gaming test details, and battery review for this top budget phone ${bdtKeyword}.`;
    }

    // 3. Advanced SEO Overview with LSI integration
    let seoOverview = `The **${p.name}** stands out as one of the most compelling smartphones of 2026 in the Bangladesh market. It is engineered with the powerful **${chipset}**, delivering exceptional real-world and gaming performance. The front features a stunning **${display}**, offering vibrant visuals whether you are browsing or streaming. Photography is handled by a versatile **${cam}** setup, optimized by next-gen AI image processing for excellent low-light and portrait shots. \n\nBacked by a reliable **${bat}**, the ${p.name} guarantees robust battery backup for heavy daily usage. For buyers in Bangladesh, comparing the official vs. unofficial price of the ${p.name} is crucial, and it consistently offers tremendous value for money. Explore the detailed specifications below to decide if this is the perfect device for you.`;

    // 4. Keywords List Generation (2026 Programmatic Algorithm)
    const keywordSet = new Set<string>();
    keywordSet.add(`${p.name} price in Bangladesh`);
    keywordSet.add(`${p.name} official price BD`);
    keywordSet.add(`${p.name} unofficial price BD`);
    keywordSet.add(`${p.name} full specifications 2026`);
    keywordSet.add(`buy ${p.name} online`);

    if (isBudget || isMidRange) {
        keywordSet.add(`${p.name} PUBG test`);
        keywordSet.add(`best gaming phone ${bdtKeyword}`);
        keywordSet.add(`${p.name} battery backup`);
        keywordSet.add(`${brandName} budget phone BD`);
    }

    if (isFlagship) {
        keywordSet.add(`${p.name} camera test`);
        keywordSet.add(`${p.name} AI features`);
        keywordSet.add(`premium ${brandName} phone 2026`);
        keywordSet.add(`${p.name} vs iPhone 16 Pro`);
    }

    const keywords = Array.from(keywordSet).join(", ");

    // 5. Canonical URL
    const canonical_url = `https://www.techtweak.tech/phones/${brandSlug}/${p.slug}`;

    const updates = {
        meta_title: metaTitle,
        meta_description: metaDescription,
        seo_overview: seoOverview,
        keywords: keywords,
        canonical_url: canonical_url
    };

    await Phone.updateOne({ _id: p._id }, { $set: updates });
    updatedCount++;
  }

  console.log(`Successfully generated Advanced 2026 SEO metadata for ${updatedCount} phones.`);
  mongoose.disconnect();
}

run().catch(console.error);
