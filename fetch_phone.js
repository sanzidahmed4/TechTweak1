require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');

async function run() {
  await mongoose.connect(MONGODB_URI);
  const slug = process.argv[2];
  const phone = await Phone.findOne({ slug });
  if (phone) {
    console.log(JSON.stringify(phone, null, 2));
  } else {
    console.log("Phone not found");
  }
  process.exit(0);
}

run();
