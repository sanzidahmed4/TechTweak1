import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";

async function checkMissingOg() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const phones = await Phone.find({ 
    $or: [
      { og_image: { $exists: false } },
      { og_image: null },
      { og_image: "" }
    ]
  }).lean();

  console.log(`Phones missing og_image: ${phones.length}`);
  for (const p of phones) {
    const phone = p as any;
    console.log(`- ${phone.name} (Images array length: ${phone.images?.length || 0})`);
    if (phone.images && phone.images.length > 0) {
      console.log(`  First image: ${phone.images[0]}`);
    }
  }
  process.exit(0);
}

checkMissingOg();
