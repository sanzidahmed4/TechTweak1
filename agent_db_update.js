const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function updatePhone() {
  const args = process.argv.slice(2);
  if (args.length < 2) process.exit(1);
  const name = args[0];
  const specs = JSON.parse(args[1]);

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Phone = mongoose.models.Phone || mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
    
    // Find phone by exact name (case-insensitive)
    const phone = await Phone.findOne({ name: new RegExp('^' + name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$', 'i') });
    
    if (phone) {
      for (const [k, v] of Object.entries(specs)) {
        if (v && v.trim() !== '') {
          phone.set(k, v.trim());
        }
      }
      await phone.save();
      console.log('SUCCESS: Updated ' + name);
    } else {
      console.log('ERROR: Phone not found: ' + name);
    }
  } catch (err) {
    console.error('ERROR:', err.message);
  } finally {
    mongoose.disconnect();
  }
}

updatePhone();
