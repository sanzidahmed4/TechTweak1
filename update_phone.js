require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');
const fs = require('fs');

async function main() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('techtweak');
    const slug = process.argv[2];
    const dataPath = process.argv[3];
    
    const updateData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    updateData.manual_seo_done = true;

    const result = await db.collection('phones').updateOne(
      { slug },
      { "$set": updateData }
    );
    console.log(Updated :, result.modifiedCount);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
