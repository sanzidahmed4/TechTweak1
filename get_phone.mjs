import { MongoClient } from 'mongodb';

const uri = "mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak";
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
