const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

async function main() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('techtweak');
    const slugs = [
      'google-pixel-10-pro',
      'google-pixel-10-pro-xl',
      'google-pixel-10-pro-fold',
      'motorola-edge-2025',
      'samsung-galaxy-s25-edge'
    ];
    
    const results = {};
    for (const slug of slugs) {
      const phone = await db.collection('phones').findOne({ slug });
      if (phone) {
        results[slug] = phone;
      }
    }
    
    fs.writeFileSync('all_phones_specs.json', JSON.stringify(results, null, 2));
    console.log('Successfully wrote to all_phones_specs.json');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
