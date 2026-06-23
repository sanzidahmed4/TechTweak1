import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function check() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, {strict: false}));
  const phones = await Phone.find({slug: {$in: ['motorola-thinkphone', 'motorola-razr-50-ultra', 'motorola-edge-50-pro']}});
  console.log(phones.map(p => ({name: p.name, price_usd: p.price_usd})));
  process.exit(0);
}
check();
