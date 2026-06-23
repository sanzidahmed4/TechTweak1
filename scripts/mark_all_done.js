const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  const res = await Phone.updateMany({ is_published: true }, { $set: { manual_seo_done: true } });
  console.log(`Marked ${res.modifiedCount} phones as manual_seo_done: true`);
  await mongoose.disconnect();
}
run().catch(console.error);
