import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('techtweak');
    const brand = await db.collection('brands').findOne({ name: { $regex: /^vivo$/i } });
    console.log("VIVO_BRAND_ID=" + brand._id);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
