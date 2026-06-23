import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";

async function fixThinkPhone() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  
  const p1 = await Phone.findById("6a1f48c30ad1ea0763054a77").lean(); // canonical motorola-thinkphone
  const p2 = await Phone.findById("6a21fab709443596f5a41d9f").lean(); // duplicate thinkphone-by-motorola
  
  if (!p1 || !p2) {
    console.log("Records not found or already deleted.");
    process.exit(1);
  }
  
  const updatePayload: any = {};
  for (const key of Object.keys(p2)) {
    if (key === "_id" || key === "slug" || key === "created_at" || key === "updated_at") continue;
    
    const p1Val = (p1 as any)[key];
    const p2Val = (p2 as any)[key];
    
    const isEmpty = (v: any) => v === null || v === undefined || v === "" || (typeof v === "string" && v.includes("[REQUIRES REVIEW]")) || (Array.isArray(v) && v.length === 0);
    
    if (isEmpty(p1Val) && !isEmpty(p2Val)) {
      updatePayload[key] = p2Val;
    }
  }
  
  if (Object.keys(updatePayload).length > 0) {
    console.log("Merging fields into canonical:", Object.keys(updatePayload));
    await Phone.updateOne({ _id: p1._id }, { $set: updatePayload });
  } else {
    console.log("No data needed merging to canonical.");
  }
  
  await Phone.deleteOne({ _id: p2._id });
  console.log(`Deleted duplicate phone with slug: ${p2.slug}`);
  
  process.exit(0);
}

fixThinkPhone();
