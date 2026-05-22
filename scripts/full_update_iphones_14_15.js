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
      slug: "iphone-14",
      updateData: {
        benchmark_highlight: "AnTuTu ~820,000 | Geekbench Single: ~1730",
        cooling_system: "Improved internal design for better thermal management",
        geekbench_score: "Single: ~1,730 / Multi: ~4,650 (Geekbench 5)",
        antutu_score: 820000,
        fabrication: "5 nm (TSMC)",
        cam_ois: "Sensor-shift OIS",
        cam_flash: "True Tone flash",
        cam_macro: "Not supported",
        ai_features: ["Photonic Engine", "Cinematic mode (4K)", "Action mode"],
        has_ai_assistant: true
      }
    },
    {
      slug: "iphone-14-plus",
      updateData: {
        benchmark_highlight: "AnTuTu ~830,000 | Geekbench Single: ~1730",
        cooling_system: "Improved internal design for better thermal management",
        geekbench_score: "Single: ~1,730 / Multi: ~4,700 (Geekbench 5)",
        antutu_score: 830000,
        fabrication: "5 nm (TSMC)",
        cam_ois: "Sensor-shift OIS",
        cam_flash: "True Tone flash",
        cam_macro: "Not supported",
        ai_features: ["Photonic Engine", "Cinematic mode", "Action mode"],
        has_ai_assistant: true
      }
    },
    {
      slug: "iphone-14-pro",
      updateData: {
        benchmark_highlight: "AnTuTu ~950,000 | Geekbench Single: ~1880",
        cooling_system: "Passive cooling, graphite sheets",
        geekbench_score: "Single: ~1,880 / Multi: ~5,300 (Geekbench 5)",
        antutu_score: 950000,
        fabrication: "4 nm (TSMC)",
        cam_ois: "Sensor-shift OIS (2nd gen) on Main, OIS on Telephoto",
        cam_flash: "Adaptive True Tone flash",
        cam_macro: "Yes (via Ultrawide autofocus)",
        ai_features: ["Photonic Engine", "Deep Fusion", "Dynamic Island integration"],
        has_ai_assistant: true
      }
    },
    {
      slug: "iphone-14-pro-max",
      updateData: {
        benchmark_highlight: "AnTuTu ~970,000 | Geekbench Single: ~1880",
        cooling_system: "Passive cooling, graphite sheets",
        geekbench_score: "Single: ~1,880 / Multi: ~5,400 (Geekbench 5)",
        antutu_score: 970000,
        fabrication: "4 nm (TSMC)",
        cam_ois: "Sensor-shift OIS (2nd gen) on Main, OIS on Telephoto",
        cam_flash: "Adaptive True Tone flash",
        cam_macro: "Yes (via Ultrawide autofocus)",
        ai_features: ["Photonic Engine", "Smart HDR 4", "Dynamic Island features"],
        has_ai_assistant: true
      }
    },
    {
      slug: "iphone-15",
      updateData: {
        benchmark_highlight: "AnTuTu ~1,000,000 | Geekbench Single: ~1880",
        cooling_system: "Passive cooling",
        geekbench_score: "Single: ~1,880 / Multi: ~5,300 (Geekbench 5)",
        antutu_score: 1000000,
        fabrication: "4 nm (TSMC)",
        cam_ois: "Sensor-shift OIS",
        cam_flash: "True Tone flash",
        cam_macro: "Not supported",
        ai_features: ["Photonic Engine", "Next-generation portraits with focus and depth control"],
        has_ai_assistant: true
      }
    },
    {
      slug: "iphone-15-pro-max",
      updateData: {
        benchmark_highlight: "AnTuTu ~1,500,000 | Geekbench Single: ~2900",
        cooling_system: "Passive cooling, graphite thermal sheets with titanium chassis",
        geekbench_score: "Single: ~2,900 / Multi: ~7,200 (Geekbench 6)",
        antutu_score: 1500000,
        fabrication: "3 nm (TSMC)",
        cam_ois: "3D sensor‑shift OIS on Telephoto, 2nd gen Sensor-shift on Main",
        cam_flash: "Adaptive True Tone flash",
        cam_macro: "Yes (Macro photography down to 2cm)",
        ai_features: ["Hardware-accelerated ray tracing", "Log video encoding", "Apple Intelligence ready"],
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
