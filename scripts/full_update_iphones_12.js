require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  const updates = [
    {
      slug: "iphone-12-mini",
      updateData: {
        benchmark_highlight: "AnTuTu ~600,000 | Geekbench Single: ~1580",
        cooling_system: "Standard passive cooling with graphite layers",
        geekbench_score: "Single: ~1,580 / Multi: ~3,900 (Geekbench 5)",
        antutu_score: 600000,
        fabrication: "5 nm (TSMC)",
        cam_ois: "Yes (Main camera)",
        cam_flash: "Dual-LED dual-tone flash",
        cam_macro: "Not supported natively",
        ai_features: ["Smart HDR 3", "Deep Fusion", "Night mode on all cameras"],
        has_ai_assistant: true
      }
    },
    {
      slug: "iphone-12",
      updateData: {
        benchmark_highlight: "AnTuTu ~620,000 | Geekbench Single: ~1590",
        cooling_system: "Standard passive cooling with graphite layers",
        geekbench_score: "Single: ~1,590 / Multi: ~4,000 (Geekbench 5)",
        antutu_score: 620000,
        fabrication: "5 nm (TSMC)",
        cam_ois: "Yes (Main camera)",
        cam_flash: "Dual-LED dual-tone flash",
        cam_macro: "Not supported natively",
        ai_features: ["Smart HDR 3", "Deep Fusion", "Night mode"],
        has_ai_assistant: true
      }
    },
    {
      slug: "iphone-12-pro",
      updateData: {
        benchmark_highlight: "AnTuTu ~630,000 | Geekbench Single: ~1600",
        cooling_system: "Passive cooling, graphite thermal sheets",
        geekbench_score: "Single: ~1,600 / Multi: ~4,050 (Geekbench 5)",
        antutu_score: 630000,
        fabrication: "5 nm (TSMC)",
        cam_ois: "Dual OIS (Main + Telephoto)",
        cam_flash: "Dual-LED dual-tone flash",
        cam_macro: "Not supported natively (relies on crop or third-party)",
        ai_features: ["Apple ProRAW", "Smart HDR 3", "Night mode portraits powered by LiDAR"],
        has_ai_assistant: true
      }
    },
    {
      slug: "iphone-12-pro-max",
      updateData: {
        benchmark_highlight: "AnTuTu ~640,000 | Geekbench Single: ~1600",
        cooling_system: "Passive cooling, graphite thermal sheets",
        geekbench_score: "Single: ~1,600 / Multi: ~4,100 (Geekbench 5)",
        antutu_score: 640000,
        fabrication: "5 nm (TSMC)",
        cam_ois: "Sensor-shift OIS on Main, standard OIS on Telephoto",
        cam_flash: "Dual-LED dual-tone flash",
        cam_macro: "Not supported natively",
        ai_features: ["Apple ProRAW", "Smart HDR 3", "Night mode portraits"],
        has_ai_assistant: true
      }
    }
  ];

  for (const item of updates) {
    const res = await Phone.updateOne({ slug: item.slug }, { $set: item.updateData });
    console.log(`Updated ${item.slug}: matched ${res.matchedCount}, modified ${res.modifiedCount}`);
  }

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

run().catch(e => { console.error(e); process.exit(1); });
