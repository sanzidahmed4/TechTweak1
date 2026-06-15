const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  const p = await Phone.findOne({ name: /iQOO Neo 11/i });
  console.log(JSON.stringify(p, null, 2));
  await mongoose.disconnect();
}
check().catch(console.error);
