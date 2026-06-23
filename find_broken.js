const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function findBroken() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const broken = await Phone.findOne({ $or: [{ processor: { $exists: false } }, { processor: null }] });
  console.log("Broken phone name:", broken ? broken.name : "None found");
  
  // also check if "Galaxy A56 5G" has processor
  const a56 = await Phone.findOne({ name: 'Galaxy A56 5G' });
  console.log("Galaxy A56 5G Processor:", a56 ? a56.processor : "not found");
  
  mongoose.disconnect();
}
findBroken();
