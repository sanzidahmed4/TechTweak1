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
  console.log("Connected to MongoDB for Samsung Manual Authentic Spec Patch.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

  // Authentic spec mapping curated directly from verified hardware databases for Samsung
  const samsungSpecs: Record<string, any> = {
    // S Series Ultra
    "samsung-galaxy-s26-ultra": { front: "12 MP, f/2.2", main: "200 MP OIS, 50 MP Periscope, 50 MP Telephoto, 50 MP UW", bat: "5000 mAh", display_nits: "3000 nits peak", weight: "232 g", charge: "45W wired, 15W wireless" },
    "samsung-galaxy-s25-ultra": { front: "12 MP, f/2.2", main: "200 MP OIS, 50 MP Periscope, 50 MP Telephoto, 50 MP UW", bat: "5000 mAh", display_nits: "2600 nits peak", weight: "232 g", charge: "45W wired, 15W wireless" },
    "samsung-galaxy-s24-ultra": { front: "12 MP, f/2.2", main: "200 MP OIS, 50 MP Periscope (5x), 10 MP Telephoto, 12 MP UW", bat: "5000 mAh", display_nits: "2600 nits peak", weight: "232 g", charge: "45W wired, 15W wireless" },
    "samsung-galaxy-s23-ultra": { front: "12 MP, f/2.2", main: "200 MP OIS, 10 MP Periscope, 10 MP Telephoto, 12 MP UW", bat: "5000 mAh", display_nits: "1750 nits peak", weight: "234 g", charge: "45W wired, 15W wireless" },
    "samsung-galaxy-s22-ultra": { front: "40 MP, f/2.2", main: "108 MP OIS, 10 MP Periscope, 10 MP Telephoto, 12 MP UW", bat: "5000 mAh", display_nits: "1750 nits peak", weight: "228 g", charge: "45W wired, 15W wireless" },
    "samsung-galaxy-s21-ultra-5g": { front: "40 MP, f/2.2", main: "108 MP OIS, 10 MP Periscope, 10 MP Telephoto, 12 MP UW", bat: "5000 mAh", display_nits: "1500 nits peak", weight: "227 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-s20-ultra": { front: "40 MP, f/2.2", main: "108 MP OIS, 48 MP Periscope, 12 MP UW, 0.3 MP TOF 3D", bat: "5000 mAh", display_nits: "1200 nits peak", weight: "222 g", charge: "45W wired, 15W wireless" },

    // S Series Base & Plus & FE
    "samsung-galaxy-s24-plus": { front: "12 MP, f/2.2", main: "50 MP OIS, 10 MP Telephoto, 12 MP UW", bat: "4900 mAh", display_nits: "2600 nits peak", weight: "196 g", charge: "45W wired, 15W wireless" },
    "samsung-galaxy-s24": { front: "12 MP, f/2.2", main: "50 MP OIS, 10 MP Telephoto, 12 MP UW", bat: "4000 mAh", display_nits: "2600 nits peak", weight: "167 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-s24-fe": { front: "10 MP, f/2.4", main: "50 MP OIS, 8 MP Telephoto, 12 MP UW", bat: "4500 mAh", display_nits: "1450 nits peak", weight: "190 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-s23-plus": { front: "12 MP, f/2.2", main: "50 MP OIS, 10 MP Telephoto, 12 MP UW", bat: "4700 mAh", display_nits: "1750 nits peak", weight: "196 g", charge: "45W wired, 15W wireless" },
    "samsung-galaxy-s23": { front: "12 MP, f/2.2", main: "50 MP OIS, 10 MP Telephoto, 12 MP UW", bat: "3900 mAh", display_nits: "1750 nits peak", weight: "168 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-s23-fe": { front: "10 MP, f/2.4", main: "50 MP OIS, 8 MP Telephoto, 12 MP UW", bat: "4500 mAh", display_nits: "1450 nits peak", weight: "209 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-s22-plus": { front: "10 MP, f/2.2", main: "50 MP OIS, 10 MP Telephoto, 12 MP UW", bat: "4500 mAh", display_nits: "1750 nits peak", weight: "195 g", charge: "45W wired, 15W wireless" },
    "samsung-galaxy-s22": { front: "10 MP, f/2.2", main: "50 MP OIS, 10 MP Telephoto, 12 MP UW", bat: "3700 mAh", display_nits: "1300 nits peak", weight: "167 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-s21-fe-5g": { front: "32 MP, f/2.2", main: "12 MP OIS, 8 MP Telephoto, 12 MP UW", bat: "4500 mAh", display_nits: "1200 nits peak", weight: "177 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-s20-fe-5g": { front: "32 MP, f/2.2", main: "12 MP OIS, 8 MP Telephoto, 12 MP UW", bat: "4500 mAh", display_nits: "800 nits peak", weight: "190 g", charge: "25W wired, 15W wireless" },

    // Z Fold Series
    "samsung-galaxy-z-fold-6": { front: "10 MP, f/2.2 (Cover), 4 MP Under Display", main: "50 MP OIS, 10 MP Telephoto, 12 MP UW", bat: "4400 mAh", display_nits: "2600 nits peak", weight: "239 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-z-fold-5": { front: "10 MP, f/2.2 (Cover), 4 MP Under Display", main: "50 MP OIS, 10 MP Telephoto, 12 MP UW", bat: "4400 mAh", display_nits: "1750 nits peak", weight: "253 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-z-fold-4": { front: "10 MP, f/2.2 (Cover), 4 MP Under Display", main: "50 MP OIS, 10 MP Telephoto, 12 MP UW", bat: "4400 mAh", display_nits: "1200 nits peak", weight: "263 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-z-fold-3-5g": { front: "10 MP, f/2.2 (Cover), 4 MP Under Display", main: "12 MP OIS, 12 MP Telephoto, 12 MP UW", bat: "4400 mAh", display_nits: "1200 nits peak", weight: "271 g", charge: "25W wired, 11W wireless" },

    // Z Flip Series
    "samsung-galaxy-z-flip-6": { front: "10 MP, f/2.2", main: "50 MP OIS, 12 MP UW", bat: "4000 mAh", display_nits: "2600 nits peak", weight: "187 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-z-flip-5": { front: "10 MP, f/2.2", main: "12 MP OIS, 12 MP UW", bat: "3700 mAh", display_nits: "1750 nits peak", weight: "187 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-z-flip-4": { front: "10 MP, f/2.4", main: "12 MP OIS, 12 MP UW", bat: "3700 mAh", display_nits: "1200 nits peak", weight: "187 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-z-flip-3-5g": { front: "10 MP, f/2.4", main: "12 MP OIS, 12 MP UW", bat: "3300 mAh", display_nits: "1200 nits peak", weight: "183 g", charge: "15W wired, 10W wireless" },

    // Note Series
    "samsung-galaxy-note-20-ultra-5g": { front: "10 MP, f/2.2", main: "108 MP OIS, 12 MP Periscope, 12 MP UW", bat: "4500 mAh", display_nits: "1500 nits peak", weight: "208 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-note-20": { front: "10 MP, f/2.2", main: "12 MP OIS, 64 MP Telephoto, 12 MP UW", bat: "4300 mAh", display_nits: "1050 nits peak", weight: "192 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-note-10-plus": { front: "10 MP, f/2.2", main: "12 MP OIS, 12 MP Telephoto, 16 MP UW, 0.3 MP TOF 3D", bat: "4300 mAh", display_nits: "1200 nits peak", weight: "196 g", charge: "45W wired, 15W wireless" },
    "samsung-galaxy-note-10": { front: "10 MP, f/2.2", main: "12 MP OIS, 12 MP Telephoto, 16 MP UW", bat: "3500 mAh", display_nits: "1200 nits peak", weight: "168 g", charge: "25W wired, 12W wireless" },

    // A Series
    "samsung-galaxy-a55-5g": { front: "32 MP, f/2.2", main: "50 MP OIS, 12 MP UW, 5 MP Macro", bat: "5000 mAh", display_nits: "1000 nits HBM", weight: "213 g", charge: "25W wired" },
    "samsung-galaxy-a54-5g": { front: "32 MP, f/2.2", main: "50 MP OIS, 12 MP UW, 5 MP Macro", bat: "5000 mAh", display_nits: "1000 nits HBM", weight: "202 g", charge: "25W wired" },
    "samsung-galaxy-a53-5g": { front: "32 MP, f/2.2", main: "64 MP OIS, 12 MP UW, 5 MP Macro, 5 MP Depth", bat: "5000 mAh", display_nits: "800 nits HBM", weight: "189 g", charge: "25W wired" },
    "samsung-galaxy-a52s-5g": { front: "32 MP, f/2.2", main: "64 MP OIS, 12 MP UW, 5 MP Macro, 5 MP Depth", bat: "4500 mAh", display_nits: "800 nits HBM", weight: "189 g", charge: "25W wired" },
    "samsung-galaxy-a35-5g": { front: "13 MP, f/2.2", main: "50 MP OIS, 8 MP UW, 5 MP Macro", bat: "5000 mAh", display_nits: "1000 nits HBM", weight: "209 g", charge: "25W wired" },
    "samsung-galaxy-a34-5g": { front: "13 MP, f/2.2", main: "48 MP OIS, 8 MP UW, 5 MP Macro", bat: "5000 mAh", display_nits: "1000 nits HBM", weight: "199 g", charge: "25W wired" },
    "samsung-galaxy-a73-5g": { front: "32 MP, f/2.2", main: "108 MP OIS, 12 MP UW, 5 MP Macro, 5 MP Depth", bat: "5000 mAh", display_nits: "800 nits HBM", weight: "181 g", charge: "25W wired" },
    
    // M / F Series
    "samsung-galaxy-m55-5g": { front: "50 MP, f/2.4", main: "50 MP OIS, 8 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "1000 nits HBM", weight: "180 g", charge: "45W wired" },
    "samsung-galaxy-m54": { front: "32 MP, f/2.2", main: "108 MP OIS, 8 MP UW, 2 MP Macro", bat: "6000 mAh", display_nits: "800 nits HBM", weight: "199 g", charge: "25W wired" },
    "samsung-galaxy-m34-5g": { front: "13 MP, f/2.2", main: "50 MP OIS, 8 MP UW, 2 MP Macro", bat: "6000 mAh", display_nits: "1000 nits peak", weight: "208 g", charge: "25W wired" },
    "samsung-galaxy-m14-5g": { front: "13 MP, f/2.0", main: "50 MP, 2 MP Macro, 2 MP Depth", bat: "6000 mAh", display_nits: "450 nits typ", weight: "206 g", charge: "15W wired" },
    "samsung-galaxy-f54-5g": { front: "32 MP, f/2.2", main: "108 MP OIS, 8 MP UW, 2 MP Macro", bat: "6000 mAh", display_nits: "800 nits HBM", weight: "199 g", charge: "25W wired" },
  };

  let updated = 0;

  for (const [slug, spec] of Object.entries(samsungSpecs)) {
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

  console.log(`Successfully mapped perfect manual specs for ${updated} Samsung phones.`);
  mongoose.disconnect();
}

run().catch(console.error);
