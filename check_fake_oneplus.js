const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function checkFake() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const fake = await Phone.findOne({ name: 'OnePlus Turbo 6X' });
  console.log(fake.toObject());
  mongoose.disconnect();
}
checkFake();
