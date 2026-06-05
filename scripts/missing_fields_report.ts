import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";
import Brand from "../src/lib/models/Brand";
import fs from "fs";

async function runMissingFieldsReport() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  
  const brand = await Brand.findOne({ slug: "motorola" });
  const phones = await Phone.find({ brand_id: brand._id }).lean();
  
  let phoneMissingDetails: { name: string, count: number, missingFields: string[] }[] = [];

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

  for (const phone of phones) {
    let missingOrReviewCount = 0;
    let missingFieldsList: string[] = [];
    
    for (const field of expectedFields) {
      const val = (phone as any)[field];
      if (val === null || val === undefined || val === "" || (typeof val === "string" && val.includes("[REQUIRES REVIEW]"))) {
        missingOrReviewCount++;
        missingFieldsList.push(field);
      }
    }
    
    if (missingOrReviewCount > 0) {
      phoneMissingDetails.push({ name: phone.name, count: missingOrReviewCount, missingFields: missingFieldsList });
    }
  }

  // Sort to get top ones
  phoneMissingDetails.sort((a, b) => b.count - a.count);
  
  let mdReport = "# Remaining Missing Fields Report (Post-Batch 4)\n\n";
  mdReport += "This report outlines the phones with the highest number of unresolved fields.\n\n";

  const recoverableLikelihood = (field: string) => {
    const highlyRecoverable = ["gpu", "fabrication", "storage_type", "cpu", "battery_capacity"];
    const moderateRecoverable = ["geekbench_score", "brightness", "benchmark_highlight", "usb_version"];
    const hardRecoverable = ["model_number", "made_in", "cooling_system"];
    
    if (highlyRecoverable.includes(field)) return "Yes (High)";
    if (moderateRecoverable.includes(field)) return "Possible (Medium)";
    if (hardRecoverable.includes(field)) return "Unlikely (Low)";
    return "Possible";
  };

  for (let i = 0; i < Math.min(10, phoneMissingDetails.length); i++) {
    const p = phoneMissingDetails[i];
    mdReport += `### ${i+1}. ${p.name} (${p.count} fields missing)\n`;
    mdReport += `| Field | Recoverable? |\n`;
    mdReport += `|---|---|\n`;
    for (const f of p.missingFields) {
      mdReport += `| \`${f}\` | ${recoverableLikelihood(f)} |\n`;
    }
    mdReport += "\n";
  }

  fs.writeFileSync("C:\\Users\\Sanzid\\.gemini\\antigravity\\brain\\631d2150-7436-4d52-90ff-1d84e00e169a\\motorola_missing_fields_report.md", mdReport);
  console.log("Missing fields report generated.");
  process.exit(0);
}

runMissingFieldsReport();
