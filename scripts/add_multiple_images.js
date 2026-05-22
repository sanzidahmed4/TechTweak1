require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI"); process.exit(1); }

const PhoneSchema = new mongoose.Schema({}, { strict: false });

const iphoneData = {
  "iphone-x": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-x.jpg",
    dbCode: "iPhone10,3",
    colors: ["Silver", "Space Gray"]
  },
  "iphone-xr": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xr.jpg",
    dbCode: "iPhone11,8",
    colors: ["Black", "Blue", "Coral", "White", "Yellow"]
  },
  "iphone-xs": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xs.jpg",
    dbCode: "iPhone11,2",
    colors: ["Space Gray", "Silver", "Gold"]
  },
  "iphone-xs-max": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xs-max.jpg",
    dbCode: "iPhone11,6",
    colors: ["Space Gray", "Silver", "Gold"]
  },
  "iphone-11": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg",
    dbCode: "iPhone12,1",
    colors: ["Black", "Green", "Purple", "White", "Yellow"]
  },
  "iphone-11-pro": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro.jpg",
    dbCode: "iPhone12,3",
    colors: ["Midnight Green", "Space Gray", "Silver", "Gold"]
  },
  "iphone-11-pro-max": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro-max.jpg",
    dbCode: "iPhone12,5",
    colors: ["Midnight Green", "Space Gray", "Silver", "Gold"]
  },
  "iphone-se-2020": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-se-2020.jpg",
    dbCode: "iPhone12,8",
    colors: ["Black", "White", "Red"]
  },
  "iphone-se-2022": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-se-2022.jpg",
    dbCode: "iPhone14,6",
    colors: ["Midnight", "Starlight", "Red"]
  },
  "iphone-12-mini": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-mini.jpg",
    dbCode: "iPhone13,1",
    colors: ["Black", "Blue", "Green", "Purple", "White"]
  },
  "iphone-12": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg",
    dbCode: "iPhone13,2",
    colors: ["Black", "Blue", "Green", "Purple", "White"]
  },
  "iphone-12-pro": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro.jpg",
    dbCode: "iPhone13,3",
    colors: ["Pacific Blue", "Graphite", "Gold", "Silver"]
  },
  "iphone-12-pro-max": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro-max.jpg",
    dbCode: "iPhone13,4",
    colors: ["Pacific Blue", "Graphite", "Gold", "Silver"]
  },
  "iphone-13-mini": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg",
    dbCode: "iPhone14,4",
    colors: ["Midnight", "Blue", "Pink", "Starlight", "Green"]
  },
  "iphone-13": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg",
    dbCode: "iPhone14,5",
    colors: ["Midnight", "Blue", "Pink", "Starlight", "Green"]
  },
  "iphone-13-pro": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro.jpg",
    dbCode: "iPhone14,2",
    colors: ["Sierra Blue", "Graphite", "Gold", "Silver"]
  },
  "iphone-13-pro-max": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg",
    dbCode: "iPhone14,3",
    colors: ["Sierra Blue", "Graphite", "Gold", "Silver"]
  },
  "iphone-14": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14.jpg",
    dbCode: "iPhone14,7",
    colors: ["Blue", "Purple", "Midnight", "Starlight", "Yellow"]
  },
  "iphone-14-plus": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-plus.jpg",
    dbCode: "iPhone14,8",
    colors: ["Blue", "Purple", "Midnight", "Starlight", "Yellow"]
  },
  "iphone-14-pro": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro.jpg",
    dbCode: "iPhone15,2",
    colors: ["Deep Purple", "Space Black", "Gold", "Silver"]
  },
  "iphone-14-pro-max": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg",
    dbCode: "iPhone15,3",
    colors: ["Deep Purple", "Space Black", "Gold", "Silver"]
  },
  "iphone-15": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg",
    dbCode: "iPhone15,4",
    colors: ["Black", "Blue", "Green", "Yellow", "Pink"]
  },
  "iphone-15-plus": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-plus-.jpg",
    dbCode: "iPhone15,5",
    colors: ["Black", "Blue", "Green", "Yellow", "Pink"]
  },
  "iphone-15-pro": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg",
    dbCode: "iPhone16,1",
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"]
  },
  "iphone-15-pro-max": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg",
    dbCode: "iPhone16,2",
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"]
  },
  "iphone-16": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg",
    dbCode: "iPhone17,3",
    colors: ["Black", "White", "Pink", "Teal", "Ultramarine"]
  },
  "iphone-16-plus": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-plus.jpg",
    dbCode: "iPhone17,4",
    colors: ["Black", "White", "Pink", "Teal", "Ultramarine"]
  },
  "iphone-16-pro": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro.jpg",
    dbCode: "iPhone17,1",
    colors: ["Desert Titanium", "Natural Titanium", "White Titanium", "Black Titanium"]
  },
  "iphone-16-pro-max": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg",
    dbCode: "iPhone17,2",
    colors: ["Desert Titanium", "Natural Titanium", "White Titanium", "Black Titanium"]
  },
  "iphone-16e": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg",
    dbCode: "iPhone17,5",
    colors: ["White", "Black", "Teal"]
  },
  "iphone-17": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg",
    dbCode: "iPhone17,3",
    colors: ["Black", "White", "Pink", "Teal"]
  },
  "iphone-17-pro": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro.jpg",
    dbCode: "iPhone17,1",
    colors: ["Desert Titanium", "Natural Titanium", "White Titanium"]
  },
  "iphone-17-pro-max": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg",
    dbCode: "iPhone17,2",
    colors: ["Desert Titanium", "Natural Titanium", "White Titanium"]
  },
  "iphone-17-air": {
    gsm: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg",
    dbCode: "iPhone17,5",
    colors: ["White", "Black", "Teal"]
  }
};

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

  let updatedCount = 0;
  for (const [slug, data] of Object.entries(iphoneData)) {
    const images = [data.gsm];
    
    // Add up to 3 color-specific mockups from AppleDB (using @256 as @512 is not supported on AppleDB CDN)
    for (const color of data.colors.slice(0, 3)) {
      const encodedColor = encodeURIComponent(color);
      images.push(`https://img.appledb.dev/device@256/${data.dbCode}/${encodedColor}.png`);
    }

    const res = await Phone.updateOne({ slug: slug }, { $set: { images: images } });
    if (res.matchedCount > 0) {
      console.log(`Updated images for ${slug} with ${images.length} images`);
      updatedCount++;
    }
  }

  await mongoose.disconnect();
  console.log(`Finished updating. Total phones updated with multiple images: ${updatedCount}`);
}

run().catch(e => console.error(e));
