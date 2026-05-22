require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

async function run() {
  await mongoose.connect(MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  // Update data based on user feedback
  const updateData = {
    has_live_translation: false, 
    has_ai_editing: false,
    charging_reverse: "Not specified",
    cam_front_hdr: "N/A",
    cam_front_portrait: "N/A",
    
    // Clean up ai_features to match user requested "No" values
    ai_features: [
      "Apple Intelligence fully supported",
      "Next-Gen AI Voice Assistant (Siri with Apple Intelligence)",
      "Visual Intelligence via Camera Control"
    ]
  };

  const result = await Phone.updateOne(
    { slug: "iphone-16-pro-max" },
    { $set: updateData }
  );

  console.log(`Updated iphone-16-pro-max: matched ${result.matchedCount}, modified ${result.modifiedCount}`);

  // Fetch and print the updated phone document to verify
  const updatedPhone = await Phone.findOne({ slug: "iphone-16-pro-max" }).lean();
  console.log("Updated Phone Document Fields of Interest:");
  console.log({
    has_live_translation: updatedPhone.has_live_translation,
    has_ai_editing: updatedPhone.has_ai_editing,
    charging_reverse: updatedPhone.charging_reverse,
    cam_front_hdr: updatedPhone.cam_front_hdr,
    cam_front_portrait: updatedPhone.cam_front_portrait,
    ai_features: updatedPhone.ai_features
  });

  await mongoose.disconnect();
}

run().catch(e => console.error(e));
