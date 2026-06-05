import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";
import fs from "fs";

async function updateBatch() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB.");
  
  const batchUpdates = [
    { 
      name: "Motorola Edge (2020)", 
      updates: { 
        brightness: "595 nits (adaptive peak)",
        geekbench_score: "1862 (Geekbench 5.1)",
        benchmark_highlight: "Geekbench 5: 1,862"
      }
    },
    { 
      name: "Motorola Edge+ (2020)", 
      updates: { 
        brightness: "607 nits (adaptive peak) / 422 nits (manual)",
        geekbench_score: "3295 (Geekbench 5.1)",
        benchmark_highlight: "Geekbench 5: 3,295"
      }
    },
    { 
      name: "Moto G Power (2020)", 
      updates: { 
        brightness: "438 nits",
      }
    },
    { 
      name: "Moto G Stylus (2020)", 
      updates: { 
        brightness: "642 nits (auto peak) / 421 nits (manual)",
      }
    },
    { 
      name: "Moto G Fast (2020)", 
      updates: {} // Keeping [REQUIRES REVIEW] as exact verified metrics weren't found
    }
  ];

  let report = "## Batch 1 Update Report\n\n";

  for (const item of batchUpdates) {
    if (Object.keys(item.updates).length > 0) {
      await Phone.updateOne({ name: item.name }, { $set: item.updates });
      report += `- **${item.name}**: Updated ${Object.keys(item.updates).join(', ')}\n`;
    } else {
      report += `- **${item.name}**: No updates made (kept [REQUIRES REVIEW])\n`;
    }
  }

  console.log("Batch 1 updated.");
  console.log(report);
  
  const names = batchUpdates.map(b => b.name);
  const phones = await Phone.find({ name: { $in: names } }).lean();
  let issues = 0;
  for (const phone of phones) {
    const p = phone as any;
    if (p.brightness === '[REQUIRES REVIEW]') {
      console.log(`[AUDIT OK] ${p.name}: brightness correctly maintained as [REQUIRES REVIEW]`);
    } else if (p.brightness === null || p.brightness === undefined) {
      console.error(`[AUDIT FAIL] ${p.name} missing brightness`);
      issues++;
    }

    if (p.geekbench_score === '[REQUIRES REVIEW]') {
      console.log(`[AUDIT OK] ${p.name}: geekbench_score correctly maintained as [REQUIRES REVIEW]`);
    } else if (p.geekbench_score === null || p.geekbench_score === undefined) {
      console.error(`[AUDIT FAIL] ${p.name} missing geekbench_score`);
      issues++;
    }
  }

  if (issues > 0) {
    console.error(`Audit failed with ${issues} issues.`);
  } else {
    console.log("Database Audit Passed for Batch 1.");
  }
  
  let taskMd = fs.readFileSync("C:\\Users\\Sanzid\\.gemini\\antigravity\\brain\\631d2150-7436-4d52-90ff-1d84e00e169a\\task.md", "utf8");
  taskMd = taskMd.replace("- [ ] `cam_depth` bulk update to \"Not Supported\"", "- [x] `cam_depth` bulk update to \"Not Supported\"");
  taskMd = taskMd.replace("- [ ] Motorola Edge (2020)", "- [x] Motorola Edge (2020)");
  taskMd = taskMd.replace("- [ ] Motorola Edge+ (2020)", "- [x] Motorola Edge+ (2020)");
  taskMd = taskMd.replace("- [ ] Moto G Power (2020)", "- [x] Moto G Power (2020)");
  taskMd = taskMd.replace("- [ ] Moto G Stylus (2020)", "- [x] Moto G Stylus (2020)");
  taskMd = taskMd.replace("- [ ] Moto G Fast (2020)", "- [x] Moto G Fast (2020)");
  taskMd = taskMd.replace("- [ ] Run Database Audit & Generate Batch 1 Report", "- [x] Run Database Audit & Generate Batch 1 Report");
  fs.writeFileSync("C:\\Users\\Sanzid\\.gemini\\antigravity\\brain\\631d2150-7436-4d52-90ff-1d84e00e169a\\task.md", taskMd);

  process.exit(0);
}

updateBatch();
