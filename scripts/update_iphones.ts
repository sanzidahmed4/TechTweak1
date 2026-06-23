import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Since Next.js aliases might not work natively in node, we import the model via relative paths
import Phone from '../src/lib/models/Phone';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const iphoneData = [
  { name: 'iPhone X', made_in: 'Assembled in China (Designed in USA)', price: 999 },
  { name: 'iPhone XR', made_in: 'Assembled in China/India (Designed in USA)', price: 749 },
  { name: 'iPhone XS', made_in: 'Assembled in China (Designed in USA)', price: 999 },
  { name: 'iPhone XS Max', made_in: 'Assembled in China (Designed in USA)', price: 1099 },
  { name: 'iPhone 11', made_in: 'Assembled in China/India (Designed in USA)', price: 699 },
  { name: 'iPhone 11 Pro', made_in: 'Assembled in China (Designed in USA)', price: 999 },
  { name: 'iPhone 11 Pro Max', made_in: 'Assembled in China (Designed in USA)', price: 1099 },
  { name: 'iPhone SE (2nd Gen)', made_in: 'Assembled in China (Designed in USA)', price: 399 },
  { name: 'iPhone 12 Mini', made_in: 'Assembled in China (Designed in USA)', price: 699 },
  { name: 'iPhone 12', made_in: 'Assembled in China/India (Designed in USA)', price: 799 },
  { name: 'iPhone 12 Pro', made_in: 'Assembled in China (Designed in USA)', price: 999 },
  { name: 'iPhone 12 Pro Max', made_in: 'Assembled in China (Designed in USA)', price: 1099 },
  { name: 'iPhone 13 Mini', made_in: 'Assembled in China (Designed in USA)', price: 699 },
  { name: 'iPhone 13', made_in: 'Assembled in China/India (Designed in USA)', price: 799 },
  { name: 'iPhone 13 Pro', made_in: 'Assembled in China (Designed in USA)', price: 999 },
  { name: 'iPhone 13 Pro Max', made_in: 'Assembled in China (Designed in USA)', price: 1099 },
  { name: 'iPhone SE (3rd Gen)', made_in: 'Assembled in China/India (Designed in USA)', price: 429 },
  { name: 'iPhone 14', made_in: 'Assembled in China/India (Designed in USA)', price: 799 },
  { name: 'iPhone 14 Plus', made_in: 'Assembled in China (Designed in USA)', price: 899 },
  { name: 'iPhone 14 Pro', made_in: 'Assembled in China (Designed in USA)', price: 999 },
  { name: 'iPhone 14 Pro Max', made_in: 'Assembled in China (Designed in USA)', price: 1099 },
  { name: 'iPhone 15', made_in: 'Assembled in China/India (Designed in USA)', price: 799 },
  { name: 'iPhone 15 Plus', made_in: 'Assembled in China/India (Designed in USA)', price: 899 },
  { name: 'iPhone 15 Pro', made_in: 'Assembled in China/India (Designed in USA)', price: 999 },
  { name: 'iPhone 15 Pro Max', made_in: 'Assembled in China/India (Designed in USA)', price: 1199 },
  { name: 'iPhone 16', made_in: 'Assembled in China/India (Designed in USA)', price: 799 },
  { name: 'iPhone 16 Plus', made_in: 'Assembled in China/India (Designed in USA)', price: 899 },
  { name: 'iPhone 16 Pro', made_in: 'Assembled in China/India (Designed in USA)', price: 999 },
  { name: 'iPhone 16 Pro Max', made_in: 'Assembled in China/India (Designed in USA)', price: 1199 },
  { name: 'iPhone 17e', made_in: 'Assembled in China/India (Designed in USA)', price: 599 },
  { name: 'iPhone 17', made_in: 'Assembled in China/India (Designed in USA)', price: 799 },
  { name: 'iPhone 17 Pro', made_in: 'Assembled in China/India (Designed in USA)', price: 1099 },
  { name: 'iPhone 17 Pro Max', made_in: 'Assembled in China/India (Designed in USA)', price: 1299 }
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to MongoDB.');

    // 1. Process explicit iPhone data
    for (const item of iphoneData) {
      // Find matching phone using a regex for name matching
      // Note: "Apple iPhone 16 Pro" is likely how it's saved in DB
      const result = await Phone.updateOne(
        { name: { $regex: new RegExp(`(?:Apple\\s+)?${item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } },
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

    // 2. Convert remaining phones BDT -> USD (using rate 120)
    const allPhones = await Phone.find({ price_usd: { $exists: false } });
    for (const p of allPhones) {
      if (p.price_bdt) {
        const converted = Math.round(p.price_bdt / 120);
        p.price_usd = converted;
        
        if (p.price_official) {
            p.price_official = Math.round(p.price_official / 120);
        }
        
        await p.save();
        console.log(`🔄 Converted ${p.name}: BDT ${p.price_bdt} -> USD $${converted}`);
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
