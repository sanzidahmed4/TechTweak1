const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function checkDateStrings() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
    const phones = await Phone.find({ phone_status: 'released' }).select('name release_date release_date_parsed').lean();
    
    console.log("Sample of 10 phones:");
    phones.slice(0, 10).forEach(p => console.log(`- ${p.name}: ${p.release_date}`));
    
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

checkDateStrings();
