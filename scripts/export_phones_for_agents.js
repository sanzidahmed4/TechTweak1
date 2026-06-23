const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function exportPhones() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  const phones = await Phone.find(
    { is_published: true, manual_seo_done: false },
    { name: 1, slug: 1, processor: 1, battery_capacity: 1, screen_size: 1, camera_main: 1, cam_main_sensor: 1, price_usd: 1, has_audio_jack: 1, charging_wireless: 1, water_resistance: 1 }
  ).lean();

  fs.writeFileSync('scripts/manual_seo_queue.json', JSON.stringify(phones, null, 2));
  console.log(`Exported ${phones.length} phones to manual_seo_queue.json`);
  await mongoose.disconnect();
}
exportPhones().catch(console.error);
