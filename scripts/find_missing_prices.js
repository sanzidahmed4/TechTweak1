const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function findMissingPrices() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  const phones = await Phone.find({
    phone_status: 'released',
    $or: [
      { price_usd: null },
      { price_usd: { $exists: false } },
      { price_display_text: /Not Announced/i }
    ]
  }).select('name slug brand').lean();

  console.log(`Found ${phones.length} released phones with missing prices.`);
  console.log(JSON.stringify(phones.map(p => p.name), null, 2));

  await mongoose.disconnect();
}

findMissingPrices().catch(console.error);
