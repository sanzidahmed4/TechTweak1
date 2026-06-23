const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const unpub = await Phone.find({ is_published: { $ne: true } }, { name: 1, slug: 1, _id: 0 }).lean();
  
  console.log(JSON.stringify(unpub, null, 2));
  
  await mongoose.disconnect();
}

run().catch(console.error);
