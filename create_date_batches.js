const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function createBatches() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
    
    // Get all phones (both published and unpublished just in case, but let's stick to released)
    const phones = await Phone.find({ phone_status: 'released' }).select('name').lean();
    
    const names = phones.map(p => p.name);
    console.log(`Found ${names.length} released phones.`);
    
    // Shuffle slightly or just chunk them
    const BATCH_COUNT = 10;
    const chunkSize = Math.ceil(names.length / BATCH_COUNT);
    
    for (let i = 0; i < BATCH_COUNT; i++) {
      const batchNames = names.slice(i * chunkSize, (i + 1) * chunkSize);
      fs.writeFileSync(`batch_dates_${i}.json`, JSON.stringify(batchNames, null, 2));
      console.log(`Created batch_dates_${i}.json with ${batchNames.length} phones.`);
    }
    
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

createBatches();
