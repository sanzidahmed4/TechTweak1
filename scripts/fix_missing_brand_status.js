const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.model('Brand', new mongoose.Schema({}, { strict: false }));

  const vivoBrand = await Brand.findOne({ slug: 'vivo' });
  if (!vivoBrand) {
    console.log('ERROR: Vivo brand not found!');
    process.exit(1);
  }
  console.log(`Vivo brand _id: ${vivoBrand._id}`);

  const phonesToFix = [
    'Vivo T1', 'Vivo Y200e', 'Vivo Y22', 'Vivo Y28',
    'Vivo Y300', 'Vivo Y36', 'Vivo Y58', 'Vivo Y300 Pro',
    'Vivo T2', 'Vivo T2 Pro', 'Vivo T3', 'Vivo T3x', 'Vivo T3 Pro'
  ];

  for (const name of phonesToFix) {
    const result = await Phone.updateOne(
      { name: name },
      { $set: { brand_id: vivoBrand._id, phone_status: 'released', is_published: true } }
    );
    console.log(`Fixed "${name}": matched=${result.matchedCount}, modified=${result.modifiedCount}`);
  }

  console.log('\nAll 13 phones fixed successfully!');
  await mongoose.disconnect();
}

fix().catch(console.error);
