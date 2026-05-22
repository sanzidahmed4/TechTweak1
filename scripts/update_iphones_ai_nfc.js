require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  // Group 1: Legacy iPhones (X to 11, SE 2020)
  const legacySlugs = ["iphone-x", "iphone-xr", "iphone-xs", "iphone-xs-max", "iphone-11", "iphone-11-pro", "iphone-11-pro-max", "iphone-se-2020"];
  
  // Group 2: Mid-Gen iPhones (12, 13, 14, 15 non-pro, SE 2022)
  const midSlugs = ["iphone-12-mini", "iphone-12", "iphone-12-pro", "iphone-12-pro-max", "iphone-13-mini", "iphone-13", "iphone-13-pro", "iphone-13-pro-max", "iphone-14", "iphone-14-plus", "iphone-14-pro", "iphone-14-pro-max", "iphone-15", "iphone-se-2022"];

  // Group 3: AI-Ready iPhones (15 Pro Max, 16, 16 Pro Max, 17 Air)
  const aiSlugs = ["iphone-15-pro-max", "iphone-16", "iphone-16-pro-max", "iphone-17-air"];

  // Update Legacy
  await Phone.updateMany(
    { slug: { $in: legacySlugs } },
    {
      $set: {
        has_nfc: true,
        update_policy: "Supported for 5-6 years from release",
        ai_features: ["Basic Siri (Voice Assistant)", "No Generative AI features supported", "No Circle to Search equivalent"]
      }
    }
  );
  console.log("Updated legacy iPhones");

  // Update Mid-Gen
  await Phone.updateMany(
    { slug: { $in: midSlugs } },
    {
      $set: {
        has_nfc: true,
        update_policy: "Approx 5-7 years of software updates",
        ai_features: ["Siri with on-device dictation", "Visual Look Up (Identify objects in photos)", "No Generative AI (Apple Intelligence not supported due to RAM)"]
      }
    }
  );
  console.log("Updated mid-gen iPhones");

  // Update AI-Ready
  await Phone.updateMany(
    { slug: { $in: aiSlugs } },
    {
      $set: {
        has_nfc: true,
        update_policy: "Approx 5-7 years of software updates (Long Term Update Promise)",
        ai_features: [
          "Apple Intelligence fully supported",
          "Generative AI Image Editor (Clean Up in Photos)",
          "Realtime Live Interpreter (Live Translate app)",
          "Next-Gen AI Voice Assistant (Siri with Apple Intelligence)",
          "Circle to Search Equivalent: Visual Intelligence via Camera Control (on iPhone 16 & 17)"
        ]
      }
    }
  );
  console.log("Updated AI-Ready iPhones");

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

run().catch(e => { console.error(e); process.exit(1); });
