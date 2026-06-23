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
  console.log("Connected to MongoDB for Motorola Manual Authentic Spec Patch.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

  const motorolaSpecs: Record<string, any> = {
    // Razr Series (Foldables)
    "motorola-razr-plus-2024": { front: "32 MP, f/2.4", main: "50 MP OIS, 50 MP Telephoto", bat: "4000 mAh", display_nits: "3000 nits peak", weight: "189 g", charge: "45W wired, 15W wireless" },
    "motorola-razr-2024": { front: "32 MP, f/2.4", main: "50 MP OIS, 13 MP UW", bat: "4200 mAh", display_nits: "3000 nits peak", weight: "188 g", charge: "30W wired, 15W wireless" },
    "motorola-razr-plus-2023": { front: "32 MP, f/2.4", main: "12 MP OIS, 13 MP UW", bat: "3800 mAh", display_nits: "1400 nits peak", weight: "188.5 g", charge: "30W wired, 5W wireless" },
    "motorola-razr-2023": { front: "32 MP, f/2.4", main: "64 MP OIS, 13 MP UW", bat: "4200 mAh", display_nits: "1400 nits peak", weight: "188.6 g", charge: "30W wired, 5W wireless" },
    "motorola-razr-5g-2020": { front: "20 MP, f/2.2", main: "48 MP OIS", bat: "2800 mAh", display_nits: "600 nits typ", weight: "192 g", charge: "15W wired" },
    "motorola-razr-50-ultra": { front: "32 MP, f/2.4", main: "50 MP OIS, 50 MP Telephoto", bat: "4000 mAh", display_nits: "3000 nits peak", weight: "189 g", charge: "45W wired, 15W wireless" },

    // Edge Series
    "motorola-edge-50-pro": { front: "50 MP, f/1.9", main: "50 MP OIS, 10 MP Telephoto, 13 MP UW", bat: "4500 mAh", display_nits: "2000 nits peak", weight: "186 g", charge: "125W wired, 50W wireless" },
    "motorola-edge-plus-2023": { front: "60 MP, f/2.2", main: "50 MP OIS, 50 MP UW, 12 MP Telephoto", bat: "5100 mAh", display_nits: "1300 nits peak", weight: "198 g", charge: "68W wired, 15W wireless" },
    "motorola-edge-2023": { front: "32 MP, f/2.4", main: "50 MP OIS, 13 MP UW", bat: "4400 mAh", display_nits: "1200 nits peak", weight: "168 g", charge: "68W wired, 15W wireless" },
    "motorola-edge-plus-2022": { front: "60 MP, f/2.2", main: "50 MP OIS, 50 MP UW, 2 MP Depth", bat: "4800 mAh", display_nits: "1000 nits peak", weight: "196 g", charge: "30W wired, 15W wireless" },
    "motorola-edge-2022": { front: "32 MP, f/2.4", main: "50 MP OIS, 13 MP UW, 2 MP Depth", bat: "5000 mAh", display_nits: "1000 nits typ", weight: "170 g", charge: "30W wired, 15W wireless" },
    "motorola-edge-2021": { front: "32 MP, f/2.3", main: "108 MP, 8 MP UW, 2 MP Depth", bat: "5000 mAh", display_nits: "800 nits typ", weight: "200 g", charge: "30W wired" },
    "motorola-edge-plus-2020": { front: "25 MP, f/2.0", main: "108 MP OIS, 8 MP Telephoto, 16 MP UW, TOF 3D", bat: "5000 mAh", display_nits: "800 nits typ", weight: "203 g", charge: "18W wired, 15W wireless" },
    "motorola-edge-2020": { front: "25 MP, f/2.0", main: "64 MP, 8 MP Telephoto, 16 MP UW, TOF 3D", bat: "4500 mAh", display_nits: "800 nits typ", weight: "188 g", charge: "18W wired" },

    // Moto G Stylus Series
    "moto-g-stylus-5g-2024": { front: "32 MP, f/2.4", main: "50 MP OIS, 13 MP UW", bat: "5000 mAh", display_nits: "1000 nits peak", weight: "190 g", charge: "30W wired, 15W wireless" },
    "moto-g-stylus-5g-2023": { front: "16 MP, f/2.4", main: "50 MP, 8 MP UW", bat: "5000 mAh", display_nits: "800 nits typ", weight: "202 g", charge: "20W wired" },
    "moto-g-stylus-2023": { front: "8 MP, f/2.0", main: "50 MP, 2 MP Macro", bat: "5000 mAh", display_nits: "600 nits typ", weight: "195 g", charge: "15W wired" },
    "moto-g-stylus-5g-2022": { front: "16 MP, f/2.2", main: "50 MP OIS, 8 MP UW, 2 MP Depth", bat: "5000 mAh", display_nits: "600 nits typ", weight: "215 g", charge: "10W wired" },
    "moto-g-stylus-2022": { front: "16 MP, f/2.2", main: "50 MP, 8 MP UW, 2 MP Depth", bat: "5000 mAh", display_nits: "600 nits typ", weight: "216 g", charge: "10W wired" },
    "moto-g-stylus-5g-2021": { front: "16 MP, f/2.2", main: "48 MP, 8 MP UW, 5 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "500 nits typ", weight: "217.5 g", charge: "10W wired" },
    "moto-g-stylus-2021": { front: "16 MP, f/2.2", main: "48 MP, 8 MP UW, 2 MP Macro, 2 MP Depth", bat: "4000 mAh", display_nits: "500 nits typ", weight: "213 g", charge: "10W wired" },
    "moto-g-stylus-2020": { front: "16 MP, f/2.0", main: "48 MP, 16 MP UW, 2 MP Macro", bat: "4000 mAh", display_nits: "500 nits typ", weight: "192 g", charge: "10W wired" },

    // Moto G Power Series
    "moto-g-power-5g-2024": { front: "16 MP, f/2.4", main: "50 MP OIS, 8 MP UW", bat: "5000 mAh", display_nits: "800 nits typ", weight: "201 g", charge: "30W wired, 15W wireless" },
    "moto-g-power-5g-2023": { front: "16 MP, f/2.4", main: "50 MP, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "600 nits typ", weight: "185 g", charge: "15W wired" },
    "moto-g-power-2022": { front: "8 MP, f/2.0", main: "50 MP, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "600 nits typ", weight: "203 g", charge: "10W wired" },
    "moto-g-power-2021": { front: "8 MP, f/2.0", main: "48 MP, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "600 nits typ", weight: "206.5 g", charge: "15W wired" },
    "moto-g-power-2020": { front: "16 MP, f/2.0", main: "16 MP, 8 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "500 nits typ", weight: "199 g", charge: "10W wired" },

    // Moto G Play & Fast & Pure
    "moto-g-play-2024": { front: "8 MP, f/2.0", main: "50 MP, PDAF", bat: "5000 mAh", display_nits: "600 nits typ", weight: "185 g", charge: "15W wired" },
    "moto-g-play-2023": { front: "5 MP, f/2.4", main: "16 MP, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "500 nits typ", weight: "203 g", charge: "10W wired" },
    "moto-g-play-2021": { front: "5 MP, f/2.2", main: "13 MP, 2 MP Depth", bat: "5000 mAh", display_nits: "500 nits typ", weight: "204 g", charge: "10W wired" },
    "moto-g-fast-2020": { front: "8 MP, f/2.0", main: "16 MP, 8 MP UW, 2 MP Macro", bat: "4000 mAh", display_nits: "500 nits typ", weight: "189 g", charge: "10W wired" },
    "moto-g-pure-2021": { front: "5 MP, f/2.4", main: "13 MP, 2 MP Depth", bat: "4000 mAh", display_nits: "500 nits typ", weight: "188 g", charge: "10W wired" },

    // Moto G 5G Series
    "moto-g-5g-2024": { front: "8 MP, f/2.0", main: "50 MP, 2 MP Macro", bat: "5000 mAh", display_nits: "600 nits typ", weight: "194 g", charge: "18W wired" },
    "moto-g-5g-2023": { front: "8 MP, f/2.0", main: "48 MP, 2 MP Macro", bat: "5000 mAh", display_nits: "600 nits typ", weight: "189 g", charge: "15W wired" },
    "moto-g-5g-2022": { front: "13 MP, f/2.2", main: "50 MP, 2 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "600 nits typ", weight: "204 g", charge: "10W wired" },

    // Others
    "motorola-thinkphone": { front: "32 MP, f/2.4", main: "50 MP OIS, 13 MP UW, 2 MP Depth", bat: "5000 mAh", display_nits: "1200 nits peak", weight: "188.5 g", charge: "68W wired, 15W wireless" },
    "moto-g100-2021": { front: "16 MP, f/2.2 + 8 MP UW", main: "64 MP, 16 MP UW, 2 MP Depth, TOF 3D", bat: "5000 mAh", display_nits: "600 nits typ", weight: "207 g", charge: "20W wired" },
    "motorola-moto-g84-5g": { front: "16 MP, f/2.45", main: "50 MP OIS, 8 MP UW", bat: "5000 mAh", display_nits: "1300 nits peak", weight: "166.8 g", charge: "30W wired" },
    "motorola-one-5g-ace-2021": { front: "16 MP, f/2.2", main: "48 MP, 8 MP UW, 2 MP Macro", bat: "5000 mAh", display_nits: "600 nits typ", weight: "212 g", charge: "15W wired" },
    "motorola-one-5g-2020": { front: "16 MP, f/2.0 + 8 MP UW", main: "48 MP, 8 MP UW, 5 MP Macro, 2 MP Depth", bat: "5000 mAh", display_nits: "600 nits typ", weight: "210 g", charge: "20W wired" },
    "moto-e-2020": { front: "5 MP, f/2.0", main: "13 MP, 2 MP Depth", bat: "3550 mAh", display_nits: "400 nits typ", weight: "185 g", charge: "10W wired" },
    "motorola-moto-e14": { front: "5 MP, f/2.2", main: "13 MP, f/2.2", bat: "5000 mAh", display_nits: "400 nits typ", weight: "178.8 g", charge: "15W wired" }
  };

  let updated = 0;

  for (const [slug, spec] of Object.entries(motorolaSpecs)) {
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

  console.log(`Successfully mapped perfect manual specs for ${updated} Motorola phones.`);
  mongoose.disconnect();
}

run().catch(console.error);
