import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const commonSeoFieldsUpcoming = (name: string) => ({
  meta_title: `Samsung ${name} Price in Bangladesh, Leaks & Rumors`,
  meta_keywords: `samsung ${name.toLowerCase()}, ${name.toLowerCase()} release date, samsung ${name.toLowerCase()} specs, ${name.toLowerCase()} leaks`,
  meta_description: `Latest leaks, rumors, expected specifications, and launch timeline of the highly anticipated Samsung ${name}.`,
  canonical_url: `https://www.techtweak.tech/phones/samsung/${name.toLowerCase().replace(/ /g, '-')}`,
  primary_keyword: `samsung ${name.toLowerCase()} specs`,
  secondary_keywords: [`${name.toLowerCase()} release date`, `samsung ${name.toLowerCase()} leaks`, `samsung ${name.toLowerCase()} price`],
  question_keywords: [
    `when is samsung ${name.toLowerCase()} releasing?`,
    `what will the samsung ${name.toLowerCase()} look like?`,
    `how much will samsung ${name.toLowerCase()} cost?`
  ],
  faq_schema: [
    { question: `When will Samsung ${name} be announced?`, answer: `The official announcement date of Samsung ${name} is pending, but rumors suggest a late 2026 release.` },
    { question: `What is the expected price of ${name}?`, answer: `Pricing is strictly rumors right now. The official price will be updated here once announced.` }
  ]
});

const galaxyS26Edge = {
  name: "Galaxy S26 Edge",
  slug: "samsung-galaxy-s26-edge",
  is_published: true,
  is_official: false,
  upcoming: true,
  rumored: true,
  model_number: "SM-S947U",
  colors: ["Titanium Phantom Black", "Titanium Mystic Silver"],
  launch_year: "2026",
  launch_quarter: "Q1",
  expected_launch_date: "Expected Early 2026",
  
  price_usd: null,
  price_bdt: null,
  price_display_text: "Not Announced Yet",

  processor: "Snapdragon 8 Gen 5 for Galaxy (Rumored)",
  cpu: "Octa-core",
  gpu: "Adreno 840 (Expected)",
  
  display_type: "Dynamic LTPO AMOLED 3X, 144Hz",
  screen_size: "6.8 inches",
  refresh_rate: "144Hz",
  protection: "Corning Gorilla Armor 3",

  cam_count: "Quad",
  cam_main_sensor: "200 MP, OIS (Expected)",
  cam_ultrawide: "50 MP",
  cam_telephoto: "50 MP Periscope + 50 MP Telephoto",
  cam_video: "8K@30/60fps",
  
  cam_front_resolution: "12 MP",

  battery_capacity: "5000 mAh",
  charging_wired: "45W wired",
  charging_wireless: "25W wireless",

  water_resistance: "IP68 dust/water resistant",
  
  images: ["/placeholder.jpg"], // Admin Upload Placeholder
  
  android_version: "Android 16",
  ui_version: "One UI 8",
  
  has_5g: true,
  has_nfc: true,
  sensor_fingerprint: "Under display (Ultrasonic)",
  
  ...commonSeoFieldsUpcoming("Galaxy S26 Edge"),
  overview: "Rumors suggest Samsung might revive the 'Edge' moniker for the Galaxy S26 series, bringing an ultra-premium curved design alongside top-tier Snapdragon processing.",
  highlights: ["Curved Edge display revival", "Snapdragon 8 Gen 5", "Upgraded Quad 50MP+ camera system", "Gorilla Armor 3"],
  pros: ["Unmatched premium design", "Top-tier performance expected", "Versatile camera setup"],
  cons: ["Extremely high expected price", "Curved screens can be fragile"],
  verdict: "If true, the Galaxy S26 Edge will be the ultimate premium smartphone for those nostalgic for the classic Samsung Edge aesthetic but wanting modern power."
};

