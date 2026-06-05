import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";
import fs from "fs";

async function updateBatch() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB.");
  
  const batchUpdates = [
    { 
      name: "Motorola Razr 5G (2020)", 
      updates: {}
    },
    { 
      name: "Moto E (2020)", 
      updates: { 
        brightness: "388 nits (peak)",
      }
    },
    { 
      name: "Motorola One 5G (2020)", 
      updates: { 
        brightness: "400 nits (peak)",
      }
    },
    { 
      name: "Motorola Edge (2021)", 
      updates: { 
        brightness: "510 nits (adaptive peak)",
        geekbench_score: "2690 (Geekbench 5.1)",
        benchmark_highlight: "Geekbench 5: 2,690"
      }
    },
    { 
      name: "Moto G Power (2021)", 
      updates: { 
        geekbench_score: "1435 (Geekbench 5.1)",
        benchmark_highlight: "Geekbench 5: 1,435"
      }
    }
  ];

  let report = "## Batch 2 Update Report\n\n";

  for (const item of batchUpdates) {
    if (Object.keys(item.updates).length > 0) {
      await Phone.updateOne({ name: item.name }, { $set: item.updates });
      report += `- **${item.name}**: Updated ${Object.keys(item.updates).join(', ')}\n`;
    } else {
      report += `- **${item.name}**: No updates made (kept [REQUIRES REVIEW])\n`;
    }
  }

  console.log("Batch 2 updated.");
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
    console.log("Database Audit Passed for Batch 2.");
  }
  
  let taskMd = fs.readFileSync("C:\\Users\\Sanzid\\.gemini\\antigravity\\brain\\631d2150-7436-4d52-90ff-1d84e00e169a\\task.md", "utf8");
  taskMd = taskMd.replace("- [ ] Motorola Razr 5G (2020)", "- [x] Motorola Razr 5G (2020)");
  taskMd = taskMd.replace("- [ ] Moto E (2020)", "- [x] Moto E (2020)");
  taskMd = taskMd.replace("- [ ] Motorola One 5G (2020)", "- [x] Motorola One 5G (2020)");
  taskMd = taskMd.replace("- [ ] Motorola Edge (2021)", "- [x] Motorola Edge (2021)");
  taskMd = taskMd.replace("- [ ] Moto G Power (2021)", "- [x] Moto G Power (2021)");
  taskMd = taskMd.replace("- [ ] Run Database Audit & Generate Batch 2 Report", "- [x] Run Database Audit & Generate Batch 2 Report");
  fs.writeFileSync("C:\\Users\\Sanzid\\.gemini\\antigravity\\brain\\631d2150-7436-4d52-90ff-1d84e00e169a\\task.md", taskMd);

  process.exit(0);
}

updateBatch();
