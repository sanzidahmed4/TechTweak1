import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import fs from 'fs';

const MONGODB_URI = process.env.MONGODB_URI;

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema, 'phones');
const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({}, { strict: false }), 'brands');

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB");
    
    // Check if Realme brand exists, if not, wait I used the ID from prompt: "6a075ca13ffb4fd85e744f2e"
    // Just to be sure, maybe find realme brand
    let brand = await Brand.findById("6a075ca13ffb4fd85e744f2e");
    if (!brand) {
      console.log("Brand not found by ID. Trying by slug 'realme'");
      brand = await Brand.findOne({ slug: 'realme' });
      if (!brand) {
         console.log("Creating Realme brand...");
         brand = await Brand.create({
            _id: new mongoose.Types.ObjectId("6a075ca13ffb4fd85e744f2e"),
            name: "Realme",
            slug: "realme",
            description: "Realme is a Chinese consumer electronics manufacturer."
         });
      } else {
         console.log("Found realme brand with different ID:", brand._id);
      }
    } else {
      console.log("Found Realme brand by ID");
    }

    const files = ['realme_data_1.json', 'realme_data_2.json'];
    let totalInserted = 0;
    
    for (const file of files) {
      console.log(`Processing ${file}...`);
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      
      for (let phone of data) {
        phone.brand_id = brand._id;
        
        // Upsert phone
        const result = await Phone.findOneAndUpdate(
          { slug: phone.slug },
          { $set: phone },
          { upsert: true, new: true }
        );
        
        console.log(`Successfully inserted/updated: ${result.name}`);
        totalInserted++;
      }
    }
    
    console.log(`\nFinished! Total phones inserted/updated: ${totalInserted}`);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

run();
