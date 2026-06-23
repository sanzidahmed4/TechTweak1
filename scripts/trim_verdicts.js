const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

function wc(str) { return (str || '').split(/\s+/).filter(w => w).length; }

async function trimVerdicts() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  const phones = await Phone.find({ is_published: true }).lean();
  let fixed = 0;

  for (const p of phones) {
    const vl = wc(p.verdict);
    if (vl > 150) {
      // Trim to exactly 145 words and add a period
      const words = p.verdict.split(/\s+/).filter(w => w);
      let trimmed = words.slice(0, 145).join(' ');
      // Clean up: ensure it ends with a proper sentence
      const lastPeriod = trimmed.lastIndexOf('.');
      if (lastPeriod > trimmed.length * 0.7) {
        trimmed = trimmed.substring(0, lastPeriod + 1);
      } else {
        trimmed = trimmed + '.';
      }
      
      const newWc = wc(trimmed);
      if (newWc >= 80 && newWc <= 150) {
        await Phone.updateOne({ _id: p._id }, { $set: { verdict: trimmed } });
        fixed++;
      }
    }
  }

  console.log(`✅ Trimmed ${fixed} long verdicts to 80-150 words`);

  // FINAL FINAL VERIFICATION
  const allAfter = await Phone.find({ is_published: true }).lean();
  let pass = 0, fail = 0;
  const failures = [];
  for (const p of allAfter) {
    const issues = [];
    const allText = [p.seo_overview||'', p.verdict||'', p.meta_title||'', p.meta_description||''].join(' ');
    if (/bangladesh|BD\b|BDT/i.test(allText)) issues.push('BD');
    if (/Unknown/i.test(allText)) issues.push('UNK');
    const ov = wc(p.seo_overview); if (ov<150||ov>300) issues.push(`OV${ov}`);
    const vl2 = wc(p.verdict); if (vl2<80||vl2>150) issues.push(`VD${vl2}`);
    const ml2 = (p.meta_description||'').length; if (ml2<140||ml2>160) issues.push(`MT${ml2}`);
    const pc = Array.isArray(p.pros)?p.pros.length:0; if (pc<3||pc>4) issues.push(`PR${pc}`);
    const cc = Array.isArray(p.cons)?p.cons.length:0; if (cc<2||cc>3) issues.push(`CN${cc}`);
    const fc = Array.isArray(p.faqs)?p.faqs.length:0; if (fc!==5) issues.push(`FQ${fc}`);
    if (issues.length > 0) { fail++; failures.push(`${p.slug}: ${issues.join(', ')}`); }
    else pass++;
  }

  console.log(`\n=== ABSOLUTE FINAL RESULT ===`);
  console.log(`Total: ${allAfter.length} | ✅ Pass: ${pass} | ❌ Fail: ${fail}`);
  if (failures.length > 0 && failures.length <= 10) {
    failures.forEach(f => console.log(`  - ${f}`));
  } else if (failures.length > 10) {
    failures.slice(0, 10).forEach(f => console.log(`  - ${f}`));
    console.log(`  ... and ${failures.length - 10} more`);
  }

  await mongoose.disconnect();
}

trimVerdicts().catch(console.error);
