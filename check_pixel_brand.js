const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function checkPhone() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const phoneSchema = new mongoose.Schema({
    name: String,
    slug: String,
    brand_id: mongoose.Schema.Types.ObjectId,
  }, { strict: false });
  
  const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema);
  
  const phone = await Phone.findOne({ slug: 'google-pixel-10' }).lean();
  console.log('Phone:', phone);
  
  const brand = await mongoose.connection.collection('brands').findOne({ _id: phone?.brand_id });
  console.log('Brand:', brand);
  
  process.exit(0);
}

checkPhone().catch(console.error);
