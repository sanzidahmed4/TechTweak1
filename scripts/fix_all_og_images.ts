import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";

async function fixAllOgImages() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const phones = await Phone.find({
    $or: [
      { og_image: { $exists: false } },
      { og_image: null },
      { og_image: "" }
    ]
  }).lean();

  let updatedCount = 0;

  for (const p of phones) {
    const phone = p as any;
    if (phone.images && phone.images.length > 0) {
      const officialImage = phone.images[0];
      await Phone.updateOne({ _id: phone._id }, { $set: { og_image: officialImage } });
      console.log(`Updated og_image for ${phone.name} -> ${officialImage}`);
      updatedCount++;
    } else {
      console.log(`WARNING: ${phone.name} is missing images entirely. Cannot set og_image.`);
    }
  }

  console.log(`Successfully updated og_image for ${updatedCount} phones across all brands.`);
  process.exit(0);
}

fixAllOgImages();
