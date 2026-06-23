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
    } else if (file.startsWith('price_batch_') && file.endsWith('.json')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function updatePrices() {
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
        const cleanData = rawData.replace(/```json\n?|\n?```/g, '').trim();
        const data = JSON.parse(cleanData);

        for (const phoneData of data) {
          const { name, price_usd } = phoneData;
          if (!name || !price_usd) continue;

          const priceNum = parseInt(price_usd, 10);
          if (isNaN(priceNum)) continue;

          const price_display_text = `$${priceNum}`;

          const result = await Phone.updateOne(
            { name },
            { $set: { price_usd: priceNum, price_display_text, price: priceNum } }
          );
          
          if (result.modifiedCount > 0) {
            console.log(`✅ Updated Price for ${name} to ${price_display_text}`);
            totalUpdated++;
          } else {
            console.log(`⚠️  Could not update or no changes for ${name}`);
          }
        }
      } catch (err) {
        console.error(`Error processing ${path.basename(filePath)}:`, err.message);
      }
    }
  }

  console.log(`\n🎉 Successfully injected real prices for ${totalUpdated} phones!`);
  await mongoose.disconnect();
}

updatePrices().catch(console.error);
