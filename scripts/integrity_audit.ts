import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";
import Brand from "../src/lib/models/Brand";
import fs from "fs";

async function runAudit() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const brand = await Brand.findOne({ slug: "motorola" });
  const allPhones = await Phone.find({ brand_id: brand._id }).lean();

  const criticalFields = [
    "price_usd", "release_date", "model_number", "cpu", "gpu", 
    "display_type", "screen_size", "resolution", "battery_capacity"
  ];
  
  const reviewFields = [
    "geekbench_score", "brightness", "benchmark_highlight", "cooling_system"
  ];
  
  const allExpectedFields = [
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

  let totalActivePhones = allPhones.length;
  let totalProductionReady = 0;
  let totalCriticalMissing = 0;
  let totalReviewMissing = 0;
  let totalOptionalMissing = 0;

  // Trackers for duplicates
  const names = new Set();
  const slugs = new Set();
  const modelNumbers = new Set();
  const duplicates = { names: [] as string[], slugs: [] as string[], models: [] as string[] };
  const seoIssues = [] as string[];
  const imageIssues = [] as string[];
  const structuredDataIssues = [] as string[]; // Assume price_usd, images, name, description are needed for JSON-LD

  const phoneStats = [];

  for (const phone of allPhones) {
    const p = phone as any;
    
    // Check duplicates
    if (names.has(p.name)) duplicates.names.push(p.name);
    else names.add(p.name);

    if (slugs.has(p.slug)) duplicates.slugs.push(p.slug);
    else slugs.add(p.slug);

    if (p.model_number && p.model_number !== "[REQUIRES REVIEW]") {
      if (modelNumbers.has(p.model_number)) duplicates.models.push(`${p.name} (${p.model_number})`);
      else modelNumbers.add(p.model_number);
    }

    // Check images
    if (!p.images || p.images.length === 0) {
      imageIssues.push(`${p.name}: No images`);
    } else {
      for (const img of p.images) {
        if (!img.startsWith("http")) imageIssues.push(`${p.name}: Invalid image URL format - ${img}`);
      }
    }

    // Check SEO
    if (!p.meta_title) seoIssues.push(`${p.name}: Missing meta_title`);
    if (!p.meta_description) seoIssues.push(`${p.name}: Missing meta_description`);
    if (!p.meta_keywords) seoIssues.push(`${p.name}: Missing meta_keywords`);
    if (!p.og_image) seoIssues.push(`${p.name}: Missing og_image`);
    if (!p.slug) seoIssues.push(`${p.name}: Missing canonical slug`);

    // Check Structured Data essentials
    if (!p.price_usd) structuredDataIssues.push(`${p.name}: Missing price for Product schema`);
    
    // Count missing fields
    let missingCritical = 0;
    let missingReview = 0;
    let missingOptional = 0;

    const isMissing = (val: any) => val === null || val === undefined || val === "" || (typeof val === "string" && val.includes("[REQUIRES REVIEW]"));

    for (const field of allExpectedFields) {
      if (isMissing(p[field])) {
        if (criticalFields.includes(field)) {
          missingCritical++;
          totalCriticalMissing++;
        } else if (reviewFields.includes(field)) {
          missingReview++;
          totalReviewMissing++;
        } else {
          missingOptional++;
          totalOptionalMissing++;
        }
      }
    }

    if (!p.images || p.images.length === 0 || p.images[0].includes("[REQUIRES REVIEW]")) {
      missingCritical++;
      totalCriticalMissing++;
    }

    if (missingCritical === 0) {
      totalProductionReady++;
    }

    phoneStats.push({
      name: p.name,
      critical: missingCritical,
      review: missingReview,
      optional: missingOptional,
      totalMissing: missingCritical + missingReview + missingOptional
    });
  }

  // Sort phones by highest remaining unresolved fields
  phoneStats.sort((a, b) => b.totalMissing - a.totalMissing);

  let report = "# Motorola Database Integrity Audit\n\n";
  report += `## 1. Overall Statistics\n`;
  report += `- Total Active Phones: ${totalActivePhones}\n`;
  report += `- Total Production Ready Phones: ${totalProductionReady}\n`;
  report += `- Total Critical Missing Fields: ${totalCriticalMissing}\n`;
  report += `- Total Review Fields Remaining: ${totalReviewMissing}\n`;
  report += `- Total Optional Fields Remaining: ${totalOptionalMissing}\n\n`;

  report += `## 2. Integrity Checks\n`;
  report += `- Duplicate Phone Names: ${duplicates.names.length === 0 ? 'None [PASS]' : duplicates.names.join(', ')}\n`;
  report += `- Duplicate Slugs: ${duplicates.slugs.length === 0 ? 'None [PASS]' : duplicates.slugs.join(', ')}\n`;
  report += `- Duplicate Model Numbers: ${duplicates.models.length === 0 ? 'None [PASS]' : duplicates.models.join(', ')}\n`;
  report += `- Broken / Missing Image URLs: ${imageIssues.length === 0 ? 'None [PASS]' : imageIssues.length + ' issues'}\n`;
  report += `- SEO Metadata Issues: ${seoIssues.length === 0 ? 'None [PASS]' : seoIssues.length + ' issues'}\n`;
  report += `- Structured Data Issues: ${structuredDataIssues.length === 0 ? 'None [PASS]' : structuredDataIssues.length + ' issues'}\n\n`;

  if (imageIssues.length > 0) {
    report += `### Image Issues Details (Sample)\n`;
    report += imageIssues.slice(0, 10).map(i => `- ${i}`).join('\n') + `\n\n`;
  }
  if (seoIssues.length > 0) {
    report += `### SEO Issues Details (Sample)\n`;
    report += seoIssues.slice(0, 10).map(i => `- ${i}`).join('\n') + `\n\n`;
  }
  if (structuredDataIssues.length > 0) {
    report += `### Structured Data Issues Details (Sample)\n`;
    report += structuredDataIssues.slice(0, 10).map(i => `- ${i}`).join('\n') + `\n\n`;
  }

  report += `## 3. Top 20 Phones with Highest Remaining Unresolved Fields\n\n`;
  report += `| Phone Name | Critical Missing | Review Missing | Optional Missing | Total Unresolved |\n`;
  report += `|---|---|---|---|---|\n`;
  for (let i = 0; i < Math.min(20, phoneStats.length); i++) {
    const s = phoneStats[i];
    report += `| ${s.name} | ${s.critical} | ${s.review} | ${s.optional} | ${s.totalMissing} |\n`;
  }

  fs.writeFileSync("C:\\Users\\Sanzid\\.gemini\\antigravity\\brain\\631d2150-7436-4d52-90ff-1d84e00e169a\\motorola_integrity_audit.md", report);
  console.log("Audit Complete. Report generated.");

  // For Batch 9, let's find the top 5 phones that have critical fields > 0, to process them next
  const batch9Queue = phoneStats.filter(p => p.critical > 0).slice(0, 5);
  console.log("SUGGESTED BATCH 9:");
  batch9Queue.forEach(p => console.log(`- ${p.name}`));

  process.exit(0);
}

runAudit();
