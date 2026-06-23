import { config } from 'dotenv';
import path from 'path';
config({ path: path.resolve(process.cwd(), '.env.local') });
import connectToDatabase from '../src/lib/mongodb/mongoose';
import Phone from '../src/lib/models/Phone';

const samsungUpdates = [
  { name: "Samsung Galaxy S24 Ultra", release_date: "January 31, 2024", parsed: new Date("2024-01-31") },
  { name: "Samsung Galaxy S24+", release_date: "January 31, 2024", parsed: new Date("2024-01-31") },
  { name: "Samsung Galaxy S24", release_date: "January 31, 2024", parsed: new Date("2024-01-31") },
  { name: "Samsung Galaxy S24 FE", release_date: "October 3, 2024", parsed: new Date("2024-10-03") },
  { name: "Samsung Galaxy S23 Ultra", release_date: "February 17, 2023", parsed: new Date("2023-02-17") },
  { name: "Samsung Galaxy S23+", release_date: "February 17, 2023", parsed: new Date("2023-02-17") },
  { name: "Samsung Galaxy S23", release_date: "February 17, 2023", parsed: new Date("2023-02-17") },
  { name: "Samsung Galaxy S23 FE", release_date: "October 26, 2023", parsed: new Date("2023-10-26") }
];

async function updateSamsungPhones() {
  await connectToDatabase();
  
  for (const update of samsungUpdates) {
    const result = await Phone.updateOne(
      { name: update.name },
      { $set: { release_date: update.release_date, release_date_parsed: update.parsed } }
    );
    console.log(`Updated ${update.name}: matched ${result.matchedCount}, modified ${result.modifiedCount}`);
  }
  
  console.log("Generating final report...");
  const totalPhones = await Phone.countDocuments();
  const missingDates = await Phone.countDocuments({ release_date_parsed: null });
  const invalidDates = await Phone.find({ release_date_parsed: { $exists: true, $type: "string" } }).countDocuments(); // Date type check
  const atBottom = await Phone.countDocuments({ release_date_parsed: null });
  
  console.log(`Total phones: ${totalPhones}`);
  console.log(`Missing release dates: ${missingDates}`);
  console.log(`Invalid dates: ${invalidDates}`);
  console.log(`Phones placed at bottom due to missing dates: ${atBottom}`);
  
  process.exit(0);
}

updateSamsungPhones().catch(console.error);
