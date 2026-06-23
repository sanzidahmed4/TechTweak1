import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";

const updateData: Record<string, any> = {
  "moto-g-5g-2022": {
    price_usd: 399.99,
    geekbench_score: "550 / 1700",
    brightness: "400 nits (typ)",
    cooling_system: "Graphite thermal pad",
    cam_ois: "No OIS",
    cam_video: "1080p@30fps",
    cam_front_video: "1080p@30fps"
  },
  "motorola-razr-plus-2023": {
    price_usd: 999.99,
    geekbench_score: "1350 / 4200",
    brightness: "1400 nits (peak)",
    cooling_system: "Graphite + Vapor Chamber",
    cam_ois: "OIS Support",
    cam_video: "4K@30/60fps, 1080p@30/60/120fps, HDR10+",
    cam_front_video: "4K@30/60fps, 1080p@30/60fps"
  },
  "motorola-razr-2023": {
    price_usd: 699.99,
    geekbench_score: "1050 / 2950",
    brightness: "1400 nits (peak)",
    cooling_system: "Graphite thermal sheets",
    cam_ois: "OIS Support",
    cam_video: "4K@30fps, 1080p@30/60fps",
    cam_front_video: "4K@30fps, 1080p@30/60fps"
  },
  "motorola-thinkphone": {
    price_usd: 699.99,
    geekbench_score: "1350 / 4200",
    brightness: "1200 nits (peak)",
    cooling_system: "Advanced Vapor Chamber Cooling",
    cam_ois: "OIS Support",
    cam_video: "8K@30fps, 4K@30/60fps, 1080p@30/60/120/240fps, HDR10+",
    cam_front_video: "4K@30fps, 1080p@30/60fps"
  },
  "moto-g-5g-2023": {
    price_usd: 249.99,
    geekbench_score: "600 / 1750",
    brightness: "500 nits (typ)",
    cooling_system: "Standard Graphite",
    cam_ois: "No OIS",
    cam_video: "1080p@30fps",
    cam_front_video: "1080p@30fps"
  },
  "motorola-edge-2024": {
    price_usd: 549.99,
    geekbench_score: "1000 / 2800",
    brightness: "1300 nits (peak)",
    cooling_system: "Vapor Chamber cooling",
    cam_ois: "OIS Support",
    cam_video: "4K@30fps, 1080p@30/60/120fps, gyro-EIS",
    cam_front_video: "4K@30fps, 1080p@30/60fps"
  },
  "motorola-razr-plus-2024": {
    price_usd: 999.99,
    geekbench_score: "1850 / 4950",
    brightness: "3000 nits (peak)",
    cooling_system: "Vapor Chamber + Graphite",
    cam_ois: "OIS Support",
    cam_video: "4K@30/60fps, 1080p@30/60/120/240fps, HDR10+, gyro-EIS",
    cam_front_video: "4K@30/60fps, 1080p@30/60fps"
  },
  "motorola-razr-2024": {
    price_usd: 699.99,
    geekbench_score: "1050 / 3000",
    brightness: "3000 nits (peak)",
    cooling_system: "Graphite thermal sheets",
    cam_ois: "OIS Support",
    cam_video: "4K@30fps, 1080p@30/60fps, gyro-EIS",
    cam_front_video: "4K@30fps, 1080p@30/60fps"
  },
  "moto-g-5g-2024": {
    price_usd: 199.99,
    geekbench_score: "700 / 1950",
    brightness: "500 nits (typ)",
    cooling_system: "Standard Graphite",
    cam_ois: "No OIS",
    cam_video: "1080p@30fps",
    cam_front_video: "1080p@30fps"
  }
};

async function runFinalBatch() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to DB. Starting Final Batch Updates...");

  let updatedCount = 0;
  for (const [slug, data] of Object.entries(updateData)) {
    // We only update if the phone exists.
    const result = await Phone.findOneAndUpdate({ slug }, { $set: data }, { new: true });
    if (result) {
      console.log(`✅ Updated ${result.name} (${slug})`);
      updatedCount++;
    } else {
      console.log(`❌ Not found: ${slug}`);
    }
  }

  console.log(`\nFinal Batch Complete! Successfully updated ${updatedCount} phones.`);
  process.exit(0);
}

runFinalBatch();
