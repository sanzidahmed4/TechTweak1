import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);
    
    const BrandSchema = new mongoose.Schema({}, { strict: false });
    const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
    
    const samsungBrand = await Brand.findOne({ name: /Samsung/i });
    if (!samsungBrand) {
      console.log("No Samsung brand found.");
      return;
    }
    
    const phones = await Phone.find({ brand_id: samsungBrand._id }, 'name slug').sort({ name: 1 });
    console.log(`Found ${phones.length} Samsung phones.`);
    phones.forEach(p => console.log(`- ${p.name}`));
    
  } catch(e) {
    console.error(e);
  } finally {
    mongoose.disconnect();
  }
}
run();
