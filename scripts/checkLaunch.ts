import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function check() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to DB');

  const phones = await mongoose.connection.collection('phones').find({
    name: { $in: ['Xiaomi 18 Pro Max', 'iQOO 14', 'iQOO Neo 11'] }
  }).toArray();

  console.log(JSON.stringify(phones.map(p => ({
    name: p.name,
    phone_status: p.phone_status,
    expected_launch_date: p.expected_launch_date,
    launch_year: p.launch_year,
    launch_quarter: p.launch_quarter
  })), null, 2));

  await mongoose.disconnect();
}

check().catch(console.error);
