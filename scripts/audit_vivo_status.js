const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function checkStatus() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.model('Brand', new mongoose.Schema({}, { strict: false }));

  const vivoBrand = await Brand.findOne({ slug: 'vivo' });
  const iqooBrand = await Brand.findOne({ slug: 'iqoo' });

  const brandIds = [vivoBrand._id, iqooBrand._id];

  const phones = await Phone.find(
    { brand_id: { $in: brandIds } },
    { name: 1, phone_status: 1, release_date: 1, slug: 1 }
  ).sort({ name: 1 });

  console.log(`\nTotal Vivo/iQOO phones in DB: ${phones.length}\n`);

  const statusGroups = {};
  for (const p of phones) {
    const s = p.phone_status || 'MISSING';
    if (!statusGroups[s]) statusGroups[s] = [];
    statusGroups[s].push(p.name);
  }

  for (const [status, names] of Object.entries(statusGroups)) {
    console.log(`\n=== Status: "${status}" (${names.length} phones) ===`);
    names.forEach(n => console.log(`  - ${n}`));
  }

  await mongoose.disconnect();
}
checkStatus().catch(console.error);
