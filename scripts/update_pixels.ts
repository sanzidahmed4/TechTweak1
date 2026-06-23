import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
import Phone from '../src/lib/models/Phone';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const pixelData = [
  { name: 'Pixel 5', made_in: 'Assembled in China/Vietnam (Designed in USA)', price: 699 },
  { name: 'Pixel 5a 5G', made_in: 'Assembled in China/Vietnam (Designed in USA)', price: 449 },
  { name: 'Pixel 6', made_in: 'Assembled in China/Vietnam (Designed in USA)', price: 599 },
  { name: 'Pixel 6 Pro', made_in: 'Assembled in China/Vietnam (Designed in USA)', price: 899 },
  { name: 'Pixel 6a', made_in: 'Assembled in China/Vietnam (Designed in USA)', price: 449 },
  { name: 'Pixel 7', made_in: 'Assembled in China/Vietnam/India (Designed in USA)', price: 599 },
  { name: 'Pixel 7 Pro', made_in: 'Assembled in China/Vietnam (Designed in USA)', price: 899 },
  { name: 'Pixel 7a', made_in: 'Assembled in China/Vietnam/India (Designed in USA)', price: 499 },
  { name: 'Pixel Fold', made_in: 'Assembled in China (Designed in USA)', price: 1799 },
  { name: 'Pixel 8', made_in: 'Assembled in China/Vietnam/India (Designed in USA)', price: 699 },
  { name: 'Pixel 8 Pro', made_in: 'Assembled in China/Vietnam/India (Designed in USA)', price: 999 },
  { name: 'Pixel 8a', made_in: 'Assembled in China/Vietnam/India (Designed in USA)', price: 499 },
  { name: 'Pixel 9', made_in: 'Assembled in China/Vietnam/India (Designed in USA)', price: 799 },
  { name: 'Pixel 9 Pro', made_in: 'Assembled in China/Vietnam/India (Designed in USA)', price: 999 },
  { name: 'Pixel 9 Pro XL', made_in: 'Assembled in China/Vietnam/India (Designed in USA)', price: 1099 },
  { name: 'Pixel 9 Pro Fold', made_in: 'Assembled in China/Vietnam/India (Designed in USA)', price: 1799 },
  { name: 'Pixel 10', made_in: 'Assembled in Vietnam/India/China (Designed in USA)', price: 799 },
  { name: 'Pixel 10 Pro', made_in: 'Assembled in Vietnam/India/China (Designed in USA)', price: 999 },
  { name: 'Pixel 10 Pro XL', made_in: 'Assembled in Vietnam/India/China (Designed in USA)', price: 1199 }
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to MongoDB.');

    for (const item of pixelData) {
      // Find matching phone using regex. The name in DB might be "Google Pixel 5" or "Pixel 5"
      const result = await Phone.updateOne(
        { name: { $regex: new RegExp(`${item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } },
        { 
          $set: { 
            price_usd: item.price,
            made_in: item.made_in
          } 
        }
      );
      if (result.matchedCount > 0) {
        console.log(`✅ Updated ${item.name}`);
      } else {
        console.log(`⚠️ Could not find phone matching: ${item.name}`);
      }
    }

    console.log('Update complete.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

main();
