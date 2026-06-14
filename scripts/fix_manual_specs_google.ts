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
  console.log("Connected to MongoDB for Google Manual Authentic Spec Patch.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

  const googleSpecs: Record<string, any> = {
    "google-pixel-10-pro-fold": { front: "10.5 MP, f/2.2", main: "48 MP OIS, 10.5 MP Telephoto, 10.5 MP UW", bat: "4650 mAh", display_nits: "2700 nits peak", weight: "257 g", charge: "45W wired, wireless" },
    "google-pixel-10-pro-xl": { front: "42 MP, f/2.2", main: "50 MP OIS, 48 MP Telephoto, 48 MP UW", bat: "5060 mAh", display_nits: "3000 nits peak", weight: "221 g", charge: "37W wired, 23W wireless" },
    "google-pixel-10-pro": { front: "42 MP, f/2.2", main: "50 MP OIS, 48 MP Telephoto, 48 MP UW", bat: "4700 mAh", display_nits: "3000 nits peak", weight: "199 g", charge: "27W wired, 21W wireless" },
    "google-pixel-10": { front: "10.5 MP, f/2.2", main: "50 MP OIS, 48 MP UW", bat: "4700 mAh", display_nits: "2700 nits peak", weight: "198 g", charge: "27W wired, 15W wireless" },
    "google-pixel-9-pro-fold": { front: "10 MP, f/2.2 (Cover), 10 MP (Inner)", main: "48 MP OIS, 10.5 MP Telephoto, 10.5 MP UW", bat: "4650 mAh", display_nits: "2700 nits peak", weight: "257 g", charge: "21W wired, 7.5W wireless" },
    "google-pixel-9-pro-xl": { front: "42 MP, f/2.2", main: "50 MP OIS, 48 MP Telephoto, 48 MP UW", bat: "5060 mAh", display_nits: "3000 nits peak", weight: "221 g", charge: "37W wired, 23W wireless" },
    "google-pixel-9-pro": { front: "42 MP, f/2.2", main: "50 MP OIS, 48 MP Telephoto, 48 MP UW", bat: "4700 mAh", display_nits: "3000 nits peak", weight: "199 g", charge: "27W wired, 21W wireless" },
    "google-pixel-9": { front: "10.5 MP, f/2.2", main: "50 MP OIS, 48 MP UW", bat: "4700 mAh", display_nits: "2700 nits peak", weight: "198 g", charge: "27W wired, 15W wireless" },
    "google-pixel-8-pro": { front: "10.5 MP, f/2.2", main: "50 MP OIS, 48 MP Telephoto, 48 MP UW", bat: "5050 mAh", display_nits: "2400 nits peak", weight: "213 g", charge: "30W wired, 23W wireless" },
    "google-pixel-8": { front: "10.5 MP, f/2.2", main: "50 MP OIS, 12 MP UW", bat: "4575 mAh", display_nits: "2000 nits peak", weight: "187 g", charge: "27W wired, 18W wireless" },
    "google-pixel-8a": { front: "13 MP, f/2.2", main: "64 MP OIS, 13 MP UW", bat: "4492 mAh", display_nits: "2000 nits peak", weight: "188 g", charge: "18W wired, 7.5W wireless" },
    "google-pixel-fold": { front: "9.5 MP, f/2.2 (Cover), 8 MP (Inner)", main: "48 MP OIS, 10.8 MP Telephoto, 10.8 MP UW", bat: "4821 mAh", display_nits: "1450 nits peak", weight: "283 g", charge: "21W wired, 7.5W wireless" },
    "google-pixel-7-pro": { front: "10.8 MP, f/2.2", main: "50 MP OIS, 48 MP Telephoto, 12 MP UW", bat: "5000 mAh", display_nits: "1500 nits peak", weight: "212 g", charge: "23W wired, 23W wireless" },
    "google-pixel-7": { front: "10.8 MP, f/2.2", main: "50 MP OIS, 12 MP UW", bat: "4355 mAh", display_nits: "1400 nits peak", weight: "197 g", charge: "20W wired, 20W wireless" },
    "google-pixel-7a": { front: "13 MP, f/2.2", main: "64 MP OIS, 13 MP UW", bat: "4385 mAh", display_nits: "1000 nits peak", weight: "193.5 g", charge: "18W wired, 7.5W wireless" },
    "google-pixel-6-pro": { front: "11.1 MP, f/2.2", main: "50 MP OIS, 48 MP Telephoto, 12 MP UW", bat: "5003 mAh", display_nits: "800 nits typ", weight: "210 g", charge: "23W wired, 23W wireless" },
    "google-pixel-6": { front: "8 MP, f/2.0", main: "50 MP OIS, 12 MP UW", bat: "4614 mAh", display_nits: "800 nits typ", weight: "207 g", charge: "21W wired, 21W wireless" },
    "google-pixel-6a": { front: "8 MP, f/2.0", main: "12.2 MP OIS, 12 MP UW", bat: "4410 mAh", display_nits: "800 nits typ", weight: "178 g", charge: "18W wired" },
    "google-pixel-5a-5g": { front: "8 MP, f/2.0", main: "12.2 MP OIS, 16 MP UW", bat: "4680 mAh", display_nits: "800 nits typ", weight: "183 g", charge: "18W wired" },
    "google-pixel-5": { front: "8 MP, f/2.0", main: "12.2 MP OIS, 16 MP UW", bat: "4080 mAh", display_nits: "800 nits typ", weight: "151 g", charge: "18W wired, 12W wireless" }
  };

  let updated = 0;

  for (const [slug, spec] of Object.entries(googleSpecs)) {
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

  console.log(`Successfully mapped perfect manual specs for ${updated} Google phones.`);
  mongoose.disconnect();
}

run().catch(console.error);
