import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false, collection: 'phones' }));
  
  await Phone.updateOne({ slug: 'samsung-galaxy-s22' }, { $set: { price_usd: 799.99, price_bdt: 79999 } });
  await Phone.updateOne({ slug: 'samsung-galaxy-s21-fe-5g' }, { $set: { price_usd: 699.99, price_bdt: 69999 } });
  await Phone.updateOne({ slug: 'samsung-galaxy-s22-plus' }, { $set: { price_usd: 999.99, price_bdt: 99999 } });
  await Phone.updateOne({ slug: 'samsung-galaxy-s22-ultra' }, { $set: { price_usd: 1199.99, price_bdt: 129999 } });
  
  console.log('Prices updated successfully');
  process.exit(0);
}

run();
