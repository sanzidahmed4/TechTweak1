import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import Phone from '../src/lib/models/Phone.js';
import Brand from '../src/lib/models/Brand.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    const brandName = 'vivo';
    const brand = await Brand.findOne({ slug: brandName });
    if (!brand) {
      console.log('Brand not found:', brandName);
      process.exit(1);
    }
    
    const fs = await import('fs');
    const data = JSON.parse(fs.readFileSync('scripts/phone_data.json', 'utf8'));
    data.brand_id = brand._id;
    data.updated_at = new Date();

    const existing = await Phone.findOne({ slug: data.slug });
    if (existing) {
      await Phone.updateOne({ slug: data.slug }, data);
      console.log('Updated existing phone:', data.slug);
    } else {
      data.created_at = new Date();
      await Phone.create(data);
      console.log('Inserted new phone:', data.slug);
    }

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

run();
