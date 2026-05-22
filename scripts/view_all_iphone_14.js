require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

async function run() {
  await mongoose.connect(MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  const slugs = ["iphone-14", "iphone-14-plus", "iphone-14-pro", "iphone-14-pro-max"];
  
  for (const slug of slugs) {
    const phone = await Phone.findOne({ slug }).lean();
    if (!phone) {
      console.log(`❌ ${slug} not found`);
    } else {
      console.log(`--- ${phone.name} (${slug}) ---`);
      console.log(`  refresh_rate: ${JSON.stringify(phone.refresh_rate)}`);
      console.log(`  sim_type: ${JSON.stringify(phone.sim_type)}`);
      console.log(`  usb_type: ${JSON.stringify(phone.usb_type)}`);
      console.log(`  gps_specs: ${JSON.stringify(phone.gps_specs)}`);
      console.log(`  hdr: ${JSON.stringify(phone.hdr)}`);
      console.log(`  charging_reverse: ${JSON.stringify(phone.charging_reverse)}`);
      console.log(`  cam_telephoto: ${JSON.stringify(phone.cam_telephoto)}`);
      console.log(`  protection: ${JSON.stringify(phone.protection)}`);
      console.log(`  water_resistance: ${JSON.stringify(phone.water_resistance)}`);
      console.log(`  meta_keywords: ${JSON.stringify(phone.meta_keywords)}`);
    }
  }

  await mongoose.disconnect();
}

run().catch(e => console.error(e));
