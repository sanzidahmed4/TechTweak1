const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function fixSlugs() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  const phones = await Phone.find({ slug: null });
  console.log(`Found ${phones.length} phones with null slug.`);

  for (const phone of phones) {
    if (phone.name) {
      const newSlug = phone.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      await Phone.updateOne({ _id: phone._id }, { $set: { slug: newSlug } });
      console.log(`Updated slug for ${phone.name} -> ${newSlug}`);
    }
  }

  // Also check if any y200e, y22 etc. were NOT inserted at all
  const y200e = await Phone.findOne({ name: /Vivo Y200e/i });
  console.log('Is Y200e in DB?', !!y200e);

  console.log('Fix complete.');
  await mongoose.disconnect();
}

fixSlugs().catch(console.error);
