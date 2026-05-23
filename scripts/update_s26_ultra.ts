import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
import Phone from '../src/lib/models/Phone';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function main() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to MongoDB.');

    // Find and update the Samsung Galaxy S26 Ultra
    const result = await Phone.updateOne(
      { name: { $regex: /Galaxy S26 Ultra/i } },
      { 
        $set: { 
          price_usd: 1299,
          made_in: 'Assembled in Vietnam/India (Designed in South Korea)'
        } 
      }
    );

    if (result.matchedCount > 0) {
      console.log('✅ Updated Samsung Galaxy S26 Ultra (Price: $1299, Made in: Vietnam/India)');
    } else {
      console.log('⚠️ Could not find phone matching: Samsung Galaxy S26 Ultra');
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
