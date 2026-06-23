const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function checkCount() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const total = await Phone.countDocuments({});
  const released = await Phone.countDocuments({ phone_status: 'released' });
  const updated = await Phone.countDocuments({ release_date_parsed: { $exists: true } });
  
  console.log(`Total phones: ${total}`);
  console.log(`Released phones: ${released}`);
  console.log(`Phones with parsed date: ${updated}`);
  
  mongoose.disconnect();
}
checkCount();
