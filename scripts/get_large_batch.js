const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function getBatches() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const phones = await Phone.find(
    { is_published: true, manual_seo_done: false },
    { slug: 1 }
  ).limit(50).lean();

  const chunks = [];
  for (let i = 0; i < phones.length; i += 5) {
    chunks.push(phones.slice(i, i + 5).map(p => p.slug).join(','));
  }

  console.log(JSON.stringify(chunks));
  await mongoose.disconnect();
}
getBatches().catch(console.error);
