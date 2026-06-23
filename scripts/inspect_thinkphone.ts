import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";
import Brand from "../src/lib/models/Brand";

async function inspectThinkPhone() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const phones = await Phone.find({ name: { $regex: /ThinkPhone/i } }).lean();

  console.log(`Found ${phones.length} ThinkPhone records.`);
  
  for (const p of phones) {
    const phone = p as any;
    console.log(`\nID: ${phone._id}`);
    console.log(`Name: ${phone.name}`);
    console.log(`Slug: ${phone.slug}`);
    console.log(`Price: $${phone.price_usd}`);
    console.log(`Release: ${phone.release_date}`);
    console.log(`Published: ${phone.is_published}`);
    console.log(`Created: ${phone.created_at}`);
    console.log(`Updated: ${phone.updated_at}`);
    
    // Check how many fields are filled
    let filledFields = 0;
    for (const key of Object.keys(phone)) {
      if (phone[key] && phone[key] !== "" && phone[key] !== "[REQUIRES REVIEW]") {
        filledFields++;
      }
    }
    console.log(`Filled fields count: ${filledFields}`);
  }

  process.exit(0);
}

inspectThinkPhone();
