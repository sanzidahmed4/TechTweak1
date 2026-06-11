import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function updatePhones() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to DB');

  // Xiaomi 18 Pro Max
  await mongoose.connection.collection('phones').updateOne(
    { name: 'Xiaomi 18 Pro Max' },
    { $set: { 
        phone_status: 'rumored',
        expected_launch_date: 'September 2026',
        launch_year: 2026,
        launch_quarter: 'Q3'
      } 
    }
  );

  // iQOO 14
  await mongoose.connection.collection('phones').updateOne(
    { name: 'iQOO 14' },
    { $set: { 
        phone_status: 'rumored',
        expected_launch_date: null,
        launch_year: 2026,
        launch_quarter: 'Q4'
      } 
    }
  );

  // iQOO Neo 11
  await mongoose.connection.collection('phones').updateOne(
    { name: 'iQOO Neo 11' },
    { $set: { 
        phone_status: 'upcoming',
        expected_launch_date: null,
        launch_year: 2026,
        launch_quarter: 'Q4'
      } 
    }
  );

  console.log('Updates complete');
  await mongoose.disconnect();
}

updatePhones().catch(console.error);
