const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // WARNING: MUST USE EXACT LOWERCASE SLUG HERE
  const result = await Phone.updateOne({ slug: 'samsung-galaxy-s24-ultra' }, { $set: {
    seo_overview: `The Samsung Galaxy S24 Ultra is the pinnacle of Samsung's smartphone lineup, delivering an uncompromising flagship experience for power users and photography enthusiasts alike. At its core, the Qualcomm Snapdragon 8 Gen 3 octa-core processor provides blazing-fast performance for everything from intensive gaming to AI-powered productivity features, making it one of the most capable smartphones available in the USA.

The stunning 6.8-inch display offers breathtaking visuals with Samsung's renowned color accuracy and brightness, perfect for content creation, streaming, and the built-in S Pen experience. The camera system is where the Galaxy S24 Ultra truly dominates — a quad-camera array featuring a massive 200 MP primary sensor with OIS, a 50 MP periscope telephoto with 5x optical zoom, a 10 MP telephoto lens, and a 12 MP ultrawide camera. This versatile setup handles everything from ultra-detailed close-ups to stunning landscape photography and impressive zoom shots that rival dedicated cameras.

The 5000 mAh battery delivers reliable all-day performance, complemented by 15W wireless charging via Qi and PMA standards. IP68 dust and water resistance ensures the Galaxy S24 Ultra can withstand submersion in 1.5 meters of water for 30 minutes, providing confidence in any environment. Priced at $1,299 in the USA, the Samsung Galaxy S24 Ultra justifies its premium cost with an unmatched combination of processing power, camera excellence, and Samsung's seven-year software update commitment.`,
    verdict: `The Samsung Galaxy S24 Ultra remains one of the best smartphones money can buy in the USA. The Snapdragon 8 Gen 3 delivers top-tier performance, the 200 MP quad-camera system is extraordinarily versatile with its 5x periscope zoom, and the 6.8-inch display is simply gorgeous. The integrated S Pen, IP68 water resistance, and Samsung's industry-leading seven-year update promise add tremendous long-term value. At $1,299, it's undeniably expensive, but you're getting a device that excels in virtually every category. If you want the absolute best Android experience with no compromises, the Galaxy S24 Ultra is the phone to buy.`,
    pros: [
      "200 MP quad-camera system with 5x periscope zoom for exceptional photography",
      "Snapdragon 8 Gen 3 delivers top-tier flagship performance",
      "Built-in S Pen with IP68 water and dust resistance",
      "Samsung's 7-year software update commitment for long-term value"
    ],
    cons: [
      "Premium $1,299 price tag is a significant investment",
      "No headphone jack for wired audio",
      "15W wireless charging is slower than many competitors"
    ],
    faqs: [
      { question: "Is the Samsung Galaxy S24 Ultra worth buying?", answer: "Absolutely. The Samsung Galaxy S24 Ultra offers the best camera system on any Android phone with its 200 MP sensor and 5x periscope zoom, top-tier Snapdragon 8 Gen 3 performance, a stunning 6.8-inch display, and the built-in S Pen. With seven years of software updates, it's a long-term investment that delivers exceptional value despite its premium price." },
      { question: "How good is the Samsung Galaxy S24 Ultra camera?", answer: "The Galaxy S24 Ultra features one of the most versatile camera systems available: a 200 MP main sensor with OIS, a 50 MP periscope telephoto with 5x optical zoom, a 10 MP telephoto, and a 12 MP ultrawide. It excels in daylight, low-light, and zoom photography, producing detailed, vibrant images across all scenarios." },
      { question: "Does the Samsung Galaxy S24 Ultra have an S Pen?", answer: "Yes, the Samsung Galaxy S24 Ultra includes a built-in S Pen stylus housed inside the phone body. It supports note-taking, sketching, document annotation, and Air Command gestures, making it the only flagship smartphone with an integrated stylus." },
      { question: "How long does the Samsung Galaxy S24 Ultra battery last?", answer: "The Galaxy S24 Ultra packs a 5000 mAh battery that comfortably lasts a full day of heavy usage. It supports 15W wireless charging via Qi and PMA standards, plus fast wired charging to quickly top up when needed." },
      { question: "Is the Samsung Galaxy S24 Ultra waterproof?", answer: "The Samsung Galaxy S24 Ultra has an IP68 rating, meaning it can withstand submersion in up to 1.5 meters of fresh water for 30 minutes. It is also fully dust resistant, making it one of the most durable flagships available." }
    ],
    meta_title: "Samsung Galaxy S24 Ultra Price in USA & Full Specs | Buy or Skip?",
    meta_description: "Samsung Galaxy S24 Ultra costs $1,299 in the USA. 200 MP camera, Snapdragon 8 Gen 3, S Pen, IP68. See full specs, pros, cons & verdict.",
    manual_seo_done: true
  }});

  console.log(`Updated samsung-galaxy-s24-ultra, modified: ${result.modifiedCount}`);
  await mongoose.disconnect();
}
run().catch(console.error);
