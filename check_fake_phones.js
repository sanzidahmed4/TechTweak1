const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function checkFakes() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  // Find phones that have words like "rumors" or "expected" in their verdict or FAQS, but are marked as released
  const fakes = await Phone.find({
    phone_status: 'released',
    $or: [
      { verdict: { $regex: /rumor|expected|anticipated/i } },
      { overview: { $regex: /rumor|expected/i } },
      { "faqs.answer": { $regex: /rumor|expected/i } },
      { name: { $regex: /Turbo|CE6|Ace 6|15T|15R/i } }
    ]
  }).select('name phone_status release_date price_usd');
  
  console.log(`Found ${fakes.length} potentially fake/upcoming phones marked as released:`);
  fakes.forEach(f => console.log(`- ${f.name}`));
  
  mongoose.disconnect();
}
checkFakes();
