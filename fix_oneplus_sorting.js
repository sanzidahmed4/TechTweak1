const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function fixSorting() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  // Find all OnePlus phones
  const oneplusPhones = await Phone.find({ name: { $regex: /OnePlus/i } });
  
  let fixedCount = 0;
  for (let p of oneplusPhones) {
    const doc = p.toObject();
    // If it has no image, or if it's an obviously unreleased/fake one like Nord 6, Ace 5, 13T
    const isFakeOrEmpty = 
      (!doc.images || doc.images.length === 0) || 
      (!doc.price_usd && !doc.price_bdt && !doc.price_official) ||
      doc.name.includes('Nord 6') ||
      doc.name.includes('13T') ||
      doc.name.includes('13R') ||
      doc.name.includes('Ace 5') ||
      doc.name.includes('Ace 6') ||
      doc.name.includes('15') ||
      doc.name.includes('Turbo');
      
    if (isFakeOrEmpty) {
      p.set('release_date', null);
      p.set('release_date_parsed', null);
      await p.save();
      fixedCount++;
      console.log(`Dropped to bottom: ${doc.name}`);
    }
  }
  
  console.log(`Fixed sorting for ${fixedCount} OnePlus phones.`);
  mongoose.disconnect();
}
fixSorting();
