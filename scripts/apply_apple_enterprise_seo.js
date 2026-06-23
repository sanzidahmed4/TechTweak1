const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const BRAIN_DIR = 'C:\\Users\\Sanzid\\.gemini\\antigravity\\brain';

function findBatchFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findBatchFiles(filePath, fileList);
    } else if (file.startsWith('iphone_seo_batch_') && file.endsWith('.json')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function updateSEO() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  let totalUpdated = 0;
  
  const batchFiles = findBatchFiles(BRAIN_DIR);
  console.log(`Found ${batchFiles.length} batch files.`);

  for (const filePath of batchFiles) {
    
    if (fs.existsSync(filePath)) {
      console.log(`Processing ${path.basename(filePath)}...`);
      try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        // Clean up markdown if the LLM accidentally added it
        const cleanData = rawData.replace(/```json\n?|\n?```/g, '').trim();
        const data = JSON.parse(cleanData);

        for (const phoneData of data) {
          const { slug, seo_overview, verdict, faqs, meta_description, pros, cons, keywords } = phoneData;

          if (!slug) continue;

          // Simple SEO Score calculation
          let score = 0;
          if (seo_overview?.length > 100) score += 20;
          if (meta_description?.length > 100) score += 20;
          if (pros?.length > 0) score += 15;
          if (cons?.length > 0) score += 15;
          if (faqs?.length >= 3) score += 20;
          if (keywords?.length > 10) score += 10;

          let status = 'Red';
          if (score >= 80) status = 'Green';
          else if (score >= 50) status = 'Yellow';

          const updateFields = {
            seo_overview,
            verdict,
            faqs,
            meta_description,
            pros,
            cons,
            keywords,
            meta_keywords: keywords,
            seo_score: score,
            seo_status: status,
            last_seo_audit: new Date()
          };

          const result = await Phone.updateOne({ slug }, { $set: updateFields });
          
          if (result.modifiedCount > 0) {
            console.log(`✅ Updated SEO for ${slug}`);
            totalUpdated++;
          } else {
            console.log(`⚠️  Could not update or no changes for ${slug}`);
          }
        }
      } catch (err) {
        console.error(`Error processing ${path.basename(filePath)}:`, err.message);
      }
    } else {
      console.log(`File not found at ${filePath}`);
    }
  }

  console.log(`\n🎉 Successfully updated ${totalUpdated} Apple iPhones with Enterprise SEO!`);
  await mongoose.disconnect();
}

updateSEO().catch(console.error);
