import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";
import Brand from "../src/lib/models/Brand";
import fs from "fs";

async function generateReport() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB.");

  const brand = await Brand.findOne({ slug: "motorola" });
  if (!brand) {
    console.error("Motorola brand not found!");
    process.exit(1);
  }

  const phones = await Phone.find({ brand_id: brand._id }).lean();
  let totalPublished = 0;
  const missingFieldsList: any[] = [];
  const requiresReviewList: any[] = [];

  for (const phone of phones) {
    if (phone.is_published) {
      totalPublished++;
    }

    const missingFields: string[] = [];
    const requiresReviewFields: string[] = [];

    // Fields that should be populated
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
      
      // Check for missing
      if (val === null || val === undefined || val === "") {
        missingFields.push(field);
      } 
      // Check for requires review
      else if (typeof val === "string" && val.includes("[REQUIRES REVIEW]")) {
        requiresReviewFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      missingFieldsList.push({ name: phone.name, fields: missingFields });
    }
    if (requiresReviewFields.length > 0) {
      requiresReviewList.push({ name: phone.name, fields: requiresReviewFields });
    }
  }

  // Create report markdown
  let report = `# Motorola USA Inventory Report\n\n`;
  report += `**Total Motorola Pages Published:** ${totalPublished}\n\n`;
  
  report += `## Pages with Missing Fields\n`;
  if (missingFieldsList.length === 0) {
    report += `*All records have their expected fields populated.*\n\n`;
  } else {
    for (const item of missingFieldsList) {
      report += `- **${item.name}**: ${item.fields.join(", ")}\n`;
    }
    report += `\n`;
  }

  report += `## Pages Containing [REQUIRES REVIEW]\n`;
  if (requiresReviewList.length === 0) {
    report += `*No records require review.*\n\n`;
  } else {
    for (const item of requiresReviewList) {
      report += `- **${item.name}**: ${item.fields.join(", ")}\n`;
    }
    report += `\n`;
  }

  console.log("=== REPORT GENERATED ===");
  console.log(report);
  
  // Write report to artifact location
  fs.writeFileSync(
    "C:\\Users\\Sanzid\\.gemini\\antigravity\\brain\\631d2150-7436-4d52-90ff-1d84e00e169a\\motorola_summary_report.md", 
    report
  );

  console.log("Report saved as artifact.");
  process.exit(0);
}

generateReport();
