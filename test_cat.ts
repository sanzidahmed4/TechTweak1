import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected');
  const db = mongoose.connection.db;
  if (!db) return;
  const categories = await db.collection('categories').find().toArray();
  console.log("Categories:", categories);
  process.exit(0);
}
run();
