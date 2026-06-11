import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function verify() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to DB\n');
  const db = mongoose.connection.db;
  if(!db) return;

  console.log('=== Released Phones Verification (Sorting by Release Date DESC) ===');
  const released = await db.collection('phones').find({ is_published: true, phone_status: 'released' })
    .sort({ release_date_parsed: -1, price_usd: -1, name: 1 })
    .limit(10)
    .toArray();
  released.forEach((p, i) => console.log(`${i+1}. ${p.name} (Status: ${p.phone_status}, Date: ${p.release_date_parsed})`));

  console.log('\n=== Upcoming Phones Verification (Sorting by Expected Launch Date ASC) ===');
  const upcoming = await db.collection('phones').find({ is_published: true, phone_status: { $in: ['upcoming', 'rumored'] } })
    .sort({ expected_launch_date: 1, name: 1 })
    .toArray();
  upcoming.forEach((p, i) => console.log(`${i+1}. ${p.name} (Status: ${p.phone_status}, Expected Date: ${p.expected_launch_date})`));

  console.log('\n=== Search Query Verification (Released Only) ===');
  const searchResults = await db.collection('phones').find({ is_published: true, phone_status: 'released' })
    .sort({ release_date: -1, price_usd: -1, name: 1 })
    .limit(5)
    .toArray();
  searchResults.forEach((p, i) => console.log(`${i+1}. ${p.name} (Status: ${p.phone_status})`));

  await mongoose.disconnect();
}

verify().catch(console.error);
