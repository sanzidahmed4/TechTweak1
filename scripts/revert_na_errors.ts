import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// The fields that should legitimately have data but were wrongly assigned "N/A"
const fieldsToRevert = [
  'bluetooth_version', 'wifi_version', 'usb_type', 'build_material', 
  'storage_type', 'ram_variants', 'storage_variants', 'weight', 
  'dimensions', 'video_recording', 'brightness'
];

async function run() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error("MONGODB_URI not found.");

    await mongoose.connect(MONGODB_URI);
    const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

    console.log("\\n=== REVERTING INCORRECT 'N/A' VALUES ===");
    
    // Find phones that have bluetooth_version === "N/A"
    const affectedPhones = await Phone.find({ slug: /^samsung-/i, bluetooth_version: 'N/A' });
    let revertedCount = 0;

    for (const p of affectedPhones) {
      const updatePayload: Record<string, any> = {};
      let needsUpdate = false;

      for (const field of fieldsToRevert) {
        if (p.get(field) === 'N/A') {
          updatePayload[field] = null; // Revert back to missing
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        await Phone.updateOne({ _id: p._id }, { $set: updatePayload });
        revertedCount++;
        console.log(`🧹 Reverted fields for: ${p.slug}`);
      }
    }

    console.log(`✅ Reversion complete. Cleared incorrect 'N/A' values for ${revertedCount} phones.`);

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
