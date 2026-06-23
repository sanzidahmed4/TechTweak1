require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");
const PhoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const result = await Phone.updateOne(
    { slug: "google-pixel-10-pro-xl" },
    { $set: { price_bdt: 145000, price_official: 145000, price_unofficial: 145000 } }
  );
  
  console.log("Update Result:", result);
  await mongoose.disconnect();
}

run().catch(console.error);
