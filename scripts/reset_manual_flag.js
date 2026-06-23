const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function reset() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const result = await Phone.updateMany(
    { is_published: true },
    { $set: { manual_seo_done: false } }
  );

  console.log(`Set manual_seo_done = false for ${result.modifiedCount} phones.`);
  await mongoose.disconnect();
}
reset().catch(console.error);
