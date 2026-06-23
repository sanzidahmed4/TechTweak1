const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'motorola-razr-50-ultra' }, { $set: {
    seo_overview: `The Motorola Razr 50 Ultra is a premium foldable flip phone that marries cutting-edge design with serious flagship performance. Powered by an octa-core processor featuring a Cortex-X4 core clocked at 3.0 GHz alongside Cortex-A720 and Cortex-A520 efficiency cores, it delivers smooth multitasking and demanding app performance without breaking a sweat. The expansive 6.9-inch main display unfolds to reveal a vibrant, immersive screen, while the generous 4.0-inch cover display lets you handle notifications, take selfies, and control apps without ever opening the phone.

Photography enthusiasts will appreciate the capable dual-camera system, which pairs a 50 MP primary sensor with OIS and a 50 MP telephoto lens. The f/1.7 aperture and dual pixel PDAF ensure sharp, well-lit shots in virtually any lighting condition. Whether you're capturing portraits with natural bokeh or zooming into distant subjects, the Razr 50 Ultra delivers consistently impressive results.

With a 4000 mAh battery and 15W wireless charging support, the Razr 50 Ultra keeps you powered throughout a busy day. Its IPX8 water resistance rating means you can use it confidently around water, surviving submersion up to 1.5 meters for 30 minutes. For USA buyers seeking a stylish, pocketable foldable that doesn't compromise on camera quality or performance, the Motorola Razr 50 Ultra stands out as a compelling choice at $999.99.`,
    verdict: `The Motorola Razr 50 Ultra is an excellent pick for USA buyers who want a foldable flip phone that genuinely delivers on both style and substance. Its large 4.0-inch cover display is one of the most functional in its class, and the dual 50 MP camera system produces photos that rival many standard flagship smartphones. While the 4000 mAh battery is adequate rather than exceptional, the combination of wireless charging and IPX8 water resistance adds real-world convenience. At $999.99, it competes directly with Samsung's Galaxy Z Flip lineup and offers a refreshing alternative with Motorola's clean software experience. Recommended for anyone who values a compact form factor without sacrificing performance.`,
    pros: [
      "Large 4.0-inch cover display for full app usage without unfolding",
      "Dual 50 MP camera system with OIS delivers excellent photo quality",
      "IPX8 water resistance for peace of mind around water",
      "15W wireless charging adds everyday convenience"
    ],
    cons: [
      "4000 mAh battery is smaller than most non-foldable flagships",
      "No headphone jack limits wired audio options",
      "Priced at $999.99, which is steep for a foldable in a competitive market"
    ],
    faqs: [
      { question: "Is the Motorola Razr 50 Ultra waterproof?", answer: "The Motorola Razr 50 Ultra carries an IPX8 water resistance rating, meaning it can withstand submersion in up to 1.5 meters of water for 30 minutes. However, it lacks a dust resistance rating, so exercise caution in sandy or dusty environments." },
      { question: "How good is the Motorola Razr 50 Ultra camera?", answer: "The Razr 50 Ultra features a dual 50 MP camera system with OIS and a telephoto lens. The f/1.7 aperture and dual pixel PDAF deliver sharp, vibrant photos in both daylight and low-light conditions, making it one of the best camera systems on a flip-style foldable." },
      { question: "Does the Motorola Razr 50 Ultra support wireless charging?", answer: "Yes, the Motorola Razr 50 Ultra supports 15W wireless charging, allowing you to top up the 4000 mAh battery conveniently without cables." },
      { question: "What processor does the Motorola Razr 50 Ultra use?", answer: "The Razr 50 Ultra is powered by an octa-core processor with a Cortex-X4 prime core at 3.0 GHz, four Cortex-A720 performance cores at 2.8 GHz, and three Cortex-A520 efficiency cores at 2.0 GHz, delivering strong flagship-level performance." },
      { question: "How big is the Motorola Razr 50 Ultra cover screen?", answer: "The Motorola Razr 50 Ultra features a spacious 4.0-inch cover display, one of the largest on any flip-style foldable. It allows full app usage, selfie previews, notifications, and quick replies without opening the phone." }
    ],
    meta_title: "Motorola Razr 50 Ultra Price in USA & Full Specs | Buy or Skip?",
    meta_description: "Motorola Razr 50 Ultra price starts at $999.99 in the USA. See full specs, camera details, battery life, pros & cons, and our expert verdict.",
    manual_seo_done: true
  }});

  console.log(`Updated motorola-razr-50-ultra, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
