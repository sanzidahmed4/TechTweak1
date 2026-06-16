const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  // Fix iQOO Neo 11
  await Phone.updateOne(
    { slug: 'iqoo-neo-11' }, 
    { $set: { release_date_parsed: new Date('2025-10-30T00:00:00.000Z') } }
  );

  console.log('Fixed iQOO Neo 11 parsed date.');

  // Check if any other released phones have dates far in the future
  const futurePhones = await Phone.find({
    phone_status: 'released',
    release_date_parsed: { $gt: new Date('2026-02-01T00:00:00.000Z') }
  }, { name: 1, release_date: 1, release_date_parsed: 1 });

  if (futurePhones.length > 0) {
    console.log('\nOther phones with unusually future parsed dates:');
    futurePhones.forEach(p => {
      console.log(`- ${p.name}: ${p.release_date} -> ${p.release_date_parsed}`);
    });
  }

  await mongoose.disconnect();
}
fix().catch(console.error);
