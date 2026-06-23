import mongoose from "mongoose";
import Phone from "../src/lib/models/Phone";

async function checkBatch5() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  
  const names = [
    "Moto G Stylus 5G (2022)",
    "Moto G Play (2023)",
    "Moto G Power 5G (2023)",
    "Moto G Stylus (2023)",
    "Moto G Stylus 5G (2023)"
  ];
  
  const phones = await Phone.find({ name: { $in: names } }).lean();
  
  for (const phone of phones) {
    const p = phone as any;
    console.log(`\n--- ${p.name} ---`);
    console.log(`Model Number: ${p.model_number}`);
    console.log(`MSRP: ${p.price_usd}`);
    console.log(`Release Date: ${p.release_date}`);
    console.log(`Images: ${p.images ? p.images.length : 0} found`);
    if (p.images) {
      console.log(`Image 1: ${p.images[0]}`);
    }
  }

  process.exit(0);
}
checkBatch5();
