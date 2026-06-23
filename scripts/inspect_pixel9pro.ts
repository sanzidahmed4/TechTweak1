import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";

async function inspectPixel9Pro() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  // Match specifically Pixel 9 Pro, avoiding Pixel 9 Pro Fold or XL if possible, or just fetch all Pixel 9 Pro* and filter in TS.
  const phones = await Phone.find({ name: { $regex: /Pixel 9 Pro/i } }).lean();

  console.log(`Found ${phones.length} Pixel 9 Pro records.`);
  
  for (const p of phones) {
    const phone = p as any;
    console.log(`\nID: ${phone._id}`);
    console.log(`Name: ${phone.name}`);
    console.log(`Slug: ${phone.slug}`);
    console.log(`Published: ${phone.is_published}`);
    
    // Count filled fields
    let filledFields = 0;
    for (const key of Object.keys(phone)) {
      if (phone[key] && phone[key] !== "" && phone[key] !== "[REQUIRES REVIEW]") {
        filledFields++;
      }
    }
    console.log(`Filled fields: ${filledFields}`);
  }

  process.exit(0);
}

inspectPixel9Pro();
