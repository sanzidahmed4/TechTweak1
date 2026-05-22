const mongoose = require("mongoose");
const slugify = require("slugify");

const uri = "mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak";

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  logo_url: { type: String },
  created_at: { type: Date, default: Date.now },
});

const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);

const bdBrands = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "Realme",
  "Vivo",
  "Oppo",
  "OnePlus",
  "Infinix",
  "Tecno",
  "Motorola",
  "Symphony",
  "Walton",
  "Itel",
  "Nokia",
  "Honor",
  "Google",
  "Asus",
  "Sony",
  "Poco",
  "iQOO",
  "Nothing"
];

async function seedBrands() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");

    let addedCount = 0;
    for (const name of bdBrands) {
      const slug = slugify(name, { lower: true, strict: true });
      const existing = await Brand.findOne({ slug });
      
      if (!existing) {
        await Brand.create({ name, slug });
        console.log(`Added brand: ${name}`);
        addedCount++;
      } else {
        console.log(`Skipped existing: ${name}`);
      }
    }

    console.log(`Successfully added ${addedCount} new brands.`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

seedBrands();
