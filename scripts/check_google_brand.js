require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  await mongoose.connect(MONGODB_URI);
  const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));
  const google = await Brand.findOne({ slug: "google" }).lean();
  console.log("Google Brand:", JSON.stringify(google, null, 2));
  await mongoose.disconnect();
}

run().catch(console.error);
