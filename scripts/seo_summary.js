const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function summary() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.model('Brand', new mongoose.Schema({}, { strict: false }));

  const brands = await Brand.find().sort({ name: 1 }).lean();

  for (const brand of brands) {
    const phones = await Phone.find(
      { brand_id: brand._id, is_published: true },
      { name: 1, seo_overview: 1, verdict: 1, faqs: 1, pros: 1, cons: 1, meta_description: 1, meta_title: 1 }
    ).lean();

    if (phones.length === 0) continue;

    let perfect = 0;
    let bdTarget = 0;
    let noVerdict = 0;
    let shortOverview = 0;
    let badPros = 0;
    let badCons = 0;
    let badMeta = 0;
    let badFaqs = 0;

    for (const p of phones) {
      const allText = [p.seo_overview || '', p.verdict || '', p.meta_title || '', p.meta_description || ''].join(' ');
      const ov = (p.seo_overview || '').split(/\s+/).filter(w => w).length;
      const vl = (p.verdict || '').split(/\s+/).filter(w => w).length;
      const ml = (p.meta_description || '').length;
      const pc = Array.isArray(p.pros) ? p.pros.length : 0;
      const cc = Array.isArray(p.cons) ? p.cons.length : 0;
      const fc = Array.isArray(p.faqs) ? p.faqs.length : 0;

      let hasIssue = false;
      if (/bangladesh|BD\b|BDT/i.test(allText)) { bdTarget++; hasIssue = true; }
      if (!p.verdict || vl < 80) { noVerdict++; hasIssue = true; }
      if (!p.seo_overview || ov < 150) { shortOverview++; hasIssue = true; }
      if (pc < 3 || pc > 4) { badPros++; hasIssue = true; }
      if (cc < 2 || cc > 3) { badCons++; hasIssue = true; }
      if (!p.meta_description || ml < 140 || ml > 160) { badMeta++; hasIssue = true; }
      if (fc !== 5) { badFaqs++; hasIssue = true; }
      if (!hasIssue) perfect++;
    }

    console.log(`${brand.name}|${phones.length}|${perfect}|${phones.length - perfect}|${bdTarget}|${shortOverview}|${noVerdict}|${badPros}|${badCons}|${badMeta}|${badFaqs}`);
  }

  await mongoose.disconnect();
}

summary().catch(console.error);
