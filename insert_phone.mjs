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
    
    const data = JSON.parse(fs.readFileSync('phone_data.json', 'utf8'));
    
    const brandSlug = data.brand_slug || 'samsung';
    let brandName = brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1);
    
    // Find or create brand
    let brand = await Brand.findOne({ slug: brandSlug });
    if (!brand) {
      const result = await Brand.create({
        name: brandName,
        slug: brandSlug,
        description: `${brandName} is a consumer electronics manufacturer.`,
      });
      brand = result;
      console.log(`Created brand ${brandName}`);
    }
    
    data.brand_id = brand._id;
    
    // Upsert phone
    const result = await Phone.findOneAndUpdate(
      { slug: data.slug },
      { $set: data },
      { upsert: true, new: true }
    );
    
    console.log(`Successfully inserted/updated: ${result.name}`);
    
    // Trigger automatic cache revalidation
    try {
      console.log('Triggering website cache revalidation...');
      const res = await fetch('http://localhost:3000/api/revalidate');
      const json = await res.json();
      if (json.success) {
        console.log('Cache revalidated successfully!');
      } else {
        console.log('Failed to revalidate cache:', json.error);
      }
    } catch (err) {
      console.log('Could not reach the revalidation API. If the Next.js server is not running on localhost:3000, you can ignore this or update the script with your live domain.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

run();
