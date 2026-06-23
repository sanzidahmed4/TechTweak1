const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function deepVerify() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.model('Brand', new mongoose.Schema({}, { strict: false }));

  const brands = await Brand.find().sort({ name: 1 }).lean();
  const allPhones = await Phone.find({ is_published: true }).lean();

  let totalPerfect = 0;
  let totalFail = 0;
  let bdTargeted = 0;
  let estimatedUsed = 0;
  let duplicateOverviews = new Map();
  let duplicateVerdicts = new Map();
  let issues = [];

  for (const p of allPhones) {
    const allText = [p.seo_overview || '', p.verdict || '', p.meta_title || '', p.meta_description || ''].join(' ');
    const ov = (p.seo_overview || '').split(/\s+/).filter(w => w).length;
    const vl = (p.verdict || '').split(/\s+/).filter(w => w).length;
    const ml = (p.meta_description || '').length;
    const pc = Array.isArray(p.pros) ? p.pros.length : 0;
    const cc = Array.isArray(p.cons) ? p.cons.length : 0;
    const fc = Array.isArray(p.faqs) ? p.faqs.length : 0;

    let hasIssue = false;
    const phoneIssues = [];

    // Rule 1: No Bangladesh targeting
    if (/bangladesh|BD\b|BDT/i.test(allText)) {
      bdTargeted++;
      hasIssue = true;
      phoneIssues.push('BD_TARGETING');
    }

    // Rule 2: No "Estimated"
    if (/estimated/i.test(allText)) {
      estimatedUsed++;
      hasIssue = true;
      phoneIssues.push('ESTIMATED_USED');
    }

    // Rule 3: Overview 150-300 words
    if (ov < 150 || ov > 300) {
      hasIssue = true;
      phoneIssues.push(`OVERVIEW_${ov}_words`);
    }

    // Rule 4: Verdict 80-150 words
    if (vl < 80 || vl > 150) {
      hasIssue = true;
      phoneIssues.push(`VERDICT_${vl}_words`);
    }

    // Rule 5: Meta 140-160 chars
    if (ml < 140 || ml > 160) {
      hasIssue = true;
      phoneIssues.push(`META_${ml}_chars`);
    }

    // Rule 6: Pros 3-4
    if (pc < 3 || pc > 4) {
      hasIssue = true;
      phoneIssues.push(`PROS_${pc}`);
    }

    // Rule 7: Cons 2-3
    if (cc < 2 || cc > 3) {
      hasIssue = true;
      phoneIssues.push(`CONS_${cc}`);
    }

    // Rule 8: FAQs exactly 5
    if (fc !== 5) {
      hasIssue = true;
      phoneIssues.push(`FAQS_${fc}`);
    }

    // Duplicate content check
    const ovFirst50 = (p.seo_overview || '').substring(0, 50);
    duplicateOverviews.set(ovFirst50, (duplicateOverviews.get(ovFirst50) || 0) + 1);
    const vdFirst50 = (p.verdict || '').substring(0, 50);
    duplicateVerdicts.set(vdFirst50, (duplicateVerdicts.get(vdFirst50) || 0) + 1);

    if (hasIssue) {
      totalFail++;
      issues.push(`${p.name} (${p.slug}): ${phoneIssues.join(', ')}`);
    } else {
      totalPerfect++;
    }
  }

  // Duplicate detection
  let dupOverviewCount = 0;
  for (const [key, count] of duplicateOverviews) {
    if (count > 3 && key.length > 10) dupOverviewCount += count;
  }

  let dupVerdictCount = 0;
  for (const [key, count] of duplicateVerdicts) {
    if (count > 3 && key.length > 10) dupVerdictCount += count;
  }

  // Sample 5 random phones to show their actual content
  const samples = [];
  const shuffled = allPhones.sort(() => 0.5 - Math.random()).slice(0, 5);
  for (const s of shuffled) {
    samples.push({
      name: s.name,
      slug: s.slug,
      overview_words: (s.seo_overview || '').split(/\s+/).filter(w => w).length,
      verdict_words: (s.verdict || '').split(/\s+/).filter(w => w).length,
      meta_chars: (s.meta_description || '').length,
      pros_count: Array.isArray(s.pros) ? s.pros.length : 0,
      cons_count: Array.isArray(s.cons) ? s.cons.length : 0,
      faqs_count: Array.isArray(s.faqs) ? s.faqs.length : 0,
      overview_preview: (s.seo_overview || '').substring(0, 120) + '...',
      verdict_preview: (s.verdict || '').substring(0, 120) + '...',
      meta_description: s.meta_description
    });
  }

  console.log('=== DEEP VERIFICATION REPORT ===');
  console.log(`Total Phones Scanned: ${allPhones.length}`);
  console.log(`Perfect SEO: ${totalPerfect}`);
  console.log(`Failed SEO: ${totalFail}`);
  console.log(`Bangladesh Targeted: ${bdTargeted}`);
  console.log(`"Estimated" Used: ${estimatedUsed}`);
  console.log(`Duplicate Overviews (>3 same): ${dupOverviewCount}`);
  console.log(`Duplicate Verdicts (>3 same): ${dupVerdictCount}`);
  console.log('');
  console.log('=== SAMPLE PHONES ===');
  console.log(JSON.stringify(samples, null, 2));
  console.log('');
  if (issues.length > 0) {
    console.log('=== FAILED PHONES ===');
    issues.forEach(i => console.log(i));
  }

  await mongoose.disconnect();
}
deepVerify().catch(console.error);
