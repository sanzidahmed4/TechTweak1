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
      slug: "iphone-16",
      updateData: {
        benchmark_highlight: "AnTuTu ~1,600,000 | Geekbench Single: ~3100",
        cooling_system: "New internal thermal architecture to reduce throttling",
        geekbench_score: "Single: ~3,100 / Multi: ~7,500 (Geekbench 6)",
        antutu_score: 1600000,
        fabrication: "3 nm (TSMC N3E)",
        cam_ois: "Sensor-shift OIS",
        cam_flash: "True Tone flash",
        cam_macro: "Yes (Autofocus on Ultrawide lens enables macro)",
        has_ai_assistant: true
      }
    },
    {
      slug: "iphone-16-pro-max",
      updateData: {
        benchmark_highlight: "AnTuTu ~1,800,000 | Geekbench Single: ~3400",
        cooling_system: "Graphene thermal sheets with solid-state heat dissipation",
        geekbench_score: "Single: ~3,400 / Multi: ~8,500 (Geekbench 6)",
        antutu_score: 1800000,
        fabrication: "3 nm (TSMC N3E)",
        cam_ois: "Sensor-shift OIS (Main), 3D Sensor-shift OIS (Telephoto)",
        cam_flash: "Adaptive True Tone flash",
        cam_macro: "Yes (48MP Ultrawide macro shots)",
        has_ai_assistant: true
      }
    },
    {
      slug: "iphone-17-air",
      updateData: {
        benchmark_highlight: "AnTuTu ~2,000,000 | Geekbench Single: ~3600",
        cooling_system: "Ultra-thin vapor chamber cooling (Deionized water)",
        geekbench_score: "Single: ~3,600 / Multi: ~9,000 (Geekbench 6)",
        antutu_score: 2000000,
        fabrication: "3 nm (TSMC N3P)",
        cam_ois: "Standard OIS",
        cam_flash: "Adaptive True Tone flash",
        cam_macro: "Not supported (Single camera limited)",
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
