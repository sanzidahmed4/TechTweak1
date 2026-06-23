const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function checkSpecs() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const sample = await Phone.findOne({ name: 'Galaxy A56 5G' });
  console.log("Galaxy A56 5G Processor:", sample.processor);
  console.log("Galaxy A56 5G Price BDT:", sample.price_bdt);
  console.log("Galaxy A56 5G Screen Size:", sample.screen_size);
  console.log("Galaxy A56 5G Camera Main:", sample.camera_main);
  console.log("Galaxy A56 5G Battery:", sample.battery);
  
  const missingProcessorCount = await Phone.countDocuments({ $or: [{ processor: { $exists: false } }, { processor: null }, { processor: "" }] });
  console.log("Phones missing 'processor' field:", missingProcessorCount);
  
  mongoose.disconnect();
}
checkSpecs();
