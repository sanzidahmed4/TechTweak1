import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";

async function inspectAllPixels() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  
  const matches = await Phone.find({ name: { $regex: /Pixel 9/i } }).lean();
  console.log(`Matches for "Pixel 9": ${matches.length}`);
  for (const m of matches) {
    const p = m as any;
    console.log(`- ID: ${p._id}, Name: "${p.name}", Slug: ${p.slug}, Published: ${p.is_published}`);
  }
  process.exit(0);
}

inspectAllPixels();
