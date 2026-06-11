import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));
  const samsung = await Brand.findOne({ name: /Samsung/i });
  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));
  
  const phones = await Phone.find({ 
    brand_id: samsung._id, 
    name: /Galaxy S/i 
  }).select('name overview');
  
  const missing = phones.filter(p => !p.overview || p.overview.length < 50);
  console.log(`Found ${missing.length} S-Series phones missing overview:`);
  missing.forEach(p => console.log(p.name));
  
  await mongoose.disconnect();
}
run();
