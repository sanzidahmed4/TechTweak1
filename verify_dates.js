const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function verifyDates() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const samplePhones = await Phone.aggregate([
    { $match: { release_date: { $exists: true, $ne: "" }, release_date_parsed: { $exists: true } } },
    { $sample: { size: 5 } },
    { $project: { _id: 0, name: 1, release_date: 1, release_date_parsed: 1 } }
  ]);
  
  console.log("--- AUTHENTICITY VERIFICATION SAMPLE ---");
  samplePhones.forEach(p => {
    console.log(`Phone: ${p.name}`);
    console.log(`String Date: ${p.release_date}`);
    console.log(`Parsed Date: ${p.release_date_parsed}`);
    console.log('----------------------------------------');
  });
  
  mongoose.disconnect();
}
verifyDates();
