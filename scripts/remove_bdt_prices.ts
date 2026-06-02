import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false, collection: 'phones' }));
  
  await Phone.updateMany(
    { slug: { $in: ['samsung-galaxy-s22', 'samsung-galaxy-s21-fe-5g', 'samsung-galaxy-s22-plus', 'samsung-galaxy-s22-ultra'] } },
    { $unset: { price_bdt: "", price_official: "", price_unofficial: "" } }
  );
  
  console.log('Removed BDT prices successfully');
  process.exit(0);
}

run();
