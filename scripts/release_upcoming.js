const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function releasePhones() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  const result = await Phone.updateMany(
    { phone_status: 'upcoming' },
    { $set: { phone_status: 'released', is_official: true, expected_launch_date: '', release_date: '2026' } }
  );

  console.log(`Successfully updated ${result.modifiedCount} upcoming phones to released status.`);
  await mongoose.disconnect();
}

releasePhones().catch(console.error);
