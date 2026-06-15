const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  await Phone.updateOne({ slug: 'vivo-v50-pro' }, { $set: { phone_status: 'released' } });
  console.log('Fixed: Vivo V50 Pro status -> released');
  await mongoose.disconnect();
}
fix().catch(console.error);
