const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function checkPhone() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const sample = await Phone.findOne({ name: 'Galaxy Z Fold 6' });
  console.log(JSON.stringify(sample, null, 2));
  
  mongoose.disconnect();
}
checkPhone();
