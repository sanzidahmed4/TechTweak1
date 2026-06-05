import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";
import Brand from "../src/lib/models/Brand";

async function generateDeltaReport() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  
  const brand = await Brand.findOne({ slug: "motorola" });
  const allPhones = await Phone.find({ brand_id: brand._id }).lean();
  
  const expectedFields = [
    "price_usd", "release_date", "colors", "model_number", "phone_variants", "made_in",
    "chipset_highlight", "camera_highlight", "display_highlight", "battery_highlight", "benchmark_highlight",
    "weight", "dimensions", "build_material", "sim_type", "water_resistance",
    "display_type", "screen_size", "resolution", "refresh_rate", "brightness", "hdr", "protection", "pixel_density",
    "cpu", "gpu", "fabrication", "ram_variants", "storage_variants", "storage_type", "geekbench_score", "cooling_system",
    "cam_count", "cam_main_sensor", "cam_ultrawide", "cam_telephoto", "cam_macro", "cam_depth", "cam_ois", "cam_flash", "cam_video",
    "cam_front_resolution", "cam_front_hdr", "cam_front_portrait", "cam_front_video",
    "battery_capacity", "charging_wired", "charging_wireless", "charging_reverse", "usb_type",
    "wifi_version", "bluetooth_version", "gps_specs", "usb_version",
    "sensor_fingerprint", "android_version", "ui_version", "update_policy"
  ];

  let currentExplicitReviewCount = 0;
  let currentNullMissingCount = 0;

  for (const phone of allPhones) {
    for (const field of expectedFields) {
      const val = (phone as any)[field];
      if (val === null || val === undefined || val === "") {
        currentNullMissingCount++;
      } else if (typeof val === "string" && val.includes("[REQUIRES REVIEW]")) {
        currentExplicitReviewCount++;
      }
    }
  }

  const currentTotalUnresolved = currentExplicitReviewCount + currentNullMissingCount;

  // Known fixes:
  // Batch 4 fixes: 28 fields
  const batch4Fixes = 28;
  // Batch 5 fixes: 22 fields
  const batch5Fixes = 22;

  const afterBatch5Total = currentTotalUnresolved; 
  const afterBatch4Total = afterBatch5Total + batch5Fixes;
  const afterBatch3Total = afterBatch4Total + batch4Fixes;

  console.log("=== DELTA REPORT AND AUDIT LOGIC INVESTIGATION ===");
  console.log(`Current State (After Batch 5):`);
  console.log(`  Explicit '[REQUIRES REVIEW]' fields: ${currentExplicitReviewCount}`);
  console.log(`  Null/Empty/Missing fields: ${currentNullMissingCount}`);
  console.log(`  Total Unresolved (Combined logic): ${currentTotalUnresolved}`);

  console.log("\n=== HISTORICAL RECONSTRUCTION (Using Combined Logic) ===");
  console.log(`After Batch 3 (Combined Logic): ${afterBatch3Total} unresolved fields`);
  console.log(`After Batch 4 (Combined Logic): ${afterBatch4Total} unresolved fields (28 fixed in B4)`);
  console.log(`After Batch 5 (Combined Logic): ${afterBatch5Total} unresolved fields (22 fixed in B5)`);

  process.exit(0);
}

generateDeltaReport();
