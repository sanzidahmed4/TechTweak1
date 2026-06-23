require('dotenv').config({ path: '.env.local' });
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  logo_url: { type: String },
  order: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);

async function testBulkWrite() {
  try {
    await mongoose.connect(uri);
    const brands = await Brand.find().limit(2);
    if(brands.length < 2) return console.log("Not enough brands");

    const ids = [brands[0]._id.toString(), brands[1]._id.toString()];
    
    const bulkOps = ids.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index } }
      }
    }));

    const result = await Brand.bulkWrite(bulkOps);
    console.log("BulkWrite Result:", result);
  } catch (err) {
    console.error("BulkWrite Error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

testBulkWrite();
