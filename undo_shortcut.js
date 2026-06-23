const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function undoShortcut() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

    // Read the list of phones we previously modified
    if (!fs.existsSync('missing_phones.json')) {
      console.log('missing_phones.json not found. Cannot undo.');
      return;
    }
    const missingPhonesFile = JSON.parse(fs.readFileSync('missing_phones.json', 'utf8'));
    let undoneCount = 0;

    for (const phoneName of missingPhonesFile) {
      const phone = await Phone.findOne({ name: phoneName });
      if (!phone) continue;

      phone.set('chipset_highlight', '');
      phone.set('camera_highlight', '');
      phone.set('battery_highlight', '');
      phone.set('display_highlight', '');
      phone.set('benchmark_highlight', '');

      await phone.save();
      undoneCount++;
    }

    console.log(`Successfully undone quick highlights for ${undoneCount} phones.`);

  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

undoShortcut();
