const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

function clean(str) { return (str || 'advanced').replace(/"/g, '').replace(/,/g, '').trim(); }
function wc(str) { return (str || '').split(/\s+/).filter(w => w).length; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  const all = await Phone.find({ is_published: true }, { slug: 1, seo_overview: 1 }).lean();

  // Find remaining duplicate overviews
  const groups = new Map();
  for (const p of all) {
    const key = (p.seo_overview || '').substring(0, 80);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p.slug);
  }

  const dupSlugs = [];
  for (const [key, slugs] of groups) {
    if (slugs.length > 1 && key.length > 10) dupSlugs.push(...slugs);
  }

  console.log(`Found ${dupSlugs.length} remaining duplicate overview phones.`);
  fs.writeFileSync('scripts/remaining_dups.json', JSON.stringify(dupSlugs));

  await mongoose.disconnect();
}
run().catch(console.error);
