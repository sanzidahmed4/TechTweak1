require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

async function run() {
  await mongoose.connect(MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  // Pick some representative phones to inspect
  const slugs = ["iphone-16-pro-max", "samsung-galaxy-s26-ultra", "iphone-13", "iphone-11-pro-max"];

  console.log("=== DB AUDIT RESULTS INSPECTION ===\n");

  for (const slug of slugs) {
    const phone = await Phone.findOne({ slug }).lean();
    if (!phone) {
      console.log(`⚠️ Phone ${slug} not found`);
      continue;
    }

    console.log(`📱 Phone Name: ${phone.name}`);
    console.log(`🔗 Slug: ${phone.slug}`);
    console.log(`🛡️ Screen Protection: ${phone.protection || '❌ Not Set'}`);
    console.log(`💧 Water Resistance: ${phone.water_resistance || '❌ Not Set'}`);
    console.log(`📸 Front Camera HDR: ${phone.cam_front_hdr || '❌ Not Set'}`);
    console.log(`⚡ Reverse Charging: ${phone.charging_reverse || '❌ Not Set'}`);
    console.log(`🧠 AI Live Translation: ${phone.has_live_translation ? '🟢 Yes' : '🔴 No'}`);
    console.log(`🎯 SEO Keywords: ${phone.meta_keywords || '❌ Not Set'}`);
    console.log("------------------------------------------\n");
  }

  await mongoose.disconnect();
}

run().catch(e => console.error(e));
