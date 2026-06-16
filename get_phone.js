require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('techtweak');
    const slug = process.argv[2];
    const phone = await db.collection('phones').findOne({ slug });
    if (!phone) {
      console.log('Phone not found for slug:', slug);
      return;
    }
    console.log(JSON.stringify(phone, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
