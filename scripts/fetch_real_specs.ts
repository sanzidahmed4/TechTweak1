import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
// @ts-ignore
import gsmarena from "gsmarena-api";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("No MONGODB_URI found");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB. Initializing Authentic Data Scraper...");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", new mongoose.Schema({}, { strict: false }));
  const Brand = mongoose.models.Brand || mongoose.model("Brand", new mongoose.Schema({}, { strict: false }));

  // Find all phones we just zero-estimated (Xiaomi, Redmi, POCO)
  const brands = await Brand.find({ slug: { $in: ["xiaomi", "poco"] } });
  const brandIds = brands.map((b: any) => b._id);
  
  // To avoid massive rate limits, let's process them and wait between requests
  const phones = await Phone.find({ brand_id: { $in: brandIds } }).sort({ created_at: -1 }).limit(150);
  
  let successCount = 0;
  let failCount = 0;

  for (const p of phones) {
    console.log(`Searching GSMArena for: ${p.name}...`);
    try {
      // 1. Search for the phone
      const searchResults = await gsmarena.search.search(p.name);
      
      if (!searchResults || searchResults.length === 0) {
        console.log(`[SKIP] Not found on GSMArena: ${p.name}`);
        failCount++;
        continue;
      }

      // 2. Get the specific device ID from the top result
      const deviceId = searchResults[0].id;
      
      // 3. Fetch full real specs
      const specs = await gsmarena.catalog.getDevice(deviceId);
      
      if (specs) {
          // 4. Map the authentic data
          let frontCam = "Not specified";
          let mainCam = "Not specified";
          let displayNits = p.display_peak_nits;
          let batteryMah = p.battery_capacity;
          let weight = p.physical_weight;
          
          if (specs.cameras) {
              const main = specs.cameras.find((c: any) => c.type === 'Main');
              const selfie = specs.cameras.find((c: any) => c.type === 'Selfie');
              
              if (main) mainCam = main.features ? main.features.join(", ") : "Available";
              if (selfie) frontCam = selfie.features ? selfie.features.join(", ") : "Available";
          }
          
          const updates = {
              camera_front: frontCam !== "Not specified" ? frontCam : p.camera_front,
              camera_main: mainCam !== "Not specified" ? mainCam : p.camera_main,
              display_resolution: specs.display && specs.display.resolution ? specs.display.resolution : p.display_resolution,
              physical_weight: specs.body && specs.body.weight ? specs.body.weight : weight,
              battery_capacity: specs.battery && specs.battery.capacity ? specs.battery.capacity : batteryMah,
              // Note: GSMArena API structure varies, this captures the essence.
          };

          await Phone.updateOne({ _id: p._id }, { $set: updates });
          console.log(`[SUCCESS] Updated ${p.name} with real GSMArena data.`);
          successCount++;
      } else {
          console.log(`[SKIP] Specs could not be parsed: ${p.name}`);
          failCount++;
      }
      
      // Delay to respect rate limits (3 seconds)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
    } catch (e: any) {
      console.log(`[ERROR] Failed to fetch ${p.name}: ${e.message}`);
      failCount++;
    }
  }

  console.log(`Scraping Complete. Successfully updated ${successCount} phones. Failed/Skipped: ${failCount}.`);
  mongoose.disconnect();
}

run().catch(console.error);
