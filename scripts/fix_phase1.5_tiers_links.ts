import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const manualFixes: Record<string, any> = {
  // S26 Series
  "samsung-galaxy-s26-ultra": { price_segment: "Ultra Premium", performance_tier: "Enthusiast", camera_tier: "Pro", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s25-ultra", "samsung-galaxy-s26-plus"] } },
  "samsung-galaxy-s26-plus": { price_segment: "Flagship", performance_tier: "High-End", camera_tier: "Excellent", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s26-ultra", "samsung-galaxy-s26"] } },
  "samsung-galaxy-s26": { price_segment: "Flagship", performance_tier: "High-End", camera_tier: "Excellent", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s26-plus", "samsung-galaxy-s26-fe"] } },
  
  // S25 Series
  "samsung-galaxy-s25-ultra": { price_segment: "Ultra Premium", performance_tier: "High-End", camera_tier: "Pro", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s24-ultra", "samsung-galaxy-s26-ultra"] } },
  "samsung-galaxy-s25-plus": { price_segment: "Flagship", performance_tier: "High-End", camera_tier: "Excellent", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s25-ultra", "samsung-galaxy-s25"] } },
  "samsung-galaxy-s25": { price_segment: "Flagship", performance_tier: "High-End", camera_tier: "Excellent", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s25-plus", "samsung-galaxy-s25-fe"] } },
  "samsung-galaxy-s25-fe": { price_segment: "Premium Mid-Range", performance_tier: "High-End", camera_tier: "Excellent", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s25", "samsung-galaxy-s24-fe"] } },
  
  // S24 Series
  "samsung-galaxy-s24-ultra": { price_segment: "Ultra Premium", performance_tier: "High-End", camera_tier: "Pro", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s23-ultra", "samsung-galaxy-s25-ultra"] } },
  "samsung-galaxy-s24-plus": { price_segment: "Flagship", performance_tier: "High-End", camera_tier: "Excellent", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s24-ultra", "samsung-galaxy-s24"] } },
  "samsung-galaxy-s24": { price_segment: "Flagship", performance_tier: "High-End", camera_tier: "Excellent", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s24-plus", "samsung-galaxy-s24-fe"] } },
  "samsung-galaxy-s24-fe": { price_segment: "Premium Mid-Range", performance_tier: "High-End", camera_tier: "Excellent", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s24", "samsung-galaxy-s23-fe"] } },
  
  // S23 Series
  "samsung-galaxy-s23-ultra": { price_segment: "Ultra Premium", performance_tier: "High-End", camera_tier: "Pro", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s22-ultra", "samsung-galaxy-s24-ultra"] } },
  "samsung-galaxy-s23-plus": { price_segment: "Flagship", performance_tier: "High-End", camera_tier: "Excellent", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s23-ultra", "samsung-galaxy-s23"] } },
  "samsung-galaxy-s23": { price_segment: "Flagship", performance_tier: "High-End", camera_tier: "Excellent", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s23-plus", "samsung-galaxy-s23-fe"] } },
  "samsung-galaxy-s23-fe": { price_segment: "Premium Mid-Range", performance_tier: "High-End", camera_tier: "Good", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s23", "samsung-galaxy-s21-fe"] } },

  // S22 Series
  "samsung-galaxy-s22-ultra": { price_segment: "Ultra Premium", performance_tier: "High-End", camera_tier: "Pro", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s21-ultra-5g", "samsung-galaxy-s23-ultra"] } },
  "samsung-galaxy-s22-plus": { price_segment: "Flagship", performance_tier: "Mainstream", camera_tier: "Excellent", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s22-ultra", "samsung-galaxy-s22"] } },
  "samsung-galaxy-s22": { price_segment: "Flagship", performance_tier: "Mainstream", camera_tier: "Excellent", battery_tier: "Basic", internal_links: { same_brand: ["samsung-galaxy-s22-plus"] } },

  // S21 Series
  "samsung-galaxy-s21-ultra-5g": { price_segment: "Ultra Premium", performance_tier: "Mainstream", camera_tier: "Pro", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s20-ultra", "samsung-galaxy-s22-ultra"] } },
  "samsung-galaxy-s21-plus-5g": { price_segment: "Flagship", performance_tier: "Mainstream", camera_tier: "Excellent", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s21-ultra-5g", "samsung-galaxy-s21-5g"] } },
  "samsung-galaxy-s21-5g": { price_segment: "Flagship", performance_tier: "Mainstream", camera_tier: "Excellent", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s21-plus-5g", "samsung-galaxy-s21-fe-5g"] } },
  "samsung-galaxy-s21-fe-5g": { price_segment: "Premium Mid-Range", performance_tier: "Mainstream", camera_tier: "Good", battery_tier: "Standard", internal_links: { same_brand: ["samsung-galaxy-s21-5g", "samsung-galaxy-s23-fe"] } }
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    for (const [slug, data] of Object.entries(manualFixes)) {
      await Phone.updateOne({ slug }, { $set: data });
      console.log(`✅ Updated Tiers & Links for: ${slug}`);
    }

    // Auto fix any remaining missing tiers based on price/processor heuristics
    const allPhones = await Phone.find({ price_segment: { $exists: false } });
    for (const p of allPhones) {
      const price = p.price_usd || 0;
      let price_segment = "Budget";
      if (price > 900) price_segment = "Ultra Premium";
      else if (price > 600) price_segment = "Flagship";
      else if (price > 350) price_segment = "Premium Mid-Range";
      else if (price > 200) price_segment = "Mid-Range";
      else if (price > 120) price_segment = "Budget";
      else price_segment = "Entry-Level";

      await Phone.updateOne(
        { _id: p._id },
        { 
          $set: { 
            price_segment,
            performance_tier: price > 600 ? "High-End" : "Mainstream",
            camera_tier: price > 800 ? "Pro" : price > 400 ? "Excellent" : "Good",
            battery_tier: p.battery_capacity && String(p.battery_capacity).includes('6000') ? "Endurance" : "Standard",
            "internal_links.same_brand": [] // Empty array fallback if missing
          }
        }
      );
      console.log(`✅ Auto-fixed tiers for: ${p.name}`);
    }

    console.log("🎉 Phase 1.5 - Tiers & Links completed successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
