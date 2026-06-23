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
  console.log("Connected to MongoDB for Remaining Samsung Specs Patch.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

  const remainingSpecs: Record<string, any> = {
    // S Series (Old)
    "samsung-galaxy-s20": { front: "10 MP, f/2.2", main: "12 MP OIS, 64 MP Telephoto, 12 MP UW", bat: "4000 mAh", display_nits: "1200 nits peak", weight: "163 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-s20-plus": { front: "10 MP, f/2.2", main: "12 MP OIS, 64 MP Telephoto, 12 MP UW, 0.3 MP TOF 3D", bat: "4500 mAh", display_nits: "1200 nits peak", weight: "186 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-s20-plus-5g": { front: "10 MP, f/2.2", main: "12 MP OIS, 64 MP Telephoto, 12 MP UW, 0.3 MP TOF 3D", bat: "4500 mAh", display_nits: "1200 nits peak", weight: "188 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-s10": { front: "10 MP, f/1.9", main: "12 MP OIS, 12 MP Telephoto, 16 MP UW", bat: "3400 mAh", display_nits: "1200 nits peak", weight: "157 g", charge: "15W wired, 15W wireless" },
    "samsung-galaxy-s10-plus": { front: "10 MP, f/1.9, 8 MP Depth", main: "12 MP OIS, 12 MP Telephoto, 16 MP UW", bat: "4100 mAh", display_nits: "1200 nits peak", weight: "175 g", charge: "15W wired, 15W wireless" },
    "samsung-galaxy-s10-5g": { front: "10 MP, f/1.9, TOF 3D", main: "12 MP OIS, 12 MP Telephoto, 16 MP UW, 0.3 MP TOF 3D", bat: "4500 mAh", display_nits: "1200 nits peak", weight: "198 g", charge: "25W wired, 15W wireless" },
    "samsung-galaxy-s10e": { front: "10 MP, f/1.9", main: "12 MP OIS, 16 MP UW", bat: "3100 mAh", display_nits: "1200 nits peak", weight: "150 g", charge: "15W wired, 15W wireless" },
    "samsung-galaxy-s10-lite": { front: "32 MP, f/2.2", main: "48 MP OIS, 12 MP UW, 5 MP Macro", bat: "4500 mAh", display_nits: "1200 nits peak", weight: "186 g", charge: "45W wired" },
    "samsung-galaxy-s9": { front: "8 MP, f/1.7", main: "12 MP OIS", bat: "3000 mAh", display_nits: "1000 nits peak", weight: "163 g", charge: "15W wired, 15W wireless" },
    "samsung-galaxy-s9-plus": { front: "8 MP, f/1.7", main: "12 MP OIS, 12 MP Telephoto", bat: "3500 mAh", display_nits: "1000 nits peak", weight: "189 g", charge: "15W wired, 15W wireless" },
    "samsung-galaxy-s8": { front: "8 MP, f/1.7", main: "12 MP OIS", bat: "3000 mAh", display_nits: "1000 nits peak", weight: "155 g", charge: "15W wired, 15W wireless" },
    "samsung-galaxy-s8-plus": { front: "8 MP, f/1.7", main: "12 MP OIS", bat: "3500 mAh", display_nits: "1000 nits peak", weight: "173 g", charge: "15W wired, 15W wireless" },
    "samsung-galaxy-s7": { front: "5 MP, f/1.7", main: "12 MP OIS", bat: "3000 mAh", display_nits: "800 nits peak", weight: "152 g", charge: "15W wired" },
    "samsung-galaxy-s7-edge": { front: "5 MP, f/1.7", main: "12 MP OIS", bat: "3600 mAh", display_nits: "800 nits peak", weight: "157 g", charge: "15W wired" },

    // Note Series (Old)
    "samsung-galaxy-note-9": { front: "8 MP, f/1.7", main: "12 MP OIS, 12 MP Telephoto", bat: "4000 mAh", display_nits: "1050 nits peak", weight: "201 g", charge: "15W wired, 15W wireless" },
    "samsung-galaxy-note-8": { front: "8 MP, f/1.7", main: "12 MP OIS, 12 MP Telephoto", bat: "3300 mAh", display_nits: "1200 nits peak", weight: "195 g", charge: "15W wired, 15W wireless" },
    "samsung-galaxy-note-10-lite": { front: "32 MP, f/2.2", main: "12 MP OIS, 12 MP Telephoto, 12 MP UW", bat: "4500 mAh", display_nits: "1000 nits peak", weight: "199 g", charge: "25W wired" },

    // A Series (Modern & Old)
    "samsung-galaxy-a72": { front: "32 MP, f/2.2", main: "64 MP OIS, 8 MP Telephoto, 12 MP UW, 5 MP Macro", bat: "5000 mAh", display_nits: "800 nits HBM", weight: "203 g", charge: "25W wired" },
    "samsung-galaxy-a71": { front: "32 MP, f/2.2", main: "64 MP, 12 MP UW, 5 MP Macro, 5 MP Depth", bat: "4500 mAh", display_nits: "800 nits typ", weight: "179 g", charge: "25W wired" },
    "samsung-galaxy-a71-5g": { front: "32 MP, f/2.2", main: "64 MP, 12 MP UW, 5 MP Macro, 5 MP Depth", bat: "4500 mAh", display_nits: "800 nits typ", weight: "185 g", charge: "25W wired" },
    "samsung-galaxy-a70": { front: "32 MP, f/2.0", main: "32 MP, 8 MP UW, 5 MP Depth", bat: "4500 mAh", display_nits: "600 nits typ", weight: "183 g", charge: "25W wired" },
    "samsung-galaxy-a52": { front: "32 MP, f/2.2", main: "64 MP OIS, 12 MP UW, 5 MP Macro, 5 MP Depth", bat: "4500 mAh", display_nits: "800 nits HBM", weight: "189 g", charge: "25W wired" },
    "samsung-galaxy-a52-5g": { front: "32 MP, f/2.2", main: "64 MP OIS, 12 MP UW, 5 MP Macro, 5 MP Depth", bat: "4500 mAh", display_nits: "800 nits HBM", weight: "189 g", charge: "25W wired" },
    "samsung-galaxy-a51": { front: "32 MP, f/2.2", main: "48 MP, 12 MP UW, 5 MP Macro, 5 MP Depth", bat: "4000 mAh", display_nits: "600 nits typ", weight: "172 g", charge: "15W wired" },
    "samsung-galaxy-a51-5g": { front: "32 MP, f/2.2", main: "48 MP, 12 MP UW, 5 MP Macro, 5 MP Depth", bat: "4500 mAh", display_nits: "600 nits typ", weight: "187 g", charge: "15W wired" },
    "samsung-galaxy-a50": { front: "25 MP, f/2.0", main: "25 MP, 8 MP UW, 5 MP Depth", bat: "4000 mAh", display_nits: "500 nits typ", weight: "166 g", charge: "15W wired" },
    "samsung-galaxy-a33-5g": { front: "13 MP, f/2.2", main: "48 MP OIS, 8 MP UW, 5 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "800 nits typ", weight: "186 g", charge: "25W wired" },
    "samsung-galaxy-a32": { front: "20 MP, f/2.2", main: "64 MP, 8 MP UW, 5 MP Macro, 5 MP Depth", bat: "5000 mAh", display_nits: "800 nits HBM", weight: "184 g", charge: "15W wired" },
    "samsung-galaxy-a31": { front: "20 MP, f/2.2", main: "48 MP, 8 MP UW, 5 MP Macro, 5 MP Depth", bat: "5000 mAh", display_nits: "600 nits typ", weight: "185 g", charge: "15W wired" },
    "samsung-galaxy-a30": { front: "16 MP, f/2.0", main: "16 MP, 5 MP UW", bat: "4000 mAh", display_nits: "500 nits typ", weight: "165 g", charge: "15W wired" },
    
    // A Series (Budget)
    "samsung-galaxy-a25-5g": { front: "13 MP, f/2.2", main: "50 MP OIS, 8 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "1000 nits HBM", weight: "197 g", charge: "25W wired" },
    "samsung-galaxy-a24-4g": { front: "13 MP, f/2.2", main: "50 MP OIS, 5 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "1000 nits peak", weight: "195 g", charge: "25W wired" },
    "samsung-galaxy-a23": { front: "8 MP, f/2.2", main: "50 MP OIS, 5 MP UW, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "600 nits typ", weight: "195 g", charge: "25W wired" },
    "samsung-galaxy-a22": { front: "13 MP, f/2.2", main: "48 MP OIS, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "600 nits HDR", weight: "186 g", charge: "15W wired" },
    "samsung-galaxy-a16-5g": { front: "13 MP, f/2.0", main: "50 MP, 5 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "800 nits HBM", weight: "200 g", charge: "25W wired" },
    "samsung-galaxy-a15-5g": { front: "13 MP, f/2.0", main: "50 MP, 5 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "800 nits HBM", weight: "200 g", charge: "25W wired" },
    "samsung-galaxy-a15": { front: "13 MP, f/2.0", main: "50 MP, 5 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "800 nits HBM", weight: "200 g", charge: "25W wired" },
    "samsung-galaxy-a14-5g": { front: "13 MP, f/2.0", main: "50 MP, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "500 nits typ", weight: "202 g", charge: "15W wired" },
    "samsung-galaxy-a14": { front: "13 MP, f/2.0", main: "50 MP, 5 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "500 nits typ", weight: "201 g", charge: "15W wired" },
    "samsung-galaxy-a13": { front: "8 MP, f/2.2", main: "50 MP, 5 MP UW, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "500 nits typ", weight: "195 g", charge: "15W wired" },
    "samsung-galaxy-a12": { front: "8 MP, f/2.2", main: "48 MP, 5 MP UW, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "450 nits typ", weight: "205 g", charge: "15W wired" },

    // Ultra Budget
    "samsung-galaxy-a06": { front: "8 MP, f/2.0", main: "50 MP, 2 MP Depth", bat: "5000 mAh", display_nits: "500 nits typ", weight: "189 g", charge: "25W wired" },
    "samsung-galaxy-a05s": { front: "13 MP, f/2.0", main: "50 MP, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "500 nits typ", weight: "194 g", charge: "25W wired" },
    "samsung-galaxy-a05": { front: "8 MP, f/2.0", main: "50 MP, 2 MP Depth", bat: "5000 mAh", display_nits: "500 nits typ", weight: "195 g", charge: "25W wired" },
    "samsung-galaxy-a04s": { front: "5 MP, f/2.2", main: "50 MP, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "400 nits typ", weight: "195 g", charge: "15W wired" },
    "samsung-galaxy-a04": { front: "5 MP, f/2.2", main: "50 MP, 2 MP Depth", bat: "5000 mAh", display_nits: "400 nits typ", weight: "192 g", charge: "15W wired" },

    // M Series
    "samsung-galaxy-m53": { front: "32 MP, f/2.2", main: "108 MP, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "800 nits HBM", weight: "176 g", charge: "25W wired" },
    "samsung-galaxy-m52-5g": { front: "32 MP, f/2.2", main: "64 MP, 12 MP UW, 5 MP Macro", bat: "5000 mAh", display_nits: "800 nits typ", weight: "173 g", charge: "25W wired" },
    "samsung-galaxy-m51": { front: "32 MP, f/2.2", main: "64 MP, 12 MP UW, 5 MP Macro, 5 MP Depth", bat: "7000 mAh", display_nits: "600 nits typ", weight: "213 g", charge: "25W wired" },
    "samsung-galaxy-m33": { front: "8 MP, f/2.2", main: "50 MP, 5 MP UW, 2 MP Macro, 2 MP Depth", bat: "6000 mAh (India) / 5000 mAh (Intl)", display_nits: "500 nits typ", weight: "215 g", charge: "25W wired" },
    "samsung-galaxy-m32": { front: "20 MP, f/2.2", main: "64 MP, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "6000 mAh (India) / 5000 mAh (Intl)", display_nits: "800 nits HBM", weight: "196 g", charge: "25W wired" },
    "samsung-galaxy-m31": { front: "32 MP, f/2.0", main: "64 MP, 8 MP UW, 5 MP Macro, 5 MP Depth", bat: "6000 mAh", display_nits: "600 nits typ", weight: "191 g", charge: "15W wired" },
    "samsung-galaxy-m21": { front: "20 MP, f/2.2", main: "48 MP, 8 MP UW, 5 MP Depth", bat: "6000 mAh", display_nits: "600 nits typ", weight: "188 g", charge: "15W wired" },

    // F Series
    "samsung-galaxy-f62": { front: "32 MP, f/2.2", main: "64 MP, 12 MP UW, 5 MP Macro, 5 MP Depth", bat: "7000 mAh", display_nits: "600 nits typ", weight: "218 g", charge: "25W wired" },
    "samsung-galaxy-f34-5g": { front: "13 MP, f/2.2", main: "50 MP OIS, 8 MP UW, 2 MP Macro", bat: "6000 mAh", display_nits: "1000 nits peak", weight: "208 g", charge: "25W wired" },
    "samsung-galaxy-f23-5g": { front: "8 MP, f/2.2", main: "50 MP, 8 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "500 nits typ", weight: "198 g", charge: "25W wired" },
    "samsung-galaxy-f22": { front: "13 MP, f/2.2", main: "48 MP OIS, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "6000 mAh", display_nits: "600 nits HDR", weight: "203 g", charge: "15W wired" }
  };

  let updated = 0;

  for (const [slug, spec] of Object.entries(remainingSpecs)) {
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

  console.log(`Successfully mapped perfect manual specs for ${updated} remaining Samsung phones.`);
  mongoose.disconnect();
}

run().catch(console.error);
