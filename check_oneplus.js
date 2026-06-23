const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function checkOnePlus() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const oneplusPhones = await Phone.find({ name: { $regex: /OnePlus/i } }).select('name phone_status is_published release_date price_usd price_bdt price_display_text').sort({ name: 1 });
  console.log(`Total OnePlus phones: ${oneplusPhones.length}`);
  oneplusPhones.slice(0, 15).forEach(p => console.log(`- ${p.name} | Status: ${p.phone_status} | USD: ${p.price_usd} | BDT: ${p.price_bdt} | Text: ${p.price_display_text}`));
  
  mongoose.disconnect();
}
checkOnePlus();
