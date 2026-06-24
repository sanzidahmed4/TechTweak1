const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function checkXiaomi() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const phone = await Phone.findOne({ name: 'Xiaomi 15 Ultra' });
  if (phone) {
    console.log("Keys in Xiaomi 15 Ultra:", Object.keys(phone.toObject()));
    console.log("Processor:", phone.processor);
    console.log("Display:", phone.display);
    console.log("SEO Title:", phone.meta_title);
  } else {
    console.log("Phone not found");
  }
  
  mongoose.disconnect();
}
checkXiaomi();
