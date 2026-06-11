import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));
    const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));
    const samsungBrand = await Brand.findOne({ name: /Samsung/i });

    const phones = await Phone.find({ brand_id: samsungBrand._id, "internal_links.same_brand": { $exists: false } });
    for (const p of phones) {
      await Phone.updateOne({ _id: p._id }, { $set: { "internal_links.same_brand": [] } });
      console.log('Fixed link for: ' + p.name);
    }
  } catch(e) { console.log(e) } finally { process.exit(0); }
}
run();