const galaxyZFold7 = {
  name: "Galaxy Z Fold 7",
  slug: "samsung-galaxy-z-fold-7",
  is_published: true,
  is_official: false,
  upcoming: true,
  rumored: true,
  model_number: "SM-F966U",
  colors: ["Phantom Black", "Icy Blue"],
  launch_year: "2026",
  launch_quarter: "Q3",
  expected_launch_date: "Expected August 2026",
  
  price_usd: null,
  price_bdt: null,
  price_display_text: "Not Announced Yet",

  processor: "Snapdragon 8 Gen 5 (Rumored)",
  display_type: "Foldable Dynamic LTPO AMOLED 2X, 120Hz",
  screen_size: "7.6 inches (Inner), 6.3 inches (Cover)",
  refresh_rate: "120Hz",

  cam_count: "Triple",
  cam_main_sensor: "200 MP, OIS",
  
  battery_capacity: "4600 mAh",
  charging_wired: "25W wired",

  images: ["/placeholder.jpg"],
  
  has_5g: true,
  has_nfc: true,
  
  ...commonSeoFieldsUpcoming("Galaxy Z Fold 7"),
  overview: "The upcoming Samsung Galaxy Z Fold 7 is expected to refine the foldable experience with a much thinner hinge, a wider cover screen, and potentially bringing the S-Ultra 200MP camera sensor to the foldable line.",
  highlights: ["Thinner hinge design", "Wider cover screen", "Expected Snapdragon 8 Gen 5", "Improved Under-Display Camera"],
  pros: ["Thinner and lighter form factor", "Better aspect ratio for the cover screen", "Massive productivity boost"],
  cons: ["Expected to be very expensive", "Crease might still be visible"],
  verdict: "The Galaxy Z Fold 7 promises to be the most polished foldable yet, fixing the minor design gripes of its predecessors."
};

const galaxyZFlip7 = {
  name: "Galaxy Z Flip 7",
  slug: "samsung-galaxy-z-flip-7",
  is_published: true,
  is_official: false,
  upcoming: true,
  rumored: true,
  model_number: "SM-F756U",
  colors: ["Mint", "Graphite", "Lavender"],
  launch_year: "2026",
  launch_quarter: "Q3",
  expected_launch_date: "Expected August 2026",
  
  price_usd: null,
  price_bdt: null,
  price_display_text: "Not Announced Yet",

  processor: "Snapdragon 8 Gen 5 (Rumored)",
  display_type: "Foldable Dynamic LTPO AMOLED 2X, 120Hz",
  screen_size: "6.7 inches (Inner), 3.4 inches (Cover)",
  refresh_rate: "120Hz",

  cam_count: "Dual",
  cam_main_sensor: "50 MP, OIS",
  
  battery_capacity: "4000 mAh",
  charging_wired: "25W wired",

  images: ["/placeholder.jpg"],
  
  has_5g: true,
  has_nfc: true,
  
  ...commonSeoFieldsUpcoming("Galaxy Z Flip 7"),
  overview: "Samsung's stylish clamshell foldable, the Galaxy Z Flip 7, is rumored to pack larger battery capacity, an even bigger cover screen, and flagship-level cameras.",
  highlights: ["Expected 3.9-inch Cover Screen", "50MP Dual Camera", "Improved battery life"],
  pros: ["Incredibly compact and stylish", "Usable cover screen for full apps", "Top-tier processor"],
  cons: ["Battery life might still lag behind regular slabs", "Cameras typically aren't 'Ultra' level"],
  verdict: "The ultimate lifestyle phone, the Z Flip 7 will likely be the most popular foldable in the world upon its release."
};

async function run() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const BrandSchema = new mongoose.Schema({}, { strict: false });
    const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
    
    const samsungBrand = await Brand.findOne({ name: /Samsung/i });
    let brandId = null;
    if (!samsungBrand) {
      console.log("⚠️ Samsung brand not found in DB! Proceeding without brand_id.");
    } else {
      brandId = samsungBrand._id;
    }

    const PhoneSchema = new mongoose.Schema({}, { strict: false });
    const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);

    const phones = [galaxyS26Edge, galaxyZFold7, galaxyZFlip7];

    for (const phone of phones) {
      if (brandId) {
        (phone as any).brand_id = brandId;
      }
      phone.updated_at = new Date() as any;
      
      await Phone.findOneAndUpdate({ slug: phone.slug }, { $set: phone }, { upsert: true, new: true });
      console.log(`✅ Inserted/Updated: ${phone.name}`);
    }

    console.log("🎉 Batch 1 (Upcoming Flagships) phones updated successfully!");

  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

run();
