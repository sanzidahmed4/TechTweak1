const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function fullAudit() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.model('Brand', new mongoose.Schema({}, { strict: false }));

  const brands = await Brand.find().sort({ name: 1 }).lean();
  const allResults = {};

  for (const brand of brands) {
    const phones = await Phone.find(
      { brand_id: brand._id, is_published: true },
      { name: 1, slug: 1, seo_overview: 1, verdict: 1, faqs: 1, pros: 1, cons: 1, meta_description: 1, meta_title: 1, phone_status: 1, release_date: 1, release_date_parsed: 1, price_usd: 1, price_display_text: 1, keywords: 1, processor: 1, battery_capacity: 1, cam_main_sensor: 1, screen_size: 1 }
    ).sort({ release_date_parsed: -1 }).lean();

    if (phones.length === 0) continue;

    const brandData = { total: phones.length, perfect: 0, issues: [], phones: [] };

    for (const p of phones) {
      const issues = [];

      // 1. SEO Overview
      const overviewText = p.seo_overview || '';
      const overviewLen = overviewText.split(/\s+/).filter(w => w).length;
      if (!overviewText) issues.push({ field: 'seo_overview', issue: 'MISSING', severity: 'critical' });
      else if (overviewLen < 150) issues.push({ field: 'seo_overview', issue: `too_short_${overviewLen}`, severity: 'high' });
      else if (overviewLen > 300) issues.push({ field: 'seo_overview', issue: `too_long_${overviewLen}`, severity: 'medium' });

      // 2. Verdict
      const verdictText = p.verdict || '';
      const verdictLen = verdictText.split(/\s+/).filter(w => w).length;
      if (!verdictText) issues.push({ field: 'verdict', issue: 'MISSING', severity: 'critical' });
      else if (verdictLen < 80) issues.push({ field: 'verdict', issue: `too_short_${verdictLen}`, severity: 'high' });
      else if (verdictLen > 150) issues.push({ field: 'verdict', issue: `too_long_${verdictLen}`, severity: 'medium' });

      // 3. FAQs
      const faqCount = Array.isArray(p.faqs) ? p.faqs.length : 0;
      if (faqCount === 0) issues.push({ field: 'faqs', issue: 'MISSING', severity: 'critical' });
      else if (faqCount !== 5) issues.push({ field: 'faqs', issue: `count_${faqCount}_need_5`, severity: 'high' });

      // Check FAQ quality
      if (faqCount > 0 && Array.isArray(p.faqs)) {
        const genericFaqs = p.faqs.filter(f => {
          const q = (f.question || '').toLowerCase();
          return q.includes('does it support fast charging') || q.includes('does this smartphone support 5g') || q.includes('is the charger included') || q.includes('where is this phone manufactured');
        });
        if (genericFaqs.length >= 3) issues.push({ field: 'faqs', issue: 'too_generic', severity: 'medium' });
      }

      // 4. Pros & Cons
      const prosCount = Array.isArray(p.pros) ? p.pros.length : 0;
      const consCount = Array.isArray(p.cons) ? p.cons.length : 0;
      if (prosCount === 0) issues.push({ field: 'pros', issue: 'MISSING', severity: 'critical' });
      else if (prosCount < 3 || prosCount > 4) issues.push({ field: 'pros', issue: `count_${prosCount}_need_3to4`, severity: 'high' });
      if (consCount === 0) issues.push({ field: 'cons', issue: 'MISSING', severity: 'critical' });
      else if (consCount < 2 || consCount > 3) issues.push({ field: 'cons', issue: `count_${consCount}_need_2to3`, severity: 'high' });

      // 5. Meta Description
      const metaLen = (p.meta_description || '').length;
      if (!p.meta_description) issues.push({ field: 'meta_description', issue: 'MISSING', severity: 'critical' });
      else if (metaLen < 140 || metaLen > 160) issues.push({ field: 'meta_description', issue: `chars_${metaLen}_need_140to160`, severity: 'high' });

      // 6. Meta Title
      if (!p.meta_title) issues.push({ field: 'meta_title', issue: 'MISSING', severity: 'critical' });

      // 7. Bangladesh targeting (should be USA)
      const allText = [overviewText, verdictText, p.meta_title || '', p.meta_description || ''].join(' ');
      if (/bangladesh|BD\b|BDT|price in bd/i.test(allText)) issues.push({ field: 'targeting', issue: 'BANGLADESH_instead_of_USA', severity: 'critical' });

      // 8. Uses "Estimated"
      if (/estimated/i.test(allText)) issues.push({ field: 'pricing', issue: 'uses_ESTIMATED_word', severity: 'high' });

      // 9. Price check
      if (!p.price_usd && !p.price_display_text) issues.push({ field: 'price', issue: 'NO_PRICE', severity: 'medium' });

      // 10. Keywords
      if (!p.keywords) issues.push({ field: 'keywords', issue: 'MISSING', severity: 'medium' });

      if (issues.length === 0) {
        brandData.perfect++;
      }
      brandData.phones.push({ name: p.name, slug: p.slug, status: p.phone_status, issues });
    }

    allResults[brand.name] = brandData;
  }

  // Output as JSON for the artifact
  console.log(JSON.stringify(allResults, null, 2));

  await mongoose.disconnect();
}

fullAudit().catch(console.error);
