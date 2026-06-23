const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function checkTBA() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const totalPhones = await Phone.countDocuments({});
  
  const noPrice = await Phone.countDocuments({
    $or: [
      { price_bdt: { $exists: false } },
      { price_bdt: null },
      { price_bdt: 0 },
      { price_display_text: { $regex: /TBA/i } }
    ]
  });
  
  const noSpecs = await Phone.countDocuments({
    $or: [
      { chipset_highlight: { $exists: false } },
      { chipset_highlight: null },
      { chipset_highlight: "" }
    ]
  });
  
  console.log(`Total phones: ${totalPhones}`);
  console.log(`Phones with no price or TBA: ${noPrice}`);
  console.log(`Phones missing chipset_highlight: ${noSpecs}`);
  
  mongoose.disconnect();
}
checkTBA();
