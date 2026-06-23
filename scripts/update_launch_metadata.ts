import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function updateMetadata() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to DB');
  const db = mongoose.connection.db;
  if(!db) return;

  await db.collection('phones').updateOne(
    { name: 'Xiaomi 18 Pro Max' },
    { $set: { 
        expected_launch_date: 'September 2026',
        launch_year: 2026,
        launch_quarter: 'Q3',
        leak_confidence: 'Rumored'
      } 
    }
  );

  await db.collection('phones').updateOne(
    { name: 'iQOO 14' },
    { $set: { 
        expected_launch_date: null,
        launch_year: 2026,
        launch_quarter: 'Q4',
        leak_confidence: 'Expected'
      } 
    }
  );

  await db.collection('phones').updateOne(
    { name: 'iQOO Neo 11' },
    { $set: { 
        expected_launch_date: null,
        launch_year: 2026,
        launch_quarter: 'Q4', // Global launch speculation
        leak_confidence: 'Rumored'
      } 
    }
  );

  console.log('Metadata updated successfully.');
  await mongoose.disconnect();
}

updateMetadata().catch(console.error);
