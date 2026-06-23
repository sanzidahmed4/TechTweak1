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
  console.log("Connected to MongoDB.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));

  const phones = await Phone.find({});
  let updatedCount = 0;

  // Cache brands
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
    } else if (p.name.toLowerCase().includes("xiaomi")) {
        brandName = "Xiaomi";
        brandSlug = "xiaomi";
    } else if (p.name.toLowerCase().includes("redmi")) {
        brandName = "Xiaomi";
        brandSlug = "xiaomi";
    } else if (p.name.toLowerCase().includes("poco")) {
        brandName = "POCO";
        brandSlug = "poco";
    }

    const updates: any = {};
    let needsUpdate = false;

    // 1. Meta Title
    if (!p.meta_title) {
        updates.meta_title = `${p.name} Price, Full Specs & Review | TechTweak`;
        needsUpdate = true;
    }

    // 2. Meta Description
    if (!p.meta_description) {
        updates.meta_description = `Check out the full specifications, features, and official price of the ${p.name}. Discover its processor, camera, battery capacity, and expert reviews on TechTweak.`;
        needsUpdate = true;
    }

    // 3. SEO Overview
    if (!p.seo_overview) {
        const chipset = p.processor || p.chipset_highlight || "a powerful processor";
        const display = p.display_type || p.screen_size ? `${p.screen_size || ""} ${p.display_type || "display"}` : "a stunning display";
        const cam = p.cam_main_sensor || p.camera_main || "high-quality camera";
        const bat = p.battery_capacity || p.battery || "long-lasting battery";
        
        updates.seo_overview = `The **${p.name}** is a highly capable smartphone that delivers exceptional performance for its price segment. It is powered by the **${chipset}** and features a vibrant **${display}**. Photography enthusiasts will appreciate the versatile **${cam}** setup, perfect for capturing stunning photos and videos. With a robust **${bat}**, the ${p.name} ensures you stay connected all day. Whether you're gaming, multitasking, or streaming content, this device offers a seamless user experience. Explore the detailed specifications, pricing, and pros/cons below to see if the ${p.name} is the right fit for you.`;
        needsUpdate = true;
    }

    // 4. Canonical URL
    if (!p.canonical_url) {
        updates.canonical_url = `https://www.techtweak.tech/phones/${brandSlug}/${p.slug}`;
        needsUpdate = true;
    }

    // 5. Keywords
    if (!p.keywords) {
        updates.keywords = `${p.name} price, ${p.name} specifications, ${p.name} review, ${brandName} ${p.name}, buy ${p.name}, ${p.name} features`;
        needsUpdate = true;
    }

    // 6. Tags
    if (!p.tags || p.tags.length === 0) {
        const tags = [brandName];
        if (p.has_5g) tags.push("5G");
        if (p.phone_status === "upcoming" || p.phone_status === "rumored") tags.push("Upcoming Phones");
        if (p.price_usd && p.price_usd > 800) tags.push("Flagship");
        if (p.price_usd && p.price_usd <= 300) tags.push("Budget Phone");
        if (p.price_usd && p.price_usd > 300 && p.price_usd <= 800) tags.push("Mid-Range");
        updates.tags = tags;
        needsUpdate = true;
    }

    if (needsUpdate) {
        await Phone.updateOne({ _id: p._id }, { $set: updates });
        updatedCount++;
    }
  }

  console.log(`Successfully generated SEO metadata for ${updatedCount} phones.`);
  mongoose.disconnect();
}

run().catch(console.error);
