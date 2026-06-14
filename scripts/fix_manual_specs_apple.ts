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
  console.log("Connected to MongoDB for Apple Manual Authentic Spec Patch.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

  const appleSpecs: Record<string, any> = {
    // iPhone 16 & 17 Series (including rumors/upcoming)
    "iphone-17-pro-max": { front: "24 MP, f/1.9, PDAF, OIS", main: "48 MP OIS, 48 MP Periscope Telephoto (5x), 48 MP UW", bat: "4676 mAh", display_nits: "2500 nits peak", weight: "225 g", charge: "40W wired, 25W MagSafe" },
    "iphone-17-pro": { front: "24 MP, f/1.9, PDAF, OIS", main: "48 MP OIS, 48 MP Periscope Telephoto (5x), 48 MP UW", bat: "3500 mAh", display_nits: "2500 nits peak", weight: "189 g", charge: "40W wired, 25W MagSafe" },
    "iphone-17-air": { front: "24 MP, f/1.9", main: "48 MP OIS", bat: "3200 mAh", display_nits: "2000 nits peak", weight: "160 g", charge: "30W wired, 15W MagSafe" },
    "iphone-17": { front: "24 MP, f/1.9, PDAF", main: "48 MP OIS, 12 MP UW", bat: "3500 mAh", display_nits: "2000 nits peak", weight: "171 g", charge: "30W wired, 25W MagSafe" },
    "iphone-16-pro-max": { front: "12 MP, f/1.9, PDAF, OIS", main: "48 MP OIS, 12 MP Periscope Telephoto (5x), 48 MP UW", bat: "4685 mAh", display_nits: "2000 nits peak", weight: "227 g", charge: "25W wired, 25W MagSafe" },
    "iphone-16-pro": { front: "12 MP, f/1.9, PDAF, OIS", main: "48 MP OIS, 12 MP Periscope Telephoto (5x), 48 MP UW", bat: "3582 mAh", display_nits: "2000 nits peak", weight: "199 g", charge: "25W wired, 25W MagSafe" },
    "iphone-16-plus": { front: "12 MP, f/1.9, PDAF", main: "48 MP OIS, 12 MP UW", bat: "4674 mAh", display_nits: "2000 nits peak", weight: "199 g", charge: "25W wired, 25W MagSafe" },
    "iphone-16": { front: "12 MP, f/1.9, PDAF", main: "48 MP OIS, 12 MP UW", bat: "3561 mAh", display_nits: "2000 nits peak", weight: "170 g", charge: "25W wired, 25W MagSafe" },
    "iphone-16e": { front: "12 MP, f/2.2, PDAF", main: "48 MP OIS", bat: "3300 mAh", display_nits: "1000 nits peak", weight: "160 g", charge: "20W wired, 15W MagSafe" },

    // iPhone 15 Series
    "iphone-15-pro-max": { front: "12 MP, f/1.9, PDAF, OIS", main: "48 MP OIS, 12 MP Periscope Telephoto (5x), 12 MP UW", bat: "4422 mAh", display_nits: "2000 nits peak", weight: "221 g", charge: "20W wired, 15W MagSafe" },
    "iphone-15-pro": { front: "12 MP, f/1.9, PDAF, OIS", main: "48 MP OIS, 12 MP Telephoto (3x), 12 MP UW", bat: "3274 mAh", display_nits: "2000 nits peak", weight: "187 g", charge: "20W wired, 15W MagSafe" },
    "iphone-15-plus": { front: "12 MP, f/1.9, PDAF", main: "48 MP OIS, 12 MP UW", bat: "4383 mAh", display_nits: "2000 nits peak", weight: "201 g", charge: "20W wired, 15W MagSafe" },
    "iphone-15": { front: "12 MP, f/1.9, PDAF", main: "48 MP OIS, 12 MP UW", bat: "3349 mAh", display_nits: "2000 nits peak", weight: "171 g", charge: "20W wired, 15W MagSafe" },

    // iPhone 14 Series
    "iphone-14-pro-max": { front: "12 MP, f/1.9, PDAF, OIS", main: "48 MP OIS, 12 MP Telephoto, 12 MP UW", bat: "4323 mAh", display_nits: "2000 nits peak", weight: "240 g", charge: "20W wired, 15W MagSafe" },
    "iphone-14-pro": { front: "12 MP, f/1.9, PDAF, OIS", main: "48 MP OIS, 12 MP Telephoto, 12 MP UW", bat: "3200 mAh", display_nits: "2000 nits peak", weight: "206 g", charge: "20W wired, 15W MagSafe" },
    "iphone-14-plus": { front: "12 MP, f/1.9, PDAF", main: "12 MP OIS, 12 MP UW", bat: "4323 mAh", display_nits: "1200 nits peak", weight: "203 g", charge: "20W wired, 15W MagSafe" },
    "iphone-14": { front: "12 MP, f/1.9, PDAF", main: "12 MP OIS, 12 MP UW", bat: "3279 mAh", display_nits: "1200 nits peak", weight: "172 g", charge: "20W wired, 15W MagSafe" },

    // iPhone 13 Series
    "iphone-13-pro-max": { front: "12 MP, f/2.2", main: "12 MP OIS, 12 MP Telephoto, 12 MP UW", bat: "4352 mAh", display_nits: "1200 nits peak", weight: "240 g", charge: "20W wired, 15W MagSafe" },
    "iphone-13-pro": { front: "12 MP, f/2.2", main: "12 MP OIS, 12 MP Telephoto, 12 MP UW", bat: "3095 mAh", display_nits: "1200 nits peak", weight: "204 g", charge: "20W wired, 15W MagSafe" },
    "iphone-13": { front: "12 MP, f/2.2", main: "12 MP OIS, 12 MP UW", bat: "3240 mAh", display_nits: "1200 nits peak", weight: "174 g", charge: "20W wired, 15W MagSafe" },
    "iphone-13-mini": { front: "12 MP, f/2.2", main: "12 MP OIS, 12 MP UW", bat: "2438 mAh", display_nits: "1200 nits peak", weight: "141 g", charge: "20W wired, 15W MagSafe" },

    // iPhone 12 Series
    "iphone-12-pro-max": { front: "12 MP, f/2.2", main: "12 MP OIS, 12 MP Telephoto, 12 MP UW", bat: "3687 mAh", display_nits: "1200 nits peak", weight: "228 g", charge: "20W wired, 15W MagSafe" },
    "iphone-12-pro": { front: "12 MP, f/2.2", main: "12 MP OIS, 12 MP Telephoto, 12 MP UW", bat: "2815 mAh", display_nits: "1200 nits peak", weight: "189 g", charge: "20W wired, 15W MagSafe" },
    "iphone-12": { front: "12 MP, f/2.2", main: "12 MP OIS, 12 MP UW", bat: "2815 mAh", display_nits: "1200 nits peak", weight: "164 g", charge: "20W wired, 15W MagSafe" },
    "iphone-12-mini": { front: "12 MP, f/2.2", main: "12 MP OIS, 12 MP UW", bat: "2227 mAh", display_nits: "1200 nits peak", weight: "135 g", charge: "20W wired, 15W MagSafe" },

    // Older / SE Series
    "iphone-11-pro-max": { front: "12 MP, f/2.2", main: "12 MP OIS, 12 MP Telephoto, 12 MP UW", bat: "3969 mAh", display_nits: "1200 nits peak", weight: "226 g", charge: "18W wired" },
    "iphone-11-pro": { front: "12 MP, f/2.2", main: "12 MP OIS, 12 MP Telephoto, 12 MP UW", bat: "3046 mAh", display_nits: "1200 nits peak", weight: "188 g", charge: "18W wired" },
    "iphone-11": { front: "12 MP, f/2.2", main: "12 MP OIS, 12 MP UW", bat: "3110 mAh", display_nits: "625 nits typ", weight: "194 g", charge: "18W wired" },
    "iphone-se-2022": { front: "7 MP, f/2.2", main: "12 MP OIS", bat: "2018 mAh", display_nits: "625 nits typ", weight: "144 g", charge: "20W wired" },
    "iphone-se-2020": { front: "7 MP, f/2.2", main: "12 MP OIS", bat: "1821 mAh", display_nits: "625 nits typ", weight: "148 g", charge: "18W wired" },
    "iphone-xs-max": { front: "7 MP, f/2.2", main: "12 MP OIS, 12 MP Telephoto", bat: "3174 mAh", display_nits: "625 nits typ", weight: "208 g", charge: "15W wired" },
    "iphone-xs": { front: "7 MP, f/2.2", main: "12 MP OIS, 12 MP Telephoto", bat: "2658 mAh", display_nits: "625 nits typ", weight: "177 g", charge: "15W wired" },
    "iphone-xr": { front: "7 MP, f/2.2", main: "12 MP OIS", bat: "2942 mAh", display_nits: "625 nits typ", weight: "194 g", charge: "15W wired" },
    "iphone-x": { front: "7 MP, f/2.2", main: "12 MP OIS, 12 MP Telephoto", bat: "2716 mAh", display_nits: "625 nits typ", weight: "174 g", charge: "15W wired" }
  };

  let updated = 0;

  for (const [slug, spec] of Object.entries(appleSpecs)) {
    const res = await Phone.updateOne(
        { slug: slug },
        { $set: {
            camera_front: spec.front,
            camera_main: spec.main,
            battery_capacity: spec.bat,
            display_peak_nits: spec.display_nits,
            physical_weight: spec.weight,
            charging_wired: spec.charge
        }}
    );
    if (res.modifiedCount > 0) updated++;
  }

  console.log(`Successfully mapped perfect manual specs for ${updated} Apple phones.`);
  mongoose.disconnect();
}

run().catch(console.error);
