import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import mongoose from "mongoose";
import connectToDatabase from "../src/lib/mongodb/mongoose";
import Phone from "../src/lib/models/Phone";
import Brand from "../src/lib/models/Brand";

import fs from 'fs';
import path from 'path';

async function insertPhone() {
  try {
    await connectToDatabase();
    
    const payloadPath = path.join(process.cwd(), 'scripts', 'current_phone.json');
    if (!fs.existsSync(payloadPath)) {
      console.error("current_phone.json not found");
      process.exit(1);
    }
    
    const payloadStr = fs.readFileSync(payloadPath, 'utf-8');
    const data = JSON.parse(payloadStr);

    // Get Brand ID for Motorola
    let brand = await Brand.findOne({ slug: "motorola" });
    if (!brand) {
      brand = await Brand.create({ name: "Motorola", slug: "motorola" });
      console.log("Created Motorola brand");
    }

    data.brand_id = brand._id;

    // Check if phone already exists
    const existing = await Phone.findOne({ slug: data.slug });
    if (existing) {
      console.log(`Phone ${data.slug} already exists. Updating...`);
      await Phone.updateOne({ slug: data.slug }, data);
      console.log("Update successful");
    } else {
      await Phone.create(data);
      console.log(`Successfully inserted: ${data.name}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Insertion failed:", error);
    process.exit(1);
  }
}

insertPhone();
