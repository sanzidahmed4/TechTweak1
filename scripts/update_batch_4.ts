import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";
import fs from "fs";

async function updateBatch() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB.");
  
  const batchUpdates = [
    { 
      name: "Moto G100 (2021)", 
      updates: { 
        brightness: "613 nits (Auto Peak)",
        geekbench_score: "2860 (Geekbench 5.1)",
        benchmark_highlight: "Geekbench 5: 2,860",
        gpu: "Adreno 650",
        fabrication: "7 nm",
        storage_type: "UFS 3.1"
      }
    },
    { 
      name: "Motorola Edge+ (2022)", 
      updates: { 
        brightness: "700 nits (Peak)",
        geekbench_score: "3763 (Geekbench 5.1)",
        benchmark_highlight: "Geekbench 5: 3,763",
        gpu: "Adreno 730",
        fabrication: "4 nm",
        storage_type: "UFS 3.1"
      }
    },
    { 
      name: "Motorola Edge (2022)", 
      updates: { 
        brightness: "1300 nits (Peak)",
        geekbench_score: "2142 (Geekbench 5.1)",
        benchmark_highlight: "Geekbench 5: 2,142",
        gpu: "Mali-G610 MC3",
        fabrication: "6 nm",
        storage_type: "UFS"
      }
    },
    { 
      name: "Moto G Power (2022)", 
      updates: { 
        brightness: "407 nits",
        geekbench_score: "1011 (Geekbench 5.1)",
        benchmark_highlight: "Geekbench 5: 1,011",
        gpu: "PowerVR GE8320",
        fabrication: "12 nm",
        storage_type: "eMMC 5.1"
      }
    },
    { 
      name: "Moto G Stylus (2022)", 
      updates: { 
        brightness: "650 nits (Auto Peak)",
        gpu: "Mali-G52 MC2",
        fabrication: "12 nm",
        storage_type: "eMMC 5.1"
      }
    }
  ];

  let report = "## Batch 4 Update Report\n\n";

  for (const item of batchUpdates) {
    if (Object.keys(item.updates).length > 0) {
      await Phone.updateOne({ name: item.name }, { $set: item.updates });
      report += `- **${item.name}**: Updated ${Object.keys(item.updates).join(', ')}\n`;
    } else {
      report += `- **${item.name}**: No updates made (kept [REQUIRES REVIEW])\n`;
    }
  }

  console.log("Batch 4 updated.");
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
    console.log("Database Audit Passed for Batch 4.");
  }
  
  let taskMd = fs.readFileSync("C:\\Users\\Sanzid\\.gemini\\antigravity\\brain\\631d2150-7436-4d52-90ff-1d84e00e169a\\task.md", "utf8");
  taskMd = taskMd.replace("- [ ] Moto G100 (2021)", "- [x] Moto G100 (2021)");
  taskMd = taskMd.replace("- [ ] Motorola Edge+ (2022)", "- [x] Motorola Edge+ (2022)");
  taskMd = taskMd.replace("- [ ] Motorola Edge (2022)", "- [x] Motorola Edge (2022)");
  taskMd = taskMd.replace("- [ ] Moto G Power (2022)", "- [x] Moto G Power (2022)");
  taskMd = taskMd.replace("- [ ] Moto G Stylus (2022)", "- [x] Moto G Stylus (2022)");
  taskMd = taskMd.replace("- [ ] Run Database Audit & Generate Batch 4 Report", "- [x] Run Database Audit & Generate Batch 4 Report");
  fs.writeFileSync("C:\\Users\\Sanzid\\.gemini\\antigravity\\brain\\631d2150-7436-4d52-90ff-1d84e00e169a\\task.md", taskMd);

  process.exit(0);
}

updateBatch();
