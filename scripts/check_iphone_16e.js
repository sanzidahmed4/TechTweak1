require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

async function run() {
  await mongoose.connect(MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  const phone = await Phone.findOne({ slug: "iphone-16e" }).lean();
  console.log("iPhone 16e Specs:");
  console.log(JSON.stringify(phone, null, 2));

  await mongoose.disconnect();
}

run().catch(e => console.error(e));
