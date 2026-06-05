import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";

async function bulkUpdateCamDepth() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB.");

  // Update missing cam_depth or empty cam_depth to "Not Supported"
  const result = await Phone.updateMany(
    { 
      $or: [
        { cam_depth: { $exists: false } },
        { cam_depth: null },
        { cam_depth: "" }
      ]
    },
    { $set: { cam_depth: "Not Supported" } }
  );

  console.log(`Updated ${result.modifiedCount} phones where cam_depth was missing.`);
  process.exit(0);
}

bulkUpdateCamDepth();
