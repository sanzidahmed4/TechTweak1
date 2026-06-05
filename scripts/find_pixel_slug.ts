import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";

async function findPixelSlug() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  
  const phone1 = await Phone.findOne({ slug: "pixel-9-pro" }).lean();
  console.log("pixel-9-pro:");
  console.log(phone1);

  const phone2 = await Phone.findOne({ slug: "google-pixel-9-pro" }).lean();
  console.log("\ngoogle-pixel-9-pro:");
  console.log(phone2 ? `${phone2.name} (Published: ${phone2.is_published})` : "Not found");

  const drafts = await Phone.find({ 
    $or: [
      { is_published: false },
      { is_published: null },
      { is_published: { $exists: false } }
    ]
  }).lean();
  console.log(`\nPhones missing is_published or false: ${drafts.length}`);
  for (const d of drafts) {
    const p = d as any;
    console.log(`- Name: ${p.name}, Slug: ${p.slug}, Published: ${p.is_published}`);
  }

  process.exit(0);
}

findPixelSlug();
