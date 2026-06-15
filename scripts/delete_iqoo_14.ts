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
  console.log("Connected to MongoDB for iQOO 14 Deletion.");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

  const res = await Phone.deleteOne({ slug: "iqoo-14" });
  
  if (res.deletedCount > 0) {
      console.log("Successfully deleted 'iQOO 14' from the database as it will not be released.");
  } else {
      console.log("iQOO 14 was not found in the database.");
  }

  mongoose.disconnect();
}

run().catch(console.error);
