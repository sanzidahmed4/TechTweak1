import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function fixXiaomi() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected');

  const db = mongoose.connection.db;
  if(!db) return;
  
  await db.collection('phones').updateOne(
    { name: 'Xiaomi 18 Pro Max' },
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
  console.log('Fixed Xiaomi 18 Pro Max');

  await mongoose.disconnect();
}

fixXiaomi().catch(console.error);
