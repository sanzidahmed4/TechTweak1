const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  const p = await Phone.findOne({ slug: 'samsung-galaxy-a51-5g' }).lean();
  const proc = (p.chipset||p.processor||'Exynos 980').replace(/"/g,'');
  const screen = (p.screen_size||'6.5-inch').replace(/"/g,'');
  const cam = (p.camera_main||'48 MP').replace(/"/g,'');
  const bat = (p.battery_capacity||'4500 mAh').replace(/"/g,'');

  const overview = `The **Samsung Galaxy A51 5G** has quickly become one of the most talked-about mid-range smartphones among US consumers who want 5G connectivity without a flagship price tag. At its core, the ${proc} processor delivers smooth, lag-free performance for everyday tasks like browsing, streaming, and social media multitasking. This is a chipset built for efficiency, ensuring that the phone remains responsive even with multiple applications running simultaneously.

The ${screen} Super AMOLED display is a genuine highlight. Colors are rich and punchy, blacks are deep and inky, and the overall viewing experience is exceptional for content consumption, photo editing, and gaming. Whether you are watching Netflix during a commute or scrolling through your Instagram feed, the screen quality consistently impresses.

On the photography front, the ${cam} quad-camera system provides versatile shooting options. The primary sensor captures sharp, well-lit photos during the day, while the dedicated macro and ultra-wide lenses add creative flexibility. Night mode performs adequately, though low-light performance is not quite on par with flagship devices.

Battery life is another area where the Galaxy A51 5G delivers peace of mind. The ${bat} cell is sized to comfortably last through a full day of moderate to heavy usage, and the included fast charging support ensures that quick top-ups between meetings or classes can provide several additional hours of screen time.`;

  const verdict = `The Samsung Galaxy A51 5G represents a smart buy for US consumers who want to step into the 5G era without emptying their wallets. The ${proc} processor keeps everyday tasks running smoothly, the gorgeous ${screen} Super AMOLED display elevates media consumption to a premium-feeling experience, and the ${bat} battery delivers dependable all-day endurance. The quad-camera setup is versatile enough for most photography needs. If you are in the market for a well-rounded, 5G-capable mid-ranger that looks and feels more expensive than it actually is, the Galaxy A51 5G is a highly recommended choice.`;

  await Phone.updateOne({ slug: 'samsung-galaxy-a51-5g' }, { $set: { seo_overview: overview, verdict: verdict }});
  console.log('Updated samsung-galaxy-a51-5g with completely unique handcrafted content');
  await mongoose.disconnect();
}
run().catch(console.error);
