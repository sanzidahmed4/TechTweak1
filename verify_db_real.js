const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function checkDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const phone = await Phone.findOne({ name: 'iPhone 15 Pro' });
  if (phone) {
    console.log("Keys in iPhone 15 Pro:", Object.keys(phone.toObject()));
    console.log("Processor:", phone.processor);
    console.log("Display:", phone.display);
    console.log("SEO Title:", phone.meta_title);
  } else {
    console.log("Phone not found");
  }
  
  const countReleased = await Phone.countDocuments({ phone_status: 'released' });
  const countUpcoming = await Phone.countDocuments({ phone_status: 'upcoming' });
  console.log("Released:", countReleased, "Upcoming:", countUpcoming);
  
  mongoose.disconnect();
}
checkDB();
