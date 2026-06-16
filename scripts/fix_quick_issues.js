const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function fixQuickIssues() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // ======= FIX 1: Fix "Unknown" specs in SEO text =======
  const unknownPhones = await Phone.find({
    is_published: true,
    $or: [
      { seo_overview: /Unknown/i },
      { verdict: /Unknown/i },
      { meta_description: /Unknown/i },
      { meta_title: /Unknown/i }
    ]
  }).lean();

  let fixedUnknown = 0;
  for (const p of unknownPhones) {
    // Try to find processor name from chipset or other fields
    const proc = p.chipset || p.processor || p.cpu || 'its advanced';
    const procClean = (typeof proc === 'string' && proc !== 'undefined' && proc.length > 2) 
      ? proc.replace(/"/g, '') 
      : 'its advanced';
    
    const updates = {};
    if (p.seo_overview && /Unknown/i.test(p.seo_overview)) {
      updates.seo_overview = p.seo_overview.replace(/Unknown/gi, procClean);
    }
    if (p.verdict && /Unknown/i.test(p.verdict)) {
      updates.verdict = p.verdict.replace(/Unknown/gi, procClean);
    }
    if (p.meta_description && /Unknown/i.test(p.meta_description)) {
      updates.meta_description = p.meta_description.replace(/Unknown/gi, procClean);
    }
    if (p.meta_title && /Unknown/i.test(p.meta_title)) {
      updates.meta_title = p.meta_title.replace(/Unknown/gi, procClean);
    }

    if (Object.keys(updates).length > 0) {
      await Phone.updateOne({ _id: p._id }, { $set: updates });
      fixedUnknown++;
    }
  }
  console.log(`✅ Fixed "Unknown" in ${fixedUnknown} phones`);

  // ======= FIX 2: Fix broken meta descriptions =======
  const brokenMetaPhones = await Phone.find({
    is_published: true,
    meta_description: /review and detailed specs/i
  }).lean();

  let fixedMeta = 0;
  for (const p of brokenMetaPhones) {
    let meta = p.meta_description;
    // Remove the broken trailing text
    meta = meta.replace(/\s*review and detailed specs\.?\s*$/i, '.');
    // Also clean up double periods
    meta = meta.replace(/\.\.+/g, '.').replace(/\.\s*\./g, '.');
    
    // Ensure 140-160 chars
    if (meta.length > 160) {
      meta = meta.substring(0, 157) + '...';
    }
    if (meta.length < 140) {
      // Pad with useful info
      const extra = ` Check availability, pricing, and full specifications for USA buyers.`;
      meta = meta.replace(/\.$/, '') + extra;
      if (meta.length > 160) meta = meta.substring(0, 157) + '...';
    }

    await Phone.updateOne({ _id: p._id }, { $set: { meta_description: meta } });
    fixedMeta++;
  }
  console.log(`✅ Fixed broken meta descriptions in ${fixedMeta} phones`);

  // Verify
  const stillBroken = await Phone.countDocuments({
    is_published: true,
    $or: [
      { seo_overview: /Unknown/i },
      { meta_description: /review and detailed specs/i }
    ]
  });
  console.log(`\nRemaining issues after fix: ${stillBroken}`);

  await mongoose.disconnect();
}
fixQuickIssues().catch(console.error);
