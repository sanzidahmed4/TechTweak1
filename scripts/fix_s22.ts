import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
    
    await Phone.updateOne({ slug: 'samsung-galaxy-s22-plus' }, { $set: { price_usd: 999.99 } });
    await Phone.updateOne({ slug: 'samsung-galaxy-s22-ultra' }, { $set: { price_usd: 1199.99 } });
    
    console.log('✅ S22 prices fixed successfully!');
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
