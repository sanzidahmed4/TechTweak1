import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
    
    await Phone.updateOne({ slug: 'motorola-razr-50-ultra' }, { $set: { price_usd: 999.99 } });
    await Phone.updateOne({ slug: 'motorola-thinkphone' }, { $set: { price_usd: 699.99 } });
    
    console.log('✅ Motorola prices fixed successfully!');
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
