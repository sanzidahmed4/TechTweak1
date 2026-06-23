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
  console.log("Connected to MongoDB for iQOO Manual Authentic Spec Patch.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

  const iqooSpecs: Record<string, any> = {
    // Flagship Series (13, 12, 11, 10, 9, 8, 7)
    "iqoo-13": { front: "32 MP, f/2.5", main: "50 MP OIS, 50 MP UW, 50 MP Telephoto", bat: "6150 mAh", display_nits: "3000 nits peak", weight: "207 g", charge: "120W wired" },
    "iqoo-12-pro": { front: "16 MP, f/2.5", main: "50 MP OIS, 50 MP UW, 64 MP Periscope", bat: "5100 mAh", display_nits: "3000 nits peak", weight: "205 g", charge: "120W wired, 50W wireless" },
    "iqoo-12": { front: "16 MP, f/2.5", main: "50 MP OIS, 50 MP UW, 64 MP Periscope", bat: "5000 mAh", display_nits: "3000 nits peak", weight: "203.7 g", charge: "120W wired" },
    "iqoo-11-pro": { front: "16 MP, f/2.5", main: "50 MP OIS, 50 MP UW, 13 MP Telephoto", bat: "4700 mAh", display_nits: "1800 nits peak", weight: "210.5 g", charge: "200W wired, 50W wireless" },
    "iqoo-11": { front: "16 MP, f/2.5", main: "50 MP OIS, 8 MP UW, 13 MP Telephoto", bat: "5000 mAh", display_nits: "1800 nits peak", weight: "205 g", charge: "120W wired" },
    "iqoo-11s": { front: "16 MP, f/2.5", main: "50 MP OIS, 8 MP UW, 13 MP Telephoto", bat: "4700 mAh", display_nits: "1800 nits peak", weight: "206.5 g", charge: "200W wired" },
    "iqoo-10-pro": { front: "16 MP, f/2.5", main: "50 MP OIS, 50 MP UW, 14.6 MP Telephoto", bat: "4700 mAh", display_nits: "1500 nits peak", weight: "215.4 g", charge: "200W wired, 50W wireless" },
    "iqoo-10": { front: "16 MP, f/2.5", main: "50 MP OIS, 13 MP UW, 12 MP Telephoto", bat: "4700 mAh", display_nits: "1500 nits peak", weight: "206 g", charge: "120W wired" },
    "iqoo-9t": { front: "16 MP, f/2.5", main: "50 MP OIS, 13 MP UW, 12 MP Telephoto", bat: "4700 mAh", display_nits: "1500 nits peak", weight: "206 g", charge: "120W wired" },
    "iqoo-9-pro": { front: "16 MP, f/2.5", main: "50 MP OIS, 50 MP UW, 16 MP Telephoto", bat: "4700 mAh", display_nits: "1500 nits peak", weight: "204 g", charge: "120W wired, 50W wireless" },
    "iqoo-9-india": { front: "16 MP, f/2.5", main: "48 MP OIS, 13 MP UW, 13 MP Telephoto", bat: "4350 mAh", display_nits: "1200 nits peak", weight: "200 g", charge: "120W wired" },
    "iqoo-9-se": { front: "16 MP, f/2.0", main: "48 MP OIS, 13 MP UW, 2 MP Depth", bat: "4500 mAh", display_nits: "1200 nits peak", weight: "196 g", charge: "66W wired" },
    "iqoo-8-pro": { front: "16 MP, f/2.4", main: "50 MP OIS, 48 MP UW, 16 MP Telephoto", bat: "4500 mAh", display_nits: "1500 nits peak", weight: "205 g", charge: "120W wired, 50W wireless" },
    "iqoo-8": { front: "16 MP, f/2.4", main: "50 MP OIS, 13 MP UW, 13 MP Telephoto", bat: "4350 mAh", display_nits: "1200 nits peak", weight: "199.9 g", charge: "120W wired" },
    "iqoo-7-legend": { front: "16 MP, f/2.0", main: "48 MP OIS, 13 MP UW, 13 MP Portrait", bat: "4000 mAh", display_nits: "1300 nits peak", weight: "209.5 g", charge: "66W wired" },
    "iqoo-7-india": { front: "16 MP, f/2.0", main: "48 MP OIS, 13 MP UW, 2 MP Depth", bat: "4400 mAh", display_nits: "1300 nits peak", weight: "196 g", charge: "66W wired" },
    "iqoo-3": { front: "16 MP, f/2.5", main: "48 MP, 13 MP Telephoto, 13 MP UW, 2 MP Depth", bat: "4440 mAh", display_nits: "1200 nits peak", weight: "214.5 g", charge: "55W wired" },
    
    // Neo Series
    "iqoo-neo-9s-pro-plus": { front: "16 MP, f/2.5", main: "50 MP OIS, 50 MP UW", bat: "5500 mAh", display_nits: "1400 nits peak", weight: "193 g", charge: "120W wired" },
    "iqoo-neo-9s-pro": { front: "16 MP, f/2.5", main: "50 MP OIS, 50 MP UW", bat: "5160 mAh", display_nits: "1400 nits peak", weight: "190 g", charge: "120W wired" },
    "iqoo-neo-9-pro-china": { front: "16 MP, f/2.5", main: "50 MP OIS, 50 MP UW", bat: "5160 mAh", display_nits: "1400 nits peak", weight: "190 g", charge: "120W wired" },
    "iqoo-neo-9": { front: "16 MP, f/2.5", main: "50 MP OIS, 8 MP UW", bat: "5160 mAh", display_nits: "1400 nits peak", weight: "190 g", charge: "120W wired" },
    "iqoo-neo-8-pro": { front: "16 MP, f/2.5", main: "50 MP OIS, 8 MP UW", bat: "5000 mAh", display_nits: "1300 nits peak", weight: "192 g", charge: "120W wired" },
    "iqoo-neo-8": { front: "16 MP, f/2.5", main: "50 MP OIS, 2 MP Depth", bat: "5000 mAh", display_nits: "1300 nits peak", weight: "192 g", charge: "120W wired" },
    "iqoo-neo-7-pro": { front: "16 MP, f/2.5", main: "50 MP OIS, 8 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "1300 nits peak", weight: "197 g", charge: "120W wired" },
    "iqoo-neo-7": { front: "16 MP, f/2.5", main: "64 MP OIS, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "1300 nits peak", weight: "193 g", charge: "120W wired" },
    "iqoo-neo-7-china": { front: "16 MP, f/2.5", main: "50 MP OIS, 8 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "1500 nits peak", weight: "202 g", charge: "120W wired" },
    "iqoo-neo-6-china": { front: "16 MP, f/2.0", main: "64 MP OIS, 12 MP UW, 2 MP Depth", bat: "4700 mAh", display_nits: "1300 nits peak", weight: "197.2 g", charge: "80W wired" },
    "iqoo-neo-6-india": { front: "16 MP, f/2.0", main: "64 MP OIS, 8 MP UW, 2 MP Macro", bat: "4700 mAh", display_nits: "1300 nits peak", weight: "190 g", charge: "80W wired" },
    "iqoo-neo-5": { front: "16 MP, f/2.0", main: "48 MP OIS, 13 MP UW, 2 MP Depth", bat: "4400 mAh", display_nits: "1300 nits peak", weight: "196 g", charge: "66W wired" },
    "iqoo-neo-3-5g": { front: "16 MP, f/2.0", main: "48 MP, 8 MP UW, 2 MP Macro", bat: "4500 mAh", display_nits: "600 nits typ", weight: "198.1 g", charge: "44W wired" },
    
    // Z & U Series
    "iqoo-z9-turbo": { front: "16 MP, f/2.5", main: "50 MP OIS, 8 MP UW", bat: "6000 mAh", display_nits: "4500 nits peak", weight: "194.9 g", charge: "80W wired" },
    "iqoo-z9s-pro": { front: "16 MP, f/2.5", main: "50 MP OIS, 8 MP UW", bat: "5500 mAh", display_nits: "4500 nits peak", weight: "185 g", charge: "80W wired" },
    "iqoo-z9s": { front: "16 MP, f/2.5", main: "50 MP OIS, 2 MP Depth", bat: "5500 mAh", display_nits: "1800 nits peak", weight: "180 g", charge: "44W wired" },
    "iqoo-z9": { front: "16 MP, f/2.0", main: "50 MP OIS, 2 MP Depth", bat: "5000 mAh", display_nits: "1800 nits peak", weight: "188 g", charge: "44W wired" },
    "iqoo-z9x": { front: "8 MP, f/2.1", main: "50 MP, 2 MP Depth", bat: "6000 mAh", display_nits: "1000 nits peak", weight: "199 g", charge: "44W wired" },
    "iqoo-z8": { front: "16 MP, f/2.5", main: "64 MP OIS, 2 MP Depth", bat: "5000 mAh", display_nits: "650 nits typ", weight: "200 g", charge: "120W wired" },
    "iqoo-z8x": { front: "8 MP, f/2.0", main: "50 MP, 2 MP Depth", bat: "6000 mAh", display_nits: "600 nits typ", weight: "199.6 g", charge: "44W wired" },
    "iqoo-z7-pro": { front: "16 MP, f/2.5", main: "64 MP OIS, 2 MP Depth", bat: "4600 mAh", display_nits: "1300 nits peak", weight: "175 g", charge: "66W wired" },
    "iqoo-z7-india": { front: "16 MP, f/2.0", main: "64 MP OIS, 2 MP Depth", bat: "4500 mAh", display_nits: "1300 nits peak", weight: "173 g", charge: "44W wired" },
    "iqoo-z7s": { front: "16 MP, f/2.0", main: "64 MP OIS, 2 MP Depth", bat: "4500 mAh", display_nits: "1300 nits peak", weight: "172 g", charge: "44W wired" },
    "iqoo-z6-pro": { front: "16 MP, f/2.0", main: "64 MP, 8 MP UW, 2 MP Macro", bat: "4700 mAh", display_nits: "1300 nits peak", weight: "180 g", charge: "66W wired" },
    "iqoo-z6-india-5g": { front: "16 MP, f/2.0", main: "50 MP, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "600 nits typ", weight: "186 g", charge: "18W wired" },
    "iqoo-z5": { front: "16 MP, f/2.5", main: "64 MP, 8 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "600 nits typ", weight: "193 g", charge: "44W wired" },
    "iqoo-u5": { front: "8 MP, f/1.8", main: "50 MP, 2 MP Macro", bat: "5000 mAh", display_nits: "600 nits typ", weight: "185 g", charge: "18W wired" },
    "iqoo-u5x": { front: "8 MP, f/2.0", main: "13 MP, 2 MP Macro", bat: "5000 mAh", display_nits: "400 nits typ", weight: "183 g", charge: "10W wired" },
    "iqoo-u3": { front: "8 MP, f/2.0", main: "48 MP, 2 MP Depth", bat: "5000 mAh", display_nits: "400 nits typ", weight: "185.5 g", charge: "18W wired" }
  };

  let updated = 0;

  for (const [slug, spec] of Object.entries(iqooSpecs)) {
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

  console.log(`Successfully mapped perfect manual specs for ${updated} iQOO phones.`);
  mongoose.disconnect();
}

run().catch(console.error);
