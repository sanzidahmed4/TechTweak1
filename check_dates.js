const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function checkMissingDates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
    
    const total = await Phone.countDocuments({ phone_status: 'released', is_published: true });
    
    const missingDate = await Phone.find({
      phone_status: 'released',
      is_published: true,
      $or: [
        { release_date_parsed: { $exists: false } },
        { release_date_parsed: null }
      ]
    }).lean();
    
    console.log(`Total released phones: ${total}`);
    console.log(`Phones missing release_date_parsed: ${missingDate.length}`);
    
    if (missingDate.length > 0) {
      console.log('Sample missing dates:');
      missingDate.slice(0, 5).forEach(p => console.log(`- ${p.name} (Release string: ${p.release_date})`));
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

checkMissingDates();
