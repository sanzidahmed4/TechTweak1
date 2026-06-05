import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";
import Brand from "../src/lib/models/Brand";

async function fixOgImages() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const brand = await Brand.findOne({ slug: "motorola" });
  const phones = await Phone.find({ brand_id: brand._id }).lean();

  let updatedCount = 0;

  for (const p of phones) {
    const phone = p as any;
    if (!phone.og_image || phone.og_image.trim() === "") {
      if (phone.images && phone.images.length > 0) {
        // Validation for optimal social sharing dimensions (placeholder log, assuming Cloudinary handles resizing or standard 1.91:1)
        const officialImage = phone.images[0];
        await Phone.updateOne({ _id: phone._id }, { $set: { og_image: officialImage } });
        console.log(`Updated og_image for ${phone.name} -> ${officialImage}`);
        updatedCount++;
      } else {
        console.log(`WARNING: ${phone.name} is missing images entirely. Cannot set og_image.`);
      }
    }
  }

  console.log(`Successfully updated og_image for ${updatedCount} Motorola phones.`);
  process.exit(0);
}

fixOgImages();
