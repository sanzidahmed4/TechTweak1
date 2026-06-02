import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false, collection: 'phones' }));
  const phones = await Phone.find({ slug: { $regex: 'samsung-galaxy-s21-fe|samsung-galaxy-s22' } });
  
  for (let p of phones) {
    console.log(p.slug, ':', p.price_usd);
  }
  process.exit(0);
}

run();
