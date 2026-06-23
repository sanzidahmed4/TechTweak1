import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";

async function inspectDrafts() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  
  const drafts = await Phone.find({ is_published: false }).lean();
  console.log(`Found ${drafts.length} total drafts.`);
  
  for (const d of drafts) {
    const phone = d as any;
    console.log(`- ${phone.name} (Slug: ${phone.slug})`);
  }

  // Also search for duplicates of "Google Pixel 9 Pro" exactly
  const exactMatches = await Phone.find({ name: "Google Pixel 9 Pro" }).lean();
  console.log(`\nExact matches for "Google Pixel 9 Pro": ${exactMatches.length}`);
  for (const m of exactMatches) {
    const p = m as any;
    console.log(`- ID: ${p._id}, Slug: ${p.slug}, Published: ${p.is_published}`);
  }

  process.exit(0);
}

inspectDrafts();
