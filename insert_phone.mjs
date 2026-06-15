import mongoose from 'mongoose';
import fs from 'fs';

const MONGODB_URI = "mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak";

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB");
    
    const data = JSON.parse(fs.readFileSync('phone_data.json', 'utf8'));
    
    // Find or create brand
    let brand = await Brand.findOne({ slug: 'iqoo' });
    if (!brand) {
      const result = await Brand.create({
        name: 'iQOO',
        slug: 'iqoo',
        description: 'iQOO is a Chinese consumer electronics manufacturer.',
      });
      brand = result;
      console.log("Created brand iQOO");
    }
    
    data.brand_id = brand._id;
    
    // Upsert phone
    const result = await Phone.findOneAndUpdate(
      { slug: data.slug },
      { $set: data },
      { upsert: true, new: true }
    );
    
    console.log(`Successfully inserted/updated: ${result.name}`);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

run();
