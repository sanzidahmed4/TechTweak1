const { MongoClient } = require('mongodb');
const uri = "mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak";

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
