require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

async function run() {
  await mongoose.connect(MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  const phones = await Phone.find({}).lean();
  console.log(`Auditing ${phones.length} phones...`);

  const keysToCheck = [
    "weight",
    "dimensions",
    "build_material",
    "sim_type",
    "display_type",
    "screen_size",
    "resolution",
    "refresh_rate",
    "brightness",
    "hdr",
    "protection",
    "pixel_density",
    "processor",
    "cpu",
    "gpu",
    "fabrication",
    "ram_variants",
    "storage_variants",
    "storage_type",
    "geekbench_score",
    "antutu_score",
    "cooling_system",
    "cam_count",
    "cam_main_sensor",
    "cam_ultrawide",
    "cam_telephoto",
    "cam_macro",
    "cam_ois",
    "cam_flash",
    "cam_video",
    "cam_front_resolution",
    "cam_front_hdr",
    "cam_front_portrait",
    "cam_front_video",
    "battery_capacity",
    "battery",
    "charging_wired",
    "charging_wireless",
    "charging_reverse",
    "charger_included",
    "usb_type",
    "wifi_version",
    "bluetooth_version",
    "gps_specs",
    "sensor_fingerprint",
    "update_policy"
  ];

  const reports = [];

  for (const phone of phones) {
    const missingFields = [];
    keysToCheck.forEach(key => {
      const val = phone[key];
      if (val === undefined || val === null || val === "") {
        missingFields.push(key);
      }
    });

    reports.push({
      name: phone.name,
      slug: phone.slug,
      missingCount: missingFields.length,
      missingFields: missingFields
    });
  }

  // Sort by missingCount descending
  reports.sort((a, b) => b.missingCount - a.missingCount);

  console.log("\n=== DATABASE AUDIT REPORT ===");
  reports.forEach(r => {
    console.log(`📱 ${r.name} (${r.slug}) - Missing/Empty Fields: ${r.missingCount}`);
    if (r.missingCount > 0) {
      console.log(`   └─ Missing: ${r.missingFields.join(", ")}`);
    }
  });

  const totalMissing = reports.reduce((sum, r) => sum + r.missingCount, 0);
  console.log(`\nTotal empty or missing specification fields across all phones: ${totalMissing}`);

  await mongoose.disconnect();
}

run().catch(e => console.error(e));
