require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

async function run() {
  await mongoose.connect(MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  const phones = await Phone.find({}).select("name slug brand_id").populate({ path: "brand_id", select: "name", options: { strictPopulate: false } }).lean();
  console.log(`Total phones in database: ${phones.length}`);
  
  const brandCounts = {};
  phones.forEach(p => {
    const brandName = p.brand_id?.name || "Unknown Brand";
    brandCounts[brandName] = (brandCounts[brandName] || 0) + 1;
  });

  console.log("Phones by Brand:");
  console.log(JSON.stringify(brandCounts, null, 2));

  console.log("\nList of all phones:");
  phones.forEach(p => {
    console.log(`- [${p.brand_id?.name || 'Unknown'}] ${p.name} (${p.slug})`);
  });

  await mongoose.disconnect();
}

run().catch(e => console.error(e));
