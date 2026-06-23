import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";
import Brand from "../src/lib/models/Brand";

async function runSummary() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB.");

  const brand = await Brand.findOne({ slug: "motorola" });
  const phones = await Phone.find({ brand_id: brand._id }).lean();
  
  let totalPhonesProcessed = 15; // Batch 1 + 2 + 3
  let totalFieldsFixed = 76; // Previously calculated: 49 (cam_depth) + Batch 1,2,3 updates (12+7+8) = 76
  
  // To strictly count remaining [REQUIRES REVIEW] fields and missing fields
  let totalRemainingRequiresReview = 0;
  let phoneMissingCounts: { name: string, count: number }[] = [];

  for (const phone of phones) {
    let missingOrReviewCount = 0;
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

    for (const field of expectedFields) {
      const val = (phone as any)[field];
      if (val === null || val === undefined || val === "") {
        missingOrReviewCount++;
      } else if (typeof val === "string" && val.includes("[REQUIRES REVIEW]")) {
        missingOrReviewCount++;
        totalRemainingRequiresReview++;
      }
    }
    
    phoneMissingCounts.push({ name: phone.name, count: missingOrReviewCount });
  }

  // Sort to get top 10
  phoneMissingCounts.sort((a, b) => b.count - a.count);
  const top10 = phoneMissingCounts.slice(0, 10);

  console.log("=== CUMULATIVE SUMMARY ===");
  console.log(`Total Phones Processed So Far: ${totalPhonesProcessed} (Batches 1-3)`);
  console.log(`Total Fields Fixed: ${totalFieldsFixed}`);
  console.log(`Total Remaining [REQUIRES REVIEW] fields: ${totalRemainingRequiresReview}`);
  console.log(`\nTop 10 Phones with Most Missing/Review Data:`);
  top10.forEach((p, idx) => console.log(`${idx + 1}. ${p.name}: ${p.count} fields`));

  process.exit(0);
}

runSummary();
