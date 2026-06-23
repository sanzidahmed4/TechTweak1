import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');
  const samsung = await Brand.findOne({ slug: 'samsung' }).lean();
  console.log('Samsung ID:', samsung._id);
  process.exit(0);
}
run();
