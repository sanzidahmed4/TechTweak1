require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

const imageMapping = {
  "iphone-x": ["https://img.appledb.dev/device@256/iPhone10,3/Silver.png"],
  "iphone-xr": ["https://img.appledb.dev/device@256/iPhone11,8/Black.png"],
  "iphone-xs": ["https://img.appledb.dev/device@256/iPhone11,2/Space%20Gray.png"],
  "iphone-xs-max": ["https://img.appledb.dev/device@256/iPhone11,6/Gold.png"],
  "iphone-11": ["https://img.appledb.dev/device@256/iPhone12,1/White.png"],
  "iphone-11-pro": ["https://img.appledb.dev/device@256/iPhone12,3/Midnight%20Green.png"],
  "iphone-11-pro-max": ["https://img.appledb.dev/device@256/iPhone12,5/Space%20Gray.png"],
  "iphone-se-2020": ["https://img.appledb.dev/device@256/iPhone12,8/White.png"],
  "iphone-se-2022": ["https://img.appledb.dev/device@256/iPhone14,6/Midnight.png"],
  "iphone-12-mini": ["https://img.appledb.dev/device@256/iPhone13,1/Black.png"],
  "iphone-12": ["https://img.appledb.dev/device@256/iPhone13,2/Blue.png"],
  "iphone-12-pro": ["https://img.appledb.dev/device@256/iPhone13,3/Pacific%20Blue.png"],
  "iphone-12-pro-max": ["https://img.appledb.dev/device@256/iPhone13,4/Gold.png"],
  "iphone-13-mini": ["https://img.appledb.dev/device@256/iPhone14,4/Pink.png"],
  "iphone-13": ["https://img.appledb.dev/device@256/iPhone14,5/Blue.png"],
  "iphone-13-pro": ["https://img.appledb.dev/device@256/iPhone14,2/Sierra%20Blue.png"],
  "iphone-13-pro-max": ["https://img.appledb.dev/device@256/iPhone14,3/Sierra%20Blue.png"],
  "iphone-14": ["https://img.appledb.dev/device@256/iPhone14,7/Blue.png"],
  "iphone-14-plus": ["https://img.appledb.dev/device@256/iPhone14,8/Purple.png"],
  "iphone-14-pro": ["https://img.appledb.dev/device@256/iPhone15,2/Deep%20Purple.png"],
  "iphone-14-pro-max": ["https://img.appledb.dev/device@256/iPhone15,3/Deep%20Purple.png"],
  "iphone-15": ["https://img.appledb.dev/device@256/iPhone15,4/Black.png"],
  "iphone-15-plus": ["https://img.appledb.dev/device@256/iPhone15,5/Blue.png"],
  "iphone-15-pro": ["https://img.appledb.dev/device@256/iPhone16,1/Natural%20Titanium.png"],
  "iphone-15-pro-max": ["https://img.appledb.dev/device@256/iPhone16,2/Natural%20Titanium.png"],
  "iphone-16": ["https://img.appledb.dev/device@256/iPhone17,3/Black.png"],
  "iphone-16-plus": ["https://img.appledb.dev/device@256/iPhone17,4/Teal.png"],
  "iphone-16-pro": ["https://img.appledb.dev/device@256/iPhone17,1/Desert%20Titanium.png"],
  "iphone-16-pro-max": ["https://img.appledb.dev/device@256/iPhone17,2/Natural%20Titanium.png"],
  "iphone-16e": ["https://img.appledb.dev/device@256/iPhone17,5/White.png"],
  "iphone-17": ["https://img.appledb.dev/device@256/iPhone17,3/Black.png"],
  "iphone-17-pro": ["https://img.appledb.dev/device@256/iPhone17,1/Desert%20Titanium.png"],
  "iphone-17-pro-max": ["https://img.appledb.dev/device@256/iPhone17,2/Natural%20Titanium.png"],
  "iphone-17-air": ["https://img.appledb.dev/device@256/iPhone17,3/Black.png"]
};

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  let updatedCount = 0;
  for (const [slug, images] of Object.entries(imageMapping)) {
    const res = await Phone.updateOne({ slug: slug }, { $set: { images: images } });
    if (res.matchedCount > 0) {
      console.log(`Updated images for: ${slug} (Matched: ${res.matchedCount}, Modified: ${res.modifiedCount})`);
      updatedCount++;
    }
  }

  await mongoose.disconnect();
  console.log(`Finished updating. Total phones updated: ${updatedCount}`);
}

run().catch(e => console.error(e));
