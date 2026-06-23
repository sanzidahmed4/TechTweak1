const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function fixDates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
    
    // Find all released phones with a release_date string
    const phones = await Phone.find({
      phone_status: 'released',
      release_date: { $exists: true, $ne: null, $ne: '' }
    });
    
    let updatedCount = 0;
    
    for (const p of phones) {
      if (p.release_date) {
        let parsedDate = null;
        const dateStr = String(p.release_date).trim();
        
        const timestamp = Date.parse(dateStr);
        if (!isNaN(timestamp)) {
          parsedDate = new Date(timestamp);
        } else {
          const yearMatch = dateStr.match(/\d{4}/);
          if (yearMatch) {
            parsedDate = new Date(`${yearMatch[0]}-01-01`);
          }
        }
        
        if (parsedDate) {
          p.set('release_date_parsed', parsedDate);
          await p.save();
          updatedCount++;
        }
      }
    }
    
    console.log(`Successfully updated release_date_parsed for ${updatedCount} phones.`);
    
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

fixDates();
