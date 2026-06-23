const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function runUpdate() {
  const myLogPath = `C:/Users/Sanzid/.gemini/antigravity/brain/15e501a4-b845-4945-83ef-020217fa5931/.system_generated/logs/transcript_full.jsonl`;
  const lines = fs.readFileSync(myLogPath, 'utf8').trim().split('\n');
  
  let allDates = [];
  
  for (const line of lines) {
    try {
      const step = JSON.parse(line);
      // Look for SYSTEM messages injected from subagents
      if (step.source === 'SYSTEM' && step.content && step.content.includes('priority=MESSAGE_PRIORITY_HIGH')) {
        // Extract the content array
        // The message is usually: [Message] timestamp=... sender=... priority=... content=[{...}]
        const contentMatch = step.content.match(/content=(\[.*\])/s);
        if (contentMatch) {
          try {
            const arr = JSON.parse(contentMatch[1]);
            if (Array.isArray(arr)) {
              allDates.push(...arr);
              console.log(`Extracted array of length ${arr.length}`);
            }
          } catch(e) {
            console.log("Failed to parse array:", e.message);
          }
        }
      }
    } catch(e) {}
  }
  
  console.log(`Total dates extracted: ${allDates.length}`);
  
  fs.writeFileSync('all_dates_extracted.json', JSON.stringify(allDates, null, 2));
  
  // Now update MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
    let updatedCount = 0;
    
    for (const item of allDates) {
      if (!item.name || !item.release_date || item.release_date.toLowerCase() === 'cancelled' || item.release_date.toLowerCase() === 'unreleased') continue;
      
      const p = await Phone.findOne({ name: item.name, phone_status: 'released' });
      if (p) {
        let parsedDate = null;
        const dateStr = String(item.release_date).trim();
        const timestamp = Date.parse(dateStr);
        
        if (!isNaN(timestamp)) {
          parsedDate = new Date(timestamp);
        } else {
          const yearMatch = dateStr.match(/\d{4}/);
          if (yearMatch) {
            parsedDate = new Date(`${yearMatch[0]}-01-01`);
          }
        }
        
        if (parsedDate) {
          p.set('release_date', item.release_date); // Store the beautiful string
          p.set('release_date_parsed', parsedDate); // Store the Date object for sorting
          await p.save();
          updatedCount++;
        }
      }
    }
    console.log(`Successfully updated ${updatedCount} phones in the database.`);
  } catch (dbErr) {
    console.error("DB Update Error:", dbErr);
  } finally {
    mongoose.disconnect();
  }
}

runUpdate();
