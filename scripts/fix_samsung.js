require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

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

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('techtweak');
    const phonesCol = db.collection('phones');
    
    for (const update of samsungUpdates) {
      const result = await phonesCol.updateOne(
        { name: update.name },
        { $set: { release_date: update.release_date, release_date_parsed: update.parsed } }
      );
      console.log(`Updated ${update.name}: matched ${result.matchedCount}, modified ${result.modifiedCount}`);
    }
    
    const totalPhones = await phonesCol.countDocuments();
    const missingDates = await phonesCol.countDocuments({ release_date_parsed: null });
    const invalidDates = await phonesCol.countDocuments({ release_date_parsed: { $type: "string" } });
    const atBottom = await phonesCol.countDocuments({ release_date_parsed: null });
    
    console.log(`\n--- Verification Results ---`);
    console.log(`Total phones: ${totalPhones}`);
    console.log(`Missing release dates: ${missingDates}`);
    console.log(`Invalid dates: ${invalidDates}`);
    console.log(`Phones placed at bottom due to missing dates: ${atBottom}`);
    
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
