const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function runAll() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const content = fs.readFileSync('update_all.sh', 'utf-8');
  const lines = content.split('\n');
  
  let successCount = 0;
  let failCount = 0;

  for (const line of lines) {
    if (!line.trim() || !line.startsWith('node agent_db_update.js')) continue;
    
    // match: node agent_db_update.js "Phone Name" '{json}'
    const match = line.match(/node agent_db_update\.js\s+"([^"]+)"\s+'(\{.*?\})'/);
    if (match) {
      const name = match[1];
      const jsonStr = match[2];
      try {
        const specs = JSON.parse(jsonStr);
        const phone = await Phone.findOne({ name: new RegExp('^' + name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$', 'i') });
        if (phone) {
          for (const [k, v] of Object.entries(specs)) {
            if (v && v.trim() !== '') {
              phone.set(k, v.trim());
            }
          }
          await phone.save();
          successCount++;
        } else {
          console.log('ERROR: Phone not found: ' + name);
          failCount++;
        }
      } catch (err) {
        console.error('ERROR parsing or saving ' + name + ':', err.message);
        failCount++;
      }
    } else {
      console.log('WARNING: Could not parse line:', line);
    }
  }
  
  await mongoose.disconnect();
  console.log(`\nDone all updates. Success: ${successCount}, Failed: ${failCount}`);
}

runAll().catch(console.error);
