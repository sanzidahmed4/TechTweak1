const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function getBatch() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const phones = await Phone.find(
    { is_published: true, manual_seo_done: false },
    { slug: 1 }
  ).limit(5).lean();

  console.log(phones.map(p => p.slug).join(','));
  await mongoose.disconnect();
}
getBatch().catch(console.error);
