import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('techtweak');
    const collection = database.collection('phones');
    const slug = process.argv[2];
    const phone = await collection.findOne({ slug: slug });
    console.log(JSON.stringify(phone, null, 2));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
