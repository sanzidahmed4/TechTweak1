import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function fixIqoo() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected');

  const db = mongoose.connection.db;
  if(!db) return;
  
  await db.collection('phones').updateOne(
    { name: 'iQOO 14' },
    { $set: { 
        phone_status: 'upcoming', 
        price_usd: null, 
        price_display_text: 'Expected Price: TBA', 
        price_status: 'unannounced', 
        leak_confidence: 'moderate',
        upcoming: true 
      }
    }
  );
  console.log('Fixed iQOO 14');

  await db.collection('phones').updateOne(
    { name: 'iQOO Neo 11' },
    { $set: { 
        phone_status: 'upcoming', 
        price_usd: null, 
        price_display_text: 'Expected Price: TBA', 
        price_status: 'unannounced', 
        leak_confidence: 'moderate',
        upcoming: true 
      }
    }
  );
  console.log('Fixed iQOO Neo 11');

  await mongoose.disconnect();
}

fixIqoo().catch(console.error);
