import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function updatePriceText() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected');

  const db = mongoose.connection.db;
  if(!db) return;
  
  await db.collection('phones').updateMany(
    { phone_status: 'upcoming' },
    { $set: { price_display_text: 'Not Announced Yet' } }
  );

  await db.collection('phones').updateMany(
    { phone_status: 'rumored' },
    { $set: { price_display_text: 'Price Not Confirmed' } }
  );
  
  console.log('Price texts updated.');
  await mongoose.disconnect();
}

updatePriceText().catch(console.error);
