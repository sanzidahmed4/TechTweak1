import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import mongoose from "mongoose";
import connectToDatabase from "../src/lib/mongodb/mongoose";
import Phone from "../src/lib/models/Phone";
import Brand from "../src/lib/models/Brand";

async function auditDatabase() {
  try {
    await connectToDatabase();
    console.log("Running Database Audit...");
    
    const brand = await Brand.findOne({ slug: "motorola" });
    if (!brand) {
      console.error("Motorola brand not found!");
      process.exit(1);
    }

    const phones = await Phone.find({ brand_id: brand._id }).sort({ created_at: -1 }).limit(5);
    
    let issuesFound = 0;
    const slugs = new Set();
    
    // Also fetch all slugs to check for duplicates globally
    const allPhones = await Phone.find({}, 'slug');
    const allSlugs = allPhones.map(p => p.slug);
    const duplicateSlugs = allSlugs.filter((s, i) => allSlugs.indexOf(s) !== i);
    
    if (duplicateSlugs.length > 0) {
      console.error(`[FAIL] Duplicate slugs found: ${duplicateSlugs.join(', ')}`);
      issuesFound++;
    }

    for (const phone of phones) {
      console.log(`Auditing: ${phone.name}`);
      
      // Check crucial fields
      const requiredFields = ['name', 'slug', 'brand_id', 'price_usd', 'release_date', 'chipset_highlight', 'meta_title'];
      for (const field of requiredFields) {
        if (!phone[field]) {
          console.error(`[FAIL] ${phone.name} is missing field: ${field}`);
          issuesFound++;
        }
      }
      
      // Check images
      if (!phone.images || phone.images.length === 0) {
        console.error(`[FAIL] ${phone.name} has no images`);
        issuesFound++;
      } else {
        for (const img of phone.images) {
          if (!img.startsWith('http')) {
            console.error(`[FAIL] ${phone.name} has invalid image URL: ${img}`);
            issuesFound++;
          }
        }
      }
      
      // Verify schema matches constraints (e.g. valid types)
      // Mongoose already validates types, but we can check string lengths
      if (phone.meta_title && phone.meta_title.length < 10) {
        console.error(`[WARN] ${phone.name} has unusually short meta title`);
      }
    }

    if (issuesFound > 0) {
      console.error(`Audit Failed with ${issuesFound} issues.`);
      process.exit(1);
    } else {
      console.log(`Audit Passed for the last 5 phones.`);
      process.exit(0);
    }

  } catch (error) {
    console.error("Audit script crashed:", error);
    process.exit(1);
  }
}

auditDatabase();
