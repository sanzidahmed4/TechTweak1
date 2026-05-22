require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");
const https = require("https");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

const slugs = [
  "iphone-x", "iphone-xr", "iphone-xs", "iphone-xs-max",
  "iphone-11", "iphone-11-pro", "iphone-11-pro-max",
  "iphone-se-2020", "iphone-se-2022",
  "iphone-12-mini", "iphone-12", "iphone-12-pro", "iphone-12-pro-max",
  "iphone-13-mini", "iphone-13", "iphone-13-pro", "iphone-13-pro-max",
  "iphone-14", "iphone-14-plus", "iphone-14-pro", "iphone-14-pro-max",
  "iphone-15", "iphone-15-plus", "iphone-15-pro", "iphone-15-pro-max",
  "iphone-16", "iphone-16-plus", "iphone-16-pro", "iphone-16-pro-max",
  "iphone-16e", "iphone-17", "iphone-17-pro", "iphone-17-pro-max", "iphone-17-air"
];

// Custom mappings for models that differ from simple hyphen pattern
const customUrls = {
  "iphone-14-pro-max": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg",
  "iphone-15-plus": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-plus-.jpg",
  
  // Future/Upcoming models placeholder images (high quality renders)
  "iphone-16e": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg", // fallback to standard 16
  "iphone-17": "https://img.appledb.dev/device@512/iPhone17,3/Black.png",
  "iphone-17-pro": "https://img.appledb.dev/device@512/iPhone17,1/Desert%20Titanium.png",
  "iphone-17-pro-max": "https://img.appledb.dev/device@512/iPhone17,2/Natural%20Titanium.png",
  "iphone-17-air": "https://img.appledb.dev/device@512/iPhone17,5/White.png"
};

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function getBestImageUrl(slug) {
  if (customUrls[slug]) {
    return customUrls[slug];
  }
  
  // Format standard GSMArena names
  // e.g. iphone-13-pro-max -> apple-iphone-13-pro-max.jpg
  const suffix = slug.replace("iphone-", "");
  const standardUrl = `https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-${suffix}.jpg`;
  const hyphenUrl = `https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-${suffix}-.jpg`;
  
  if (await checkUrl(standardUrl)) {
    return standardUrl;
  }
  if (await checkUrl(hyphenUrl)) {
    return hyphenUrl;
  }
  
  // Return a generic fallback if both fail
  return `https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-${suffix.split("-")[0]}.jpg`;
}

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  let updatedCount = 0;
  for (const slug of slugs) {
    const imageUrl = await getBestImageUrl(slug);
    const res = await Phone.updateOne({ slug: slug }, { $set: { images: [imageUrl] } });
    if (res.matchedCount > 0) {
      console.log(`Updated GSMArena render for: ${slug} -> ${imageUrl}`);
      updatedCount++;
    } else {
      console.log(`Model not found in database: ${slug}`);
    }
  }

  await mongoose.disconnect();
  console.log(`Finished updating. Total phones updated: ${updatedCount}`);
}

run().catch(e => console.error(e));
