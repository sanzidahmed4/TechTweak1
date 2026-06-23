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
  console.log("Connected to MongoDB for Redmi Manual Authentic Spec Patch.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

  // Authentic spec mapping curated directly from verified hardware databases
  const redmiSpecs: Record<string, any> = {
    "redmi-k60-pro": { front: "16 MP, f/2.45 (Wide)", main: "54 MP OIS, 8 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "1400 nits peak", weight: "201 g / 205 g", charge: "120W wired, 30W wireless" },
    "redmi-k60": { front: "16 MP, f/2.45 (Wide)", main: "64 MP OIS, 8 MP UW, 2 MP Macro", bat: "5500 mAh", display_nits: "1400 nits peak", weight: "199 g / 204 g", charge: "67W wired, 30W wireless" },
    "redmi-k60e": { front: "20 MP, f/2.24 (Wide)", main: "48 MP OIS, 8 MP UW, 2 MP Macro", bat: "5500 mAh", display_nits: "1200 nits peak", weight: "202 g", charge: "67W wired" },
    "redmi-k50-pro": { front: "20 MP (Wide)", main: "108 MP OIS, 8 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "1200 nits peak", weight: "201 g", charge: "120W wired (100% in 19 min)" },
    "redmi-k50": { front: "20 MP (Wide)", main: "48 MP OIS, 8 MP UW, 2 MP Macro", bat: "5500 mAh", display_nits: "1200 nits peak", weight: "201 g", charge: "67W wired (80% in 30 min)" },
    "redmi-k50-gaming": { front: "20 MP (Wide)", main: "64 MP, 8 MP UW, 2 MP Macro", bat: "4700 mAh", display_nits: "800 nits HBM", weight: "210 g", charge: "120W wired (100% in 17 min)" },
    "redmi-k50i": { front: "16 MP, f/2.45 (Wide)", main: "64 MP, 8 MP UW, 2 MP Macro", bat: "5080 mAh", display_nits: "650 nits typ", weight: "200 g", charge: "67W wired" },
    "redmi-k40-pro-plus": { front: "20 MP (Wide)", main: "108 MP, 8 MP UW, 5 MP Telemacro", bat: "4520 mAh", display_nits: "1300 nits peak", weight: "196 g", charge: "33W wired" },
    "redmi-k40-pro": { front: "20 MP (Wide)", main: "64 MP, 8 MP UW, 5 MP Telemacro", bat: "4520 mAh", display_nits: "1300 nits peak", weight: "196 g", charge: "33W wired" },
    "redmi-k40": { front: "20 MP (Wide)", main: "48 MP, 8 MP UW, 5 MP Telemacro", bat: "4520 mAh", display_nits: "1300 nits peak", weight: "196 g", charge: "33W wired" },

    "redmi-note-12-turbo": { front: "16 MP, f/2.4 (Wide)", main: "64 MP OIS, 8 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "1000 nits peak", weight: "181 g", charge: "67W wired" },
    "redmi-note-12-pro-speed": { front: "16 MP, f/2.4 (Wide)", main: "108 MP, 8 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "900 nits peak", weight: "181 g", charge: "67W wired" },
    "redmi-note-12-discovery": { front: "16 MP, f/2.45 (Wide)", main: "200 MP OIS, 8 MP UW, 2 MP Macro", bat: "4300 mAh", display_nits: "900 nits peak", weight: "207.5 g", charge: "210W wired (100% in 9 min)" },

    "redmi-note-11-pro-plus-5g": { front: "16 MP, f/2.45 (Wide)", main: "108 MP, 8 MP UW, 2 MP Macro", bat: "4500 mAh", display_nits: "1200 nits peak", weight: "204 g", charge: "120W wired (100% in 15 min)" },
    "redmi-note-11-pro-5g": { front: "16 MP, f/2.4 (Wide)", main: "108 MP, 8 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "1200 nits peak", weight: "202 g", charge: "67W wired (100% in 42 min)" },
    "redmi-note-11-pro": { front: "16 MP, f/2.4 (Wide)", main: "108 MP, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "1200 nits peak", weight: "202 g", charge: "67W wired (100% in 51 min)" },
    "redmi-note-11s": { front: "16 MP, f/2.4 (Wide)", main: "108 MP, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "1000 nits peak", weight: "179 g", charge: "33W wired" },
    "redmi-note-11": { front: "13 MP, f/2.4 (Wide)", main: "50 MP, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "1000 nits peak", weight: "179 g", charge: "33W wired" },
    "redmi-note-11t-5g": { front: "16 MP, f/2.45 (Wide)", main: "50 MP, 8 MP UW", bat: "5000 mAh", display_nits: "450 nits typ", weight: "195 g", charge: "33W wired" },

    "redmi-note-10-pro-max": { front: "16 MP, f/2.45 (Wide)", main: "108 MP, 8 MP UW, 5 MP Macro, 2 MP Depth", bat: "5020 mAh", display_nits: "1200 nits peak", weight: "192 g", charge: "33W wired" },
    "redmi-note-10-pro": { front: "16 MP, f/2.45 (Wide)", main: "64 MP (108 MP Global), 8 MP UW, 5 MP Macro, 2 MP Depth", bat: "5020 mAh", display_nits: "1200 nits peak", weight: "193 g", charge: "33W wired" },
    "redmi-note-10s": { front: "13 MP, f/2.45 (Wide)", main: "64 MP, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "1100 nits peak", weight: "178.8 g", charge: "33W wired" },
    "redmi-note-10-5g": { front: "8 MP, f/2.0 (Wide)", main: "48 MP, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "500 nits HBM", weight: "190 g", charge: "18W wired" },
    "redmi-note-10": { front: "13 MP, f/2.45 (Wide)", main: "48 MP, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "1100 nits peak", weight: "178.8 g", charge: "33W wired" },

    "redmi-note-9-pro-5g": { front: "16 MP (Wide)", main: "108 MP, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "4820 mAh", display_nits: "450 nits typ", weight: "215 g", charge: "33W wired" },
    "redmi-note-9-pro": { front: "16 MP, f/2.48 (Wide)", main: "64 MP, 8 MP UW, 5 MP Macro, 2 MP Depth", bat: "5020 mAh", display_nits: "450 nits typ", weight: "209 g", charge: "30W wired" },
    "redmi-note-9s": { front: "16 MP, f/2.48 (Wide)", main: "48 MP, 8 MP UW, 5 MP Macro, 2 MP Depth", bat: "5020 mAh", display_nits: "450 nits typ", weight: "209 g", charge: "18W wired" },
    "redmi-note-9": { front: "13 MP, f/2.25 (Standard)", main: "48 MP, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "5020 mAh", display_nits: "450 nits typ", weight: "199 g", charge: "18W wired, 9W reverse wired" },

    "redmi-12": { front: "8 MP, f/2.1 (Wide)", main: "50 MP, 8 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "550 nits peak", weight: "198.5 g", charge: "18W wired" },
    "redmi-10c": { front: "5 MP, f/2.2", main: "50 MP, 2 MP Depth", bat: "5000 mAh", display_nits: "400 nits typ", weight: "190 g", charge: "18W wired" },
    "redmi-10a": { front: "5 MP", main: "13 MP", bat: "5000 mAh", display_nits: "400 nits typ", weight: "194 g", charge: "10W wired" },
    "redmi-10": { front: "8 MP, f/2.0 (Wide)", main: "50 MP, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "400 nits typ", weight: "181 g", charge: "18W wired, 9W reverse wired" },
    "redmi-9t": { front: "8 MP, f/2.05 (Wide)", main: "48 MP, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "6000 mAh", display_nits: "400 nits typ", weight: "198 g", charge: "18W wired, Reverse wired charging" },
    "redmi-9a": { front: "5 MP, f/2.2 (Wide)", main: "13 MP, f/2.2", bat: "5000 mAh", display_nits: "400 nits typ", weight: "194 g", charge: "10W wired" },
    "redmi-9c": { front: "5 MP, f/2.2 (Wide)", main: "13 MP, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "400 nits typ", weight: "196 g", charge: "10W wired" },
    "redmi-9": { front: "8 MP, f/2.0 (Wide)", main: "13 MP, 8 MP UW, 5 MP Macro, 2 MP Depth", bat: "5020 mAh", display_nits: "400 nits typ", weight: "198 g", charge: "18W wired" },
    
    "redmi-note-8-pro": { front: "20 MP, f/2.0 (Wide)", main: "64 MP, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "4500 mAh", display_nits: "500 nits typ", weight: "200 g", charge: "18W wired" },
    "redmi-note-8": { front: "13 MP, f/2.0 (Wide)", main: "48 MP, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "4000 mAh", display_nits: "500 nits typ", weight: "190 g", charge: "18W wired" },
    "redmi-8": { front: "8 MP, f/2.0", main: "12 MP, 2 MP Depth", bat: "5000 mAh", display_nits: "400 nits typ", weight: "188 g", charge: "18W wired" },
    "redmi-8a": { front: "8 MP, f/2.0", main: "12 MP, f/1.8", bat: "5000 mAh", display_nits: "400 nits typ", weight: "188 g", charge: "18W wired" },
    
    "redmi-note-12r": { front: "5 MP, f/2.2 (Wide)", main: "50 MP, 2 MP Depth", bat: "5000 mAh", display_nits: "450 nits typ", weight: "199 g", charge: "18W wired" },
    "redmi-12c": { front: "5 MP, f/2.2", main: "50 MP, 0.08 MP Depth", bat: "5000 mAh", display_nits: "500 nits typ", weight: "192 g", charge: "10W wired" }
  };

  let updated = 0;

  for (const [slug, spec] of Object.entries(redmiSpecs)) {
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

  console.log(`Successfully mapped perfect manual specs for ${updated} Redmi phones.`);
  mongoose.disconnect();
}

run().catch(console.error);
