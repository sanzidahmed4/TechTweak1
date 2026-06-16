const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function findIssues() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // 1. Find phones with "Unknown" in SEO text
  const unknownPhones = await Phone.find({
    is_published: true,
    $or: [
      { seo_overview: /Unknown/i },
      { verdict: /Unknown/i },
      { meta_description: /Unknown/i }
    ]
  }, { slug: 1, name: 1, processor: 1, battery_capacity: 1, camera_main: 1, screen_size: 1 }).lean();
  console.log(`Phones with "Unknown" in SEO: ${unknownPhones.length}`);
  unknownPhones.slice(0, 5).forEach(p => console.log(`  - ${p.slug} | proc: ${p.processor} | bat: ${p.battery_capacity}`));

  // 2. Find phones with broken meta description
  const brokenMeta = await Phone.find({
    is_published: true,
    meta_description: /review and detailed specs/i
  }, { slug: 1, meta_description: 1 }).lean();
  console.log(`\nPhones with broken meta: ${brokenMeta.length}`);
  brokenMeta.slice(0, 3).forEach(p => console.log(`  - ${p.slug}: "${p.meta_description}"`));

  // 3. Duplicate overview detection
  const all = await Phone.find({ is_published: true }, { slug: 1, seo_overview: 1 }).lean();
  const groups = new Map();
  for (const p of all) {
    const key = (p.seo_overview || '').substring(0, 80);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p.slug);
  }
  let dupCount = 0;
  const dupSlugs = [];
  for (const [key, slugs] of groups) {
    if (slugs.length > 1 && key.length > 10) {
      dupCount += slugs.length;
      dupSlugs.push(...slugs);
    }
  }
  console.log(`\nPhones with duplicate overview (sharing first 80 chars): ${dupCount}`);

  // Export duplicate slugs for subagent processing
  const fs = require('fs');
  fs.writeFileSync('scripts/duplicate_slugs.json', JSON.stringify(dupSlugs, null, 2));
  console.log(`Exported ${dupSlugs.length} duplicate slugs to duplicate_slugs.json`);

  await mongoose.disconnect();
}
findIssues().catch(console.error);
