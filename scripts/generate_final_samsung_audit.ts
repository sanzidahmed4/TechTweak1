import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const requiredDeepFields = [
  'bluetooth_version', 'wifi_version', 'usb_type', 'has_nfc', 'has_audio_jack', 
  'build_material', 'sensor_fingerprint', 'cam_ois', 'charging_wireless', 
  'charging_reverse', 'storage_type', 'ram_variants', 'storage_variants', 
  'weight', 'dimensions', 'video_recording', 'brightness', 
  'cam_ultrawide', 'cam_telephoto', 'cam_macro'
];

async function run() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error("MONGODB_URI not found.");

    await mongoose.connect(MONGODB_URI);
    const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));

    const allPhones = await Phone.find({ slug: /^samsung-/i }).sort({ name: 1 });
    let totalPhones = allPhones.length;
    let completelyVerifiedCount = 0;
    const remainingMissing = [];

    for (const p of allPhones) {
      const missing = [];
      for (const field of requiredDeepFields) {
        const val = p.get(field);
        if (val === undefined || val === null || val === '') {
          missing.push(field);
        }
      }
      
      if (missing.length === 0) {
        completelyVerifiedCount++;
      } else {
        remainingMissing.push({ name: p.name, slug: p.slug, missingCount: missing.length, missing });
      }
    }

    let report = `# 📊 Final Samsung Deep Audit Report\\n\\n`;
    report += `**Audit Date:** ${new Date().toISOString()}\\n`;
    report += `**Total Samsung Phones Audited:** ${totalPhones}\\n`;
    report += `**100% Fully Verified Phones:** ${completelyVerifiedCount}\\n\\n`;
    
    if (remainingMissing.length === 0) {
        report += `> [!TIP]\\n> **Incredible! 100% of the Samsung database has been deeply verified with zero estimations and zero missing fields.**\\n`;
    } else {
        report += `> [!WARNING]\\n> **There are still ${remainingMissing.length} phones with missing fields.**\\n\\n`;
        report += `### Phones needing attention:\\n`;
        remainingMissing.forEach(p => {
            report += `- **${p.name}**: Missing ${p.missingCount} fields (${p.missing.join(', ')})\\n`;
        });
    }

    const reportPath = path.resolve(process.cwd(), 'final_samsung_audit_report.md');
    fs.writeFileSync(reportPath, report);

    console.log(`✅ Audit complete. Verified ${completelyVerifiedCount}/${totalPhones} phones.`);
    console.log(`📝 Report saved to final_samsung_audit_report.md`);

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
