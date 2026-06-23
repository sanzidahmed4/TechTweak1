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
  console.log("Connected to MongoDB for POCO Brand Migration.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));

  const pocoBrand = await Brand.findOne({ slug: "poco" });
  const xiaomiBrand = await Brand.findOne({ slug: "xiaomi" });

  if (!pocoBrand || !xiaomiBrand) {
      console.log("Error: Both POCO and Xiaomi brands must exist in the database.");
      return mongoose.disconnect();
  }

  // Find all phones under Xiaomi that have "poco" in their slug
  const result = await Phone.updateMany(
      { 
          brand_id: xiaomiBrand._id, 
          slug: { $regex: /poco/i } 
      },
      { 
          $set: { brand_id: pocoBrand._id } 
      }
  );

  console.log(`Migration Complete: Successfully moved ${result.modifiedCount} POCO phones from Xiaomi to the independent POCO brand.`);

  // Verify
  const newPocoCount = await Phone.countDocuments({ brand_id: pocoBrand._id });
  console.log(`Total phones now under POCO brand: ${newPocoCount}`);

  mongoose.disconnect();
}

run().catch(console.error);
