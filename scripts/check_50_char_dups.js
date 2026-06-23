const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  const all = await Phone.find({ is_published: true }, { slug: 1, name: 1, seo_overview: 1 }).lean();

  // Check first 50 chars
  const groups50 = new Map();
  for (const p of all) {
    const key = (p.seo_overview || '').substring(0, 50);
    if (!groups50.has(key)) groups50.set(key, []);
    groups50.get(key).push(p.slug);
  }
  
  let dupCount = 0;
  const dupSlugs = [];
  for (const [key, slugs] of groups50) {
    if (slugs.length > 1 && key.length > 10) {
      dupCount += slugs.length;
      // Only take slugs after the first one (keep first as unique)
      dupSlugs.push(...slugs.slice(1));
      console.log(`DUP GROUP (${slugs.length}): "${key.substring(0,40)}..." => ${slugs.join(', ')}`);
    }
  }
  
  console.log(`\nTotal dup phones (first 50 chars): ${dupCount}`);
  console.log(`Slugs needing rewrite: ${dupSlugs.length}`);

  const fs = require('fs');
  fs.writeFileSync('scripts/final_dups_50.json', JSON.stringify(dupSlugs));
  
  await mongoose.disconnect();
}
check().catch(console.error);
