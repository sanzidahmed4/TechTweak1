require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

async function run() {
  await mongoose.connect(MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  const phones = await Phone.find({ name: /iphone/i }).select("name slug").lean();
  console.log("Found iPhones in DB:");
  phones.forEach(p => console.log(`- ${p.name} (${p.slug})`));

  await mongoose.disconnect();
}

run().catch(e => console.error(e));
