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
      slug: "iphone-13-mini",
      updateData: {
        benchmark_highlight: "AnTuTu ~750,000 | Geekbench Single: ~1700",
        cooling_system: "Standard passive cooling",
        geekbench_score: "Single: ~1,700 / Multi: ~4,500 (Geekbench 5)",
        antutu_score: 750000,
        fabrication: "5 nm (TSMC)",
        cam_ois: "Sensor-shift OIS",
        cam_flash: "Dual-LED dual-tone flash",
        cam_macro: "Not supported natively",
        ai_features: ["Smart HDR 4", "Photographic Styles", "Cinematic mode"],
        has_ai_assistant: true
      }
    },
    {
      slug: "iphone-13",
      updateData: {
        benchmark_highlight: "AnTuTu ~770,000 | Geekbench Single: ~1720",
        cooling_system: "Standard passive cooling",
        geekbench_score: "Single: ~1,720 / Multi: ~4,600 (Geekbench 5)",
        antutu_score: 770000,
        fabrication: "5 nm (TSMC)",
        cam_ois: "Sensor-shift OIS",
        cam_flash: "Dual-LED dual-tone flash",
        cam_macro: "Not supported natively",
        ai_features: ["Smart HDR 4", "Photographic Styles", "Cinematic mode"],
        has_ai_assistant: true
      }
    },
    {
      slug: "iphone-13-pro",
      updateData: {
        benchmark_highlight: "AnTuTu ~800,000 | Geekbench Single: ~1730",
        cooling_system: "Passive cooling, graphite thermal sheets",
        geekbench_score: "Single: ~1,730 / Multi: ~4,700 (Geekbench 5)",
        antutu_score: 800000,
        fabrication: "5 nm (TSMC)",
        cam_ois: "Sensor-shift OIS on Main, standard OIS on Telephoto",
        cam_flash: "Dual-LED dual-tone flash",
        cam_macro: "Yes (Autofocus on Ultrawide lens enables macro down to 2cm)",
        ai_features: ["Cinematic mode with rack focus", "Apple ProRAW", "Smart HDR 4"],
        has_ai_assistant: true
      }
    },
    {
      slug: "iphone-13-pro-max",
      updateData: {
        benchmark_highlight: "AnTuTu ~820,000 | Geekbench Single: ~1730",
        cooling_system: "Passive cooling, graphite thermal sheets",
        geekbench_score: "Single: ~1,730 / Multi: ~4,800 (Geekbench 5)",
        antutu_score: 820000,
        fabrication: "5 nm (TSMC)",
        cam_ois: "Sensor-shift OIS on Main, standard OIS on Telephoto",
        cam_flash: "Dual-LED dual-tone flash",
        cam_macro: "Yes (Autofocus on Ultrawide enables macro)",
        ai_features: ["Cinematic mode", "Apple ProRAW", "Smart HDR 4"],
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
