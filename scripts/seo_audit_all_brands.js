const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function audit() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.model('Brand', new mongoose.Schema({}, { strict: false }));

  const brands = await Brand.find().sort({ name: 1 }).lean();

  console.log('=== SEO AUDIT: Latest Phones Per Brand ===\n');

  for (const brand of brands) {
    const latestPhones = await Phone.find(
      { brand_id: brand._id, phone_status: 'released', is_published: true },
      { name: 1, slug: 1, seo_overview: 1, verdict: 1, faqs: 1, pros: 1, cons: 1, meta_description: 1, meta_title: 1, release_date_parsed: 1 }
    ).sort({ release_date_parsed: -1 }).limit(5).lean();

    if (latestPhones.length === 0) continue;

    console.log(`\n━━━ ${brand.name} (${latestPhones.length} latest) ━━━`);

    for (const p of latestPhones) {
      const issues = [];

      // Check seo_overview length
      const overviewLen = (p.seo_overview || '').split(/\s+/).length;
      if (!p.seo_overview) issues.push('NO seo_overview');
      else if (overviewLen < 150) issues.push(`seo_overview too short (${overviewLen} words, need 150-300)`);
      else if (overviewLen > 300) issues.push(`seo_overview too long (${overviewLen} words, need 150-300)`);

      // Check verdict
      const verdictLen = (p.verdict || '').split(/\s+/).length;
      if (!p.verdict) issues.push('NO verdict');
      else if (verdictLen < 80) issues.push(`verdict too short (${verdictLen} words, need 80-150)`);
      else if (verdictLen > 150) issues.push(`verdict too long (${verdictLen} words, need 80-150)`);

      // Check FAQs
      const faqCount = Array.isArray(p.faqs) ? p.faqs.length : 0;
      if (faqCount === 0) issues.push('NO faqs');
      else if (faqCount !== 5) issues.push(`faqs count ${faqCount} (need exactly 5)`);

      // Check Pros
      const prosCount = Array.isArray(p.pros) ? p.pros.length : 0;
      if (prosCount === 0) issues.push('NO pros');
      else if (prosCount < 3 || prosCount > 4) issues.push(`pros count ${prosCount} (need 3-4)`);

      // Check Cons
      const consCount = Array.isArray(p.cons) ? p.cons.length : 0;
      if (consCount === 0) issues.push('NO cons');
      else if (consCount < 2 || consCount > 3) issues.push(`cons count ${consCount} (need 2-3)`);

      // Check meta_description length
      const metaLen = (p.meta_description || '').length;
      if (!p.meta_description) issues.push('NO meta_description');
      else if (metaLen < 140 || metaLen > 160) issues.push(`meta_description ${metaLen} chars (need 140-160)`);

      // Check for Bangladesh targeting
      const seoText = (p.seo_overview || '') + (p.verdict || '') + (p.meta_title || '') + (p.meta_description || '');
      if (/bangladesh|BD\b|BDT/i.test(seoText)) issues.push('⚠️ TARGETS BANGLADESH instead of USA');
      if (/estimated/i.test(seoText)) issues.push('⚠️ Uses "Estimated" word');

      const status = issues.length === 0 ? '✅ PERFECT' : `❌ ${issues.length} issues`;
      console.log(`  ${p.name}: ${status}`);
      if (issues.length > 0) {
        issues.forEach(i => console.log(`    → ${i}`));
      }
    }
  }

  await mongoose.disconnect();
}

audit().catch(console.error);
