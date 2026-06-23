import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function auditDates() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to DB');
  const db = mongoose.connection.db;
  if(!db) return;

  const upcomingPhones = await db.collection('phones').find({ phone_status: { $in: ['upcoming', 'rumored'] } }).toArray();
  
  let missingExpected = 0;
  let missingYear = 0;
  let missingQuarter = 0;

  console.log('\n--- Upcoming Phones Metadata Audit ---');
  
  for (const phone of upcomingPhones) {
    const isMissingExpected = !phone.expected_launch_date || phone.expected_launch_date.trim() === '';
    const isMissingYear = !phone.launch_year;
    const isMissingQuarter = !phone.launch_quarter || phone.launch_quarter.trim() === '';
    
    if (isMissingExpected) missingExpected++;
    if (isMissingYear) missingYear++;
    if (isMissingQuarter) missingQuarter++;
    
    if (isMissingExpected || isMissingYear || isMissingQuarter) {
      console.log(`- ${phone.name} (Status: ${phone.phone_status})`);
      if (isMissingExpected) console.log(`  - Missing expected_launch_date`);
      if (isMissingYear) console.log(`  - Missing launch_year`);
      if (isMissingQuarter) console.log(`  - Missing launch_quarter`);
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Total Upcoming/Rumored Phones: ${upcomingPhones.length}`);
  console.log(`Missing expected_launch_date: ${missingExpected}`);
  console.log(`Missing launch_year: ${missingYear}`);
  console.log(`Missing launch_quarter: ${missingQuarter}`);

  await mongoose.disconnect();
}

auditDates().catch(console.error);
