const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const all = await Phone.countDocuments();
  const pub = await Phone.countDocuments({ is_published: true });
  const unpub = await Phone.countDocuments({ is_published: { $ne: true } });
  
  console.log('Total phones in DB:', all);
  console.log('Published phones:', pub);
  console.log('Unpublished phones:', unpub);
  
  await mongoose.disconnect();
}

run().catch(console.error);
